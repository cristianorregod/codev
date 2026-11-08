import { getTranslations } from "next-intl/server";
import { STACK_GROUPS } from "@/data/stack";
import { SectionHeading } from "../ui/SectionHeading";

const GROUP_STYLE = {
  ai: {
    accent: "text-p",
    glyph: "var(--p)",
    cell: "bg-p-soft shadow-[inset_0_2px_0_var(--p)]",
    chip: "border-solid border-line",
  },
  web: {
    accent: "text-p",
    glyph: "var(--p)",
    cell: "",
    chip: "border-solid border-line",
  },
  tools: {
    accent: "text-p",
    glyph: "var(--p)",
    cell: "",
    chip: "border-solid border-line",
  },
  learning: {
    accent: "text-s",
    glyph: "var(--s)",
    cell: "",
    chip: "border-dashed border-s",
  },
};

const pad = (value) => String(value).padStart(2, "0");

export const Stack = async () => {
  const t = await getTranslations("HomePage.Stack");

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="mx-auto max-w-site px-6 pb-24 pt-20 sm:pb-28 sm:pt-24"
    >
      <SectionHeading
        number="05"
        id="stack-title"
        title={t("title")}
        className="mb-4"
      />
      <p className="mb-8 mt-0 max-w-[640px] text-[17px] leading-[1.65] text-muted">
        {t("description")}
      </p>
      <div className="grid overflow-hidden rounded-2xl border border-line bg-surface md:grid-cols-2">
        {STACK_GROUPS.map((group, index) => {
          const style = GROUP_STYLE[group.key];
          return (
            <div
              key={group.key}
              className={`-mb-px -mr-px flex flex-col gap-[18px] border-b border-r border-line p-6 ${style.cell}`}
            >
              <h3 className="mono m-0 flex items-center gap-2.5 text-[13px] font-normal">
                <span className="text-muted">{pad(index + 1)}</span>
                <span className={`font-semibold ${style.accent}`}>
                  {t(group.key)}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
                <span className="text-muted">
                  <span className="sr-only">{t("count")}: </span>
                  {pad(group.items.length)}
                </span>
              </h3>
              <ul className="mono m-0 flex list-none flex-wrap gap-2 p-0 text-[13px]">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className={`tchip inline-flex items-center gap-2 rounded-lg border bg-surface-2 px-2.5 py-1.5 text-fg ${style.chip}`}
                    style={{
                      "--brand-d": item.glyph ? style.glyph : item.dark,
                      "--brand-l": item.glyph ? style.glyph : item.light,
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      className="ticon shrink-0"
                    >
                      <path
                        d={item.d}
                        fill={item.glyph ? "none" : "currentColor"}
                        stroke={item.glyph ? "currentColor" : "none"}
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};
