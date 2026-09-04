<template>
  <div class="space-y-6">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <label class="block text-gray-500 font-bold mb-2 text-sm uppercase tracking-wider pl-2">Selecione o Aluno</label>
      <select v-model="selectedStudentSlug" class="w-full md:w-1/2 px-5 py-3 rounded-2xl border-2 border-gray-100 focus:border-eco-green focus:ring-0 outline-none transition-all font-bold text-gray-700 shadow-sm bg-gray-50">
        <option value="" disabled>Selecione um aluno da turma</option>
        <option v-for="student in students" :key="student.slug" :value="student.slug">
          {{ student.first_name }} {{ student.last_name }}
        </option>
      </select>
    </div>

    <div v-if="pending" class="text-center py-12 text-gray-400 font-bold animate-pulse">
      Carregando histórico do aluno...
    </div>

    <div v-else-if="!selectedStudentSlug" class="text-center py-12 text-gray-400 italic">
      Selecione um aluno acima para ver seu desempenho.
    </div>

    <template v-else-if="metrics">
      <!-- Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-eco-blue">
          <div class="text-4xl">🌟</div>
          <div>
            <p class="text-sm text-gray-500 font-bold uppercase tracking-wider">Pontuação (XP)</p>
            <p class="text-3xl font-black text-gray-800">{{ metrics.score }}</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-eco-green">
          <div class="text-4xl">🎯</div>
          <div>
            <p class="text-sm text-gray-500 font-bold uppercase tracking-wider">Taxa de Acertos</p>
            <p class="text-3xl font-black text-gray-800">{{ metrics.accuracy }}%</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-eco-yellow">
          <div class="text-4xl">🏋️</div>
          <div>
            <p class="text-sm text-gray-500 font-bold uppercase tracking-wider">Tentativas (Média)</p>
            <p class="text-3xl font-black text-gray-800">{{ metrics.avgAttempts }}<span class="text-sm text-gray-400 font-bold ml-1">por questão</span></p>
          </div>
        </div>
      </div>

      <!-- Gráficos -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="font-black text-gray-800 text-lg mb-2">Curva de Aprendizado (30 dias)</h3>
          <p class="text-xs text-gray-500 mb-6">Evolução da taxa de acerto por dia jogado</p>
          <div class="w-full h-64 relative">
            <Line v-if="lineChartData.labels.length > 0" :data="lineChartData" :options="lineOptions" />
            <div v-else class="flex h-full items-center justify-center text-gray-400 text-sm italic">
              Aluno ainda não respondeu perguntas nos últimos 30 dias.
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="font-black text-gray-800 text-lg mb-2">Desempenho por Categoria</h3>
          <p class="text-xs text-gray-500 mb-6">Em quais tipos de atividade o aluno vai melhor?</p>
          
          <div class="space-y-6">
            <div v-for="cat in metrics.categoryPerformance" :key="cat.category">
              <div class="flex justify-between mb-1">
                <span class="text-sm font-bold text-gray-700 capitalize">{{ cat.category === 'association' ? 'Associação' : cat.category === 'translation' ? 'Tradução' : 'Sentenças' }}</span>
                <span class="text-sm font-bold" :class="cat.accuracy < 50 ? 'text-red-500' : 'text-eco-green'">{{ cat.accuracy }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="h-2.5 rounded-full" :class="cat.accuracy < 50 ? 'bg-red-400' : 'bg-eco-green'" :style="{ width: cat.accuracy + '%' }"></div>
              </div>
            </div>
            
            <div v-if="metrics.categoryPerformance.length === 0" class="text-gray-400 text-sm italic text-center py-4">
              Sem dados suficientes.
            </div>
          </div>
        </div>

      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { useSupabaseClient } from '#imports'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const props = defineProps({
  schoolYear: { type: Number, required: true },
  calendarYear: { type: Number, required: true },
  adminId: { type: String, required: true }
})

const supabase = useSupabaseClient()
const students = ref([])
const selectedStudentSlug = ref('')

const fetchStudents = async () => {
  const { data } = await supabase
    .from('students_whitelist')
    .select('first_name, last_name, slug')
    .eq('admin_id', props.adminId)
    .eq('school_year', props.schoolYear)
    .eq('calendar_year', props.calendarYear)
    .order('first_name')
  
  students.value = data || []
  if (students.value.length === 0) selectedStudentSlug.value = ''
}

onMounted(() => {
  fetchStudents()
})

watch(() => [props.schoolYear, props.calendarYear], () => {
  fetchStudents()
})

const { data: metrics, pending, refresh } = await useFetch('/api/admin/student-metrics', {
  query: computed(() => ({
    studentSlug: selectedStudentSlug.value
  })),
  immediate: false,
  watch: [selectedStudentSlug]
})

// Line Chart Config
const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { beginAtZero: true, max: 100 }
  },
  plugins: {
    legend: { display: false }
  }
}

const lineChartData = computed(() => {
  if (!metrics.value || !metrics.value.learningCurve) return { labels: [], datasets: [] }
  
  const labels = metrics.value.learningCurve.map(d => d.date)
  const data = metrics.value.learningCurve.map(d => d.accuracy)
  
  return {
    labels,
    datasets: [{
      label: 'Taxa de Acerto (%)',
      data,
      borderColor: '#4ade80',
      backgroundColor: 'rgba(74, 222, 128, 0.2)',
      tension: 0.4,
      fill: true
    }]
  }
})
</script>
