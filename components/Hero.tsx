"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Button } from "./ui/button";
import { handleGetInTouch } from "@/utils/functions";

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
    <section className="relative isolate flex min-h-[calc(100vh-88px)] flex-col md:min-h-[720px] md:justify-center md:py-4 container mx-auto">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-24 -z-10 hidden select-none text-[12rem] font-bold leading-none tracking-[-0.08em] text-gray-100/70 md:block lg:text-[17rem]"
      >
        developer
      </p>

      <div className="grid flex-1 items-center gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.85fr)] md:gap-10">
        <div className="order-2 max-w-2xl md:order-1">
          <motion.p
            className="mb-5 text-sm font-medium uppercase tracking-[0.45em] text-gray-400"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
          >
            It's <span className="font-bold text-gray-700">Olivier</span>, Your
            Full Stack Developer Partner.
          </motion.p>

          <motion.h1
            className="text-5xl font-black leading-[0.95] tracking-[-0.06em] text-gray-950 md:text-6xl lg:text-7xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            <span className="text-violet-600">Design. Code. Innovate.</span>{" "}
            Your Full-Stack Partner.
          </motion.h1>

          <motion.p
            className="mt-7 max-w-xl text-lg leading-8 text-gray-500 md:text-xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
          >
            A passionate developer crafting digital experiences one line of code
            at a time. With a blend of creativity and precision, I transform
            ideas into elegant solutions that leave a lasting impact.
          </motion.p>

          <motion.div
            className="mt-7 flex items-center gap-5"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.6}
          >
            <Button size="lg" onClick={handleGetInTouch}>
              Let's talk
            </Button>
          </motion.div>
        </div>

        <div className="order-1 flex justify-center md:order-2 md:self-stretch md:justify-end">
          <motion.div
            className="relative h-[360px] w-full max-w-[340px] rounded-b-[42%] md:h-full md:min-h-[600px] md:max-w-[800px] md:rounded-none"
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
              className="w-full h-full"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
