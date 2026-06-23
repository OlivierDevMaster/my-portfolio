import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Boxes, Code2, Lightbulb, Rocket, Sparkles } from "lucide-react";

const principles = [
  "Turn unclear ideas into product decisions people can use.",
  "Keep systems simple enough to evolve after launch.",
  "Move steadily without losing the reason behind the work.",
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

const principleIcons = [Lightbulb, Boxes, Code2];

const milestones = [
  {
    year: "2026",
    period: "Today",
    title: "Focused on product engineering",
    description:
      "Building scalable web and mobile systems with clearer product judgment, stronger architecture, and delivery habits that keep teams moving.",
    tags: ["Product Engineering", "System Design", "Next.js"],
    icon: Boxes,
    featured: true,
  },
  {
    year: "2025",
    period: "Operations",
    title: "Expanded restaurant management tools",
    description:
      "Built Fedhubs Pro into a focused operations platform for restaurants to manage menus, reservations, and customer loyalty from one workspace.",
    tags: ["Flutter", "Laravel", "Operations"],
    icon: Code2,
    featured: false,
  },
  {
    year: "2024",
    period: "Launch",
    title: "Built and launched Fedhubs",
    description:
      "Created a restaurant discovery and reservation experience that helped turn search, comparison, and booking into one usable flow.",
    tags: ["React", "Mobile", "Reservations"],
    icon: Sparkles,
    featured: true,
  },
  {
    year: "2023",
    period: "Foundation",
    title: "Started the professional development journey",
    description:
      "Built a practical engineering foundation across frontend, backend, mobile, and data workflows while shipping real product surfaces.",
    tags: ["TypeScript", "PHP", "Databases"],
    icon: Rocket,
    featured: false,
  },
];

export default function AboutPage() {
  return (
    <div>
      <Navbar />

      <main className="px-5 pt-32 md:px-10">
        <section className="container mx-auto max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.45em] text-gray-400">
            About
          </p>
          <h1 className="mt-5 text-5xl font-black leading-none tracking-[-0.06em] text-gray-950 md:text-7xl">
            I build the bridge between product intent and working software.
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-500 md:text-xl">
            I am Olivier, a product-minded engineer focused on turning early
            ideas into clear, useful web and mobile products. I care about
            judgment, execution, and software that remains easy to improve.
          </p>
        </section>

        <section className="container mx-auto grid gap-4 pt-28 md:grid-cols-3">
          {principles.map((principle, index) => {
            const PrincipleIcon = principleIcons[index];

            return (
            <article
              key={principle}
              className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-8 shadow-black/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <PrincipleIcon
                aria-hidden="true"
                className="absolute right-5 top-5 h-12 w-12 text-gray-950/10 transition-colors group-hover:text-violet-600/25"
              />
              <p className="text-2xl font-bold leading-tight tracking-[-0.04em] text-gray-950">
                {principle}
              </p>
            </article>
            );
          })}
        </section>

        <section className="container mx-auto grid gap-10 pt-28 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.45em] text-gray-400">
              Skills
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.06em] md:text-6xl">
              Tools chosen for product delivery, not decoration.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {skillGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-3xl bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-black/5"
              >
                <h3 className="text-2xl font-bold tracking-[-0.04em]">
                  {group.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container mx-auto pt-28">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.45em] text-gray-400">
              Timeline
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.06em] md:text-6xl">
              A product engineering journey, not just a list of roles.
            </h2>
          </div>

          <div className="relative mt-12">
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-4 top-6 w-px bg-gray-200 md:left-[7rem]"
            />

            <div className="grid gap-8">
              {milestones.map((milestone) => {
                const MilestoneIcon = milestone.icon;

                return (
                  <article
                    key={milestone.title}
                    className="relative grid gap-4 md:grid-cols-[96px_40px_1fr] md:gap-6"
                  >
                    <p className="pl-14 text-5xl font-black leading-none tracking-[-0.08em] text-gray-200 md:pl-0 md:text-right">
                      {milestone.year}
                    </p>

                    <div className="absolute left-0 top-1 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-600/20 md:static md:mt-1">
                      <MilestoneIcon aria-hidden="true" className="h-4 w-4" />
                    </div>

                    <div
                      className={cn(
                        "group ml-14 rounded-3xl border border-black/5 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5 md:ml-0",
                        milestone.featured
                          ? "bg-neutral-950 text-white md:p-8"
                          : "bg-gray-50 hover:bg-white"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-sm font-medium",
                          milestone.featured
                            ? "bg-white/10 text-violet-200"
                            : "bg-violet-100 text-violet-700"
                        )}
                      >
                        {milestone.period}
                      </span>

                      <h3 className="mt-5 text-2xl font-bold tracking-[-0.04em] md:text-3xl">
                        {milestone.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-3 leading-7",
                          milestone.featured ? "text-gray-300" : "text-gray-600"
                        )}
                      >
                        {milestone.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {milestone.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className={cn(
                              milestone.featured &&
                                "bg-white/10 text-white hover:bg-white/15"
                            )}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
