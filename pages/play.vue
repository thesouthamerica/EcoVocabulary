<template>
  <div class="flex-1 flex flex-col items-center justify-center w-full min-h-[70vh]">
    
    <div v-if="!gameStore.isFinished" class="w-full relative max-w-4xl mx-auto flex flex-col items-center">
      
      <!-- Questions -->
      <div v-if="!gameStore.isLevelFinished && gameStore.currentQuestion" class="w-full">
        <div class="text-center mb-8 animate-fade-in">
          <h1 class="text-3xl sm:text-4xl font-black text-eco-green mb-2">{{ gameStore.currentLevel.title }}</h1>
          <p class="text-gray-600 font-bold text-lg">{{ gameStore.currentLevel.description }}</p>
        </div>
        
        <Transition name="slide" mode="out-in">
          <QuestionCard 
            :key="gameStore.currentQuestion.id"
            :question="gameStore.currentQuestion"
            @answer="handleAnswer"
          />
        </Transition>
      </div>

      <!-- Level Summary / Feedback -->
      <div v-else-if="gameStore.isLevelFinished" class="w-full">
        <div class="glass-panel w-full max-w-2xl mx-auto p-8 sm:p-12 text-center animate-fade-in shadow-2xl">
          <h2 class="text-4xl font-black mb-4" :class="passedLevel ? 'text-eco-green' : 'text-eco-yellow'">
            {{ passedLevel ? 'Nível Concluído!' : 'Quase lá!' }}
          </h2>
          
          <div class="text-6xl mb-6">
            {{ passedLevel ? '🌟' : '💪' }}
          </div>
          
          <p class="text-xl font-bold text-gray-700 mb-6">
            Você acertou <span class="text-3xl text-eco-blue">{{ gameStore.levelScore }}</span> de 5 perguntas.
          </p>
          
          <p v-if="!passedLevel" class="text-red-500 font-bold mb-8">
            Você precisa acertar pelo menos 4 perguntas para avançar. Tente novamente!
          </p>
          <p v-else class="text-eco-green font-bold mb-8">
            Excelente trabalho! Você desbloqueou o próximo nível.
          </p>
          
          <button v-if="passedLevel" @click="gameStore.proceedToNextLevel()" class="btn-primary w-full sm:w-auto px-10 text-xl py-4 mx-auto flex items-center justify-center gap-2">
            Próximo Nível ➡️
          </button>
          <button v-else @click="gameStore.retryLevel()" class="btn-secondary w-full sm:w-auto px-10 text-xl py-4 mx-auto flex items-center justify-center gap-2">
            🔄 Tentar Novamente
          </button>
        </div>
      </div>

    </div>
    
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '~/stores/game'
import QuestionCard from '~/components/game/QuestionCard.vue'

const gameStore = useGameStore()
const router = useRouter()

const passedLevel = computed(() => gameStore.levelScore >= 4)

onMounted(() => {
  if (!gameStore.user.isLoggedIn) {
    router.push('/')
  }
})

watch(() => gameStore.isFinished, (finished) => {
  if (finished) {
    router.push('/congratulations')
  }
})

const handleAnswer = (isCorrect) => {
  gameStore.answerQuestion(isCorrect)
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100px) scale(0.95);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100px) scale(0.95);
}
</style>
