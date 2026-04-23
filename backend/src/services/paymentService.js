import Razorpay from "razorpay";
import Stripe from "stripe";
import crypto from "crypto";

import { env } from "../config/env.js";

const stripe = env.stripeSecretKey ? new Stripe(env.stripeSecretKey) : null;
const razorpay =
  env.razorpayKeyId && env.razorpayKeySecret
    ? new Razorpay({
        key_id: env.razorpayKeyId,
        key_secret: env.razorpayKeySecret
      })
    : null;

export const createCheckout = async ({ email, userId }) => {
  if (env.paymentProvider === "razorpay") {
    if (!razorpay) {
      throw new Error("Razorpay is not configured");
    }

    const order = await razorpay.orders.create({
      amount: 190000,
      currency: "INR",
      receipt: `pro-${userId}`,
      notes: {
        email,
        userId
      }
    });

    return {
      provider: "razorpay",
      key: env.razorpayKeyId,
      order
    };
  }

  if (!stripe || !env.stripePriceId) {
    throw new Error("Stripe is not configured");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: email,
    line_items: [
      {
        price: env.stripePriceId,
        quantity: 1
      }
    ],
    success_url: `${env.frontendUrl}/dashboard?billing=success`,
    cancel_url: `${env.frontendUrl}/pricing?billing=cancelled`,
    metadata: {
      userId
    }
  });

  return {
    provider: "stripe",
    url: session.url
  };
};

export const verifyRazorpaySignature = ({ orderId, paymentId, signature }) => {
  const body = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac("sha256", env.razorpayKeySecret)
    .update(body)
    .digest("hex");

  return expected === signature;
};
