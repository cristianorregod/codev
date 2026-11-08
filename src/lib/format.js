const MONTHS = {
  es: [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ],
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

/** "2026-11-02" -> "nov 2026" (es) / "Nov 2026" (en). Timezone-safe. */
export const monthYear = (date, locale = "es") => {
  const [year, month] = String(date ?? "").split("-");
  const months = MONTHS[locale] || MONTHS.es;
  const label = months[Number(month) - 1];
  return label && year ? `${label} ${year}` : String(date ?? "");
};

/** Removes emoji from titles/excerpts shown in listings. */
export const stripEmoji = (value) =>
  String(value ?? "")
    .replace(
      /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{23F0}-\u{23FF}]/gu,
      "",
    )
    .replace(/\s{2,}/g, " ")
    .trim();

export const sortByDateDesc = (items) =>
  [...items].sort((a, b) =>
    String(a.date) < String(b.date)
      ? 1
      : String(a.date) > String(b.date)
        ? -1
        : 0,
  );

/** First tag of a post; tags may be a list or a plain string in frontmatter. */
export const primaryTag = (tags) =>
  (Array.isArray(tags) ? tags[0] : tags) || "";

export const readingMinutes = (content) =>
  Math.max(1, Math.ceil(String(content ?? "").split(/\s+/).length / 200));
