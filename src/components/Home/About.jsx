import { AiOutlineFileProtect } from "react-icons/ai";
import { Container } from "../Container";
import { SectionTitle } from "../SectionTitle";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export const About = async () => {
  const t = await getTranslations("HomePage.About");
  return (
    <Container id="about">
      <SectionTitle>{t("title")}</SectionTitle>
      <div className="pt-12 md:pt-2">
        <div className="w-full">
          <img
            src="/images/cristian_orrego.webp"
            alt="Programador mirando a la cámara con escritorio atrás"
            className=" object-cover rounded-full size-72 shadow-lg shadow-dark-900/20 dark:shadow-dark-50/10  mx-auto"
            loading="lazy"
          />

          <p className="mt-8 text-dark-700 dark:text-dark-200 md:w-11/12 text-pretty text-base">
            {t("p1")}
          </p>
          <p className="mt-4 text-dark-700 dark:text-dark-200 md:w-11/12 text-pretty text-base">
            {t("p2")}
          </p>
          <p className="mt-4 text-dark-700 dark:text-dark-200 md:w-11/12 text-pretty text-base">
            {t("p3")}
          </p>
          <p className="mt-4 text-dark-700 dark:text-dark-200 md:w-11/12 text-pretty text-base">
            {t("p4")}
          </p>
        </div>
      </div>
      <div className="flex justify-center w-full mt-8">
        <a
          className="flex items-center gap-2 px-6 py-2 font-bold relative z-10 overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:rounded-full before:bg-primary-600 before:-z-10 before:transition-all before:duration-300 before:hover:w-full text-dark-100 bg-dark-800 rounded-full hover:bg-dark-600 hover:shadow-md hover:shadow-primary-500/50 ease duration-500"
          href="https://docs.google.com/document/d/1qroZkOm9Bxvuf5LKPC12N-yTHao0oP0hR7HS_8qyZas/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("cv")} <AiOutlineFileProtect />
        </a>
      </div>
    </Container>
  );
};
