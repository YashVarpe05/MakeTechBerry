import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import internshipRoutes from "./routes/internship.routes.js";
import projectRoutes from "./routes/project.routes.js";
import reportRoutes from "./routes/report.routes.js";
import messageRoutes from "./routes/message.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";
import {
  createMessage,
  getMessages,
  deleteMessage,
} from "./controllers/message.controller.js";
import protect from "./middlewares/auth.middleware.js";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/internships", internshipRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/reports", reportRoutes);
// Messages (contact form)
// Note: we mount the router AND also wire explicit handlers to avoid
// any edge-case where the router isn't picked up in runtime.
app.use("/api/messages", messageRoutes);
app.post("/api/messages", createMessage);
app.get("/api/messages", protect, getMessages);
app.delete("/api/messages/:id", protect, deleteMessage);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/auth", authRoutes);

// Debug: Log registered routes
console.log("✅ Message routes registered at /api/messages");


app.get("/", (req, res) => {
  res.send("MakeTechBerry Server Running 🚀");
});

export default app;
