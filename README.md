# Kotnala Consultancy Website + Strategy Call Platform

This repository now includes a complete two-part implementation:

- Next.js frontend experience for premium strategy-call booking
- PHP backend for OAuth, scheduling, Google Calendar events, and Google Meet creation

## Architecture

- Frontend: `src/app/book-call/page.tsx` + `src/components/forms/strategy-call-wizard.tsx`
- Frontend API client: `src/features/booking/booking-api.ts`
- Backend service: `php/`

## Booking Flow

1. User opens `/book-call`.
2. User authenticates with Google OAuth.
3. Profile is fetched from `/api/profile`.
4. User confirms phone, adds company details, timezone, and context.
5. Date and slot availability loads from `/api/calendar/availability`.
6. On confirm, backend validates slot and creates Google Calendar event + Meet link.
7. Invitations are sent to attendee and `office@kotnala.com`.
8. UI shows premium confirmation screen with meeting details.

## Environment

### Next.js (`.env`)

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_BOOKING_API_BASE_URL`
- analytics keys as needed

### PHP (`php/.env`)

Use `php/.env.example` and configure all Google + DB credentials.

## Local Development

### 1) Frontend

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

### 2) Backend

```bash
cd php
composer install
php -S 0.0.0.0:8080 -t public
```

Backend runs on `http://localhost:8080`.

### 3) Database

```sql
CREATE DATABASE kotnala_strategy_calls CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

```bash
mysql -u root -p kotnala_strategy_calls < php/database/schema.sql
```

## PHP API Endpoints

- `GET /auth/google`
- `GET /auth/callback`
- `POST /auth/logout`
- `GET /api/profile`
- `GET /api/timezones`
- `GET|POST /api/calendar/availability`
- `POST /api/book`
- `GET /api/booking`
- `POST /api/booking/cancel`
- `GET /api/settings`
- `GET /api/health`

## Google Setup Guides

- Backend setup: `php/README.md`
- Deployment guide: `php/DEPLOYMENT.md`
- Google Cloud setup: `php/GOOGLE_CLOUD_SETUP.md`

## Security Controls

- PDO prepared statements
- Session auth with HTTP-only cookies
- CSRF validation for mutable endpoints
- CORS allowlist
- Input validation
- Rate limiting

## Notes

- All scheduling is stored in UTC.
- User-facing slots are rendered in selected timezone.
- Google Calendar invitation handles timezone display per attendee locale.
# masterstroke
