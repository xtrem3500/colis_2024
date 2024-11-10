import { defineStore } from "pinia";
// import { toast } from "vue3-toastify"; // Pour afficher des notifications
import { useAxios } from "../composables/useAxios"; // Importation du hook useAxios
import type { LocationQueryValue } from "vue-router";

interface User {
  name: string;
  phoneNumber: string;
  // Ajoute d'autres propriétés si nécessaire
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null, // user peut être null ou un objet de type User
    loading: false,
  }),
  actions: {
    // Fonction pour afficher un toast (succès ou erreur)
    showToast(
      type: "success" | "error",
      message: string,
      duration: number = 3001
    ) {
      const toastOptions = {
        position: "top-right",
        autoClose: duration,
      };
      if (type === "success") {
        console.log(message);
      } else if (type === "error") {
        console.log(message);
      }
    },
    // Dans stores/auth.ts
    async resetPassword(
      token: string | LocationQueryValue[],
      newPassword: string
    ) {
      try {
        const response = await useAxios("/auth/reset-password", {
          method: "POST",
          data: { token, newPassword },
        });
        return response.data;
      } catch (error) {
        console.error(
          "Erreur lors de la réinitialisation du mot de passe :",
          error
        );
        throw error;
      }
    },

    // Fonction de login avec appel à l'API
    async login(phoneNumber: string, password: string) {
      try {
        // Formatage du code pays et du numéro de téléphone

        const formattedPhoneNumber = phoneNumber.replace(/[^\d]/g, ""); // Retirer tous les caractères non numériques

        // Concatenation du code pays et du numéro
        const fullPhoneNumber = `+${formattedPhoneNumber}`;
        const adminPassword = password;
        // Vérifiez le formatage avant l'envoi
        console.log("Envoi des données avec :", fullPhoneNumber, password);
        console.log(
          "Formatted phone number before sending to API:",
          fullPhoneNumber,
          adminPassword
        );

        // Appel à l'API pour vérifier les informations d'identification
        const response = await useAxios("auth/login", {
          method: "POST",
          data: {
            fullPhoneNumber, // Utilisation du numéro complet
            adminPassword,
          },
        });

        if (response.success) {
          this.user = response.user;
          this.showToast("success", "Connexion réussie !");
          return response;
        } else {
          this.showToast(
            "error",
            response.message || "Erreur lors de la connexion."
          );
          throw new Error(response.message);
        }
      } catch (error) {
        console.error("Échec de connexion :", error);
        throw new Error("Échec de connexion");
      }
    },
    // Fonction de logout
    logout() {
      this.user = null; // Réinitialiser l'utilisateur dans le store
      this.showToast("success", "Déconnexion réussie !");
      useAxios("/logout", { method: "POST" }).catch(() => {
        console.error("Erreur lors de la déconnexion côté serveur.");
      });
    },
  },
});
