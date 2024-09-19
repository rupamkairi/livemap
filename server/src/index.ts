import cors from "cors";
import express from "express";
import { apiRouter } from "./routes/api";
import "./models";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

const port = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log(`Server is running on port ${port}`);
});
