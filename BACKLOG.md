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
| [Add ESLint with React/hooks plugin](#add-eslint-with-reacthooks-plugin) | M | M |
| [Hardcoded color list refactor](#hardcoded-color-list-refactor) | S | M |
| [Hardcoded GA tracking ID to env var](#hardcoded-ga-tracking-id-to-env-var) | S | M |
| [No error boundary](#no-error-boundary) | S | M |
| [No offline/PWA support](#no-offlinepwa-support) | L | M |
| [Simplify progress-counting logic](#simplify-progress-counting-logic) | S | L |

## Feature Ideas

| Title | Effort | Value |
|-------|--------|-------|
| [Settings menu (theme, difficulty, colors)](#settings-menu-theme-difficulty-colors) | L | H |
| [Difficulty levels / alternate sets](#difficulty-levels--alternate-sets) | L | M |
| [Parallax scenery background](#parallax-scenery-background) | M | M |
| [Dark mode](#dark-mode) | M | M |
| [Shareable results](#shareable-results) | M | M |
| [Localization](#localization) | L | M |

## Open

### Direct state mutation in carClick

**Type:** bug
**Why** — `carClick` spreads `data` but then mutates `updatedData.colors[index].active` directly before calling `setData`, mutating the array element in place; this relies on React re-rendering anyway and risks subtle bugs if React ever batches or bails out of updates differently
**Notes:** see `carClick` in `CarRainbow.jsx`; refactor to `colors.map((color, i) => i === index ? { ...color, active: !color.active } : color)` for a fully immutable update

### replayClick mutates nested array

**Type:** bug
**Why** — `replayClick` spreads `data` into `updatedData` and then reassigns `updatedData.colors` via `.map`; the surface result is correct, but mixing partial spreads with in-place reassignment across `carClick`/`replayClick` is inconsistent and easy to get wrong as the state shape grows
**Notes:** see `replayClick` in `CarRainbow.jsx`; align both handlers on the same fully-immutable update pattern (likely resolved together with [Direct state mutation in carClick](#direct-state-mutation-in-carclick))

### Direct DOM access bypassing React

**Type:** bug
**Why** — `carClick` and `replayClick` call `document.getElementById('replay').showModal()/.close()` directly, bypassing React's declarative model and depending on a global DOM id; this is fragile if the dialog were ever conditionally rendered, portal-ed, or duplicated
**Notes:** add a `ref` to the `<dialog>` in `Replay.jsx` and call `.showModal()/.close()` through it, or lift open/closed state into `data` and render the dialog declaratively

### gameData object recreated on every render

**Type:** bug
**Why** — `gameData` is a plain object literal defined inside the `CarRainbow` function body, so it's recreated on every render even though it only seeds the initial `useState`; this is wasted allocation and could mislead a reader into thinking it reflects live state
**Notes:** move `gameData` outside the component, or inline it as a lazy initializer: `useState(() => ({ wins: 0, colors: [...] }))`

### Add tests (Vitest + React Testing Library)

**Type:** improvement
**Why** — Playwright now covers end-to-end visual regression (`tests/visual.spec.js`), but there's still no unit/component coverage; adding tests would catch regressions in click/win logic and guard against mutation bugs at a finer grain than e2e screenshots can
**Notes:** start with core game mechanics (carClick, replayClick, win detection); consider snapshot tests for render output

### No accessibility audit

**Type:** improvement
**Why** — screen-reader and keyboard navigation not verified; a full a11y pass would ensure the game is usable for all players
**Notes:** check car button + checkbox pairing in Car.jsx; verify dialog focus trap and announcements; full keyboard support (tab/arrow keys)

### Add ESLint with React/hooks plugin

**Type:** improvement
**Why** — only Prettier formatting is configured today; ESLint with `eslint-plugin-react`/`eslint-plugin-react-hooks` would catch real bugs — like the direct state mutation in `carClick`/`replayClick` — automatically, before they ship
**Notes:** wire into an `npm run lint` script and CI; pair with `eslint-config-prettier` to avoid rule conflicts with the existing `.prettierrc`

### Hardcoded color list refactor

**Type:** improvement
**Why** — the six colors (`RAINBOW_COLORS` and the `gameData.colors` array in `CarRainbow.jsx`) are inlined in the component; extracting them to a constants/config module would make it simpler to add colors, support themes, or swap in alternate sets
**Notes:** create e.g. `src/js/colors.js` exporting the color list and hex values; [Difficulty levels / alternate sets](#difficulty-levels--alternate-sets) and the brainstorm's seasonal-skins idea both depend on this being decoupled first

### Hardcoded GA tracking ID to env var

**Type:** improvement
**Why** — the Google Analytics tracking ID is inlined in the `gtag.js` snippet in `src/index.html`; moving it to an environment variable would make it easy to point dev builds at a separate property (or disable analytics) without editing source
**Notes:** Parcel supports `.env` files; since `index.html` is static markup rather than JSX, this would need a small build-time substitution step

### No error boundary

**Type:** improvement
**Why** — there's no React error boundary around `<CarRainbow />`; an unexpected render error currently produces a blank page with no recovery path or user-facing message
**Notes:** add a small class-based `ErrorBoundary` (or lightweight library) wrapping the root render in `index.jsx`, showing a friendly fallback with a reload prompt

### No offline/PWA support

**Type:** improvement
**Why** — the app requires a network connection on first load and offers no "install to home screen" experience; PWA support (manifest + service worker) would let players use it offline and pin it like a native app
**Notes:** add a web app manifest and a Parcel-compatible service worker plugin; cache the static bundle and car images for offline play

### Simplify progress-counting logic

**Type:** improvement
**Why** — the active-car count is effectively recomputed in multiple places (the conic-gradient frame in `CarRainbow.jsx`, the `GameStatus` counter/progress bar, and the win check in `carClick`); consolidating into a single derived value would reduce duplication and the chance the pieces drift out of sync
**Notes:** compute `const activeCount = data.colors.filter((c) => c.active).length` once in `CarRainbow.jsx` and pass it down instead of recomputing per-consumer

### Settings menu (theme, difficulty, colors)

**Type:** feature
**Why** — a unified settings interface lets players customize appearance (dark/light theme with device-preference detection), gameplay (easy = any order, hard = rainbow order only), and variety (extra color cars: black, white, pink, plus a "crazy pattern" variant); modern games expect settings, and this adds replayability and accessibility
**Notes:** create a modal/panel component (button in header, Esc/backdrop to close); dark mode requires a parallel CSS theme or CSS variables; difficulty mode needs carClick logic to track and validate car-click order against RAINBOW_COLORS (store selected mode in state); extra colors need [Hardcoded color list refactor](#hardcoded-color-list-refactor) + color toggle state; persist all choices to localStorage; relates to and could eventually subsume existing [Dark mode](#dark-mode) and [Difficulty levels / alternate sets](#difficulty-levels--alternate-sets) items

### Difficulty levels / alternate sets

**Type:** feature
**Why** — currently there's exactly one fixed six-color board; difficulty levels (more cars, similar shades, time limits) or alternate sets would add replay variety for players who've mastered the base game
**Notes:** depends on [Hardcoded color list refactor](#hardcoded-color-list-refactor) to swap sets cleanly; could combine with the brainstorm's seasonal/alternate-skins idea below

### Parallax scenery background

**Type:** feature
**Why** — the original "sound effects / animations" idea is now shipped (check/replay/win sounds and the rainbow progress border in v1.3.0, the staggered "drive-in" car entrance animation in v1.5.0); the one piece of that brainstorm still open is a subtly scrolling road/skyline backdrop, which would add depth and atmosphere to the play area without touching game mechanics
**Notes:** needs new art assets (road/skyline layers); animate via CSS `background-position` keyframes or layered `transform: translateX`; respect `prefers-reduced-motion` like the existing `car-drive-in` animation does; see the brainstorm entry below for the original framing alongside the now-shipped "drive-in" half

### Dark mode

**Type:** feature
**Why** — the app currently has a single light theme; a dark mode toggle would improve comfort for players in low-light settings and is a commonly expected option
**Notes:** default to `prefers-color-scheme` with a manual override persisted via [Persistence to localStorage](#persistence-to-localstorage); needs a parallel dark palette across the SCSS partials

### Shareable results

**Type:** feature
**Why** — there's currently no way for a player to show off a win beyond the in-app dialog; a shareable result (emoji grid, snapshot image, or link) would encourage social sharing and return visits
**Notes:** see the brainstorm's "daily challenge" emoji-grid idea and "snapshot/share card" canvas-rendering idea below for two concrete directions

### Localization

**Type:** feature
**Why** — all UI text is hardcoded in English; localization would let the game reach non-English-speaking players and is common groundwork for any future expansion
**Notes:** extract strings to a translation resource (e.g. `react-intl` or a lightweight custom dictionary); prioritize locales based on analytics traffic

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
