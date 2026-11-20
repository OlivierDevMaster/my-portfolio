import type { Localized } from "@/lib/projects";

export type Testimonial = {
  /** The client's words, as they wrote them (translated for the other locale). */
  quote: Localized;
  name: string;
  role: Localized;
  /** Project name as in lib/projects.ts, e.g. "Gando". */
  project: string;
};

/**
 * Real client quotes only, published with the client's permission. The home
 * page shows the testimonials section once this has at least one entry.
 */
export const testimonials: Testimonial[] = [];

/**
 * Invented quotes to preview the section's design while `testimonials` is
 * empty. Development only (`npm run dev`): never shown in production.
 */
export const exampleTestimonials: Testimonial[] = [
  {
    quote: {
      en: "We went from a Figma file to paying customers in eight weeks. Every week we had something working to click through, not a status update.",
      fr: "Nous sommes passés d’une maquette Figma à des clients payants en huit semaines. Chaque semaine, nous avions quelque chose de fonctionnel à tester, pas un simple point d’avancement.",
    },
    name: "Example client",
    role: { en: "Founder", fr: "Fondateur" },
    project: "Example project A",
  },
  {
    quote: {
      en: "He asked the questions our own team hadn't, and cut what didn't matter. The launch was the calmest we've had.",
      fr: "Il a posé les questions que notre propre équipe n’avait pas posées, et coupé ce qui ne comptait pas. Le lancement le plus serein que nous ayons connu.",
    },
    name: "Example client",
    role: { en: "Head of product", fr: "Responsable produit" },
    project: "Example project B",
  },
];
