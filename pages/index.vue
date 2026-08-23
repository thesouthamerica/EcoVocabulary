<template>
  <div class="flex-1 flex items-center justify-center min-h-[80vh]">
    <div class="glass-panel w-full max-w-md p-8 text-center animate-fade-in-up shadow-2xl">
      
      <h1 class="text-4xl font-black text-gray-800 mb-4">Eco-Vocabulary</h1>
      
      <p class="text-gray-600 mb-8 font-medium">
        Bem-vindo ao Eco-Vocabulary!<br>
Aprenda inglês brincando e descubra como se tornar um super-herói do nosso planeta.
      </p>

      <!-- Logo Illustration -->
      <div class="w-full flex justify-center mb-8">
        <div class="relative inline-block group overflow-visible transform transition-transform hover:scale-105 duration-300 cursor-pointer">
          
          <!-- Balão de Fala (Canto Superior Esquerdo) -->
          <div class="absolute right-full mr-2 top-0 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-210 bg-white text-red-600 font-bold rounded-xl px-5 py-3 drop-shadow-2xl border border-gray-200 whitespace-nowrap after:content-[''] after:absolute after:top-4 after:left-full after:border-8 after:border-transparent after:border-l-white">
            Are you ready to learn?
          </div>
          
          <!-- Balão de Fala (Lateral Direita) -->
          <div class="absolute left-full ml-2 bottom-8 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-150 bg-white text-blue-600 font-black rounded-xl px-5 py-3 drop-shadow-2xl border border-gray-200 whitespace-nowrap after:content-[''] after:absolute after:top-1/2 after:-translate-y-1/2 after:right-full after:border-8 after:border-transparent after:border-r-white">
            Yeah!!!
          </div>

          <img 
            src="https://hkddkejyzdvepdlhadlf.supabase.co/storage/v1/object/public/imagens%20exercicios/images/logo%20aves.png" 
            alt="Logo Aves" 
            class="h-48 object-contain drop-shadow-lg"
          />
        </div>
      </div>
      
      <button @click="goToLogin" class="w-full max-w-xs mx-auto btn-primary flex flex-col justify-center items-center gap-0.5 py-2 text-base transition-all duration-300 hover:shadow-lg hover:shadow-eco-green/30">
        <span class="font-bold">Clique aqui para começar</span>
        <span class="text-xs font-medium opacity-90">Click here to start</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
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
