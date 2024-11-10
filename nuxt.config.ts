// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true }, // Activer les outils de développement

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "ToastContainer",
    },
  },

  plugins: ["~/plugins/font-awesome.js"],

  // Correction : CSS combiné dans un tableau
  css: [
    "@fortawesome/fontawesome-free/css/all.css",
    "~/assets/css/tailwind.css",
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@unocss/nuxt",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
  ],

  colorMode: {
    classSuffix: "",
  },

  googleFonts: {
    families: {
      Roboto: [400, 500, 600, 700],
    },
    display: "swap",
  },

  app: {
    head: {
      title: "Gogo Express 2.0",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Service de gestion de colis import-export à Abidjan",
        },
      ],
    },
  },

  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI, // La chaîne de connexion MongoDB
    jwtSecret: process.env.JWT_SECRET, // Le secret pour JWT
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    public: {
      APP_URL: process.env.APP_URL || "/api/", // Utilisation flexible
    },
  },
});
