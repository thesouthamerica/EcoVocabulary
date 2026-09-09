<template>
  <div class="min-h-screen flex flex-col bg-eco-bg font-sans bg-cover bg-center" style="background-image: url('https://hkddkejyzdvepdlhadlf.supabase.co/storage/v1/object/public/imagens%20exercicios/images/fundologin.png')">
    <div class="flex-1 flex items-center justify-center p-4">
      <div class="glass-panel w-full max-w-2xl p-8 md:p-12 text-center animate-fade-in-up shadow-2xl relative overflow-hidden bg-white/90 backdrop-blur-md rounded-3xl border border-white/50">
        
        <!-- Elemento decorativo -->
        <div class="absolute -top-10 -right-10 text-9xl opacity-10">🌿</div>
        <div class="absolute -bottom-10 -left-10 text-9xl opacity-10">🌍</div>

        <div class="relative z-10">
          <div class="w-64 h-64 mx-auto flex items-center justify-center mb-6">
            <img src="https://hkddkejyzdvepdlhadlf.supabase.co/storage/v1/object/public/imagens%20exercicios/404.png" alt="Logo Aves" class="w-full h-full object-contain drop-shadow-lg opacity-75" />
          </div>

          <h1 class="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-eco-green to-eco-blue mb-2">
            {{ error?.statusCode === 404 ? '404' : error?.statusCode }}
          </h1>
          
          <h2 class="text-2xl font-black text-gray-800 mb-4">
            {{ error?.statusCode === 404 ? 'Ops!' : 'Ops! Tivemos um probleminha.' }}
          </h2>
          
          <p class="text-gray-600 mb-8 font-medium text-lg max-w-lg mx-auto">
            {{ error?.statusCode === 404 
              ? 'A página que você está procurando não existe, foi removida ou mudou de endereço.' 
              : 'Algo não saiu como esperado. Nossa equipe de guardiões já está verificando!' }}
          </p>

          <!-- Links Úteis -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-200 pt-8 mt-4">
            <button @click="handleError('/')" class="flex flex-col items-center p-4 rounded-2xl hover:bg-white transition-all group shadow-sm border border-transparent hover:border-gray-200 cursor-pointer">
              <span class="text-3xl mb-2 group-hover:scale-110 transition-transform">🏠</span>
              <span class="font-bold text-gray-700 text-sm">Página Inicial</span>
            </button>
            
            <button @click="handleError('/login')" class="flex flex-col items-center p-4 rounded-2xl hover:bg-white transition-all group shadow-sm border border-transparent hover:border-gray-200 cursor-pointer">
              <span class="text-3xl mb-2 group-hover:scale-110 transition-transform">🎒</span>
              <span class="font-bold text-gray-700 text-sm">Área do Aluno</span>
            </button>

            <button @click="handleError('/admin')" class="flex flex-col items-center p-4 rounded-2xl hover:bg-white transition-all group shadow-sm border border-transparent hover:border-gray-200 cursor-pointer">
              <span class="text-3xl mb-2 group-hover:scale-110 transition-transform">👨‍🏫</span>
              <span class="font-bold text-gray-700 text-sm">Painel do Professor</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

// Clear the error and redirect
const handleError = (path) => {
  clearError({ redirect: path })
}
</script>

<style scoped>
.bg-eco-bg {
  background-color: #f0fdf4; /* Fallback caso a imagem falhe */
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
