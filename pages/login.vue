<template>
  <div class="flex-1 flex items-center justify-center min-h-[80vh]">
    <div class="glass-panel w-full max-w-md p-8 text-center animate-fade-in-up shadow-2xl">
      <div class="w-24 h-24 mx-auto bg-eco-green text-white rounded-full flex items-center justify-center text-5xl mb-6 shadow-xl shadow-eco-green/30 transform hover:rotate-12 transition-transform duration-300">
        🌍
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
          <div>
            <label class="block text-gray-500 font-bold mb-1 text-sm">Data de Nascimento</label>
            <input 
              v-model="birthDate" 
              type="date" 
              class="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-eco-green focus:ring-0 outline-none transition-all text-center font-bold text-gray-700 text-lg shadow-inner"
              required
            />
          </div>
        </div>
        
        <button type="submit" class="w-full btn-primary flex justify-center items-center gap-2 text-lg py-4 mt-2">
          Começar a Jogar! 🚀
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '~/stores/game'

const gameStore = useGameStore()
const router = useRouter()
const supabase = useSupabaseClient()

const firstName = ref('')
const lastName = ref('')
const birthDate = ref('')

const handleLogin = () => {
  if (firstName.value.trim() && lastName.value.trim() && birthDate.value) {
    gameStore.login(firstName.value, lastName.value, birthDate.value, supabase)
    router.push('/menu')
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
