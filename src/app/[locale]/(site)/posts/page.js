import { PageHero } from "@/components/ui/PageHero";
import { getAllPostsMetadata } from "@/lib/mdx";
import { ListOfPosts } from "@/components/Articles/ListOfPosts";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage.Nav" });
  return {
    title: `Cristian Orrego Dev 👨‍💻 | ${t("articles")}`,
    description: (await getTranslations({ locale, namespace: "PostsPage" }))(
      "metaDescription",
    ),
    metadataBase: new URL("https://cristianorrego.dev"),
    author: "cristianorregodev",
  };
}

export default async function PostsPage({ params }) {
  const { locale } = await params;
  const posts = getAllPostsMetadata(process.env.ARTICLES_PATH, locale);
  const t = await getTranslations({ locale, namespace: "PostsPage" });

  return (
    <>
      <PageHero
        label={t("label")}
        title={t("title")}
        description={t("description")}
      >
        <span className="mono text-[13px] text-muted">
          {t("count", { count: posts.length })}
        </span>
      </PageHero>
      <section className="mx-auto max-w-site px-6 pb-24 pt-6 sm:pb-28">
        <ListOfPosts posts={posts} locale={locale} />
      </section>
    </>
  );
}
