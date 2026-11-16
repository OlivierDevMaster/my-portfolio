import type { Metadata } from "next";
import ContactCta from "@/components/contact-cta";

export const metadata: Metadata = {
  title: "Notes — Olivier Rasolomanana",
  description:
    "Short essays on product judgment, implementation tradeoffs, AI features, and systems that stay understandable.",
};

const articles = [
  {
    title: "Designing Products That Developers Can Maintain",
    category: "Product Engineering",
    description:
      "How clear constraints, simple interfaces, and thoughtful defaults keep products moving after launch.",
  },
  {
    title: "From Prototype to Production",
    category: "System Design",
    description:
      "The decisions that help early ideas become dependable products without overthinking the system.",
  },
  {
    title: "Where AI Actually Helps in SaaS Products",
    category: "AI Integration",
    description:
      "A grounded look at AI features that improve workflows without reducing trust.",
  },
  {
    title: "Building Better Full-Stack Feedback Loops",
    category: "Software Development",
    description:
      "Why short feedback loops, clear interfaces, and calm releases make better products.",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-white text-neutral-950">
      <main id="main" className="px-5 md:px-10">
        {/* HERO */}
        <section className="container mx-auto border-b border-gray-200 pb-16 pt-32 md:pb-24 md:pt-40">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-violet-600">
            (—) Notes · {articles.length} drafts in progress
          </p>
          <h1 className="max-w-5xl font-inter-tight text-5xl font-light leading-[0.95] tracking-tight text-balance md:text-8xl">
            Building products,{" "}
            <em className="italic text-violet-600">in public.</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-gray-500">
            Short essays on product judgment, implementation tradeoffs, AI
            features, and systems that stay understandable. The first ones are
            being written now.
          </p>
        </section>

        {/* LIST */}
        <section className="container mx-auto py-16 md:py-24">
          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {articles.map((article, index) => (
              <li key={article.title}>
                <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-3 py-8 md:py-10">
                  <span className="col-span-2 pt-2 font-mono text-xs text-gray-500 md:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="col-span-10 md:col-span-5">
                    <div className="mb-2 font-mono text-[11px] uppercase tracking-widest text-gray-500">
                      {article.category}
                    </div>
                    <h2 className="font-inter-tight text-2xl font-light md:text-4xl">
                      {article.title}
                    </h2>
                  </div>
                  <p className="col-span-12 text-sm leading-relaxed text-gray-600 md:col-span-4">
                    {article.description}
                  </p>
                  <div className="col-span-12 md:col-span-2 md:justify-self-end">
                    <span className="inline-block rounded-full bg-gray-100 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-gray-600">
                      In progress
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <ContactCta
          title={
            <>
              Want to talk about one of{" "}
              <em className="italic text-violet-600">these?</em>
            </>
          }
          body="Happy to discuss product engineering, system design or AI features before the posts are out."
          showResume={false}
        />
      </main>
    </div>
  );
}
