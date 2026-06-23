import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/utils/types";
import {
  Boxes,
  Clock,
  Code2,
  Cpu,
  FileText,
  FolderGit,
  Layers,
  Lightbulb,
  Mail,
  Quote,
  Sparkles,
  Target,
} from "lucide-react";

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

const expertiseItems = [
  {
    title: "Product Engineering",
    eyebrow: "From ideas to production systems",
    description:
      "I turn product intent into working software, keeping every decision tied to user value and delivery clarity.",
  },
  {
    title: "Full-Stack Development",
    eyebrow: "Building end-to-end digital products",
    description:
      "I build the interface, backend, and delivery paths that help products move from prototype to real usage.",
  },
  {
    title: "System Design & Architecture",
    eyebrow: "Designing systems that scale cleanly",
    description:
      "I shape APIs, data models, and workflows so teams can move quickly without creating long-term friction.",
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

const experienceStats = [
  { value: "4+ years", label: "Building production software" },
  { value: "10 projects", label: "Delivered from idea to launch" },
  { value: "15 tools", label: "Used across real product work" },
];

const articles = [
  {
    title: "Designing Products That Developers Can Maintain",
    category: "Product Engineering",
    description:
      "How clear constraints and thoughtful defaults keep product teams moving after launch.",
  },
  {
    title: "From Prototype to Production",
    category: "System Design",
    description:
      "The decisions that help early ideas become dependable web and mobile products.",
  },
  {
    title: "Where AI Actually Helps in SaaS Products",
    category: "AI Integration",
    description:
      "A grounded look at AI features that improve workflows without reducing trust.",
  },
];

const testimonials = [
  {
    quote:
      "Olivier brings the product judgment and engineering follow-through early teams need.",
    author: "Startup collaborator",
    role: "SaaS founder",
  },
  {
    quote:
      "He keeps the work clear, focused, and steady even when the product direction evolves.",
    author: "Project partner",
    role: "Engineering lead",
  },
];

const articleIcons = {
  AI: Sparkles,
  System: Layers,
  Product: Target,
};

const articleImages = [
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=320&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=320&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=320&q=80",
];

const getArticleIcon = (category: string) => {
  if (category.includes("AI")) return articleIcons.AI;
  if (category.includes("System")) return articleIcons.System;
  return articleIcons.Product;
};

const projectImages = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
];

export default function Home() {
  return (
    <div>
      <Navbar />

      <main className="px-5 pb-4 md:px-10">
        <Hero />

        <section
          id="about"
          className="container mx-auto flex flex-col items-center justify-center pt-28 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-[0.45em] text-gray-400">
            Expertise
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.06em] text-gray-950 md:text-6xl">
            I build systems that turn ideas into production.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
            I work where product thinking meets engineering, helping teams turn
            early ideas into software people can actually use.
          </p>
        </section>

        <section className="container mx-auto grid grid-cols-1 gap-4 pt-12 md:grid-cols-12">
          <article className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-neutral-950 p-8 text-white transition-all duration-500 hover:-translate-y-1 hover:border-white/10 md:col-span-6">
            <div className="absolute -right-32 -top-32 h-72 w-72 rounded-full bg-violet-600/20 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] opacity-[0.05] [background-size:16px_16px]" />
            <Lightbulb
              aria-hidden="true"
              className="absolute right-4 top-6 z-0 h-28 w-28 text-white/10 transition-colors duration-500 group-hover:text-violet-300/25"
            />

            <div className="relative">
              <p className="text-sm font-medium tracking-wide text-violet-300">
                {expertiseItems[0].eyebrow}
              </p>
              <h2 className="mt-6 text-4xl font-black leading-none tracking-[-0.06em] md:text-5xl">
                {expertiseItems[0].title}
              </h2>
            </div>
            <p className="relative mt-10 max-w-md text-lg leading-8 text-gray-300">
              {expertiseItems[0].description}
            </p>
            <div className="absolute inset-0 translate-x-[-30%] rotate-12 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          </article>

          <article className="group relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-6 shadow-black/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:col-span-3">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            <Code2
              aria-hidden="true"
              className="absolute right-3 top-4 z-0 h-20 w-20 text-gray-950/10 transition-colors duration-500 group-hover:text-violet-600/25"
            />

            <div className="relative">
              <p className="text-sm font-medium tracking-wide text-violet-600">
                {expertiseItems[1].eyebrow}
              </p>
              <h2 className="mt-4 text-2xl font-black tracking-[-0.06em] text-gray-950">
                {expertiseItems[1].title}
              </h2>
            </div>
            <p className="relative mt-6 text-sm leading-6 text-gray-600">
              {expertiseItems[1].description}
            </p>
          </article>

          <article className="group relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-3xl border border-black/5 bg-white/70 p-6 shadow-black/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:col-span-3">
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-violet-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            <Boxes
              aria-hidden="true"
              className="absolute right-3 top-4 z-0 h-20 w-20 text-gray-950/10 transition-colors duration-500 group-hover:text-violet-600/25"
            />

            <div className="relative">
              <p className="text-sm font-medium tracking-wide text-violet-600">
                {expertiseItems[2].eyebrow}
              </p>
              <h2 className="mt-4 text-2xl font-black tracking-[-0.06em] text-gray-950">
                {expertiseItems[2].title}
              </h2>
            </div>
            <p className="relative mt-6 text-sm leading-6 text-gray-600">
              {expertiseItems[2].description}
            </p>
          </article>
        </section>

        <section className="container mx-auto flex max-w-3xl flex-wrap justify-center gap-2 pt-10">
          {expertiseTechStack.map((tech) => (
            <Badge
              key={tech}
              className="bg-gray-100 px-4 py-2 text-sm text-gray-800 transition hover:bg-gray-200"
            >
              {tech}
            </Badge>
          ))}
        </section>

        <section className="container mx-auto pt-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.45em] text-gray-400">
              Experience
            </p>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.06em] text-gray-950 md:text-5xl">
              Proof of work, not just years.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-500">
              A quick view of the product surfaces, technical decisions, and
              delivery habits behind the work.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-12">
            <div className="relative overflow-hidden rounded-3xl bg-neutral-950 p-10 text-white md:col-span-7">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-transparent opacity-10" />
              <Clock
                aria-hidden="true"
                className="absolute right-8 top-8 h-12 w-12 text-white/10"
              />

              <div className="relative">
                <p className="text-7xl font-black tracking-[-0.06em]">
                  {experienceStats[0].value}
                </p>
                <p className="mt-3 text-lg text-gray-300">
                  {experienceStats[0].label}
                </p>
                <p className="mt-6 max-w-md text-sm leading-6 text-gray-400">
                  Focused on product work that reaches users, survives real
                  usage, and stays clear enough to keep improving.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:col-span-5">
              <div className="rounded-3xl bg-gray-50 p-6">
                <p className="text-sm font-medium tracking-wide text-violet-600">
                  Where product meets engineering
                </p>
                <p className="mt-3 text-2xl font-black tracking-[-0.06em]">
                  End-to-end ownership
                </p>
                <p className="mt-3 text-gray-600">
                  From interface decisions to backend workflows and release
                  details.
                </p>
              </div>

              <div className="rounded-3xl bg-gray-50 p-6">
                <p className="text-sm font-medium tracking-wide text-violet-600">
                  Decisions with a product reason
                </p>
                <p className="mt-3 text-2xl font-black tracking-[-0.06em]">
                  Business-aware delivery
                </p>
                <p className="mt-3 text-gray-600">
                  Technical choices stay connected to users, constraints, and
                  momentum.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="group cursor-pointer rounded-2xl bg-gray-100 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-black/5">
              <div className="flex items-start justify-between gap-4">
                <p className="text-3xl font-black tracking-[-0.06em]">
                  {experienceStats[1].value}
                </p>
                <FolderGit
                  aria-hidden="true"
                  className="h-7 w-7 text-gray-950/15 transition-colors group-hover:text-violet-600/35"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {experienceStats[1].label}
              </p>
            </div>

            <div className="group cursor-pointer rounded-2xl bg-gray-100 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-black/5">
              <div className="flex items-start justify-between gap-4">
                <p className="text-3xl font-black tracking-[-0.06em]">
                  {experienceStats[2].value}
                </p>
                <Cpu
                  aria-hidden="true"
                  className="h-7 w-7 text-gray-950/15 transition-colors group-hover:text-violet-600/35"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {experienceStats[2].label}
              </p>
            </div>

            <div className="group cursor-pointer rounded-2xl bg-gray-100 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-black/5">
              <div className="flex items-start justify-between gap-4">
                <p className="text-3xl font-black tracking-[-0.06em]">∞</p>
                <Sparkles
                  aria-hidden="true"
                  className="h-7 w-7 text-gray-950/15 transition-colors group-hover:text-violet-600/35"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Lessons from iteration
              </p>
            </div>
          </div>
        </section>

        <div
          id="projects"
          className="flex flex-col items-center space-y-5 pt-28 text-center container mx-auto"
        >
          <p className="text-sm font-medium uppercase tracking-[0.45em] text-gray-400">
            Projects
          </p>
          <h1 className="max-w-3xl text-4xl font-black tracking-[-0.06em] text-gray-950 md:text-6xl">
            Products shaped from real operational problems.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-gray-500">
            A few builds that show how I approach product context, technical
            tradeoffs, and the path from idea to release.
          </p>
        </div>

        <section className="container mx-auto mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="group cursor-pointer overflow-hidden rounded-3xl border border-black/5 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-black/10"
            >
              <div
                aria-hidden="true"
                className="h-64 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
                style={{
                  backgroundImage: `linear-gradient(to bottom, transparent, rgb(0 0 0 / 0.24)), url('${projectImages[index]}')`,
                }}
              />

              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <Badge
                      key={tech}
                      className="bg-gray-100 text-xs text-gray-700"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <h3 className="mt-5 text-3xl font-black leading-none tracking-[-0.06em] text-gray-950">
                  {project.title}
                </h3>

                <p className="mt-4 line-clamp-3 leading-7 text-gray-600">
                  {project.description}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-gray-950">
                    {project.previewUrl ? "Explore Project" : "View Details"}
                  </span>
                  <span className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs font-medium tracking-wide text-gray-400">
                    Product build
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">View all projects</Link>
          </Button>
        </div>

        <section
          id="articles"
          className="grid gap-12 pt-28 lg:grid-cols-[0.8fr_1.2fr] container mx-auto"
        >
          {/* Left intro */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.45em] text-gray-400">
              Articles
            </p>

            <h2 className="mt-5 text-4xl font-black tracking-[-0.06em] text-gray-950 md:text-6xl leading-[1.05]">
              Notes from building products in public.
            </h2>

            <p className="mt-6 text-gray-600 max-w-sm">
              Short reflections on product judgment, implementation tradeoffs,
              AI features, and systems that stay understandable.
            </p>
          </div>

          {/* Articles */}
          <div className="grid gap-5">
            {articles.map((article, index) => {
              const ArticleIcon = getArticleIcon(article.category);

              return (
                <article
                  key={article.title}
                  className="group grid cursor-pointer gap-5 rounded-3xl border border-gray-100 bg-gray-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-black/5 sm:grid-cols-[140px_1fr]"
                >
                  <div
                    aria-hidden="true"
                    className="min-h-32 rounded-2xl bg-cover bg-center"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, transparent, rgb(0 0 0 / 0.18)), url('${articleImages[index]}')`,
                    }}
                  />

                  <div className="flex flex-col justify-between p-2">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <Badge
                          variant="secondary"
                          className="gap-2 bg-white text-gray-700"
                        >
                          <ArticleIcon
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-violet-600/60"
                          />
                          {article.category}
                        </Badge>

                        <span className="text-xs text-gray-400 opacity-0 transition group-hover:opacity-100">
                          Read more
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl font-black tracking-[-0.05em] text-gray-950">
                        {article.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {article.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-3 pt-28 md:grid-cols-2 container mx-auto">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.author}
              className="group relative overflow-hidden rounded-3xl bg-gray-50 p-8 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-black/5"
            >
              <Quote
                aria-hidden="true"
                className="absolute right-7 top-7 h-16 w-16 text-violet-100 transition duration-300 group-hover:scale-110 group-hover:text-violet-200"
              />

              <div className="relative mb-8 flex items-center gap-4">
                <div className="rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-400 to-amber-300 p-[2px] transition duration-300 group-hover:scale-105">
                  <div
                    aria-hidden="true"
                    className="h-12 w-12 rounded-full bg-cover bg-center ring-4 ring-white"
                    style={{
                      backgroundImage: `url('https://i.pravatar.cc/100?img=${
                        index + 12
                      }')`,
                    }}
                  />
                </div>

                <figcaption>
                  <p className="font-semibold tracking-[-0.02em] text-gray-950">
                    {testimonial.author}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </figcaption>
              </div>

              <blockquote className="relative text-xl font-semibold leading-8 tracking-[-0.035em] text-gray-900 md:text-2xl md:leading-9">
                “{testimonial.quote}”
              </blockquote>
            </figure>
          ))}
        </section>

        <section className="mt-28 rounded-3xl bg-neutral-950 p-8 text-center text-white md:p-14 container mx-auto">
          <p className="text-sm font-medium uppercase tracking-[0.45em] text-gray-500">
            Contact
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-[-0.06em] md:text-6xl">
            Bring me a product problem worth solving.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-gray-300">
            I am open to freelance builds, product engineering roles, and teams
            that care about turning ideas into clear, usable software.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-violet-800 hover:bg-violet-700"
            >
              <Link href="/contact">
                <Mail aria-hidden="true" className="h-4 w-4 opacity-70" />
                Contact me
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-black"
            >
              <Link href="/resume">
                <FileText aria-hidden="true" className="h-4 w-4 opacity-70" />
                View resume
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
