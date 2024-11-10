<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <NuxtLink
            to="/admin"
            class="inline-flex items-center px-4 py-2 text-sm font-medium"
            :class="{ 'text-paypal-blue': route.path === '/admin' }"
          >
            Tableau de bord
          </NuxtLink>
          <NuxtLink
            to="/admin/packageInfos"
            class="inline-flex items-center px-4 py-2 text-sm font-medium"
            :class="{
              'text-paypal-blue': route.path === '/admin/packageInfos',
            }"
          >
            Colis
          </NuxtLink>
          <NuxtLink
            to="/admin/relay-points"
            class="inline-flex items-center px-4 py-2 text-sm font-medium"
            :class="{
              'text-paypal-blue': route.path === '/admin/relay-points',
            }"
          >
            Points relais
          </NuxtLink>
        </div>
        <div class="flex items-center">
          <span class="text-sm text-gray-500 mr-4">
            {{ auth.user?.name }}
          </span>
          <BaseButton @click="auth.logout" variant="secondary">
            Déconnexion
          </BaseButton>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();
const auth = useAuthStore();
</script>
