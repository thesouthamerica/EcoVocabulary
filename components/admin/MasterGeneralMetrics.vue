<template>
  <div class="space-y-6">
    <div v-if="pending" class="text-center py-12 text-gray-400 font-bold animate-pulse">
      Carregando métricas gerais...
    </div>
    
    <div v-else-if="error" class="bg-red-50 p-6 rounded-xl border border-red-200 text-red-600 font-bold">
      Erro ao carregar dados: {{ error.message }}
    </div>

    <template v-else-if="metrics">
      <!-- 1. Estatísticas de Usuários -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 class="font-black text-gray-800 text-xl mb-6 flex items-center gap-2">👥 Total de Usuários/Alunos</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center">
            <p class="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Cadastrados (Global)</p>
            <p class="text-4xl font-black text-gray-800">{{ metrics.overview.totalStudents }}</p>
          </div>
          <div class="p-6 rounded-xl bg-green-50 border border-green-100 flex flex-col items-center justify-center text-center">
            <p class="text-sm text-green-600 font-bold uppercase tracking-wider mb-2">Ativos (Já jogaram)</p>
            <p class="text-4xl font-black text-eco-green">{{ metrics.overview.activeStudents }}</p>
          </div>
          <div class="p-6 rounded-xl bg-red-50 border border-red-100 flex flex-col items-center justify-center text-center">
            <p class="text-sm text-red-500 font-bold uppercase tracking-wider mb-2">Inativos</p>
            <p class="text-4xl font-black text-red-600">{{ metrics.overview.inactiveStudents }}</p>
          </div>
        </div>
      </div>

      <!-- 2. Visão Geral da Aplicação -->
      <h3 class="font-black text-gray-800 text-xl mb-4 mt-8 flex items-center gap-2">📊 Visão Geral da Aplicação</h3>
      
      <!-- Cards Resumo -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-eco-yellow">
          <div class="text-4xl">🎯</div>
          <div>
            <p class="text-sm text-gray-500 font-bold uppercase tracking-wider">Total de Respostas Registradas</p>
            <p class="text-3xl font-black text-gray-800">{{ metrics.overview.totalAnswers }}</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-eco-green">
          <div class="text-4xl">📈</div>
          <div>
            <p class="text-sm text-gray-500 font-bold uppercase tracking-wider">Média de Acertos Geral</p>
            <p class="text-3xl font-black text-gray-800">{{ metrics.overview.avgAccuracy }}%</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Rankings de Perguntas -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="bg-green-50 p-4 border-b border-green-100">
              <h3 class="font-black text-green-800 flex items-center gap-2">🌟 Perguntas com Mais Acertos (Global)</h3>
            </div>
            <div class="p-0">
              <table class="w-full text-left text-sm">
                <thead>
                  <tr class="bg-gray-50 text-gray-500 uppercase tracking-widest text-xs border-b border-gray-100">
                    <th class="p-3">Pergunta</th>
                    <th class="p-3 text-center">Acertos (%)</th>
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
            <div class="bg-red-50 p-4 border-b border-red-100">
              <h3 class="font-black text-red-800 flex items-center gap-2">🚨 Perguntas com Mais Erros (Global)</h3>
            </div>
            <div class="p-0">
              <table class="w-full text-left text-sm">
                <thead>
                  <tr class="bg-gray-50 text-gray-500 uppercase tracking-widest text-xs border-b border-gray-100">
                    <th class="p-3">Pergunta</th>
                    <th class="p-3 text-center">Acertos (%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="q in metrics.hardestQuestions" :key="q.id" class="border-b border-gray-50 hover:bg-gray-50">
                    <td class="p-3 font-bold text-gray-700">{{ q.title }}</td>
                    <td class="p-3 text-center font-bold text-red-500">{{ q.accuracy }}%</td>
                  </tr>
                  <tr v-if="metrics.hardestQuestions.length === 0">
                    <td colspan="2" class="p-6 text-center text-gray-400">Sem dados suficientes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Gargalos por Categoria -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
          <h3 class="font-black text-gray-800 text-center mb-2 w-full text-lg">Gargalos por Categoria</h3>
          <p class="text-xs text-gray-500 text-center mb-6">Taxa de acerto global por tipo de atividade</p>
          
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
import { ref, computed, onMounted } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useSupabaseClient } from '#imports'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  adminId: { type: String, required: true }
})

const supabase = useSupabaseClient()
const metrics = ref(null)
const pending = ref(true)
const error = ref(null)

const loadMetrics = async () => {
  pending.value = true
  error.value = null
  try {
    // Busca na nova API de métricas gerais do master
    const response = await $fetch('/api/admin/master-metrics')
    metrics.value = response
  } catch (err) {
    console.error(err)
    error.value = err
  } finally {
    pending.value = false
  }
}

onMounted(() => {
  loadMetrics()
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
