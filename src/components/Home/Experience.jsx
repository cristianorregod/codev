import { getTranslations } from "next-intl/server";
import { SectionHeading } from "../ui/SectionHeading";

export const Experience = async () => {
  const t = await getTranslations("HomePage.Experience");
  const items = t.raw("items");

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto max-w-site px-6 pb-6 pt-20 sm:pt-24"
    >
      <SectionHeading number="01" id="experience-title" title={t("title")} />
      <ol className="m-0 flex list-none flex-col p-0">
        {items.map((item, index) => (
          <li
            key={`${item.company}-${item.date}`}
            className={`flex flex-wrap gap-x-10 gap-y-2 border-t border-line py-7 ${
              index === items.length - 1 ? "border-b" : ""
            }`}
          >
            <span className="mono flex-[0_0_200px] pt-1 text-[13px] text-muted">
              {item.date}
            </span>
            <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-2">
              <h3 className="m-0 text-xl font-bold">
                {item.role}
                {item.roleNote ? (
                  <>
                    {" "}
                    <span className="font-medium text-muted">
                      {item.roleNote}
                    </span>
                  </>
                ) : null}
              </h3>
              <span className="text-[15px] font-semibold text-s">
                {item.company}
              </span>
              <p className="m-0 text-base leading-[1.65] text-muted">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};
