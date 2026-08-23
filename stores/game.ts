import { defineStore } from 'pinia'
import levelsData from '~/data/levels.json'

export const useGameStore = defineStore('game', {
  state: () => ({
    user: {
      name: '',
      isLoggedIn: false,
    },
    levels: levelsData,
    currentLevelIndex: 0,
    currentQuestionIndex: 0,
    score: 0,
    levelScore: 0,
    isLevelFinished: false
  }),
  getters: {
    currentLevel: (state) => state.levels[state.currentLevelIndex],
    currentQuestion: (state) => {
      const level = state.levels[state.currentLevelIndex]
      if (level && level.questions) {
        return level.questions[state.currentQuestionIndex]
      }
      return null
    },
    progress: (state) => state.currentLevelIndex + 1,
    totalLevels: (state) => state.levels.length,
    isFinished: (state) => state.currentLevelIndex >= state.levels.length
  },
  actions: {
    async login(name: string) {
      this.user.name = name
      this.user.isLoggedIn = true

      try {
        const supabase = useSupabaseClient()
        
        const { data, error } = await supabase
          .from('user_progress')
          .select('score, current_level_index')
          .eq('name', name)
          .single()
          
        if (data) {
          // Recover progress
          this.score = data.score || 0
          this.currentLevelIndex = data.current_level_index || 0
        } else {
          // Create new user profile
          await supabase.from('user_progress').insert({
            name: name,
            score: 0,
            current_level_index: 0
          })
        }
      } catch (err) {
        console.warn("Could not sync with Supabase (Check if keys are set):", err)
      }
    },
    answerQuestion(isCorrect: boolean) {
      if (isCorrect) {
        this.levelScore += 1
      }
      
      this.nextQuestion()
    },
    nextQuestion() {
      const level = this.currentLevel
      if (this.currentQuestionIndex < level.questions.length - 1) {
        this.currentQuestionIndex++
      } else {
        this.isLevelFinished = true
      }
    },
    retryLevel() {
      this.currentQuestionIndex = 0
      this.levelScore = 0
      this.isLevelFinished = false
    },
    async proceedToNextLevel() {
      this.score += this.levelScore
      this.levelScore = 0
      this.isLevelFinished = false
      
      if (this.currentLevelIndex < this.levels.length - 1) {
        this.currentLevelIndex++
        this.currentQuestionIndex = 0
      } else {
        this.currentLevelIndex++ 
      }

      // Save to Supabase
      if (this.user.isLoggedIn) {
        try {
          const supabase = useSupabaseClient()
          await supabase.from('user_progress').update({
            score: this.score,
            current_level_index: this.currentLevelIndex
          }).eq('name', this.user.name)
        } catch (err) {
          console.warn("Could not save to Supabase:", err)
        }
      }
    },
    previousQuestion() {
      // Prevents going back to previous levels now that they are independent
      if (this.currentQuestionIndex > 0 && !this.isLevelFinished) {
        this.currentQuestionIndex--
      }
    },
    resetGame() {
      this.currentLevelIndex = 0
      this.currentQuestionIndex = 0
      this.score = 0
      this.levelScore = 0
      this.isLevelFinished = false
    }
  }
})
