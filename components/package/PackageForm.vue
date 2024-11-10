<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <BaseInput
      v-model="form.reference"
      label="Référence"
      required
      placeholder="REF-2024-XXXX"
    />

    <div class="grid grid-cols-2 gap-4">
      <BaseInput
        v-model="form.weight"
        type="number"
        step="0.1"
        label="Poids (kg)"
        required
      />

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Statut
        </label>
        <select
          v-model="form.status"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-paypal-light-blue focus:ring-paypal-light-blue"
          required
        >
          <option value="pending">En attente</option>
          <option value="in_transit">En transit</option>
          <option value="at_relay">Au point relais</option>
          <option value="delivered">Livré</option>
        </select>
      </div>
    </div>

    <BaseInput
      v-model="form.description"
      label="Description"
      required
      placeholder="Description du contenu"
    />

    <div class="grid grid-cols-2 gap-4">
      <BaseInput v-model="form.senderId" label="ID Expéditeur" required />

      <BaseInput v-model="form.receiverId" label="ID Destinataire" required />
    </div>

    <BaseInput v-model="form.relayPointId" label="ID Point Relais" />

    <BaseButton type="submit" variant="primary" full>
      Créer le colis
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import type { packageInfo } from "~/types";

const emit = defineEmits<{
  (
    e: "submit",
    data: Omit<packageInfo, "id" | "createdAt" | "updatedAt">
  ): void;
}>();

const form = ref({
  reference: "",
  status: "pending" as packageInfo["status"],
  senderId: "",
  receiverId: "",
  relayPointId: "",
  weight: 0,
  description: "",
});

const handleSubmit = () => {
  emit("submit", {
    ...form.value,
    weight: Number(form.value.weight),
  });
};
</script>
