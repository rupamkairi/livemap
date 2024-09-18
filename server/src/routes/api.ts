import { Router } from "express";
import { fencingRouter } from "./fencing";
import { trackingRouter } from "./tracking";
import { agentPositionRouter } from "./agent";

export const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.status(200).json({ status: "success" });
});

apiRouter.use("/agent-position", agentPositionRouter);
apiRouter.use("/tracking", trackingRouter);
apiRouter.use("/fencing", fencingRouter);
