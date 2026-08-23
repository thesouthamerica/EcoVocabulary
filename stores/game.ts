import { defineStore } from 'pinia'
import levelsData from '~/data/levels.json'

export const useGameStore = defineStore('game', {
  state: () => ({
    user: {
      dbId: '',
      displayName: '',
      isLoggedIn: false,
    },
    levels: levelsData,
    currentLevelIndex: 0,
    maxUnlockedLevel: 0,
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
    async login(firstName: string, lastName: string, birthDate: string, supabase: any) {
      // Limpa os dados do usuário anterior antes de carregar o novo
      this.resetGame()
      
      const slug = `${firstName.trim()}-${lastName.trim()}-${birthDate}`.toLowerCase().replace(/\s+/g, '-')
      const displayName = `${firstName.trim()} ${lastName.trim()}`
      
      this.user.dbId = slug
      this.user.displayName = displayName
      this.user.isLoggedIn = true

      try {
        
        const { data, error } = await supabase
          .from('user_progress')
          .select('score, current_level_index')
          .eq('name', slug)
          .single()
          
        if (error && error.code !== 'PGRST116') {
          console.error("Supabase error on select:", error)
        }
          
        if (data) {
          // Recover progress
          this.score = data.score || 0
          this.maxUnlockedLevel = data.current_level_index || 0
          this.currentLevelIndex = this.maxUnlockedLevel
          this._shuffleCurrentLevel()
        } else {
          // Create new user profile
          const { error: insertError } = await supabase.from('user_progress').insert({
            name: slug,
            score: 0,
            current_level_index: 0
          })
          if (insertError) console.error("Supabase insert error:", insertError)
          this._shuffleCurrentLevel()
        }
      } catch (err) {
        console.warn("Could not sync with Supabase (Check if keys are set):", err)
      }
    },
    logout() {
      this.user.dbId = ''
      this.user.displayName = ''
      this.user.isLoggedIn = false
      this.resetGame()
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
      this._shuffleCurrentLevel()
    },
    async proceedToNextLevel(supabase: any) {
      // Regra: O máximo de pontos possíveis é o número total de questões de todos os níveis somados.
      let maxPossibleScore = 0
      this.levels.forEach(level => {
        if (level.questions) {
          maxPossibleScore += level.questions.length
        }
      })

      // Opção A: Só ganha pontos se for a primeira vez completando este nível
      if (this.currentLevelIndex === this.maxUnlockedLevel) {
        // Previne que o usuário ganhe mais pontos do que o número de questões do nível
        // (Isso corrige o bug de ganhar pontos infinitos ao usar o botão "Voltar")
        const currentLevelMaxScore = this.levels[this.currentLevelIndex]?.questions?.length || 0
        const validLevelScore = Math.min(this.levelScore, currentLevelMaxScore)
        
        this.score += validLevelScore
        
        // Garante que a pontuação total nunca ultrapasse o máximo possível
        if (this.score > maxPossibleScore) {
          this.score = maxPossibleScore
        }

        if (this.maxUnlockedLevel < this.levels.length) {
          this.maxUnlockedLevel++
        }
      }
      
      this.levelScore = 0
      this.isLevelFinished = false
      
      if (this.currentLevelIndex < this.levels.length - 1) {
        this.currentLevelIndex++
        this.currentQuestionIndex = 0
        this._shuffleCurrentLevel()
      } else {
        // Zera o index do final para evitar bug de tela, mas marca como completo
        this.currentLevelIndex++ 
      }

      // Save to Supabase
      if (this.user.isLoggedIn && supabase) {
        try {
          const { error } = await supabase.from('user_progress').upsert({
            name: this.user.dbId,
            score: this.score,
            current_level_index: this.maxUnlockedLevel
          }, { onConflict: 'name' })
          if (error) console.error("Supabase upsert error:", error)
        } catch (err) {
          console.error("Could not save to Supabase:", err)
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
      this.maxUnlockedLevel = 0
      this.currentQuestionIndex = 0
      this.score = 0
      this.levelScore = 0
      this.isLevelFinished = false
      this._shuffleCurrentLevel()
    },
    playLevel(index: number) {
      if (index <= this.maxUnlockedLevel) {
        this.currentLevelIndex = index
        this.currentQuestionIndex = 0
        this.levelScore = 0
        this.isLevelFinished = false
        this._shuffleCurrentLevel()
      }
    },
    _shuffleCurrentLevel() {
      const level = this.levels[this.currentLevelIndex]
      if (!level || !level.questions) return
      
      // Shuffle questions
      for (let i = level.questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [level.questions[i], level.questions[j]] = [level.questions[j], level.questions[i]];
      }
      
      // Shuffle options for each question
      level.questions.forEach(q => {
        if (q.options) {
          for (let i = q.options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
          }
        }
      })
    }
  }
})
