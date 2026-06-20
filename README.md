# Web App

A React + TypeScript + Tailwind starter with a left-side navigation sidebar, a
home page with an About section, a Memes page, and a Comments page. No backend
yet — everything runs client-side.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Project structure

```
src/
  components/
    Sidebar.tsx     # left nav, present on every page
  pages/
    Home.tsx         # hero + About section (id="about")
    Memes.tsx         # placeholder meme grid
    Comments.tsx       # comment list + add-comment form (local state only)
  App.tsx              # routes
  main.tsx             # entry point, wraps App in BrowserRouter
  index.css            # Tailwind directives
tailwind.config.js      # color & font tokens
```

## How navigation works

- **Home** and **Memes** and **Comments** are real routes (`/`, `/memes`, `/comments`).
- **About** is not a separate route — it's a section on the Home page
  (`<section id="about">`). Clicking "About" in the sidebar scrolls to it if
  you're already on the home page, or navigates to `/` and then scrolls, if
  you're on another page.

## Design tokens

Colors and fonts live in `tailwind.config.js`:

- `paper` (#FBF6EE) — main background
- `ink` (#19181C) — body text
- `coral` (#FF5C39) — primary accent
- `mint` (#1FAE8E) — secondary accent
- `charcoal` (#15151A) — sidebar background

Fonts: Space Grotesk (display/headings), Inter (body), JetBrains Mono (labels/meta).

## Next steps (when you're ready for a backend)

- Persist comments (e.g. a small Node/Express API + SQLite, or a hosted DB)
- Real meme uploads/storage
- Auth, if you want named users instead of free-text names
