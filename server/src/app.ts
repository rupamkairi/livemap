import cors from "cors";
import express from "express";
import { apiRouter } from "./routes/api";
import "./models";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

export default app;
