// server/api/auth/register.post.ts
import { defineEventHandler, readBody } from "h3";
import { AdminModel } from "../../models/admin";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Formate le fullPhoneNumber en concaténant le code pays et le numéro de téléphone
  const fullPhoneNumber = `${body.countryCode}${body.phoneNumber}`;

  try {
    // Vérifie si un administrateur avec ce fullPhoneNumber existe déjà
    const existingAdmin = await AdminModel.findOne({
      fullPhoneNumber: fullPhoneNumber,
    });

    if (existingAdmin) {
      return { success: false, message: "Admin existe déjà" };
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Créer un nouvel admin avec fullPhoneNumber
    const newAdmin = new AdminModel({
      firstName: body.firstName,
      lastName: body.lastName,
      phoneNumber: body.phoneNumber,
      countryCode: body.countryCode,
      fullPhoneNumber: fullPhoneNumber, // Ajoute le champ fullPhoneNumber
      password: hashedPassword,
      role: body.role || "admin",
    });

    await newAdmin.save();
    return { success: true, message: "Admin créé avec succès" };
  } catch (err) {
    console.error("Erreur lors de la création de l'admin:", err);
    return { success: false, message: "Erreur lors de la création de l'admin" };
  }
});
