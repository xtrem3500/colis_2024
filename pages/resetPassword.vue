<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth"; // Importation du store Pinia
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// Références pour les variables
const route = useRoute();
const token = ref(route.query.token || "");
const newPassword = ref("");
const confirmPassword = ref("");
const message = ref("");
const loading = ref(false);

// Récupération de la fonction de réinitialisation
const authStore = useAuthStore();

// Handler pour la réinitialisation du mot de passe
const handleresetPassword = async () => {
  loading.value = true;
  message.value = ""; // Réinitialiser les messages d'erreur

  // Vérification des mots de passe
  if (newPassword.value !== confirmPassword.value) {
    message.value = "Les mots de passe ne correspondent pas.";
    loading.value = false;
    return;
  }

  try {
    const response = await authStore.resetPassword(
      token.value,
      newPassword.value
    );
    toast.success("Mot de passe réinitialisé avec succès !");
    message.value = response.message;
  } catch (error) {
    toast.error("Erreur lors de la réinitialisation du mot de passe.");
    message.value = "Erreur lors de la réinitialisation du mot de passe.";
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
