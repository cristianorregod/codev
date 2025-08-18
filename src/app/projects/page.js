import { Banner } from "@/components/Banner";
import { ListOfProjects } from "@/components/Projects/ListOfProjects";
import { getAllPostsMetadata } from "@/lib/mdx";
import { Suspense } from "react";
export const metadata = {
  title: "Cristian Orrego Dev 👨‍💻 | Portafolio",
  description:
    "Explora mí portafolio web y descubre mis proyectos más destacados. Desde aplicaciones interactivas hasta sitios web de última generación, este portafolio te brinda una visión única de mi habilidad y creatividad.",
  metadataBase: new URL("https://cristianorrego.dev"),
  author: "cristianorregodev",
};
export default function ProjectsPage() {
  const projects = getAllPostsMetadata(process.env.PROJECTS_PATH);
  return (
    <>
      <Banner title={"Portafolio de proyectos"} maxWith="lg:w-[900px]" />

      <section className="mt-16 container mx-auto px-2 md:px-0 lg:w-[900px]  ">
        <Suspense>
          <ListOfProjects projects={projects} />
        </Suspense>
      </section>
    </>
  );
}
