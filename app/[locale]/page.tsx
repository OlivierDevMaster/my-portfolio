import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/hero";
import ContactCta from "@/components/contact-cta";
import PricingSection from "@/components/pricing-section";
import ProjectRow from "@/components/project-row";
import PostRow from "@/components/post-row";
import TestimonialsSection from "@/components/testimonials-section";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { currentProjects } from "@/lib/projects";
import { getPosts } from "@/lib/posts";
import { alternatesFor, localePath } from "@/lib/seo";
import { SITE_URL, socialLinks } from "@/lib/site";
import { exampleTestimonials, testimonials } from "@/lib/testimonials";

// Real quotes when there are some; otherwise example quotes in development
// only, so the section's design can be previewed. Production shows nothing.
const isPreview =
  testimonials.length === 0 && process.env.NODE_ENV === "development";
const shownTestimonials = isPreview ? exampleTestimonials : testimonials;
import { ArrowRight } from "lucide-react";

type PageProps = { params: { locale: Locale } };

type Service = { n: string; title: string; body: string };
type Stat = { n: string; value: string; label: string };

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

const em = (chunks: React.ReactNode) => (
  <em className="italic text-violet-600">{chunks}</em>
);

export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "home.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/"),
  };
}

export default async function Home({ params: { locale } }: PageProps) {
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const posts = getPosts(locale);
  const services = t.raw("expertise.services") as Service[];
  const stats = t.raw("numbers.stats") as Stat[];
  const tNav = await getTranslations("common.nav");

  // Tells search engines who the site is about (name, role, profiles).
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Olivier Rasolomanana",
    jobTitle: tNav("role"),
    url: `${SITE_URL}${localePath(locale, "/")}`,
    image: `${SITE_URL}/me.png`,
    sameAs: socialLinks.map((social) => social.href),
  };

  return (
    <div className="bg-white text-neutral-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main id="main" className="px-5 md:px-10">
        <Hero />

        {/* STACK MARQUEE */}
        <section
          aria-label={t("stack.label")}
          className="mt-6 overflow-hidden border-y border-gray-200 md:mt-10"
        >
          <p className="sr-only">{expertiseTechStack.join(", ")}</p>
          <div
            aria-hidden="true"
            className="flex w-max animate-marquee gap-14 whitespace-nowrap py-3 motion-reduce:animate-none md:py-6"
          >
            {[...expertiseTechStack, ...expertiseTechStack].map(
              (tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className="flex items-center gap-14 font-inter-tight text-lg sm:text-3xl font-light italic text-gray-500 md:text-4xl"
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
          className="container mx-auto border-b border-gray-200 py-16 md:py-40"
        >
          <div data-reveal className="mb-10 grid gap-6 md:mb-20 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                {t("expertise.label")}
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-7xl">
                {t.rich("expertise.title", { em })}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
                {t("expertise.intro")}
              </p>
            </div>
          </div>

          <div data-reveal className="grid gap-px bg-gray-200 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.n}
                className="group bg-white p-8 transition-colors hover:bg-gray-50 md:p-10"
              >
                <div className="mb-8 flex items-center justify-between md:mb-16">
                  <span className="font-mono text-xs text-gray-500">
                    {service.n}
                  </span>
                  <span className="size-1.5 rounded-full bg-violet-600/60 transition-colors group-hover:bg-violet-600" />
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
          className="container mx-auto border-b border-gray-200 py-16 md:py-40"
        >
          <div data-reveal className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                {t("work.label")}
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-7xl">
                {t.rich("work.title", { em })}
              </h2>
            </div>
          </div>

          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {currentProjects.map((project, index) => (
              <li key={project.name} data-reveal>
                <ProjectRow project={project} index={index} />
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="/projects"
              className="group inline-flex min-h-11 items-center gap-2 font-mono text-sm text-gray-600 transition-colors hover:text-neutral-950"
            >
              {t("work.viewAll")}
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

        {/* TESTIMONIALS (real quotes; example quotes in development only) */}
        {shownTestimonials.length > 0 && (
          <TestimonialsSection
            testimonials={shownTestimonials}
            preview={isPreview}
          />
        )}

        {/* NUMBERS */}
        <section className="container mx-auto border-b border-gray-200 py-16 md:py-40">
          <div data-reveal className="mb-10 grid gap-6 md:mb-20 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                {t("numbers.label")}
              </p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-inter-tight text-3xl font-light leading-tight tracking-tight text-balance md:text-7xl">
                {t.rich("numbers.title", { em })}
              </h2>
            </div>
          </div>

          <div data-reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.n}
                className="group bg-white p-5 transition-colors hover:bg-gray-50 sm:p-8 md:p-10"
              >
                <div className="mb-10 flex items-center justify-between md:mb-16">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">
                    {stat.n}
                  </span>
                  <span className="size-1.5 rounded-full bg-violet-600/60 transition-colors group-hover:bg-violet-600" />
                </div>
                <div className="mb-6 font-inter-tight text-5xl font-light leading-none text-violet-600 sm:text-6xl md:text-8xl">
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

        {/* WRITING (shown once at least two posts are published) */}
        {posts.length >= 2 && (
          <section
            id="articles"
            className="container mx-auto py-16 md:py-40"
          >
            <div data-reveal className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
                  {t("writing.label")}
                </p>
              </div>
              <div className="lg:col-span-8">
                <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-7xl">
                  {t.rich("writing.title", { em })}
                </h2>
              </div>
            </div>

            <ul className="divide-y divide-gray-200 border-y border-gray-200">
              {posts.slice(0, 3).map((post) => (
                <li key={post.slug} data-reveal>
                  <PostRow post={post} as="h3" />
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/blog"
                className="group inline-flex min-h-11 items-center gap-2 font-mono text-sm text-gray-600 transition-colors hover:text-neutral-950"
              >
                {t("writing.viewAll")}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </section>
        )}

        {/* PRICING */}
        <PricingSection
          label={
            posts.length >= 2
              ? t("pricing.labelWithWriting")
              : t("pricing.label")
          }
        />

        {/* CONTACT */}
        <ContactCta
          reveal
          label={
            posts.length >= 2
              ? t("contact.labelWithWriting")
              : t("contact.label")
          }
          title={t.rich("contact.title", { em })}
          body={t("contact.body")}
        />
      </main>
    </div>
  );
}
