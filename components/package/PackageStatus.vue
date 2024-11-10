<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-xl font-bold text-paypal-dark-blue mb-4">État du colis</h3>
    <div v-if="packageInfo" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-gray-500">Référence</p>
          <p class="font-medium">{{ packageInfo.reference }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Statut</p>
          <p class="font-medium">
            <span
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                statusClasses[packageInfo.status],
              ]"
            >
              {{ statusLabels[packageInfo.status] }}
            </span>
          </p>
        </div>
      </div>
      <div>
        <p class="text-sm text-gray-500">Description</p>
        <p class="font-medium">{{ packageInfo.description }}</p>
      </div>
      <div v-if="packageInfo.relayPointId">
        <p class="text-sm text-gray-500">Point relais</p>
        <p class="font-medium">{{ relayPoint?.name }}</p>
        <p class="text-sm text-gray-600">{{ relayPoint?.address }}</p>
      </div>
    </div>
    <div v-else class="text-center text-gray-500">
      Aucune information disponible
    </div>
  </div>
</template>

<script setup lang="ts">
import type { packageInfo, RelayPoint } from "~/types";

const props = defineProps<{
  packageInfo?: packageInfo;
  relayPoint?: RelayPoint;
}>();

const statusLabels = {
  pending: "En attente",
  in_transit: "En transit",
  at_relay: "Au point relais",
  delivered: "Livré",
};

const statusClasses = {
  pending: "bg-yellow-100 text-yellow-800",
  in_transit: "bg-blue-100 text-blue-800",
  at_relay: "bg-green-100 text-green-800",
  delivered: "bg-gray-100 text-gray-800",
};
</script>
