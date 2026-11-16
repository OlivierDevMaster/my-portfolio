"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

// Entrance animation runs in CSS so the hero is visible before hydration.
const reveal =
  "animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-700 ease-out motion-reduce:animate-none";

export default function Hero() {
  const [imageOpacity, setImageOpacity] = useState(1);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(() => {
        const fadeProgress = Math.min(window.scrollY / 450, 1);
        setImageOpacity(Math.max(1 - fadeProgress * 0.6, 0.4));
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
    <section className="container relative isolate mx-auto flex flex-col overflow-hidden pb-8 pt-16 md:min-h-[720px] md:justify-center md:overflow-visible md:py-4 md:pt-6">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-24 -z-10 hidden select-none text-[12rem] font-bold leading-none tracking-[-0.08em] text-gray-100/60 md:block lg:text-[17rem]"
      >
        developer
      </p>

      <div className="relative grid flex-1 items-end gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.85fr)] md:items-center md:gap-10">
        <div className="relative z-10 order-2 mt-[clamp(150px,44vw,190px)] max-w-2xl md:order-1 md:mt-0">
          <p
            className={`${reveal} mb-5 font-mono text-xs uppercase tracking-[0.2em] text-violet-600`}
          >
            (—) Currently open to new work
          </p>

          <h1
            className={`${reveal} delay-150 max-w-full font-inter-tight text-[clamp(2.6rem,12vw,3.5rem)] font-light leading-[1.08] tracking-tight text-gray-950 md:text-6xl lg:text-8xl`}
          >
            <span className="text-violet-600">Design. Code.</span>
            <br />
            <span className="italic">Ship</span> what matters.
          </h1>

          <p
            className={`${reveal} delay-300 mt-6 max-w-xl text-base leading-7 text-gray-600 md:mt-7 md:text-xl md:leading-8`}
          >
            I'm Olivier, a product engineer who helps founders and teams turn
            early ideas into web and mobile products people actually use. Four
            years shipping full-stack, from first sketch to production.
          </p>

          <div
            className={`${reveal} delay-500 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center`}
          >
            <Button size="lg" asChild>
              <Link href="/contact">
                Start a project <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#projects">
                See selected work
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex justify-end md:pointer-events-auto md:relative md:inset-auto md:order-2 md:self-stretch">
          <div
            className="relative h-[clamp(300px,95vw,420px)] w-[85%] max-w-[400px] translate-x-8 transition-opacity duration-200 ease-linear md:h-full md:min-h-[600px] md:w-full md:max-w-[800px] md:translate-x-0"
            style={{ opacity: imageOpacity }}
          >
            <Image
              src="/me.png"
              alt="Portrait of Olivier Rasolomanana"
              width={500}
              height={600}
              priority
              sizes="(min-width: 768px) 50vw, 85vw"
              className="h-full w-full object-contain object-top"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
