<template>
  <div class="flex items-center justify-center min-h-[70vh]">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-black text-gray-800">Admin Login</h1>
        <p class="text-sm text-gray-500 mt-2">Área restrita para administração do Eco-Vocabulary.</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">E-mail</label>
          <input v-model="email" type="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="admin@exemplo.com" />
        </div>
        
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-1">Senha</label>
          <input v-model="password" type="password" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="••••••••" />
        </div>

        <div v-if="errorMsg" class="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">
          {{ errorMsg }}
        </div>
        
        <button type="submit" :disabled="loading" class="w-full btn-secondary disabled:opacity-70 flex justify-center items-center">
          <span v-if="loading" class="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
      
      <div class="mt-6 text-xs text-center text-gray-400">
        <p>Apenas administradores autorizados. Para adicionar um administrador, utilize o painel do Supabase > Authentication > Users.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const supabase = useSupabaseClient()
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  
  if (error) {
    errorMsg.value = 'Credenciais inválidas. Tente novamente.'
  } else {
    router.push('/admin')
  }
  
  loading.value = false
}
</script>
