import cors from "cors";
import express from "express";
import "./models";
import { apiRouter } from "./routes/api";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

export default app;
