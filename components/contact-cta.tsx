import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { CV_PATH } from "@/lib/site";

type ContactCtaProps = {
  label?: string;
  title?: React.ReactNode;
  body?: string;
  showResume?: boolean;
};

export default function ContactCta({
  label = "(—) Next step",
  title = (
    <>
      Have something to <em className="italic text-violet-600">build?</em>
    </>
  ),
  body = "Tell me what you're building and where it's stuck. A few lines are enough to start.",
  showResume = true,
}: ContactCtaProps) {
  return (
    <section className="container mx-auto border-t border-gray-200 py-20 text-center md:py-32">
      <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
        {label}
      </p>
      <h2 className="mx-auto max-w-4xl font-inter-tight text-4xl font-light leading-[1.05] tracking-tight text-balance md:text-7xl">
        {title}
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
        {body}
      </p>
      <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <Link
          href="/contact"
          className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-violet-600 px-8 font-medium text-white transition hover:bg-violet-700"
        >
          Start a conversation
          <ArrowRight
            aria-hidden="true"
            className="size-5 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
        {showResume && (
          <a
            href={CV_PATH}
            download="Olivier_Rasolomanana_CV.pdf"
            className="group inline-flex h-14 items-center justify-center gap-3 rounded-full border border-gray-200 px-8 font-medium transition hover:bg-gray-50"
          >
            Download CV
            <ArrowDown
              aria-hidden="true"
              className="size-5 transition-transform group-hover:translate-y-0.5"
            />
          </a>
        )}
      </div>
    </section>
  );
}
