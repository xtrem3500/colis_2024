<template>
  <div>
    <header class="bg-paypal-blue text-white py-4">
      <nav class="container mx-auto px-4 flex justify-between items-center">
        <h1 class="text-2xl font-paypal-big font-bold">
          Colis Express d'Abidjan
        </h1>
        <div class="flex space-x-4">
          <button
            @click="goToPage"
            class="flex items-center text-lg font-semibold text-paypal-light hover:text-paypal-dark transition-all"
          >
            <!-- Dynamically change the icon based on the current state -->
            <component :is="iconComponent" class="w-8 h-8" />
          </button>
        </div>
      </nav>
    </header>
    <client-only>
      <Vue3-Toastify />
    </client-only>
    <main class="container mx-auto px-4 py-2">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { HomeIcon, UserCircleIcon } from "@heroicons/vue/24/solid";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter, useRoute } from "vue-router";

// Déclaration des variables et du router
const iconComponent = ref(UserCircleIcon); // Initialiser avec UserCircleIcon
const router = useRouter();
const route = useRoute();

// Variable pour savoir si on est sur la page d'accueil
const isHomePage = computed(() => route.path === "/");

// Vérifier si l'admin existe
onMounted(async () => {
  const response = await fetch("/api/auth/checkAdmin");
  const data = await response.json();

  if (!data.adminExists) {
    console.log("Aucun admin trouvé, création d'un nouvel admin...");
    await createAdminUser();
  } else {
    console.log("Un admin existe déjà.");
  }
});

// Fonction de redirection et d'interaction avec l'icône
const goToPage = async () => {
  try {
    const currentUrl = window.location.href;
    const appUrl = process.env.APP_URL || "";

    if (isHomePage.value) {
      console.log("Redirection vers la page d'accueil");
      router.push("/login"); // Redirige vers la page d'accueil
      iconComponent.value = HomeIcon; // Change l'icône en UserCircleIcon
    } else {
      console.log("Redirection vers la page de connexion");
      router.push("/"); // Redirige vers la page de connexion
      iconComponent.value = UserCircleIcon; // Change l'icône en HomeIcon
    }
  } catch (err) {
    console.error("Erreur lors de la vérification de l'admin :", err);
  }
};

// Fonction de création de l'admin
const createAdminUser = async () => {
  try {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "admin",
        lastname: "ADMIN",
        firstName: "ADMIN",
        countryCode: "+225",
        phoneNumber: "0758966156",
        fullPhoneNumber: "+2250758966156",
        password: process.env.ADMIN_PASSWORD,
      }),
    });
    const data = await response.json();

    if (data.success) {
      console.log("Admin créé avec succès.");
      toast.success("Admin créé avec succès !");
    } else {
      console.log("Erreur lors de la création de l'admin :", data.message);
      // toast.error("Erreur lors de la création de l'admin !");
    }
  } catch (err) {
    console.error("Erreur lors de la création de l'admin :", err);
  }
};
</script>

<style scoped>
/* Ajoutez ici des styles spécifiques si nécessaire */
</style>
