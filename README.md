# Assignment Planner

A React + TypeScript assignment tracking app built with Vite.

## Prerequisites

- Node.js (LTS recommended)
- npm

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL shown in your terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` — starts the app in development mode with hot reload.
- `npm run build` — runs strict TypeScript compile and creates a production build.
- `npm run preview` — previews the production build locally.
- `npm run test` — runs tests with Vitest and React Testing Library.

## Production Preview

To build and preview production output:

```bash
npm run build
npm run preview
```

## GitHub Actions CI + GitHub Pages Deploy

This repository now includes two workflows:

- CI workflow: [.github/workflows/ci.yml](.github/workflows/ci.yml)
	- runs on push to `main` and pull requests
	- installs dependencies, builds, and runs tests
- Pages deploy workflow: [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml)
	- runs on push to `main` (and manual dispatch)
	- builds with the correct GitHub Pages base path and deploys `dist/`

### One-Time GitHub Pages Setup

1. Push this repository to GitHub.
2. In your repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Ensure the default branch is `main`.

### Push and Deploy Flow

- Open a PR → CI runs (`build` + `test`).
- Merge/push to `main` → CI runs and Pages deploy runs.
- After deploy completes, your app is available at:
	- `https://<your-username>.github.io/assignmentPlanner/`

### Notes

- The deploy workflow builds with:

```bash
npm run build -- --base=/assignmentPlanner/
```

This ensures asset URLs resolve correctly on GitHub Pages project sites.
