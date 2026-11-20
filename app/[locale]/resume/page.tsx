import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowDown, ArrowRight } from "lucide-react";
import ContactCta from "@/components/contact-cta";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";
import { CV_PATH } from "@/lib/site";

type PageProps = { params: { locale: Locale } };

type Experience = {
  period: string;
  company: string;
  role: string;
  achievements: string[];
};

const em = (chunks: React.ReactNode) => (
  <em className="italic text-violet-600">{chunks}</em>
);

export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "resume.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/resume"),
  };
}

export default async function ResumePage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);
  const t = await getTranslations("resume");
  const experiences = t.raw("experience.items") as Experience[];
  const education = t.raw("foundation.education") as string[];
  const certifications = t.raw("foundation.practice") as string[];

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
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={CV_PATH}
              download="Olivier_Rasolomanana_CV.pdf"
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              {t("downloadCv")}
              <ArrowDown
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-y-0.5"
              />
            </a>
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-full border border-gray-200 px-6 text-sm font-medium transition hover:bg-gray-50"
            >
              {t("getInTouch")}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="container mx-auto border-b border-gray-200 py-16 md:py-40">
          <div data-reveal className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                {t("experience.eyebrow")}
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-6xl">
                {t.rich("experience.title", { em })}
              </h2>
            </div>
          </div>

          <ul className="divide-y divide-gray-200 border-t border-gray-200">
            {experiences.map((experience) => (
              <li
                key={experience.company}
                data-reveal
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
          <div data-reveal className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                {t("foundation.eyebrow")}
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-6xl">
                {t.rich("foundation.title", { em })}
              </h2>
            </div>
          </div>

          <div data-reveal className="grid gap-px bg-gray-200 md:grid-cols-2">
            <div className="bg-white p-8 md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
                {t("foundation.educationLabel")}
              </p>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-500">
                {education.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">
                {t("foundation.practiceLabel")}
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

        <ContactCta showResume={false} reveal />
      </main>
    </div>
  );
}
