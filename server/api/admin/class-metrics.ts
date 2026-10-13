import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const query = getQuery(event)
  const studentSlugsQuery = query.studentSlugs as string
  const adminId = query.adminId as string

  if (!studentSlugsQuery) {
    return {
      overview: { activeStudents: 0, totalAnswers: 0, avgAccuracy: 0 },
      hardestQuestions: [],
      easiestQuestions: [],
      categoryPerformance: [],
      guessVsDifficulty: []
    }
  }

  const studentSlugs = studentSlugsQuery.split(',').filter(Boolean)
  const supabase = await serverSupabaseClient(event)

  if (studentSlugs.length === 0) {
    return {
      overview: { activeStudents: 0, totalAnswers: 0, avgAccuracy: 0 },
      hardestQuestions: [],
      easiestQuestions: [],
      categoryPerformance: [],
      guessVsDifficulty: []
    }
  }

  // 1. Gera todas as combinações possíveis de user_id salvas no banco
  const candidateUserIds = new Set<string>()
  studentSlugs.forEach(slug => {
    candidateUserIds.add(slug)
    if (adminId) {
      candidateUserIds.add(`${slug}-${adminId}`)
    }
    const cleanSlug = slug.replace(/-\d{4}$/, '')
    candidateUserIds.add(cleanSlug)
    if (adminId) {
      candidateUserIds.add(`${cleanSlug}-${adminId}`)
      candidateUserIds.add(`${cleanSlug}-2026-${adminId}`)
      candidateUserIds.add(`${cleanSlug}-2027-${adminId}`)
    }
  })

  // 2. Fetch all answers for these students
  const { data: answers, error: answersError } = await supabase
    .from('user_answers')
    .select('*, questions(promptPt, type)')
    .in('user_id', Array.from(candidateUserIds))

  if (answersError) {
    console.error(answersError)
    throw createError({ statusCode: 500, statusMessage: 'Error fetching answers' })
  }

  if (!answers || answers.length === 0) {
    return {
      overview: { activeStudents: 0, totalAnswers: 0, avgAccuracy: 0 },
      hardestQuestions: [],
      easiestQuestions: [],
      categoryPerformance: [],
      guessVsDifficulty: []
    }
  }

  // 3. Process Data
  // Mapeia quais alunos únicos desta turma realmente responderam perguntas
  const activeStudentSlugSet = new Set<string>()
  answers.forEach(a => {
    const matched = studentSlugs.find(slug => {
      const cleanSlug = slug.replace(/-\d{4}$/, '')
      return a.user_id === slug ||
             (adminId && a.user_id === `${slug}-${adminId}`) ||
             (adminId && a.user_id === `${cleanSlug}-${adminId}`) ||
             (adminId && a.user_id.startsWith(`${cleanSlug}-`))
    })
    if (matched) {
      activeStudentSlugSet.add(matched)
    } else {
      activeStudentSlugSet.add(a.user_id)
    }
  })

  const activeStudents = activeStudentSlugSet.size
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
        total: 0,
        avgTime: 0,
        totalTime: 0
      }
    }
    questionStats[qId].total++
    if (a.is_correct) questionStats[qId].correct++
    questionStats[qId].totalTime += (a.time_taken_seconds || 0)
  })

  // Format question stats
  const questionsArray = Object.values(questionStats).map(q => ({
    ...q,
    accuracy: Math.round((q.correct / q.total) * 100),
    avgTime: Math.round(q.totalTime / q.total)
  }))

  const hardestQuestions = [...questionsArray].sort((a, b) => a.accuracy - b.accuracy).slice(0, 5)
  const easiestQuestions = [...questionsArray].sort((a, b) => b.accuracy - a.accuracy).slice(0, 5)

  // Guess vs Difficulty: Low accuracy + Low time = Guessing. Low accuracy + High time = True Difficulty
  const guessVsDifficulty = questionsArray.map(q => ({
    title: q.title,
    accuracy: q.accuracy,
    avgTime: q.avgTime,
    status: q.accuracy < 50 && q.avgTime < 5 ? 'Chute' : (q.accuracy < 50 ? 'Dificuldade' : 'Bom')
  }))

  const categoryPerformance = Object.entries(categoryStats)
    .filter(([_, stats]) => stats.total > 0)
    .map(([k, stats]) => ({
      category: k,
      accuracy: Math.round((stats.correct / stats.total) * 100)
    }))

  return {
    overview: {
      activeStudents,
      totalAnswers: answers.length,
      avgAccuracy: Math.round((totalCorrect / answers.length) * 100)
    },
    hardestQuestions,
    easiestQuestions,
    categoryPerformance,
    guessVsDifficulty
  }
})
