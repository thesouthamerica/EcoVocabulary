import { defineStore } from 'pinia'


export const useGameStore = defineStore('game', {
  state: () => ({
    user: {
      dbId: '',
      displayName: '',
      isLoggedIn: false,
      calendarYear: 0,
      schoolYear: 0
    },
    levels: [] as any[],
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
    async fetchLevels(supabase: any, adminId: string | null = null, schoolYear: number = 0, force = false) {
      if (this.levels.length > 0 && !force) return; // Já carregou

      try {
        let levelsQuery = supabase.from('levels').select('*').order('id')
        let questionsQuery = supabase.from('questions').select('*').order('id')
        
        if (adminId) {
          levelsQuery = levelsQuery.eq('admin_id', adminId).eq('school_year', schoolYear)
        } else {
          levelsQuery = levelsQuery.eq('school_year', 0) // Níveis do master admin ou visitantes
        }

        const { data: levelsData, error: levelsError } = await levelsQuery
        if (levelsError) throw levelsError

        const { data: questionsData, error: questionsError } = await questionsQuery
        if (questionsError) throw questionsError

        const nestedLevels = levelsData
          .map((level: any) => ({
            ...level,
            questions: questionsData.filter((q: any) => q.level_id === level.id)
          }))
          .filter((level: any) => level.questions.length === 5)

        this.levels = nestedLevels
      } catch (err) {
        console.error("Error fetching levels from Supabase:", err)
      }
    },
    async fetchTeachers(supabase: any) {
      try {
        const { data, error } = await supabase.from('admins').select('id, name').eq('role', 'subadmin')
        if (error) throw error
        return data || []
      } catch (err) {
        console.error("Error fetching teachers:", err)
        return []
      }
    },
    async login(firstName: string, lastName: string, schoolYear: number, teacherId: string | null, isVisitor: boolean, supabase: any, calendarYear: number = new Date().getFullYear()) {
      // Limpa os dados do usuário anterior antes de carregar o novo
      this.resetGame()
      
      const formatName = (str: string) => {
        return str.trim().split(/\s+/).map(word => 
          word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ''
        ).join(' ');
      };

      const formattedFirstName = isVisitor ? "Visitante" : formatName(firstName);
      const formattedLastName = isVisitor ? "" : formatName(lastName);
      
      const slug = isVisitor 
        ? `visitante-${Math.floor(Math.random()*10000)}` 
        : `${formattedFirstName}-${formattedLastName}`.toLowerCase().replace(/\s+/g, '-')
      
      const displayName = isVisitor ? "Visitante" : `${formattedFirstName} ${formattedLastName}`
      
      this.user.dbId = slug
      this.user.displayName = displayName
      this.user.isLoggedIn = true
      this.user.calendarYear = calendarYear
      this.user.schoolYear = schoolYear

      try {
        if (!isVisitor) {
          const { data: whitelistData, error: whitelistError } = await supabase
            .from('students_whitelist')
            .select('*')
            .eq('admin_id', teacherId)
            .eq('school_year', schoolYear)
            .eq('calendar_year', calendarYear)
            .eq('slug', slug)
            .single()
            
          if (whitelistError || !whitelistData) {
            throw new Error("Aluno não encontrado na lista desta turma.")
          }
        }
        
        const { data, error } = await supabase
          .from('user_progress')
          .select('score, current_level_index')
          .eq('name', slug)
          .eq('calendar_year', calendarYear)
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
            current_level_index: 0,
            admin_id: isVisitor ? null : teacherId,
            school_year: isVisitor ? 0 : schoolYear,
            calendar_year: isVisitor ? 0 : calendarYear
          })
          if (insertError) console.error("Supabase insert error:", insertError)
          this._shuffleCurrentLevel()
        }
        
        // Força buscar os níveis baseados no perfil que acabou de logar
        await this.fetchLevels(supabase, isVisitor ? null : teacherId, isVisitor ? 0 : schoolYear, true)
        
        return { success: true }
      } catch (err: any) {
        console.warn("Login failed:", err)
        this.logout()
        return { success: false, error: err.message || "Erro no login" }
      }
    },
    logout() {
      this.user.dbId = ''
      this.user.displayName = ''
      this.user.isLoggedIn = false
      this.user.calendarYear = 0
      this.user.schoolYear = 0
      this.resetGame()
    },
    async answerQuestion(isCorrect: boolean, attempts: number = 1, timeTakenSeconds: number = 0, supabase: any) {
      if (isCorrect) {
        this.levelScore += 1
      }
      
      if (this.user.isLoggedIn && supabase) {
        const level = this.currentLevel
        const question = this.currentQuestion
        if (level && question) {
          try {
            const { error } = await supabase.from('user_answers').insert({
              user_id: this.user.dbId,
              level_id: level.id,
              question_id: question.id,
              is_correct: isCorrect,
              attempts: attempts,
              time_taken_seconds: timeTakenSeconds
            })
            if (error) {
              console.error("Supabase Insert Error (user_answers):", error)
            }
          } catch (e) {
            console.error("Error logging answer:", e)
          }
        }
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
            calendar_year: this.user.calendarYear,
            score: this.score,
            current_level_index: this.maxUnlockedLevel
          }, { onConflict: 'name, calendar_year' })
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
      level.questions.forEach((q: any) => {
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
