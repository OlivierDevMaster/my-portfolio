"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

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
      className="rounded-3xl border border-black/5 bg-gray-50 p-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-black/5"
    >
      <div className="mb-8">
        <p className="text-sm font-medium tracking-wide text-violet-600">
          Start with context
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.06em]">
          Tell me what should exist.
        </h2>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-2">
          <span className="font-bold">Name</span>
          <input
            required
            name="name"
            type="text"
            className="rounded-2xl border bg-white px-4 py-3 outline-none transition focus:border-gray-950 focus:ring-2 focus:ring-gray-950/10"
            placeholder="Your name"
          />
        </label>

        <label className="grid gap-2">
          <span className="font-bold">Email</span>
          <input
            required
            name="email"
            type="email"
            className="rounded-2xl border bg-white px-4 py-3 outline-none transition focus:border-gray-950 focus:ring-2 focus:ring-gray-950/10"
            placeholder="you@example.com"
          />
        </label>

        <label className="grid gap-2">
          <span className="font-bold">Message</span>
          <textarea
            required
            name="message"
            rows={6}
            className="resize-none rounded-2xl border bg-white px-4 py-3 outline-none transition focus:border-gray-950 focus:ring-2 focus:ring-gray-950/10"
            placeholder="What are you building, and what should change?"
          />
        </label>
      </div>

      <div className="mt-6">
        <Button type="submit" size="lg">
          <Mail aria-hidden="true" className="h-4 w-4 opacity-70" />
          Send message
        </Button>
      </div>

      {status && <p className="mt-4 text-gray-600">{status}</p>}
    </form>
  );
}
