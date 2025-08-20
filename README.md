# rest-express

This is a cleaned export of your Replit project prepared for GitHub.

## Prerequisites
- Node.js 18+
- NPM/PNPM/Yarn

## Setup
```bash
npm install
cp .env.example .env  # fill in values
``

## Scripts
- `dev` → `NODE_ENV=development tsx server/index.ts`
- `build` → `vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist`
- `start` → `NODE_ENV=production node dist/index.js`
- `check` → `tsc`
- `db:push` → `drizzle-kit push`

## Dev
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Start
```bash
npm start
```

## Notes
- Generated `.env.example` from scanning source for `process.env.*`.
- Added a standard `.gitignore` for Node + Vite + env + Drizzle artifacts.

## GitHub Pages (no local build needed)
This repo is pre-configured to publish a static build to the `docs/` folder on every push to `main`.
After you upload this to GitHub:
1. Go to **Settings → Pages**.
2. Set **Source** to `Deploy from a branch`.
3. Select **Branch**: `main` and **Folder**: `/docs`.
4. Save. Your site will be live at your GitHub Pages URL.

The workflow file is at `.github/workflows/pages.yml`.
