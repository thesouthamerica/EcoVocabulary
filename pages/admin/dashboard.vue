<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-black text-gray-800">Dashboard de Desempenho</h1>
      <button @click="fetchData" class="btn-secondary !py-2 !px-4 !rounded-lg flex items-center gap-2">
        <span :class="{'animate-spin': loading}">🔄</span> Atualizar
      </button>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <span class="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></span>
    </div>
    
    <div v-else-if="!hasData" class="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
      <div class="text-5xl mb-4">📊</div>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Sem dados suficientes</h2>
      <p class="text-gray-500">Nenhum jogador respondeu às perguntas ainda ou a tabela 'user_answers' está vazia.</p>
    </div>

    <div v-else class="space-y-6">
      
      <!-- KPIs Gerais -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
          <h3 class="text-gray-500 font-bold text-sm uppercase tracking-wider mb-1">Jogadores Únicos</h3>
          <p class="text-3xl font-black text-gray-800">{{ stats.uniqueUsersCount }}</p>
        </div>
        
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-indigo-500">
          <h3 class="text-gray-500 font-bold text-sm uppercase tracking-wider mb-1">Média de Perguntas/Usuário</h3>
          <p class="text-3xl font-black text-gray-800">{{ stats.averageAnswersPerUser.toFixed(1) }}</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-green-500">
          <h3 class="text-gray-500 font-bold text-sm uppercase tracking-wider mb-1">Taxa de Acerto Global</h3>
          <p class="text-3xl font-black text-gray-800">{{ stats.averageScorePercent.toFixed(1) }}%</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-yellow-500">
          <h3 class="text-gray-500 font-bold text-sm uppercase tracking-wider mb-1">Total de Respostas</h3>
          <p class="text-3xl font-black text-gray-800">{{ stats.totalAnswers }}</p>
        </div>

      </div>

      <!-- Destaques Negativos / Positivos -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- Perguntas -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-800">Desempenho por Pergunta</h2>
          </div>
          <div class="p-6 space-y-6">
            <div>
              <h3 class="text-sm font-bold text-red-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span>🔴 Mais Erros</span>
              </h3>
              <div v-if="stats.questionWithMostErrors" class="bg-red-50 p-4 rounded-lg border border-red-100">
                <p class="font-bold text-gray-800 text-lg">"{{ stats.questionWithMostErrors.promptPt }}"</p>
                <p class="text-sm text-gray-600 mt-1">ID: {{ stats.questionWithMostErrors.id }} | Erros: <span class="font-bold text-red-600">{{ stats.questionWithMostErrors.errorCount }}</span></p>
              </div>
              <p v-else class="text-gray-400 italic">Sem dados suficientes.</p>
            </div>

            <div>
              <h3 class="text-sm font-bold text-green-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span>🟢 Mais Acertos</span>
              </h3>
              <div v-if="stats.questionWithMostCorrect" class="bg-green-50 p-4 rounded-lg border border-green-100">
                <p class="font-bold text-gray-800 text-lg">"{{ stats.questionWithMostCorrect.promptPt }}"</p>
                <p class="text-sm text-gray-600 mt-1">ID: {{ stats.questionWithMostCorrect.id }} | Acertos: <span class="font-bold text-green-600">{{ stats.questionWithMostCorrect.correctCount }}</span></p>
              </div>
              <p v-else class="text-gray-400 italic">Sem dados suficientes.</p>
            </div>
          </div>
        </div>

        <!-- Níveis -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <h2 class="text-lg font-bold text-gray-800">Desempenho por Nível</h2>
          </div>
          <div class="p-6 space-y-6">
            <div>
              <h3 class="text-sm font-bold text-orange-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span>📉 Nível Mais Difícil (Mais Erros)</span>
              </h3>
              <div v-if="stats.levelWithMostErrors" class="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <p class="font-bold text-gray-800 text-lg">{{ stats.levelWithMostErrors.title }}</p>
                <p class="text-sm text-gray-600 mt-1">Erros Totais: <span class="font-bold text-orange-600">{{ stats.levelWithMostErrors.errorCount }}</span></p>
              </div>
              <p v-else class="text-gray-400 italic">Sem dados suficientes.</p>
            </div>

            <div>
              <h3 class="text-sm font-bold text-emerald-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span>📈 Nível Mais Fácil (Mais Acertos)</span>
              </h3>
              <div v-if="stats.levelWithMostCorrect" class="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <p class="font-bold text-gray-800 text-lg">{{ stats.levelWithMostCorrect.title }}</p>
                <p class="text-sm text-gray-600 mt-1">Acertos Totais: <span class="font-bold text-emerald-600">{{ stats.levelWithMostCorrect.correctCount }}</span></p>
              </div>
              <p v-else class="text-gray-400 italic">Sem dados suficientes.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useSupabaseClient } from '#imports'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const supabase = useSupabaseClient()
const loading = ref(true)
const rawAnswers = ref([])
const questionsDict = ref({})
const levelsDict = ref({})

const hasData = computed(() => rawAnswers.value.length > 0)

const stats = ref({
  totalAnswers: 0,
  uniqueUsersCount: 0,
  averageAnswersPerUser: 0,
  averageScorePercent: 0,
  questionWithMostErrors: null,
  questionWithMostCorrect: null,
  levelWithMostErrors: null,
  levelWithMostCorrect: null
})

const fetchData = async () => {
  loading.value = true
  try {
    // Busca dados em paralelo
    const [resAnswers, resQuestions, resLevels] = await Promise.all([
      supabase.from('user_answers').select('*'),
      supabase.from('questions').select('id, promptPt'),
      supabase.from('levels').select('id, title')
    ])

    if (resAnswers.error) {
      console.warn("Possível erro buscando user_answers (tabela existe?):", resAnswers.error)
    }

    rawAnswers.value = resAnswers.data || []
    
    if (resQuestions.data) {
      resQuestions.data.forEach(q => questionsDict.value[q.id] = q)
    }
    if (resLevels.data) {
      resLevels.data.forEach(l => levelsDict.value[l.id] = l)
    }

    calculateStats()
  } catch (err) {
    console.error("Erro ao buscar dados do dashboard:", err)
  } finally {
    loading.value = false
  }
}

const calculateStats = () => {
  const answers = rawAnswers.value
  if (!answers || answers.length === 0) return

  stats.value.totalAnswers = answers.length
  
  const uniqueUsers = new Set(answers.map(a => a.user_id))
  stats.value.uniqueUsersCount = uniqueUsers.size
  
  stats.value.averageAnswersPerUser = stats.value.uniqueUsersCount > 0 
    ? stats.value.totalAnswers / stats.value.uniqueUsersCount 
    : 0

  const totalCorrect = answers.filter(a => a.is_correct).length
  stats.value.averageScorePercent = (totalCorrect / stats.value.totalAnswers) * 100

  // Agrupamentos
  const questionStats = {}
  const levelStats = {}

  answers.forEach(a => {
    // Por pergunta
    if (!questionStats[a.question_id]) {
      questionStats[a.question_id] = { correct: 0, incorrect: 0 }
    }
    if (a.is_correct) questionStats[a.question_id].correct++
    else questionStats[a.question_id].incorrect++

    // Por nível
    if (!levelStats[a.level_id]) {
      levelStats[a.level_id] = { correct: 0, incorrect: 0 }
    }
    if (a.is_correct) levelStats[a.level_id].correct++
    else levelStats[a.level_id].incorrect++
  })

  // Descobre Pergunta com + Erros
  let maxErrorsQ = -1
  let worstQId = null
  let maxCorrectQ = -1
  let bestQId = null

  Object.entries(questionStats).forEach(([qId, counts]) => {
    if (counts.incorrect > maxErrorsQ) {
      maxErrorsQ = counts.incorrect
      worstQId = qId
    }
    if (counts.correct > maxCorrectQ) {
      maxCorrectQ = counts.correct
      bestQId = qId
    }
  })

  if (worstQId && questionsDict.value[worstQId]) {
    stats.value.questionWithMostErrors = {
      ...questionsDict.value[worstQId],
      errorCount: maxErrorsQ
    }
  }

  if (bestQId && questionsDict.value[bestQId]) {
    stats.value.questionWithMostCorrect = {
      ...questionsDict.value[bestQId],
      correctCount: maxCorrectQ
    }
  }

  // Descobre Nível com + Erros e + Acertos
  let maxErrorsL = -1
  let worstLId = null
  let maxCorrectL = -1
  let bestLId = null

  Object.entries(levelStats).forEach(([lId, counts]) => {
    if (counts.incorrect > maxErrorsL) {
      maxErrorsL = counts.incorrect
      worstLId = lId
    }
    if (counts.correct > maxCorrectL) {
      maxCorrectL = counts.correct
      bestLId = lId
    }
  })

  if (worstLId && levelsDict.value[worstLId]) {
    stats.value.levelWithMostErrors = {
      ...levelsDict.value[worstLId],
      errorCount: maxErrorsL
    }
  }

  if (bestLId && levelsDict.value[bestLId]) {
    stats.value.levelWithMostCorrect = {
      ...levelsDict.value[bestLId],
      correctCount: maxCorrectL
    }
  }
}

onMounted(() => {
  fetchData()
})
</script>
