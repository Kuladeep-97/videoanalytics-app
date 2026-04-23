import { Router } from "express";
import { query } from "express-validator";

import { fetchSeoIdeas } from "../controllers/seoController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.get(
  "/",
  requireAuth,
  [query("niche").isLength({ min: 2, max: 80 }).trim().escape()],
  validateRequest,
  fetchSeoIdeas
);

export default router;
