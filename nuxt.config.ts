// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Duck nuxt starter',
      link: [{ rel: 'icon', type: 'image/jpeg', href: '~public/favicon.ico' }],
    },
  },
  build: {
    transpile: [
      'trpc-nuxt',
    ],
  },
  devtools: {
    enabled: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
    ],
  },
  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-15',
})
