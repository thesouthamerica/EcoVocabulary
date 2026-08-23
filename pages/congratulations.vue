<template>
  <div class="flex-1 flex items-center justify-center min-h-[80vh] py-8">
    <div ref="certificateRef" class="glass-panel w-full max-w-2xl p-8 sm:p-14 text-center relative overflow-hidden bg-white shadow-2xl mx-4">
      
      <!-- Certificate decor -->
      <div class="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div class="absolute top-0 left-0 w-32 h-32 bg-eco-green/10 rounded-br-full"></div>
        <div class="absolute bottom-0 right-0 w-32 h-32 bg-eco-blue/10 rounded-tl-full"></div>
      </div>

      <div class="relative z-10 animate-scale-up">
        <div class="w-32 h-32 mx-auto bg-eco-yellow text-white rounded-full flex items-center justify-center text-6xl mb-8 shadow-2xl border-4 border-white">
          🏆
        </div>
        
        <h1 class="text-4xl sm:text-5xl font-black text-eco-green mb-4 leading-tight">
          Parabéns, {{ gameStore.user.displayName }}
        </h1>
        
        <p class="text-xl sm:text-2xl text-gray-700 font-bold mb-8">
          Você se tornou um <br class="sm:hidden" /><span class="text-eco-green uppercase text-2xl sm:text-3xl block mt-2">Guardião Eco-Bilingue</span>
        </p>

        <div class="bg-gray-50 rounded-3xl p-6 border-2 border-gray-100 shadow-inner mb-8 max-w-sm mx-auto transform hover:scale-105 transition-transform">
          <p class="text-gray-400 font-extrabold uppercase text-sm tracking-widest mb-1">Pontuação Final</p>
          <p class="text-5xl font-black text-eco-blue">{{ gameStore.score }} <span class="text-2xl text-gray-500">pts</span></p>
        </div>
      </div>
      
      <div class="relative z-10 flex flex-col sm:flex-row justify-center gap-4 mt-8" data-html2canvas-ignore>
        <button @click="downloadCertificate" class="btn-primary flex items-center justify-center gap-2 flex-1 text-lg py-4" :disabled="isGenerating">
          <span v-if="!isGenerating">📥 Baixar Certificado</span>
          <span v-else class="animate-pulse">Gerando...</span>
        </button>
        <button @click="restartGame" class="btn-secondary flex items-center justify-center gap-2 flex-1 text-lg py-4">
          🔄 Jogar Novamente
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '~/stores/game'

const gameStore = useGameStore()
const router = useRouter()
const certificateRef = ref(null)
const isGenerating = ref(false)

onMounted(() => {
  if (!gameStore.user.isLoggedIn || !gameStore.isFinished) {
    // Only redirect if not finished AND logged out, allowing refresh on this page if state persists
    // router.push('/')
  }
})

const restartGame = () => {
  gameStore.resetGame()
  router.push('/play')
}

const downloadCertificate = async () => {
  if (!certificateRef.value) return
  
  isGenerating.value = true
  try {
    const html2canvas = (await import('html2canvas')).default
    const canvas = await html2canvas(certificateRef.value, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true
    })
    
    const image = canvas.toDataURL("image/png", 1.0)
    const link = document.createElement('a')
    link.download = `certificado-eco-bilingue-${gameStore.user.dbId}.png`
    link.href = image
    link.click()
  } catch (err) {
    console.error("Erro ao gerar certificado", err)
    alert("Houve um erro ao baixar o certificado. Tente novamente.")
  } finally {
    isGenerating.value = false
  }
}
</script>

<style scoped>
.animate-scale-up {
  animation: scaleUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
