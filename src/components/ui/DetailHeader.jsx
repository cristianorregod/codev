import { Link } from "@/i18n/routing";
import { ArrowLeftIcon } from "./icons";

/**
 * Grid-backed header for detail pages (case studies and articles): back link,
 * meta row, title, summary, optional extras and the cover image.
 */
export const DetailHeader = ({
  backHref,
  backLabel,
  meta,
  title,
  summary,
  cover,
  coverAlt,
  coverAspect = "aspect-[3/2]",
  fallback = null,
  children,
}) => (
  <section className="gridbg border-b border-line">
    <div className="mx-auto max-w-site px-6 pb-12 pt-10 sm:pb-16 sm:pt-14">
      <Link
        href={backHref}
        className="mono inline-flex min-h-11 items-center gap-2 text-[13px] text-muted no-underline hover:text-fg"
      >
        <ArrowLeftIcon />
        {backLabel}
      </Link>
      <div className="mt-6 flex flex-wrap items-center gap-x-14 gap-y-10">
        <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-[18px]">
          <div className="mono flex flex-wrap items-center gap-2.5 text-xs text-muted">
            {meta}
          </div>
          <h1 className="m-0 text-[34px] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[44px] lg:text-[52px]">
            {title}
          </h1>
          {summary ? (
            <p className="m-0 max-w-[640px] text-[17px] leading-[1.6] text-muted sm:text-[18px]">
              {summary}
            </p>
          ) : null}
          {children}
        </div>
        <div className="min-w-0 flex-[1_1_360px]">
          {cover ? (
            <img
              src={cover}
              alt={coverAlt}
              className={`block w-full rounded-[18px] border border-line bg-surface object-cover ${coverAspect}`}
            />
          ) : (
            fallback
          )}
        </div>
      </div>
    </div>
  </section>
);
