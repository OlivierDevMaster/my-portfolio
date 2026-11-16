import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  // English lives at "/", French at "/fr". A French browser is sent to
  // "/fr" on its first visit; every other language falls back to English.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
