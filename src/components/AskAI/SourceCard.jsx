import { useTranslations } from "next-intl";
import {
  DocIcon,
  DownloadIcon,
  ExternalIcon,
  FolderIcon,
  HashIcon,
  MailIcon,
} from "./icons";
import { SmartLink, isExternal } from "./links";
import styles from "./panel.module.css";

const KIND_TYPES = new Set([
  "project",
  "post",
  "experience",
  "about",
  "stack",
  "services",
  "contact",
  "knowledge",
]);

/** Short label for the typed tile shown when a source has no cover. */
const tileLabel = (source, kindLabel) => {
  const url = String(source.url || "");
  if (source.kind === "download") {
    return url.split(/[?#]/)[0].split("/").pop() || kindLabel;
  }
  if (/^mailto:/i.test(url)) return url.slice(7).split("?")[0] || kindLabel;
  if (isExternal(url)) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return kindLabel;
    }
  }
  // Site paths: "/es#stack" -> "~/stack", "/en/services" -> "~/services".
  const [path, hash] = url.split("#");
  const segment = hash || path.split("/").filter(Boolean).pop();
  return `~/${segment && !/^(es|en)$/.test(segment) ? segment : kindLabel.toLowerCase()}`;
};

const sourceType = (source) =>
  KIND_TYPES.has(source.type) ? source.type : "other";

const isAccent = (source, type) =>
  type === "post" || type === "contact" || source.kind !== "internal";

/** Small icon that hints what kind of destination a source opens. */
const SourceIcon = ({ source, type, ...props }) => {
  const url = String(source.url || "");
  if (source.kind === "download") return <DownloadIcon {...props} />;
  if (/^mailto:/i.test(url)) return <MailIcon {...props} />;
  if (source.kind === "external" || isExternal(url)) {
    return <ExternalIcon {...props} />;
  }
  if (type === "project") return <FolderIcon {...props} />;
  if (type === "post") return <DocIcon {...props} />;
  return <HashIcon {...props} />;
};

/** Compact one-line source link, used instead of cards on small screens. */
export const SourceRow = ({ source, locale, onNavigate }) => {
  const t = useTranslations("AskAI");
  const type = sourceType(source);
  return (
    <SmartLink
      href={source.url}
      kind={source.kind}
      locale={locale}
      onNavigate={onNavigate}
      className="flex min-w-0 items-center gap-2 py-1 text-[13px] leading-snug text-fg no-underline"
    >
      <SourceIcon
        source={source}
        type={type}
        className={`flex-none ${isAccent(source, type) ? "text-s" : "text-p"}`}
      />
      <span className="sr-only">{t(`Kinds.${type}`)}: </span>
      <span className="min-w-0 truncate underline decoration-line underline-offset-[3px]">
        {source.title}
      </span>
    </SmartLink>
  );
};

export const SourceCard = ({ source, locale, onNavigate }) => {
  const t = useTranslations("AskAI");
  const type = sourceType(source);
  const kindLabel = t(`Kinds.${type}`);
  const accent = isAccent(source, type);
  const cta =
    source.kind === "download"
      ? t("Cta.download")
      : source.kind === "external"
        ? t("Cta.external")
        : type === "project"
          ? t("Cta.project")
          : type === "post"
            ? t("Cta.post")
            : t("Cta.internal");

  return (
    <SmartLink
      href={source.url}
      kind={source.kind}
      locale={locale}
      onNavigate={onNavigate}
      className={`${styles.source} flex min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-surface-2 text-fg no-underline`}
    >
      {source.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={source.cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="block aspect-[16/8] w-full border-b border-line object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className={`mono flex aspect-[16/8] min-w-0 items-center justify-center overflow-hidden border-b border-line px-2 text-[13px] ${
            accent ? "bg-s-soft text-s" : "bg-p-soft text-p"
          }`}
        >
          <span className="truncate">{tileLabel(source, kindLabel)}</span>
        </span>
      )}
      <span className="flex min-w-0 flex-col gap-1 px-[11px] pb-[11px] pt-[9px]">
        <span className={`mono text-[11px] ${accent ? "text-s" : "text-p"}`}>
          {kindLabel}
        </span>
        <span className="clamp2 text-sm font-semibold leading-[1.35] [overflow-wrap:anywhere]">
          {source.title}
        </span>
        <span className="mono text-xs text-p">{cta}</span>
      </span>
    </SmartLink>
  );
};
