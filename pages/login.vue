<template>
  <div class="flex-1 flex items-center justify-center min-h-[80vh] p-4">
    <div class="glass-panel w-full max-w-md p-8 text-center animate-fade-in-up shadow-2xl">
      <div class="w-24 h-24 mx-auto flex items-center justify-center mb-6 relative">
        <img src="https://hkddkejyzdvepdlhadlf.supabase.co/storage/v1/object/public/imagens%20exercicios/login.png" alt="Eco-Vocabulary" class="w-full h-full object-contain transition-transform duration-500 origin-[50%_75%] hover:scale-[2.2]">
      </div>
      
      <h1 class="text-3xl font-black text-gray-800 mb-2">Eco-Vocabulary</h1>
      <p class="text-gray-600 mb-8 font-medium">Aprenda inglês enquanto salva o planeta!</p>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div class="space-y-3">
          <input 
            v-model="firstName" 
            type="text" 
            placeholder="Seu primeiro nome" 
            class="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-eco-green focus:ring-0 outline-none transition-all text-center font-bold text-gray-700 placeholder-gray-400 text-lg shadow-inner"
            required
          />
          <input 
            v-model="lastName" 
            type="text" 
            placeholder="Seu sobrenome" 
            class="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-eco-green focus:ring-0 outline-none transition-all text-center font-bold text-gray-700 placeholder-gray-400 text-lg shadow-inner"
            required
          />
          
          <div class="text-left relative z-20">
            <label class="block text-gray-500 font-bold mb-1 text-sm pl-2">Escola / Professor</label>
            <div class="relative">
              <button 
                type="button" 
                @click="showTeacherDropdown = !showTeacherDropdown" 
                class="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 outline-none transition-all font-bold text-gray-700 text-lg shadow-inner bg-white flex justify-between items-center hover:border-eco-green"
              >
                <span class="flex-1 text-center truncate px-2" :class="!selectedTeacher ? 'text-gray-400' : ''">
                  {{ selectedTeacher ? teachers.find(t => t.id === selectedTeacher)?.name : 'Selecione seu professor' }}
                </span>
                <span class="text-gray-400 text-sm transition-transform duration-300" :class="showTeacherDropdown ? 'rotate-180' : ''">▼</span>
              </button>
              
              <div v-if="showTeacherDropdown" class="absolute left-1/2 -translate-x-1/2 mt-2 w-[110%] bg-white border border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto z-50">
                <button 
                  type="button" 
                  v-for="teacher in teachers" 
                  :key="teacher.id" 
                  @click="selectedTeacher = teacher.id; showTeacherDropdown = false" 
                  class="w-full text-center px-4 py-3 hover:bg-eco-green hover:text-white font-bold text-gray-700 transition-colors border-b border-gray-100 last:border-0"
                >
                  {{ teacher.name }}
                </button>
              </div>
            </div>
            <div v-if="showTeacherDropdown" @click="showTeacherDropdown = false" class="fixed inset-0 z-40"></div>
          </div>

          <div class="text-left relative z-10">
            <label class="block text-gray-500 font-bold mb-1 text-sm pl-2">Ano Escolar</label>
            <div class="relative">
              <button 
                type="button" 
                @click="showYearDropdown = !showYearDropdown" 
                class="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 outline-none transition-all font-bold text-gray-700 text-lg shadow-inner bg-white flex justify-between items-center hover:border-eco-green"
              >
                <span class="flex-1 text-center truncate px-2" :class="!schoolYear ? 'text-gray-400' : ''">
                  {{ schoolYear ? schoolYear + 'º Ano' : 'Selecione seu ano escolar' }}
                </span>
                <span class="text-gray-400 text-sm transition-transform duration-300" :class="showYearDropdown ? 'rotate-180' : ''">▼</span>
              </button>
              
              <div v-if="showYearDropdown" class="absolute left-1/2 -translate-x-1/2 mt-2 w-[110%] bg-white border border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto z-50">
                <button 
                  type="button" 
                  v-for="year in 9" 
                  :key="year" 
                  @click="schoolYear = year; showYearDropdown = false" 
                  class="w-full text-center px-4 py-3 hover:bg-eco-green hover:text-white font-bold text-gray-700 transition-colors border-b border-gray-100 last:border-0"
                >
                  {{ year }}º Ano
                </button>
              </div>
            </div>
            <div v-if="showYearDropdown" @click="showYearDropdown = false" class="fixed inset-0 z-40"></div>
          </div>

          <div class="text-left">
            <label class="block text-gray-500 font-bold mb-1 text-sm pl-2">Ano Letivo</label>
            <input 
              v-model="calendarYear" 
              type="number" 
              min="2020"
              max="2100"
              class="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-eco-green focus:ring-0 outline-none transition-all text-center font-bold text-gray-700 text-lg shadow-inner"
              required
            />
          </div>
        </div>

        <div v-if="errorMsg" class="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg border border-red-200">
          {{ errorMsg }}
        </div>
        
        <button type="submit" :disabled="loading" class="w-full btn-primary flex justify-center items-center gap-2 text-lg py-4 mt-2 disabled:opacity-75">
          <span v-if="loading" class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
          Começar a Jogar! 🚀
        </button>

        <div class="relative flex items-center justify-center mt-6 mb-4">
          <div class="border-t border-gray-300 w-full"></div>
          <span class="bg-white px-3 text-sm text-gray-400 font-bold absolute">OU</span>
        </div>

        <button @click="handleVisitorLogin" type="button" :disabled="loading" class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl flex justify-center items-center gap-2 text-lg py-3 transition-colors disabled:opacity-75">
          Entrar como Visitante
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '~/stores/game'

const gameStore = useGameStore()
const router = useRouter()
const supabase = useSupabaseClient()

const firstName = ref('')
const lastName = ref('')
const selectedTeacher = ref('')
const showTeacherDropdown = ref(false)
const showYearDropdown = ref(false)
const schoolYear = ref('')
const calendarYear = ref(new Date().getFullYear())
const teachers = ref([])
const errorMsg = ref('')
const loading = ref(false)

onMounted(async () => {
  teachers.value = await gameStore.fetchTeachers(supabase)
})

const handleLogin = async () => {
  if (firstName.value.trim() && lastName.value.trim() && selectedTeacher.value && schoolYear.value) {
    loading.value = true
    errorMsg.value = ''
    
    const result = await gameStore.login(
      firstName.value, 
      lastName.value, 
      Number(schoolYear.value), 
      selectedTeacher.value, 
      false, 
      supabase,
      Number(calendarYear.value)
    )

    if (result.success) {
      router.push('/menu')
    } else {
      errorMsg.value = result.error
      loading.value = false
    }
  }
}

const handleVisitorLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  
  const result = await gameStore.login(
    "", 
    "", 
    0, 
    null, 
    true, 
    supabase,
    new Date().getFullYear()
  )

  if (result.success) {
    router.push('/menu')
  } else {
    errorMsg.value = "Erro ao entrar como visitante."
    loading.value = false
  }
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
