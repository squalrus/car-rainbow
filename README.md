# Car Rainbow

A small single-page game: spot all six rainbow-colored cars and check them off. When every car is marked active, a "you did it" dialog appears with a replay button that increments a win counter and resets the board.

## Tech Stack

- **React 18** — function components with hooks (`useState`, `useEffect`)
- **Parcel 2** — zero-config bundler
- **Sass/SCSS** — partials composed in `style.scss`

## Getting Started

Install dependencies:

```sh
npm install
```

Run the dev server:

```sh
npm start
```

Build for production (outputs to `dist/`):

```sh
npm run build
```

## Structure

- `src/index.html` — page shell, loads `index.jsx` as a module
- `src/js/index.jsx` — mounts `<CarRainbow />` to `#app`
- `src/js/CarRainbow.jsx` — top-level state (colors, wins) and click handlers
- `src/js/Car.jsx` — individual car tile (button + checkbox)
- `src/js/GameStatus.jsx` — wins counter and progress bar
- `src/js/Replay.jsx` — `<dialog>` shown on completion with a "Play again" button
- `src/img/*.png` — car artwork per color
- `src/scss/*` — styling partials

## Deployment

Deployed to Azure Static Web Apps via GitHub Actions (`.github/workflows/azure-static-web-apps-*.yml`), building with `npm run build` and serving `dist/`, triggered on pushes/PRs to `main`.
