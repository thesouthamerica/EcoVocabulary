<template>
  <div class="space-y-6">
    <!-- Navegação de Abas Internas -->
    <div class="flex bg-white rounded-lg p-1 shadow-sm border border-gray-100 mb-6 inline-flex">
      <button 
        @click="viewMode = 'general'"
        :class="['px-6 py-2 rounded-md font-bold text-sm transition-all', viewMode === 'general' ? 'bg-eco-blue text-white shadow-md' : 'text-gray-500 hover:text-gray-700']"
      >
        🌍 Métricas Gerais
      </button>
      <button 
        @click="viewMode = 'subadmin'"
        :class="['px-6 py-2 rounded-md font-bold text-sm transition-all', viewMode === 'subadmin' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700']"
      >
        👨‍🏫 Métricas dos Subadmins
      </button>
    </div>

    <!-- Conteúdo das Abas -->
    <div v-if="viewMode === 'general'">
      <MasterGeneralMetrics :adminId="adminId" />
    </div>
    
    <div v-if="viewMode === 'subadmin'">
      <MasterSubadminMetrics :adminId="adminId" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MasterGeneralMetrics from './MasterGeneralMetrics.vue'
import MasterSubadminMetrics from './MasterSubadminMetrics.vue'

const props = defineProps({
  adminId: { type: String, required: true }
})

const viewMode = ref('general')
</script>
