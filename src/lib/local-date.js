const LOCALE_MAP = {
  en: "en-US",
  es: "es-CO",
};

const DEFAULT_LOCALE = "es-CO";

const resolveLocale = locale => {
  if (!locale) return DEFAULT_LOCALE;
  const normalized = String(locale).toLowerCase();
  const base = normalized.split("-")[0];
  return LOCALE_MAP[base] || locale;
};

class LocalDate {
  constructor(originDate, locale) {
    this.originDate = originDate;
    this.locale = locale;
  }
  TIMES_FOR_CONVERT = {
    day: 1000 * 60 * 60 * 24,
    week: 1000 * 60 * 60 * 24 * 7,
    month: 1000 * 60 * 60 * 24 * 30,
    year: 1000 * 60 * 60 * 24 * 30 * 12,
  };
  format(locale = this.locale) {
    return new Date(this.originDate).toLocaleDateString(resolveLocale(locale), {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  difference(substractingDate, diffType) {
    return (
      (new Date(this.originDate) - new Date(substractingDate)) /
      this.TIMES_FOR_CONVERT[diffType]
    );
  }

  relativeTime(substractingDate, locale = this.locale) {
    const resolvedLocale = resolveLocale(locale);
    const rtf = new Intl.RelativeTimeFormat(resolvedLocale, {
      style: "long",
    });
    const diffToToday = this.diff(substractingDate);
    if (diffToToday > 7 && diffToToday < 30) {
      return rtf.format(
        -Math.floor(this.diff(substractingDate, "week")),
        "week",
      );
    }
    if (diffToToday > 30 && diffToToday < 365) {
      return rtf.format(
        -Math.floor(this.diff(substractingDate, "month")),
        "month",
      );
    }
    if (diffToToday >= 365) {
      return rtf.format(
        -Math.floor(this.diff(substractingDate, "year")),
        "year",
      );
    }
    return rtf.format(
      -Math.floor(diffToToday),
      "day",
    );
  }

  diff(date, diffType = "day") {
    return (
      (new Date(Date.now()) - new Date(date)) / this.TIMES_FOR_CONVERT[diffType]
    );
  }
}

module.exports = { LocalDate };
