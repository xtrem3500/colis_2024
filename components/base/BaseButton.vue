<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center justify-center px-4 py-2 rounded transition-colors',
      'font-medium focus:outline-none focus:ring-2 focus:ring-offset-2',
      variant === 'primary'
        ? 'bg-paypal-light-blue hover:bg-paypal-blue text-white focus:ring-paypal-light-blue'
        : 'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-300',
      full ? 'w-full' : '',
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  full?: boolean
}>()
</script>