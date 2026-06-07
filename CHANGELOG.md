# Changelog

All notable changes to Car Rainbow are documented here. Versions follow [Semantic Versioning](https://semver.org/); dates reflect when each change landed on `main`.

## [1.9.0] - 2026-06-07

### Added

- Component-level unit test coverage with Vitest and React Testing Library (`vitest.config.js`, `src/js/test-setup.js`, `CarRainbow.test.jsx`, `Car.test.jsx`, `GameStatus.test.jsx`): exercises car-selection toggling, win detection, the replay/reset flow, win-count persistence, and rendering of `Car`/`GameStatus`, complementing the existing Playwright visual-regression suite; run via `npm run test:unit` (or `npm run test:unit:watch`)

## [1.8.0] - 2026-06-07

### Added

- A celebratory "popper" animation (`Popper.jsx`, `_popper.scss`): when all six cars are found, a burst of random rainbow and car emojis flies outward from the center of the screen and fades away, with a `prefers-reduced-motion` fallback that hides it entirely
- The win counter now persists across reloads via `localStorage` (`car-rainbow-wins` key in `CarRainbow.jsx`), so players keep their streak between visits
- A rainbow-arc favicon (`src/img/favicon.svg`) referenced from `index.html`

### Changed

- Removed the 🌈 emoji from the app header and the desktop heading logo for a slimmer, more compact look (`index.html`, `_app-header.scss`, `_heading.scss`)
- Widened the play area's `max-width` from `800px` to `1100px` so the board fills more of the screen on larger viewports instead of leaving empty side margins (`_layout.scss`)

## [1.7.0] - 2026-06-07

### Added

- A thin, mobile-first app-header bar (`.app-header`) with the logo and a settings button placeholder, replacing the old sticky header treatment so the game gets much more vertical space on phones (`src/index.html`, `_app-header.scss`)
- Playwright end-to-end visual regression tests (`tests/visual.spec.js`) covering the start screen, the win-dialog flow, and a no-page-scroll assertion, with checked-in baseline snapshots and `npm test` / `npm run test:update-snapshots` scripts
- A `test_job` in the Azure Static Web Apps GitHub Actions workflow that runs the Playwright suite on every push/PR and gates the build-and-deploy job on it passing
- `CONTRIBUTING.md` with local setup, test-running, and PR guidelines; expanded `README.md` with a "Testing" section

### Changed

- The app now fills the device viewport with no page scrolling: `body`/`html` use `100dvh` with `overflow: hidden`, and the header/container/card form a flex chain that fills the available height (`_layout.scss`, `_app.scss`)
- The car grid no longer relies on a width-driven `padding-top: 75%` aspect-ratio trick; cars now stretch to fill their grid cells via `grid-template-rows` + `flex: 1`, so the board adapts cleanly to any device aspect ratio without overflowing (`_car-rainbow.scss`, `_car.scss`)
- Raised `$breakpoint-desktop` from `400px` to `700px` — the old value misclassified many phones (e.g. 412px-wide devices) as "desktop," hiding the mobile header and showing the desktop heading instead (`style.scss`)
- The duplicate page heading (`.heading`) now only renders on desktop; the thin app-header covers that role on mobile, freeing more room for gameplay (`_heading.scss`)

## [1.6.0] - 2026-06-07

### Added

- SEO meta tags in `index.html`: a descriptive `<title>`, `meta description`/`keywords`/`robots`/`theme-color`, and Open Graph/Twitter Card tags so the game previews well when shared and ranks better in search results
- A `description` field in `package.json` summarizing the game

## [1.5.0] - 2026-06-07

### Added

- A staggered "drive-in" entrance animation for the car tiles (`car-drive-in` keyframes in `_car.scss`): each car slides in from the left and fades/scales into place, offset by its position via a `--car-index` custom property set in `Car.jsx`; disabled for users with `prefers-reduced-motion: reduce`
- The board now replays its entrance animation each time the game resets, by keying `Car` elements on `wins-index` in `CarRainbow.jsx` so React remounts the tiles on "Play again"

## [1.4.0] - 2026-06-07

### Added

- A small sticky `.app-header` bar (`_app-header.scss`) showing the rainbow logo at the top of the viewport on mobile, giving the page an app-like feel as you scroll

### Changed

- The full `.heading` logo (icon + title) is now hidden on mobile and only shown at the desktop breakpoint, since the compact `.app-header` takes over that role on narrow viewports

## [1.3.0] - 2026-06-07

### Added

- Sound effects via the Web Audio API (`src/js/sound.js`): a tone plays when a car is checked/unchecked or the board is replayed, and a short victory melody plays when all six cars are found
- A rainbow border (`.app-frame`) wraps the app card and fills in segment by segment, in each car's matching color, as that car is checked off

### Changed

- Shrank the header title/icon/info text sizes on mobile (`_heading.scss`) so "Car Rainbow" fits comfortably on narrow phone viewports
- Restructured `_app.scss`/`CarRainbow.jsx` to wrap the white `.app-card` surface in a new `.app-frame` that renders the progress-driven rainbow border

## [1.2.0] - 2026-06-07

### Changed

- Full visual redesign: introduced a shared design-token palette (surface/background colors, radii, shadows, transitions) in `style.scss` and rebuilt every partial around it
- `_layout.scss`/`_app.scss` now wrap the game in a soft gradient backdrop and an elevated white card with rounded corners
- `_game-status.scss` turns the wins/progress stats into rounded chips with a rainbow-gradient progress bar
- `_car.scss` reworks car tiles into hoverable, lift-on-hover cards with a circular checkmark badge that scales in on selection, replacing the oversized emoji overlay
- `_button.scss` and `_dialog.scss` get gradient buttons with hover/press feedback and a rounded, elevated "you did it" modal
- `_heading.scss`/`_footer.scss` tightened spacing to fit the new card-based layout, and removed the now-unused fixed viewport-height tokens

## [1.1.0] - 2026-06-07

### Changed

- Redesigned the header: shrank `.heading` to a more compact height, restyled the title as a gradient-text logo (`heading__logo`/`heading__icon`/`heading__title`) set in the new "Baloo 2" Google Font, and reworked `_heading.scss` to leave room for an upcoming settings button

## [1.0.0] - 2026-06-06

### Added

- `README.md` with a project overview, tech stack summary, setup instructions, and structure guide (#5)

### Changed

- Bumped `react`/`react-dom` to 19.x and refreshed `package-lock.json` (#5)
- Tweaked `Car` and `Replay` markup/styles and `index.html` (#5)

## [0.4.0] - 2026-06-06

### Added

- `CLAUDE.md` documenting the tech stack and a list of improvement opportunities for future work (#4)

## [0.3.0] - 2023-01-17

### Changed

- Optimized layout and styling for mobile devices: adjusted `Car`, `CarRainbow`, and `Replay` markup, reworked `_app`, `_button`, `_car`, `_car-rainbow`, `_game-status`, and `_layout` styles, added `_heading.scss`, and renamed `_modal.scss` to `_dialog.scss` (#3)

## [0.2.1] - 2023-01-10

### Added

- Google Analytics tracking via `gtag.js` in `index.html` (#2)

## [0.2.0] - 2023-01-09

### Added

- Replay flow: a win counter, a "You did it!" dialog with a "Play again" button, and supporting `_button`, `_game-status`, and `_modal` styles (#1)

## [0.1.0] - 2023-01-09

### Added

- Initial release: the core game — six rainbow-colored car tiles that toggle active/inactive on click, with a progress indicator
- Azure Static Web Apps GitHub Actions deployment workflow, triggered on pushes/PRs to `main`
