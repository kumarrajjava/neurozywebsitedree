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

## Deploy to GitHub Pages

The GitHub Actions workflow builds the client and deploys it to the project
Pages site whenever changes are pushed to `main`. The repository name is used
as the production asset base path, so bundled scripts, styles, and public
assets load correctly from the GitHub Pages project URL.

Before the first deployment, enable Pages in the repository's **Settings →
Pages** and set **Build and deployment → Source** to **GitHub Actions**. The
workflow deploys to the configured Pages site on each push to `main`. After a
successful deployment, open the Pages URL shown in **Settings → Pages** or in
the workflow deployment summary.

To reproduce the Pages production build locally in PowerShell:

```powershell
$env:VITE_BASE_PATH = "/neurozywebsitedree/"
npm run build
npm run preview
```

Open `http://localhost:4173/neurozywebsitedree/` to verify the production
build. Clear the override in the current PowerShell session with
`Remove-Item Env:VITE_BASE_PATH` when you are done.
