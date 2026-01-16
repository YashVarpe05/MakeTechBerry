import express from "express";
import {
  registerProject,
  getAllProjects
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/register", registerProject);
router.get("/", getAllProjects);

export default router;
