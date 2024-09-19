import { Router } from "express";
import { agentPosition } from "../../models/agentPosition";

export const trackingRouter = Router();

trackingRouter.get("/agents/:agentId", async (req, res) => {
  try {
    const agentId = req.params.agentId;
    const dateRange = ["2024-09-19", "2024-09-20"];

    const ap = await agentPosition.find({
      agentId,
      timestamp: { $gte: dateRange[0], $lt: dateRange[1] },
    });

    return res.status(200).json(ap);
  } catch (error) {
    console.log(error);
  }
});
