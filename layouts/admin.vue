<template>
  <div>
    <header class="bg-paypal-blue text-white py-4">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-paypal-big font-bold">
          Administration - Colis Express Abidjan <button>Admin</button>
        </h1>
      </div>
    </header>
    <client-only>
      <ToastContainer />
    </client-only>
    <AdminNav />
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>
