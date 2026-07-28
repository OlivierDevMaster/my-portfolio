"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { handleGetInTouch } from "@/utils/functions";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/RASOLOMANANA_Herimanitra_Olivier.pdf";
    link.download = "Olivier_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const root = document.documentElement;
    const scrollY = window.scrollY;
    const previousOverflowY = root.style.overflowY;
    const previousScrollbarGutter =
      root.style.getPropertyValue("scrollbar-gutter");

    root.style.overflowY = "scroll";
    root.style.setProperty("scrollbar-gutter", "stable");

    if (isMenuOpen) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    }

    return () => {
      root.style.overflowY = previousOverflowY;
      root.style.setProperty("scrollbar-gutter", previousScrollbarGutter);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      if (isMenuOpen) {
        window.scrollTo(0, scrollY);
      }
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleContactClick = () => {
    closeMenu();
    handleGetInTouch();
  };

  const handleDownloadClick = () => {
    closeMenu();
    downloadCV();
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
          isMenuOpen
            ? "border-white/10 bg-transparent text-white"
            : "border-gray-200/60 bg-white/60 text-neutral-950"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
          <a href="/" className="group flex items-center gap-3">
            <span
              className={`grid size-8 place-items-center rounded-full font-mono text-xs font-medium transition-colors duration-300 ${
                isMenuOpen
                  ? "bg-white text-neutral-950"
                  : "bg-neutral-950 text-white"
              }`}
            >
              O
            </span>
            <div className="text-sm tracking-tight">
              <div className="font-medium">Olivier</div>
              <div
                className={`transition-colors duration-300 text-xs ${
                  isMenuOpen ? "text-white/50" : "text-gray-500"
                }`}
              >
                Product Engineer
              </div>
            </div>
          </a>

          <div className="flex items-center gap-3 md:gap-6">
            <button
              type="button"
              onClick={handleContactClick}
              className={`group hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 md:inline-flex ${
                isMenuOpen
                  ? "border border-white/20 text-white hover:bg-white/10"
                  : "bg-neutral-950 text-white hover:bg-neutral-800"
              }`}
            >
              Let&apos;s talk
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
              className="group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300"
            >
              <span className="hidden md:block">
                {isMenuOpen ? "Close" : "Menu"}
              </span>
              <span className="relative h-5 w-7">
                <motion.span
                  className="absolute left-0 top-0 h-0.5 w-7 bg-current"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 9 : 0,
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute left-0 top-2.5 h-0.5 w-7 bg-current"
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 w-7 bg-current"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -9 : 0,
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
            className="fixed inset-0 z-40 flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 text-white"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] opacity-[0.05] [background-size:18px_18px]" />

            <motion.div
              className="relative flex flex-col items-center gap-3 px-5 text-center"
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
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-violet-400 md:pt-2">
                (—) Navigation
              </p>

              {menuItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="font-inter-tight text-5xl font-light leading-none tracking-tight text-white/40 transition-colors hover:text-violet-400 md:text-6xl"
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.button
                type="button"
                onClick={handleContactClick}
                className="font-inter-tight text-5xl font-light leading-none tracking-tight text-white/40 transition-colors hover:text-violet-400 md:text-7xl"
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                Contact
              </motion.button>

              <motion.button
                type="button"
                onClick={handleDownloadClick}
                className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                Download resume
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
