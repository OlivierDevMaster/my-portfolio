import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactCta from "@/components/contact-cta";
import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";

type PageProps = { params: { locale: Locale } };

type Principle = { n: string; title: string; body: string };
type SkillGroup = { title: string; skills: string[] };
type Milestone = {
  year: string;
  tag: string;
  title: string;
  description: string;
  stack: string[];
};

const em = (chunks: React.ReactNode) => (
  <em className="italic text-violet-600">{chunks}</em>
);

export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "about.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/about"),
  };
}

export default async function AboutPage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const principles = t.raw("principles.items") as Principle[];
  const skillGroups = t.raw("skills.groups") as SkillGroup[];
  const milestones = t.raw("timeline.items") as Milestone[];

  return (
    <div className="bg-white text-neutral-950">
      <main id="main" className="px-5 md:px-10">
        {/* HERO */}
        <section className="container mx-auto border-b border-gray-200 pb-16 pt-32 md:pb-24 md:pt-40">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
            {t("eyebrow")}
          </p>
          <h1 className="max-w-5xl font-inter-tight text-5xl font-light leading-[0.95] tracking-tight text-balance md:text-8xl">
            {t.rich("title", { em })}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-500">
            {t("intro")}
          </p>
        </section>

        {/* PRINCIPLES */}
        <section className="container mx-auto border-b border-gray-200 py-16 md:py-40">
          <div data-reveal className="mb-10 grid gap-6 md:mb-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                {t("principles.eyebrow")}
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-6xl">
                {t.rich("principles.title", { em })}
              </h2>
            </div>
          </div>

          <div data-reveal className="grid gap-px bg-gray-200 md:grid-cols-3">
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
          <div data-reveal className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                {t("skills.eyebrow")}
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-6xl">
                {t.rich("skills.title", { em })}
              </h2>
            </div>
          </div>

          <div data-reveal className="grid gap-px bg-gray-200 md:grid-cols-2">
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
          <div data-reveal className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                {t("timeline.eyebrow")}
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-6xl">
                {t.rich("timeline.title", { em })}
              </h2>
            </div>
          </div>

          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {milestones.map((milestone) => (
              <li
                key={milestone.year}
                data-reveal
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

        <ContactCta reveal />
      </main>
    </div>
  );
}
