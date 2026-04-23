import { Router } from "express";
import { generateAI } from "../controllers/aiController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/generate", requireAuth, generateAI);

export default router;