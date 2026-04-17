# Sandbox Bangladesh

Premium incubation ecosystem platform for `Sandbox Bangladesh` with a public conversion website, founder access application workflow, transactional email architecture, and a secure internal admin workspace.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- Prisma + Neon Postgres
- NextAuth credentials auth
- React Hook Form + Zod
- Resend-compatible email layer
- shadcn-style UI primitives + Radix building blocks

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

## Seeded Admin Access

- Email: `admin@sandbox.bd`
- Password: `sandbox-admin-2026`

If no database is configured, the same credentials still unlock the demo admin experience through the fallback auth path.

## Notes

- Public pages are content-rich and brand-aligned around a premium founder ecosystem, not an academic/course brand.
- The founder application API saves submissions to Prisma when `DATABASE_URL` is available and still returns a polished flow when it is not.
- Transactional email rendering is configured in `lib/email.tsx`; actual sends occur only when `RESEND_API_KEY` is present.
- Admin pages currently include working structure, sample analytics fallback, and data hooks ready for deeper CRUD expansion.

## Verification

- `npm run build`
- `npm run lint`

# sandbox

# sandbox
