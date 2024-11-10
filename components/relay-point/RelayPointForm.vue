<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <BaseInput
      v-model="form.name"
      label="Nom"
      required
      placeholder="Nom du point relais"
    />
    
    <BaseInput
      v-model="form.address"
      label="Adresse"
      required
      placeholder="Adresse complète"
    />
    
    <div class="grid grid-cols-2 gap-4">
      <BaseInput
        v-model="form.city"
        label="Ville"
        required
      />
      
      <BaseInput
        v-model="form.country"
        label="Pays"
        required
      />
    </div>
    
    <BaseInput
      v-model="form.managerId"
      label="ID du responsable"
      required
      placeholder="ID du gestionnaire du point relais"
    />
    
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Début de location
        </label>
        <input
          v-model="form.rentPeriod.start"
          type="date"
          required
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-paypal-light-blue focus:ring-paypal-light-blue"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Fin de location
        </label>
        <input
          v-model="form.rentPeriod.end"
          type="date"
          required
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-paypal-light-blue focus:ring-paypal-light-blue"
        />
      </div>
    </div>
    
    <div class="flex items-center">
      <input
        v-model="form.isActive"
        type="checkbox"
        class="h-4 w-4 text-paypal-light-blue focus:ring-paypal-light-blue border-gray-300 rounded"
      />
      <label class="ml-2 block text-sm text-gray-700">
        Point relais actif
      </label>
    </div>
    
    <BaseButton type="submit" variant="primary" full>
      Créer le point relais
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import type { RelayPoint } from '~/types'

const emit = defineEmits<{
  (e: 'submit', data: Omit<RelayPoint, 'id'>): void
}>()

const form = ref({
  name: '',
  address: '',
  city: '',
  country: '',
  managerId: '',
  isActive: true,
  rentPeriod: {
    start: '',
    end: ''
  }
})

const handleSubmit = () => {
  emit('submit', {
    ...form.value,
    rentPeriod: {
      start: new Date(form.value.rentPeriod.start),
      end: new Date(form.value.rentPeriod.end)
    }
  })
}
</script>