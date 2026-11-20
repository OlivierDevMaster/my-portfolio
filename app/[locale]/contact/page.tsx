import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactOptions from "./contact-options";
import CopyEmail from "./copy-email";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";
import { BOOKING_URL, socialLinks } from "@/lib/site";

type PageProps = { params: { locale: Locale } };

const em = (chunks: React.ReactNode) => (
  <em className="italic text-violet-600">{chunks}</em>
);

export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "contact.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/contact"),
  };
}

export default async function ContactPage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const availability = [
    t("availability.freelance"),
    t("availability.fullTime"),
    t("availability.remote"),
  ];

  return (
    <div className="bg-white text-neutral-950">
      <main id="main" className="px-5 md:px-10">
        {/* Mobile order: intro, then the ways to get in touch, then email and
            profiles. Desktop: intro and email/profiles on the left, options
            on the right. min-w-0 keeps long content (the email) inside. */}
        <section className="container mx-auto grid gap-12 pb-16 pt-28 md:gap-16 md:pb-24 md:pt-40 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-x-24 lg:gap-y-0">
          {/* INTRO */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
              {t("eyebrow")}
            </p>
            <h1 className="font-inter-tight text-5xl font-light leading-[0.95] tracking-tight text-balance md:text-7xl">
              {t.rich("title", { em })}
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-gray-500">
              {BOOKING_URL ? t("introBooking") : t("intro")}
            </p>

            <div className="mt-8 flex flex-wrap gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gray-500">
              {availability.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gray-200 px-3 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* OPTIONS */}
          <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <ContactOptions bookingUrl={BOOKING_URL} />
          </div>

          {/* EMAIL + PROFILES */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-2 [&>*:first-child]:mt-0 lg:[&>*:first-child]:mt-10">
            <CopyEmail />

            <div className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
              {socialLinks.map((social) => {
                const SocialIcon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-12 items-center justify-between py-3 transition-colors hover:text-violet-600"
                  >
                    <span className="flex items-center gap-3">
                      <SocialIcon aria-hidden="true" className="size-4" />
                      {social.label}
                    </span>
                    <ArrowUpRight aria-hidden="true" className="size-4 text-gray-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-600" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
