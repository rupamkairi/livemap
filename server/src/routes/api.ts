import { Router } from "express";
import { fencingRouter } from "./fencing";
import { trackingRouter } from "./tracking";

export const apiRouter = Router();

apiRouter.use("/tracking", trackingRouter);
apiRouter.use("/fencing", fencingRouter);
