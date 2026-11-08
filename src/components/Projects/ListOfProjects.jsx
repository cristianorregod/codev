"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { PROJECT_CATEGORIES } from "@/helpers/staticData";
import { sortByDateDesc } from "@/lib/format";
import { ProjectCard } from "../ProjectCard";

export const ListOfProjects = ({ projects }) => {
  const t = useTranslations("ProjectsPage");
  const locale = useLocale();
  const [filter, setFilter] = useState("");

  const sorted = useMemo(() => sortByDateDesc(projects), [projects]);
  const visible = filter
    ? sorted.filter((project) => project.category === filter)
    : sorted;

  const filters = [
    { value: "", label: t("all"), count: sorted.length },
    ...PROJECT_CATEGORIES.map((category) => ({
      value: category,
      label: category,
      count: sorted.filter((project) => project.category === category).length,
    })),
  ];

  return (
    <>
      <div
        role="group"
        aria-label={t("filterLabel")}
        className="mb-8 flex flex-wrap items-center gap-2"
      >
        {filters.map((item) => {
          const active = filter === item.value;
          return (
            <button
              key={item.label}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.value)}
              className={`mono btn min-h-10 cursor-pointer rounded-[10px] border px-3.5 text-[13px] ${
                active
                  ? "border-p-line bg-p-soft text-p"
                  : "border-line bg-transparent text-muted"
              }`}
            >
              {item.label} <span className="opacity-70">{item.count}</span>
            </button>
          );
        })}
      </div>

      <p role="status" className="sr-only">
        {t("results", { count: visible.length })}
      </p>

      {visible.length === 0 ? (
        <p className="mono m-0 rounded-2xl border border-dashed border-line p-12 text-center text-muted">
          {t("empty")}
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-5">
          {visible.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              headingLevel="h2"
            />
          ))}
        </div>
      )}
    </>
  );
};
