import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatPostDate, readingMinutes, type Post } from "@/lib/posts";

type PostRowProps = {
  post: Post;
  /** Heading level for the title, to keep the page outline correct. */
  as?: "h2" | "h3";
  /** Smaller row for narrow columns (e.g. the end of an article). */
  compact?: boolean;
};

export default function PostRow({ post, as: Heading = "h2", compact = false }: PostRowProps) {
  const t = useTranslations("common.post");
  const locale = useLocale() as Locale;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={
        compact
          ? "group block py-6"
          : "group -mx-5 block px-5 py-8 transition-colors hover:bg-gray-50 md:-mx-10 md:px-10 md:py-10"
      }
    >
      <p className="font-mono text-[11px] uppercase tracking-widest text-gray-500">
        {post.category}
        <span aria-hidden="true"> · </span>
        <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
        <span aria-hidden="true"> · </span>
        {t("minRead", { minutes: readingMinutes(post) })}
      </p>

      <div className="mt-3 flex items-start justify-between gap-6">
        <Heading
          className={`font-inter-tight font-light leading-tight tracking-tight text-balance transition-colors group-hover:text-violet-600 ${
            compact ? "text-xl md:text-2xl" : "text-2xl md:text-4xl"
          }`}
        >
          {post.title}
        </Heading>
        <ArrowRight
          aria-hidden="true"
          className={`shrink-0 text-neutral-950 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-600 ${
            compact ? "mt-1 size-5" : "mt-1 size-5 md:mt-2 md:size-6"
          }`}
        />
      </div>

      <p
        className={`mt-3 max-w-[60ch] leading-relaxed text-gray-600 ${
          compact ? "text-sm" : "text-sm md:text-base"
        }`}
      >
        {post.description}
      </p>
    </Link>
  );
}
