# Changelog

All notable changes to Car Rainbow are documented here. Versions follow [Semantic Versioning](https://semver.org/); dates reflect when each change landed on `main`.

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
