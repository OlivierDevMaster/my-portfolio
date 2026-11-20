"use client";

import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import ContactForm from "./contact-form";

type Tab = "book" | "brief";
const tabs: Tab[] = ["book", "brief"];

type ContactOptionsProps = {
  /** Booking page URL; when null only the brief form is shown. */
  bookingUrl: string | null;
};

/**
 * The two ways to get in touch: book a call (opens the booking page) or send
 * a brief (the mailto form). Links to /contact#brief open the brief directly.
 */
export default function ContactOptions({ bookingUrl }: ContactOptionsProps) {
  const t = useTranslations("contact.options");
  const [tab, setTab] = useState<Tab>("book");
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({
    book: null,
    brief: null,
  });

  useEffect(() => {
    if (window.location.hash === "#brief") setTab("brief");
  }, []);

  if (!bookingUrl) return <ContactForm />;

  // Arrow keys move between tabs, as in the WAI-ARIA tabs pattern.
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = tabs[(tabs.indexOf(tab) + 1) % tabs.length];
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={t("label")}
        className="mb-4 inline-flex gap-1 rounded-full bg-gray-100 p-1"
      >
        {tabs.map((item) => {
          const selected = tab === item;
          return (
            <button
              key={item}
              ref={(node) => {
                tabRefs.current[item] = node;
              }}
              type="button"
              role="tab"
              id={`tab-${item}`}
              aria-selected={selected}
              aria-controls={`panel-${item}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(item)}
              onKeyDown={onKeyDown}
              className={`inline-flex h-11 items-center rounded-full px-5 text-sm font-medium transition-colors ${
                selected
                  ? "bg-white text-neutral-950 shadow-sm"
                  : "text-gray-600 hover:text-neutral-950"
              }`}
            >
              {t(item)}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="panel-book"
        aria-labelledby="tab-book"
        hidden={tab !== "book"}
      >
        <div className="rounded-2xl border border-gray-200 p-5 sm:p-6 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
            {t("bookEyebrow")}
          </p>
          <h2 className="mt-3 font-inter-tight text-3xl font-light">
            {t("bookTitle")}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-gray-600">
            {t("bookBody")}
          </p>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-violet-600 px-8 font-medium text-white transition hover:bg-violet-700 sm:w-auto"
          >
            <CalendarDays aria-hidden="true" className="size-4" />
            {t("bookCta")}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
            <span className="sr-only"> {t("opensInNewTab")}</span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            {t("bookHint")}
          </p>
        </div>
      </div>

      <div
        role="tabpanel"
        id="panel-brief"
        aria-labelledby="tab-brief"
        hidden={tab !== "brief"}
      >
        <ContactForm />
      </div>
    </div>
  );
}
