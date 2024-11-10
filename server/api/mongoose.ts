import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;

    if (!dbUri) {
      throw new Error("MONGODB_URI is not defined in the .env file");
    }

    await mongoose.connect(dbUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Exporte mongoose et ses composants
export const { Schema, Document } = mongoose;
export default mongoose;

// Appeler cette fonction pour établir la connexion
connectDB();
