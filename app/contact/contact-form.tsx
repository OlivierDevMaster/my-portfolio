"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:rasolomanana.olivier@gmail.com?subject=Portfolio inquiry from ${encodeURIComponent(
      name
    )}&body=${body}`;
    setStatus("Your email app is opening with the message ready to send.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 p-6 md:p-10"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
        Start with context
      </p>
      <h2 className="mt-3 font-inter-tight text-3xl font-light">
        Tell me what should exist.
      </h2>

      <div className="mt-8 grid gap-6">
        <label className="grid gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
            Name
          </span>
          <input
            required
            name="name"
            type="text"
            className="border-0 border-b border-gray-200 bg-transparent px-0 py-3 text-lg outline-none transition focus:border-violet-600"
            placeholder="Your name"
          />
        </label>

        <label className="grid gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
            Email
          </span>
          <input
            required
            name="email"
            type="email"
            className="border-0 border-b border-gray-200 bg-transparent px-0 py-3 text-lg outline-none transition focus:border-violet-600"
            placeholder="you@example.com"
          />
        </label>

        <label className="grid gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
            Message
          </span>
          <textarea
            required
            name="message"
            rows={5}
            className="resize-none border-0 border-b border-gray-200 bg-transparent px-0 py-3 text-lg outline-none transition focus:border-violet-600"
            placeholder="What are you building, and what should change?"
          />
        </label>
      </div>

      <button
        type="submit"
        className="group mt-8 inline-flex items-center gap-3 rounded-full bg-neutral-950 px-8 py-4 text-sm font-medium text-white transition hover:bg-neutral-800"
      >
        Send message
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>

      {status && <p className="mt-4 text-sm text-gray-500">{status}</p>}
    </form>
  );
}
