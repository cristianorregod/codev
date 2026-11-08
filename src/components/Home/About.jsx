import { getLocale, getTranslations } from "next-intl/server";
import { PERSONAL_LINKS_DATA } from "@/data/personal-links";
import { SectionHeading } from "../ui/SectionHeading";
import { DownloadIcon } from "../ui/icons";

export const About = async () => {
  const t = await getTranslations("HomePage.About");
  const isEnglish = (await getLocale()) === "en";
  const cv = isEnglish
    ? { href: "/cristian-orrego-cv-en.pdf", file: "Cristian-Orrego-CV-EN.pdf" }
    : { href: "/cristian-orrego-cv.pdf", file: "Cristian-Orrego-CV.pdf" };

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-site px-6 pb-6 pt-20 sm:pt-24"
    >
      <SectionHeading number="03" id="about-title" title={t("title")} />
      <div className="flex flex-wrap items-start gap-12">
        <figure className="m-0 flex flex-[0_1_300px] flex-col gap-3.5">
          <img
            src={PERSONAL_LINKS_DATA.profile.avatar}
            alt={t("photoAlt")}
            loading="lazy"
            className="block aspect-square w-full max-w-[300px] rounded-[18px] border border-line object-cover"
          />
          <figcaption className="mono text-xs text-muted">
            {t("caption")}
          </figcaption>
        </figure>
        <div className="flex min-w-0 flex-[999_1_480px] flex-col gap-5">
          <p className="m-0 text-[21px] font-semibold leading-[1.45] sm:text-2xl">
            {t("lead")}
          </p>
          <p className="m-0 text-[17px] leading-[1.7] text-muted">{t("p2")}</p>
          <p className="m-0 text-[17px] leading-[1.7] text-muted">{t("p3")}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href={cv.href}
              download={cv.file}
              className="btn inline-flex min-h-12 items-center gap-2.5 rounded-xl bg-s-fill px-[22px] font-bold text-s-on no-underline"
            >
              <DownloadIcon />
              {t("cv")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
