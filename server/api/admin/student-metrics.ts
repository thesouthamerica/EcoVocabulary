import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const query = getQuery(event)
  const studentSlug = query.studentSlug

  if (!studentSlug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing studentSlug' })
  }

  const supabase = await serverSupabaseClient(event)

  // 1. Fetch user progress (overall score)
  const { data: progress } = await supabase
    .from('user_progress')
    .select('score, current_level_index')
    .eq('name', studentSlug)
    .single()

  // 2. Fetch all answers for this student
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const { data: answers, error: answersError } = await supabase
    .from('user_answers')
    .select('*, questions(promptPt, type)')
    .eq('user_id', studentSlug)
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('created_at', { ascending: true })

  if (answersError) {
    console.error(answersError)
    throw createError({ statusCode: 500, statusMessage: 'Error fetching answers' })
  }

  if (!answers || answers.length === 0) {
    return {
      score: progress?.score || 0,
      accuracy: 0,
      avgAttempts: 0,
      categoryPerformance: [],
      learningCurve: []
    }
  }

  let totalCorrect = 0
  let totalAttempts = 0
  const categoryStats: Record<string, { correct: number, total: number }> = {
    'association': { correct: 0, total: 0 },
    'translation': { correct: 0, total: 0 },
    'sentence': { correct: 0, total: 0 },
  }
  
  const dailyStats: Record<string, { correct: number, total: number }> = {}

  answers.forEach(a => {
    if (a.is_correct) totalCorrect++
    totalAttempts += (a.attempts || 1)

    const cat = a.questions?.type || 'association'
    if (!categoryStats[cat]) categoryStats[cat] = { correct: 0, total: 0 }
    categoryStats[cat].total++
    if (a.is_correct) categoryStats[cat].correct++

    // Group by day for learning curve
    const day = new Date(a.created_at).toLocaleDateString('pt-BR')
    if (!dailyStats[day]) dailyStats[day] = { correct: 0, total: 0 }
    dailyStats[day].total++
    if (a.is_correct) dailyStats[day].correct++
  })

  const categoryPerformance = Object.entries(categoryStats).map(([k, stats]) => ({
    category: k,
    accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
  }))

  const learningCurve = Object.entries(dailyStats).map(([day, stats]) => ({
    date: day,
    accuracy: Math.round((stats.correct / stats.total) * 100)
  }))

  return {
    score: progress?.score || 0,
    accuracy: Math.round((totalCorrect / answers.length) * 100),
    avgAttempts: (totalAttempts / answers.length).toFixed(1),
    categoryPerformance,
    learningCurve
  }
})
