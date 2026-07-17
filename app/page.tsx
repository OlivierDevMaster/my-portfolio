import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Project } from "@/utils/types";
import { ArrowUpRight, ArrowDown } from "lucide-react";

const projects: Project[] = [
  {
    projectPic: "/Fedhubs.jpg",
    title: "Fedhubs",
    description:
      "A restaurant discovery and booking product that helps people find nearby places, compare details, and reserve a table without friction.",
    techStack: ["Flutter", "React js", "Laravel", "MySQL"],
    codeAvailable: false,
    previewUrl: "https://app.fedhubs.com",
  },
  {
    projectPic: "/Fedhubs_pro.png",
    title: "Fedhubs Pro",
    description:
      "An operations platform for restaurants to manage menus, reservations, and customer loyalty from one focused workspace.",
    techStack: ["Flutter", "Laravel", "MySQL"],
    codeAvailable: false,
    previewUrl: "https://pro.fedhubs.com",
  },
  {
    projectPic: "/hero.png",
    title: "Prompt AI",
    description:
      "A prompt discovery product for teams and creators who want reusable ideas for writing, design, and development workflows.",
    techStack: ["React", "Node", "MongoDB"],
    codeAvailable: true,
    previewUrl: null,
  },
  {
    projectPic: "/hero.png",
    title: "DevChronicles",
    description:
      "A technical writing space for product engineering notes, implementation lessons, and practical software decisions.",
    techStack: ["Under Development"],
    codeAvailable: true,
    previewUrl: null,
  },
];

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
    read: "6 min",
  },
  {
    category: "System Design",
    title: "From Prototype to Production",
    read: "8 min",
  },
  {
    category: "AI Integration",
    title: "Where AI Actually Helps in SaaS Products",
    read: "5 min",
  },
];

export default function Home() {
  return (
    <div className="bg-white text-neutral-950">
      <Navbar />

      <main className="px-5 md:px-10">
        <Hero />

        {/* STACK MARQUEE */}
        <section className="mt-10 overflow-hidden border-y border-gray-200">
          <div className="flex w-max animate-marquee gap-14 whitespace-nowrap py-6">
            {[...expertiseTechStack, ...expertiseTechStack].map(
              (tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className="flex items-center gap-14 font-inter-tight text-3xl font-light italic text-gray-400 md:text-4xl"
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
          className="container mx-auto border-b border-gray-200 py-24 md:py-40"
        >
          <div className="mb-20 grid gap-12 lg:grid-cols-12">
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
                <div className="mb-16 flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-400">
                    {service.n}
                  </span>
                  <ArrowUpRight className="size-4 text-gray-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-600" />
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
          className="container mx-auto border-b border-gray-200 py-24 md:py-40"
        >
          <div className="mb-16 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                (02) Selected work
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-7xl">
                Products shaped from real{" "}
                <em className="italic text-violet-600">operational</em>{" "}
                problems.
              </h2>
            </div>
          </div>

          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {projects.map((project, index) => {
              const href = project.previewUrl ?? "/projects";

              return (
                <li key={project.title}>
                  <Link
                    href={href}
                    className="group -mx-5 grid grid-cols-12 items-baseline gap-4 px-5 py-8 transition-colors hover:bg-gray-50 md:-mx-10 md:px-10 md:py-10"
                  >
                    <span className="col-span-2 pt-2 font-mono text-xs text-gray-400 md:col-span-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="col-span-10 md:col-span-5">
                      <h3 className="font-inter-tight text-3xl font-light transition-colors group-hover:text-violet-600 md:text-5xl">
                        {project.title}
                      </h3>
                    </div>
                    <div className="col-span-12 text-sm leading-relaxed text-gray-500 md:col-span-4">
                      {project.description}
                    </div>
                    <div className="col-span-10 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-wider text-gray-400 md:col-span-1">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-gray-200 px-2 py-0.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ArrowUpRight className="col-span-2 size-6 justify-self-end text-gray-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-600 md:col-span-1" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-10">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 font-mono text-sm text-gray-500 transition-colors hover:text-neutral-950"
            >
              View all projects
              <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </Link>
          </div>
        </section>

        {/* NUMBERS */}
        <section className="container mx-auto border-b border-gray-200 py-24 md:py-40">
          <div className="mb-20 grid gap-10 lg:grid-cols-12">
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
                className="group bg-white p-8 transition-colors hover:bg-gray-50 md:p-10"
              >
                <div className="mb-10 flex items-center justify-between md:mb-16">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                    {stat.n}
                  </span>
                  <span className="size-1.5 rounded-full bg-violet-600/60 transition-colors group-hover:bg-violet-600" />
                </div>
                <div className="mb-6 font-inter-tight text-6xl font-light leading-none text-violet-600 md:text-8xl">
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
          className="container mx-auto border-b border-gray-200 py-24 md:py-40"
        >
          <div className="mb-16 grid gap-12 lg:grid-cols-12">
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

          <div className="grid gap-6 md:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.title}
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-colors hover:border-violet-600/60 md:p-8"
              >
                <div className="mb-16 flex items-center justify-between font-mono text-xs text-gray-400">
                  <span className="uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span>{article.read}</span>
                </div>
                <h3 className="font-inter-tight text-2xl font-light leading-tight transition-colors group-hover:text-violet-600">
                  {article.title}
                </h3>
                <div className="mt-6 inline-flex items-center gap-2 text-sm">
                  Read
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="container mx-auto py-32 text-center md:py-32"
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
            (04) Contact
          </p>
          <h2 className="mx-auto font-inter-tight text-5xl font-light leading-[0.9] tracking-tight text-balance md:text-8xl">
            Bring me a
            <br />
            <em className="italic text-violet-600">problem</em> worth solving.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-gray-500">
            Open to freelance builds, product engineering roles, and teams that
            care about turning ideas into clear, usable software.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-violet-600 px-8 py-4 font-medium text-white transition hover:bg-violet-700"
            >
              Contact me
              <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-3 rounded-full border border-gray-200 px-8 py-4 font-medium transition hover:bg-gray-50"
            >
              View resume
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
