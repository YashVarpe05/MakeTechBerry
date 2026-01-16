import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import internshipRoutes from "./routes/internship.routes.js";
import projectRoutes from "./routes/project.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/internships", internshipRoutes);
app.use("/api/projects", projectRoutes);  

app.get("/", (req, res) => {
  res.send("MakeTechBerry Server Running 🚀");
});

export default app;
