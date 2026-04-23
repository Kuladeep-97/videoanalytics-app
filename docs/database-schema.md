# Database Schema

## `users`

- `name`: string
- `email`: string, unique
- `passwordHash`: string
- `plan`: `free | pro`
- `stripeCustomerId`: string
- `razorpayCustomerId`: string
- `createdAt`, `updatedAt`: dates

## `usage_logs`

- `userId`: ObjectId reference to `users`
- `type`: `analysis | seo | hooks`
- `meta`: object
- `createdAt`, `updatedAt`: dates
