# Tech Portfolio

Personal portfolio built with React and Vite. It showcases experience and projects using data-driven cards and a responsive layout.

## Features

- React + Vite fast dev/build workflow
- Experience and projects rendered from JSON data
- Responsive layout optimized for desktop and mobile
- GitHub Pages deployment via GitHub Actions

## Project Structure

- `src/components/` – UI components
- `src/projects.json` – Project data
- `src/experience.json` – Experience data
- `src/index.css` – Global styles

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

The site is deployed to GitHub Pages using the workflow in `.github/workflows/main.yml`. Ensure the Pages source is set to the `gh-pages` branch (root folder).

## Customization

- Update project entries in `src/projects.json`
- Update experience entries in `src/experience.json`
- Edit layout and styles in `src/index.css` and `src/components/`
