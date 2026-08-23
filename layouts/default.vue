<template>
  <div class="flex flex-col min-h-screen relative">
    <!-- Bubble background elements for playful design -->
    <div class="absolute top-[-10%] left-[-10%] w-64 h-64 bg-eco-green/10 rounded-full blur-3xl z-0"></div>
    <div class="absolute bottom-[10%] right-[-5%] w-80 h-80 bg-eco-blue/10 rounded-full blur-3xl z-0"></div>

    <header class="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm py-3 px-4 sm:px-6 flex items-center justify-between border-b border-white/50">
      <div class="flex items-center gap-2 sm:gap-4">
        <button @click="goHome" class="p-2 sm:p-3 rounded-full hover:bg-eco-green/10 transition-colors text-eco-green shadow-sm bg-white" title="Home">
          <HomeIcon class="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button @click="goBack" class="p-2 sm:p-3 rounded-full hover:bg-eco-blue/10 transition-colors text-eco-blue shadow-sm bg-white" v-if="gameStore.user.isLoggedIn" title="Voltar">
          <ArrowLeftIcon class="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div class="flex-1 max-w-md mx-4" v-if="gameStore.user.isLoggedIn && !gameStore.isFinished">
        <div class="flex justify-between text-xs sm:text-sm font-extrabold text-gray-500 mb-1 uppercase tracking-wider">
          <span class="text-eco-green">Nível {{ gameStore.progress }} / {{ gameStore.totalLevels }}</span>
          <span class="text-eco-blue">Pontos: {{ gameStore.score }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-4 sm:h-5 shadow-inner p-0.5">
          <div class="bg-gradient-to-r from-eco-green via-eco-yellow to-eco-blue h-full rounded-full transition-all duration-700 ease-out shadow-sm" :style="{ width: progressPercentage + '%' }"></div>
        </div>
      </div>

      <div class="font-black text-transparent bg-clip-text bg-gradient-to-r from-eco-green to-eco-blue text-xl sm:text-2xl hidden md:block">
        Eco-Vocabulary
      </div>
    </header>

    <main class="flex-1 flex flex-col relative overflow-x-hidden p-4 sm:p-8 z-10">
      <slot />
    </main>

    <footer class="bg-white/60 backdrop-blur-sm py-4 sm:py-6 text-center text-xs sm:text-sm text-gray-500 mt-auto z-10 border-t border-white/50">
      <p class="font-medium">Desenvolvido por <span class="font-bold text-gray-700">Leonardo Bezerra</span></p>
      <div class="mt-2 flex justify-center gap-4">
        <a href="#" class="text-eco-blue hover:text-eco-blue-light transition-colors font-bold">GitHub</a>
        <a href="#" class="text-eco-blue hover:text-eco-blue-light transition-colors font-bold">LinkedIn</a>
        <a href="#" class="text-eco-blue hover:text-eco-blue-light transition-colors font-bold">Instagram</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Home as HomeIcon, ArrowLeft as ArrowLeftIcon } from 'lucide-vue-next'
import { useGameStore } from '~/stores/game'

const gameStore = useGameStore()
const router = useRouter()

const progressPercentage = computed(() => {
  if (gameStore.totalLevels === 0) return 0
  return (gameStore.progress / gameStore.totalLevels) * 100
})

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  gameStore.previousQuestion()
}
</script>
