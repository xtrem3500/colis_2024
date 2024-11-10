import { defineEventHandler, readBody } from "h3"; // Fonctions pour gérer les requêtes dans Nuxt
import bcrypt from "bcryptjs"; // Pour vérifier les mots de passe chiffrés
import { AdminModel } from "~/server/models/admin"; // Modèle Mongoose pour interagir avec la collection `admin`
import mongoose from "mongoose"; // Bibliothèque MongoDB
import { PhoneNumber } from "libphonenumber-js";

// 1. Connexion à MongoDB (uniquement si non connecté)
if (mongoose.connection.readyState === 0) {
  // Si l'application n'est pas encore connectée à la base de données, on établit une connexion
  mongoose.connect(process.env.MONGO_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions);
  console.log("Connexion à MongoDB établie."); // Vérification de la connexion
}

// 2. Handler principal pour la requête de connexion
export default defineEventHandler(async (event) => {
  // Lecture du corps de la requête (les données envoyées par le formulaire)
  const body = await readBody(event);
  const { phoneNumber, password } = body;

  console.log("Données reçues:", body); // Affiche les données reçues pour vérifier

  // On suppose que `phoneNumber` contient le numéro complet (countryCode + phoneNumber)
  const fullPhoneNumber = phoneNumber;

  try {
    // 3. Recherche d'un admin correspondant dans la base de données
    console.log("Recherche admin avec le numéro:", fullPhoneNumber);
    const admin = await AdminModel.findOne({ PhoneNumber });

    if (!admin) {
      // Si aucun admin n'est trouvé, on retourne une erreur
      console.log("Admin non trouvé pour ce numéro.", phoneNumber);
      return {
        success: false,
        error: "Numéro de téléphone ou mot de passe incorrect.",
      };
    }

    // 4. Vérification du mot de passe
    console.log("Vérification du mot de passe pour:", admin.fullPhoneNumber);
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      // Si le mot de passe ne correspond pas, on retourne une erreur
      console.log("Mot de passe incorrect.");
      return {
        success: false,
        error: "Numéro de téléphone ou mot de passe incorrect.",
      };
    }

    // 5. Connexion réussie
    console.log("Connexion réussie pour:", admin.fullPhoneNumber);
    return {
      success: true,
      message: "Connexion réussie",
    };
  } catch (err) {
    // Si une erreur se produit, on la logge pour le débogage
    console.error("Erreur lors de la connexion :", err);
    return {
      success: false,
      error: "Erreur serveur",
    };
  }
});
