# Deployment Guide

## 1. Backend on Render

1. Create a new Web Service on Render.
2. Point the service root to `backend`.
3. Set build command to `npm install`.
4. Set start command to `npm start`.
5. Add environment variables from `backend/.env.example`.
6. Set `FRONTEND_URL` to your Vercel domain.
7. Provision MongoDB Atlas and add its connection string as `MONGODB_URI`.

## 2. Frontend on Vercel

1. Import the repo into Vercel.
2. Set the root directory to `frontend`.
3. Add `VITE_API_URL` pointing to your Render backend, for example `https://your-api.onrender.com/api`.
4. Build command: `npm run build`.
5. Output directory: `dist`.

## 3. OpenAI

1. Create an OpenAI API key.
2. Add `OPENAI_API_KEY` to the Render backend environment.
3. Optionally change `OPENAI_MODEL` if you want a different supported model.

## 4. Billing

### Stripe

1. Create a product and recurring price in Stripe.
2. Set `PAYMENT_PROVIDER=stripe`.
3. Add `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID`.

### Razorpay

1. Create a subscription or order flow in Razorpay.
2. Set `PAYMENT_PROVIDER=razorpay`.
3. Add `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.

## 5. Production Checks

1. Test `POST /api/auth/register`.
2. Test `POST /api/analyze` with a free-plan user and confirm the daily limit after 3 runs.
3. Test `GET /api/seo`.
4. Test `POST /api/ai/hooks`.
5. Test the checkout endpoint for your chosen provider.
