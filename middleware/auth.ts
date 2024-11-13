import { useAuthStore } from "../stores/auth.js";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore(); // Accéder au store de l'authentification

  // Si l'utilisateur est déjà connecté et tente d'accéder à la page de connexion, le rediriger vers le tableau de bord
  if (auth.user && to.path === "/login") {
    return navigateTo("/admin"); // Redirige vers /admin
  }

  // Si l'utilisateur n'est pas connecté et tente d'accéder à une page admin, le rediriger vers la page de connexion
  if (!auth.user && to.path.startsWith("/admin")) {
    return navigateTo("/login");
  }
});
