<template>
  <div class="space-y-6">
    <div class="flex bg-white rounded-lg p-1 shadow-sm border border-gray-100 mb-6 inline-flex">
      <button 
        @click="viewMode = 'class'"
        :class="['px-6 py-2 rounded-md font-bold text-sm transition-all', viewMode === 'class' ? 'bg-eco-blue text-white shadow-md' : 'text-gray-500 hover:text-gray-700']"
      >
        Métricas da Turma
      </button>
      <button 
        @click="viewMode = 'student'"
        :class="['px-6 py-2 rounded-md font-bold text-sm transition-all', viewMode === 'student' ? 'bg-eco-green text-white shadow-md' : 'text-gray-500 hover:text-gray-700']"
      >
        Métricas do Aluno
      </button>
    </div>

    <div v-if="viewMode === 'class'">
      <ClassOverview :schoolYear="schoolYear" :calendarYear="calendarYear" />
    </div>
    
    <div v-if="viewMode === 'student'">
      <StudentOverview :schoolYear="schoolYear" :calendarYear="calendarYear" :adminId="adminId" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ClassOverview from './ClassOverview.vue'
import StudentOverview from './StudentOverview.vue'

const props = defineProps({
  schoolYear: { type: Number, required: true },
  calendarYear: { type: Number, required: true },
  adminId: { type: String, required: true }
})

const viewMode = ref('class')
</script>
