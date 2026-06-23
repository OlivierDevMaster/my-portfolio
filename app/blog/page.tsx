import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Layers, Sparkles, Target } from "lucide-react";

const articles = [
  {
    title: "Designing Products That Developers Can Maintain",
    category: "Product Engineering",
    description:
      "How clear constraints, simple interfaces, and thoughtful defaults keep products moving after launch.",
    readTime: "5 min read",
  },
  {
    title: "From Prototype to Production",
    category: "System Design",
    description:
      "The decisions that help early ideas become dependable products without overthinking the system.",
    readTime: "7 min read",
  },
  {
    title: "Where AI Actually Helps in SaaS Products",
    category: "AI Integration",
    description:
      "A grounded look at AI features that improve workflows without reducing trust.",
    readTime: "6 min read",
  },
  {
    title: "Building Better Full-Stack Feedback Loops",
    category: "Software Development",
    description:
      "Why short feedback loops, clear interfaces, and calm releases make better products.",
    readTime: "4 min read",
  },
];

const articleImages = [
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=480&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=480&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=480&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=480&q=80",
];

const getArticleIcon = (category: string) => {
  if (category.includes("AI")) return Sparkles;
  if (category.includes("System")) return Layers;
  return Target;
};

export default function BlogPage() {
  return (
    <div>
      <Navbar />

      <main className="px-5 pt-32 md:px-10">
        <section className="container mx-auto max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.45em] text-gray-400">
            Articles
          </p>
          <h1 className="mt-5 text-5xl font-black leading-none tracking-[-0.06em] text-gray-950 md:text-7xl">
            Notes from building products in public.
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-500 md:text-xl">
            Short essays on product judgment, implementation tradeoffs, AI
            features, and systems that stay understandable.
          </p>
        </section>

        <section className="container mx-auto grid gap-5 pt-16 md:grid-cols-2">
          {articles.map((article, index) => {
            const ArticleIcon = getArticleIcon(article.category);

            return (
              <article
                key={article.title}
                className="group cursor-pointer overflow-hidden rounded-3xl border border-black/5 bg-gray-50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-black/5"
              >
                <div
                  aria-hidden="true"
                  className="h-44 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, transparent, rgb(0 0 0 / 0.2)), url('${articleImages[index]}')`,
                  }}
                />
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="secondary" className="gap-2 bg-white">
                      <ArticleIcon
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-violet-600/60"
                      />
                      {article.category}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="mt-5 text-3xl font-black tracking-[-0.06em] text-gray-950">
                    {article.title}
                  </h2>
                  <p className="mt-4 leading-7 text-gray-600">
                    {article.description}
                  </p>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
