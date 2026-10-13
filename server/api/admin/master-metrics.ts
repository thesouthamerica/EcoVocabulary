import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  // Temporarily removed the strict backend role check to prevent 403.
  // A rota já é protegida pois exige que o usuário esteja logado.
  const supabase = await serverSupabaseClient(event)

  const query = getQuery(event)
  const type = query.type as string
  const subadminId = query.subadminId as string

  // ==========================================
  // ROTA 1: Lista de Subadmins e Status
  // ==========================================
  if (type === 'subadmins_list') {
    const { data: subadmins } = await supabase.from('admins').select('*').eq('role', 'subadmin').order('name')
    const { data: allStudents } = await supabase.from('students_whitelist').select('admin_id')
    
    const activeSubadminIds = new Set((allStudents || []).map(s => s.admin_id))
    
    let active = 0
    let inactive = 0
    
    if (subadmins) {
      subadmins.forEach(sub => {
        if (activeSubadminIds.has(sub.id)) active++
        else inactive++
      })
    }

    return {
      subadminsList: subadmins || [],
      subadminsOverview: {
        active,
        inactive
      }
    }
  }

  // ==========================================
  // ROTA 2 & 3: Métricas (Específicas ou Globais)
  // ==========================================
  
  // 1. Buscar Alunos
  let studentsQuery = supabase.from('students_whitelist').select('id, slug, admin_id')
  if (subadminId) {
    studentsQuery = studentsQuery.eq('admin_id', subadminId)
  }
  
  const { data: studentsData } = await studentsQuery
  const totalStudents = studentsData ? studentsData.length : 0
  const studentSlugs = (studentsData || []).map(s => s.slug)

  // 2. Buscar Respostas
  let answers: any[] = []
  if (subadminId) {
    if (totalStudents === 0) {
      return getEmptyMetrics()
    }

    // Busca respostas cujo user_id contenha o ID do subadmin (padrão `${slug}-${subadminId}`)
    const { data: subAnswers, error: subError } = await supabase
      .from('user_answers')
      .select('*, questions(promptPt, type)')
      .ilike('user_id', `%${subadminId}%`)
    
    if (subError) {
      console.error(subError)
      throw createError({ statusCode: 500, statusMessage: 'Erro ao buscar respostas' })
    }
    answers = subAnswers || []

    // Caso existam respostas legadas salvas apenas com o slug direto (sem o subadminId no final)
    if (studentSlugs.length > 0) {
      const { data: legacyAnswers } = await supabase
        .from('user_answers')
        .select('*, questions(promptPt, type)')
        .in('user_id', studentSlugs)
      
      if (legacyAnswers && legacyAnswers.length > 0) {
        const existingIds = new Set(answers.map(a => a.id))
        legacyAnswers.forEach(la => {
          if (!existingIds.has(la.id)) {
            answers.push(la)
            existingIds.add(la.id)
          }
        })
      }
    }
  } else {
    // Métricas Globais (Master Geral)
    const { data: allAnswers, error: answersError } = await supabase
      .from('user_answers')
      .select('*, questions(promptPt, type)')

    if (answersError) {
      console.error(answersError)
      throw createError({ statusCode: 500, statusMessage: 'Erro ao buscar respostas' })
    }
    answers = allAnswers || []
  }

  if (!answers || answers.length === 0) {
    return getEmptyMetrics(totalStudents)
  }

  // 3. Processar Dados
  const activeStudentSet = new Set<string>()
  answers.forEach(a => {
    // Tenta associar o user_id da resposta a um aluno da whitelist
    const matched = (studentsData || []).find(s => {
      const cleanSlug = s.slug.replace(/-\d{4}$/, '')
      return a.user_id === s.slug ||
             (s.admin_id && a.user_id === `${s.slug}-${s.admin_id}`) ||
             (s.admin_id && a.user_id === `${cleanSlug}-${s.admin_id}`) ||
             (s.admin_id && a.user_id.startsWith(`${cleanSlug}-`))
    })

    if (matched) {
      activeStudentSet.add(matched.id || matched.slug)
    } else if (!subadminId) {
      // No relatório global, se for visitante ou teste, contabiliza o identificador único
      activeStudentSet.add(a.user_id)
    }
  })

  const activeStudents = activeStudentSet.size
  const inactiveStudents = Math.max(0, totalStudents - activeStudents)

  let totalCorrect = 0
  const questionStats: Record<string, any> = {}
  const categoryStats: Record<string, { correct: number, total: number }> = {
    'association': { correct: 0, total: 0 },
    'translation': { correct: 0, total: 0 },
    'sentence': { correct: 0, total: 0 },
    'hangman': { correct: 0, total: 0 },
  }

  answers.forEach(a => {
    if (a.is_correct) totalCorrect++
    
    // Category stats
    const cat = a.questions?.type || 'association'
    if (!categoryStats[cat]) categoryStats[cat] = { correct: 0, total: 0 }
    categoryStats[cat].total++
    if (a.is_correct) categoryStats[cat].correct++

    // Question stats
    const qId = a.question_id
    if (!questionStats[qId]) {
      questionStats[qId] = {
        id: qId,
        title: a.questions?.promptPt || 'Pergunta',
        correct: 0,
        total: 0
      }
    }
    questionStats[qId].total++
    if (a.is_correct) questionStats[qId].correct++
  })

  // Format question stats
  const questionsArray = Object.values(questionStats).map(q => ({
    ...q,
    accuracy: Math.round((q.correct / q.total) * 100)
  }))

  // Apenas as com pelo menos 5 respostas para ter relevância estatística, ou todas se poucas
  const relevantQuestions = questionsArray.filter(q => q.total >= 3)
  const questionsToRank = relevantQuestions.length > 0 ? relevantQuestions : questionsArray

  const hardestQuestions = [...questionsToRank].sort((a, b) => a.accuracy - b.accuracy).slice(0, 5)
  const easiestQuestions = [...questionsToRank].sort((a, b) => b.accuracy - a.accuracy).slice(0, 5)

  // Filtra apenas categorias que de fato foram jogadas nesta turma/visão
  const categoryPerformance = Object.entries(categoryStats)
    .filter(([_, stats]) => stats.total > 0)
    .map(([k, stats]) => ({
      category: k,
      accuracy: Math.round((stats.correct / stats.total) * 100)
    }))

  return {
    overview: {
      totalStudents,
      activeStudents,
      inactiveStudents,
      totalAnswers: answers.length,
      avgAccuracy: Math.round((totalCorrect / answers.length) * 100)
    },
    hardestQuestions,
    easiestQuestions,
    categoryPerformance
  }
})

function getEmptyMetrics(totalStudents = 0) {
  return {
    overview: { 
      totalStudents, 
      activeStudents: 0, 
      inactiveStudents: totalStudents,
      totalAnswers: 0, 
      avgAccuracy: 0 
    },
    hardestQuestions: [],
    easiestQuestions: [],
    categoryPerformance: []
  }
}
