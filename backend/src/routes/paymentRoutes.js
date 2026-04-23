import { Router } from "express";
import { body } from "express-validator";

import { confirmUpgrade, startCheckout } from "../controllers/paymentController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();

router.post("/checkout", requireAuth, startCheckout);
router.post(
  "/confirm",
  requireAuth,
  [
    body("provider").isIn(["stripe", "razorpay"]),
    body("razorpayOrderId").optional().isString(),
    body("razorpayPaymentId").optional().isString(),
    body("razorpaySignature").optional().isString()
  ],
  validateRequest,
  confirmUpgrade
);

export default router;
