<template>
  <div>
    <div class="flex items-center mb-8">
      <NuxtLink 
        to="/admin/relay-points"
        class="text-paypal-blue hover:text-paypal-dark-blue mr-4"
      >
        ← Retour
      </NuxtLink>
      <h2 class="text-2xl font-bold text-paypal-dark-blue">
        Nouveau Point Relais
      </h2>
    </div>

    <div class="max-w-2xl bg-white rounded-lg shadow p-6">
      <RelayPointForm @submit="createRelayPoint" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RelayPoint } from '~/types'

definePageMeta({
  layout: 'admin',
  middleware: ['auth']
})

const router = useRouter()

const createRelayPoint = async (data: Omit<RelayPoint, 'id'>) => {
  try {
    // TODO: Implement API call
    toast.success('Point relais créé avec succès')
    router.push('/admin/relay-points')
  } catch (error) {
    toast.error('Erreur lors de la création du point relais')
  }
}
</script>