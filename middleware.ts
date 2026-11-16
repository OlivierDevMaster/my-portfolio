import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Picks the locale from the URL, then the NEXT_LOCALE cookie, then the
// browser's Accept-Language header (fr, fr-CA, fr-FR… → French; else English).
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and files with an extension (images, the CV PDF…).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
