"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { CV_PATH, navItems } from "@/lib/site";

const localeNames = { en: "English", fr: "Français" } as const;

function LocaleSwitcher({
  inverted = false,
  onSwitch,
}: {
  inverted?: boolean;
  onSwitch?: () => void;
}) {
  const t = useTranslations("common.nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <ul
      aria-label={t("language")}
      className={`flex items-center rounded-full border p-0.5 font-mono text-[11px] uppercase tracking-wider ${
        inverted ? "border-white/20" : "border-gray-200"
      }`}
    >
      {routing.locales.map((item) => {
        const active = item === locale;
        return (
          <li key={item}>
            <Link
              href={pathname}
              locale={item}
              hrefLang={item}
              lang={item}
              onClick={onSwitch}
              aria-current={active ? "true" : undefined}
              className={`inline-flex h-9 min-w-11 items-center justify-center rounded-full px-2.5 transition-colors ${
                active
                  ? inverted
                    ? "bg-white text-neutral-950"
                    : "bg-neutral-950 text-white"
                  : inverted
                    ? "text-white/60 hover:text-white"
                    : "text-gray-500 hover:text-neutral-950"
              }`}
            >
              <span aria-hidden="true">{item}</span>
              <span className="sr-only">{localeNames[item]}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("common.nav");

  // Close the menu whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock page scroll while the full-screen menu is open, and close it on Escape.
  useEffect(() => {
    if (!isMenuOpen) return;

    const scrollY = window.scrollY;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const desktopLinks = navItems.filter(
    (item) => item.href !== "/" && item.href !== "/contact"
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
          isMenuOpen
            ? "border-white/10 bg-transparent text-white"
            : "border-gray-200/60 bg-white/70 text-neutral-950"
        }`}
      >
        <nav
          aria-label={t("mainLabel")}
          className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 md:px-10"
        >
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
            aria-label={t("homeLabel")}
          >
            <span
              aria-hidden="true"
              className={`grid size-8 place-items-center rounded-full font-mono text-xs font-medium transition-colors duration-300 ${
                isMenuOpen
                  ? "bg-white text-neutral-950"
                  : "bg-neutral-950 text-white"
              }`}
            >
              O
            </span>
            <span className="text-sm leading-tight tracking-tight">
              <span className="block font-medium">Olivier</span>
              <span
                className={`block text-xs transition-colors duration-300 ${
                  isMenuOpen ? "text-white/60" : "text-gray-500"
                }`}
              >
                {t("role")}
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {desktopLinks.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-4 py-2 text-sm transition-colors ${
                      active
                        ? "bg-gray-100 text-neutral-950"
                        : "text-gray-600 hover:text-neutral-950"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 md:gap-4">
            <div className={isMenuOpen ? "hidden" : "hidden sm:block"}>
              <LocaleSwitcher />
            </div>
            <Link
              href="/contact"
              onClick={closeMenu}
              className={`group hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 sm:inline-flex ${
                isMenuOpen
                  ? "border border-white/20 text-white hover:bg-white/10"
                  : "bg-neutral-950 text-white hover:bg-neutral-800"
              }`}
            >
              {t("letsTalk")}
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </Link>

            <button
              type="button"
              aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="-mr-2 flex h-11 min-w-11 items-center justify-center gap-3 px-2 font-mono text-xs uppercase tracking-[0.2em] lg:hidden"
            >
              <span className="hidden md:block">
                {isMenuOpen ? t("close") : t("menu")}
              </span>
              <span aria-hidden="true" className="relative h-4 w-6">
                <motion.span
                  className="absolute left-0 top-0 h-0.5 w-6 bg-current"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 7 : 0,
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute left-0 top-[7px] h-0.5 w-6 bg-current"
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 w-6 bg-current"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -7 : 0,
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="site-menu"
            className="fixed inset-0 z-40 overflow-y-auto overflow-x-hidden bg-neutral-950 text-white lg:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

            <motion.nav
              aria-label={t("menu")}
              className="relative flex min-h-full flex-col justify-center gap-1 px-5 pb-10 pt-24 md:px-10"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.2,
                    duration: 0.35,
                    ease: "easeOut",
                    staggerChildren: 0.06,
                  },
                },
              }}
            >
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);

                return (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={`block py-1.5 font-inter-tight text-[clamp(2.5rem,12vw,4.5rem)] font-light leading-tight tracking-tight transition-colors hover:text-violet-400 ${
                        active ? "text-white" : "text-white/50"
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                className="mt-8 flex flex-wrap items-center gap-4"
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <a
                  href={CV_PATH}
                  download="Olivier_Rasolomanana_CV.pdf"
                  onClick={closeMenu}
                  className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  {t("downloadCv")}
                  <ArrowDown
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:translate-y-0.5"
                  />
                </a>
                <LocaleSwitcher inverted onSwitch={closeMenu} />
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
