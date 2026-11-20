import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import type { Testimonial } from "@/lib/testimonials";

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
  /** Example quotes in development: shows a banner saying so. */
  preview?: boolean;
};

export default function TestimonialsSection({
  testimonials,
  preview = false,
}: TestimonialsSectionProps) {
  const t = useTranslations("home.testimonials");
  const locale = useLocale() as Locale;

  return (
    <section className="container mx-auto border-b border-gray-200 py-16 md:py-40">
      {preview && (
        <p className="mb-8 rounded-lg border border-dashed border-amber-400 bg-amber-50 px-4 py-3 font-mono text-xs text-amber-900">
          Development preview: example quotes, not shown in production. Add
          real quotes to lib/testimonials.ts.
        </p>
      )}
      <div data-reveal className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
            {t("label")}
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
        </div>
      </div>

      <div
        data-reveal
        className="grid gap-px overflow-hidden rounded-2xl border border-gray-200 bg-gray-200 md:grid-cols-2"
      >
        {testimonials.map((item) => (
          <figure
            key={`${item.project}-${item.name}`}
            className="flex flex-col gap-8 bg-white p-8 md:p-10"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">
                {item.project}
              </span>
              <span className="size-1.5 rounded-full bg-violet-600/60" />
            </div>
            <blockquote className="font-inter-tight text-2xl font-light leading-snug md:text-[28px]">
              “{item.quote[locale]}”
            </blockquote>
            <figcaption className="mt-auto text-sm text-gray-500">
              <span className="font-medium text-neutral-950">{item.name}</span>
              {" · "}
              {item.role[locale]}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
