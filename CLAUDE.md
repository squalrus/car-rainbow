# Car Rainbow

A small single-page game: spot all six rainbow-colored cars and check them off. When every car is marked active, a "you did it" dialog appears with a replay button that increments a win counter and resets the board.

## Tech Stack

- **React 18** (`react`, `react-dom`) — function components with hooks (`useState`, `useEffect`), no router or state library; all state lives in `CarRainbow.jsx` and flows down via props
- **Parcel 2** — zero-config bundler; `npm start` runs the dev server, `npm run build` produces `dist/`
- **Sass/SCSS** (`@parcel/transformer-sass`) — partials under `src/scss/` (`_app`, `_button`, `_car`, `_car-rainbow`, `_dialog`, `_game-status`, `_heading`, `_layout`) composed in `style.scss`
- **Plain JS/JSX**, no TypeScript, no test runner, no linter config beyond Prettier (`.prettierrc`, 4-space width override for html/scss/js/jsx, single quotes, 250 print width)
- **Static HTML entry point** (`src/index.html`) wires up the React root (`#app`) and includes Google Analytics (`gtag.js`)
- **Deployment**: Azure Static Web Apps via GitHub Actions (`.github/workflows/azure-static-web-apps-*.yml`), building with `npm run build` and serving `dist/`, triggered on pushes/PRs to `main`

## Structure

- `src/index.html` — page shell, loads `index.jsx` as a module
- `src/js/index.jsx` — mounts `<CarRainbow />` to `#app`
- `src/js/CarRainbow.jsx` — top-level state (colors, wins) and click handlers
- `src/js/Car.jsx` — individual car tile (button + checkbox)
- `src/js/GameStatus.jsx` — wins counter and progress bar
- `src/js/Replay.jsx` — `<dialog>` shown on completion with a "Play again" button
- `src/js/Footer.jsx` — page footer displaying the current app version (read from `package.json`)
- `src/img/*.png` — car artwork per color
- `src/scss/*` — styling partials

## Versioning

- The app version shown in the UI footer (`Footer.jsx`) is read directly from `package.json`'s `version` field
- **Bump the `version` in `package.json` with every change** that lands on `main`, and add a corresponding entry to `CHANGELOG.md`, so the footer always reflects an accurate, traceable version

## Opportunities

- **No tests** — there's no test runner or any test files; adding component tests (e.g. with Vitest/React Testing Library) would catch regressions in the click/win logic
- **No linting** — only Prettier formatting is configured; adding ESLint (with a React/hooks plugin) would catch bugs like the direct state mutation in `CarRainbow.carClick` (`updatedColor.colors[index].active = ...` mutates the array in place before `setData`)
- **State mutation bug risk** — `carClick` and `replayClick` in `CarRainbow.jsx` spread the top-level object but mutate nested arrays/objects directly, relying on React re-rendering anyway; refactoring to immutable updates (e.g. `map`) would be more robust and idiomatic
- **Direct DOM access from React** — `document.getElementById('replay').close()/.showModal()` bypasses React's declarative model; a `ref` on the `<dialog>` would be more idiomatic and avoid relying on global IDs
- **No persistence** — `wins` and game progress reset on reload; `localStorage` could let players keep their win count across sessions
- **Hardcoded color list** — the six colors are inlined in `CarRainbow.jsx`; extracting to a constants/config module would simplify adding new colors or themes
- **No accessibility audit** — worth verifying the checkbox/button pairing in `Car.jsx` (two separate inputs triggering the same handler) is screen-reader friendly; consolidating to a single control may simplify markup and improve a11y
- **Analytics hardcoded in HTML** — the GA tracking ID is inline in `index.html`; moving it to an environment variable would ease swapping between dev/prod
