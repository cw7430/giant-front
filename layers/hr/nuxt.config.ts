// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['../base'],

  components: [
    {
      path: '~~/layers/hr/app/components',
      pathPrefix: false,
    },
  ],
});
