# Changelog

All notable changes to Car Rainbow are documented here. Versions follow [Semantic Versioning](https://semver.org/); dates reflect when each change landed on `main`.

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
