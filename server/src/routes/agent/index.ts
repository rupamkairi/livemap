import { Router } from "express";
import { agentPosition } from "../../models/agentPosition";

export const agentPositionRouter = Router();

agentPositionRouter.get("/agents/position", async (req, res) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

agentPositionRouter.post("", async (req, res) => {
  try {
    const { agentId, timestamp, meta } = req.body;
    console.log(agentId, timestamp, meta);
    const ap = await (
      await agentPosition.create({ agentId, timestamp, meta })
    ).save();
    console.log(ap);
    // return res.sendStatus(201);
    return res.status(201).json(ap);
  } catch (error) {
    console.log(error);
  }
});
