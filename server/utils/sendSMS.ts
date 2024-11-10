import Twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  throw new Error("Twilio credentials are missing!");
}

const client = Twilio(accountSid, authToken);

// Utilisation de client pour envoyer des SMS...
