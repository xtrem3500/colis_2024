<template>
  <div>
    <div class="flex items-center mb-8">
      <NuxtLink
        to="/admin/packageInfos"
        class="text-paypal-blue hover:text-paypal-dark-blue mr-4"
      >
        ← Retour
      </NuxtLink>
      <h2 class="text-2xl font-bold text-paypal-dark-blue">Nouveau Colis</h2>
    </div>

    <div class="max-w-2xl bg-white rounded-lg shadow p-6">
      <packageInfoForm @submit="createpackageInfo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from "vue3-toastify/index";
import type { packageInfo } from "~/types";

const router = useRouter();

const createpackageInfo = async (
  data: Omit<packageInfo, "id" | "createdAt" | "updatedAt">
) => {
  try {
    // TODO: Implement API call
    toast.success("Colis créé avec succès");
    router.push("/admin/packageInfos");
  } catch (error) {
    toast.error("Erreur lors de la création du colis");
  }
};
</script>
