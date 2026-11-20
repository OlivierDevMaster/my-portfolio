import { Github, Linkedin, Twitter, type LucideIcon } from "lucide-react";

export const CONTACT_EMAIL = "herimanitraolivier@gmail.com";

export const CV_PATH = "/RASOLOMANANA_Herimanitra_Olivier.pdf";

/**
 * Booking page for the 20-minute intro call (Cal.com, Calendly…). It drives the
 * hero's main button and the contact page's "Book a call" tab. Set it to null
 * to hide booking: the hero then links to the contact form instead.
 */
export const BOOKING_URL: string | null =
  "https://cal.com/rasolomanana-olivier/20min";

/**
 * Public origin of the site, used for canonical URLs, the sitemap and social
 * previews. Set NEXT_PUBLIC_SITE_URL in the hosting settings (e.g.
 * https://example.com). On Vercel it falls back to the production domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/** Labels live in messages/<locale>/common.json under `nav.<key>`. */
export const navItems = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "resume", href: "/resume" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export const socialLinks: { label: string; href: string; icon: LucideIcon }[] = [
  {
    label: "GitHub",
    href: "https://github.com/RasolomananaOlivier",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rasolomanana-herimanitra-olivier",
    icon: Linkedin,
  },
  {
    label: "X / Twitter",
    href: "https://x.com/OlivierFullDev",
    icon: Twitter,
  },
];
