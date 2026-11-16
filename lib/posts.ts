import type { Locale } from "@/i18n/routing";
import { accessibilityFloor } from "@/content/posts/accessibility-floor";
import { oneBackendWebAndMobile } from "@/content/posts/one-backend-web-and-mobile";
import { prototypeToProduction } from "@/content/posts/prototype-to-production";
import { rlsChecklist } from "@/content/posts/rls-checklist";
import { stripeWebhooks } from "@/content/posts/stripe-webhooks";
import { whenCodeIsCheap } from "@/content/posts/when-code-is-cheap";
import { accessibilityFloor as accessibilityFloorFr } from "@/content/posts/fr/accessibility-floor";
import { oneBackendWebAndMobile as oneBackendWebAndMobileFr } from "@/content/posts/fr/one-backend-web-and-mobile";
import { prototypeToProduction as prototypeToProductionFr } from "@/content/posts/fr/prototype-to-production";
import { rlsChecklist as rlsChecklistFr } from "@/content/posts/fr/rls-checklist";
import { stripeWebhooks as stripeWebhooksFr } from "@/content/posts/fr/stripe-webhooks";
import { whenCodeIsCheap as whenCodeIsCheapFr } from "@/content/posts/fr/when-code-is-cheap";

/** One piece of an article body. `text` supports `inline code` in backticks. */
export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; lang: string; code: string }
  | { type: "note"; text: string };

export type Post = {
  /** Same slug in every language, so /blog/x and /fr/blog/x are the same post. */
  slug: string;
  title: string;
  /** One-line summary shown in lists and as the meta description. */
  description: string;
  category: string;
  /** ISO date, e.g. "2026-11-16". */
  date: string;
  /** Name of the project in `lib/projects.ts` this post draws on, if any. */
  project?: string;
  blocks: PostBlock[];
};

const newestFirst = (list: Post[]) =>
  [...list].sort((a, b) => b.date.localeCompare(a.date));

/** Published posts per language, newest first. Keep the lists in sync. */
const postsByLocale: Record<Locale, Post[]> = {
  en: newestFirst([
    whenCodeIsCheap,
    prototypeToProduction,
    stripeWebhooks,
    oneBackendWebAndMobile,
    accessibilityFloor,
    rlsChecklist,
  ]),
  fr: newestFirst([
    whenCodeIsCheapFr,
    prototypeToProductionFr,
    stripeWebhooksFr,
    oneBackendWebAndMobileFr,
    accessibilityFloorFr,
    rlsChecklistFr,
  ]),
};

export function getPosts(locale: Locale): Post[] {
  return postsByLocale[locale];
}

export function getPost(locale: Locale, slug: string): Post | undefined {
  return postsByLocale[locale].find((post) => post.slug === slug);
}

/** Every slug, for static generation. */
export const postSlugs = postsByLocale.en.map((post) => post.slug);

const WORDS_PER_MINUTE = 220;

export function readingMinutes(post: Post): number {
  const text = post.blocks
    .map((block) => {
      if (block.type === "list") return block.items.join(" ");
      if (block.type === "code") return block.code;
      return block.text;
    })
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function formatPostDate(date: string, locale: Locale): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(
    locale === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }
  );
}
