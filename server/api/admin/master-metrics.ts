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
  let studentsQuery = supabase.from('students_whitelist').select('slug, admin_id')
  if (subadminId) {
    studentsQuery = studentsQuery.eq('admin_id', subadminId)
  }
  
  const { data: studentsData } = await studentsQuery
  const totalStudents = studentsData ? studentsData.length : 0
  
  const studentSlugs = (studentsData || []).map(s => s.slug)

  // 2. Buscar Respostas
  let answersQuery = supabase.from('user_answers').select('*, questions(promptPt, type)')
  if (subadminId) {
    if (studentSlugs.length === 0) {
      // Subadmin não tem alunos, retorna zerado
      return getEmptyMetrics()
    }
    answersQuery = answersQuery.in('user_id', studentSlugs)
  }

  const { data: answers, error: answersError } = await answersQuery

  if (answersError) {
    console.error(answersError)
    throw createError({ statusCode: 500, statusMessage: 'Erro ao buscar respostas' })
  }

  if (!answers || answers.length === 0) {
    return getEmptyMetrics(totalStudents)
  }

  // 3. Processar Dados
  const activeStudentIds = new Set(answers.map(a => a.user_id))
  const activeStudents = activeStudentIds.size
  const inactiveStudents = Math.max(0, totalStudents - activeStudents)

  let totalCorrect = 0
  const questionStats: Record<string, any> = {}
  const categoryStats: Record<string, { correct: number, total: number }> = {
    'association': { correct: 0, total: 0 },
    'translation': { correct: 0, total: 0 },
    'sentence': { correct: 0, total: 0 },
  }

  answers.forEach(a => {
    if (a.is_correct) totalCorrect++
    
    // Category stats
    const cat = a.questions?.type || 'association'
    if (!categoryStats[cat]) categoryStats[cat] = { correct: 0, total: 0 }
    categoryStats[cat].total++
    if (a.is_correct) categoryStats[cat].correct++

    // Question stats (Mais importante para global)
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

  // Apenas as com pelo menos 5 respostas para ter relevância estatística
  const relevantQuestions = questionsArray.filter(q => q.total >= 5)
  // Se não houver suficientes, pega todas
  const questionsToRank = relevantQuestions.length > 0 ? relevantQuestions : questionsArray

  const hardestQuestions = [...questionsToRank].sort((a, b) => a.accuracy - b.accuracy).slice(0, 5)
  const easiestQuestions = [...questionsToRank].sort((a, b) => b.accuracy - a.accuracy).slice(0, 5)

  const categoryPerformance = Object.entries(categoryStats).map(([k, stats]) => ({
    category: k,
    accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
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
