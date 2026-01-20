import { ArticleCard } from "../ArticleCard";
import { SectionTitle } from "../SectionTitle";
import { Link } from "@/i18n/routing";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Container } from "../Container";
import { getAllPostsMetadata } from "@/lib/mdx";
import { getTranslations } from "next-intl/server";

export const Articles = async ({ locale }) => {
  const t = await getTranslations({ locale, namespace: "HomePage.Articles" });
  const posts = getAllPostsMetadata(process.env.ARTICLES_PATH, locale);
  const articles = posts
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    })
    .slice(0, 3);

  return (
    <Container id="articles">
      <SectionTitle>{t("title")}</SectionTitle>

      {articles.map((item) => (
        <ArticleCard key={item.slug} article={item} />
      ))}
      <div className="flex justify-center w-full mt-8">
        <Link
          className="flex justify-center items-center gap-2 text-dark-800 font-bold dark:text-dark-200 relative overflow-hidden z-10   before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-dark-900 dark:before:bg-dark-50 before:rounded-lg   before:-z-10 before:transition-all before:duration-500 before:hover:w-full  transition-all duration-300  hover:text-dark-900  dark:hover:text-dark-50"
          href="/posts"
        >
          {t("more")} <AiOutlineArrowRight />
        </Link>
      </div>
    </Container>
  );
};
