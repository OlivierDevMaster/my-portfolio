import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactForm from "./contact-form";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Olivier Rasolomanana",
  description:
    "Start a conversation about the product, platform, or workflow you want to build. Open to focused builds and product engineering roles.",
};

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/RasolomananaOlivier",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rasolomanana-herimanitra-olivier",
    icon: Linkedin,
  },
  {
    label: "X / Twitter",
    href: "https://x.com/OlivierFullDev",
    icon: Twitter,
  },
];

const availability = ["Freelance builds", "Product teams", "Remote work"];

export default function ContactPage() {
  return (
    <div className="bg-white text-neutral-950">
      <Navbar />

      <main className="px-5 md:px-10">
        <section className="container mx-auto grid gap-16 pb-24 pt-32 md:pt-40 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-24">
          {/* LEFT */}
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
              (—) Contact
            </p>
            <h1 className="font-inter-tight text-5xl font-light leading-[0.95] tracking-tight text-balance md:text-7xl">
              Bring me a{" "}
              <em className="not-italic text-violet-600">problem</em> worth
              solving.
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-gray-500">
              Send a short note about the product, platform, or workflow you want
              to improve. I'm open to focused builds and product engineering
              roles.
            </p>

            <div className="mt-8 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-wider text-gray-400">
              {availability.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-gray-200 px-3 py-1"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
              {socialLinks.map((social) => {
                const SocialIcon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between py-4 transition-colors hover:text-violet-600"
                  >
                    <span className="flex items-center gap-3">
                      <SocialIcon aria-hidden="true" className="size-4" />
                      {social.label}
                    </span>
                    <ArrowUpRight className="size-4 text-gray-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-600" />
                  </Link>
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
