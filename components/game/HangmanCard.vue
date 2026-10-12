<template>
  <div class="glass-panel w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 shadow-xl transition-all bg-white/95 backdrop-blur-xl relative overflow-hidden rounded-3xl sm:rounded-[2.5rem]">
    
    <!-- Ambient Background Glows -->
    <div class="absolute -top-16 -right-16 w-44 h-44 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-16 -left-16 w-44 h-44 bg-sky-100/40 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Definição SVG para gradiente dos corações -->
    <svg class="hidden">
      <defs>
        <linearGradient id="heartGradientActive" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff4b72" />
          <stop offset="100%" stop-color="#e11d48" />
        </linearGradient>
      </defs>
    </svg>

    <!-- 1. BLOCO DAS IMAGENS LADO A LADO (EXATAMENTE DO MESMO TAMANHO) -->
    <div class="grid grid-cols-2 gap-2.5 sm:gap-4 md:gap-6 w-full max-w-2xl mx-auto mb-3 sm:mb-4">
      
      <!-- Imagem 1: Árvore Ecológica Interativa -->
      <div class="w-full aspect-[4/3] max-h-[150px] sm:max-h-[200px] md:max-h-[240px]">
        <EcoHangmanVisual 
          :mistakes="mistakesCount"
          :maxMistakes="maxMistakes"
          :isSolved="isWordSolved"
          :lastGuessCorrect="lastGuessCorrect"
        />
      </div>

      <!-- Imagem 2: Imagem de Referência / Dica Visual (Mesmo Tamanho da Árvore) -->
      <div 
        class="w-full aspect-[4/3] max-h-[150px] sm:max-h-[200px] md:max-h-[240px] relative bg-gradient-to-b from-sky-50/80 via-emerald-50/30 to-teal-50/50 rounded-2xl sm:rounded-3xl border border-emerald-100/80 shadow-xs overflow-hidden flex items-center justify-center p-1.5 sm:p-2.5 cursor-pointer select-none group"
        :title="`Clique para ouvir pronúncia em inglês: ${cleanTargetWord}`"
        @click="playPronunciation"
      >
        <!-- Ambient light effect matching the tree -->
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl pointer-events-none"></div>

        <!-- Imagem Real / GIF -->
        <img 
          v-if="question.imageUrl && question.imageUrl.startsWith('http')" 
          :src="question.imageUrl" 
          alt="Dica visual" 
          class="w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-xs transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <!-- Emoji / Ícone de Apoio -->
        <div v-else class="w-full h-full flex items-center justify-center">
          <span v-if="question.imageUrl" class="text-5xl sm:text-6xl md:text-7xl filter drop-shadow-md transition-transform duration-300 group-hover:scale-110">
            {{ question.imageUrl }}
          </span>
          <span v-else class="text-5xl sm:text-6xl md:text-7xl transition-transform duration-300 group-hover:scale-110">
            🌿
          </span>
        </div>

        <!-- Botão Flutuante de Ouvir Pronúncia -->
        <button 
          type="button" 
          class="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white/95 hover:bg-white backdrop-blur-md border border-slate-200/90 text-slate-700 hover:text-eco-blue px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
          title="Ouvir pronúncia em inglês"
          @click.stop="playPronunciation"
        >
          <span class="text-xs sm:text-sm">🔊</span>
          <span class="hidden sm:inline text-xs font-black text-slate-700">Ouvir</span>
        </button>
      </div>

    </div>

    <!-- 2. STATUS UNIFICADO: VIDAS E FEEDBACK (ABAIXO DAS DUAS IMAGENS) -->
    <div class="flex flex-col items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
      <!-- Vidas / Corações Vetoriais SVG -->
      <div class="flex items-center gap-1.5 sm:gap-2">
        <div 
          v-for="heartIndex in maxMistakes" 
          :key="heartIndex" 
          class="transition-all duration-300 transform"
          :class="heartIndex <= (maxMistakes - mistakesCount) ? 'scale-100 hover:scale-110' : 'scale-90 opacity-25'"
        >
          <!-- Coração Ativo (Gradiente Vibrante com Sombra) -->
          <svg 
            v-if="heartIndex <= (maxMistakes - mistakesCount)"
            viewBox="0 0 24 24" 
            class="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_2px_4px_rgba(225,29,72,0.35)]"
          >
            <defs>
              <linearGradient :id="'heartGrad-' + heartIndex" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff4b72" />
                <stop offset="100%" stop-color="#e11d48" />
              </linearGradient>
            </defs>
            <path 
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
              :fill="`url(#heartGrad-${heartIndex})`" 
            />
          </svg>

          <!-- Coração Perdido (Cinza Suave) -->
          <svg 
            v-else
            viewBox="0 0 24 24" 
            class="w-5 h-5 sm:w-6 sm:h-6 text-slate-400"
          >
            <path 
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
              fill="currentColor" 
            />
          </svg>
        </div>
      </div>

      <!-- Badge Flutuante de Feedback / Status -->
      <div class="min-h-[26px] flex items-center justify-center">
        <div 
          class="inline-flex items-center gap-1.5 px-3.5 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-black transition-all shadow-xs"
          :class="[
            isWordSolved 
              ? 'bg-emerald-50 text-eco-green border border-emerald-200' 
              : isGameOver 
                ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                : lastGuessCorrect === true 
                  ? 'bg-emerald-50 text-eco-green border border-emerald-200' 
                  : lastGuessCorrect === false 
                    ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                    : 'bg-white/90 text-slate-600 border border-slate-200/70'
          ]"
        >
          <span>{{ feedbackIcon }}</span>
          <span>{{ feedbackText }}</span>
        </div>
      </div>
    </div>

    <!-- 3. SLOTS DAS LETRAS (PALAVRA SECRETA) -->
    <div class="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 max-w-full px-1">
      <template v-for="(char, index) in targetWordChars" :key="index">
        <!-- Espaço entre palavras -->
        <div v-if="char === ' '" class="w-2.5 sm:w-4"></div>
        
        <!-- Hífen ou pontuação -->
        <div 
          v-else-if="!isLetter(char)" 
          class="w-8 sm:w-11 h-11 sm:h-14 flex items-center justify-center text-xl sm:text-2xl font-black text-gray-700"
        >
          {{ char }}
        </div>

        <!-- Caixa de Letra (Slot) -->
        <div 
          v-else
          class="w-8 sm:w-11 md:w-12 h-11 sm:h-14 md:h-15 flex-1 min-w-[28px] max-w-[42px] sm:max-w-[48px] md:max-w-[54px] rounded-xl sm:rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-black transition-all duration-200 select-none shadow-xs"
          :class="[
            isLetterRevealed(char) 
              ? 'bg-gradient-to-b from-white to-emerald-50 text-emerald-800 border-emerald-400 border-b-4 border-b-emerald-500 shadow-sm scale-105' 
              : 'bg-slate-50/70 border-dashed border-slate-300/90 hover:border-slate-400'
          ]"
        >
          <span v-if="isLetterRevealed(char)" class="animate-pop uppercase font-black">
            {{ char }}
          </span>
          <span v-else class="w-2.5 sm:w-3 h-0.5 bg-slate-300 rounded-full"></span>
        </div>
      </template>
    </div>

    <!-- DICA DA PALAVRA (ABAIXO DAS LETRAS) -->
    <div v-if="hintText" class="flex items-center justify-center mb-5 sm:mb-6 animate-fade-in">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-2xl bg-amber-50/95 border border-amber-200/90 text-amber-900 shadow-xs backdrop-blur-xs transition-all hover:scale-[1.02]">
        <span class="text-base sm:text-lg">💡</span>
        <span class="text-xs sm:text-sm font-bold text-amber-700 uppercase tracking-wider">Dica:</span>
        <span class="text-sm sm:text-base font-black text-amber-950">{{ hintText }}</span>
      </div>
    </div>

    <!-- 4. CARD DE FIM DE RODADA OU TECLADO VIRTUAL -->
    <!-- Se o jogo acabou nesta rodada (Vitória ou Derrota) -->
    <div v-if="isWordSolved || isGameOver" class="w-full max-w-sm sm:max-w-md mx-auto bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 text-center shadow-xl animate-fade-in mb-3">
      <div class="text-4xl mb-2">
        {{ isWordSolved ? '🎉' : '🥀' }}
      </div>
      <h3 
        class="text-xl sm:text-2xl font-black mb-1"
        :class="isWordSolved ? 'text-eco-green' : 'text-rose-500'"
      >
        {{ isWordSolved ? 'Excelente! Você acertou!' : 'Puxa, acabaram as chances!' }}
      </h3>

      <p class="text-2xl sm:text-3xl font-black text-slate-800 tracking-widest uppercase my-2">
        {{ cleanTargetWord }}
      </p>
      <p class="text-xs sm:text-sm font-bold text-slate-500 mb-4 italic">
        {{ question.promptPt }}
      </p>

      <div class="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-center">
        <button 
          type="button" 
          @click="playPronunciation" 
          class="w-full sm:w-auto px-4 py-2.5 rounded-xl border-2 border-eco-blue/30 bg-blue-50 text-eco-blue font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-blue-100 transition-colors shadow-xs"
        >
          🔊 Ouvir em inglês
        </button>

        <button 
          type="button" 
          @click="handleNextWord" 
          class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-eco-green to-emerald-600 hover:from-emerald-600 hover:to-eco-green text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          Próxima palavra ➡️
        </button>
      </div>
    </div>

    <!-- Teclado Virtual (Se ainda estiver jogando) - Totalmente Responsivo e Centralizado -->
    <div v-else class="w-full max-w-md mx-auto flex flex-col items-center gap-1.5 sm:gap-2 mb-2 select-none">
      <!-- Linha 1: A B C D E F G H I (9 teclas flexíveis) -->
      <div class="flex justify-center gap-1 sm:gap-1.5 w-full">
        <button 
          v-for="letter in keyboardRows[0]" 
          :key="letter"
          type="button"
          @click="guessLetter(letter)"
          :disabled="guessedLetters.has(letter) || isProcessing"
          class="flex-1 min-w-[26px] max-w-[40px] sm:max-w-[44px] h-10 sm:h-11 md:h-12 rounded-lg sm:rounded-xl font-black text-xs sm:text-sm md:text-base border transition-all flex items-center justify-center shadow-xs"
          :class="getKeyClass(letter)"
        >
          {{ letter }}
        </button>
      </div>

      <!-- Linha 2: J K L M N O P Q R (9 teclas flexíveis) -->
      <div class="flex justify-center gap-1 sm:gap-1.5 w-full">
        <button 
          v-for="letter in keyboardRows[1]" 
          :key="letter"
          type="button"
          @click="guessLetter(letter)"
          :disabled="guessedLetters.has(letter) || isProcessing"
          class="flex-1 min-w-[26px] max-w-[40px] sm:max-w-[44px] h-10 sm:h-11 md:h-12 rounded-lg sm:rounded-xl font-black text-xs sm:text-sm md:text-base border transition-all flex items-center justify-center shadow-xs"
          :class="getKeyClass(letter)"
        >
          {{ letter }}
        </button>
      </div>

      <!-- Linha 3: S T U V W X Y Z (8 teclas flexíveis) -->
      <div class="flex justify-center gap-1 sm:gap-1.5 w-full">
        <button 
          v-for="letter in keyboardRows[2]" 
          :key="letter"
          type="button"
          @click="guessLetter(letter)"
          :disabled="guessedLetters.has(letter) || isProcessing"
          class="flex-1 min-w-[26px] max-w-[40px] sm:max-w-[44px] h-10 sm:h-11 md:h-12 rounded-lg sm:rounded-xl font-black text-xs sm:text-sm md:text-base border transition-all flex items-center justify-center shadow-xs"
          :class="getKeyClass(letter)"
        >
          {{ letter }}
        </button>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import EcoHangmanVisual from './EcoHangmanVisual.vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  questionIndex: {
    type: Number,
    default: 0
  },
  totalQuestions: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['answer'])
const router = useRouter()

// Alfabeto organizado em 3 linhas (idêntico à referência visual do usuário)
const keyboardRows = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
  ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
  ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
]

// Normalização da palavra alvo (em inglês)
const cleanTargetWord = computed(() => {
  return (props.question.promptEn || '').trim().toUpperCase()
})

const targetWordChars = computed(() => {
  return cleanTargetWord.value.split('')
})

// Dica a ser exibida abaixo das letras
const hintText = computed(() => {
  const optHint = props.question.options?.[0]?.hint
  if (optHint && typeof optHint === 'string' && optHint.trim()) {
    return optHint.trim()
  }
  if (props.question.hint && typeof props.question.hint === 'string' && props.question.hint.trim()) {
    return props.question.hint.trim()
  }
  return (props.question.promptPt || '').trim()
})

// Letras únicas que o jogador precisa adivinhar
const targetUniqueLetters = computed(() => {
  const letters = new Set()
  for (const char of cleanTargetWord.value) {
    if (isLetter(char)) {
      letters.add(char)
    }
  }
  return letters
})

// Estados do Jogo
const maxMistakes = 6
const mistakesCount = ref(0)
const guessedLetters = ref(new Set())
const hintUsed = ref(false)
const combo = ref(1)
const roundScore = ref(32)
const awardedPoints = ref(0)
const lastGuessCorrect = ref(null)
const isProcessing = ref(false)

const startTime = ref(0)

const isLetter = (char) => {
  return /^[A-Z]$/.test(char)
}

const isLetterRevealed = (char) => {
  if (!isLetter(char)) return true
  // Se perdeu o jogo, revela todas as letras para aprendizado
  if (mistakesCount.value >= maxMistakes) return true
  return guessedLetters.value.has(char)
}

// Verifica se a palavra foi completamente resolvida
const isWordSolved = computed(() => {
  if (targetUniqueLetters.value.size === 0) return false
  if (mistakesCount.value >= maxMistakes) return false
  for (const letter of targetUniqueLetters.value) {
    if (!guessedLetters.value.has(letter)) return false
  }
  return true
})

// Verifica se o jogador perdeu
const isGameOver = computed(() => {
  return mistakesCount.value >= maxMistakes
})

// Letras restantes da palavra ainda não adivinhadas
const remainingLettersToGuess = computed(() => {
  const remaining = []
  for (const letter of targetUniqueLetters.value) {
    if (!guessedLetters.value.has(letter)) {
      remaining.push(letter)
    }
  }
  return remaining
})

// Ícone e Mensagem de Feedback e Status
const feedbackIcon = computed(() => {
  if (isWordSolved.value) return '🌟'
  if (isGameOver.value) return '🥀'
  if (lastGuessCorrect.value === true) return '✨'
  if (lastGuessCorrect.value === false) {
    if (mistakesCount.value === 1) return '🍂'
    if (mistakesCount.value === 5) return '⚠️'
    return '🍃'
  }
  return '🌱'
})

const feedbackText = computed(() => {
  if (isWordSolved.value) {
    return 'Palavra resolvida com sucesso!'
  }
  if (isGameOver.value) {
    return 'Puxa, a árvore perdeu todas as folhas!'
  }
  if (lastGuessCorrect.value === true) {
    return 'Muito bem! Letra correta!'
  }
  if (lastGuessCorrect.value === false) {
    if (mistakesCount.value === 1) return 'Uma folha caiu ao chão... Tente outra letra!'
    if (mistakesCount.value === 5) return 'Cuidado! Resta apenas 1 folha na árvore!'
    return 'Ops, essa letra não está na palavra!'
  }
  return 'Descubra a palavra antes das folhas caírem!'
})

// Classes para estilizar o teclado conforme o status de cada letra
const getKeyClass = (letter) => {
  if (!guessedLetters.value.has(letter)) {
    return 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 border-b-[3px] border-b-slate-300 hover:border-slate-300 active:border-b active:translate-y-[2px] shadow-xs hover:scale-105 active:scale-95'
  }
  // Letra correta
  if (targetUniqueLetters.value.has(letter)) {
    return 'bg-emerald-500 text-white border border-emerald-600 border-b-[3px] border-b-emerald-700 shadow-xs cursor-default transform scale-95'
  }
  // Letra errada
  return 'bg-rose-50 text-rose-300 border border-rose-200/60 border-b-2 border-b-rose-200/60 opacity-50 cursor-not-allowed'
}

// Pronúncia via SpeechSynthesis da Web API
const playPronunciation = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(cleanTargetWord.value)
    utterance.lang = 'en-US'
    utterance.rate = 0.85
    window.speechSynthesis.speak(utterance)
  }
}

// Áudio sintetizado via Web Audio API (Leve, sem dependências externas, instantâneo e responsivo)
let audioCtx = null

const getAudioContext = () => {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

// Som de Estrelinha (Acerto - Arpejo cristalino e cintilante de estrelinha mágica)
const playStarCorrectSound = () => {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    // Arpejo cintilante em 4 notas rápidas: Mi6 -> Sol#6 -> Si6 -> Mi7
    const notes = [1318.5, 1661.2, 1975.5, 2637.0]

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + index * 0.05)

      // Envelope com ataque rápido e decaimento cristalino
      gain.gain.setValueAtTime(0.001, now + index * 0.05)
      gain.gain.exponentialRampToValueAtTime(0.18, now + index * 0.05 + 0.012)
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.05 + 0.13)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + index * 0.05)
      osc.stop(now + index * 0.05 + 0.14)
    })
  } catch (e) {
    // Falha silenciosa caso o navegador restrinja reprodução
  }
}

// Som de Erro (Alerta curto, suave e discreto para ambiente escolar)
const playErrorSound = () => {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    // Dois tons curtos e suaves descendentes (260Hz -> 195Hz)
    const tones = [260, 195]

    tones.forEach((freq, index) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle' // Tom quente e não estridente
      osc.frequency.setValueAtTime(freq, now + index * 0.08)

      gain.gain.setValueAtTime(0.001, now + index * 0.08)
      gain.gain.exponentialRampToValueAtTime(0.16, now + index * 0.08 + 0.012)
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.10)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + index * 0.08)
      osc.stop(now + index * 0.08 + 0.11)
    })
  } catch (e) {
    // Falha silenciosa
  }
}

// Tentativa de letra
const guessLetter = (letter) => {
  if (isWordSolved.value || isGameOver.value || isProcessing.value) return
  if (guessedLetters.value.has(letter)) return

  guessedLetters.value.add(letter)
  // Força reatividade do Set
  guessedLetters.value = new Set(guessedLetters.value)

  if (targetUniqueLetters.value.has(letter)) {
    // Acertou a letra! Toca som de estrelinha mágica
    lastGuessCorrect.value = true
    playStarCorrectSound()
    if (isWordSolved.value) {
      handleWordSolved()
    }
  } else {
    // Errou a letra! Toca som curto de erro
    lastGuessCorrect.value = false
    mistakesCount.value++
    playErrorSound()
    // Penalidade no score da rodada
    roundScore.value = Math.max(10, roundScore.value - 4)

    if (mistakesCount.value >= maxMistakes) {
      handleGameOver()
    }
  }
}

// Uso da Dica
const useHint = () => {
  if (hintUsed.value || remainingLettersToGuess.value.length === 0) return
  hintUsed.value = true
  roundScore.value = Math.max(5, roundScore.value - 5) // Dica reduz pontos

  // Escolhe uma letra aleatória não adivinhada
  const unrevealed = remainingLettersToGuess.value
  const randomLetter = unrevealed[Math.floor(Math.random() * unrevealed.length)]
  guessLetter(randomLetter)
}

const handleWordSolved = () => {
  const points = Math.max(10, roundScore.value) * combo.value
  awardedPoints.value = points
  combo.value++
  // Toca o áudio da palavra em inglês após acertar
  setTimeout(() => {
    playPronunciation()
  }, 300)
}

const handleGameOver = () => {
  combo.value = 1
  awardedPoints.value = 0
  setTimeout(() => {
    playPronunciation()
  }, 400)
}

const handleNextWord = () => {
  const timeTaken = Math.floor((Date.now() - startTime.value) / 1000)
  emit('answer', {
    isCorrect: isWordSolved.value,
    attempts: mistakesCount.value + 1,
    timeTakenSeconds: timeTaken
  })
}

const confirmExit = () => {
  if (confirm('Deseja realmente sair do jogo e voltar ao menu?')) {
    router.push('/menu')
  }
}

// Suporte a teclado físico (A-Z)
const handlePhysicalKeydown = (e) => {
  if (isWordSolved.value || isGameOver.value) return
  // Não captura se estiver focado em algum input
  if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return

  const key = e.key.toUpperCase()
  if (/^[A-Z]$/.test(key)) {
    guessLetter(key)
  }
}

const initRound = () => {
  mistakesCount.value = 0
  guessedLetters.value = new Set()
  hintUsed.value = false
  lastGuessCorrect.value = null
  isProcessing.value = false
  roundScore.value = 32
  awardedPoints.value = 0
  startTime.value = Date.now()
}

onMounted(() => {
  initRound()
  window.addEventListener('keydown', handlePhysicalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handlePhysicalKeydown)
})

watch(() => props.question.id, () => {
  initRound()
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pop {
  0% { transform: scale(0.8); }
  60% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

.animate-pop {
  animation: pop 0.25s ease-out;
}
</style>
