import express from "express";
import {
  createMessage,
  getMessages,
  deleteMessage,
} from "../controllers/message.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/", protect, getMessages);
router.delete("/:id", protect, deleteMessage);

export default router;
