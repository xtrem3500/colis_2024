import mongoose, { Schema, Document } from "mongoose";

interface IAdmin extends Document {
  lastname: string;
  firstName: string;
  countryCode: string;
  phoneNumber: string;
  fullPhoneNumber: string;
  role: string;
  password: string;
}

const adminSchema = new Schema<IAdmin>({
  lastname: { type: String, required: true },
  firstName: { type: String, required: true },
  countryCode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  fullPhoneNumber: { type: String, required: true, unique: true }, // Champ concaténé
  role: { type: String, default: "admin" },
  password: { type: String, required: true },
});

const AdminModel = mongoose.model<IAdmin>("Admin", adminSchema);
export { AdminModel };
