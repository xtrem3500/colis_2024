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
            <!-- Icône dynamique basée sur l'état actuel -->
            <FontAwesomeIcon :icon="iconComponent" class="w-8 h-8" />
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
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons"; // Importation des icônes Font Awesome

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useRouter, useRoute } from "vue-router";

const iconComponent = ref(faUser); // Initialisation avec l'icône Home
const router = useRouter();
const route = useRoute();

// Variable pour savoir si on est sur la page d'accueil
const isHomePage = computed(() => route.path === "/");

// Vérification si l'admin existe
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

// Fonction de redirection et changement d'icône
const goToPage = async () => {
  try {
    if (isHomePage.value) {
      console.log("Redirection vers la page d'accueil");
      router.push("/login"); // Redirige vers la page de connexion
      iconComponent.value = faHome; // Change l'icône en faUser
    } else {
      console.log("Redirection vers la page d'accueil");
      router.push("/"); // Redirige vers la page d'accueil
      iconComponent.value = faUser; // Change l'icône en faHome
    }
  } catch (err) {
    console.error("Erreur lors de la vérification de l'admin :", err);
  }
};

// Fonction de création de l'admin
const createAdminUser = async () => {
  try {
    // Vérifier si l'admin existe déjà
    const checkResponse = await fetch("/api/auth/checkAdmin");
    const checkData = await checkResponse.json();

    if (checkData.adminExists) {
      console.log("Un admin existe déjà. Pas de création nécessaire.");
      toast.info("Un admin existe déjà.");
      return; // Si l'admin existe déjà, on arrête la fonction ici
    }

    // Si aucun admin n'existe, procéder à la création
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "admin",
        lastname: "ADMIN",
        firstName: "ADMIN",
        email: "2024dibo@gmail.com",
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
      toast.error("Erreur lors de la création de l'admin !");
    }
  } catch (err) {
    console.error("Erreur lors de la création de l'admin :", err);
    toast.error("Erreur lors de la création de l'admin.");
  }
};
</script>

<style scoped>
/* Personnalisation des styles */
.max-w-4xl {
  max-width: 800px;
}

.text-paypal-dark-blue {
  color: #004d9f;
}

.bg-red-50 {
  background-color: #fef2f2;
}

.border-red-200 {
  border-color: #fecaca;
}

.text-red-800 {
  color: #b91c1c;
}
</style>
