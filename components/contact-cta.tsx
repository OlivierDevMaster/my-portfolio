import { useTranslations } from "next-intl";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Mail,
  PenLine,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BOOKING_URL, CONTACT_EMAIL, CV_PATH } from "@/lib/site";
import CopyEmailButton from "./copy-email-button";

type ContactCtaProps = {
  label?: string;
  title?: React.ReactNode;
  body?: string;
  showResume?: boolean;
  /** Blurs the section in as it scrolls into view (kept off on blog pages). */
  reveal?: boolean;
};

const cardClass = "flex min-w-0 flex-col gap-3 rounded-[20px] bg-zinc-900 p-6 md:p-7";
const darkFocus = "focus-visible:ring-offset-neutral-950";

/**
 * The closing contact block on every page: a dark panel with two ways in,
 * booking a call (or, without BOOKING_URL, sending a brief) and email.
 */
export default function ContactCta({
  label,
  title,
  body,
  showResume = true,
  reveal = false,
}: ContactCtaProps) {
  const t = useTranslations("common.cta");

  return (
    <section
      data-reveal={reveal || undefined}
      className="container mx-auto py-16 md:py-32"
    >
      <div className="flex flex-col gap-10 rounded-[24px] bg-neutral-950 p-6 text-white sm:p-10 md:rounded-[32px] md:p-16 lg:p-[72px]">
        <div className="max-w-3xl">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-violet-300">
            {label ?? t("label")}
          </p>
          {/* Pages pass titles with the site's violet-600 <em>; on black it
              needs the lighter violet-300, hence the [&_em] override. */}
          <h2 className="font-inter-tight text-4xl font-light leading-[1.05] tracking-tight text-balance md:text-7xl [&_em]:text-violet-300">
            {title ??
              t.rich("title", {
                em: (chunks) => (
                  <em className="italic text-violet-300">{chunks}</em>
                ),
              })}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
            {body ?? t("body")}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {BOOKING_URL ? (
            <div className={cardClass}>
              <CalendarDays aria-hidden="true" className="size-6 text-violet-300" />
              <h3 className="text-xl font-medium">{t("bookTitle")}</h3>
              <p className="text-[15px] leading-relaxed text-gray-300">
                {t("bookBody")}
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className={`group mt-auto inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-white px-6 text-[15px] font-medium text-neutral-950 transition hover:bg-gray-200 ${darkFocus}`}
              >
                {t("bookCta")}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only"> {t("opensInNewTab")}</span>
              </a>
            </div>
          ) : (
            <div className={cardClass}>
              <PenLine aria-hidden="true" className="size-6 text-violet-300" />
              <h3 className="text-xl font-medium">{t("briefTitle")}</h3>
              <p className="text-[15px] leading-relaxed text-gray-300">
                {t("briefBody")}
              </p>
              <Link
                href="/contact#brief"
                className={`group mt-auto inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-white px-6 text-[15px] font-medium text-neutral-950 transition hover:bg-gray-200 ${darkFocus}`}
              >
                {t("start")}
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          )}

          <div className={cardClass}>
            <Mail aria-hidden="true" className="size-6 text-violet-300" />
            <h3 className="text-xl font-medium">{t("emailTitle")}</h3>
            <p className="text-[15px] leading-relaxed text-gray-300">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={`break-all text-white underline decoration-zinc-600 underline-offset-4 transition hover:decoration-white ${darkFocus}`}
              >
                {CONTACT_EMAIL}
              </a>
              <span className="block">{t("emailBody")}</span>
            </p>
            <div className="mt-auto">
              <CopyEmailButton />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-zinc-800 pt-6 text-sm">
          {BOOKING_URL && (
            <Link
              href="/contact#brief"
              className={`group inline-flex min-h-11 items-center gap-2 text-gray-300 transition hover:text-white ${darkFocus}`}
            >
              {t("briefLink")}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          )}
          {showResume && (
            <a
              href={CV_PATH}
              download="Olivier_Rasolomanana_CV.pdf"
              className={`group inline-flex min-h-11 items-center gap-2 text-gray-300 transition hover:text-white ${darkFocus}`}
            >
              <ArrowDown
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-y-0.5"
              />
              {t("downloadCv")}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
