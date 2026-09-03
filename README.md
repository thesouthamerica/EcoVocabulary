# 🌍 Eco-Vocabulary

Bem-vindo ao **Eco-Vocabulary**! Uma aplicação web educacional, lúdica e totalmente interativa voltada para crianças que desejam dar os primeiros passos no aprendizado da língua inglesa, ao mesmo tempo em que desenvolvem uma consciência ecológica.

## ✨ Sobre o Projeto

O Eco-Vocabulary foi desenhado para ser muito mais que um simples jogo de perguntas. Ele é uma plataforma de aprendizado contínuo onde os pequenos aprendem palavras essenciais do inglês associando-as a belas ilustrações e emojis nativos em temas amigáveis ao meio ambiente!

### 🎮 Principais Funcionalidades (Atualizadas!)

- **Sistema Escolar Multi-Professor (Novo!):** Arquitetura desenhada para uso em Escolas Públicas e Particulares. O sistema possui um `Master Admin` e diversos `Sub-Admins` (Professores). Cada professor gerencia os seus próprios alunos isoladamente!
- **Áreas por Ano Escolar (Novo!):** Os professores podem criar níveis e desafios específicos organizados do 1º ao 9º Ano do Ensino Fundamental. Uma única escola pode utilizar o aplicativo simultaneamente em várias séries com conteúdos diferentes!
- **Whitelist Segura e Login Simplificado (Novo!):** Chega de emails e senhas para as crianças. O professor cadastra o aluno em seu painel. No login, o aluno apenas escolhe o seu Professor, o seu Ano Escolar e digita seu Nome e Sobrenome (o sistema ajusta as maiúsculas e minúsculas automaticamente para padronizar e evitar duplicidade). Apenas alunos na *whitelist* do professor conseguem entrar.
- **Modo Visitante (Novo!):** Usuários que não estão matriculados podem explorar o jogo clicando em "Entrar como Visitante", jogando as fases padrões controladas pelo Administrador Master.
- **Painel Administrativo Completo:** Uma área restrita (`/admin`) protegida por autenticação, onde os professores gerenciam seus Níveis, Perguntas e Alunos, além de um poderoso **Dashboard** com estatísticas de acerto e métricas da turma.
- **Paginação e Gamificação Inteligente:** O jogo divide automaticamente as fases, embaralha perguntas/respostas para evitar decoreba e recompensa o aluno a cada avanço!

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando excelentes práticas modernas de desenvolvimento web:

- **Frontend:** [Vue.js 3](https://vuejs.org/) & [Nuxt.js 3](https://nuxt.com/) (Composition API, Roteamento Automático)
- **Estilização:** [TailwindCSS](https://tailwindcss.com/) & CSS Vanilla para efeitos de Glassmorphism, responsividade e micro-animações avançadas.
- **Gerenciamento de Estado:** [Pinia](https://pinia.vuejs.org/) para controle do fluxo de jogo e pontuação.
- **Banco de Dados & Autenticação:** [Supabase](https://supabase.com/). O projeto utiliza PostgreSQL para abrigar de forma relacional as tabelas de `admins`, `students_whitelist`, `levels`, `questions` e controle de progresso (`user_progress`, `user_answers`), protegidas por Políticas de Segurança Rigorosas (RLS).

---

## 🚀 Como rodar o projeto localmente

Se você deseja contribuir ou apenas rodar o jogo na sua máquina, siga os passos abaixo:

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
Tenha certeza de que suas chaves do Supabase estão configuradas no arquivo `.env`. É necessário também ter rodado os scripts SQL de migração para as tabelas de `admins` e `students_whitelist`.

### Instalação

```bash
# Instale as dependências com o NPM
npm install
```

### Servidor de Desenvolvimento

Inicie o servidor de desenvolvimento na porta `3000`:

```bash
npm run dev
```
Acesse `http://localhost:3000` no seu navegador e divirta-se!

### Gerando para Produção (Cloudflare Pages, Vercel, Netlify)

Para compilar a aplicação e otimizar para publicação estática/SSR:

```bash
npm run build
```

---

<p align="center">
  <i>"Aprenda inglês enquanto salva o planeta!"</i> 🌱
</p>
