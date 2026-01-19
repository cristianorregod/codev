import { Banner } from "@/components/Banner";
import { getAllPostsMetadata } from "@/lib/mdx";
import { ListOfPosts } from "@/components/Articles/ListOfPosts";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage.Nav" });
  return {
    title: `Cristian Orrego Dev 👨‍💻 | ${t("articles")}`,
    description:
      "Blog de programación. Explora diferentes tecnologías, encuentra guías y trucos.",
    metadataBase: new URL("https://cristianorrego.dev"),
    author: "cristianorregodev",
  };
}

export default async function PostsPage({ params }) {
  const { locale } = await params;
  const posts = getAllPostsMetadata(process.env.ARTICLES_PATH, locale);
  const t = await getTranslations({ locale, namespace: "HomePage.Nav" });

  return (
    <>
      <Banner title={t("articles")} image={"/images/bloggin.png"} />
      <section className="pt-24 container mx-auto px-2 lg:w-[740px] ">
        <ListOfPosts posts={posts} />
      </section>
    </>
  );
}
