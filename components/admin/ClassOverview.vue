<template>
  <div class="space-y-6">
    <div v-if="pending" class="text-center py-12 text-gray-400 font-bold animate-pulse">
      Carregando métricas da turma...
    </div>
    
    <div v-else-if="error" class="bg-red-50 p-6 rounded-xl border border-red-200 text-red-600 font-bold">
      Erro ao carregar dados: {{ error.message }}
    </div>

    <template v-else-if="metrics">
      <!-- Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-eco-blue">
          <div class="text-4xl">👨‍🎓</div>
          <div>
            <p class="text-sm text-gray-500 font-bold uppercase tracking-wider">Alunos Ativos</p>
            <p class="text-3xl font-black text-gray-800">{{ metrics.overview.activeStudents }}</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-eco-yellow">
          <div class="text-4xl">🎯</div>
          <div>
            <p class="text-sm text-gray-500 font-bold uppercase tracking-wider">Respostas Registradas</p>
            <p class="text-3xl font-black text-gray-800">{{ metrics.overview.totalAnswers }}</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-eco-green">
          <div class="text-4xl">📈</div>
          <div>
            <p class="text-sm text-gray-500 font-bold uppercase tracking-wider">Média de Acertos</p>
            <p class="text-3xl font-black text-gray-800">{{ metrics.overview.avgAccuracy }}%</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Rankings -->
        <div class="lg:col-span-2 space-y-6">
          
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="bg-red-50 p-4 border-b border-red-100">
              <h3 class="font-black text-red-800 flex items-center gap-2">🚨 Top Dificuldades (Maior Erro)</h3>
            </div>
            <div class="p-0">
              <table class="w-full text-left text-sm">
                <thead>
                  <tr class="bg-gray-50 text-gray-500 uppercase tracking-widest text-xs border-b border-gray-100">
                    <th class="p-3">Pergunta</th>
                    <th class="p-3 text-center">Acertos</th>
                    <th class="p-3 text-center">Tempo Médio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="q in metrics.hardestQuestions" :key="q.id" class="border-b border-gray-50 hover:bg-gray-50">
                    <td class="p-3 font-bold text-gray-700">{{ q.title }}</td>
                    <td class="p-3 text-center font-bold text-red-500">{{ q.accuracy }}%</td>
                    <td class="p-3 text-center text-gray-500">{{ q.avgTime }}s</td>
                  </tr>
                  <tr v-if="metrics.hardestQuestions.length === 0">
                    <td colspan="3" class="p-6 text-center text-gray-400">Sem dados suficientes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="bg-green-50 p-4 border-b border-green-100">
              <h3 class="font-black text-green-800 flex items-center gap-2">🌟 Top Facilidades (Maior Acerto)</h3>
            </div>
            <div class="p-0">
              <table class="w-full text-left text-sm">
                <thead>
                  <tr class="bg-gray-50 text-gray-500 uppercase tracking-widest text-xs border-b border-gray-100">
                    <th class="p-3">Pergunta</th>
                    <th class="p-3 text-center">Acertos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="q in metrics.easiestQuestions" :key="q.id" class="border-b border-gray-50 hover:bg-gray-50">
                    <td class="p-3 font-bold text-gray-700">{{ q.title }}</td>
                    <td class="p-3 text-center font-bold text-eco-green">{{ q.accuracy }}%</td>
                  </tr>
                  <tr v-if="metrics.easiestQuestions.length === 0">
                    <td colspan="2" class="p-6 text-center text-gray-400">Sem dados suficientes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h3 class="font-black text-gray-800 text-lg">Matriz: Chute vs Dificuldade Real</h3>
              <span class="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full mt-2 sm:mt-0">Avalia erro por tempo gasto</span>
            </div>
            <div class="p-0 overflow-x-auto">
              <table class="w-full text-left text-sm">
                <thead>
                  <tr class="bg-gray-50 text-gray-500 uppercase tracking-widest text-xs border-b border-gray-100">
                    <th class="p-4">Pergunta</th>
                    <th class="p-4 text-center">Diagnóstico</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(q, idx) in metrics.guessVsDifficulty" :key="idx" class="border-b border-gray-50">
                    <td class="p-4 font-bold text-gray-700">{{ q.title }}</td>
                    <td class="p-4 text-center">
                      <span v-if="q.status === 'Chute'" class="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-200" title="Alunos erram muito e respondem muito rápido">🎲 Chute Rápido</span>
                      <span v-else-if="q.status === 'Dificuldade'" class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-200" title="Alunos erram muito e demoram para responder">🧗 Dificuldade Real</span>
                      <span v-else class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">✅ Adequado</span>
                    </td>
                  </tr>
                  <tr v-if="metrics.guessVsDifficulty.length === 0">
                    <td colspan="2" class="p-6 text-center text-gray-400">Sem dados suficientes para análise</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Gargalos por Tema (Chart) -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
          <h3 class="font-black text-gray-800 text-center mb-2 w-full text-lg">Gargalos por Categoria</h3>
          <p class="text-xs text-gray-500 text-center mb-6">Taxa de acerto por tipo de atividade</p>
          
          <div class="w-full max-w-[250px] aspect-square relative flex items-center justify-center">
            <Doughnut v-if="chartData.datasets[0].data.length > 0" :data="chartData" :options="chartOptions" />
            <div v-else class="text-gray-400 text-sm italic text-center">Aguardando dados...</div>
          </div>
          
          <div class="w-full mt-8 space-y-3" v-if="metrics.categoryPerformance.length > 0">
            <div v-for="cat in metrics.categoryPerformance" :key="cat.category" class="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
              <span class="font-bold text-gray-600 capitalize">{{ cat.category === 'association' ? 'Associação' : cat.category === 'translation' ? 'Tradução' : 'Sentenças' }}</span>
              <span class="font-black" :class="cat.accuracy < 50 ? 'text-red-500' : 'text-eco-green'">{{ cat.accuracy }}%</span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  schoolYear: { type: Number, required: true },
  calendarYear: { type: Number, required: true }
})

const { data: metrics, pending, error, refresh } = await useFetch('/api/admin/class-metrics', {
  query: computed(() => ({
    schoolYear: props.schoolYear,
    calendarYear: props.calendarYear
  }))
})

// Recarregar os dados se o ano mudar
watch(() => [props.schoolYear, props.calendarYear], () => {
  refresh()
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' }
  }
}

const chartData = computed(() => {
  if (!metrics.value || !metrics.value.categoryPerformance) return { labels: [], datasets: [{ data: [] }] }
  
  const labels = metrics.value.categoryPerformance.map(c => 
    c.category === 'association' ? 'Associação' : c.category === 'translation' ? 'Tradução' : 'Sentenças'
  )
  const data = metrics.value.categoryPerformance.map(c => c.accuracy)
  
  return {
    labels,
    datasets: [{
      data,
      backgroundColor: ['#4ade80', '#60a5fa', '#facc15'],
      hoverOffset: 4
    }]
  }
})
</script>
