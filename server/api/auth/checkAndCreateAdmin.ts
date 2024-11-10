const createAdminUser = async () => {
  const adminData = {
    lastname: "ADMIN",
    firstName: "ADMIN",
    countryCode: "+225",
    phoneNumber: "0758966156",
    fullPhoneNumber: "+2250758966156", // Concaténation
    role: "admin",
    password:
      "8c0962ff9f4692ec9652f5b439411eebb4391172282b64e276653982b7d42c55", //process.env.ADMIN_PASSWORD,
  };

  try {
    // Appel API pour créer l'admin
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminData),
    });

    const data = await response.json();
    if (data.success) {
      console.log("Admin créé avec succès.");
    } else {
      console.log("Erreur lors de la création de l'admin.");
    }
  } catch (err) {
    console.error("Erreur lors de la création de l'admin :", err);
  }
};

const checkAndCreateAdmin = async () => {
  try {
    // Vérifie si un admin existe
    const response = await fetch("/api/auth/checkAdmin");
    const data = await response.json();

    if (!data.adminExists) {
      // Crée un admin si aucun n'existe
      await createAdminUser();
    }
  } catch (err) {
    console.error("Erreur lors de la vérification de l'admin :", err);
  }
};
