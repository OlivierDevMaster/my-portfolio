import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactCta from "@/components/contact-cta";
import PostRow from "@/components/post-row";
import type { Locale } from "@/i18n/routing";
import { getPosts } from "@/lib/posts";

type PageProps = { params: { locale: Locale } };

const em = (chunks: React.ReactNode) => (
  <em className="italic text-violet-600">{chunks}</em>
);

export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "blog.metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function BlogPage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const posts = getPosts(locale);

  return (
    <div className="bg-white text-neutral-950">
      <main id="main" className="px-5 md:px-10">
        {/* HERO */}
        <section className="container mx-auto pb-12 pt-32 md:pb-16 md:pt-40">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
            {t("eyebrow", { count: posts.length })}
          </p>
          <h1 className="max-w-5xl font-inter-tight text-5xl font-light leading-[0.95] tracking-tight text-balance md:text-8xl">
            {t.rich("title", { em })}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-600">
            {t("intro")}
          </p>
        </section>

        {/* LIST */}
        <section className="container mx-auto pb-16 md:pb-24">
          <ul className="divide-y divide-gray-200 border-t border-gray-200">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostRow post={post} />
              </li>
            ))}
          </ul>
        </section>

        <ContactCta
          title={t.rich("cta.title", { em })}
          body={t("cta.body")}
          showResume={false}
        />
      </main>
    </div>
  );
}
