<template>
  <!-- Section de l'interface utilisateur -->
  <div class="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
      <!-- Logo et titre principal -->
      <div class="flex flex-col items-center">
        <img src="../assets/logo.png" alt="Logo" class="h-20 mb-4" />
        <h2 class="text-red-900 text-center text-3xl font-extrabold">
          Gogo Export 2.0
        </h2>
      </div>
      <!-- Titre de la page de connexion -->
      <div>
        <h2 class="text-[#0070BA] text-center text-2xl font-bold">
          Admin Connexion
        </h2>
      </div>
      <!-- Formulaire de connexion -->
      <form
        class="mt-8 space-y-6"
        id="login"
        name="login"
        @submit.prevent="handleLogin"
      >
        <!-- Message d'erreur affiché si la connexion échoue -->
        <div v-if="error" class="text-[#FFD700] text-center mb-4">
          {{ error }}
        </div>
        <!-- Champs de saisie du numéro de téléphone et du mot de passe -->
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Sélection du code pays et saisie du numéro de téléphone -->
          <div class="flex items-center space-x-2">
            <select
              v-model="countryCode"
              class="w-16 h-10 bg-gray-200 rounded-md border border-gray-300"
            >
              <option v-for="code in countryCodes" :key="code" :value="code">
                {{ code }}
              </option>
            </select>
            <input
              id="phoneNumber"
              v-model="phoneNumber"
              type="tel"
              @input="formatPhoneNumber"
              required
              class="input flex-1"
              placeholder="Numéro de téléphone"
            />
          </div>

          <!-- Message d'erreur de validation du téléphone -->
          <p v-if="phoneError" class="text-[#FFD700] text-sm">
            {{ phoneError }}
          </p>

          <!-- Champ du mot de passe avec icône pour afficher/cacher -->
          <div class="relative">
            <label for="password" class="sr-only">Mot de passe</label>
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="input w-full"
              placeholder="Mot de passe"
            />
            <font-awesome-icon
              :icon="[showPassword ? 'fas/eye-slash' : 'fas/eye']"
              class="absolute right-3 top-3 text-gray-500 cursor-pointer"
              @click="togglePasswordVisibility"
            />
          </div>
        </div>

        <!-- Lien pour récupérer le mot de passe oublié -->
        <div class="flex items-center justify-between">
          <div class="text-sm">
            <NuxtLink
              to="/sendPhoneNumber"
              class="text-[#0070BA] hover:text-[#005a8f]"
            >
              Mot de passe oublié ?
            </NuxtLink>
          </div>
        </div>

        <!-- Bouton de connexion -->
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#0070BA] hover:bg-[#005a8f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0070BA]"
          >
            Connexion
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "nuxt/app";
import { useAuthStore } from "~/stores/auth"; // Importation du store d'authentification
import parsePhoneNumberFromString from "libphonenumber-js"; // Utilitaire de validation de téléphone
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "axios";

// Déclaration des variables
const authStore = useAuthStore();
const router = useRouter();

const countryCodes = ref(["+225", "+33", "+1", "+44"]); // Options de codes pays
const countryCode = ref("+225");
const phoneNumber = ref("");
const password = ref("");
const loading = ref(false);
const error = ref(""); // Message d'erreur général
const phoneError = ref(""); // Message d'erreur spécifique au numéro de téléphone
const showPassword = ref(false); // Indicateur pour afficher/cacher le mot de passe

// Fonction pour basculer la visibilité du mot de passe
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

// Fonction pour formater le numéro de téléphone à l'affichage
const formatPhoneNumber = () => {
  phoneNumber.value = phoneNumber.value
    .replace(/\D/g, "")
    .replace(/(\d{2})(?=\d)/g, "$1 ");
};

// Fonction de validation du numéro de téléphone
const validatePhoneNumber = () => {
  const fullNumber = `${countryCode.value}${phoneNumber.value.replace(
    /\s/g,
    ""
  )}`;
  const parsedNumber = parsePhoneNumberFromString(fullNumber);
  if (!parsedNumber?.isValid()) {
    phoneError.value = "Le numéro de téléphone n'est pas valide.";
    toast("Le numéro de téléphone n'est pas valide.");
    console.log("Numéro de téléphone invalide:", fullNumber);
    return false;
  }
  phoneError.value = "";
  return true;
};

// Fonction de validation du mot de passe
const validatePassword = () => {
  if (password.value.length < 8) {
    toast.error("Le mot de passe doit comporter au moins 8 caractères.");
    console.log("Mot de passe trop court:", password.value);
    return false;
  }
  return true;
};

// Formatage du numéro pour l'envoi à l'API
const formatPhoneNumberForApi = () => {
  const formattedCountryCode = countryCode.value.trim();
  const formattedPhoneNumber = phoneNumber.value.replace(/[^\d]/g, "");
  return `${formattedCountryCode}${formattedPhoneNumber}`;
};

// Fonction de gestion de la connexion
const handleLogin = async () => {
  // Valide le numéro de téléphone
  if (!validatePhoneNumber()) {
    toast.error("Numéro de téléphone invalide.");
    return;
  }

  // Valide le mot de passe
  if (!validatePassword()) {
    toast.error("Mot de passe invalide.");
    return;
  }

  // Formate le numéro pour l'API
  const formattedPhoneNumber = formatPhoneNumberForApi();
  console.log("Numéro formaté pour l'API:", formattedPhoneNumber);

  try {
    loading.value = true;
    error.value = ""; // Réinitialisation de l'erreur

    console.log("Tentative de connexion avec :", {
      phoneNumber: formattedPhoneNumber,
      password: password.value,
    });

    // Envoi de la requête à l'API de connexion
    const response = await axios.post("/api/auth/login", {
      phoneNumber: formattedPhoneNumber,
      password: password.value,
    });

    // Si la connexion réussit, redirige vers la page admin
    if (response.data.success) {
      toast.success("Connexion réussie !");
      router.push("/admin");
    } else {
      error.value =
        response.data.error || "Numéro de téléphone ou mot de passe incorrect.";
      toast.error(error.value);
      console.log("Erreur de l'API:", error.value);
    }
  } catch (err) {
    // Gestion d'erreur en cas d'échec de la requête
    console.error("Erreur lors de la connexion :", err);
    error.value = "Connexion échouée. Veuillez vérifier vos informations.";
    toast.error(error.value);
  } finally {
    loading.value = false; // Réinitialise l'indicateur de chargement
  }
};
</script>

<style scoped>
.input {
  appearance: none;
  border-radius: 0.375rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  color: #111827;
  transition: border-color 0.3s;
}

.input::placeholder {
  color: #6b7280;
}

.input:focus {
  border-color: #0070ba;
  outline-color: #0070ba;
}

.font-awesome-icon {
  cursor: pointer;
}
</style>
