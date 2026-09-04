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
          
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto">
            <button v-if="passedLevel" @click="handleProceed" class="btn-primary w-full sm:w-auto px-10 text-xl py-4 flex items-center justify-center gap-2 flex-1">
              Próximo Nível ➡️
            </button>
            <button v-else @click="gameStore.retryLevel()" class="btn-secondary w-full sm:w-auto px-10 text-xl py-4 flex items-center justify-center gap-2 flex-1">
              🔄 Tentar Novamente
            </button>
            
            <NuxtLink to="/menu" class="w-full sm:w-auto px-6 py-4 font-bold text-gray-500 hover:text-eco-blue transition-colors text-center border-2 border-transparent hover:border-gray-200 rounded-full flex-1">
              🏠 Voltar ao Menu
            </NuxtLink>
          </div>
        </div>
      </div>

    </div>
    
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabaseClient } from '#imports'
import { useGameStore } from '~/stores/game'
import QuestionCard from '~/components/game/QuestionCard.vue'

const gameStore = useGameStore()
const router = useRouter()
const supabase = useSupabaseClient()

const passedLevel = computed(() => gameStore.levelScore >= 4)

onMounted(() => {
  if (!gameStore.user.isLoggedIn) {
    router.push('/login')
  }
})

watch(() => gameStore.isFinished, (finished) => {
  if (finished) {
    router.push('/congratulations')
  }
})

const handleAnswer = (answerData) => {
  gameStore.answerQuestion(answerData.isCorrect, answerData.attempts, answerData.timeTakenSeconds, supabase)
}

const handleProceed = () => {
  gameStore.proceedToNextLevel(supabase)
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
