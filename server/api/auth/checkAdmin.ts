import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"; // URI depuis .env
const dbName = process.env.MONGODB_DB || "test"; // Nom de la DB depuis .env

async function createAdmin() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const adminCollection = db.collection("admin");

    const adminData = {
      lastname: "ADMIN",
      firstName: "ADMIN",
      countryCode: "+225",
      phoneNumber: "0758966156",
      fullPhoneNumber: "+2250758966156", // Concaténation pour fullPhoneNumber
      role: "admin",
      password:
        "8c0962ff9f4692ec9652f5b439411eebb4391172282b64e276653982b7d42c55", // process.env.ADMIN_PASSWORD,
    };

    // Vérifier si un admin avec ce fullPhoneNumber existe déjà
    const existingAdmin = await adminCollection.findOne({
      fullPhoneNumber: adminData.fullPhoneNumber,
    });

    if (!existingAdmin) {
      // Insertion d'un nouvel admin s'il n'existe pas
      await adminCollection.insertOne(adminData);
      console.log("Admin créé avec succès.");
    } else {
      console.log("Admin déjà existant.");
    }
  } catch (err) {
    console.error("Erreur lors de la création de l'admin:", err);
  } finally {
    await client.close();
  }
}

export default defineEventHandler(async () => {
  await createAdmin();
  return { success: true };
});