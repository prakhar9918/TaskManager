import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./router/auth.js";
import projectRoutes from "./router/project.js";
import taskRoutes from "./router/task.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "https://task-manager-one-ashy-16.vercel.app/",
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log("Server running")))
  .catch(err => console.log(err));
