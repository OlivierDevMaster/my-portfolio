import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "All Projects — Olivier Rasolomanana",
  description:
    "A complete archive of products, platforms and tools built by Olivier Rasolomanana — from consumer apps to operations platforms and AI tooling.",
  openGraph: {
    title: "All Projects — Olivier Rasolomanana",
    description:
      "A complete archive of products shipped from idea to launch across web and mobile.",
  },
};

type ArchiveProject = {
  year: string;
  name: string;
  tag: string;
  description: string;
  stack: string[];
  previewUrl: string | null;
};

const projects: ArchiveProject[] = [
  {
    year: "2025",
    name: "DevChronicles",
    tag: "In development",
    description:
      "A technical writing space for product engineering notes, implementation lessons, and practical software decisions.",
    stack: ["Next.js", "Postgres"],
    previewUrl: null,
  },
  {
    year: "2024",
    name: "Fedhubs",
    tag: "Consumer product",
    description:
      "A restaurant discovery and booking product that helps people move from search to reservation without friction.",
    stack: ["Flutter", "React", "Laravel"],
    previewUrl: "https://app.fedhubs.com",
  },
  {
    year: "2024",
    name: "Fedhubs Pro",
    tag: "Operations platform",
    description:
      "An operations workspace for restaurants to manage menus, bookings, and customer loyalty from one place.",
    stack: ["Flutter", "Laravel", "MySQL"],
    previewUrl: "https://pro.fedhubs.com",
  },
  {
    year: "2023",
    name: "Prompt AI",
    tag: "AI tooling",
    description:
      "A prompt discovery product for teams and creators who want reusable ideas for writing, design, and development workflows.",
    stack: ["React", "Node", "MongoDB"],
    previewUrl: null,
  },
];

export default function ProjectsPage() {
  const grouped = projects.reduce<Record<string, ArchiveProject[]>>(
    (acc, project) => {
      (acc[project.year] ||= []).push(project);
      return acc;
    },
    {}
  );
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="bg-white text-neutral-950">
      <Navbar />

      <main className="px-5 md:px-10">
        {/* HERO */}
        <section className="container mx-auto border-b border-gray-200 pb-16 pt-32 md:pb-24 md:pt-40">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
              (—) Archive · {projects.length} projects
            </p>
          </div>
          <h1 className="max-w-5xl font-inter-tight text-5xl font-light leading-[0.95] tracking-tight text-balance md:text-8xl">
            Everything I've <em className="italic text-violet-600">shipped</em>,
            in one place.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-500">
            A running index of consumer apps, operations platforms, internal
            tools, and experiments, grouped by year, most recent first.
          </p>
        </section>

        {/* LIST */}
        <section className="container mx-auto space-y-20 py-16 md:py-24">
          {years.map((year) => (
            <div key={year} className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-2">
                <div className="sticky top-24">
                  <div className="font-inter-tight text-5xl font-light text-violet-600 md:text-6xl">
                    {year}
                  </div>
                  <div className="mt-2 font-mono text-xs uppercase tracking-widest text-gray-400">
                    {grouped[year].length} project
                    {grouped[year].length > 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              <ul className="divide-y divide-gray-200 border-y border-gray-200 lg:col-span-10">
                {grouped[year].map((project) => (
                  <li key={project.name}>
                    <Link
                      href={project.previewUrl ?? "#"}
                      {...(project.previewUrl
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="group -mx-5 grid grid-cols-12 items-baseline gap-4 px-5 py-8 transition-colors hover:bg-gray-50 md:-mx-10 md:px-10 md:py-10"
                    >
                      <div className="col-span-12 md:col-span-5">
                        <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                          {project.tag}
                        </div>
                        <h3 className="font-inter-tight text-3xl font-light transition-colors group-hover:text-violet-600 md:text-4xl">
                          {project.name}
                        </h3>
                      </div>
                      <div className="col-span-12 text-sm leading-relaxed text-gray-500 md:col-span-5">
                        {project.description}
                      </div>
                      <div className="col-span-10 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-wider text-gray-400 md:col-span-1">
                        {project.stack.map((tech) => (
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
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="container mx-auto border-t border-gray-200 py-24 text-center md:py-32">
          <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-7xl mx-auto">
            Have something to <em className="italic text-violet-600">build?</em>
          </h2>
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-neutral-950 px-8 py-4 font-medium text-white transition hover:bg-neutral-800"
          >
            Start a project
            <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </section>
      </main>
    </div>
  );
}
