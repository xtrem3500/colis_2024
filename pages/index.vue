<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-paypal-big font-bold text-paypal-dark-blue mb-8">
      Suivi de Colis
    </h2>

    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <TrackingForm @track="handleTrackpackageInfo" :loading="loading" />
    </div>

    <div
      v-if="error"
      class="bg-red-50 border border-red-200 rounded-lg p-4 mb-8"
    >
      <p class="text-red-800">{{ error }}</p>
    </div>

    <packageInfoStatus
      v-if="trackingResult"
      :packageInfo="trackingResult.packageInfo"
      :relay-point="trackingResult.relayPoint"
    />
  </div>
</template>

<script setup lang="ts">
import type { packageInfo, RelayPoint } from "~/types";

const { trackpackageInfo } = usepackageInfos();

const loading = ref(false);
const error = ref<string | null>(null);
const trackingResult = ref<{
  packageInfo: packageInfo;
  relayPoint: RelayPoint | null;
} | null>(null);

const handleTrackpackageInfo = async (data: {
  phone: string;
  reference: string;
}) => {
  loading.value = true;
  error.value = null;
  trackingResult.value = null;

  try {
    trackingResult.value = await trackpackageInfo(data.phone, data.reference);
    if (!trackingResult.value.packageInfo) {
      error.value = "Aucun colis trouvé avec ces informations";
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Une erreur est survenue";
  } finally {
    loading.value = false;
  }
};
</script>
