# Car Rainbow

A small single-page game: spot all six rainbow-colored cars and check them off. When every car is marked active, a "you did it" dialog appears with a replay button that increments a win counter and resets the board.

## Tech Stack

- **React 19** (`react`, `react-dom`) — function components with hooks (`useState`, `useEffect`), no router or state library; all state lives in `CarRainbow.jsx` and flows down via props
- **Parcel 2** — zero-config bundler; `npm start` runs the dev server, `npm run build` produces `dist/`
- **Sass/SCSS** (`@parcel/transformer-sass`) — partials under `src/scss/` (`_app`, `_button`, `_car`, `_car-rainbow`, `_dialog`, `_game-status`, `_heading`, `_layout`) composed in `style.scss`
- **Plain JS/JSX** — no TypeScript, no test runner, no linter config beyond Prettier (`.prettierrc`, 4-space width override for html/scss/js/jsx, single quotes, 250 print width)
- **Static HTML entry point** (`src/index.html`) — wires up the React root (`#app`) and includes Google Analytics (`gtag.js`)

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
