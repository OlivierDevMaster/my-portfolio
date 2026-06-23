import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import ContactForm from "./contact-form";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

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
    label: "X/Twitter",
    href: "https://x.com/OlivierFullDev",
    icon: Twitter,
  },
];

export default function ContactPage() {
  return (
    <div>
      <Navbar />

      <main className="px-5 pt-32 md:px-10">
        <section className="container mx-auto grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.45em] text-gray-400">
              Contact
            </p>
            <h1 className="mt-5 text-5xl font-black leading-none tracking-[-0.06em] text-gray-950 md:text-7xl">
              Bring me a product problem worth solving.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-500 md:text-xl">
              Send a short note about the product, platform, or workflow you
              want to improve. I am open to focused builds and product
              engineering roles.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              <Badge className="bg-gray-100 text-gray-800">Freelance builds</Badge>
              <Badge className="bg-gray-100 text-gray-800">Product teams</Badge>
              <Badge className="bg-gray-100 text-gray-800">Remote work</Badge>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const SocialIcon = social.icon;

                return (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-3 font-bold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-950 hover:text-white hover:shadow-xl hover:shadow-black/10"
                >
                  <SocialIcon aria-hidden="true" className="h-4 w-4 opacity-70" />
                  {social.label}
                </Link>
                );
              })}
            </div>

            <div className="mt-10 rounded-3xl bg-neutral-950 p-6 text-white">
              <Mail aria-hidden="true" className="h-8 w-8 text-violet-300/70" />
              <p className="mt-5 text-2xl font-black tracking-[-0.05em]">
                Clear context makes better work.
              </p>
              <p className="mt-3 leading-7 text-gray-400">
                Share what you are building, where it is stuck, and what a good
                outcome would look like.
              </p>
            </div>
          </div>

          <ContactForm />
        </section>
      </main>
    </div>
  );
}
