<template>
  <div class="relative inline-block" @mouseenter="isHovered = true" @mouseleave="isHovered = false" @touchstart="isHovered = true" @touchend="isHovered = false">
    <slot />
    
    <div 
      v-if="isHovered" 
      v-motion
      :initial="{ opacity: 0, y: 10, scale: 0.9 }"
      :enter="{ opacity: 1, y: -5, scale: 1 }"
      :leave="{ opacity: 0, y: 10, scale: 0.9 }"
      class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-white text-eco-blue font-bold text-sm sm:text-base rounded-xl shadow-lg border border-eco-blue/20 whitespace-nowrap z-50 pointer-events-none flex items-center gap-2"
    >
      <span class="text-xl">🇺🇸</span>
      {{ translation }}
      
      <!-- Tooltip arrow -->
      <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-white"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  translation: {
    type: String,
    required: true
  }
})

const isHovered = ref(false)
</script>
