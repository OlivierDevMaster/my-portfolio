import { useTranslations } from "next-intl";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CV_PATH } from "@/lib/site";

type ContactCtaProps = {
  label?: string;
  title?: React.ReactNode;
  body?: string;
  showResume?: boolean;
  /** Blurs the section in as it scrolls into view (kept off on blog pages). */
  reveal?: boolean;
};

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
      className="container mx-auto border-t border-gray-200 py-20 text-center md:py-32">
      <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
        {label ?? t("label")}
      </p>
      <h2 className="mx-auto max-w-4xl font-inter-tight text-4xl font-light leading-[1.05] tracking-tight text-balance md:text-7xl">
        {title ??
          t.rich("title", {
            em: (chunks) => (
              <em className="italic text-violet-600">{chunks}</em>
            ),
          })}
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
        {body ?? t("body")}
      </p>
      <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <Link
          href="/contact"
          className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-violet-600 px-8 font-medium text-white transition hover:bg-violet-700"
        >
          {t("start")}
          <ArrowRight
            aria-hidden="true"
            className="size-5 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
        {showResume && (
          <a
            href={CV_PATH}
            download="Olivier_Rasolomanana_CV.pdf"
            className="group inline-flex h-14 items-center justify-center gap-3 rounded-full border border-gray-200 px-8 font-medium transition hover:bg-gray-50"
          >
            {t("downloadCv")}
            <ArrowDown
              aria-hidden="true"
              className="size-5 transition-transform group-hover:translate-y-0.5"
            />
          </a>
        )}
      </div>
    </section>
  );
}
