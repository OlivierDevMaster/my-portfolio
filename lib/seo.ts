import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

/**
 * The URL path of a page in a locale. English has no prefix ("/about"),
 * French does ("/fr/about"), matching `localePrefix: "as-needed"`.
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  if (locale === routing.defaultLocale) return clean || "/";
  return `/${locale}${clean}`;
}

/**
 * Canonical URL plus hreflang alternates for a page that exists in every
 * locale. Paths are relative; `metadataBase` in the layout makes them absolute.
 */
export function alternatesFor(
  locale: Locale,
  path: string
): Metadata["alternates"] {
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, localePath(item, path)])
  );

  return {
    canonical: localePath(locale, path),
    languages: {
      ...languages,
      "x-default": localePath(routing.defaultLocale, path),
    },
  };
}
