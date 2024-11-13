<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-paypal-dark-blue">
        Gestion des Colis
      </h2>
      <NuxtLink to="/admin/packageInfos/new">
        <BaseButton variant="primary"> Nouveau Colis </BaseButton>
      </NuxtLink>
    </div>

    <div class="bg-white rounded-lg shadow">
      <packageInfoList
        :packageInfos="packageInfos"
        @update-status="updatepackageInfoStatus"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify/index";
import type { packageInfo } from "~/types";

// Mock data - Replace with API calls
const packageInfos = ref<packageInfo[]>([
  {
    id: "1",
    reference: "REF-2024-0001",
    status: "in_transit",
    senderId: "1",
    receiverId: "2",
    relayPointId: "1",
    weight: 2.5,
    description: "Vêtements et accessoires",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more mock packageInfos...
]);

const updatepackageInfoStatus = async (
  packageInfoId: string,
  status: packageInfo["status"]
) => {
  // TODO: Implement API call
  const pkg = packageInfos.value.find((p) => p.id === packageInfoId);
  if (pkg) {
    pkg.status = status;
    pkg.updatedAt = new Date();
    toast.success("Statut mis à jour");
  }
};
</script>
