<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Référence
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Statut
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Point relais
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Poids
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Date
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="pkg in packageInfos" :key="pkg.id">
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="text-sm font-medium text-gray-900">
              {{ pkg.reference }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <packageInfoStatusBadge :status="pkg.status" />
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ pkg.relayPointId || "-" }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ pkg.weight }} kg
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ new Date(pkg.createdAt).toLocaleDateString() }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <select
              :value="pkg.status"
              @change="
                $emit(
                  'updateStatus',
                  pkg.id,
                  ($event.target as HTMLSelectElement).value
                )
              "
              class="rounded-md border-gray-300 text-sm focus:border-paypal-light-blue focus:ring-paypal-light-blue"
            >
              <option value="pending">En attente</option>
              <option value="in_transit">En transit</option>
              <option value="at_relay">Au point relais</option>
              <option value="delivered">Livré</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { packageInfo } from "~/types";

defineProps<{
  packageInfos: packageInfo[];
}>();

defineEmits<{
  (e: "updateStatus", id: string, status: packageInfo["status"]): void;
}>();
</script>
