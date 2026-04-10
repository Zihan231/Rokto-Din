# Rokto Din Client

Rokto Din is a bilingual (Bangla/English) blood donation platform for Bangladesh.  
This repository contains the Next.js frontend used for:

- finding blood donors by blood group and location
- donor registration, login, and password recovery
- secure donor dashboard features (profile, donation records, availability status, PDF export)

## Core Features

- Public donor search with filters:
  - blood group
  - division
  - district
- Bilingual UI with `next-intl` localization (`bn` default, `en` supported)
- Secure donor authentication via Next.js API proxy routes:
  - registration
  - login
  - logout
  - password recovery
  - protected dashboard routes
- Donor dashboard capabilities:
  - profile management and visibility status
  - donation record entry with validation
  - donation history with search, sort, and pagination
  - downloadable donation history PDF report
- Blood donation eligibility calculator with next eligible donation date, progress timeline, and validation rules
- Site statistics component displaying total donors and donations
- Responsive, accessible UI with Tailwind CSS, DaisyUI, and Framer Motion animations

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4 + DaisyUI 5
- next-intl
- Axios
- jsPDF + jspdf-autotable

## Project Structure

```text
src/
  app/
    [locale]/               # Localized routes
      (users-layout)/       # Public pages
      dashboard/            # Protected donor dashboard
    api/                    # Next.js API routes (proxy + auth helpers)
  components/               # UI sections and feature components
  hooks/                    # Auth context and axios clients
  i18n/                     # Locale routing and request config
  messages/                 # Translation files (bn.json, en.json)
```

## Getting Started

### 1. Prerequisites

- Node.js 20+
- npm 10+

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
BACKEND_URL=https://your-backend-url.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

Notes:

- `BACKEND_URL` is required for server-side proxy/auth routes under `src/app/api/*`.
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is only needed if you enable/use the custom ReCAPTCHA component.
- Public axios calls are currently hardcoded to `https://rokto-din-server.vercel.app` in `src/hooks/axios/useAxios.jsx`. Update that file if you want full environment-based switching.

### 4. Run Development Server

```bash
npm run dev
```

The app runs on `http://localhost:3001`.

## Scripts

- `npm run dev` - start dev server on port 3001
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run ESLint

## Internationalization

- Locales: `bn`, `en`
- Default locale: `bn`
- Locale-aware routes are managed with `next-intl` middleware and routing helpers in:
  - `src/i18n/routing.js`
  - `src/proxy.js`

## API and Authentication Architecture

- Secure client requests use `useAxiosSecure` (`/api` base URL).
- Next.js API routes forward requests to `BACKEND_URL` and pass JWT cookie to backend.
- Login and logout are handled by:
  - `src/app/api/auth/login/route.js`
  - `src/app/api/auth/logout/route.js`
- Generic backend proxy route:
  - `src/app/api/[...path]/route.js`

## Build and Production

```bash
npm run build
npm run start
```

For deployment, ensure:

- `BACKEND_URL` is set in your hosting environment
- secure cookie behavior matches your deployment domain and HTTPS setup

## Contributing

1. Create a feature branch.
2. Make focused changes with clear commit messages.
3. Run lint/build before opening a pull request.
