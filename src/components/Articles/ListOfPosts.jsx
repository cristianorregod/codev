import { Link } from "@/i18n/routing";
import {
  monthYear,
  primaryTag,
  sortByDateDesc,
  stripEmoji,
} from "@/lib/format";
import { CoverFallback } from "../ui/CoverFallback";

const groupByYear = (posts) =>
  sortByDateDesc(posts).reduce((groups, post) => {
    const year = String(post.date).slice(0, 4);
    const group = groups.find((item) => item.year === year);
    if (group) group.posts.push(post);
    else groups.push({ year, posts: [post] });
    return groups;
  }, []);

export const ListOfPosts = ({ posts, locale }) =>
  groupByYear(posts).map(({ year, posts: yearPosts }) => (
    <section
      key={year}
      aria-labelledby={`year-${year}`}
      className="flex flex-wrap gap-x-10 gap-y-2 pt-10"
    >
      <h2
        id={`year-${year}`}
        className="mono m-0 flex-[0_0_120px] pt-[18px] text-[15px] font-semibold text-s"
      >
        {year}
      </h2>
      <ul className="m-0 min-w-0 flex-[1_1_600px] list-none p-0">
        {yearPosts.map((post) => {
          const tag = primaryTag(post.tags);
          return (
            <li
              key={post.slug}
              className="row relative flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-line py-[18px] has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-p"
            >
              {post.cover ? (
                <img
                  src={post.cover}
                  alt=""
                  loading="lazy"
                  className="block aspect-[3/2] w-[132px] flex-[0_0_132px] rounded-[10px] border border-line object-cover"
                />
              ) : (
                <CoverFallback
                  label={tag}
                  className="aspect-[3/2] w-[132px] flex-[0_0_132px] rounded-[10px]"
                />
              )}
              <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-1.5">
                <div className="mono flex gap-3 text-xs text-muted">
                  {tag ? <span className="text-s">#{tag}</span> : null}
                  <time dateTime={post.date}>
                    {monthYear(post.date, locale)}
                  </time>
                </div>
                <h3 className="rowtitle m-0 text-lg font-bold leading-[1.35] text-fg">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-inherit no-underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                  >
                    {stripEmoji(post.title)}
                  </Link>
                </h3>
                <p className="clamp2 m-0 text-[15px] leading-[1.55] text-muted">
                  {stripEmoji(post.description)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  ));
