// server/models/user.js
import mongoose, { Schema } from "../api/mongoose"; // Importation de mongoose et de Schema
import type { Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  password: string;
  role: string;
  profileImage?: string;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  countryCode: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Correction ici
  profileImage: { type: String, required: false },
});

export const User = mongoose.model<IUser>("User", userSchema);
