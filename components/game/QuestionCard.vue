<template>
  <div class="glass-panel w-full max-w-3xl mx-auto p-6 sm:p-10 flex flex-col items-center justify-center min-h-[400px]">
    
    <div class="text-center mb-8">
      <TranslationHover :translation="question.promptEn">
        <h2 class="text-3xl sm:text-4xl font-black text-gray-800 cursor-help mb-4 px-4">{{ question.promptPt }}</h2>
      </TranslationHover>
      
      <div v-if="question.imageUrl" class="mt-6 flex justify-center">
        <TranslationHover :translation="question.imageLabelEn">
          <div class="relative w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-4 border-white shadow-lg cursor-help transition-transform hover:scale-105">
            <img :src="question.imageUrl" alt="Imagem da pergunta" class="w-full h-full object-cover" />
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
          selectedOption?.id === option.id 
            ? (option.isCorrect ? 'bg-eco-green text-white scale-105' : 'bg-red-500 text-white animate-pulse')
            : 'bg-white hover:bg-gray-50 text-gray-700 hover:scale-105 border-2 border-transparent hover:border-eco-blue/30'
        ]"
        :disabled="isProcessing"
      >
        {{ option.text }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import TranslationHover from '~/components/ui/TranslationHover.vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['answer'])

const selectedOption = ref(null)
const isProcessing = ref(false)

// Reset state when question changes
watch(() => props.question.id, () => {
  selectedOption.value = null
  isProcessing.value = false
})

const selectOption = (option) => {
  if (isProcessing.value) return
  
  selectedOption.value = option
  isProcessing.value = true
  
  setTimeout(() => {
    emit('answer', option.isCorrect)
  }, 1000)
}
</script>
