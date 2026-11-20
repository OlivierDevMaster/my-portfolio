import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowDown, ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BOOKING_URL } from "@/lib/site";
import { Button } from "./ui/button";

// Server Component: the entrance animation is CSS (tailwindcss-animate) and the
// portrait's scroll fade is a CSS scroll-driven animation (`hero-portrait` in
// globals.css), so the hero ships no JavaScript and shows before hydration.

const reveal =
  "animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

export default async function Hero() {
  const t = await getTranslations("home.hero");
  const em = (chunks: React.ReactNode) => (
    <em className="italic text-violet-600">{chunks}</em>
  );

  return (
    <section className="container relative isolate mx-auto flex flex-col overflow-hidden pb-8 pt-16 md:min-h-[720px] md:justify-center md:overflow-visible md:py-4 md:pt-6">
      {/* Clipped so a longer word (e.g. in French) never causes sideways scroll. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden md:block"
      >
        <p className="absolute left-8 top-24 select-none whitespace-nowrap text-[12rem] font-bold leading-none tracking-[-0.08em] text-gray-100/60 lg:text-[17rem]">
          {t("watermark")}
        </p>
      </div>

      <div className="relative grid flex-1 items-end gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.85fr)] md:items-center md:gap-10">
        <div className="relative z-10 order-2 mt-[clamp(190px,56vw,230px)] max-w-2xl md:order-1 md:mt-0">
          <p
            className={`${reveal} mb-5 font-mono text-xs uppercase tracking-[0.2em] text-violet-600`}
          >
            {t("eyebrow")}
          </p>

          <h1
            className={`${reveal} delay-150 max-w-full text-balance font-inter-tight text-[clamp(2.25rem,10vw,2.75rem)] font-light leading-[1.08] tracking-tight text-gray-950 md:text-[2.75rem] lg:text-5xl xl:text-6xl`}
          >
            {t.rich("title", { em })}
          </h1>

          <p
            className={`${reveal} delay-300 mt-6 max-w-xl text-base leading-7 text-gray-600 md:mt-7 md:text-xl md:leading-8`}
          >
            {t("intro")}
          </p>

          <div
            className={`${reveal} delay-500 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center`}
          >
            {BOOKING_URL ? (
              <Button size="lg" asChild>
                <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                  <CalendarDays aria-hidden="true" />
                  {t("bookCall")}
                  <span className="sr-only"> {t("opensInNewTab")}</span>
                </a>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link href="/contact">
                  {t("startProject")} <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            )}
            <Button size="lg" variant="outline" asChild>
              <a href="#projects">
                {t("seeWork")}
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
          </div>

          <a
            href="#pricing"
            className={`${reveal} delay-700 mt-4 inline-flex min-h-11 items-center gap-1.5 text-[15px] text-violet-600 underline underline-offset-4 transition-colors hover:text-violet-700`}
          >
            {t("pricingLink")}
            <ArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-end md:pointer-events-auto md:relative md:inset-auto md:order-2 md:self-stretch">
          <div className="hero-portrait relative h-[clamp(300px,95vw,420px)] w-[85%] max-w-[400px] translate-x-8 md:h-full md:min-h-[600px] md:w-full md:max-w-[800px] md:translate-x-0">
            <Image
              src="/me.png"
              alt={t("portraitAlt")}
              width={500}
              height={600}
              priority
              sizes="(min-width: 768px) 50vw, 85vw"
              className="h-full w-full object-contain object-top"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
