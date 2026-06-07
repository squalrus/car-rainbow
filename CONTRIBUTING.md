# Contributing to Car Rainbow

Thanks for your interest in improving Car Rainbow! This guide covers how to get the project running locally and how to validate your changes before opening a PR.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (bundled with Node)

## Local setup

Clone the repo and install dependencies:

```sh
git clone <repo-url>
cd car-rainbow
npm install
```

Run the dev server (hot-reloads on save):

```sh
npm run start
```

The app is served at `http://localhost:1234` by default.

Build a production bundle (outputs to `dist/`):

```sh
npm run build
```

## Running the test suite

The project has two layers of tests: Vitest unit/component tests and Playwright end-to-end visual regression tests.

### Unit/component tests

Component and unit tests live alongside the source as `*.test.jsx` (e.g. `src/js/CarRainbow.test.jsx`) and run with [Vitest](https://vitest.dev) and [React Testing Library](https://testing-library.com/react). They cover click/win logic and rendering at a finer grain than the Playwright suite.

Run them once:

```sh
npm run test:unit
```

Or in watch mode while developing:

```sh
npm run test:unit:watch
```

### End-to-end visual regression tests

The project uses [Playwright](https://playwright.dev) for end-to-end visual regression testing (`tests/visual.spec.js`). The test runner starts the dev server for you — no need to run `npm start` separately.

Install the Playwright browser binaries (first time only, or after upgrading `@playwright/test`):

```sh
npx playwright install --with-deps chromium
```

Run the suite:

```sh
npm test
```

This runs the tests against both a mobile (Pixel 7) and a desktop viewport, and:

- captures screenshots and compares them against the checked-in baselines in `tests/visual.spec.js-snapshots/`
- plays through a full game (clicking every car) and verifies the win dialog appears
- asserts the page never needs to scroll (the app is designed to fit within the device viewport)

### Updating snapshots

If your change intentionally affects the UI, the visual regression tests will fail against the old baselines. Regenerate them and review the new screenshots before committing — a diff in `tests/visual.spec.js-snapshots/` should always correspond to an intentional visual change:

```sh
npm run test:update-snapshots
```

## Before opening a PR

- Format your code with Prettier (`.prettierrc` is checked in; most editors will pick it up automatically)
- Run `npm run test:unit` and `npm test` and make sure both pass — CI runs the same suites and will block merges on failure
- **Bump the `version` in `package.json`** and add an entry to `CHANGELOG.md` for any change landing on `main` — the footer reads its version directly from `package.json`, so this keeps it accurate and traceable (see the "Versioning" section in `CLAUDE.md`)
