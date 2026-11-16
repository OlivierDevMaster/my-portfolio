"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site";

const topics = ["Freelance build", "Full-time role", "Something else"];

const fieldClass =
  "border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-base outline-none transition placeholder:text-gray-400 focus:border-violet-600 focus-visible:ring-0 focus-visible:ring-offset-0 md:text-lg";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const topic = String(formData.get("topic") || "");
    const message = String(formData.get("message") || "");

    const subject = `${topic} — portfolio inquiry from ${name}`;
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
        Start with context
      </p>
      <h2 className="mt-3 font-inter-tight text-3xl font-light">
        Tell me what should exist.
      </h2>

      <fieldset className="mt-8">
        <legend className="font-mono text-[11px] uppercase tracking-widest text-gray-500">
          I'm reaching out about
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
            Name
          </span>
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className={fieldClass}
            placeholder="Your name"
          />
        </label>

        <label className="grid gap-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">
            Email
          </span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            className={fieldClass}
            placeholder="you@company.com"
          />
        </label>

        <label className="grid gap-1">
          <span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">
            Message
          </span>
          <textarea
            required
            name="message"
            rows={5}
            className={`${fieldClass} resize-y`}
            placeholder="What are you building, and where are you stuck?"
          />
        </label>
      </div>

      <button
        type="submit"
        className="group mt-8 inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-violet-600 px-8 font-medium text-white transition hover:bg-violet-700 sm:w-auto"
      >
        Send message
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </button>

      <p aria-live="polite" className="mt-4 text-sm leading-relaxed text-gray-600">
        {sent ? (
          <>
            Your email app should now be open with the message ready. Nothing
            happened? Write directly to{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-neutral-950 underline underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </>
        ) : (
          "Opens your email app with everything filled in."
        )}
      </p>
    </form>
  );
}
