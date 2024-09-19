import { Schema } from "mongoose";
import mongoose from "../services/database/database";

export const officeSchema = new mongoose.Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "companies",
    },
  },
  { timestamps: true }
);

export const office = mongoose.model("offices", officeSchema);
