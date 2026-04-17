# Sandbox Bangladesh

Premium incubation ecosystem platform for `Sandbox Bangladesh` with a public website, founder application flow, transactional email architecture, and an internal admin dashboard.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- Prisma + Neon Postgres
- NextAuth credentials auth
- React Hook Form + Zod
- Resend-compatible email layer

## Route Map

- `/`
- `/about`
- `/tracks`
- `/tracks/[slug]`
- `/apply`
- `/contact`
- `/insights`
- `/events`
- `/thank-you`
- `/auth/sign-in`
- `/admin`
- `/admin/applications`
- `/admin/applications/[id]`
- `/admin/participants`
- `/admin/communications`
- `/admin/content`
- `/admin/settings`

## Data Model

Core Prisma models:

- `AdminUser`
- `Track`
- `Applicant`
- `Application`
- `ApplicationNote`
- `ApplicationStatusHistory`
- `Cohort`
- `CohortApplication`
- `EmailTemplate`
- `EmailLog`
- `SiteSetting`
- `FAQ`
- `Testimonial`
- `ContactInquiry`
- `AuditLog`

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and set:

```bash
DATABASE_URL=
AUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
AUTH_TRUST_HOST=true
RESEND_API_KEY=
RESEND_FROM_EMAIL=
```

3. Generate Prisma client:

```bash
npx prisma generate
```

4. Create and run migrations:

```bash
npx prisma migrate dev --name init
```

5. Seed the database:

```bash
npm run prisma:seed
```

6. Run the app:

```bash
npm run dev
```

## Local Demo Admin

Development-only fallback access:

- Email: `admin@sandboxbd.com`
- Password: `Admin@4321`
- Email: `admin@sandbox.bd`
- Password: `sandbox-admin-2026`

This demo path is disabled in production.

## Production Deployment

Production deployments on Vercel or Netlify should use the real Neon database and must not rely on the local filesystem fallback.

Required production environment variables:

- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_TRUST_HOST=true`
- `NEXTAUTH_URL` or your platform hostname setting
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

Before deploying production:

1. Run Prisma migrations against the production database:

```bash
npx prisma migrate deploy
```

2. Seed only if needed for initial admin or content setup:

```bash
npm run prisma:seed
```

3. Ensure at least one real `AdminUser` exists in the database.

## Production Notes

- Local fallback storage is development-only and is disabled in production.
- Public submissions and admin mutations return clear `503` responses if production is missing the database schema.
- `postinstall` runs `prisma generate`, which helps Vercel/Netlify builds produce the Prisma client reliably.
- Node `>=20.19.0` is declared for better compatibility with the current toolchain.

## Verification

- `npm run build`
- `npm run lint`
