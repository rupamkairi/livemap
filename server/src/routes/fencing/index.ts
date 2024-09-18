import { Router } from "express";

export const fencingRouter = Router();

//
fencingRouter.post("/polygons", async (req, res) => {});

fencingRouter.get("/polygons/:id", async (req, res) => {});

fencingRouter.patch("/polygons/:id", async (req, res) => {});

//
fencingRouter.post("/agents/location", async (req, res) => {});
