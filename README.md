# Why My Video Flopped + SEO Finder

A production-ready micro SaaS MVP that helps creators understand why Instagram Reels and YouTube Shorts are underperforming, discover SEO-backed content opportunities, and generate stronger hooks, captions, titles, and hashtags.

## Project structure

```text
backend/   Express API, MongoDB models, auth, billing, OpenAI integration
frontend/  React + Tailwind app with landing, dashboard, pricing, and auth
docs/      Database schema, route reference, deployment guide
```

## Core features

- Video Analyzer with engagement and retention heuristics
- SEO Finder using Google and YouTube autocomplete suggestions
- OpenAI-powered hook, caption, title, and hashtag generation
- JWT authentication
- Free vs Pro monetization gates
- Stripe or Razorpay checkout integration
- Rate limiting, validation, and centralized error handling

## Backend stack

- Node.js
- Express
- MongoDB + Mongoose
- OpenAI API
- Stripe / Razorpay

## Frontend stack

- React
- Tailwind CSS
- React Router
- Vite

## Local development

### Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

## Environment variables

See:

- `backend/.env.example`
- `frontend/.env.example`

## Documentation

- [Database schema](docs/database-schema.md)
- [API routes](docs/api-routes.md)
- [Deployment guide](docs/deployment-guide.md)

## Hosting

- Frontend is prepared for Vercel with [vercel.json](vercel.json)
- Backend is prepared for Render with [render.yaml](render.yaml)

