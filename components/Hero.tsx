"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Button } from "./ui/button";
import { handleGetInTouch } from "@/utils/functions";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Hero() {
  const [imageOpacity, setImageOpacity] = useState(1);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrameId);

      animationFrameId = window.requestAnimationFrame(() => {
        const fadeProgress = Math.min(window.scrollY / 450, 1);
        const nextOpacity = 1 - fadeProgress * 0.6;

        setImageOpacity(Math.max(nextOpacity, 0.4));
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative isolate flex flex-col overflow-hidden pb-10 pt-16 md:min-h-[720px] md:justify-center md:overflow-visible md:py-4 md:pt-6 container mx-auto">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-24 -z-10 hidden select-none text-[12rem] font-bold leading-none tracking-[-0.08em] text-gray-100/60 md:block lg:text-[17rem]"
      >
        developer
      </p>

      <div className="relative grid flex-1 items-end gap-8 md:items-center md:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.85fr)] md:gap-10">
        <div className="relative z-10 mt-[200px] md:mt-0 order-2 max-w-2xl md:order-1">
          <motion.h1
            className="max-w-full font-inter-tight text-[clamp(2.75rem,11vw,3.25rem)] font-light leading-[1.2] text-gray-950 md:text-6xl lg:text-8xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            <span className="text-violet-600">
              Design.
              <span className="">Code.</span>
            </span>
            <br />
            <span className="italic">Ship</span> what{" "}
            <br className="md:hidden" /> matters.
          </motion.h1>

          <motion.p
            className="mt-7 max-w-xl text-lg leading-8 text-gray-500 md:text-xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
          >
            I'm Olivier — a product engineer who partners with founders and
            teams to turn early ideas into software people actually use. Four
            years of shipping full-stack products across web and mobile.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col md:flex-row md:items-center gap-5"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
          >
            <Button size="lg" onClick={handleGetInTouch}>
              Start a project <ArrowUpRight />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View projects
              <ArrowDown />
            </Button>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-end md:pointer-events-auto md:relative md:inset-auto md:order-2 md:self-stretch md:justify-end">
          <motion.div
            className="relative h-[440px] w-[90%] max-w-[420px] translate-x-10 rounded-b-[42%] md:h-full md:min-h-[600px] md:w-full md:max-w-[800px] md:translate-x-0 md:rounded-none"
            animate={{
              opacity: imageOpacity,
            }}
            transition={{ duration: 0.18, ease: "linear" }}
          >
            <Image
              src="/me.png"
              alt="Olivier portrait"
              width={500}
              height={600}
              priority
              className="h-full w-full object-contain object-top"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
