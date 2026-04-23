import { Router } from "express";
import { body } from "express-validator";

import { login, me, register } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.post(
  "/register",
  [
    body("name").isLength({ min: 2, max: 80 }).trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8, max: 64 })
  ],
  validateRequest,
  register
);

router.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").isLength({ min: 8, max: 64 })],
  validateRequest,
  login
);

router.get("/me", requireAuth, me);

export default router;
