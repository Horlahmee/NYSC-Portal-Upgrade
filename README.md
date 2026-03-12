# NYSC Portal Upgrade

A modern, full-stack rebuild of the NYSC (National Youth Service Corps) portal built for scale, reliability, and great user experience.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), Tailwind CSS, React Query |
| Backend | NestJS, TypeScript |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Auth | JWT + Refresh Tokens + OTP |
| File Storage | Cloudinary (dev) / MinIO (prod) |
| Email | Resend |
| SMS | Termii |
| Payments | Remita |

## Project Structure

```
NYSC-Portal-Upgrade/
├── frontend/       # Next.js 14 app
├── backend/        # NestJS API
├── database/       # SQL schema & migrations
├── docs/           # Architecture docs
└── docker-compose.yml
```

## Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 16 (or use Docker)

### Development Setup

1. Clone the repo
```bash
git clone https://github.com/Horlahmee/NYSC-Portal-Upgrade.git
cd NYSC-Portal-Upgrade
```

2. Set up environment variables
```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

3. Start with Docker (recommended)
```bash
docker-compose up -d
```

4. Or start manually
```bash
# Terminal 1 - Backend
cd backend && npm install && npm run start:dev

# Terminal 2 - Frontend
cd frontend && npm install && npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Key Features

- **Corps Member Portal** — Registration, dashboard, payment, profile management
- **Payment Integration** — Remita RRR generation and verification
- **Course Correction** — Submit and track course correction requests
- **LGA Clearance** — Local government area clearance workflow
- **Admin Panel** — Full management dashboard for NYSC staff
- **Notifications** — Email and SMS alerts
- **Role-based Access** — Corps member, LGA officer, state coordinator, admin

## Environment Variables

See `.env.example` files in `frontend/` and `backend/` directories.

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add your feature'`
3. Push: `git push origin feature/your-feature`
4. Open a Pull Request

## License

MIT
