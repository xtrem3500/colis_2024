import bcrypt from "bcryptjs";
import PasswordReset from "../../models/passwordResetSchema ";
import { User } from "../../models/user";

export default defineEventHandler(async (event) => {
  const { token } = event.context.query;
  const { newPassword } = await readBody(event);

  if (!token || !newPassword) {
    return { status: 400, message: "Token ou mot de passe manquant." };
  }

  try {
    // Chercher le token de réinitialisation dans la base de données
    const resetTokenRecord = await PasswordReset.findOne({ token });

    if (!resetTokenRecord) {
      return { status: 400, message: "Token invalide ou expiré." };
    }

    // Vérifier si le token a expiré
    if (new Date() > resetTokenRecord.expiresAt) {
      return { status: 400, message: "Token expiré." };
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Mettre à jour le mot de passe de l'utilisateur
    await User.findByIdAndUpdate(resetTokenRecord.userId, {
      password: hashedPassword,
    });

    // Supprimer le token de réinitialisation après utilisation
    await PasswordReset.deleteOne({ token });

    return { status: 200, message: "Mot de passe réinitialisé avec succès." };
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe:", error);
    return {
      status: 500,
      message: "Erreur lors de la réinitialisation du mot de passe.",
    };
  }
});
