import express from "express";
import {
  getWorkshops,
  getWorkshopById,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop
} from "../controllers/workshop.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes (no authentication required)
router.get("/", getWorkshops);
router.get("/:id", getWorkshopById);

// Admin-only routes (protected)
router.post("/", protect, createWorkshop);
router.put("/:id", protect, updateWorkshop);
router.delete("/:id", protect, deleteWorkshop);

export default router;
