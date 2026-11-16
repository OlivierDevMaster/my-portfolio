export type Project = {
  name: string;
  tag: string;
  description: string;
  stack: string[];
  /** Public URL, or null when the project is private. */
  url: string | null;
  /** Text shown next to the link arrow, e.g. "Live" or "App Store". */
  linkLabel?: string;
  /** Shown for archived projects only. */
  year?: string;
};

export const currentProjects: Project[] = [
  {
    name: "Gando",
    tag: "Fintech · Rental deposits",
    description:
      "Digital deposits for rental businesses. Operators send a deposit request, customers confirm it from their phone without the money leaving their account, and the operator can claim it if something goes wrong.",
    stack: ["Next.js", "Prisma", "Supabase", "Stripe"],
    url: "https://gando.app",
    linkLabel: "Live",
  },
  {
    name: "Cléo Network",
    tag: "Marketplace · Real estate",
    description:
      "A private network of buyer mandates in Québec. Buyers describe what they want for free; real estate and mortgage brokers subscribe to reach qualified, often pre-approved buyers before marketing a property.",
    stack: ["React", "TypeScript", "Supabase"],
    url: "https://cleonetwork.ca",
    linkLabel: "Live",
  },
  {
    name: "Kididraw",
    tag: "EdTech · Kids 6–12",
    description:
      "An online drawing school for children: small-group live classes, plus lessons, games, challenges and step-by-step drawings to practise at home.",
    stack: ["Next.js", "Supabase", "Stripe", "Konva"],
    url: "https://kididraw.com",
    linkLabel: "Live",
  },
  {
    name: "Mallow",
    tag: "Mobile app · Beauty booking",
    description:
      "A nail salon booking app: find salons nearby, compare services and reviews, and book an appointment in a few taps, with reminders.",
    stack: ["React Native", "Expo", "Supabase", "Stripe"],
    url: "https://apps.apple.com/us/app/mallow-ton-rdv-manucure/id6753703986",
    linkLabel: "iOS",
  },
];

export const pastProjects: Project[] = [
  {
    year: "2025",
    name: "DevChronicles",
    tag: "In development",
    description:
      "A technical writing space for product engineering notes, implementation lessons, and practical software decisions.",
    stack: ["Next.js", "Postgres"],
    url: null,
  },
  {
    year: "2024",
    name: "Fedhubs",
    tag: "Consumer product",
    description:
      "A restaurant discovery and booking product that helps people move from search to reservation without friction.",
    stack: ["Flutter", "React", "Laravel"],
    url: "https://app.fedhubs.com",
    linkLabel: "Live",
  },
  {
    year: "2024",
    name: "Fedhubs Pro",
    tag: "Operations platform",
    description:
      "An operations workspace for restaurants to manage menus, bookings, and customer loyalty from one place.",
    stack: ["Flutter", "Laravel", "MySQL"],
    url: "https://pro.fedhubs.com",
    linkLabel: "Live",
  },
  {
    year: "2023",
    name: "Prompt AI",
    tag: "AI tooling",
    description:
      "A prompt discovery product for teams and creators who want reusable ideas for writing, design, and development workflows.",
    stack: ["React", "Node", "MongoDB"],
    url: null,
  },
];
