import { Banner } from "@/components/Banner";
import { ListOfProjects } from "@/components/Projects/ListOfProjects";
import { getAllPostsMetadata } from "@/lib/mdx";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage.Nav" });
  return {
    title: `Cristian Orrego Dev 👨‍💻 | ${t("projects")}`,
    description:
      "Explora mí portafolio web y descubre mis proyectos más destacados.",
    metadataBase: new URL("https://cristianorrego.dev"),
    author: "cristianorregodev",
  };
}

export default async function ProjectsPage({ params }) {
  const { locale } = await params;
  const projects = getAllPostsMetadata(process.env.PROJECTS_PATH, locale);
  const t = await getTranslations({ locale, namespace: "HomePage.Nav" });

  return (
    <>
      <Banner title={t("projects")} maxWith="lg:w-[900px]" />

      <section className="mt-16 container mx-auto px-2 md:px-0 lg:w-[900px]  ">
        <Suspense>
          <ListOfProjects projects={projects} />
        </Suspense>
      </section>
    </>
  );
}
