import { Link } from "@/i18n/routing";
import { monthYear, stripEmoji } from "@/lib/format";
import { CategoryChip, TechChips } from "./ui/Chips";

// Card focus ring: the title link is stretched over the card, so the ring is
// drawn on the card itself when that link has keyboard focus.
const focusRing =
  "has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-p";

const Meta = ({ project, locale }) => (
  <div className="mono flex flex-wrap gap-2.5 text-xs text-muted">
    <CategoryChip>{project.category}</CategoryChip>
    <time dateTime={project.date} className="py-1">
      {monthYear(project.date, locale)}
    </time>
  </div>
);

const TitleLink = ({ project }) => (
  <Link
    href={`/projects/${project.slug}`}
    className="text-fg no-underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
  >
    {stripEmoji(project.title)}
  </Link>
);

/**
 * variant:
 *  - "featured": wide horizontal card (home, first project)
 *  - "compact":  home secondary cards (no stack)
 *  - "grid":     projects page grid
 */
export const ProjectCard = ({
  project,
  locale,
  variant = "grid",
  headingLevel = "h3",
}) => {
  const Heading = headingLevel;

  if (variant === "featured") {
    return (
      <article
        className={`card relative flex flex-[1_1_100%] flex-wrap overflow-hidden rounded-[18px] border border-line bg-surface ${focusRing}`}
      >
        <img
          src={project.cover}
          alt={stripEmoji(project.title)}
          className="block aspect-[3/2] min-w-0 flex-[1_1_460px] object-cover"
        />
        <div className="flex min-w-0 flex-[1_1_380px] flex-col justify-center gap-3.5 p-6 sm:p-9">
          <Meta project={project} locale={locale} />
          <Heading className="m-0 text-[22px] font-bold leading-[1.2] sm:text-[26px]">
            <TitleLink project={project} />
          </Heading>
          <p className="clamp3 m-0 text-base leading-[1.6] text-muted">
            {stripEmoji(project.excerpt)}
          </p>
          <TechChips stack={project.stack} />
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article
        className={`card relative flex min-w-0 flex-[1_1_420px] flex-col overflow-hidden rounded-[18px] border border-line bg-surface ${focusRing}`}
      >
        <img
          src={project.cover}
          alt={stripEmoji(project.title)}
          loading="lazy"
          className="block aspect-[3/2] w-full object-cover"
        />
        <div className="flex flex-col gap-3 p-6">
          <Meta project={project} locale={locale} />
          <Heading className="m-0 text-xl font-bold leading-[1.25]">
            <TitleLink project={project} />
          </Heading>
          <p className="clamp2 m-0 text-[15px] leading-[1.6] text-muted">
            {stripEmoji(project.excerpt)}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`card relative flex flex-col overflow-hidden rounded-[18px] border border-line bg-surface ${focusRing}`}
    >
      <img
        src={project.cover}
        alt={stripEmoji(project.title)}
        loading="lazy"
        className="block aspect-[3/2] w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 p-[22px]">
        <Meta project={project} locale={locale} />
        <Heading className="m-0 text-[19px] font-bold leading-[1.3]">
          <TitleLink project={project} />
        </Heading>
        <p className="clamp3 m-0 text-[15px] leading-[1.6] text-muted">
          {stripEmoji(project.excerpt)}
        </p>
        <div className="mt-auto pt-1.5">
          <TechChips stack={project.stack} size="sm" />
        </div>
      </div>
    </article>
  );
};
