import type { Metadata } from "next";
import ContactForm from "./contact-form";
import CopyEmail from "./copy-email";
import { ArrowUpRight } from "lucide-react";
import { socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Olivier Rasolomanana",
  description:
    "Start a conversation about the product, platform, or workflow you want to build. Open to freelance builds and product engineering roles.",
};

const availability = ["Freelance builds", "Full-time product roles", "Remote work"];

export default function ContactPage() {
  return (
    <div className="bg-white text-neutral-950">
      <main id="main" className="px-5 md:px-10">
        <section className="container mx-auto grid gap-12 pb-16 pt-28 md:gap-16 md:pb-24 md:pt-40 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-24">
          {/* LEFT */}
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
              (—) Contact
            </p>
            <h1 className="font-inter-tight text-5xl font-light leading-[0.95] tracking-tight text-balance md:text-7xl">
              Bring me a{" "}
              <em className="italic text-violet-600">problem</em> worth
              solving.
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-gray-500">
              Send a short note about the product, platform, or workflow you want
              to build or fix. Freelance build or full-time role, a few lines of
              context are enough to start.
            </p>

            <div className="mt-8 flex flex-wrap gap-1.5 font-mono text-[11px] uppercase tracking-wider text-gray-500">
              {availability.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gray-200 px-3 py-1"
                >
                  {item}
                </span>
              ))}
            </div>

            <CopyEmail />

            <div className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
              {socialLinks.map((social) => {
                const SocialIcon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-12 items-center justify-between py-3 transition-colors hover:text-violet-600"
                  >
                    <span className="flex items-center gap-3">
                      <SocialIcon aria-hidden="true" className="size-4" />
                      {social.label}
                    </span>
                    <ArrowUpRight aria-hidden="true" className="size-4 text-gray-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-600" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <ContactForm />
        </section>
      </main>
    </div>
  );
}
