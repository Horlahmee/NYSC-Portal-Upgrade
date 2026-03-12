# NYSC Portal Upgrade — Project Context

## What This Is
A full-stack rebuild of the NYSC (National Youth Service Corps) portal as a portfolio project. Built for scale, real functionality, and great UX — targeting ~350,000 corps members per year.

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), Tailwind CSS, React Query, Zustand |
| Backend | NestJS, TypeScript |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Auth | JWT (15min) + Refresh Tokens (7d, httpOnly cookie) + OTP |
| File Storage | Cloudinary |
| Email | Resend |
| SMS | Termii |
| Payments | Remita |

## Project Structure
```
NYSC-Portal-Upgrade/
├── frontend/         # Next.js 14 App Router
│   └── src/
│       ├── app/
│       │   ├── page.tsx                  # Public landing page
│       │   ├── (auth)/login/             # Login page
│       │   ├── (auth)/register/          # Register page
│       │   └── (portal)/                 # Protected corps member area
│       │       ├── layout.tsx            # Sidebar + header layout
│       │       ├── dashboard/            # Main dashboard
│       │       ├── payment/              # Payment + RRR generation
│       │       ├── course-correction/    # Correction requests
│       │       └── lga-clearance/        # LGA clearance tracking
│       ├── components/
│       │   ├── auth/                     # LoginForm, RegisterForm
│       │   ├── dashboard/                # All dashboard widgets
│       │   └── layout/                   # Sidebar, Header, Providers
│       ├── lib/api.ts                    # Axios client with JWT auto-refresh
│       └── types/index.ts                # All TypeScript types
│
├── backend/          # NestJS API
│   └── src/
│       ├── main.ts                       # Entry point, Swagger, CORS, helmet
│       ├── app.module.ts                 # Root module
│       ├── auth/                         # JWT, refresh tokens, OTP, strategies
│       ├── users/                        # User entity + service
│       ├── payments/                     # Remita RRR generation + verification
│       ├── corrections/                  # Course correction CRUD
│       ├── clearance/                    # LGA clearance workflow
│       ├── notifications/                # Email (Resend) + SMS (Termii)
│       └── admin/                        # Admin stats (Phase 3)
│
├── database/
│   └── schema.sql                        # Full PostgreSQL schema
└── docker-compose.yml                    # App + PostgreSQL + Redis
```

## Database Tables
users, corps_members, staff, service_years, states, lgas, institutions,
payments, payment_audit_log, course_corrections, lga_clearances,
disciplinary_cases, case_events, documents, notifications,
audit_logs, refresh_tokens, otps

## API Endpoints Built So Far
| Module | Endpoints |
|---|---|
| auth | POST /api/v1/auth/register, /login, /verify-otp, /refresh, /logout — GET /me |
| users | GET /api/v1/users/profile |
| payments | POST /generate-rrr, GET /verify/:rrr, GET /history |
| corrections | POST /, GET /mine, PATCH /:id/review |
| clearance | GET /status, PATCH /:id |
| admin | GET /stats |

## What's Done
- [x] Full project scaffold (frontend + backend + database)
- [x] Next.js landing page, login, register pages
- [x] Corps member portal layout (sidebar + header)
- [x] Dashboard with stats, quick actions, recent activity, member card
- [x] Payment page with history table and RRR generator UI
- [x] Course correction form + history
- [x] LGA clearance step tracker
- [x] NestJS backend with all modules scaffolded
- [x] JWT auth with refresh token rotation + account lockout
- [x] Remita payment integration (generate RRR + verify)
- [x] Notifications service (email + SMS)
- [x] Full PostgreSQL schema with indexes and triggers
- [x] Docker Compose for local development

## What Still Needs to Be Built
### Phase 2 — Wire Frontend to Backend
- [ ] Connect login/register forms to real API (`/api/v1/auth/*`)
- [ ] Auth state management with Zustand store
- [ ] Protected route middleware (redirect to login if no token)
- [ ] Dashboard fetching real data from API
- [ ] Payment flow end-to-end (generate RRR → pay on Remita → verify)
- [ ] Course correction form submitting to API
- [ ] LGA clearance status from API

### Phase 3 — Admin Panel
- [ ] Admin dashboard page (`/admin/dashboard`)
- [ ] Member search and management
- [ ] Batch/stream management
- [ ] Correction request review queue
- [ ] LGA clearance approval workflow
- [ ] Reports and CSV export

### Phase 4 — Polish
- [ ] Mobile responsive improvements
- [ ] Loading skeletons
- [ ] Error boundary components
- [ ] End-to-end testing
- [ ] Deployment setup (Vercel + Railway/Supabase)

## Environment Setup
```bash
# Start everything locally
docker-compose up -d

# Or manually:
cd backend && npm install && npm run start:dev   # http://localhost:4000
cd frontend && npm install && npm run dev         # http://localhost:3000

# API docs (dev only)
http://localhost:4000/api/docs
```

## Key Design Decisions
- **Refresh token rotation**: tokens stored as bcrypt hash in DB, delivered via httpOnly cookie
- **Account lockout**: 5 failed attempts = 15 minute lock
- **Rate limiting**: 3-tier (10/s, 50/10s, 200/min)
- **TypeORM with `synchronize: true`** in dev, migrations for production
- **NYSC green (#006400) + gold (#FFD700)** brand colors in Tailwind config
- **Free tier deployment**: Vercel (frontend) + Railway (backend) + Supabase (DB) = $0/month

## GitHub Repo
https://github.com/Horlahmee/NYSC-Portal-Upgrade
