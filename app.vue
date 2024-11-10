<template>
  <div class="min-h-screen bg-gray-50 font-paypal-small">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- <Vue3-Toastify position="bottom-right" /> -->
  </div>
</template>

<script setup lang="ts">
import "vue3-toastify/dist/index.css";
</script>

<style>
/* Utiliser une classe personnalisée */
.antialiased-body {
  @apply antialiased;
}
</style>
