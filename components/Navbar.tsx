"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { handleGetInTouch } from "@/utils/functions";

const menuItems = [
  { label: "Projects", href: "#projects" },
  { label: "About me", href: "#about" },
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
      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-5 py-5 md:px-10">
        <h1
          className={`text-2xl font-bold transition-colors duration-300 ${
            isMenuOpen ? "text-white" : "text-gray-950"
          }`}
        >
          Olivier<span className="text-violet-600">Dev</span>.
        </h1>

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
          className={`group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] transition-colors duration-300 ${
            isMenuOpen ? "text-white" : "text-gray-950"
          }`}
        >
          <span>{isMenuOpen ? "Close" : "Menu"}</span>
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
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex min-h-screen items-center justify-center bg-gray-950 text-white"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className="flex flex-col items-center gap-4 text-center"
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
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.45em] text-gray-500">
                Menu
              </p>

              {menuItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="text-5xl font-black leading-none tracking-[-0.06em] text-gray-400 transition-colors hover:text-white md:text-7xl"
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
                className="text-5xl font-black leading-none tracking-[-0.06em] text-gray-400 transition-colors hover:text-white md:text-7xl"
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
                className="text-5xl font-black leading-none tracking-[-0.06em] text-gray-400 transition-colors hover:text-white md:text-7xl"
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                Download CV
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
