import { defineEventHandler, readBody } from "h3";
import bcrypt from "bcryptjs";
import { AdminModel } from "~/server/models/admin";
import mongoose from "mongoose";

// Vérification de la connexion à MongoDB
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGO_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions);
  console.log("Connected to MongoDB.");
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { phoneNumber, password } = body;

  console.log("Login attempt with:", { phoneNumber });

  try {
    // Recherche de l'admin par numéro de téléphone complet
    const admin = await AdminModel.findOne({ fullPhoneNumber: phoneNumber });
    if (!admin) {
      console.log("Admin not found for this phone number.");
      return {
        success: false,
        error: "Invalid phone number or password.",
        statusCode: 401,
      };
    }

    // Vérification du mot de passe
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      console.log("Incorrect password for:", phoneNumber);
      return {
        success: false,
        error: "Invalid phone number or password.",
        statusCode: 401,
      };
    }

    console.log("Login successful for:", phoneNumber);
    return { success: true, message: "Login successful", statusCode: 200 };
  } catch (err) {
    console.error("Error during login:", err);
    return { success: false, error: "Server error", statusCode: 500 };
  }
});
