import type { Locale } from "@/i18n/routing";

/** A string in every supported language. */
export type Localized = Record<Locale, string>;

export type Project = {
  name: string;
  tag: Localized;
  description: Localized;
  stack: string[];
  /** Public URL, or null when the project is private. */
  url: string | null;
  /** Text shown next to the link arrow, e.g. "Live" or "iOS". */
  linkLabel?: Localized;
  /** Shown for archived projects only. */
  year?: string;
};

const live: Localized = { en: "Live", fr: "En ligne" };

export const currentProjects: Project[] = [
  {
    name: "Gando",
    tag: { en: "Fintech · Rental deposits", fr: "Fintech · Dépôts de location" },
    description: {
      en: "Digital deposits for rental businesses. Operators send a deposit request, customers confirm it from their phone without the money leaving their account, and the operator can claim it if something goes wrong.",
      fr: "Des dépôts numériques pour les entreprises de location. L’opérateur envoie une demande de dépôt, le client la confirme depuis son téléphone sans que l’argent quitte son compte, et l’opérateur peut le réclamer en cas de problème.",
    },
    stack: ["Next.js", "Prisma", "Supabase", "Stripe"],
    url: "https://gando.app",
    linkLabel: live,
  },
  {
    name: "Cléo Network",
    tag: { en: "Marketplace · Real estate", fr: "Marketplace · Immobilier" },
    description: {
      en: "A private network of buyer mandates in Québec. Buyers describe what they want for free; real estate and mortgage brokers subscribe to reach qualified, often pre-approved buyers before marketing a property.",
      fr: "Un réseau privé de mandats d’acheteurs au Québec. Les acheteurs décrivent gratuitement ce qu’ils cherchent ; les courtiers immobiliers et hypothécaires s’abonnent pour joindre des acheteurs qualifiés, souvent préapprouvés, avant de mettre un bien en vente.",
    },
    stack: ["React", "TypeScript", "Supabase"],
    url: "https://cleonetwork.ca",
    linkLabel: live,
  },
  {
    name: "Kididraw",
    tag: { en: "EdTech · Kids 6–12", fr: "EdTech · Enfants 6–12 ans" },
    description: {
      en: "An online drawing school for children: small-group live classes, plus lessons, games, challenges and step-by-step drawings to practise at home.",
      fr: "Une école de dessin en ligne pour les enfants : des cours en direct en petits groupes, ainsi que des leçons, des jeux, des défis et des dessins étape par étape pour pratiquer à la maison.",
    },
    stack: ["Next.js", "Supabase", "Stripe", "Konva"],
    url: "https://kididraw.com",
    linkLabel: live,
  },
  {
    name: "Mallow",
    tag: { en: "Mobile app · Beauty booking", fr: "Application mobile · Réservation beauté" },
    description: {
      en: "A nail salon booking app: find salons nearby, compare services and reviews, and book an appointment in a few taps, with reminders.",
      fr: "Une application de réservation pour salons d’ongles : trouver un salon à proximité, comparer les services et les avis, et réserver un rendez-vous en quelques gestes, avec rappels.",
    },
    stack: ["React Native", "Expo", "Supabase", "Stripe"],
    url: "https://apps.apple.com/us/app/mallow-ton-rdv-manucure/id6753703986",
    linkLabel: { en: "iOS", fr: "iOS" },
  },
];

export const pastProjects: Project[] = [
  {
    year: "2025",
    name: "DevChronicles",
    tag: { en: "In development", fr: "En développement" },
    description: {
      en: "A technical writing space for product engineering notes, implementation lessons, and practical software decisions.",
      fr: "Un espace d’écriture technique pour des notes d’ingénierie produit, des leçons de mise en œuvre et des décisions logicielles concrètes.",
    },
    stack: ["Next.js", "Postgres"],
    url: null,
  },
  {
    year: "2024",
    name: "Fedhubs",
    tag: { en: "Consumer product", fr: "Produit grand public" },
    description: {
      en: "A restaurant discovery and booking product that helps people move from search to reservation without friction.",
      fr: "Un produit de découverte et de réservation de restaurants qui mène de la recherche à la réservation sans friction.",
    },
    stack: ["Flutter", "React", "Laravel"],
    url: "https://app.fedhubs.com",
    linkLabel: live,
  },
  {
    year: "2024",
    name: "Fedhubs Pro",
    tag: { en: "Operations platform", fr: "Plateforme d’opérations" },
    description: {
      en: "An operations workspace for restaurants to manage menus, bookings, and customer loyalty from one place.",
      fr: "Un espace de gestion pour les restaurants : menus, réservations et fidélisation de la clientèle, au même endroit.",
    },
    stack: ["Flutter", "Laravel", "MySQL"],
    url: "https://pro.fedhubs.com",
    linkLabel: live,
  },
  {
    year: "2023",
    name: "Prompt AI",
    tag: { en: "AI tooling", fr: "Outils IA" },
    description: {
      en: "A prompt discovery product for teams and creators who want reusable ideas for writing, design, and development workflows.",
      fr: "Un produit de découverte de prompts pour les équipes et les créateurs qui veulent des idées réutilisables pour l’écriture, le design et le développement.",
    },
    stack: ["React", "Node", "MongoDB"],
    url: null,
  },
];
