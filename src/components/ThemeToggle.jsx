"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { MoonIcon, SunIcon } from "./ui/icons";

/**
 * Dark/light toggle. Icons are switched with CSS (`.light` on <html>), so the
 * server markup is correct before hydration and there is no icon flash.
 */
export const ThemeToggle = ({ className = "" }) => {
  const t = useTranslations("HomePage.Nav");
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = mounted && resolvedTheme === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? t("themeToDark") : t("themeToLight")}
      title={isLight ? t("themeToDark") : t("themeToLight")}
      className={`ghost btn inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-line bg-transparent text-muted ${className}`}
    >
      <SunIcon className="theme-icon-sun" />
      <MoonIcon className="theme-icon-moon" />
    </button>
  );
};
