<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/e803e3f5-803b-4c6a-85a8-98ad1387d015

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

# SanskarVault

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vite](https://img.shields.io/badge/bundler-vite-yellow.svg)](https://vitejs.dev/)

A lightweight React + Vite application for managing study materials and PDFs. Uses Supabase for auth and storage.

**Features**

- User authentication (Supabase)
- Browse and bookmark resources
- View and manage PDFs
- Responsive UI with sidebar and mobile nav

**Quick Start**

Prerequisites:

- Node.js 18+ and npm
- A Supabase project (optional for local dev, some pages work without it)

Clone and install:

```bash
git clone https://github.com/xynextrixor/sanskarvault.git
cd sanskarvault
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Environment variables

- Copy `.env.example` to `.env` and provide Supabase URL and key if using Supabase.

Deployment

- This project is configured for Vercel. Push to GitHub and import the repo in Vercel for automatic deployments.

Project structure (high level):

- `src/` — React app
- `pages/` — route pages
- `lib/` — helpers (Supabase client, utils)

Mermaid architecture diagram:

```mermaid
flowchart LR
   A[User] --> B[Browser]
   B --> C[React (Vite) Frontend]
   C --> D[Supabase (Auth & Storage)]
   C --> E[Static assets]
```

Screenshots

- Add screenshots to `assets/` and reference them here for a visual walkthrough.

Contributing

- Fork the repo, create a feature branch, open a PR describing your changes.

License

- This project is licensed under the MIT License — see the `LICENSE` file for details.

Contact

- Maintainer: Anmol Singh (GitHub: xynextrixor)
