# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # dev server on http://localhost:3000
npm run lint    # next lint (next/core-web-vitals + next/typescript)
npx tsc --noEmit  # type-check
```

Do not run `npm run build` (production build) unless asked; verify changes with lint and `tsc --noEmit`. There is no test suite. Both `package-lock.json` and `yarn.lock` are committed; npm is the documented default.

## Stack

Next.js 14 App Router, React 18, TypeScript (strict), Tailwind CSS 3 with shadcn/ui (`new-york` style, see `components.json`), `motion` (Framer Motion, imported from `motion/react`) for animation, `lucide-react` for icons. Path alias `@/*` maps to the repo root.

## Architecture

A static personal portfolio. There is no backend, database or API route; all content is hard-coded.

- **Routes** live in `app/<route>/page.tsx` (home, about, projects, blog, resume, contact). Each page is a Server Component that exports its own `metadata` and holds its content as local constant arrays at the top of the file (e.g. the `projects: Project[]` list in `app/page.tsx`). To change site content, edit those arrays.
- **Layout**: `app/layout.tsx` renders the skip link, `<Navbar />` and `<Footer />` for every page and sets up fonts. Pages render only `<main id="main">` content.
- **Site-wide data** lives in `lib/site.ts`: `CONTACT_EMAIL`, `CV_PATH`, `navItems` (used by the navbar, mobile menu and footer) and `socialLinks`. Change these there, not in components.
- **Conversion path**: every "Let's talk / Start a project" CTA links to `/contact`. Pages end with the shared `components/contact-cta.tsx` (props let you change the label, title, body and the CV button).
- **Client components** are kept few and isolated: `components/navbar.tsx` (desktop links, mobile full-screen menu, scroll lock, Escape to close), `components/hero.tsx` (scroll fade on the portrait; the entrance animation is CSS via `tailwindcss-animate` so the hero shows before hydration), `app/contact/contact-form.tsx` and `app/contact/copy-email.tsx`.
- **No real form submission**: the contact form builds a `mailto:` link to `CONTACT_EMAIL`; the contact page also shows the address with a copy button as a fallback.
- **Honest content states**: projects without a public URL render as non-clickable rows marked "Private"; notes/blog posts are not written yet and are shown as "In progress", not links. Don't add links or arrow icons to things that aren't clickable.
- **Projects** are the exception to page-local content: `lib/projects.ts` holds `currentProjects` (home "Current work" and the projects page "Now" group) and `pastProjects` (projects page "Earlier"), both rendered by `components/project-row.tsx`. Projects with `url: null` show as "Private".
- **Shared code**: `lib/utils.ts` (`cn()` helper for shadcn), `components/ui/` (shadcn primitives: `button`, `badge`).
- **Static assets** (project screenshots, `me.png`, the CV PDF `RASOLOMANANA_Herimanitra_Olivier.pdf`) are in `public/`.

## Styling conventions

- Fonts: Geist Sans/Mono (local, `app/fonts/`) are Tailwind's `font-sans`/`font-mono`; Inter Tight (Google) is `font-inter-tight` for headings, often with `font-light`.
- Recurring visual language: small uppercase `font-mono` labels with wide tracking, `text-violet-600` as the accent color (`<em className="italic text-violet-600">` highlights in headings), gray-200 borders.
- Accessibility floor: text no lighter than `text-gray-500` on white, labels at least `text-[11px]`, tap targets at least 44px, decorative icons `aria-hidden`, motion disabled under `motion-reduce`. A global violet `:focus-visible` ring is set in `app/globals.css`.
- Mobile first: sections use `py-16 md:py-40` and heading blocks `mb-10 md:mb-16/20`; check new sections at 390px width with no horizontal scroll.
- shadcn theme tokens are HSL CSS variables in `app/globals.css`, mapped in `tailwind.config.ts`. The config also defines a `marquee` animation.

## Product plan

`plan.md` describes the target site (pages, sections, design direction: minimalist, premium SaaS look, mobile-first, subtle animations). Check it before adding new sections.

## Cursor rules (`.cursor/rules/`)

- Prefer Server Components; keep `'use client'` to small, isolated components.
- Add loading and error states to anything that fetches data.
- Use semantic HTML.
- Don't leave TODOs or placeholders.
- Use kebab-case for all file names (`navbar.tsx`, `project-card.tsx`, `contact-form.tsx`); component identifiers stay PascalCase.
- The rule mentions Supabase, which this project does not use.
