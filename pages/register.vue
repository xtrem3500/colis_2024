<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[#F5F7FA] py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
      <div class="flex flex-col items-center">
        <img src="../assets/logo.png" alt="Logo" class="h-20 mb-4" />
        <h2 class="text-red-700 text-center text-3xl font-extrabold">
          Gogo Export 2.0
        </h2>
      </div>

      <h2 class="text-[#0070BA] text-center text-2xl font-semibold">
        Admin : Créer un compte
      </h2>

      <form @submit.prevent="register" class="space-y-4">
        <!-- Prénom -->
        <input
          v-model="firstName"
          type="text"
          placeholder="Prénom"
          class="appearance-none rounded-md w-full py-3 px-4 border border-gray-300 focus:outline-none focus:ring-[#0070BA] focus:border-[#0070BA]"
          required
        />
        <p v-if="!firstName" class="text-red-500 text-sm">
          Le prénom est requis.
        </p>

        <!-- Nom -->
        <input
          v-model="lastName"
          type="text"
          placeholder="Nom"
          class="appearance-none rounded-md w-full py-3 px-4 border border-gray-300 focus:outline-none focus:ring-[#0070BA] focus:border-[#0070BA]"
          required
        />
        <p v-if="!lastName" class="text-red-500 text-sm">Le nom est requis.</p>

        <!-- Code de pays et numéro de téléphone -->
        <div class="flex items-center space-x-2">
          <select
            v-model="countryCode"
            class="w-20 h-12 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-[#0070BA] focus:border-[#0070BA]"
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
            class="appearance-none rounded-md flex-1 py-3 px-4 border border-gray-300 focus:outline-none focus:ring-[#0070BA] focus:border-[#0070BA]"
            placeholder="Numéro de téléphone"
          />
        </div>

        <p v-if="phoneError" class="text-red-500 text-sm">{{ phoneError }}</p>

        <!-- Sélection du rôle -->
        <select
          v-model="role"
          class="appearance-none rounded-md w-full py-3 px-4 border border-gray-300 bg-white focus:outline-none focus:ring-[#0070BA] focus:border-[#0070BA]"
          required
        >
          <option value="" disabled>Choisir un rôle</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <p v-if="!role" class="text-red-500 text-sm">Le rôle est requis.</p>

        <!-- Mot de passe -->
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Mot de passe"
            class="appearance-none rounded-md w-full py-3 px-4 border border-gray-300 focus:outline-none focus:ring-[#0070BA] focus:border-[#0070BA]"
            required
          />
          <button
            type="button"
            @click="togglePasswordVisibility"
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
          >
            <span v-if="showPassword">👁️</span>
            <span v-else>🙈</span>
          </button>
        </div>

        <!-- Confirmation mot de passe -->
        <input
          v-model="confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Confirmer mot de passe"
          class="appearance-none rounded-md w-full py-3 px-4 border border-gray-300 focus:outline-none focus:ring-[#0070BA] focus:border-[#0070BA]"
          required
        />
        <p v-if="password !== confirmPassword" class="text-red-500 text-sm">
          Les mots de passe ne correspondent pas.
        </p>

        <!-- Champ d'image de profil -->
        <input
          type="file"
          @change="handleFileUpload"
          class="appearance-none rounded-md w-full py-3 px-4 border border-gray-300 focus:outline-none focus:ring-[#0070BA] focus:border-[#0070BA]"
        />

        <!-- Aperçu de l'image sélectionnée -->
        <div v-if="profileImagePreview">
          <img
            :src="profileImagePreview"
            alt="Aperçu de l'image de profil"
            class="mt-4 w-32 h-32 object-cover rounded-full mx-auto"
          />
        </div>

        <!-- Bouton d'inscription -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-4 bg-[#0070BA] text-white rounded-md hover:bg-[#005a8f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0070BA]"
        >
          Créer un compte
        </button>

        <!-- Notifications -->
        <p v-if="notification" class="text-green-500 text-sm text-center">
          {{ notification }}
        </p>
        <p v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "#imports";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import parsePhoneNumberFromString from "libphonenumber-js";

const firstName = ref("");
const lastName = ref("");
const countryCode = ref("+225");
const phoneNumber = ref("");
const password = ref("");
const confirmPassword = ref("");
const role = ref(""); // Nouveau champ pour le rôle
const phoneError = ref("");
const loading = ref(false);
const notification = ref("");
const errorMessage = ref("");
const profileImage = ref(null);
const showPassword = ref(false);
const router = useRouter();

const countryCodes = ref(["+225", "+33", "+1", "+44", "+49"]);

const validatePhoneNumber = () => {
  const fullNumber = `${countryCode.value}${phoneNumber.value.replace(
    /\s/g,
    ""
  )}`;
  const parsedNumber = parsePhoneNumberFromString(fullNumber);
  if (!parsedNumber?.isValid()) {
    phoneError.value = "Numéro de téléphone invalide.";
    return false;
  }
  phoneError.value = "";
  return true;
};

const profileImagePreview = ref(null);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    profileImage.value = file;
    profileImagePreview.value = URL.createObjectURL(file);
  }
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const register = async () => {
  if (password.value !== confirmPassword.value) {
    toast.error("Les mots de passe ne correspondent pas.");
    return;
  }

  if (
    !firstName.value ||
    !lastName.value ||
    !role.value ||
    !phoneNumber.value
  ) {
    toast.error("Tous les champs sont requis.");
    return;
  }

  if (!validatePhoneNumber()) {
    return;
  }

  loading.value = true;
  const formData = new FormData();
  formData.append("firstName", firstName.value);
  formData.append("lastName", lastName.value);
  formData.append("countryCode", countryCode.value);
  formData.append("phoneNumber", phoneNumber.value);
  formData.append("password", password.value);
  formData.append("role", role.value); // Ajoutez le rôle ici

  if (profileImage.value) {
    formData.append("profileImage", profileImage.value);
  }

  try {
    const response = await $fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });

    if (response.success) {
      toast.success("Inscription réussie !");
      router.push("/login");
    } else {
      toast.error(response.error || "Erreur lors de l'inscription.");
    }
  } catch (error) {
    toast.error("Erreur de connexion au serveur.");
  } finally {
    loading.value = false;
  }
};
</script>
