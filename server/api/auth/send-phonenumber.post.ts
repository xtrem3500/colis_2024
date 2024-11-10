// server/api/auth/request-password-reset.post.ts
import { H3Event, readBody } from "h3";
import { User } from "../../models/user"; // Modèle User, assurez-vous qu'il inclut fullPhoneNumber
// import { generateResetToken, sendResetSMS } from "../../../utils/auth"; // Importez des utilitaires si nécessaires

export default async (event: H3Event) => {
  try {
    // Lecture du corps de la requête
    const { countryCode, phoneNumber } = await readBody(event);

    // Validation des champs
    if (
      !countryCode ||
      !phoneNumber ||
      phoneNumber.length < 9 ||
      phoneNumber.length > 15
    ) {
      return { status: 400, body: { error: "Numéro de téléphone invalide" } };
    }

    // Concaténation de fullPhoneNumber pour la recherche dans la base
    const fullPhoneNumber = `${countryCode}${phoneNumber.replace(/\s/g, "")}`;

    // Rechercher l'utilisateur en fonction de fullPhoneNumber
    const user = await User.findOne({ fullPhoneNumber }).exec();
    if (!user) {
      return { status: 404, body: { error: "Utilisateur non trouvé" } };
    }

    // Générer un token de réinitialisation
    const resetToken = generateResetToken();

    // Envoi du lien de réinitialisation par SMS
    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;
    const message = `Cliquez sur ce lien pour réinitialiser votre mot de passe: ${resetLink}`;
    await sendResetSMS(fullPhoneNumber, message);

    return {
      status: 200,
      body: {
        success: true,
        message: "Lien de réinitialisation envoyé par SMS",
      },
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi du lien de réinitialisation:", error);
    return { status: 500, body: { error: "Erreur interne du serveur" } };
  }
};
function sendResetSMS(fullPhoneNumber: string, message: string) {
  throw new Error("Function not implemented.");
}

function generateResetToken() {
  throw new Error("Function not implemented.");
}
