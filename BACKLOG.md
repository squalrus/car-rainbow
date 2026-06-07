# Backlog

Potential bugs, improvements, and feature ideas for Car Rainbow. Ordered by value (H → M → L), then effort (S → L).

## Bugs

| Title | Effort | Value |
|-------|--------|-------|
| [Direct state mutation in carClick](#direct-state-mutation-in-carclick) | M | H |
| [replayClick mutates nested array](#replayclick-mutates-nested-array) | M | H |
| [Direct DOM access bypassing React](#direct-dom-access-bypassing-react) | M | H |
| [gameData object recreated on every render](#gamedata-object-recreated-on-every-render) | S | M |

## Improvements

| Title | Effort | Value |
|-------|--------|-------|
| [Add tests (Vitest + React Testing Library)](#add-tests-vitest--react-testing-library) | L | H |
| [No accessibility audit](#no-accessibility-audit) | M | H |
| [Persistence to localStorage](#persistence-to-localstorage) | M | H |
| [Add ESLint with React/hooks plugin](#add-eslint-with-reacthooks-plugin) | M | M |
| [Hardcoded color list refactor](#hardcoded-color-list-refactor) | S | M |
| [Hardcoded GA tracking ID to env var](#hardcoded-ga-tracking-id-to-env-var) | S | M |
| [No favicon or social preview metadata](#no-favicon-or-social-preview-metadata) | S | M |
| [No error boundary](#no-error-boundary) | S | M |
| [No offline/PWA support](#no-offlinepwa-support) | L | M |
| [Simplify progress-counting logic](#simplify-progress-counting-logic) | S | L |

## Feature Ideas

| Title | Effort | Value |
|-------|--------|-------|
| [Difficulty levels / alternate sets](#difficulty-levels--alternate-sets) | L | M |
| [Sound effects / animations](#sound-effects--animations) | M | M |
| [Dark mode](#dark-mode) | M | M |
| [Shareable results](#shareable-results) | M | M |
| [Localization](#localization) | L | M |

## Open

### Add tests (Vitest + React Testing Library)

**Type:** improvement
**Why** — Playwright now covers end-to-end visual regression (`tests/visual.spec.js`), but there's still no unit/component coverage; adding tests would catch regressions in click/win logic and guard against mutation bugs at a finer grain than e2e screenshots can
**Notes:** start with core game mechanics (carClick, replayClick, win detection); consider snapshot tests for render output

### No accessibility audit

**Type:** improvement
**Why** — screen-reader and keyboard navigation not verified; a full a11y pass would ensure the game is usable for all players
**Notes:** check car button + checkbox pairing in Car.jsx; verify dialog focus trap and announcements; full keyboard support (tab/arrow keys)

### Persistence to localStorage

**Type:** improvement
**Why** — wins counter and game state reset on reload; persisting to localStorage would preserve player progress and win streaks across sessions
**Notes:** store wins alongside potential future achievements/streaks; consider JSON serialization for nested state

## Brainstorm: 2026-06-07

A fresh pass looking for ideas that build on what's already shipped (the card redesign, sound effects, rainbow progress border, sticky mobile header) rather than repeating them.

- **Daily challenge mode** — seed the day's color order/positions from the date (Wordle-style), so everyone plays the same board each day and can compare; pairs naturally with a "share your result" emoji grid (e.g. 🟥🟧🟨🟩🟦🟪) that encodes find-order without spoiling the layout.
- **Achievements / streak tracking** — badges for things like "found all six in under 10 seconds," "7-day streak," or "found them in rainbow order"; persisted alongside the existing win counter (and the proposed `localStorage` persistence) to give long-term players something to chase.
- **Color-blind-friendly mode** — overlay each car with a distinct icon/letter/pattern in addition to color so the game remains solvable for players with color vision deficiencies; toggle alongside a future dark-mode setting.
- **Two-player race mode** — split the board (or mirror it) so two people on the same device (or two tabs synced via `BroadcastChannel`) race to find all six cars first; leans on the existing click/active-state model with minimal new mechanics.
- ~~**"Drive-in" entrance animations & parallax scenery**~~ — staggered slide/fade-in animation for car tiles shipped in v1.5.0 (`car-drive-in` keyframes, `_car.scss`/`Car.jsx`/`CarRainbow.jsx`), including a `prefers-reduced-motion` fallback and replay-on-reset. The parallax scenery half is still open — a subtly scrolling road/skyline background would need new art assets.
- **Seasonal/alternate skins** — swap the car art for trucks, boats, planes, or holiday-themed vehicles via a config-driven asset set (ties into the already-noted "hardcoded color list" refactor), letting the same mechanic support rotating themes/events.
- **Full keyboard & screen-reader pass** — tab/arrow-key navigation between cars, `aria-live` announcements on find/replay, and focus management on the `<dialog>`, turning the existing "no accessibility audit" note into concrete, shippable work.
- **Snapshot/share card** — render the completed rainbow board (plus win count) to a canvas image that can be downloaded or shared, giving players a tangible artifact of a win beyond the in-app dialog.

### Craziest idea: the One Big Rainbow

A real-time, planet-wide shared board: every visitor across the globe sees the *same* six cars, and the instant *anyone, anywhere* finds one, it lights up for *everyone* simultaneously (via a lightweight WebSocket/pub-sub backend). Finishing the rainbow becomes a collective act — thousands of strangers unknowingly cooperating to complete one giant, perpetually-resetting rainbow together, with a live counter showing how many times humanity has finished it. Equal parts beautiful and unhinged: it turns a 30-second solo diversion into an ambient, ongoing piece of internet performance art that nobody agreed to participate in.
