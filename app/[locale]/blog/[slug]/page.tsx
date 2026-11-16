import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ContactCta from "@/components/contact-cta";
import PostBody from "@/components/post-body";
import PostRow from "@/components/post-row";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { currentProjects, pastProjects } from "@/lib/projects";
import {
  formatPostDate,
  getPost,
  getPosts,
  postSlugs,
  readingMinutes,
} from "@/lib/posts";

type PostPageProps = { params: { locale: Locale; slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    postSlugs.map((slug) => ({ locale, slug }))
  );
}

export function generateMetadata({
  params: { locale, slug },
}: PostPageProps): Metadata {
  const post = getPost(locale, slug);
  if (!post) return {};
  return {
    title: `${post.title} — Olivier Rasolomanana`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default async function PostPage({
  params: { locale, slug },
}: PostPageProps) {
  setRequestLocale(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();
  const t = await getTranslations("common");

  const project = [...currentProjects, ...pastProjects].find(
    (item) => item.name === post.project
  );
  const otherPosts = getPosts(locale).filter((item) => item.slug !== post.slug);

  return (
    <div className="bg-white text-neutral-950">
      <main id="main" className="px-5 md:px-10">
        <article className="mx-auto max-w-2xl pb-16 pt-24 md:pb-24 md:pt-32">
          <header>
            <Link
              href="/blog"
              className="group -ml-1 inline-flex min-h-11 items-center gap-2 px-1 font-mono text-xs uppercase tracking-widest text-gray-500 transition-colors hover:text-neutral-950"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-4 transition-transform group-hover:-translate-x-0.5"
              />
              {t("post.allNotes")}
            </Link>

            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
              {post.category}
            </p>
            <h1 className="mt-4 font-inter-tight text-4xl font-light leading-[1.05] tracking-tight text-balance md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 md:text-xl">
              {post.description}
            </p>

            <div className="mt-10 flex items-center gap-3 border-y border-gray-200 py-4">
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-sm font-medium text-white"
              >
                O
              </span>
              <div className="min-w-0 text-sm leading-tight">
                <p className="font-medium text-neutral-950">
                  Olivier Rasolomanana
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-gray-500">
                  <time dateTime={post.date}>
                    {formatPostDate(post.date, locale)}
                  </time>
                  {" · "}
                  {t("post.minRead", { minutes: readingMinutes(post) })}
                </p>
              </div>
            </div>
          </header>

          <div className="mt-10 md:mt-12">
            <PostBody blocks={post.blocks} />
          </div>

          {project && (
            <aside className="mt-16 rounded-xl border border-gray-200 p-6 md:p-8">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-gray-500">
                {t("post.fromProject")}
              </p>
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <p className="font-inter-tight text-2xl font-light md:text-3xl">
                    {project.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    {project.tag[locale]}
                  </p>
                </div>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex min-h-11 items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-neutral-950 transition-colors hover:text-violet-600"
                  >
                    {project.linkLabel?.[locale] ?? t("project.visit")}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                    <span className="sr-only">{t("project.opensInNewTab")}</span>
                  </a>
                ) : (
                  <span className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
                    {t("project.private")}
                  </span>
                )}
              </div>
            </aside>
          )}

          {otherPosts.length > 0 && (
            <nav aria-label={t("post.moreNotes")} className="mt-16">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                {t("post.keepReading")}
              </p>
              <ul className="divide-y divide-gray-200 border-y border-gray-200">
                {otherPosts.slice(0, 2).map((item) => (
                  <li key={item.slug}>
                    <PostRow post={item} as="h3" compact />
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </article>

        <ContactCta
          title={t.rich("post.cta.title", {
            em: (chunks) => (
              <em className="italic text-violet-600">{chunks}</em>
            ),
          })}
          body={t("post.cta.body")}
        />
      </main>
    </div>
  );
}
