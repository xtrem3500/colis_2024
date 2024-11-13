<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-paypal-dark-blue">
        Points Relais
      </h2>
      <NuxtLink to="/admin/relay-points/new">
        <BaseButton variant="primary">
          Nouveau Point Relais
        </BaseButton>
      </NuxtLink>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="point in relayPoints"
        :key="point.id"
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-paypal-dark-blue">
              {{ point.name }}
            </h3>
            <span
              :class="[
                'px-2 py-1 text-xs font-medium rounded-full',
                point.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              ]"
            >
              {{ point.isActive ? 'Actif' : 'Inactif' }}
            </span>
          </div>
          
          <div class="space-y-2 text-sm text-gray-600">
            <p>{{ point.address }}</p>
            <p>{{ point.city }}, {{ point.country }}</p>
          </div>
          
          <div class="mt-4 pt-4 border-t border-gray-100">
            <p class="text-sm text-gray-500">Période de location:</p>
            <p class="text-sm">
              {{ new Date(point.rentPeriod.start).toLocaleDateString() }} - 
              {{ new Date(point.rentPeriod.end).toLocaleDateString() }}
            </p>
          </div>
          
          <div class="mt-6 flex space-x-3">
            <NuxtLink :to="`/admin/relay-points/${point.id}`">
              <BaseButton variant="secondary">
                Modifier
              </BaseButton>
            </NuxtLink>
            <BaseButton
              variant="secondary"
              @click="toggleRelayPointStatus(point)"
            >
              {{ point.isActive ? 'Désactiver' : 'Activer' }}
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify/index';
import type { RelayPoint } from '~/types';

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

// Mock data - Replace with API calls
const relayPoints = ref<RelayPoint[]>([
  {
    id: '1',
    name: 'Paris Centre',
    address: '15 Rue de la Paix',
    city: 'Paris',
    country: 'France',
    managerId: '1',
    isActive: true,
    rentPeriod: {
      start: new Date('2024-01-01'),
      end: new Date('2024-12-31')
    }
  },
  {
    id: '2',
    name: 'Lyon Part-Dieu',
    address: '23 Boulevard Vivier Merle',
    city: 'Lyon',
    country: 'France',
    managerId: '2',
    isActive: true,
    rentPeriod: {
      start: new Date('2024-01-01'),
      end: new Date('2024-12-31')
    }
  }
])

const toggleRelayPointStatus = async (point: RelayPoint) => {
  try {
    // TODO: Implement API call
    point.isActive = !point.isActive
    toast.success(`Point relais ${point.isActive ? 'activé' : 'désactivé'}`)
  } catch (error) {
    toast.error('Une erreur est survenue')
  }
}
</script>