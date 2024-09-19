import { Schema } from "mongoose";
import mongoose from "../services/database/database";

export const agentPositionSchema = new mongoose.Schema(
  {
    agentId: { type: Schema.Types.ObjectId, ref: "agents" },
    timestamp: { type: Schema.Types.Date },
    meta: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
    timeseries: {
      timeField: "timestamp",
      metaField: "meta",
    },
  }
);

export const agentPosition = mongoose.model(
  "agent_positions",
  agentPositionSchema
);
