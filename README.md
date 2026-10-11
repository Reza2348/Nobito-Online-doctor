# Nobito — Online Doctor & Appointment Platform

Nobito is a web application starter for a medical appointment and online-doctor service. The frontend is built with Next.js, React, TypeScript, and Tailwind CSS; the companion API uses Node.js, Express, MongoDB/Mongoose, and Supabase.

> **Marketplace preparation status:** This repository is being prepared for commercial distribution. Review the feature set, configure your own third-party services, and complete the production checklist before deploying. No medical, security, or marketplace approval is implied.

## Highlights

- Next.js App Router application with TypeScript
- Persian/RTL and Jalali-date utilities in the codebase
- Authentication flows using Supabase and OTP-related routes
- Admin area with role-oriented sections
- Doctor, clinic, consultant, and support-related application areas
- API integration through a configurable backend URL
- Support AI endpoint with request-size, message-size, history, and rate-limit controls
- Responsive web application structure

Feature availability may depend on the companion backend, Supabase schema, environment configuration, and services configured by the buyer. Verify each flow in a clean installation before representing it as production-ready.

## Technology

- Next.js / React / TypeScript
- Tailwind CSS
- Supabase Auth and database integration
- Axios
- Upstash Redis rate limiting
- OpenAI API for the support AI endpoint
- Companion Express API and MongoDB

## Requirements

- Node.js LTS compatible with the installed Next.js version
- npm
- A Supabase project for authentication/data features
- Companion Nobito API for backend-dependent screens
- Upstash Redis REST credentials for production rate limiting
- OpenAI API key if using the support AI endpoint

## Local setup

1. Clone or download the frontend source.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and fill in values from your own accounts.
4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000.

Build and lint checks:

```bash
npm run build
npm run lint
```

These checks must be run in the target environment before a commercial release.

## Environment variables

See `.env.example`. Never put private service-role keys, real user data, passwords, or production secrets in source control. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser; use only public/anon keys there.

## Companion backend

The frontend expects the API URL in `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:5000` for local development). Configure the companion backend separately and set this variable to its base URL.

## Production checklist

- Create fresh Supabase and MongoDB projects for the buyer.
- Configure redirect URLs, authentication providers, database tables, and policies.
- Configure production environment variables and a valid HTTPS API URL.
- Configure Upstash credentials; production rate limits should fail closed if not configured.
- Configure OpenAI billing and usage limits if AI support is enabled.
- Test sign-in/OTP, role-based access, API integration, and all key user journeys.
- Remove all demo/test data and verify there are no credentials in Git history or release archives.
- Review privacy, security, accessibility, and applicable healthcare/data-protection requirements.
- Review all third-party asset and dependency licenses before resale.

## License and support

No commercial license or support SLA is granted by this README. Set the sales license, update policy, and support scope before publishing a listing. Ensure you have the right to redistribute all code, fonts, icons, images, and other included assets.

## Marketplace listing draft

See [MARKETPLACE_LISTING.md](./MARKETPLACE_LISTING.md) for a draft product description and release checklist.
