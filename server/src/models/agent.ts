import mongoose from "../services/database/database";

export const agentSchema = new mongoose.Schema({}, { timestamps: true });

export const agent = mongoose.model("agents", agentSchema);
