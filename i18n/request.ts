import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/** One JSON file per namespace, in messages/<locale>/<namespace>.json. */
const namespaces = [
  "common",
  "home",
  "about",
  "projects",
  "resume",
  "contact",
  "blog",
] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const entries = await Promise.all(
    namespaces.map(async (namespace) => [
      namespace,
      (await import(`../messages/${locale}/${namespace}.json`)).default,
    ])
  );

  return { locale, messages: Object.fromEntries(entries) };
});
