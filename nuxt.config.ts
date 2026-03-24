// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['./layers/base', './layers/auth', './layers/home', './layers/hr'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
});
