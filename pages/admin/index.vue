<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-black text-gray-800">Gerenciar Níveis e Perguntas</h1>
      <button @click="openLevelModal(null)" class="btn-secondary !py-2 !px-4 !rounded-lg flex items-center gap-2">
        <span>+ Novo Nível</span>
      </button>
    </div>

    <!-- Tabela de níveis -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-10"></th>
              <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
              <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Título</th>
              <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Descrição</th>
              <th class="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Ações do Nível</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <template v-for="level in levels" :key="level.id">
              <tr class="hover:bg-gray-50 transition-colors cursor-pointer" @click="toggleExpand(level.id)">
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <svg :class="{'rotate-90': expandedLevelId === level.id}" class="w-5 h-5 text-gray-400 inline-block transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{{ level.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  <div class="flex items-center gap-2">
                    {{ level.title }}
                    <span v-if="getQuestions(level.id).length === 5" class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full border border-green-200">✅ Publicado</span>
                    <span v-else class="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full border border-yellow-200">⚠️ Rascunho ({{ getQuestions(level.id).length }}/5)</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" :title="level.description">{{ level.description }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button @click.stop="openLevelModal(level)" class="text-blue-600 hover:text-blue-900 mr-4">Editar</button>
                  <button @click.stop="deleteLevel(level.id)" class="text-red-600 hover:text-red-900">Excluir</button>
                </td>
              </tr>
              
              <!-- Expanded Area for Questions -->
              <tr v-if="expandedLevelId === level.id" class="bg-indigo-50/40">
                <td colspan="5" class="px-8 py-6 border-b border-indigo-100">
                  <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold text-indigo-900">Perguntas do Nível ({{ getQuestions(level.id).length }}/5)</h3>
                    <button v-if="getQuestions(level.id).length < 5" @click="openQuestionModal(null, level.id)" class="btn-secondary !py-1.5 !px-3 !rounded-md !text-sm">
                      + Adicionar Pergunta
                    </button>
                    <span v-else class="text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-md border border-green-200">
                      Limite de 5 atingido
                    </span>
                  </div>
                  
                  <div v-if="getQuestions(level.id).length > 0" class="bg-white border border-indigo-100 rounded-lg overflow-hidden shadow-sm">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-indigo-50/50">
                        <tr>
                          <th class="px-4 py-2 text-left text-xs font-bold text-indigo-800 uppercase">Tipo</th>
                          <th class="px-4 py-2 text-left text-xs font-bold text-indigo-800 uppercase">PT</th>
                          <th class="px-4 py-2 text-left text-xs font-bold text-indigo-800 uppercase">EN</th>
                          <th class="px-4 py-2 text-right text-xs font-bold text-indigo-800 uppercase">Ações da Pergunta</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-100">
                        <tr v-for="q in getQuestions(level.id)" :key="q.id" class="hover:bg-gray-50">
                          <td class="px-4 py-2 text-sm text-gray-900 capitalize font-medium">{{ q.type }}</td>
                          <td class="px-4 py-2 text-sm text-gray-700 truncate max-w-[200px]">{{ q.promptPt }}</td>
                          <td class="px-4 py-2 text-sm text-gray-500 truncate max-w-[200px]">{{ q.promptEn }}</td>
                          <td class="px-4 py-2 text-right text-sm font-medium">
                            <button @click="openQuestionModal(q, level.id)" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                            <button @click="deleteQuestion(q.id)" class="text-red-500 hover:text-red-700">Excluir</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div v-else class="text-gray-500 italic text-sm py-4 text-center bg-white border border-indigo-100 rounded-lg">
                    Nenhuma pergunta cadastrada neste nível.
                  </div>
                </td>
              </tr>
            </template>
            
            <tr v-if="levels.length === 0 && !loading">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">Nenhum nível encontrado.</td>
            </tr>
            <tr v-if="loading">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500 flex justify-center items-center w-full">
                <span class="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full mr-2 inline-block"></span> Carregando...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Adicionar/Editar Nível -->
    <div v-if="showLevelModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">{{ editingLevel ? 'Editar Nível' : 'Novo Nível' }}</h2>
        <form @submit.prevent="saveLevel" class="space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Título do Nível</label>
            <input v-model="formLevel.title" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Descrição</label>
            <textarea v-model="formLevel.description" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none"></textarea>
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button type="button" @click="showLevelModal = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancelar</button>
            <button type="submit" :disabled="savingLevel" class="btn-secondary !py-2 !px-4 !rounded-lg disabled:opacity-70 flex items-center">
              <span v-if="savingLevel" class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
              {{ savingLevel ? 'Salvando...' : 'Salvar' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Adicionar/Editar Pergunta -->
    <div v-if="showQuestionModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto pt-10 pb-10">
      <div class="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl my-auto max-h-[90vh] overflow-y-auto">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">{{ editingQuestion ? 'Editar Pergunta' : 'Nova Pergunta' }}</h2>
        <form @submit.prevent="saveQuestion" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Tipo da Pergunta</label>
              <select v-model="formQuestion.type" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                <option value="association">Associação (Association)</option>
                <option value="translation">Tradução (Translation)</option>
                <option value="sentence">Frase (Sentence)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">URL Imagem/Emoji (Opcional)</label>
              <input v-model="formQuestion.imageUrl" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: 🍎 ou https://..." />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Pergunta (PT)</label>
              <input v-model="formQuestion.promptPt" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: Maçã" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Resposta (EN)</label>
              <input v-model="formQuestion.promptEn" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: Apple" />
            </div>
          </div>

          <div class="mt-6 border-t pt-4">
            <h3 class="text-lg font-bold mb-3 text-gray-800 flex justify-between items-center">
              Opções de Resposta
              <button type="button" @click="addOption" class="text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-md transition-colors border border-indigo-200">+ Adicionar Opção</button>
            </h3>
            
            <p class="text-xs text-gray-500 mb-3">Selecione a bolinha ao lado da resposta que é a correta.</p>
            
            <div class="space-y-3">
              <div v-for="(opt, idx) in formQuestion.options" :key="idx" class="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <input type="radio" :name="'correctOption'" :value="idx" v-model="correctOptionIndex" class="w-5 h-5 text-indigo-600 focus:ring-indigo-500 cursor-pointer" title="Marcar como correta" />
                <input v-model="opt.text" type="text" required class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" :placeholder="'Texto da Opção ' + (idx + 1)" />
                <button type="button" @click="removeOption(idx)" class="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-md transition-colors" title="Remover opção" v-if="formQuestion.options.length > 2">Excluir</button>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6 border-t pt-6">
            <button type="button" @click="showQuestionModal = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancelar</button>
            <button type="submit" :disabled="savingQuestion" class="btn-primary !py-2 !px-6 !rounded-lg disabled:opacity-70 flex items-center">
              <span v-if="savingQuestion" class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
              {{ savingQuestion ? 'Salvando...' : 'Salvar Pergunta' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'
import { useGameStore } from '~/stores/game'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const supabase = useSupabaseClient()
const gameStore = useGameStore()
const levels = ref([])
const allQuestions = ref([])
const loading = ref(true)

const expandedLevelId = ref(null)

// LEVEL STATES
const showLevelModal = ref(false)
const savingLevel = ref(false)
const editingLevel = ref(null)
const formLevel = ref({ title: '', description: '' })

// QUESTION STATES
const showQuestionModal = ref(false)
const savingQuestion = ref(false)
const editingQuestion = ref(null)
const currentLevelIdForQuestion = ref(null)
const correctOptionIndex = ref(0)
const formQuestion = ref({
  type: 'translation', promptPt: '', promptEn: '', imageUrl: '', options: []
})

const fetchData = async () => {
  loading.value = true
  const [resLevels, resQuestions] = await Promise.all([
    supabase.from('levels').select('*').order('id'),
    supabase.from('questions').select('*').order('id')
  ])
  
  if (resLevels.data) levels.value = resLevels.data
  if (resQuestions.data) allQuestions.value = resQuestions.data
  
  // Mantém o frontend (loja Pinia) atualizado com as mudanças do Admin
  await gameStore.fetchLevels(supabase, true)
  
  loading.value = false
}

onMounted(() => {
  fetchData()
})

const toggleExpand = (id) => {
  expandedLevelId.value = expandedLevelId.value === id ? null : id
}

const getQuestions = (levelId) => {
  return allQuestions.value.filter(q => q.level_id === levelId)
}

// --- LEVEL CRUD ---
const openLevelModal = (level) => {
  editingLevel.value = level
  if (level) {
    formLevel.value = { title: level.title, description: level.description }
  } else {
    formLevel.value = { title: '', description: '' }
  }
  showLevelModal.value = true
}

const saveLevel = async () => {
  savingLevel.value = true
  if (editingLevel.value) {
    const { error } = await supabase.from('levels').update(formLevel.value).eq('id', editingLevel.value.id)
    if (error) alert("Erro ao editar nível: " + error.message)
  } else {
    // Definimos o ID manualmente pois os dados importados (seed) dessincronizaram a sequence do PostgreSQL
    const maxId = levels.value.length > 0 ? Math.max(...levels.value.map(l => l.id)) : 0
    const newLevel = { ...formLevel.value, id: maxId + 1 }
    
    const { data, error } = await supabase.from('levels').insert([newLevel]).select()
    
    if (error) {
      alert("Erro ao criar nível: " + error.message)
    } else if (data && data.length > 0) {
      // Expande o nível recém criado automaticamente para mostrar as perguntas (vazias)
      expandedLevelId.value = data[0].id
    }
  }
  savingLevel.value = false
  showLevelModal.value = false
  fetchData()
}

const deleteLevel = async (id) => {
  if (!confirm('Tem certeza que deseja excluir este nível? Todas as perguntas dele serão apagadas.')) return
  
  // Apaga manualmente as perguntas antes para evitar qualquer erro de trava (Constraint) do banco de dados
  const { error: qError } = await supabase.from('questions').delete().eq('level_id', id)
  if (qError) {
    alert("Erro ao excluir perguntas atreladas: " + qError.message)
    return
  }

  const { error } = await supabase.from('levels').delete().eq('id', id)
  if (error) {
    alert("Erro ao excluir nível: " + error.message)
    return
  }
  
  await fetchData()
}

// --- QUESTION CRUD ---
const openQuestionModal = (q, levelId) => {
  currentLevelIdForQuestion.value = levelId
  editingQuestion.value = q
  
  if (q) {
    formQuestion.value = { 
      type: q.type, 
      promptPt: q.promptPt, 
      promptEn: q.promptEn, 
      imageUrl: q.imageUrl || '',
      options: JSON.parse(JSON.stringify(q.options))
    }
    const correctIdx = formQuestion.value.options.findIndex(o => o.isCorrect)
    correctOptionIndex.value = correctIdx !== -1 ? correctIdx : 0
  } else {
    formQuestion.value = { 
      type: 'translation', promptPt: '', promptEn: '', imageUrl: '', 
      options: [
        { id: 1, text: '', isCorrect: true }, { id: 2, text: '', isCorrect: false },
        { id: 3, text: '', isCorrect: false }, { id: 4, text: '', isCorrect: false }
      ]
    }
    correctOptionIndex.value = 0
  }
  showQuestionModal.value = true
}

const addOption = () => {
  const newId = formQuestion.value.options.length > 0 ? Math.max(...formQuestion.value.options.map(o => o.id)) + 1 : 1
  formQuestion.value.options.push({ id: newId, text: '', isCorrect: false })
}

const removeOption = (idx) => {
  formQuestion.value.options.splice(idx, 1)
  if (correctOptionIndex.value === idx) correctOptionIndex.value = 0
  else if (correctOptionIndex.value > idx) correctOptionIndex.value--
}

const saveQuestion = async () => {
  savingQuestion.value = true
  
  if (!editingQuestion.value) {
    const currentQuestionsCount = getQuestions(currentLevelIdForQuestion.value).length
    if (currentQuestionsCount >= 5) {
      alert("Este nível já possui o limite máximo de 5 perguntas.")
      savingQuestion.value = false
      return
    }
  }
  
  const optionsToSave = formQuestion.value.options.map((opt, idx) => ({
    ...opt, isCorrect: idx === correctOptionIndex.value
  }))
  
  const payload = {
    level_id: currentLevelIdForQuestion.value,
    type: formQuestion.value.type,
    promptPt: formQuestion.value.promptPt,
    promptEn: formQuestion.value.promptEn,
    imageUrl: formQuestion.value.imageUrl || null,
    options: optionsToSave
  }
  
  if (editingQuestion.value) {
    const { error } = await supabase.from('questions').update(payload).eq('id', editingQuestion.value.id)
    if (error) alert("Erro ao editar pergunta: " + error.message)
  } else {
    // Definimos o ID manualmente pelo mesmo motivo (sequence do PG)
    const maxId = allQuestions.value.length > 0 ? Math.max(...allQuestions.value.map(q => q.id)) : 0
    payload.id = maxId + 1
    
    const { error } = await supabase.from('questions').insert([payload])
    if (error) alert("Erro ao criar pergunta: " + error.message)
  }
  
  savingQuestion.value = false
  showQuestionModal.value = false
  fetchData()
}

const deleteQuestion = async (id) => {
  if (!confirm('Tem certeza que deseja excluir esta pergunta?')) return
  const { error } = await supabase.from('questions').delete().eq('id', id)
  if (error) {
    alert("Erro ao excluir pergunta: " + error.message)
    return
  }
  await fetchData()
}
</script>
