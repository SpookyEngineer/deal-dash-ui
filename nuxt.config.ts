// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/ui",
    /* The above also includes: 
    @nuxt/icon
    @nuxtjs/tailwindcss
    @nuxtjs/color-mode
    */
    "@morev/vue-transitions/nuxt",
  ],

  colorMode: {
    preference: "dark",
    fallback: "light",
  },
});
