# Backlog

Potential bugs, improvements, and feature ideas for Car Rainbow. Ordered by value (H → M → L), then effort (S → L).

## Bugs

_No open bugs._

## Improvements

| Title | Effort | Value |
|-------|--------|-------|
| [No accessibility audit](#no-accessibility-audit) | M | H |
| [Add ESLint with React/hooks plugin](#add-eslint-with-reacthooks-plugin) | M | M |
| [Hardcoded GA tracking ID to env var](#hardcoded-ga-tracking-id-to-env-var) | S | M |
| [No error boundary](#no-error-boundary) | S | M |
| [No offline/PWA support](#no-offlinepwa-support) | L | M |

## Feature Ideas

| Title | Effort | Value |
|-------|--------|-------|
| [Settings menu (theme, difficulty, colors)](#settings-menu-theme-difficulty-colors) | L | H |
| [Difficulty levels / alternate sets](#difficulty-levels--alternate-sets) | L | M |
| [Parallax scenery background](#parallax-scenery-background) | M | M |
| [Shareable results](#shareable-results) | M | M |
| [Localization](#localization) | L | M |

## Open

### No accessibility audit

**Type:** improvement
**Why** — screen-reader and keyboard navigation not verified; a full a11y pass would ensure the game is usable for all players
**Notes:** check car button + checkbox pairing in Car.jsx; verify dialog focus trap and announcements; full keyboard support (tab/arrow keys)

### Add ESLint with React/hooks plugin

**Type:** improvement
**Why** — only Prettier formatting is configured today; ESLint with `eslint-plugin-react`/`eslint-plugin-react-hooks` would catch real bugs — like the direct state mutation in `carClick`/`replayClick` — automatically, before they ship
**Notes:** wire into an `npm run lint` script and CI; pair with `eslint-config-prettier` to avoid rule conflicts with the existing `.prettierrc`

### Hardcoded GA tracking ID to env var

**Type:** improvement
**Why** — the Google Analytics tracking ID is inlined in the `gtag.js` snippet in `src/index.html`; moving it to an environment variable would make it easy to point dev builds at a separate property (or disable analytics) without editing source
**Notes:** Parcel supports `.env` files; since `index.html` is static markup rather than JSX, this would need a small build-time substitution step

### No error boundary

**Type:** improvement
**Why** — there's no React error boundary around `<CarRainbow />`; an unexpected render error currently produces a blank page with no recovery path or user-facing message
**Notes:** add a small class-based `ErrorBoundary` (or lightweight library) wrapping the root render in `index.jsx`, showing a friendly fallback with a reload prompt

### Outdated browserslist data

**Type:** improvement
**Why** — the dev server logs a warning that `caniuse-lite` (used by Browserslist, which underpins Parcel's CSS/JS autoprefixing and target resolution) is outdated, which can cause builds to target stale browser versions
**Notes:** run `npx update-browserslist-db@latest` to refresh the `caniuse-lite` data; consider documenting this as a periodic maintenance task

### No offline/PWA support

**Type:** improvement
**Why** — the app requires a network connection on first load and offers no "install to home screen" experience; PWA support (manifest + service worker) would let players use it offline and pin it like a native app
**Notes:** add a web app manifest and a Parcel-compatible service worker plugin; cache the static bundle and car images for offline play

### Settings menu (theme, difficulty, colors)

**Type:** feature
**Why** — a unified settings interface lets players customize appearance (dark/light theme with device-preference detection), gameplay (easy = any order, hard = rainbow order only), and variety (extra color cars: black, white, pink, plus a "crazy pattern" variant); modern games expect settings, and this adds replayability and accessibility
**Notes:** the menu shell and theme switching (System/Light/Dark, persisted to `localStorage`, `prefers-color-scheme` fallback) shipped in v1.10.0, and the extra-colors toggle (black, white, brown, pink, silver, pattern — `EXTENDED_COLORS` in `src/js/colors.js`, persisted to `localStorage`, grows the board to 12 cars) shipped in v1.12.0 (`Settings.jsx`, `_settings.scss`, `_car-rainbow.scss`); remaining scope is difficulty mode (carClick logic to track/validate click order against `RAINBOW_COLORS`), which overlaps with [Difficulty levels / alternate sets](#difficulty-levels--alternate-sets)

### Difficulty levels / alternate sets

**Type:** feature
**Why** — currently there's exactly one fixed six-color board; difficulty levels (more cars, similar shades, time limits) or alternate sets would add replay variety for players who've mastered the base game
**Notes:** the color list now lives in `src/js/colors.js` (`{ id, name, hex }` entries consumed by `CarRainbow.jsx`), making it straightforward to swap in alternate sets; could combine with the brainstorm's seasonal/alternate-skins idea below

### Parallax scenery background

**Type:** feature
**Why** — the original "sound effects / animations" idea is now shipped (check/replay/win sounds and the rainbow progress border in v1.3.0, the staggered "drive-in" car entrance animation in v1.5.0); the one piece of that brainstorm still open is a subtly scrolling road/skyline backdrop, which would add depth and atmosphere to the play area without touching game mechanics
**Notes:** needs new art assets (road/skyline layers); animate via CSS `background-position` keyframes or layered `transform: translateX`; respect `prefers-reduced-motion` like the existing `car-drive-in` animation does; see the brainstorm entry below for the original framing alongside the now-shipped "drive-in" half

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
- **Seasonal/alternate skins** — swap the car art for trucks, boats, planes, or holiday-themed vehicles via a config-driven asset set (now straightforward to wire up since the color list lives in `src/js/colors.js`), letting the same mechanic support rotating themes/events.
- **Full keyboard & screen-reader pass** — tab/arrow-key navigation between cars, `aria-live` announcements on find/replay, and focus management on the `<dialog>`, turning the existing "no accessibility audit" note into concrete, shippable work.
- **Snapshot/share card** — render the completed rainbow board (plus win count) to a canvas image that can be downloaded or shared, giving players a tangible artifact of a win beyond the in-app dialog.

### Craziest idea: the One Big Rainbow

A real-time, planet-wide shared board: every visitor across the globe sees the *same* six cars, and the instant *anyone, anywhere* finds one, it lights up for *everyone* simultaneously (via a lightweight WebSocket/pub-sub backend). Finishing the rainbow becomes a collective act — thousands of strangers unknowingly cooperating to complete one giant, perpetually-resetting rainbow together, with a live counter showing how many times humanity has finished it. Equal parts beautiful and unhinged: it turns a 30-second solo diversion into an ambient, ongoing piece of internet performance art that nobody agreed to participate in.
