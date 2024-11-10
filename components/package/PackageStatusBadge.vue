<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    :class="statusClasses[status]"
  >
    {{ statusLabels[status] }}
  </span>
</template>

<script setup lang="ts">
import type { packageInfo } from "~/types";

defineProps<{
  status: packageInfo["status"];
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
