// ~/server/utils/database.ts

import mongoose from "mongoose";

let isConnected = false; // Variable pour vérifier si la connexion est déjà établie

export async function connectToDatabase() {
  if (isConnected) {
    console.log("MongoDB est déjà connecté.");
    return;
  }

  try {
    const uri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/your-database-name"; // Remplace `your-database-name` par le nom de ta base de données
    await mongoose.connect(uri);
    isConnected = true;
    console.log("MongoDB connecté avec succès");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error);
    throw new Error("Échec de la connexion à MongoDB");
  }
}
