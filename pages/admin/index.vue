<template>
  <div class="space-y-6">
    <!-- Aviso se não estiver na tabela de admins -->
    <div v-if="!adminRole && !loading" class="bg-red-50 p-6 rounded-xl border border-red-200 shadow-sm text-center">
      <div class="text-4xl mb-3">⚠️</div>
      <h2 class="text-xl font-black text-red-800 mb-2">Conta de Administrador Incompleta</h2>
      <p class="text-red-700 max-w-2xl mx-auto">
        Sua conta entrou no painel (Supabase Auth), mas você ainda não vinculou o seu ID na tabela <b>admins</b>. 
        <br><br>
        Vá no Supabase &gt; Authentication &gt; Copie seu UID. Depois vá em Table Editor &gt; <b>admins</b> e insira uma nova linha colando este UID. 
      </p>
      <div class="mt-4 text-xs font-mono bg-white inline-block px-3 py-2 rounded border border-red-100 text-red-500 font-bold">
        Seu UID atual: {{ adminId }}
        Seu UID atual: {{ admin.id }}
      </div>
    </div>

    <!-- Controles de Turma e Admin -->
    <div v-if="adminRole">
      <!-- Filtros Superiores (Turma e Ano) -->
      <div class="glass-panel p-6 mb-8 flex flex-col md:flex-row gap-6 items-end relative overflow-hidden z-10 border-t-4 border-t-eco-yellow bg-white rounded-xl shadow-sm">
        <!-- Turma -->
        <div class="w-full md:w-1/2 relative group">
          <label class="block text-gray-500 font-bold mb-2 text-sm uppercase tracking-wider pl-2">Turma / Ano Escolar Atual</label>
          <div class="relative">
            <select v-model="selectedSchoolYear" @change="fetchData" class="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-eco-green focus:ring-0 outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none bg-white cursor-pointer group-hover:border-eco-green/50">
              <option v-for="year in 9" :key="year" :value="year">{{ year }}º Ano do Ensino Fundamental</option>
            </select>
          </div>
        </div>
        
        <!-- Ano Letivo -->
        <div class="w-full md:w-1/4 relative group">
          <label class="block text-gray-500 font-bold mb-2 text-sm uppercase tracking-wider pl-2">Ano Letivo</label>
          <div class="relative">
            <select v-model="selectedCalendarYear" @change="fetchData" class="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-eco-blue focus:ring-0 outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none bg-white cursor-pointer group-hover:border-eco-blue/50">
              <option v-for="year in [2024, 2025, 2026, 2027, 2028, 2029, 2030]" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>
        </div>

        <!-- Perfil Logado -->
        <div class="w-full md:w-1/4 flex justify-end">
          <div class="bg-gray-50 px-6 py-4 rounded-2xl border border-gray-200 flex flex-col items-end">
            <span class="text-xs text-gray-400 font-bold uppercase tracking-widest">Logado como:</span>
            <span class="text-eco-blue font-bold">{{ adminRole === 'master' ? 'Master Admin' : 'Professor (subadmin)' }}</span>
          </div>
        </div>
      </div>

      <!-- Abas de Navegação -->
      <div class="flex border-b border-gray-200 mb-8">
        <button 
          @click="activeTab = 'management'" 
          :class="['px-6 py-3 font-bold text-lg rounded-t-lg transition-colors border-b-4', activeTab === 'management' ? 'border-eco-green text-eco-green bg-eco-green/5' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50']"
        >
          📝 Gerenciar Turma
        </button>
        <button 
          @click="activeTab = 'dashboard'" 
          :class="['px-6 py-3 font-bold text-lg rounded-t-lg transition-colors border-b-4', activeTab === 'dashboard' ? 'border-eco-blue text-eco-blue bg-eco-blue/5' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50']"
        >
          📊 Dashboard Analítico
        </button>
      </div>

      <!-- Conteúdo da Aba: GERENCIAR TURMA -->
      <div v-if="activeTab === 'management'">
        <!-- Seção: Alunos -->
        <div class="bg-white glass-panel p-6 mb-8 border-t-4 border-t-eco-green rounded-xl shadow-sm">
          <div class="flex items-center gap-3 mb-6">
            <h2 class="text-xl font-black text-gray-800 flex items-center gap-2">
              <span>👨‍🎓 Alunos da Turma</span>
              <span class="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{{ students.length }} cadastrados</span>
            </h2>
          </div>
          <form @submit.prevent="addStudent" class="flex flex-wrap gap-3 mb-4">
            <input v-model="newStudentFirst" type="text" placeholder="Nome" required class="flex-1 min-w-[150px] px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
            <input v-model="newStudentLast" type="text" placeholder="Sobrenome" required class="flex-1 min-w-[150px] px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
            <button type="submit" class="btn-primary !py-2 !px-6 !rounded-lg whitespace-nowrap">Adicionar Aluno</button>
          </form>
          <div class="flex flex-wrap gap-2 mt-4">
            <span v-for="student in students" :key="student.id" class="px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200 text-sm font-bold flex items-center gap-2 shadow-sm">
              {{ student.first_name }} {{ student.last_name }}
              <button @click="removeStudent(student.id)" class="text-red-400 hover:text-red-700 hover:bg-red-50 rounded-full w-5 h-5 flex items-center justify-center transition-colors" title="Remover">×</button>
            </span>
            <span v-if="students.length === 0" class="text-sm text-gray-500 italic p-2">Nenhum aluno cadastrado para o {{ selectedSchoolYear }}º Ano. Adicione acima para autorizá-los a logar.</span>
          </div>
        </div>

        <!-- Seção: Níveis -->
        <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t-4 border-t-eco-blue glass-panel p-6 bg-white rounded-xl shadow-sm">
          <h2 class="text-2xl font-black text-gray-800 flex items-center gap-2">Níveis desta Turma</h2>
          <div class="flex gap-2">
            <button @click="autoGenerateLevels" class="btn-primary text-sm px-4 py-2 flex items-center gap-1 shadow-md bg-eco-green hover:bg-eco-green-light" :disabled="loading">
              <span v-if="loading">Gerando...</span>
              <span v-else>⚡ Gerar 10 Níveis</span>
            </button>
            <button @click="openLevelModal()" class="btn-primary text-sm px-4 py-2 shadow-md">+ Novo Nível</button>
          </div>
        </div>

        <!-- Lista de Níveis -->
        <div class="bg-white glass-panel overflow-hidden rounded-xl shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest border-b border-gray-100">
                  <th class="p-4 font-bold">ID</th>
                  <th class="p-4 font-bold">Título</th>
                  <th class="p-4 font-bold">Descrição</th>
                  <th class="p-4 font-bold text-right">Ações do Nível</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="level in levels" :key="level.id">
                  <tr class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                    <td class="p-4 font-bold text-gray-400">
                      <button @click="toggleExpand(level.id)" class="mr-2 text-gray-400 hover:text-eco-blue transition-colors">
                        {{ expandedLevelId === level.id ? '🔽' : '▶️' }}
                      </button>
                      {{ level.id }}
                    </td>
                    <td class="p-4 font-bold text-gray-800">
                      {{ level.title }}
                      <span v-if="getQuestions(level.id).length === 5" class="ml-2 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full border border-green-200">✅ Publicado</span>
                      <span v-else class="ml-2 text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full border border-yellow-200">Rascunho ({{ getQuestions(level.id).length }}/5)</span>
                    </td>
                    <td class="p-4 text-gray-500 text-sm">{{ level.description }}</td>
                    <td class="p-4 text-right">
                      <button @click="openLevelModal(level)" class="text-eco-blue hover:text-eco-blue-light font-bold text-sm px-3 py-1 rounded hover:bg-eco-blue/10 transition-colors mr-2">Editar</button>
                      <button @click="deleteLevel(level.id)" class="text-red-500 hover:text-red-400 font-bold text-sm px-3 py-1 rounded hover:bg-red-50 transition-colors">Excluir</button>
                    </td>
                  </tr>
                  
                  <!-- Expanded Questions Row -->
                  <tr v-if="expandedLevelId === level.id" class="bg-gray-50/50 shadow-inner">
                    <td colspan="4" class="p-0 border-b border-gray-200">
                      <div class="p-6 bg-gradient-to-r from-gray-50 to-white">
                        <div class="flex justify-between items-center mb-6">
                          <h3 class="font-black text-gray-700 flex items-center gap-2 text-lg">
                            <span class="text-2xl"></span> Gerenciar Perguntas do Nível
                          </h3>
                          <button @click="openQuestionModal(null, level.id)" class="btn-primary text-sm px-4 py-2 bg-indigo-600 hover:bg-indigo-700 shadow-md">+ Adicionar Pergunta</button>
                        </div>
                        
                        <div v-if="getQuestions(level.id).length > 0" class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                          <div v-for="(q, index) in getQuestions(level.id)" :key="q.id" class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative group hover:border-indigo-300 transition-colors flex flex-col md:flex-row gap-4">
                            
                            <!-- Imagem/Emoji -->
                            <div class="w-full md:w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 border border-gray-200 overflow-hidden">
                              <img v-if="q.imageUrl && q.imageUrl.startsWith('http')" :src="q.imageUrl" class="w-full h-full object-cover" />
                              <span v-else-if="q.imageUrl" class="text-6xl">{{ q.imageUrl }}</span>
                              <span v-else-if="q.type === 'association'" class="text-4xl text-gray-400">🖼️</span>
                              <span v-else class="text-4xl text-gray-400">📝</span>
                            </div>

                            <div class="flex-1 min-w-0">
                              <div class="flex justify-between items-start mb-2">
                                <div>
                                  <span class="text-xs font-bold text-indigo-500 uppercase tracking-widest block mb-1">Pergunta {{ index + 1 }}</span>
                                  <p class="font-black text-gray-800 text-base" :title="'Tradução/Dica: ' + q.promptEn">{{ q.promptPt }}</p>
                                  <p class="text-gray-500 text-sm italic">Dica/Tradução: {{ q.promptEn }}</p>
                                </div>
                                <div class="flex gap-2 shrink-0 ml-2">
                                  <button @click="openQuestionModal(q, level.id)" class="p-2 bg-indigo-50 rounded-lg text-indigo-600 hover:bg-indigo-100 transition-colors" title="Editar">✏️</button>
                                  <button @click="deleteQuestion(q.id)" class="p-2 bg-red-50 rounded-lg text-red-500 hover:bg-red-100 transition-colors" title="Excluir">🗑️</button>
                                </div>
                              </div>
                              
                              <!-- Lista de Opções -->
                              <div class="mt-4 grid grid-cols-2 gap-2">
                                <div v-for="opt in q.options" :key="opt.id" class="px-3 py-2 rounded-lg text-sm font-medium border" :class="opt.isCorrect ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-600'">
                                  <span v-if="opt.isCorrect" class="mr-1">✅</span>
                                  <span v-else class="mr-1 text-gray-400">❌</span>
                                  {{ opt.text }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else class="text-center py-12 text-gray-400 font-medium bg-white rounded-xl border-2 border-dashed border-gray-200">
                          Nenhuma pergunta cadastrada para este nível ainda.
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
                
                <tr v-if="levels.length === 0">
                  <td colspan="4" class="p-8 text-center text-gray-500">Nenhum nível cadastrado para o {{ selectedSchoolYear }}º Ano.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Conteúdo da Aba: DASHBOARD -->
      <div v-if="activeTab === 'dashboard'">
        <AdminDashboard :schoolYear="selectedSchoolYear" :calendarYear="selectedCalendarYear" :adminId="adminId" />
      </div>
    </div>

    <!-- Modal Nível -->
    <div v-if="showLevelModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-fade-in-up">
        <div class="bg-gradient-to-r from-eco-blue to-indigo-600 p-6">
          <h2 class="text-2xl font-black text-white">{{ editingLevel ? 'Editar Nível' : 'Novo Nível' }}</h2>
        </div>
        <form @submit.prevent="saveLevel" class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Título</label>
              <input v-model="formLevel.title" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-blue outline-none transition-shadow" placeholder="Ex: Animais Domésticos" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Descrição</label>
              <textarea v-model="formLevel.description" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-blue outline-none transition-shadow" placeholder="Ex: Aprenda os nomes dos animais que temos em casa."></textarea>
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button type="button" @click="showLevelModal = false" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancelar</button>
            <button type="submit" :disabled="savingLevel" class="btn-primary !py-2 !px-6 !rounded-lg disabled:opacity-70 flex items-center">
              <span v-if="savingLevel" class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
              {{ savingLevel ? 'Salvando...' : 'Salvar' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Pergunta -->
    <div v-if="showQuestionModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div class="bg-gradient-to-r from-eco-blue to-indigo-600 p-6 sticky top-0 z-10">
          <h2 class="text-2xl font-black text-white">{{ editingQuestion ? 'Editar Pergunta' : 'Nova Pergunta' }}</h2>
        </div>
        <form @submit.prevent="saveQuestion" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Tipo de Pergunta</label>
                <select v-model="formQuestion.type" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-blue outline-none transition-shadow bg-white">
                  <option value="translation">Tradução</option>
                  <option value="association">Associação de Imagem</option>
                  <option value="sentences">Sentenças</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Texto Base (Português)</label>
                <input v-model="formQuestion.promptPt" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-blue outline-none transition-shadow" placeholder="Ex: Cachorro" />
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Resposta / Dica (Inglês)</label>
                <input v-model="formQuestion.promptEn" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-blue outline-none transition-shadow" placeholder="Ex: Dog" />
              </div>

              <div>
                <label class="block text-sm font-bold text-gray-700 mb-1">Imagem ou Emoji</label>
                <input v-model="formQuestion.imageUrl" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-blue outline-none transition-shadow" placeholder="Ex: 🐶 ou https://exemplo.com/img.png" />
                <p class="text-xs text-gray-500 mt-1">Cole um Emoji diretamente ou o link público de uma imagem.</p>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between items-center mb-2">
                <label class="block text-sm font-bold text-gray-700">Opções de Resposta</label>
                <button type="button" @click="addOption" class="text-xs btn-secondary !py-1 !px-2 bg-white shadow-sm">+ Opção</button>
              </div>
              
              <div v-for="(opt, idx) in formQuestion.options" :key="idx" class="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-200">
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
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabaseClient } from '#imports'
import { useGameStore } from '~/stores/game'
import { generateLevelsByYear } from '~/utils/levelGenerator'
import AdminDashboard from '~/components/admin/AdminDashboard.vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const router = useRouter()
const supabase = useSupabaseClient()
const gameStore = useGameStore()

const activeTab = ref('management')

// STATES GLOBAIS DA PÁGINA
const userAuth = ref(null)
const adminId = ref(null)
const adminRole = ref(null)
const adminName = ref('')

const selectedSchoolYear = ref(1)
const selectedCalendarYear = ref(new Date().getFullYear())

const levels = ref([])
const allQuestions = ref([])
const students = ref([])
const loading = ref(true)

// FORM STATES ALUNOS
const newStudentFirst = ref('')
const newStudentLast = ref('')

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
  
  // 1. Pega usuário logado
  if (!userAuth.value) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
       loading.value = false; return;
    }
    userAuth.value = user
    adminId.value = user.id
    
    // Busca info na tabela admins
    const { data: adData } = await supabase.from('admins').select('*').eq('id', user.id).single()
    if (adData) {
       adminRole.value = adData.role
       adminName.value = adData.name
       if (adData.role === 'master') {
          selectedSchoolYear.value = 0
       }
    }
  }

  // 2. Busca níveis
  let levelsQuery = supabase.from('levels').select('*').order('id')
  
  if (selectedSchoolYear.value > 0) {
    levelsQuery = levelsQuery.eq('school_year', selectedSchoolYear.value).eq('admin_id', adminId.value)
  } else {
    levelsQuery = levelsQuery.eq('school_year', 0)
  }

  const [resLevels, resQuestions] = await Promise.all([
    levelsQuery,
    supabase.from('questions').select('*').order('id')
  ])
  
  if (resLevels.data) levels.value = resLevels.data
  if (resQuestions.data) allQuestions.value = resQuestions.data
  
  // 3. Busca Alunos da Whitelist
  if (selectedSchoolYear.value > 0 && adminId.value) {
    const { data: stData } = await supabase.from('students_whitelist')
      .select('*')
      .eq('admin_id', adminId.value)
      .eq('school_year', selectedSchoolYear.value)
      .eq('calendar_year', selectedCalendarYear.value)
      .order('first_name')
    students.value = stData || []
  } else {
    students.value = []
  }
  
  // Atualiza Store Global para Preview
  await gameStore.fetchLevels(supabase, adminId.value, selectedSchoolYear.value, true)
  
  loading.value = false
}

const addStudent = async () => {
  if (!newStudentFirst.value.trim() || !newStudentLast.value.trim()) return
  
  const formatName = (str) => {
    return str.trim().split(/\s+/).map(word => 
      word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : ''
    ).join(' ');
  };
  const fFirst = formatName(newStudentFirst.value)
  const fLast = formatName(newStudentLast.value)
  const slug = `${fFirst}-${fLast}`.toLowerCase().replace(/\s+/g, '-')
  
  const { error } = await supabase.from('students_whitelist').insert({
    admin_id: adminId.value,
    school_year: selectedSchoolYear.value,
    calendar_year: selectedCalendarYear.value,
    first_name: fFirst,
    last_name: fLast,
    slug: slug
  })
  
  if (error) {
    if (error.code === '23505') alert("Este aluno já existe nesta turma!")
    else alert("Erro ao adicionar: " + error.message)
  } else {
    newStudentFirst.value = ''
    newStudentLast.value = ''
    fetchData()
  }
}

const removeStudent = async (id) => {
  if (!confirm("Remover este aluno da turma? Ele não conseguirá mais fazer login!")) return
  await supabase.from('students_whitelist').delete().eq('id', id)
  fetchData()
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
    // Busca o ID máximo global na tabela para evitar conflito (duplicate key)
    const { data: maxLevelData } = await supabase.from('levels').select('id').order('id', { ascending: false }).limit(1)
    const absoluteMaxId = maxLevelData && maxLevelData.length > 0 ? maxLevelData[0].id : 0
    
    const newLevel = { 
       ...formLevel.value, 
       id: absoluteMaxId + 1,
       admin_id: adminId.value,
       school_year: selectedSchoolYear.value
    }
    
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

const autoGenerateLevels = async () => {
  if (selectedSchoolYear.value === 0) {
    alert("Por favor, selecione um Ano Escolar válido (1º ao 9º) antes de gerar níveis.");
    return;
  }
  
  if (!confirm(`Gerar 10 níveis adequados à BNCC para o ${selectedSchoolYear.value}º Ano?`)) return;
  
  loading.value = true;
  
  // Utiliza a função global (auto-importada do diretório utils do Nuxt)
  const levelsData = generateLevelsByYear(selectedSchoolYear.value);

  if (!levelsData || levelsData.length === 0) {
    alert(`Sem dados pré-configurados para o ${selectedSchoolYear.value}º Ano.`);
    loading.value = false;
    return;
  }

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  try {
    const { data: maxLevelData } = await supabase.from('levels').select('id').order('id', { ascending: false }).limit(1);
    let absoluteMaxLevelId = maxLevelData && maxLevelData.length > 0 ? maxLevelData[0].id : 0;

    const { data: maxQuestionData } = await supabase.from('questions').select('id').order('id', { ascending: false }).limit(1);
    let absoluteMaxQuestionId = maxQuestionData && maxQuestionData.length > 0 ? maxQuestionData[0].id : 0;

    for (const levelData of levelsData) {
      absoluteMaxLevelId++;
      
      const newLevel = {
        id: absoluteMaxLevelId,
        title: levelData.title,
        description: levelData.description,
        admin_id: adminId.value,
        school_year: selectedSchoolYear.value
      };

      await supabase.from('levels').insert([newLevel]);
      
      for (const item of levelData.items) {
        absoluteMaxQuestionId++;
        
        let allWords = [...levelData.items.map(i => i.en), ...levelData.distractors];
        allWords = allWords.filter(w => w !== item.en);
        shuffle(allWords);
        
        const incorrectWords = allWords.slice(0, 3);
        const optionsArray = [
          { id: 1, text: item.en, isCorrect: true },
          { id: 2, text: incorrectWords[0], isCorrect: false },
          { id: 3, text: incorrectWords[1], isCorrect: false },
          { id: 4, text: incorrectWords[2], isCorrect: false }
        ];
        
        shuffle(optionsArray);
        optionsArray.forEach((opt, idx) => { opt.id = idx + 1; });
        
        const newQuestion = {
          id: absoluteMaxQuestionId,
          level_id: absoluteMaxLevelId,
          type: item.type,
          promptPt: item.pt,
          promptEn: item.en,
          imageUrl: null,
          options: optionsArray
        };
        
        await supabase.from('questions').insert([newQuestion]);
      }
    }
    alert(`10 níveis e 50 perguntas gerados com sucesso para o ${selectedSchoolYear.value}º Ano!`);
    await fetchData();
  } catch (e) {
    alert("Erro ao gerar: " + e.message);
  } finally {
    loading.value = false;
  }
}
</script>
