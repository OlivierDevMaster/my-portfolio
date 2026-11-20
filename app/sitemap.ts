import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPosts, postSlugs } from "@/lib/posts";
import { localePath } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const pages = ["/", "/projects", "/about", "/resume", "/blog", "/contact"];

/** Every page in every locale, each listing its other-language versions. */
export default function sitemap(): MetadataRoute.Sitemap {
  const postDates = new Map(
    getPosts(routing.defaultLocale).map((post) => [`/blog/${post.slug}`, post.date])
  );
  const paths = [...pages, ...postSlugs.map((slug) => `/blog/${slug}`)];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      lastModified: postDates.get(path),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((item) => [
            item,
            `${SITE_URL}${localePath(item, path)}`,
          ])
        ),
      },
    }))
  );
}
