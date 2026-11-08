import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { getAllPostsMetadata } from "@/lib/mdx";
import {
  monthYear,
  primaryTag,
  sortByDateDesc,
  stripEmoji,
} from "@/lib/format";
import { SectionHeading } from "../ui/SectionHeading";
import { CoverFallback } from "../ui/CoverFallback";

export const Articles = async ({ locale }) => {
  const t = await getTranslations({ locale, namespace: "HomePage.Articles" });
  const posts = sortByDateDesc(
    getAllPostsMetadata(process.env.ARTICLES_PATH, locale),
  ).slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section
      id="articles"
      aria-labelledby="articles-title"
      className="mx-auto max-w-site px-6 pb-6 pt-20 sm:pt-24"
    >
      <SectionHeading
        number="04"
        id="articles-title"
        title={t("title")}
        className="mb-7"
        action={
          <Link
            href="/posts"
            className="mono text-sm text-p no-underline hover:text-fg"
          >
            {t("more")} →
          </Link>
        }
      />
      <div className="flex flex-wrap gap-5">
        {posts.map((post) => {
          const tag = primaryTag(post.tags);
          const title = stripEmoji(post.title);
          return (
            <article
              key={post.slug}
              className="card relative flex min-w-0 flex-[1_1_300px] flex-col overflow-hidden rounded-2xl border border-line bg-surface has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-p"
            >
              {post.cover ? (
                <img
                  src={post.cover}
                  alt={title}
                  loading="lazy"
                  className="block aspect-video w-full border-b border-line object-cover"
                />
              ) : (
                <CoverFallback
                  label={tag}
                  className="aspect-video w-full border-x-0 border-t-0"
                />
              )}
              <div className="flex flex-col gap-2.5 p-5">
                <div className="mono flex gap-2.5 text-xs text-muted">
                  {tag ? <span className="text-s">#{tag}</span> : null}
                  <time dateTime={post.date}>
                    {monthYear(post.date, locale)}
                  </time>
                </div>
                <h3 className="m-0 text-lg font-bold leading-[1.3]">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-fg no-underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                  >
                    {title}
                  </Link>
                </h3>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
