"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

const LANGUAGES = [
  { code: "es", label: "ES", name: "Español" },
  { code: "en", label: "EN", name: "English" },
];

// Slugs of posts and projects are translated per locale, so a detail page has
// no 1:1 counterpart: switching language there lands on the listing page.
const DETAIL_ROUTE = /^\/(posts|projects)\/[^/]+\/?$/;

export const LanguageSwitcher = ({ size = "sm", onSwitch }) => {
  const t = useTranslations("HomePage.Nav");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (nextLocale) => {
    if (nextLocale === locale) return;
    const match = pathname.match(DETAIL_ROUTE);
    const target = match ? `/${match[1]}` : pathname;
    onSwitch?.();
    startTransition(() => {
      router.replace(target, { locale: nextLocale });
    });
  };

  const pad = size === "lg" ? "min-h-11 min-w-[56px] px-4" : "px-[9px] py-1.5";

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={`mono inline-flex overflow-hidden rounded-lg border border-line ${
        size === "lg" ? "text-sm" : "text-xs"
      }`}
    >
      {LANGUAGES.map((language) => {
        const active = language.code === locale;
        return (
          <button
            key={language.code}
            type="button"
            lang={language.code}
            disabled={isPending}
            aria-pressed={active}
            aria-label={t("switchTo", { language: language.name })}
            onClick={() => switchLanguage(language.code)}
            className={`inline-flex cursor-pointer items-center justify-center border-0 transition-colors ${pad} ${
              active
                ? "bg-p-soft text-p"
                : "bg-transparent text-muted hover:text-fg"
            }`}
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );
};
