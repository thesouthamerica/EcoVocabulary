<template>
  <div class="space-y-6">
    <div v-if="pending" class="text-center py-12 text-gray-400 font-bold animate-pulse">
      Carregando subadmins...
    </div>
    
    <div v-else-if="error" class="bg-red-50 p-6 rounded-xl border border-red-200 text-red-600 font-bold">
      Erro ao carregar dados: {{ error.message }}
    </div>

    <template v-else-if="metrics">
      <!-- 1. Estatísticas de Subadmins (Overview) -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 class="font-black text-gray-800 text-xl mb-6 flex items-center gap-2">👨‍🏫 Professores (Subadmins)</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-6 rounded-xl bg-purple-50 border border-purple-100 flex flex-col items-center justify-center text-center">
            <p class="text-sm text-purple-600 font-bold uppercase tracking-wider mb-2">Subadmins Ativos (Com alunos)</p>
            <p class="text-4xl font-black text-purple-700">{{ metrics.subadminsOverview.active }}</p>
          </div>
          <div class="p-6 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center">
            <p class="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Subadmins Inativos (Sem alunos)</p>
            <p class="text-4xl font-black text-gray-600">{{ metrics.subadminsOverview.inactive }}</p>
          </div>
        </div>
      </div>

      <!-- 2. Seleção de Subadmin -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <label class="block text-gray-500 font-bold mb-2 text-sm uppercase tracking-wider pl-2">Analisar Subadmin Específico</label>
        <select v-model="selectedSubadminId" @change="fetchSubadminData" class="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-purple-500 focus:ring-0 outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none bg-white cursor-pointer hover:border-purple-200">
          <option value="" disabled>Selecione um subadmin</option>
          <option v-for="sub in metrics.subadminsList" :key="sub.id" :value="sub.id">{{ sub.name }} ({{ sub.email }})</option>
        </select>
      </div>

      <!-- 3. Dados do Subadmin Selecionado -->
      <div v-if="subadminPending" class="text-center py-12 text-gray-400 font-bold animate-pulse">
        Carregando métricas do professor...
      </div>
      
      <template v-else-if="subMetrics">
        <!-- Estatísticas da Turma do Professor -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="p-6 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center">
            <p class="text-sm text-gray-500 font-bold uppercase tracking-wider mb-2">Alunos Cadastrados</p>
            <p class="text-3xl font-black text-gray-800">{{ subMetrics.overview.totalStudents }}</p>
          </div>
          <div class="p-6 rounded-xl bg-green-50 border border-green-100 flex flex-col items-center justify-center text-center">
            <p class="text-sm text-green-600 font-bold uppercase tracking-wider mb-2">Alunos Ativos</p>
            <p class="text-3xl font-black text-eco-green">{{ subMetrics.overview.activeStudents }}</p>
          </div>
          <div class="p-6 rounded-xl bg-red-50 border border-red-100 flex flex-col items-center justify-center text-center">
            <p class="text-sm text-red-500 font-bold uppercase tracking-wider mb-2">Alunos Inativos</p>
            <p class="text-3xl font-black text-red-600">{{ subMetrics.overview.inactiveStudents }}</p>
          </div>
        </div>

        <!-- Visão Geral de Desempenho do Professor -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-eco-green">
            <div class="text-4xl">📈</div>
            <div>
              <p class="text-sm text-gray-500 font-bold uppercase tracking-wider">Taxa Geral de Acertos</p>
              <p class="text-3xl font-black text-gray-800">{{ subMetrics.overview.avgAccuracy }}%</p>
            </div>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-eco-blue">
            <div class="text-4xl">⏱️</div>
            <div>
              <p class="text-sm text-gray-500 font-bold uppercase tracking-wider">Tentativas Médias (Respostas)</p>
              <p class="text-3xl font-black text-gray-800">{{ subMetrics.overview.totalAnswers }} totais</p>
            </div>
          </div>
        </div>

        <!-- Curva de Aprendizado / Gargalos -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
          <h3 class="font-black text-gray-800 text-center mb-2 w-full text-lg">Desempenho por Categoria (Curva de Aprendizado)</h3>
          <p class="text-xs text-gray-500 text-center mb-6">Taxa de acerto por tipo de atividade desta turma</p>
          
          <div class="w-full max-w-[250px] aspect-square relative flex items-center justify-center">
            <Doughnut v-if="chartData.datasets[0].data.length > 0" :data="chartData" :options="chartOptions" />
            <div v-else class="text-gray-400 text-sm italic text-center">Sem dados de jogo para esta turma...</div>
          </div>
          
          <div class="w-full mt-8 space-y-3" v-if="subMetrics.categoryPerformance.length > 0">
            <div v-for="cat in subMetrics.categoryPerformance" :key="cat.category" class="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
              <span class="font-bold text-gray-600 capitalize">{{ cat.category === 'association' ? 'Associação' : cat.category === 'translation' ? 'Tradução' : 'Sentenças' }}</span>
              <span class="font-black" :class="cat.accuracy < 50 ? 'text-red-500' : 'text-eco-green'">{{ cat.accuracy }}%</span>
            </div>
          </div>
        </div>
      </template>
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
const subMetrics = ref(null)

const pending = ref(true)
const error = ref(null)

const selectedSubadminId = ref('')
const subadminPending = ref(false)

const loadInitialMetrics = async () => {
  pending.value = true
  error.value = null
  try {
    const response = await $fetch('/api/admin/master-metrics?type=subadmins_list')
    metrics.value = response
  } catch (err) {
    console.error(err)
    error.value = err
  } finally {
    pending.value = false
  }
}

const fetchSubadminData = async () => {
  if (!selectedSubadminId.value) return
  
  subadminPending.value = true
  try {
    const response = await $fetch(`/api/admin/master-metrics?subadminId=${selectedSubadminId.value}`)
    subMetrics.value = response
  } catch (err) {
    console.error(err)
    alert("Erro ao buscar dados do subadmin")
  } finally {
    subadminPending.value = false
  }
}

onMounted(() => {
  loadInitialMetrics()
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' }
  }
}

const chartData = computed(() => {
  if (!subMetrics.value || !subMetrics.value.categoryPerformance) return { labels: [], datasets: [{ data: [] }] }
  
  const labels = subMetrics.value.categoryPerformance.map(c => 
    c.category === 'association' ? 'Associação' : c.category === 'translation' ? 'Tradução' : 'Sentenças'
  )
  const data = subMetrics.value.categoryPerformance.map(c => c.accuracy)
  
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
