import { getTranslations } from "next-intl/server";
import { PERSONAL_LINKS_DATA } from "@/data/personal-links";
import { ArrowDownIcon } from "../ui/icons";

const SOCIAL = PERSONAL_LINKS_DATA.profile.social;

const Str = ({ children }) => (
  <span className="text-p">&quot;{children}&quot;</span>
);

/**
 * Renders the `perfil.ts` card. Each field is either a string value or a list
 * of line groups; continuation lines are aligned under the opening bracket.
 */
const CodeCard = ({ code, label }) => (
  <div
    role="figure"
    aria-label={label}
    className="mono min-w-0 flex-[1_1_340px] overflow-hidden rounded-2xl border border-line bg-surface text-[13px] leading-[1.85] sm:text-sm"
  >
    <div className="flex items-center gap-2 border-b border-line px-4 py-3 text-xs text-muted">
      <span aria-hidden="true" className="size-2.5 rounded-full bg-line" />
      <span aria-hidden="true" className="size-2.5 rounded-full bg-line" />
      <span aria-hidden="true" className="size-2.5 rounded-full bg-line" />
      <span className="ml-2">{code.file}</span>
    </div>
    <pre className="m-0 overflow-x-auto mono whitespace-pre px-5 py-[18px] text-fg">
      <span className="text-s">const</span> {code.name} = {"{"}
      {"\n"}
      {code.fields.map((field) => {
        if (typeof field.value === "string") {
          return (
            <span key={field.key}>
              {"  "}
              {field.key}: <Str>{field.value}</Str>,{"\n"}
            </span>
          );
        }
        const indent = " ".repeat(field.key.length + 5);
        return (
          <span key={field.key}>
            {"  "}
            {field.key}: [
            {field.value.map((line, lineIndex) => (
              <span key={lineIndex}>
                {lineIndex > 0 ? `\n${indent}` : null}
                {line.map((item, itemIndex) => (
                  <span key={item}>
                    <Str>{item}</Str>
                    {itemIndex < line.length - 1 ||
                    lineIndex < field.value.length - 1
                      ? ", "
                      : null}
                  </span>
                ))}
              </span>
            ))}
            ],{"\n"}
          </span>
        );
      })}
      {"};"}
    </pre>
  </div>
);

export const Banner = async () => {
  const t = await getTranslations("HomePage.Banner");
  const tSocial = await getTranslations("PersonalLinks.social");
  const code = t.raw("code");

  return (
    <section className="gridbg border-b border-line">
      <div className="mx-auto flex max-w-site flex-wrap items-center gap-14 px-6 pb-20 pt-20 sm:pb-24 sm:pt-28">
        <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-[26px]">
          <span className="mono inline-flex items-center gap-2.5 self-start rounded-full border border-line bg-surface px-3 py-[7px] text-[13px] text-muted">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-s-fill"
            />
            {t("role")}
          </span>
          <h1 className="m-0 text-[46px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-[60px] lg:text-[72px]">
            {t("greeting")} <span className="text-p">{t("name")}</span>.
          </h1>
          <p className="m-0 max-w-[620px] text-[19px] leading-[1.5] text-fg sm:text-[22px]">
            {t("lead")}
          </p>
          <p className="m-0 max-w-[600px] text-[17px] leading-[1.65] text-muted">
            {t("body")}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-3">
            <a
              href="#experience"
              className="btn inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-p-fill px-[22px] font-bold text-p-on no-underline"
            >
              {t("cta")}
              <ArrowDownIcon />
            </a>
            {SOCIAL.map((social) => (
              <a
                key={social.id}
                href={social.url}
                {...(social.id === "email"
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                className="ghost btn inline-flex min-h-12 items-center rounded-xl border border-line px-[18px] font-semibold text-muted no-underline"
              >
                {tSocial(social.id)}
              </a>
            ))}
          </div>
        </div>
        <CodeCard code={code} label={t("codeLabel")} />
      </div>
    </section>
  );
};
