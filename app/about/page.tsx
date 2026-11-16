import type { Metadata } from "next";
import ContactCta from "@/components/contact-cta";

export const metadata: Metadata = {
  title: "About — Olivier Rasolomanana",
  description:
    "Olivier Rasolomanana is a product engineer who turns early ideas into clear, usable web and mobile software.",
};

const principles = [
  {
    n: "01",
    title: "Ideas into decisions",
    body: "I turn unclear ideas into product decisions people can actually use and build on.",
  },
  {
    n: "02",
    title: "Simple enough to evolve",
    body: "I keep systems simple enough to keep changing after launch, not just to ship once.",
  },
  {
    n: "03",
    title: "Steady, with intent",
    body: "I move steadily without losing the reason behind the work or the people it serves.",
  },
];

const skillGroups = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "Dart", "PHP", "SQL"],
  },
  {
    title: "Frameworks",
    skills: ["Next.js", "React", "Flutter", "Laravel", "Node.js"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "MongoDB", "PostgreSQL", "Supabase"],
  },
  {
    title: "Tools",
    skills: ["Git", "REST APIs", "TailwindCSS", "Figma", "Docker"],
  },
];

const milestones = [
  {
    year: "2026",
    tag: "Today",
    title: "Focused on product engineering",
    description:
      "Building scalable web and mobile systems with clearer product judgment, stronger architecture, and delivery habits that keep teams moving.",
    stack: ["Product", "System Design", "Next.js"],
  },
  {
    year: "2025",
    tag: "Operations",
    title: "Expanded restaurant management tools",
    description:
      "Grew Fedhubs Pro into a focused operations platform for restaurants to manage menus, reservations, and customer loyalty from one workspace.",
    stack: ["Flutter", "Laravel", "Ops"],
  },
  {
    year: "2024",
    tag: "Launch",
    title: "Built and launched Fedhubs",
    description:
      "Created a restaurant discovery and reservation experience that turned search, comparison, and booking into one usable flow.",
    stack: ["React", "Mobile", "Booking"],
  },
  {
    year: "2023",
    tag: "Foundation",
    title: "Started the professional journey",
    description:
      "Built a practical engineering foundation across frontend, backend, mobile, and data workflows while shipping real product surfaces.",
    stack: ["TypeScript", "PHP", "Databases"],
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white text-neutral-950">
      <main id="main" className="px-5 md:px-10">
        {/* HERO */}
        <section className="container mx-auto border-b border-gray-200 pb-16 pt-32 md:pb-24 md:pt-40">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
            (—) About · Product Engineer
          </p>
          <h1 className="max-w-5xl font-inter-tight text-5xl font-light leading-[0.95] tracking-tight text-balance md:text-8xl">
            The bridge between product{" "}
            <em className="italic text-violet-600">intent</em> and working
            software.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-500">
            I'm Olivier — a product-minded engineer who turns early ideas into
            clear, useful web and mobile products. I care about judgment,
            execution, and software that stays easy to improve.
          </p>
        </section>

        {/* PRINCIPLES */}
        <section className="container mx-auto border-b border-gray-200 py-16 md:py-40">
          <div className="mb-10 grid gap-6 md:mb-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                (01) How I work
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-6xl">
                A few <em className="italic text-violet-600">principles</em>{" "}
                behind the work.
              </h2>
            </div>
          </div>

          <div className="grid gap-px bg-gray-200 md:grid-cols-3">
            {principles.map((principle) => (
              <div
                key={principle.n}
                className="group bg-white p-8 transition-colors hover:bg-gray-50 md:p-10"
              >
                <div className="mb-8 flex items-center justify-between md:mb-16">
                  <span className="font-mono text-xs text-gray-500">
                    {principle.n}
                  </span>
                  <span className="size-1.5 rounded-full bg-violet-600/60" />
                </div>
                <h3 className="mb-4 font-inter-tight text-2xl font-light md:text-3xl">
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="container mx-auto border-b border-gray-200 py-16 md:py-40">
          <div className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                (02) Toolkit
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-6xl">
                Tools chosen for{" "}
                <em className="italic text-violet-600">delivery</em>, not
                decoration.
              </h2>
            </div>
          </div>

          <div className="grid gap-px bg-gray-200 md:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.title} className="bg-white p-8 md:p-10">
                <h3 className="font-inter-tight text-2xl font-light">
                  {group.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gray-500">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-gray-200 px-2 py-0.5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section className="container mx-auto py-16 md:py-40">
          <div className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                (03) Timeline
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-6xl">
                A product engineering{" "}
                <em className="italic text-violet-600">journey</em>, not a
                list of roles.
              </h2>
            </div>
          </div>

          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {milestones.map((milestone) => (
              <li
                key={milestone.year}
                className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-8 md:py-10"
              >
                <div className="col-span-12 md:col-span-2">
                  <div className="font-inter-tight text-4xl font-light text-violet-600 md:text-5xl">
                    {milestone.year}
                  </div>
                  <div className="mt-2 font-mono text-[11px] uppercase tracking-widest text-gray-500">
                    {milestone.tag}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <h3 className="font-inter-tight text-2xl font-light md:text-3xl">
                    {milestone.title}
                  </h3>
                </div>
                <div className="col-span-12 text-sm leading-relaxed text-gray-600 md:col-span-5">
                  {milestone.description}
                  <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gray-500">
                    {milestone.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-gray-200 px-2 py-0.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <ContactCta />
      </main>
    </div>
  );
}
