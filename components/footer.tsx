import Link from "next/link";
import { CONTACT_EMAIL, navItems, socialLinks } from "@/lib/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-5 pb-8 pt-16 md:px-10 md:pt-24">
      <div className="container mx-auto grid gap-8 border-t border-gray-200 pt-8 text-sm text-gray-500 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <p className="font-semibold text-gray-950">Olivier Rasolomanana</p>
          <p className="mt-1">Product engineer · web &amp; mobile.</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-2 inline-block py-3 text-gray-950 underline decoration-gray-300 underline-offset-4 transition hover:decoration-violet-600"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="flex flex-col gap-6 md:items-end">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {navItems
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block py-3 transition hover:text-gray-950"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const SocialIcon = social.icon;

              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-gray-950 hover:bg-gray-950 hover:text-white"
                  >
                    <SocialIcon aria-hidden="true" className="size-4" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="text-xs md:col-span-2">
          &copy; {currentYear} Olivier Rasolomanana.
        </p>
      </div>
    </footer>
  );
}
