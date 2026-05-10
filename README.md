# N-AI — Nancy Artificial Intelligence

> Data · Insights · AI — Neural Analytics & Intelligence.

A premium static marketing site for an executive AI / Data Intelligence consultancy. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion.

## Stack

- Next.js 14 + App Router (TypeScript, `src/` directory)
- Tailwind CSS 3.4 with a custom design-token layer
- Framer Motion (`motion/react`)
- Recharts (lazy-loaded)
- `lucide-react` icons
- `next/font` — Inter (UI) + Instrument Serif (editorial accents)

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

Other scripts:

```bash
pnpm build     # production build
pnpm start     # serve production build
pnpm lint      # next lint
pnpm format    # prettier with tailwind plugin
```

## Deploy

Push to a Git remote and import on [Vercel](https://vercel.com/new). No env vars, no auth, no DB. Static-friendly.

## Status

This repository is scaffolded in passes. Pass 1 ships the foundation (tokens, primitives, Nav, Footer, Hero). Subsequent passes deliver the rest of the marketing sections, charts, polish.

See `DESIGN_NOTES.md` for tokens, motion language and content model.
