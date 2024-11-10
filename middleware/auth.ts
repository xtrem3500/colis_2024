import { useAuthStore } from "../stores/auth.js";

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore(); // Accessing your Pinia auth store

  // Redirect unauthenticated users trying to access admin pages to login
  if (!auth.user && to.path.startsWith("/admin")) {
    return navigateTo("/login");
  }

  // Redirect authenticated users away from the login page
  if (auth.user && to.path === "/login") {
    return navigateTo("/admin");
  }
});
