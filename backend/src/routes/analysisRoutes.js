import { Router } from "express";
import { body } from "express-validator";

import { analyzeVideo } from "../controllers/analysisController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { enforceAnalysisQuota } from "../middleware/usageMiddleware.js";

const router = Router();

router.post(
  "/",
  requireAuth,
  enforceAnalysisQuota,
  [
    body("platform").isIn(["Reels", "Shorts"]),
    body("views").isInt({ min: 1, max: 100000000 }),
    body("likes").isInt({ min: 0, max: 100000000 }),
    body("comments").isInt({ min: 0, max: 100000000 }),
    body("duration").isFloat({ min: 1, max: 300 }),
    body("niche").isLength({ min: 2, max: 80 }).trim().escape()
  ],
  validateRequest,
  analyzeVideo
);

export default router;
