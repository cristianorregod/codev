import { useTranslations } from "next-intl";
import {
  monthYear,
  primaryTag,
  readingMinutes,
  stripEmoji,
} from "@/lib/format";
import { DetailHeader } from "./ui/DetailHeader";
import { CoverFallback } from "./ui/CoverFallback";
import { ClockIcon } from "./ui/icons";
import { LongformContent } from "./LongformContent";

export const ArticleBody = ({ content, frontmatter, locale }) => {
  const t = useTranslations("Article");
  const tag = primaryTag(frontmatter?.tags);
  const title = stripEmoji(frontmatter?.title);

  return (
    <>
      <DetailHeader
        backHref="/posts"
        backLabel={t("back")}
        title={title}
        summary={stripEmoji(frontmatter?.description)}
        cover={frontmatter?.cover}
        coverAlt={title}
        coverAspect="aspect-video"
        fallback={
          <CoverFallback
            label={tag}
            className="aspect-video w-full rounded-[18px]"
          />
        }
        meta={
          <>
            {tag ? <span className="text-s">#{tag}</span> : null}
            <time dateTime={frontmatter?.date}>
              {monthYear(frontmatter?.date, locale)}
            </time>
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon />
              {t("readingTime", { minutes: readingMinutes(content) })}
            </span>
          </>
        }
      />
      <LongformContent content={content} />
    </>
  );
};
