import express from "express";
import { apiRouter } from "./routes/api";

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

const port = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log(`Server is running on port ${port}`);
});
