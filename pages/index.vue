<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-paypal-big font-bold text-paypal-dark-blue mb-8">
      Suivi de Colis
    </h2>

    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <!-- Formulaire de suivi -->
      <TrackingForm @track="handleTrackpackageInfo" :loading="loading" />
    </div>

    <!-- Affichage des erreurs -->
    <div
      v-if="error"
      class="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
    >
      <p class="text-red-800">{{ error }}</p>
    </div>

    <!-- Affichage des informations du colis -->
    <packageInfoStatus
      v-if="trackingResult"
      :packageInfo="trackingResult.packageInfo"
      :relayPoint="trackingResult.relayPoint"
    />
  </div>
</template>

<script>
import { ref } from "vue";
// Importation de la fonction pour récupérer les informations de suivi
const { trackpackageInfo } = usepackageInfos();

export default {
  setup() {
    const loading = ref(false); // Indicateur de chargement
    const error = ref(null); // Gestion des erreurs
    const trackingResult = ref(null); // Résultats du suivi

    // Fonction de suivi des colis
    const handleTrackpackageInfo = async (data) => {
      loading.value = true; // Démarrer le chargement
      error.value = null; // Réinitialiser l'erreur
      trackingResult.value = null; // Réinitialiser les résultats du suivi

      try {
        // Appel à la fonction de suivi pour obtenir les résultats
        trackingResult.value = await trackpackageInfo(
          data.phone,
          data.reference
        );

        // Vérification si le colis est trouvé
        if (!trackingResult.value.packageInfo) {
          error.value = "Aucun colis trouvé avec ces informations"; // Message d'erreur si aucun colis trouvé
        }
      } catch (e) {
        // Gérer les erreurs si l'appel API échoue
        error.value = e.message || "Une erreur est survenue";
      } finally {
        loading.value = false; // Fin du chargement
      }
    };

    return {
      loading,
      error,
      trackingResult,
      handleTrackpackageInfo,
    };
  },
};
</script>

<style scoped>
/* Personnalisation des styles pour les éléments de suivi de colis */
.max-w-4xl {
  max-width: 800px;
}

.text-paypal-dark-blue {
  color: #004d9f; /* Remplacez cette couleur par celle de votre projet */
}

.bg-red-50 {
  background-color: #fef2f2;
}

.border-red-200 {
  border-color: #fecaca;
}

.text-red-800 {
  color: #b91c1c;
}
</style>
