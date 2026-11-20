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

Next.js 14 App Router, React 18, TypeScript (strict), next-intl 4 (EN/FR), Tailwind CSS 3 with shadcn/ui (`new-york` style, see `components.json`), `motion` (Framer Motion, imported from `motion/react`) for animation, `lucide-react` for icons. Path alias `@/*` maps to the repo root.

## Architecture

A static personal portfolio. There is no backend, database or API route; all content is hard-coded.

- **i18n (next-intl)**: English at `/`, French at `/fr/...` (`localePrefix: "as-needed"` in `i18n/routing.ts`). `middleware.ts` sends French browsers to `/fr` (URL, then `NEXT_LOCALE` cookie, then `Accept-Language`); every other language gets English. The navbar has an EN/FR switcher. Import `Link`, `usePathname`, `useRouter` from `@/i18n/navigation`, never from `next/link` / `next/navigation`.
- **Routes** live in `app/[locale]/<route>/page.tsx` (home, about, projects, blog, blog/[slug], resume, contact). Each page is a Server Component that calls `setRequestLocale(locale)`, exports `generateMetadata`, and reads its text with `getTranslations("<page>")`. Client components use `useTranslations`.
- **Translations** live in `messages/<locale>/<namespace>.json` (one file per page plus `common.json`), loaded in `i18n/request.ts`. Every key must exist in both `en` and `fr`. Violet `<em>` highlights in headings use `t.rich("key", { em })` with `<em>…</em>` in the message; arrays of items use `t.raw`. To change site content, edit the JSON in both languages.
- **Layout**: `app/[locale]/layout.tsx` sets `<html lang>`, renders the skip link, `<Navbar />` and `<Footer />` inside `NextIntlClientProvider`, and sets up fonts. Pages render only `<main id="main">` content.
- **Site-wide data** lives in `lib/site.ts`: `CONTACT_EMAIL`, `CV_PATH`, `BOOKING_URL` (intro-call booking page; `null` hides booking and the hero falls back to "Start a project" → `/contact`), `SITE_URL` (from `NEXT_PUBLIC_SITE_URL`, else Vercel's production URL, else localhost), `navItems` (keys whose labels are in `common.json` under `nav`) and `socialLinks`. Change these there, not in components.
- **Conversion path**: every "Let's talk / Start a project" CTA links to `/contact`. Pages end with the shared `components/contact-cta.tsx`: a dark panel with a booking card (or a "Send a brief" card when `BOOKING_URL` is null), an email card with a copy button (`components/copy-email-button.tsx`, client), a brief link and the CV download. Props let you change the label, title, body and the CV link; `<em>` in titles is recoloured violet-300 on the dark background.
- **Client components** are kept few and isolated: `components/navbar.tsx` (desktop links, mobile full-screen menu, scroll lock, Escape to close), `app/[locale]/contact/contact-options.tsx` ("Book a call / Send a brief" tabs; `/contact#brief` opens the brief), `contact-form.tsx` and `copy-email.tsx`. The hero is a Server Component: its entrance is CSS (`tailwindcss-animate`) and the portrait's scroll fade is a CSS scroll-driven animation (`.hero-portrait` in `globals.css`).
- **No real form submission**: the contact form builds a `mailto:` link to `CONTACT_EMAIL` (budget and start date are added for freelance inquiries); the contact page also shows the address with a copy button as a fallback.
- **SEO**: `metadataBase` is set in the locale layout; every page's `generateMetadata` returns `alternates: alternatesFor(locale, "/path")` (`lib/seo.ts`, canonical + hreflang en/fr/x-default) — add it to new pages. `app/sitemap.ts` lists every page and post in both locales (add new static routes to its `pages` list), `app/robots.ts` points to it, and `app/[locale]/opengraph-image.tsx` generates the 1200×630 social preview from the hero title. The middleware skips `opengraph-image`. The home page also emits Person JSON-LD.
- **Honest content states**: projects without a public URL render as non-clickable rows marked "Private". Only finished posts are listed; never add "In progress" placeholders. Don't add links or arrow icons to things that aren't clickable.
- **Blog posts** are typed TS objects (`Post` in `lib/posts.ts`): English in `content/posts/<name>.ts`, French in `content/posts/fr/<name>.ts` with the same export name and slug. Register both in `postsByLocale`. Bodies are blocks (`p`, `h2`, `list`, `code`, `note`) rendered by `components/post-body.tsx`; rows by `components/post-row.tsx`.
- **Projects**: `lib/projects.ts` holds `currentProjects` (home "Selected work" and the projects page "Now" group) and `pastProjects` (projects page "Earlier"), both rendered by `components/project-row.tsx`. `tag`, `description`, `linkLabel` and the optional `outcome` (one real, checkable result, shown on the row) are `{ en, fr }` objects. Projects with `url: null` show as "Private".
- **Testimonials**: real client quotes only, in `lib/testimonials.ts`; the home section (`components/testimonials-section.tsx`) is hidden while the list is empty.
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
