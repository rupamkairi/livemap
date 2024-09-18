import { Router } from "express";
import { agentPosition } from "../../models/agentPosition";

export const trackingRouter = Router();

trackingRouter.post("/agents/location", async (req, res) => {
  try {
    const { agentId, timestamp, meta } = req.body;
    const ap = await (
      await agentPosition.create({ agentId, timestamp, meta })
    ).save();
    console.log(ap);
    return res.status(201).json(ap);
  } catch (error) {
    console.log(error);
  }
});
