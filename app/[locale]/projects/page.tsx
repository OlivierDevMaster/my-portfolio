import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactCta from "@/components/contact-cta";
import ProjectRow from "@/components/project-row";
import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";
import { currentProjects, pastProjects } from "@/lib/projects";

type PageProps = { params: { locale: Locale } };

const em = (chunks: React.ReactNode) => (
  <em className="italic text-violet-600">{chunks}</em>
);

export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "projects.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/projects"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

export default async function ProjectsPage({
  params: { locale },
}: PageProps) {
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const total = currentProjects.length + pastProjects.length;

  const groups = [
    {
      key: "now",
      label: t("groups.now.label"),
      note: t("groups.now.note"),
      projects: currentProjects,
    },
    {
      key: "earlier",
      label: t("groups.earlier.label"),
      note: t("groups.earlier.note"),
      projects: pastProjects,
    },
  ];

  return (
    <div className="bg-white text-neutral-950">
      <main id="main" className="px-5 md:px-10">
        {/* HERO */}
        <section className="container mx-auto border-b border-gray-200 pb-16 pt-32 md:pb-24 md:pt-40">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
            {t("eyebrow", { count: total })}
          </p>
          <h1 className="max-w-5xl font-inter-tight text-5xl font-light leading-[0.95] tracking-tight text-balance md:text-8xl">
            {t.rich("title", { em })}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-600">
            {t("intro")}
          </p>
        </section>

        {/* LIST */}
        <section className="container mx-auto space-y-14 py-12 md:space-y-20 md:py-24">
          {groups.map((group) => (
            <div
              key={group.key}
              className="grid gap-4 xl:grid-cols-12 xl:gap-8"
            >
              {/* The label sits beside the list (and stays in view while
                  scrolling) only from xl, where its column is wide enough for
                  the longest French label ("Maintenant"); below, it stacks. */}
              <div className="xl:col-span-3">
                <div className="flex flex-wrap items-baseline gap-x-4 xl:sticky xl:top-24 xl:block">
                  <h2 className="font-inter-tight text-5xl font-light text-violet-600 md:text-6xl xl:text-5xl">
                    {group.label}
                  </h2>
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest text-gray-500">
                    {group.note}
                  </p>
                </div>
              </div>

              {/* Top border only: the next group (or the closing CTA) draws
                  the following line, so lines never double up. */}
              <ul className="divide-y divide-gray-200 border-t border-gray-200 xl:col-span-9">
                {group.projects.map((project) => (
                  <li key={project.name} data-reveal>
                    <ProjectRow project={project} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <ContactCta reveal />
      </main>
    </div>
  );
}
