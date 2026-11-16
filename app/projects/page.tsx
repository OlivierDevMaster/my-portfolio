import type { Metadata } from "next";
import ContactCta from "@/components/contact-cta";
import ProjectRow from "@/components/project-row";
import { currentProjects, pastProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Olivier Rasolomanana",
  description:
    "Products Olivier Rasolomanana is building now (Gando, Cléo Network, Kididraw, Mallow) and earlier work across web and mobile.",
  openGraph: {
    title: "Projects — Olivier Rasolomanana",
    description:
      "Fintech, marketplace, edtech and mobile products, built from idea to launch.",
  },
};

const groups = [
  {
    label: "Now",
    note: "In active development",
    projects: currentProjects,
  },
  {
    label: "Earlier",
    note: "Shipped before",
    projects: pastProjects,
  },
];

export default function ProjectsPage() {
  const total = currentProjects.length + pastProjects.length;

  return (
    <div className="bg-white text-neutral-950">
      <main id="main" className="px-5 md:px-10">
        {/* HERO */}
        <section className="container mx-auto border-b border-gray-200 pb-16 pt-32 md:pb-24 md:pt-40">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
            (—) Projects · {total} products
          </p>
          <h1 className="max-w-5xl font-inter-tight text-5xl font-light leading-[0.95] tracking-tight text-balance md:text-8xl">
            Everything I've <em className="italic text-violet-600">shipped</em>,
            in one place.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-600">
            Fintech, marketplaces, edtech and mobile apps. What I'm building
            now comes first, earlier work below.
          </p>
        </section>

        {/* LIST */}
        <section className="container mx-auto space-y-14 py-12 md:space-y-20 md:py-24">
          {groups.map((group) => (
            <div
              key={group.label}
              className="grid gap-4 lg:grid-cols-12 lg:gap-8"
            >
              <div className="lg:col-span-2">
                <div className="flex items-baseline gap-4 lg:sticky lg:top-24 lg:block">
                  <h2 className="font-inter-tight text-5xl font-light text-violet-600 md:text-6xl">
                    {group.label}
                  </h2>
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest text-gray-500">
                    {group.note}
                  </p>
                </div>
              </div>

              <ul className="divide-y divide-gray-200 border-y border-gray-200 lg:col-span-10">
                {group.projects.map((project) => (
                  <li key={project.name}>
                    <ProjectRow project={project} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <ContactCta />
      </main>
    </div>
  );
}
