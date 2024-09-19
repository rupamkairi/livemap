import { Schema } from "mongoose";
import mongoose from "../services/database/database";

export const officeFenceSchema = new mongoose.Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "companies",
    },
    officeId: {
      type: Schema.Types.ObjectId,
      ref: "offices",
    },
    polygon: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

export const officeFence = mongoose.model("office_fences", officeFenceSchema);
