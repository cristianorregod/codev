import { useTranslations } from "next-intl";
import { monthYear, stripEmoji } from "@/lib/format";
import { DetailHeader } from "./ui/DetailHeader";
import { CategoryChip, TechChips } from "./ui/Chips";
import { ArrowUpRightIcon } from "./ui/icons";
import { LongformContent } from "./LongformContent";

const ExternalButton = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="ghost btn inline-flex min-h-12 items-center gap-2 rounded-xl border border-line px-[18px] font-semibold text-muted no-underline"
  >
    {children}
    <ArrowUpRightIcon size={16} />
  </a>
);

export const ProjectBody = ({ content, frontmatter, locale }) => {
  const t = useTranslations("ProjectsPage");
  const title = stripEmoji(frontmatter?.title);
  const stack = frontmatter?.stack ?? [];

  return (
    <>
      <DetailHeader
        backHref="/projects"
        backLabel={t("back")}
        title={title}
        summary={stripEmoji(frontmatter?.excerpt)}
        cover={frontmatter?.cover}
        coverAlt={title}
        meta={
          <>
            {frontmatter?.category ? (
              <CategoryChip>{frontmatter.category}</CategoryChip>
            ) : null}
            <time dateTime={frontmatter?.date} className="py-1">
              {monthYear(frontmatter?.date, locale)}
            </time>
          </>
        }
      >
        {stack.length > 0 ? (
          <div className="flex flex-col gap-2.5 pt-1">
            <span className="mono text-xs text-muted">{t("stack")}</span>
            <TechChips stack={stack} max={stack.length} />
          </div>
        ) : null}
        {frontmatter?.link || frontmatter?.repo ? (
          <div className="flex flex-wrap gap-3 pt-1">
            {frontmatter?.link ? (
              <ExternalButton href={frontmatter.link}>
                {t("visit")}
              </ExternalButton>
            ) : null}
            {frontmatter?.repo ? (
              <ExternalButton href={frontmatter.repo}>
                {t("repo")}
              </ExternalButton>
            ) : null}
          </div>
        ) : null}
      </DetailHeader>
      <LongformContent content={content} />
    </>
  );
};
