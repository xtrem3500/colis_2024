<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
      <!-- Logo et Titre -->
      <div class="flex flex-col items-center">
        <img src="../assets/logo.png" alt="Logo" class="h-20 mb-4" />
        <h2 class="text-red-700 text-center text-3xl font-extrabold">
          Gogo Export 2.0
        </h2>
      </div>

      <h2 class="text-[#0070BA] text-center text-2xl font-semibold">
        Envoyer le lien de réinitialisation
      </h2>

      <!-- Formulaire de réinitialisation -->
      <form @submit.prevent="sendPhoneNumber" class="space-y-4">
        <!-- Champ de saisie du Numéro de téléphone -->
        <div class="flex items-center space-x-2">
          <select
            v-model="countryCode"
            class="w-16 h-10 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option v-for="code in countryCodes" :key="code" :value="code">
              {{ code }}
            </option>
          </select>
          <input
            v-model="phoneNumber"
            type="tel"
            @input="formatPhoneNumber"
            required
            class="appearance-none rounded-md flex-1 py-3 px-4 border border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="WhatsApp"
          />
        </div>

        <!-- Affichage des erreurs de numéro -->
        <p v-if="phoneError" class="text-red-500 text-sm">{{ phoneError }}</p>

        <!-- Bouton pour envoyer le numéro -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-4 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Envoyer le lien de réinitialisation
        </button>
      </form>

      <!-- Lien retour à l'accueil -->
      <div class="text-sm text-center mt-4">
        <NuxtLink
          to="/"
          class="text-green-600 hover:text-green-400 font-semibold"
        >
        </NuxtLink>
      </div>

      <!-- Notifications Toast -->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "#imports";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const countryCodes = ref(["+225", "+33", "+1", "+44"]);
const countryCode = ref("+225");
const phoneNumber = ref("");
const phoneError = ref("");
const loading = ref(false);
const router = useRouter();
// const toast = useToast();

const formatPhoneNumber = () => {
  if (phoneNumber.value.length < 9 || phoneNumber.value.length > 15) {
    phoneError.value = "Numéro de téléphone invalide";
  } else {
    phoneError.value = "";
  }
};

const sendPhoneNumber = async () => {
  loading.value = true;
  phoneError.value = ""; // Reset phone error before sending request

  try {
    const response = await $fetch("/api/auth/send-phonenumber", {
      method: "POST",
      body: { phoneNumber: phoneNumber.value },
    });

    toast.success("Lien de réinitialisation envoyé avec succès !");
    router.push("/resetpassword"); // Redirige vers la page de réinitialisation
  } catch (error) {
    toast.error("Erreur lors de l'envoi du lien de réinitialisation.");
    console.error(error);
    router.push("/resetpassword"); // Redirige vers la page de réinitialisation
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.bg-gray-100 {
  background-color: #f5f7fa; /* Couleur d'arrière-plan douce */
}

.bg-cyan-600 {
  background-color: #06b6d4; /* Couleur cyan */
}

.text-cyan-700 {
  color: #06b6d4;
}

.text-red-500 {
  color: #f87171;
}

.text-green-600 {
  color: #16a34a;
}

.text-green-400 {
  color: #34d399;
}

.input {
  appearance: none;
  border-radius: 0.375rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  color: #111827;
  outline: none;
  transition: border-color 0.3s;
}

.input::placeholder {
  color: #6b7280;
}

.input:focus {
  border-color: #06b6d4;
  outline-color: #06b6d4;
}
</style>
