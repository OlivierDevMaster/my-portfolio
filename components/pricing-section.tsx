import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Step = { n: string; title: string; body: string };

type PricingSectionProps = {
  /** Section label, numbered by the page (it depends on which sections show). */
  label: string;
};

export default function PricingSection({ label }: PricingSectionProps) {
  const t = useTranslations("home.pricing");
  const steps = t.raw("steps") as Step[];

  return (
    <section
      id="pricing"
      className="container mx-auto border-t border-gray-200 py-16 md:py-40"
    >
      <div data-reveal className="mb-10 grid gap-6 md:mb-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
            {label}
          </p>
        </div>
        <div className="lg:col-span-8">
          <h2 className="font-inter-tight text-4xl font-light leading-none tracking-tight text-balance md:text-7xl">
            {t.rich("title", {
              em: (chunks) => (
                <em className="italic text-violet-600">{chunks}</em>
              ),
            })}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
            {t("body")}
          </p>
        </div>
      </div>

      <ol data-reveal className="grid border-y border-gray-200 md:grid-cols-3 md:gap-px md:bg-gray-200">
        {steps.map((step) => (
          <li
            key={step.n}
            className="grid grid-cols-[36px_1fr] gap-x-3 border-b border-gray-200 py-6 last:border-b-0 md:flex md:flex-col md:gap-4 md:border-b-0 md:bg-white md:p-8 md:first:pl-0"
          >
            <span className="pt-1 font-mono text-xs text-violet-600 md:pt-0">
              {step.n}
            </span>
            <div className="space-y-1.5 md:space-y-4">
              <h3 className="font-inter-tight text-[22px] font-light leading-tight md:text-[26px]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div data-reveal className="mt-10 flex flex-col-reverse items-stretch gap-4 md:mt-16 md:flex-row md:items-center md:justify-between">
        <p className="text-center font-mono text-[11px] uppercase tracking-wider text-gray-500 md:text-left md:text-xs">
          {t("note")}
        </p>
        <Link
          href="/contact#brief"
          className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-violet-600 px-8 font-medium text-white transition hover:bg-violet-700"
        >
          {t("cta")}
          <ArrowRight
            aria-hidden="true"
            className="size-5 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
