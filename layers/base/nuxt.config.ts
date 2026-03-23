// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  typescript: {
    typeCheck: true,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    '@bootstrap-vue-next/nuxt',
    'dayjs-nuxt',
  ],

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '~~/layers/base/app/assets/css/globals.css',
  ],

  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'Noto Sans KR', provider: 'google' },
    ],
  },

  components: [
    {
      path: '~~/layers/base/app/components',
      pathPrefix: false,
    },
  ],

  app: {
    head: {
      title: 'Giant',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      noscript: [{ textContent: '자바스크립트를 활성화 시켜주세요' }],
      htmlAttrs: {
        lang: 'ko',
      },
    },
  },
});
