<template>
  <div class="flex-1 flex flex-col items-center justify-center w-full min-h-[70vh] py-8">
    
    <div class="w-full relative max-w-4xl mx-auto flex flex-col items-center text-center">
      <h1 class="text-4xl sm:text-5xl font-black text-eco-green mb-4">Escolha um Nível</h1>
      <p class="text-xl font-bold text-gray-600 mb-8">
        Pontuação Total: <span class="text-eco-blue">{{ gameStore.score }}</span>
      </p>

      <!-- Level Grid -->
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 w-full px-4">
        <button
          v-for="(level, index) in gameStore.levels"
          :key="index"
          @click="selectLevel(index)"
          :disabled="index > gameStore.maxUnlockedLevel"
          class="aspect-square rounded-2xl flex flex-col items-center justify-center p-4 transition-all duration-300 font-bold border-4"
          :class="[
            index <= gameStore.maxUnlockedLevel 
              ? 'bg-white border-eco-green text-eco-green hover:-translate-y-2 hover:shadow-lg hover:shadow-eco-green/20 cursor-pointer shadow-md' 
              : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-70'
          ]"
        >
          <span class="text-3xl mb-1">{{ index <= gameStore.maxUnlockedLevel ? '🌟' : '🔒' }}</span>
          <span class="text-xl">{{ index + 1 }}</span>
        </button>
      </div>

      <!-- Botão para o certificado caso todos os níveis tenham sido completados -->
      <div v-if="gameStore.maxUnlockedLevel >= gameStore.totalLevels" class="mt-12 animate-fade-in-up">
        <button @click="router.push('/congratulations')" class="relative overflow-hidden px-8 py-5 rounded-full font-black text-2xl text-white bg-gradient-to-r from-eco-yellow via-orange-500 to-eco-green shadow-xl hover:shadow-2xl hover:scale-110 transition-transform duration-300 animate-pulse border-4 border-white">
          <span class="relative z-10 flex items-center gap-2">
            🎉 VER MEU CERTIFICADO 🏆
          </span>
          <div class="absolute inset-0 bg-white/20"></div>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '~/stores/game'

const gameStore = useGameStore()
const router = useRouter()

onMounted(() => {
  if (!gameStore.user.isLoggedIn) {
    router.push('/login')
  }
})

const selectLevel = (index) => {
  if (index <= gameStore.maxUnlockedLevel) {
    gameStore.playLevel(index)
    router.push('/play')
  }
}
</script>
