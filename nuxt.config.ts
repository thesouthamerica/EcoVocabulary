export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt'
  ],
  supabase: {
    redirect: false,
    redirectOptions: {
      exclude: ['/*']
    }
  },
  css: ['~/assets/css/main.css'],
  nitro: {
    preset: 'cloudflare-pages'
  },
  app: {
    head: {
      title: 'Eco-Vocabulary',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
