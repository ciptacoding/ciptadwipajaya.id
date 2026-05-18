# ciptadwipajaya.id

Personal portfolio of **I Gusti Ngurah Cipta Dwipajaya** — Software Engineer at Otorita Ibu Kota Nusantara (OIKN).

A single-page site focused on identity/entity SEO for the name *Cipta Dwipajaya*, built to be fully readable without JavaScript and progressively enhanced.

🔗 **Live:** [https://ciptadwipajaya.id](https://ciptadwipajaya.id)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, TypeScript
- **Styling:** Plain CSS (CSS custom properties) — no Tailwind, no CSS-in-JS
- **Fonts:** Syne, Space Grotesk, JetBrains Mono (via `next/font/google`)

## Getting Started

```bash
npm install      # install dependencies
npm run dev      # start dev server → http://localhost:3000
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run `next lint` |

## Project Structure

```
app/
  layout.tsx     # root layout, metadata, fonts, global chrome
  page.tsx       # the single page — stacks all sections + JSON-LD
  globals.css    # all styles (design system + responsive)
  sitemap.ts     # sitemap
  robots.ts      # robots.txt
components/      # Hero, About, Experience, Projects, Stack, Contact, …
public/          # static assets
```

The page stacks its sections in order: **Hero → About → Experience → Projects → Stack → Contact**. Interactivity (scroll reveal, stat counters, custom cursor, particles) is layered on top of server-rendered markup via `components/ClientEffects.tsx`.

## SEO

Identity details are kept in sync across `app/layout.tsx` (metadata), `app/page.tsx` (JSON-LD `Person` schema), `app/sitemap.ts`, and `app/robots.ts`. The canonical domain is `https://ciptadwipajaya.id`.

## License

© I Gusti Ngurah Cipta Dwipajaya. All rights reserved.
