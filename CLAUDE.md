# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server (Next.js, http://localhost:3000)
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — run `next lint`

There is no test suite.

## Architecture

A single-page personal portfolio for I Gusti Ngurah Cipta Dwipajaya, built with Next.js 15 (App Router), React 19, and TypeScript. Styling is plain CSS — no Tailwind, no CSS-in-JS.

- **One route.** `app/page.tsx` is the entire site: it stacks the section components (`Navbar`, `Hero`, `About`, `Experience`, `Projects`, `Stack`, `Contact`, `Footer`) and mounts `ClientEffects`. There are no other pages.
- **Server-first, JS-optional.** Section content is server-rendered. Interactivity is layered on as *progressive enhancement* — the page is fully readable with JavaScript disabled. `components/ClientEffects.tsx` is the central client effect: it wires up scroll-reveal (IntersectionObserver on `.reveal` elements, which get an `.in` class), the chip stagger animation (`#chips`), and stat count-up animation. When adding animated sections, render the static markup server-side and hook the animation into `ClientEffects` rather than making the section itself a client component.
- **Client components** (those with `'use client'`): `ClientEffects`, `CustomCursor`, `ParticleCanvas`, `Loader`, plus `Hero`, `Projects`, `Experience`, `Navbar` where they need local interactivity. The rest are server components.
- **Global chrome** mounted once in `app/layout.tsx`, outside the page: `Loader`, `CustomCursor`, `ParticleCanvas`. The site uses a custom cursor — `body { cursor: none }` in `globals.css`.

## Styling

All styles live in `app/globals.css`. The design system is a set of CSS custom properties on `:root` (dark theme: `--bg`, `--cyan`, `--blue`, `--glow`, etc.) — reuse these variables instead of hardcoding colors. Fonts (`Syne`, `Space Grotesk`, `JetBrains Mono`) are loaded via `next/font/google` in `layout.tsx` and exposed as `--font-*` CSS variables.

## SEO

SEO is a primary concern of this project — much of the content is identity/entity optimization for the name "Cipta Dwipajaya". Keep these in sync when editing identity, job, or social details:

- `app/layout.tsx` — `metadata` (title, description, keywords, OpenGraph, Twitter) and `rel=me` links
- `app/page.tsx` — JSON-LD `Person` schema (`personSchema`)
- `app/sitemap.ts` and `app/robots.ts`

The canonical domain is `https://ciptadwipajaya.id`.

## Conventions

- Path alias `@/*` maps to the repo root (e.g. `@/components/Hero`).
- No semicolons, single quotes — match the existing files.
- `next.config.ts` sets security headers and long-lived caching for `/_next/static`; static assets live in `public/`.
