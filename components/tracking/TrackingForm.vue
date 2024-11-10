<template>
  <div class="flex items-center justify-center bg-[#F5F7FA]">
    <div class="max-w-md w-full space-y-5 p-8 bg-white rounded-lg shadow-lg">
      <!-- Logo -->
      <div class="flex flex-col items-center">
        <img src="../../assets/logo.png" alt="Logo" class="h-20 mb-4" />
        <h2 class="text-red-900 text-center text-3xl font-extrabold">
          Gogo Export 2.0
        </h2>
      </div>

      <!-- Titre
      <div>
        <h2 class="text-red-700 text-center text-2xl font-extrabold">
          Suivi de colis
        </h2>
      </div> -->

      <!-- Formulaire -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Numéro de téléphone avec indicatif -->
        <div class="flex items-center space-x-2">
          <select
            v-model="form.countryCode"
            class="w-16 h-10 bg-gray-200 rounded-md border border-gray-300"
          >
            <option v-for="code in countryCodes" :key="code" :value="code">
              {{ code }}
            </option>
          </select>
          <BaseInput
            v-model="form.phone"
            label="Numéro de téléphone"
            type="tel"
            required
            placeholder="XX XX XX XX XX"
            :disabled="loading"
          />
        </div>

        <!-- Référence du colis -->
        <BaseInput
          v-model="form.reference"
          label="Référence du colis"
          required
          placeholder="Entrez la référence de votre colis"
          :disabled="loading"
        />

        <!-- Bouton de soumission -->
        <BaseButton type="submit" variant="primary" full :disabled="loading">
          {{ loading ? "Recherche en cours..." : "Suivre mon colis" }}
        </BaseButton>
      </form>

      <!-- Lien vers l'accueil -->
      <div class="text-sm text-center">
        <NuxtLink to="/" class="text-green-600 hover:text-green-400">
          Abonnez-vous pour la liste de tous vos transaction
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const form = ref({
  countryCode: "+225",
  phone: "",
  reference: "",
});

const countryCodes = ref(["+225", "+33", "+1", "+44"]);
const loading = ref(false);

const emit = defineEmits<{
  (e: "track", data: { phone: string; reference: string }): void;
}>();

const handleSubmit = () => {
  // Lancer l'événement avec les données du formulaire
  emit("track", {
    phone: form.value.phone,
    reference: form.value.reference,
  });
};
</script>

<style scoped>
/* Styles personnalisés pour le formulaire */
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
