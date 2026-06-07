# Backlog

Potential bugs, improvements, and feature ideas for Car Rainbow. Unprioritized; pulled from a review of the current codebase.

## Bugs

- **Direct state mutation in `CarRainbow.carClick`** — `updatedColor.colors[index].active = !...` mutates the nested color object/array in place before calling `setData`, relying on React re-rendering rather than producing a new object. Should use an immutable update (e.g. `colors.map(...)`) to avoid subtle re-render bugs. (`src/js/CarRainbow.jsx`)
- **`replayClick` mutates nested array via `.map` reassignment on a shallow copy** — works today, but combined with the `carClick` mutation above, the component is one refactor away from a stale-state bug. Worth fixing both together.
- **Direct DOM access bypassing React** — `document.getElementById('replay').showModal()/.close()` reaches outside React's declarative model and depends on a hardcoded global ID; a `ref` forwarded to the `<dialog>` would be more robust (e.g. survives multiple instances, avoids ID collisions). (`src/js/CarRainbow.jsx`, `src/js/Replay.jsx`)
- **`gameData` object is recreated on every render** — it's only used for the initial `useState` value but is redefined inside the component body each render; should be hoisted to a module-level constant or passed as a lazy initializer (`useState(() => gameData)`).

## Improvements

- **No tests** — there's no test runner or test files at all. Adding component/unit tests (e.g. Vitest + React Testing Library) would cover the click/win logic and guard against regressions like the mutation bug above.
- **No linting** — only Prettier formatting is configured. Adding ESLint with a React/hooks plugin (`eslint-plugin-react-hooks`) would catch issues like the direct state mutation automatically.
- **No persistence** — `wins` and in-progress selections reset on page reload. Persisting to `localStorage` (or similar) would let players keep their win streak across sessions.
- **Hardcoded color list** — the six colors live inline in `CarRainbow.jsx`. Extracting them to a constants/config module would make it easier to add colors, themes, or alternate car sets.
- **Hardcoded GA tracking ID** — the Google Analytics measurement ID (`G-GD9W8LVG28`) is inline in `src/index.html`. Moving it to an environment variable (Parcel supports `.env` files) would simplify swapping between dev/staging/prod and avoid leaking prod analytics during local development.
- **Duplicated progress-counting logic** — `GameStatus` recomputes `progress`/`max` with a manual `forEach`, which could be simplified with `colors.length` and `colors.filter((c) => c.active).length`.
- **No accessibility audit** — worth a pass with a screen reader to confirm the car button + status indicator pairing in `Car.jsx` reads sensibly, and that the `<dialog>` traps focus and announces correctly on completion.
- **No favicon or social preview metadata** — `src/index.html` has no `<link rel="icon">`, Open Graph, or Twitter Card tags, so shared links show no thumbnail/branding.
- **No offline/PWA support** — a manifest + service worker (Parcel has a PWA recipe) would let the game be installed/played offline.
- **No error boundary** — a thrown error anywhere in the tree currently blanks the page; a top-level error boundary with a friendly message would be a small, cheap improvement.

## Feature Ideas

- **Difficulty levels / alternate sets** — e.g. more colors, more cars per color, a timed mode, or a "find them in order" mode.
- **Sound effects / animations** — a small celebratory animation or chime when a car is found or the board is completed.
- **Dark mode** — respect `prefers-color-scheme` or add a manual toggle.
- **Shareable results** — a "share your win streak" button that builds a shareable link or image.
- **Localization** — externalize the UI strings (currently English-only) to support other languages.

## Brainstorm: 2026-06-07

A fresh pass looking for ideas that build on what's already shipped (the card redesign, sound effects, rainbow progress border, sticky mobile header) rather than repeating them.

- **Daily challenge mode** — seed the day's color order/positions from the date (Wordle-style), so everyone plays the same board each day and can compare; pairs naturally with a "share your result" emoji grid (e.g. 🟥🟧🟨🟩🟦🟪) that encodes find-order without spoiling the layout.
- **Achievements / streak tracking** — badges for things like "found all six in under 10 seconds," "7-day streak," or "found them in rainbow order"; persisted alongside the existing win counter (and the proposed `localStorage` persistence) to give long-term players something to chase.
- **Color-blind-friendly mode** — overlay each car with a distinct icon/letter/pattern in addition to color so the game remains solvable for players with color vision deficiencies; toggle alongside a future dark-mode setting.
- **Two-player race mode** — split the board (or mirror it) so two people on the same device (or two tabs synced via `BroadcastChannel`) race to find all six cars first; leans on the existing click/active-state model with minimal new mechanics.
- **"Drive-in" entrance animations & parallax scenery** — give cars a small slide/bounce-in animation on load and a subtly scrolling road/skyline background, building on the existing CSS-driven rainbow border and sound-effect work to make the board feel more alive without changing the core mechanic.
- **Seasonal/alternate skins** — swap the car art for trucks, boats, planes, or holiday-themed vehicles via a config-driven asset set (ties into the already-noted "hardcoded color list" refactor), letting the same mechanic support rotating themes/events.
- **Full keyboard & screen-reader pass** — tab/arrow-key navigation between cars, `aria-live` announcements on find/replay, and focus management on the `<dialog>`, turning the existing "no accessibility audit" note into concrete, shippable work.
- **Snapshot/share card** — render the completed rainbow board (plus win count) to a canvas image that can be downloaded or shared, giving players a tangible artifact of a win beyond the in-app dialog.

### Craziest idea: the One Big Rainbow

A real-time, planet-wide shared board: every visitor across the globe sees the *same* six cars, and the instant *anyone, anywhere* finds one, it lights up for *everyone* simultaneously (via a lightweight WebSocket/pub-sub backend). Finishing the rainbow becomes a collective act — thousands of strangers unknowingly cooperating to complete one giant, perpetually-resetting rainbow together, with a live counter showing how many times humanity has finished it. Equal parts beautiful and unhinged: it turns a 30-second solo diversion into an ambient, ongoing piece of internet performance art that nobody agreed to participate in.
