"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site";

const fieldClass =
  "border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-base outline-none transition placeholder:text-gray-400 focus:border-violet-600 focus-visible:ring-0 focus-visible:ring-offset-0 md:text-lg";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [sent, setSent] = useState(false);

  const topics = [
    t("topics.freelance"),
    t("topics.fullTime"),
    t("topics.other"),
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const topic = String(formData.get("topic") || "");
    const message = String(formData.get("message") || "");

    const subject = t("subject", { topic, name });
    const body = `${message}\n\n—\n${name}\n${email}`;

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 p-5 sm:p-6 md:p-10"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
        {t("eyebrow")}
      </p>
      <h2 className="mt-3 font-inter-tight text-3xl font-light">
        {t("title")}
      </h2>

      <fieldset className="mt-8">
        <legend className="font-mono text-[11px] uppercase tracking-widest text-gray-500">
          {t("topicLegend")}
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <label key={topic} className="cursor-pointer">
              <input
                type="radio"
                name="topic"
                value={topic}
                defaultChecked={index === 0}
                className="peer sr-only"
              />
              <span className="inline-flex h-10 items-center rounded-full border border-gray-200 px-4 text-sm text-gray-600 transition peer-checked:border-violet-600 peer-checked:bg-violet-50 peer-checked:text-violet-700 peer-focus-visible:ring-2 peer-focus-visible:ring-violet-600 peer-focus-visible:ring-offset-2">
                {topic}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-6">
        <label className="grid gap-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">
            {t("name")}
          </span>
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className={fieldClass}
            placeholder={t("namePlaceholder")}
          />
        </label>

        <label className="grid gap-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">
            {t("email")}
          </span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className={fieldClass}
            placeholder={t("emailPlaceholder")}
          />
        </label>

        <label className="grid gap-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">
            {t("message")}
          </span>
          <textarea
            required
            name="message"
            rows={5}
            className={`${fieldClass} resize-y`}
            placeholder={t("messagePlaceholder")}
          />
        </label>
      </div>

      <button
        type="submit"
        className="group mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-violet-600 px-8 font-medium text-white transition hover:bg-violet-700 sm:w-auto"
      >
        {t("submit")}
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </button>

      <p aria-live="polite" className="mt-4 text-sm leading-relaxed text-gray-600">
        {sent
          ? t.rich("sent", {
              email: CONTACT_EMAIL,
              link: (chunks) => (
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-neutral-950 underline underline-offset-4"
                >
                  {chunks}
                </a>
              ),
            })
          : t("hint")}
      </p>
    </form>
  );
}
