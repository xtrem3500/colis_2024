// composables/useAxios.ts

import axios from "axios";

// Création d'une instance axios pour centraliser les configurations
const axiosInstance = axios.create({
  baseURL: "/api", // Base URL de ton API
  headers: {
    "Content-Type": "application/json",
  },
});

// Fonction qui permet de faire des requêtes HTTP via axios
export const useAxios = async (url: string, options: any) => {
  try {
    const response = await axiosInstance(url, options);
    return response.data; // Retourner les données de la réponse
  } catch (error) {
    console.error("Axios error:", error);
    throw new Error("API request failed");
  }
};
