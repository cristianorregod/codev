"use client";
import { LocalDate } from "@/lib/local-date";
import { useLocale } from "next-intl";

export const ShowDate = ({ date }) => {
  const locale = useLocale();
  return (
    <span className="text-xs text-crusta-700/90 dark:text-crusta-300">
      {new LocalDate().relativeTime(date, locale)}
    </span>
  );
};
