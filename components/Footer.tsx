import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

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
    label: "X",
    href: "https://x.com/OlivierFullDev",
    icon: Twitter,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-5 pb-8 pt-24 md:px-10">
      <div className="container mx-auto flex flex-col gap-6 border-t border-gray-200 pt-8 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-gray-950">Olivier Rasolomanana</p>
          <p className="mt-1">Product-minded full-stack developer.</p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-4">
          <Link href="/projects" className="transition hover:text-gray-950">
            Projects
          </Link>
          <Link href="/resume" className="transition hover:text-gray-950">
            Resume
          </Link>
          <Link href="/contact" className="transition hover:text-gray-950">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {socialLinks.map((social) => {
            const SocialIcon = social.icon;

            return (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:-translate-y-0.5 hover:border-gray-950 hover:bg-gray-950 hover:text-white"
              >
                <SocialIcon aria-hidden="true" className="h-4 w-4" />
              </Link>
            );
          })}
        </div>

        <p>&copy; {currentYear}. All rights reserved.</p>
      </div>
    </footer>
  );
}
