# 🌈 Car Rainbow 🌈

A small browser game: spot all six rainbow-colored cars and check them off the list. Once every car is marked, a "You did it!" dialog appears — hit **Play again** to reset the board and bump your win count.

## Tech Stack

- [React 18](https://react.dev/) for the UI
- [Parcel 2](https://parceljs.org/) for bundling and the dev server
- Sass/SCSS for styling

## Getting Started

Install dependencies:

```sh
npm install
```

Run the dev server:

```sh
npm start
```

Build for production (outputs to `dist/`):

```sh
npm run build
```

## Project Structure

- `src/index.html` — page shell and entry point
- `src/js/` — React components (`CarRainbow`, `Car`, `GameStatus`, `Replay`)
- `src/scss/` — Sass partials for styling
- `src/img/` — car artwork

## Deployment

Pushes and pull requests against `main` are built and deployed to Azure Static Web Apps via the GitHub Actions workflow in `.github/workflows/`.
