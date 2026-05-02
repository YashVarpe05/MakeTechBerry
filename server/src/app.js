import express from "express";
import cors from "cors";
import helmet from "helmet"; // [FIXED]: Added Helmet for security headers
import rateLimit from "express-rate-limit"; // [FIXED]: Added rate limiting
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import internshipRoutes from "./routes/internship.routes.js";
import projectRoutes from "./routes/project.routes.js";
import reportRoutes from "./routes/report.routes.js";
import messageRoutes from "./routes/message.routes.js";
import workshopRoutes from "./routes/workshop.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";
import protect from "./middlewares/auth.middleware.js";

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// [FIXED]: Added Helmet security headers (CSP, HSTS, X-Content-Type-Options, etc.)
app.use(helmet());

// [FIXED]: CORS now restricted to configured origin (was: open to all origins)
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// [FIXED]: Added JSON body size limit to prevent large payload attacks
app.use(express.json({ limit: "1mb" }));

// [FIXED]: Rate limiting on auth routes to prevent brute-force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 login attempts per 15 min
  message: { success: false, message: "Too many login attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false
});

// [FIXED]: Rate limiting on public submission routes to prevent spam
const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // max 20 submissions per 15 min
  message: { success: false, message: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiters to specific routes
app.use("/api/auth", authLimiter);
app.use("/api/messages", publicLimiter);
app.use("/api/internships/register", publicLimiter);
app.use("/api/projects/register", publicLimiter);

// API Routes
app.use("/api/internships", internshipRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/workshops", workshopRoutes);
// [FIXED]: Removed duplicate manual message route wiring (was causing shadowing)
app.use("/api/messages", messageRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("MakeTechBerry Server Running 🚀");
});

// [FIXED]: Added global error handler to prevent stack trace leaks
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === "production" 
      ? "An unexpected error occurred" 
      : err.message
  });
});

export default app;

