import { Link } from "@/i18n/routing";

const LOCALE_PREFIX = /^\/(es|en)(?=[/?#]|$)(.*)$/;

/**
 * Splits a site URL like "/en/projects/x" or "/es#about" into the locale and
 * the locale-less href that next-intl's Link expects.
 */
export function localizeHref(url, fallbackLocale) {
  const match = LOCALE_PREFIX.exec(url);
  if (!match) return { locale: fallbackLocale, href: url };
  const rest = match[2] || "/";
  return { locale: match[1], href: rest.startsWith("/") ? rest : `/${rest}` };
}

export const isInternal = (url) => /^\/(?!\/)/.test(url);
export const isExternal = (url) => /^https?:\/\//i.test(url);

/** Anchor that routes site paths through next-intl and opens the rest safely. */
export const SmartLink = ({
  href,
  kind,
  locale,
  onNavigate,
  children,
  ...props
}) => {
  if (kind === "download") {
    return (
      <a href={href} download {...props}>
        {children}
      </a>
    );
  }
  if (kind !== "external" && isInternal(href)) {
    const target = localizeHref(href, locale);
    return (
      <Link
        href={target.href}
        locale={target.locale}
        onClick={onNavigate}
        {...props}
      >
        {children}
      </Link>
    );
  }
  if (/^mailto:/i.test(href)) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return <span {...props}>{children}</span>;
};
