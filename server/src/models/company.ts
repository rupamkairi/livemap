import mongoose from "../services/database/database";

export const companySchema = new mongoose.Schema({}, { timestamps: true });

export const company = mongoose.model("companies", companySchema);
