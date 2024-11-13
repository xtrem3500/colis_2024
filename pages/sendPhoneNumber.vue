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
        Réinitialisation
      </h2>

      <!-- Formulaire de réinitialisation -->
      <form @submit.prevent="sendResetRequest" class="space-y-4">
        <!-- Choix du mode de réinitialisation (par téléphone ou email) -->
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Choisir méthode</label
          >
          <select
            v-model="resetMethod"
            class="w-full h-10 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          >
            <option value="phone">Par téléphone</option>
            <option value="email">Par email</option>
          </select>
        </div>

        <!-- Champ de saisie du numéro de téléphone -->
        <div v-if="resetMethod === 'phone'" class="flex items-center space-x-2">
          <select
            v-model="countryCode"
            class="w-16 h-10 bg-gray-200 rounded-md border border-gray-300"
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
            placeholder="Numéro de téléphone"
          />
        </div>

        <!-- Champ de saisie de l'email -->
        <div v-if="resetMethod === 'email'" class="flex items-center space-x-2">
          <input
            v-model="email"
            type="email"
            required
            class="appearance-none rounded-md flex-1 py-3 px-4 border border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Votre email"
          />
        </div>

        <!-- Erreurs -->
        <p v-if="errorMessage" class="text-red-500 text-sm">
          {{ errorMessage }}
        </p>

        <!-- Bouton pour envoyer le lien -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-4 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Envoyer le lien de réinitialisation
        </button>
      </form>

      <div class="text-sm text-center mt-4">
        <NuxtLink
          to="/login"
          class="text-green-600 hover:text-green-400 font-semibold"
        >
          Se connecter ?
        </NuxtLink>
      </div>
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
const email = ref("");
const resetMethod = ref("phone");
const errorMessage = ref("");
const loading = ref(false);
const router = useRouter();

const formatPhoneNumber = () => {
  if (phoneNumber.value.length < 9 || phoneNumber.value.length > 15) {
    errorMessage.value = "Numéro de téléphone invalide";
  } else {
    errorMessage.value = "";
  }
};

const sendResetRequest = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const body =
      resetMethod.value === "phone"
        ? { phoneNumber: phoneNumber.value }
        : { email: email.value };

    const response = await $fetch("/api/auth/send-reset-link", {
      method: "POST",
      body,
    });

    toast.success("Lien de réinitialisation envoyé !");
    router.push("/resetpassword"); // Redirige vers la page de réinitialisation
  } catch (error) {
    toast.error("Erreur lors de l'envoi du lien de réinitialisation.");
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>
