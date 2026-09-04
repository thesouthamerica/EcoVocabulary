<template>
  <div class="glass-panel w-full max-w-3xl mx-auto p-6 sm:p-10 flex flex-col items-center justify-center min-h-[400px]">
    
    <div class="text-center mb-8">
      <TranslationHover :translation="question.promptEn">
        <h2 class="text-3xl sm:text-4xl font-black text-gray-800 cursor-help mb-4 px-4">{{ question.promptPt }}</h2>
      </TranslationHover>
      <div v-if="question.imageUrl" class="mt-6 flex justify-center w-full">
        <TranslationHover 
          :translation="question.promptEn"
          :class="question.imageUrl && question.imageUrl.startsWith('http') ? 'w-full' : ''"
        >
          <div :class="[
            'relative rounded-3xl overflow-hidden border-4 border-white shadow-lg cursor-help transition-transform hover:scale-105 bg-white flex items-center justify-center mx-auto',
            question.imageUrl && question.imageUrl.startsWith('http') 
              ? 'w-full h-48 sm:h-72' 
              : 'w-48 h-48 sm:w-64 sm:h-64 text-[100px] sm:text-[130px]'
          ]">
            <img v-if="question.imageUrl && question.imageUrl.startsWith('http')" :src="question.imageUrl" alt="Imagem da pergunta" class="w-full h-full object-cover" />
            <span v-else>{{ question.imageUrl }}</span>
          </div>
        </TranslationHover>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-auto">
      <button 
        v-for="option in question.options" 
        :key="option.id"
        @click="selectOption(option)"
        :class="[
          'py-4 px-6 rounded-2xl font-bold text-lg sm:text-xl transition-all shadow-md',
          optionState[option.id] === 'correct' 
            ? 'bg-eco-green text-white scale-105' 
            : optionState[option.id] === 'incorrect'
            ? 'bg-red-500 text-white opacity-50 cursor-not-allowed'
            : 'bg-white hover:bg-gray-50 text-gray-700 hover:scale-105 border-2 border-transparent hover:border-eco-blue/30'
        ]"
        :disabled="isProcessing || optionState[option.id] === 'incorrect'"
      >
        {{ option.text }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import TranslationHover from '~/components/ui/TranslationHover.vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['answer'])

const optionState = ref({})
const isProcessing = ref(false)
const attemptsCount = ref(0)
const startTime = ref(0)
let timerInterval = null

const startTimer = () => {
  attemptsCount.value = 0
  startTime.value = Date.now()
  optionState.value = {}
}

onMounted(() => {
  startTimer()
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})

// Reset state when question changes
watch(() => props.question.id, () => {
  isProcessing.value = false
  startTimer()
})

const selectOption = (option) => {
  if (isProcessing.value || optionState.value[option.id] === 'incorrect') return
  
  attemptsCount.value++
  
  if (option.isCorrect) {
    optionState.value[option.id] = 'correct'
    isProcessing.value = true
    
    const timeTaken = Math.floor((Date.now() - startTime.value) / 1000)
    
    setTimeout(() => {
      emit('answer', {
        isCorrect: attemptsCount.value === 1, // Só pontua se acertou de primeira
        attempts: attemptsCount.value,
        timeTakenSeconds: timeTaken
      })
    }, 1000)
  } else {
    // Errou, fica vermelho, mas deixa tentar de novo
    optionState.value[option.id] = 'incorrect'
  }
}
</script>
