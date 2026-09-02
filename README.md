# 🌍 Eco-Vocabulary

Bem-vindo ao **Eco-Vocabulary**! Uma aplicação web educacional, lúdica e totalmente interativa voltada para crianças que desejam dar os primeiros passos no aprendizado da língua inglesa, ao mesmo tempo em que desenvolvem uma consciência ecológica.

## ✨ Sobre o Projeto

O Eco-Vocabulary foi desenhado para ser muito mais que um simples jogo de perguntas. Ele é uma plataforma de aprendizado contínuo onde os pequenos aprendem palavras essenciais do inglês associando-as a belas ilustrações e emojis nativos em temas amigáveis ao meio ambiente!

### 🎮 Principais Funcionalidades

- **Aprendizado Interativo & Dinâmico:** Diversos níveis de dificuldade abordando temas ecológicos. Graças a um avançado painel de controle, novos níveis podem ser criados, editados e publicados em tempo real.
- **Paginação Inteligente:** O menu do jogo divide automaticamente os níveis (20 por tela) para evitar poluição visual. O sistema lembra a última página que o jogador estava e a carrega automaticamente!
- **Painel Administrativo (CRUD Completo):** Uma área restrita com login de administrador (`/admin`), que permite aos criadores gerenciarem o conteúdo do jogo. Os níveis funcionam num sistema de "Rascunho", só sendo exibidos ao jogador após a inclusão de exatamente 5 perguntas obrigatórias.
- **Login Amigável para Crianças:** Um sistema de login inovador sem necessidade de e-mails ou senhas complexas. Apenas Nome, Sobrenome e Data de Nascimento criam um perfil único que salva o progresso na nuvem em tempo real!
- **Feedback Visual e Gamificação:** Uso de animações vibrantes, cores agradáveis (Eco-green, Eco-blue, Eco-yellow) e progressão que recompensa os alunos (com direito a Certificado ao final).
- **Opções Dinâmicas:** A cada vez que uma fase é acessada, as 4 opções de resposta e a ordem das perguntas são embaralhadas para evitar "decoreba".

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando excelentes práticas modernas de desenvolvimento web:

- **Frontend:** [Vue.js 3](https://vuejs.org/) & [Nuxt.js 3](https://nuxt.com/) (Composition API, Roteamento Automático)
- **Estilização:** [TailwindCSS](https://tailwindcss.com/) & CSS Vanilla para efeitos de Glassmorphism, responsividade e micro-animações avançadas.
- **Gerenciamento de Estado:** [Pinia](https://pinia.vuejs.org/) para controle do fluxo de perguntas, progresso da loja e pontuação do usuário.
- **Banco de Dados & Autenticação (BaaS):** [Supabase](https://supabase.com/). O projeto utiliza um esquema robusto em PostgreSQL que abriga tabelas interligadas para Níveis, Perguntas e Progresso de Usuário, protegido por Políticas de Segurança (RLS).

---

## 🚀 Como rodar o projeto localmente

Se você deseja contribuir ou apenas rodar o jogo na sua máquina, siga os passos abaixo:

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado.
Tenha certeza de que suas chaves do Supabase estão configuradas no arquivo `.env`.

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
