import { User } from "../models/User.js";
import { createCheckout, verifyRazorpaySignature } from "../services/paymentService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const startCheckout = asyncHandler(async (req, res) => {
  const checkout = await createCheckout({
    email: req.user.email,
    userId: req.user._id.toString()
  });

  res.json(checkout);
});

export const confirmUpgrade = asyncHandler(async (req, res) => {
  const { provider, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

  if (provider === "razorpay") {
    const isValid = verifyRazorpaySignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature
    });

    if (!isValid) {
      return res.status(400).json({ message: "Invalid Razorpay signature" });
    }
  }

  await User.findByIdAndUpdate(req.user._id, { plan: "pro" });
  res.json({ message: "Plan upgraded successfully", plan: "pro" });
});
