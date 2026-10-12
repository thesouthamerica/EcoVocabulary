<template>
  <div class="relative w-full h-full bg-gradient-to-b from-sky-100/70 via-emerald-50/40 to-teal-100/40 rounded-2xl sm:rounded-3xl border border-emerald-200/60 shadow-xs overflow-hidden flex items-center justify-center select-none">
    
    <!-- Warm Ambient Light / Sunbeams -->
    <div class="absolute -top-12 -right-12 w-44 h-44 bg-amber-200/35 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-8 -left-8 w-36 h-36 bg-emerald-200/25 rounded-full blur-2xl pointer-events-none"></div>

    <div class="w-full h-full relative flex items-center justify-center">
      <!-- SVG da Árvore Majestosa e Graciosa -->
      <svg viewBox="0 0 320 225" class="w-full h-full z-10 overflow-visible" preserveAspectRatio="xMidYMid meet">
        <defs>
          <!-- Gradientes de Céu e Raios de Sol -->
          <linearGradient id="skyRays" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fef08a" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
          </linearGradient>

          <!-- Gradientes do Solo e Colina -->
          <linearGradient id="hillBackGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#4ade80" />
            <stop offset="100%" stop-color="#22c55e" />
          </linearGradient>

          <linearGradient id="hillFrontGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#22c55e" />
            <stop offset="100%" stop-color="#15803d" />
          </linearGradient>

          <!-- Madeira da Árvore Majestosa (Casca de Carvalho / Cedro com Iluminação Natural) -->
          <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#5a2d0c" />
            <stop offset="25%" stop-color="#7c3f15" />
            <stop offset="60%" stop-color="#934d1b" />
            <stop offset="100%" stop-color="#4a2208" />
          </linearGradient>

          <linearGradient id="branchGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#8d4920" />
            <stop offset="100%" stop-color="#4a2208" />
          </linearGradient>

          <!-- Gradientes Orgânicos e Ricos da Folhagem -->
          <radialGradient id="leafClusterGrad1" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#86efac" />
            <stop offset="30%" stop-color="#34d399" />
            <stop offset="70%" stop-color="#059669" />
            <stop offset="100%" stop-color="#064e3b" />
          </radialGradient>

          <radialGradient id="leafClusterGrad2" cx="35%" cy="25%" r="75%">
            <stop offset="0%" stop-color="#a7f3d0" />
            <stop offset="35%" stop-color="#10b981" />
            <stop offset="75%" stop-color="#047857" />
            <stop offset="100%" stop-color="#064e3b" />
          </radialGradient>

          <radialGradient id="leafClusterGrad3" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#6ee7b7" />
            <stop offset="35%" stop-color="#22c55e" />
            <stop offset="75%" stop-color="#15803d" />
            <stop offset="100%" stop-color="#14532d" />
          </radialGradient>

          <!-- Sombra Suave -->
          <filter id="leafShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#064e3b" flood-opacity="0.3" />
          </filter>
        </defs>

        <!-- Raios de Sol Suaves -->
        <polygon points="280,10 160,220 90,220" fill="url(#skyRays)" class="animate-sunbeams" />
        <polygon points="240,10 230,220 180,220" fill="url(#skyRays)" class="animate-sunbeams" style="animation-delay: -2.5s;" />

        <!-- Colina de Fundo -->
        <path d="M 0 178 Q 160 160 320 178 L 320 225 L 0 225 Z" fill="url(#hillBackGrad)" opacity="0.85" />

        <!-- Colina em Primeiro Plano -->
        <path d="M 0 188 Q 160 168 320 188 L 320 225 L 0 225 Z" fill="url(#hillFrontGrad)" />

        <!-- Detalhes de Grama e Flores Silvestres -->
        <g opacity="0.65">
          <path d="M 48 196 Q 50 188 54 186 Q 52 193 55 197" stroke="#15803d" stroke-width="1.8" fill="none" stroke-linecap="round" />
          <path d="M 52 197 Q 56 189 61 188 Q 58 194 59 198" stroke="#16a34a" stroke-width="1.8" fill="none" stroke-linecap="round" />
          <path d="M 262 196 Q 260 188 256 186 Q 258 193 255 197" stroke="#15803d" stroke-width="1.8" fill="none" stroke-linecap="round" />
          <path d="M 258 197 Q 254 189 249 188 Q 252 194 251 198" stroke="#16a34a" stroke-width="1.8" fill="none" stroke-linecap="round" />
          <circle cx="75" cy="198" r="1.8" fill="#fef08a" />
          <circle cx="242" cy="198" r="1.8" fill="#fed7aa" />
        </g>

        <!-- Sombra Projetada da Árvore no Chão -->
        <ellipse cx="160" cy="196" rx="36" ry="6" fill="#0f3d1e" opacity="0.4" />

        <!-- ======================================================== -->
        <!-- ESTRUTURA COMPLETA DE GALHOS E TRONCO (SEMPRE VISÍVEIS!) -->
        <!-- ======================================================== -->
        <g class="tree-skeleton-layer">
          <!-- Tronco / Caule Sólido e Natural (Uma única peça sólida que emerge do solo) -->
          <path 
            d="M 143 196 C 147 186 148 174 149 158 C 149 144 150 132 148 120 C 146 112 142 106 136 100 L 142 96 C 148 103 154 110 156 118 C 158 108 160 98 160 88 L 164 88 C 164 98 166 108 168 118 C 170 110 176 103 182 96 L 188 100 C 182 106 178 112 176 120 C 174 132 175 144 175 158 C 176 174 177 186 181 196 Q 162 198 143 196 Z" 
            fill="url(#trunkGrad)" 
            stroke="#3e1d08" 
            stroke-width="1.2" 
          />

          <!-- Detalhes de Grama no Caule (ancorando no solo) -->
          <g opacity="0.8">
            <path d="M 140 197 Q 143 189 146 195 Q 149 190 152 197" stroke="#15803d" stroke-width="1.8" fill="none" stroke-linecap="round" />
            <path d="M 172 197 Q 175 189 178 195 Q 181 190 184 197" stroke="#16a34a" stroke-width="1.8" fill="none" stroke-linecap="round" />
          </g>

          <!-- GALHOS ESTRUTURAIS (Permanecem sempre na tela, mesmo com 6 erros!) -->
          <!-- 1. Galho Inferior Esquerdo (Bough 4) -->
          <path d="M 149 140 C 136 136 116 130 98 120 C 84 112 72 102 64 92" fill="none" stroke="url(#branchGrad)" stroke-width="4.8" stroke-linecap="round" />
          <!-- Twigs do Galho 4 -->
          <path d="M 94 122 C 90 112 82 104 76 96" fill="none" stroke="url(#branchGrad)" stroke-width="2.8" stroke-linecap="round" />
          <path d="M 80 110 C 74 112 68 116 62 110" fill="none" stroke="url(#branchGrad)" stroke-width="2" stroke-linecap="round" />

          <!-- 2. Galho Inferior Direito (Bough 5) -->
          <path d="M 175 140 C 188 136 208 130 226 120 C 240 112 252 102 260 92" fill="none" stroke="url(#branchGrad)" stroke-width="4.8" stroke-linecap="round" />
          <!-- Twigs do Galho 5 -->
          <path d="M 230 122 C 234 112 242 104 248 96" fill="none" stroke="url(#branchGrad)" stroke-width="2.8" stroke-linecap="round" />
          <path d="M 244 110 C 250 112 256 116 262 110" fill="none" stroke="url(#branchGrad)" stroke-width="2" stroke-linecap="round" />

          <!-- 3. Galho Superior Esquerdo (Bough 1) -->
          <path d="M 148 116 C 138 104 124 90 110 74 C 100 62 92 52 88 42" fill="none" stroke="url(#branchGrad)" stroke-width="4.5" stroke-linecap="round" />
          <!-- Twigs do Galho 1 -->
          <path d="M 124 88 C 120 78 114 68 110 58" fill="none" stroke="url(#branchGrad)" stroke-width="2.8" stroke-linecap="round" />
          <path d="M 104 70 C 98 72 92 78 86 74" fill="none" stroke="url(#branchGrad)" stroke-width="2" stroke-linecap="round" />
          <path d="M 96 56 C 98 48 96 42 94 36" fill="none" stroke="url(#branchGrad)" stroke-width="1.8" stroke-linecap="round" />

          <!-- 4. Galho Superior Direito (Bough 2) -->
          <path d="M 176 116 C 186 104 200 90 214 74 C 224 62 232 52 236 42" fill="none" stroke="url(#branchGrad)" stroke-width="4.5" stroke-linecap="round" />
          <!-- Twigs do Galho 2 -->
          <path d="M 200 88 C 204 78 210 68 214 58" fill="none" stroke="url(#branchGrad)" stroke-width="2.8" stroke-linecap="round" />
          <path d="M 220 70 C 226 72 232 78 238 74" fill="none" stroke="url(#branchGrad)" stroke-width="2" stroke-linecap="round" />
          <path d="M 228 56 C 226 48 228 42 230 36" fill="none" stroke="url(#branchGrad)" stroke-width="1.8" stroke-linecap="round" />

          <!-- 5. Galho Central do Cume da Copa (Bough 3) -->
          <path d="M 162 98 C 162 82 161 66 162 50 C 162 42 162 36 162 28" fill="none" stroke="url(#branchGrad)" stroke-width="3.8" stroke-linecap="round" />
          <!-- Twigs do Cume 3 -->
          <path d="M 162 66 C 154 56 148 48 144 40" fill="none" stroke="url(#branchGrad)" stroke-width="2.4" stroke-linecap="round" />
          <path d="M 162 60 C 168 52 174 46 180 40" fill="none" stroke="url(#branchGrad)" stroke-width="2.4" stroke-linecap="round" />

          <!-- Veios e Textura Orgânica do Caule -->
          <g opacity="0.32" stroke="#2b1204" stroke-width="1.1" stroke-linecap="round" fill="none">
            <path d="M 152 192 Q 151 162 153 134" />
            <path d="M 162 194 Q 163 164 161 128" />
            <path d="M 172 192 Q 173 162 171 134" />
          </g>

          <!-- Pássaro Canoro Gracioso no Galho Direito (Sempre presente até erro 6) -->
          <g v-if="mistakes < 6" transform="translate(182, 126)" class="songbird-gentle">
            <ellipse cx="6" cy="4" rx="7" ry="5" fill="#0284c7" />
            <circle cx="11.5" cy="1.8" r="3.8" fill="#0369a1" />
            <path d="M 5 4 Q 8 8 11 5" fill="#f97316" />
            <circle cx="12.5" cy="1.2" r="0.9" fill="#ffffff" />
            <circle cx="12.7" cy="1.2" r="0.45" fill="#0f172a" />
            <polygon points="14.8,1.4 18,2.4 14.8,3.4" fill="#f59e0b" />
            <polygon points="0,5 -4,8 -1,4" fill="#0369a1" />
          </g>
        </g>

        <!-- ======================================================== -->
        <!-- AS FOLHAS QUE CAEM (6 GRUPOS DE FOLHAS SOBRE OS GALHOS)  -->
        <!-- ======================================================== -->
        <g class="tree-foliage-layer" transform-origin="160 160">

          <!-- GRUPO 1: Folhagem do Galho Superior Esquerdo (Cai no erro 1 - +25% Volume) -->
          <g 
            class="transition-all duration-700 ease-out origin-[108px_60px] foliage-cluster"
            :class="mistakes >= 1 ? 'opacity-0 scale-40 -translate-y-4 pointer-events-none' : 'opacity-100 scale-100'"
            filter="url(#leafShadow)"
          >
            <!-- Massa de folhas orgânicas (+25% volume) -->
            <path d="M 76 75 C 60 65 68 42 88 40 C 96 28 118 28 130 38 C 146 32 158 45 153 60 C 160 75 146 90 128 88 C 113 95 90 92 76 75 Z" fill="url(#leafClusterGrad1)" />
            <!-- Realce e folhinhas de detalhe na borda -->
            <path d="M 88 45 C 96 32 113 32 120 40 C 113 45 103 48 93 48 Z" fill="#bbf7d0" opacity="0.5" />
            <ellipse cx="106" cy="62" rx="18" ry="13" fill="#6ee7b7" opacity="0.25" />
            <circle cx="70" cy="65" r="6.5" fill="#34d399" />
            <circle cx="146" cy="52" r="7.5" fill="#10b981" />
          </g>

          <!-- GRUPO 2: Folhagem do Galho Superior Direito (Cai no erro 2 - +25% Volume) -->
          <g 
            class="transition-all duration-700 ease-out origin-[212px_60px] foliage-cluster"
            :class="mistakes >= 2 ? 'opacity-0 scale-40 -translate-y-4 pointer-events-none' : 'opacity-100 scale-100'"
            filter="url(#leafShadow)"
          >
            <!-- Massa de folhas orgânicas (+25% volume) -->
            <path d="M 167 60 C 162 45 174 32 190 38 C 202 28 224 28 232 40 C 252 42 260 65 244 75 C 230 92 207 95 192 88 C 174 90 160 75 167 60 Z" fill="url(#leafClusterGrad2)" />
            <!-- Realce e folhinhas -->
            <path d="M 232 45 C 224 32 207 32 200 40 C 207 45 217 48 227 48 Z" fill="#a7f3d0" opacity="0.55" />
            <ellipse cx="214" cy="62" rx="18" ry="13" fill="#34d399" opacity="0.25" />
            <circle cx="250" cy="65" r="6.5" fill="#10b981" />
            <circle cx="174" cy="52" r="7.5" fill="#059669" />
          </g>

          <!-- GRUPO 3: Folhagem do Cume Central do Topo (Cai no erro 3) -->
          <g 
            class="transition-all duration-700 ease-out origin-[160px_46px] foliage-cluster"
            :class="mistakes >= 3 ? 'opacity-0 scale-40 -translate-y-4 pointer-events-none' : 'opacity-100 scale-100'"
            filter="url(#leafShadow)"
          >
            <!-- Massa do topo com sol pleno -->
            <path d="M 134 50 C 128 34 144 22 160 24 C 176 22 192 34 186 50 C 192 62 180 72 168 70 C 152 72 142 70 134 60 Z" fill="url(#leafClusterGrad3)" />
            <!-- Realce luminoso no ponto mais alto da árvore -->
            <path d="M 148 30 C 156 26 166 26 172 32 C 164 34 156 34 148 30 Z" fill="#dcfce7" opacity="0.65" />
            <circle cx="160" cy="46" r="10" fill="#86efac" opacity="0.3" />
            <circle cx="138" cy="42" r="5" fill="#34d399" />
            <circle cx="182" cy="42" r="5" fill="#34d399" />
          </g>

          <!-- GRUPO 4: Folhagem do Galho Inferior Esquerdo (Cai no erro 4 - Dobro do Tamanho) -->
          <g 
            class="transition-all duration-700 ease-out origin-[74px_116px] foliage-cluster"
            :class="mistakes >= 4 ? 'opacity-0 scale-40 -translate-y-4 pointer-events-none' : 'opacity-100 scale-100'"
            filter="url(#leafShadow)"
          >
            <path d="M 34 122 C 24 100 48 82 72 84 C 88 74 116 84 118 104 C 126 122 110 144 88 142 C 66 146 42 142 34 122 Z" fill="url(#leafClusterGrad1)" />
            <path d="M 52 96 C 66 86 88 88 98 100 C 84 104 70 102 52 96 Z" fill="#bbf7d0" opacity="0.45" />
            <ellipse cx="76" cy="114" rx="24" ry="16" fill="#6ee7b7" opacity="0.25" />
            <circle cx="36" cy="112" r="8" fill="#10b981" />
            <circle cx="116" cy="124" r="9" fill="#059669" />
            <circle cx="68" cy="82" r="7" fill="#34d399" />
          </g>

          <!-- GRUPO 5: Folhagem do Galho Inferior Direito (Cai no erro 5 - Dobro do Tamanho) -->
          <g 
            class="transition-all duration-700 ease-out origin-[246px_116px] foliage-cluster"
            :class="mistakes >= 5 ? 'opacity-0 scale-40 -translate-y-4 pointer-events-none' : 'opacity-100 scale-100'"
            filter="url(#leafShadow)"
          >
            <path d="M 286 122 C 296 100 272 82 248 84 C 232 74 204 84 202 104 C 194 122 210 144 232 142 C 254 146 278 142 286 122 Z" fill="url(#leafClusterGrad2)" />
            <path d="M 268 96 C 254 86 232 88 222 100 C 236 104 250 102 268 96 Z" fill="#a7f3d0" opacity="0.45" />
            <ellipse cx="244" cy="114" rx="24" ry="16" fill="#34d399" opacity="0.25" />
            <circle cx="284" cy="112" r="8" fill="#10b981" />
            <circle cx="204" cy="124" r="9" fill="#059669" />
            <circle cx="252" cy="82" r="7" fill="#34d399" />
          </g>

          <!-- GRUPO 6: Folhagem Central da Copa (Cai no erro 6 - Última Folha) -->
          <g 
            class="transition-all duration-700 ease-out origin-[160px_96px] foliage-cluster"
            :class="mistakes >= 6 ? 'opacity-0 scale-40 -translate-y-4 pointer-events-none' : 'opacity-100 scale-100'"
            filter="url(#leafShadow)"
          >
            <path d="M 124 98 C 118 82 134 70 148 74 C 160 66 180 70 186 84 C 200 90 204 108 194 120 C 184 132 170 134 156 132 C 142 136 126 126 124 112 Z" fill="url(#leafClusterGrad3)" />
            <ellipse cx="160" cy="98" rx="18" ry="12" fill="#86efac" opacity="0.25" />
            <circle cx="132" cy="88" r="6" fill="#34d399" />
            <circle cx="188" cy="94" r="6" fill="#10b981" />
          </g>

        </g>

        <!-- ======================================================== -->
        <!-- FOLHAS CAÍDAS NO CHÃO (Surgem suavemente a cada erro)    -->
        <!-- ======================================================== -->
        <g class="fallen-leaves-layer">
          <!-- Folha 1 (Âmbar no solo) -->
          <g class="transition-all duration-700 transform origin-[100px_192px]" :class="mistakes >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'">
            <path d="M 96 190 Q 104 187 108 193 Q 102 197 96 190 Z" fill="#f59e0b" />
            <line x1="97" y1="191" x2="105" y2="192" stroke="#b45309" stroke-width="0.8" />
          </g>
          <!-- Folha 2 (Cobre no solo) -->
          <g class="transition-all duration-700 transform origin-[218px_193px]" :class="mistakes >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'">
            <path d="M 214 191 Q 222 188 226 195 Q 220 198 214 191 Z" fill="#ea580c" />
            <line x1="215" y1="192" x2="223" y2="194" stroke="#9a3412" stroke-width="0.8" />
          </g>
          <!-- Folha 3 (Castanho dourado) -->
          <g class="transition-all duration-700 transform origin-[122px_198px]" :class="mistakes >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'">
            <path d="M 118 196 Q 126 192 130 199 Q 124 202 118 196 Z" fill="#d97706" />
          </g>
          <!-- Folha 4 (Rubi) -->
          <g class="transition-all duration-700 transform origin-[195px_198px]" :class="mistakes >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'">
            <path d="M 191 196 Q 199 193 203 200 Q 197 203 191 196 Z" fill="#dc2626" />
          </g>
          <!-- Folha 5 (Laranja queimado) -->
          <g class="transition-all duration-700 transform origin-[144px_201px]" :class="mistakes >= 5 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'">
            <path d="M 140 199 Q 148 196 152 203 Q 146 206 140 199 Z" fill="#ea580c" />
          </g>
          <!-- Folha 6 (Vinho outonal) -->
          <g class="transition-all duration-700 transform origin-[172px_200px]" :class="mistakes >= 6 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'">
            <path d="M 168 198 Q 176 195 180 202 Q 174 205 168 198 Z" fill="#991b1b" />
          </g>
        </g>

        <!-- PONTOS DE LUZ / PÓLEN FLUTUANTE NA BRISA -->
        <g class="forest-motes pointer-events-none" opacity="0.65">
          <circle cx="102" cy="88" r="1.5" fill="#fef08a" class="mote-1" />
          <circle cx="218" cy="82" r="1.5" fill="#fef08a" class="mote-2" />
          <circle cx="158" cy="132" r="1.2" fill="#d9f99d" class="mote-3" />
        </g>

        <!-- EFEITO DE VITÓRIA: FLORAÇÃO E BRILHO DOURADO -->
        <g v-if="isSolved" class="victory-bloom">
          <circle cx="105" cy="58" r="3.5" fill="#fbcfe8" class="animate-ping" style="animation-duration: 2s;" />
          <circle cx="105" cy="58" r="2.5" fill="#f472b6" />
          <circle cx="215" cy="58" r="3.5" fill="#fbcfe8" class="animate-ping" style="animation-duration: 2.4s;" />
          <circle cx="215" cy="58" r="2.5" fill="#f472b6" />
          <circle cx="160" cy="38" r="4" fill="#fbcfe8" class="animate-ping" style="animation-duration: 1.8s;" />
          <circle cx="160" cy="38" r="3" fill="#f472b6" />
          <text x="160" y="22" font-size="16" text-anchor="middle" class="animate-bounce">✨ 🌸 ✨</text>
        </g>

      </svg>
    </div>
  </div>
</template>

<script setup>
defineProps({
  mistakes: {
    type: Number,
    default: 0
  },
  maxMistakes: {
    type: Number,
    default: 6
  },
  isSolved: {
    type: Boolean,
    default: false
  },
  lastGuessCorrect: {
    type: Boolean,
    default: null
  }
})
</script>

<style scoped>
/* Transição fluida e orgânica dos grupos de folhas */
.foliage-cluster {
  transition: transform 0.65s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.65s ease-out;
}

/* Balanço sutil do passarinho */
.songbird-gentle {
  animation: birdBob 3.5s ease-in-out infinite alternate;
  transform-origin: 6px 4px;
}

@keyframes birdBob {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-1.5px) rotate(-2deg);
  }
}

/* Raios de sol dinâmicos */
@keyframes sunbeams {
  0%, 100% {
    opacity: 0.15;
  }
  50% {
    opacity: 0.35;
  }
}

.animate-sunbeams {
  animation: sunbeams 5s ease-in-out infinite;
}

/* Partículas de pólen / luz flutuando no ar */
.mote-1 {
  animation: floatMote1 4.5s ease-in-out infinite;
}
.mote-2 {
  animation: floatMote2 5.5s ease-in-out infinite;
}
.mote-3 {
  animation: floatMote1 6s ease-in-out infinite;
}

@keyframes floatMote1 {
  0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  30% {
    opacity: 0.8;
  }
  80% {
    opacity: 0.6;
  }
  100% {
    transform: translate(14px, -24px);
    opacity: 0;
  }
}

@keyframes floatMote2 {
  0% {
    transform: translate(0, 0);
    opacity: 0;
  }
  30% {
    opacity: 0.85;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    transform: translate(-12px, -26px);
    opacity: 0;
  }
}
</style>

