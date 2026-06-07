# Car Rainbow

A small single-page game: spot all six rainbow-colored cars and check them off. When every car is marked active, a "you did it" dialog appears with a replay button that increments a win counter and resets the board.

## Tech Stack

- **React 19** (`react`, `react-dom`) — function components with hooks (`useState`, `useEffect`), no router or state library; all state lives in `CarRainbow.jsx` and flows down via props
- **Parcel 2** — zero-config bundler; `npm start` runs the dev server, `npm run build` produces `dist/`
- **Sass/SCSS** (`@parcel/transformer-sass`) — partials under `src/scss/` (`_app`, `_button`, `_car`, `_car-rainbow`, `_dialog`, `_game-status`, `_heading`, `_layout`) composed in `style.scss`
- **Plain JS/JSX** — no TypeScript, no linter config beyond Prettier (`.prettierrc`, 4-space width override for html/scss/js/jsx, single quotes, 250 print width)
- **Vitest + React Testing Library** (`vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`) — component/unit tests colocated with source as `*.test.jsx`
- **Playwright** (`@playwright/test`) — end-to-end visual regression tests under `tests/`
- **Static HTML entry point** (`src/index.html`) — wires up the React root (`#app`) and includes Google Analytics (`gtag.js`)

## Getting Started

Install dependencies:

```sh
npm install
```

Run the dev server:

```sh
npm run start
```

Build for production (outputs to `dist/`):

```sh
npm run build
```

## Testing

### Unit/component tests

Component and unit tests are colocated with the source as `*.test.jsx` (e.g. `src/js/CarRainbow.test.jsx`) and run with [Vitest](https://vitest.dev) and [React Testing Library](https://testing-library.com/react).

Run them once:

```sh
npm run test:unit
```

Or in watch mode while developing:

```sh
npm run test:unit:watch
```

### End-to-end visual regression tests

End-to-end visual regression tests live under `tests/` and run with [Playwright](https://playwright.dev). The test runner starts the dev server automatically.

Install browsers (first time only):

```sh
npx playwright install --with-deps chromium
```

Run the test suite:

```sh
npm test
```

If you intentionally change the UI, regenerate the baseline screenshots and review the diffs before committing:

```sh
npm run test:update-snapshots
```

## Structure

- `src/index.html` — page shell, loads `index.jsx` as a module
- `src/js/index.jsx` — mounts `<CarRainbow />` to `#app`
- `src/js/CarRainbow.jsx` — top-level state (colors, wins) and click handlers
- `src/js/Car.jsx` — individual car tile (button + checkbox)
- `src/js/GameStatus.jsx` — wins counter and progress bar
- `src/js/Replay.jsx` — `<dialog>` shown on completion with a "Play again" button
- `src/js/*.test.jsx` — Vitest + React Testing Library unit/component tests, colocated with the components they cover
- `src/img/*.png` — car artwork per color
- `src/scss/*` — styling partials
- `tests/*` — Playwright end-to-end visual regression tests and baseline snapshots

## Deployment

Deployed to Azure Static Web Apps via GitHub Actions (`.github/workflows/azure-static-web-apps-*.yml`). On every push and PR to `main`, the workflow runs the Playwright test suite, then — if it passes — builds with `npm run build` and serves `dist/`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for local setup, running the test suite, and PR guidelines.
