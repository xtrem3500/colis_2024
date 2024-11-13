// stores/auth.js
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
  }),
  actions: {
    // Action pour définir l'utilisateur dans le store
    setUser(user) {
      this.user = user;
    },
    // Action pour se connecter
    async login(phoneNumber, password) {
      try {
        this.loading = true;
        const response = await axios.post("/api/auth/login", {
          phoneNumber,
          password,
        });

        if (response.status === 200) {
          this.setUser(response.data.user); // Mettre l'utilisateur dans le store
        }
      } catch (error) {
        console.error("Erreur de connexion", error);
      } finally {
        this.loading = false;
      }
    },

    // Action pour se déconnecter
    logout() {
      this.user = null; // Réinitialiser l'utilisateur
    },
  },
});
