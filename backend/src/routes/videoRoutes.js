import { Router } from "express";
import multer from "multer";
import { processVideo } from "../controllers/videoController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

const upload = multer({ dest: "uploads/" });

// 🔥 CRITICAL LINE
router.post("/analyze", requireAuth, upload.single("video"), processVideo);

export default router;