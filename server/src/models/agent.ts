import { Schema } from "mongoose";
import mongoose from "../services/database/database";

export const agentSchema = new mongoose.Schema(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "companies",
    },
    officeIds: {
      type: [Schema.Types.ObjectId],
      ref: "offices",
    },
  },
  { timestamps: true }
);

export const agent = mongoose.model("agents", agentSchema);
