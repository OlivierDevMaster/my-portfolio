import type { Metadata } from "next";
import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import ContactCta from "@/components/contact-cta";
import { CV_PATH } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume — Olivier Rasolomanana",
  description:
    "Experience, judgment, and technical range Olivier Rasolomanana brings to teams turning product ideas into usable software.",
};

const experiences = [
  {
    period: "2023 — Present",
    company: "Independent Product Builds",
    role: "Product Engineer",
    achievements: [
      "Turned discovery, booking, and operations ideas into usable web and mobile products.",
      "Shaped interfaces, APIs, and data flows around real product behavior.",
      "Partnered with founders to clarify scope before writing code.",
    ],
  },
  {
    period: "2022 — Present",
    company: "Freelance Collaborations",
    role: "Product Engineer",
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
    <div className="bg-white text-neutral-950">
      <main id="main" className="px-5 md:px-10">
        {/* HERO */}
        <section className="container mx-auto border-b border-gray-200 pb-16 pt-32 md:pb-24 md:pt-40">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
            (—) Resume
          </p>
          <h1 className="max-w-5xl font-inter-tight text-5xl font-light leading-[0.95] tracking-tight text-balance md:text-8xl">
            Experience shaped by{" "}
            <em className="italic text-violet-600">delivery.</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-500">
            A concise view of the work, judgment, and technical range I bring to
            teams turning product ideas into usable software.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={CV_PATH}
              download="Olivier_Rasolomanana_CV.pdf"
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Download CV (PDF)
              <ArrowDown
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-y-0.5"
              />
            </a>
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-full border border-gray-200 px-6 text-sm font-medium transition hover:bg-gray-50"
            >
              Get in touch
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="container mx-auto border-b border-gray-200 py-16 md:py-40">
          <div className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                (01) Experience
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-6xl">
                Work measured in{" "}
                <em className="italic text-violet-600">shipped</em> product.
              </h2>
            </div>
          </div>

          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {experiences.map((experience) => (
              <li
                key={experience.company}
                className="grid grid-cols-12 gap-4 py-8 md:py-10"
              >
                <div className="col-span-12 md:col-span-4">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-gray-500">
                    {experience.period}
                  </div>
                  <h3 className="mt-3 font-inter-tight text-2xl font-light md:text-3xl">
                    {experience.company}
                  </h3>
                  <p className="mt-1 text-sm text-violet-600">
                    {experience.role}
                  </p>
                </div>
                <ul className="col-span-12 space-y-3 text-sm leading-relaxed text-gray-600 md:col-span-8">
                  {experience.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-3">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-violet-600/60" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* EDUCATION + PRACTICE */}
        <section className="container mx-auto py-16 md:py-40">
          <div className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                (02) Foundation
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-6xl">
                Learning that stays{" "}
                <em className="italic text-violet-600">practical.</em>
              </h2>
            </div>
          </div>

          <div className="grid gap-px bg-gray-200 md:grid-cols-2">
            <div className="bg-white p-8 md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
                Education
              </p>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-500">
                {education.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
                Practice
              </p>
              <div className="mt-6 flex flex-wrap gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gray-500">
                {certifications.map((certification) => (
                  <span
                    key={certification}
                    className="rounded-full border border-gray-200 px-2 py-0.5"
                  >
                    {certification}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ContactCta showResume={false} />
      </main>
    </div>
  );
}
