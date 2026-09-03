<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans">
    <nav class="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div class="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2 cursor-pointer" @click="$router.push('/admin')">
        Painel Admin
      </div>
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin" class="text-sm font-bold text-gray-500 hover:text-eco-blue transition-colors">Gerenciar Níveis</NuxtLink>
        <NuxtLink to="/admin/dashboard" class="text-sm font-bold text-gray-500 hover:text-eco-blue transition-colors">Dashboard</NuxtLink>
        <div class="h-4 w-px bg-gray-300 mx-2"></div>
        <NuxtLink to="/" class="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">Voltar ao Jogo</NuxtLink>
        <button @click="logout" v-if="user" class="text-sm font-bold text-red-500 hover:text-red-600 transition-colors px-3 py-1 rounded-md hover:bg-red-50">Sair</button>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useSupabaseUser, useSupabaseClient } from '#imports'
import { useRouter } from 'vue-router'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/admin/login')
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
