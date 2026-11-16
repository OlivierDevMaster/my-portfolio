import Link from "next/link";
import Hero from "@/components/hero";
import ContactCta from "@/components/contact-cta";
import ProjectRow from "@/components/project-row";
import { currentProjects } from "@/lib/projects";
import { ArrowRight } from "lucide-react";

const services = [
  {
    n: "01",
    title: "Product Engineering",
    body: "Turning product intent into working software, tying every decision to user value and delivery clarity.",
  },
  {
    n: "02",
    title: "Full-Stack Development",
    body: "Interface, backend, and delivery paths that move a product from prototype to real, dependable usage.",
  },
  {
    n: "03",
    title: "System Design",
    body: "APIs, data models, and workflows shaped so teams can keep moving without long-term friction.",
  },
];

const expertiseTechStack = [
  "Laravel",
  "PHP",
  "React",
  "TypeScript",
  "Next.js",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Redis",
  "CI/CD",
  "REST APIs",
  "System Design",
];

const stats = [
  { n: "01", value: "4+", label: "Years shipping production software" },
  { n: "02", value: "10", label: "Products delivered idea to launch" },
  { n: "03", value: "15", label: "Tools across real product work" },
  { n: "04", value: "∞", label: "Lessons from iteration" },
];

const articles = [
  {
    category: "Product Engineering",
    title: "Designing Products That Developers Can Maintain",

  },
  {
    category: "System Design",
    title: "From Prototype to Production",

  },
  {
    category: "AI Integration",
    title: "Where AI Actually Helps in SaaS Products",

  },
];

export default function Home() {
  return (
    <div className="bg-white text-neutral-950">
      <main id="main" className="px-5 md:px-10">
        <Hero />

        {/* STACK MARQUEE */}
        <section
          aria-label="Technologies I work with"
          className="mt-6 overflow-hidden border-y border-gray-200 md:mt-10"
        >
          <p className="sr-only">{expertiseTechStack.join(", ")}</p>
          <div
            aria-hidden="true"
            className="flex w-max animate-marquee gap-14 whitespace-nowrap py-3 motion-reduce:animate-none md:py-6"
          >
            {[...expertiseTechStack, ...expertiseTechStack].map(
              (tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className="flex items-center gap-14 font-inter-tight text-lg sm:text-3xl font-light italic text-gray-500 md:text-4xl"
                >
                  {tech}
                  <span className="size-1.5 shrink-0 rounded-full bg-violet-600/60" />
                </span>
              )
            )}
          </div>
        </section>

        {/* EXPERTISE */}
        <section
          id="about"
          className="container mx-auto border-b border-gray-200 py-16 md:py-40"
        >
          <div className="mb-10 grid gap-6 md:mb-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                (01) Expertise
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-7xl">
                I build systems that turn{" "}
                <em className="italic text-violet-600">ideas</em> into
                production.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
                I work where product thinking meets engineering, helping teams
                take early sketches through to real software that survives real
                usage.
              </p>
            </div>
          </div>

          <div className="grid gap-px bg-gray-200 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.n}
                className="group bg-white p-8 transition-colors hover:bg-gray-50 md:p-10"
              >
                <div className="mb-8 flex items-center justify-between md:mb-16">
                  <span className="font-mono text-xs text-gray-500">
                    {service.n}
                  </span>
                  <span className="size-1.5 rounded-full bg-violet-600/60 transition-colors group-hover:bg-violet-600" />
                </div>
                <h3 className="mb-4 font-inter-tight text-2xl font-light md:text-3xl">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* WORK */}
        <section
          id="projects"
          className="container mx-auto border-b border-gray-200 py-16 md:py-40"
        >
          <div className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                (02) Current work
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-7xl">
                Products I'm{" "}
                <em className="italic text-violet-600">building</em> right now.
              </h2>
            </div>
          </div>

          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {currentProjects.map((project, index) => (
              <li key={project.name}>
                <ProjectRow project={project} index={index} />
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="/projects"
              className="group inline-flex min-h-11 items-center gap-2 font-mono text-sm text-gray-600 transition-colors hover:text-neutral-950"
            >
              View all projects
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

        {/* NUMBERS */}
        <section className="container mx-auto border-b border-gray-200 py-16 md:py-40">
          <div className="mb-10 grid gap-6 md:mb-20 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                (—) By the numbers
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-3xl font-light leading-tight tracking-tight text-balance md:text-7xl">
                A quiet record of{" "}
                <em className="italic text-violet-600">shipped</em> work,
                measured in launches, not headcount.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group bg-white p-5 transition-colors hover:bg-gray-50 sm:p-8 md:p-10"
              >
                <div className="mb-10 flex items-center justify-between md:mb-16">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">
                    {stat.n}
                  </span>
                  <span className="size-1.5 rounded-full bg-violet-600/60 transition-colors group-hover:bg-violet-600" />
                </div>
                <div className="mb-6 font-inter-tight text-5xl font-light leading-none text-violet-600 sm:text-6xl md:text-8xl">
                  {stat.value}
                </div>
                <div className="mb-4 h-px w-10 bg-violet-600/40" />
                <p className="max-w-[18ch] text-sm leading-relaxed text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* NOTES */}
        <section
          id="articles"
          className="container mx-auto py-16 md:py-40"
        >
          <div className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                (03) Notes
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-7xl">
                Building products,{" "}
                <em className="italic text-violet-600">in public.</em>
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {articles.map((article) => (
              <article
                key={article.title}
                className="rounded-xl border border-gray-200 bg-white p-6 md:p-8"
              >
                <div className="mb-8 flex items-center justify-between gap-4 font-mono text-xs text-gray-500 md:mb-16">
                  <span className="uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] uppercase tracking-wider text-gray-600">
                    In progress
                  </span>
                </div>
                <h3 className="font-inter-tight text-2xl font-light leading-tight">
                  {article.title}
                </h3>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/blog"
              className="group inline-flex min-h-11 items-center gap-2 font-mono text-sm text-gray-600 transition-colors hover:text-neutral-950"
            >
              See what I'm writing
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

        {/* CONTACT */}
        <ContactCta
          label="(04) Contact"
          title={
            <>
              Bring me a <em className="italic text-violet-600">problem</em>{" "}
              worth solving.
            </>
          }
          body="Open to freelance builds and product engineering roles, with teams that care about turning ideas into clear, usable software."
        />
      </main>
    </div>
  );
}
