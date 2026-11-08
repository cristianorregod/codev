import { getTranslations } from "next-intl/server";
import { MY_STACK } from "@/helpers/staticData";
import { SectionHeading } from "../ui/SectionHeading";

const GROUPS = [
  { key: "frontend", accent: "text-p" },
  { key: "backend", accent: "text-p" },
  { key: "tools", accent: "text-p" },
  { key: "learning", accent: "text-s" },
];

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
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] overflow-hidden rounded-2xl border border-line bg-surface">
        {GROUPS.map((group) => (
          <div
            key={group.key}
            className="-mb-px -mr-px flex flex-col gap-4 border-b border-r border-line p-6"
          >
            <h3 className={`mono m-0 text-[13px] font-normal ${group.accent}`}>
              {t(group.key)}
            </h3>
            <ul className="mono m-0 flex list-none flex-wrap gap-2 p-0 text-[13px]">
              {MY_STACK[group.key].map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-line bg-surface-2 px-2.5 py-1.5 text-fg"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
