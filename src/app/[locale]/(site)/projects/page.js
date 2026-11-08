import { PageHero } from "@/components/ui/PageHero";
import { ListOfProjects } from "@/components/Projects/ListOfProjects";
import { getAllPostsMetadata } from "@/lib/mdx";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage.Nav" });
  return {
    title: `Cristian Orrego Dev 👨‍💻 | ${t("projects")}`,
    description: (await getTranslations({ locale, namespace: "ProjectsPage" }))(
      "metaDescription",
    ),
    metadataBase: new URL("https://cristianorrego.dev"),
    author: "cristianorregodev",
  };
}

export default async function ProjectsPage({ params }) {
  const { locale } = await params;
  const projects = getAllPostsMetadata(process.env.PROJECTS_PATH, locale);
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });

  return (
    <>
      <PageHero
        label={t("label")}
        title={t("title")}
        description={t("description")}
      />
      <section className="mx-auto max-w-site px-6 pb-24 pt-10 sm:pb-28">
        <ListOfProjects projects={projects} />
      </section>
    </>
  );
}
