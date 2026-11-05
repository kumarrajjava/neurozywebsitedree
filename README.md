# Neurozy Voice-to-Website

Create a business website by describing your business in Hindi, Hinglish, or
English. The frontend is in `client/`; the Spring Boot API is in `server/`.

## Run locally

**Prerequisites:** Node.js 20.19+ and npm. Install the project dependencies
from the repository root:

```bash
npm install
npm run dev
```

Open the URL printed by Vite (by default, `http://localhost:3000`). The root
`npm run dev` command starts the voice-to-website client, not the separate
legacy frontend in the repository root. Port 3000 is intentionally strict:
if another process is already using it, stop that process rather than opening
a different site on a fallback port.

To run the Spring Boot API for `/api` requests, start it separately:

```bash
cd server
mvn spring-boot:run
```

## Build and check

Run these commands from the repository root:

```bash
npm run lint
npm run build
```

The production frontend output is generated in `client/dist/`.

## Deploy to Vercel

The repository is configured to deploy on Vercel when changes are pushed to
the connected Git branch. `vercel.json` sets the project root build command
and points Vercel at the client's production output in `client/dist`.

In Vercel, set the project's **Root Directory** to the repository root and use
the **Production** deployment environment for the `main` branch. Vercel will
install dependencies with `npm ci`, run the TypeScript check and production
build, and serve the single-page app with its client-side route fallback.

Verify the same production build locally with:

```bash
npm run lint
npm run build
npm run preview
```

Open `http://localhost:4173/` to check the built client.
