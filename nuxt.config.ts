// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/fonts'
  ],
  fonts: {
    provider: 'google', 

    families: [
      { name: 'Roboto' },
      { name: 'Lato', weights: ['400', '700'], styles: ['italic', 'normal'] },
      { name: 'Inter' },
      { name: 'Montserrat' },
      { name: 'Merriweather', provider: 'google' },
      { name: 'Fira Code', provider: 'google' },

    ]
  },
  app: {
    head: {
      title: 'Johny\'s Portfolio',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/cube-icon.svg' }]
    }
  }
})