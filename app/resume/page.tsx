import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, FileText, GraduationCap } from "lucide-react";

const experiences = [
  {
    company: "Independent Product Builds",
    role: "Product Engineer",
    period: "2023 - Present",
    achievements: [
      "Turned discovery, booking, and operations ideas into usable web and mobile products.",
      "Shaped interfaces, APIs, and data flows around real product behavior.",
      "Worked with founders and teams to clarify scope before writing code.",
    ],
  },
  {
    company: "Freelance Collaborations",
    role: "Product Engineer",
    period: "2022 - Present",
    achievements: [
      "Delivered responsive interfaces with React, Next.js, TailwindCSS, and Flutter.",
      "Connected Laravel, Node.js, REST APIs, and SQL workflows into product features.",
      "Improved product clarity through short feedback loops and practical decisions.",
    ],
  },
];

const education = [
  "Software engineering foundations across web, mobile, backend, and data workflows.",
  "Continuous learning in product engineering, AI integration, and modern frontend architecture.",
];

const certifications = [
  "Full-Stack Web Development",
  "Mobile Application Development",
  "Product Engineering Practice",
];

export default function ResumePage() {
  return (
    <div>
      <Navbar />

      <main className="px-5 pt-32 md:px-10">
        <section className="container mx-auto max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.45em] text-gray-400">
            Resume
          </p>
          <h1 className="mt-5 text-5xl font-black leading-none tracking-[-0.06em] text-gray-950 md:text-7xl">
            Experience shaped by product delivery.
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-500 md:text-xl">
            A concise view of the work, judgment, and technical range I bring
            to teams turning product ideas into usable software.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/RASOLOMANANA_Herimanitra_Olivier.pdf" download>
                <FileText aria-hidden="true" className="h-4 w-4 opacity-70" />
                Download CV
              </Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto grid gap-4 pt-28">
          {experiences.map((experience) => (
            <article
              key={experience.company}
              className="group relative grid gap-6 overflow-hidden rounded-3xl border border-black/5 bg-gray-50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-black/5 md:grid-cols-[260px_1fr]"
            >
              <BriefcaseBusiness
                aria-hidden="true"
                className="absolute right-6 top-6 h-12 w-12 text-gray-950/10 transition-colors group-hover:text-violet-600/25"
              />
              <div>
                <Badge variant="secondary">{experience.period}</Badge>
                <h2 className="mt-4 text-2xl font-bold tracking-[-0.04em]">
                  {experience.company}
                </h2>
                <p className="mt-2 text-violet-600">{experience.role}</p>
              </div>
              <ul className="space-y-3 text-gray-600">
                {experience.achievements.map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="container mx-auto grid gap-4 pt-10 md:grid-cols-2">
          <article className="relative overflow-hidden rounded-3xl bg-neutral-950 p-8 text-white">
            <GraduationCap
              aria-hidden="true"
              className="absolute right-6 top-6 h-12 w-12 text-white/10"
            />
            <p className="text-sm font-medium uppercase tracking-[0.45em] text-gray-500">
              Education
            </p>
            <div className="mt-6 space-y-4 text-gray-300">
              {education.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>

          <article className="rounded-3xl bg-gray-50 p-8 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-black/5">
            <p className="text-sm font-medium uppercase tracking-[0.45em] text-gray-400">
              Practice
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {certifications.map((certification) => (
                <Badge key={certification} variant="secondary">
                  {certification}
                </Badge>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
