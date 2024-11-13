<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
      <div class="flex flex-col items-center">
        <img src="../assets/logo.png" alt="Logo" class="h-20 mb-4" />
        <h2 class="text-red-900 text-center text-3xl font-extrabold">
          Gogo Export 2.0
        </h2>
      </div>
      <h2 class="text-[#0070BA] text-center text-2xl font-bold">
        Admin Connexion
      </h2>
      <form class="mt-8 space-y-6" id="login" @submit.prevent="handleLogin">
        <div v-if="error" class="text-[#FFD700] text-center mb-4">
          {{ error }}
        </div>
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Zone de saisie pour le numéro de téléphone -->
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
          <p v-if="phoneError" class="text-[#FFD700] text-sm">
            {{ phoneError }}
          </p>

          <!-- Zone de saisie pour le mot de passe avec bouton pour afficher/masquer -->
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              class="input w-full"
              placeholder="Mot de passe"
            />
            <font-awesome-icon
              :icon="showPassword ? 'faEyeSlash' : 'faEye'"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              @click="togglePasswordVisibility"
            />
          </div>
        </div>

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
import { useAuthStore } from "../stores/auth";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const countryCodes = ref(["+225", "+33", "+1", "+44"]);
const countryCode = ref("+225");
const phoneNumber = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");
const phoneError = ref("");
const showPassword = ref(false);

const router = useRouter();
const authStore = useAuthStore();

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

function formatPhoneNumber() {
  phoneNumber.value = phoneNumber.value
    .replace(/\D/g, "")
    .replace(/(\d{2})(?=\d)/g, "$1 ");
}

const handleLogin = async () => {
  loading.value = true;
  try {
    await authStore.login(phoneNumber.value, password.value);
    // Affichage du toast après la connexion réussie
    if (authStore.user) {
      showToast("Connexion réussie", "success");
      router.push(`/dashboard`);
    }
  } catch (error) {
    console.error("Erreur de connexion", error);
    showToast("Erreur de connexion", "error");
  } finally {
    loading.value = false;
  }
};

// Exportation des valeurs utilisées dans le template
defineExpose({
  FontAwesomeIcon,
  countryCode,
  phoneNumber,
  password,
  loading,
  error,
  phoneError,
  showPassword,
  togglePasswordVisibility,
  formatPhoneNumber,
  handleLogin,
});

function showToast(arg0: string, arg1: string) {
  throw new Error("Function not implemented.");
}
</script>

<style scoped>
/* Votre style reste inchangé */
</style>

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
</style>
