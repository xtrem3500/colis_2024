import type { Config } from "tailwindcss";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.ts", // Assurez-vous que Nuxt 3 est pris en compte
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "paypal-blue": "#003087",
        "paypal-dark-blue": "#001C64",
        "paypal-light-blue": "#0070E0",
        "paypal-accent": "#169BD7",
      },
      fontFamily: {
        "paypal-big": ["PayPal Sans Big", "sans-serif"],
        "paypal-small": ["PayPal Sans Small", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
