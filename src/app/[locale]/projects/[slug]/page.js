import { ProjectBody } from "@/components/ProjectBody";
import { getPostBySlug, getPosts } from "@/lib/mdx";
import "highlight.js/styles/atom-one-dark.css";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const locales = routing.locales;
  const paths = [];

  for (const locale of locales) {
    const projects = getPosts(process.env.PROJECTS_PATH, locale);
    projects.forEach((project) => {
      paths.push({
        locale,
        slug: project.replace(/\.mdx?$/, ""),
      });
    });
  }

  return paths;
}

export async function generateMetadata({ params }, parent) {
  const { slug, locale } = await params;
  const project = await getPostBySlug(slug, process.env.PROJECTS_PATH, locale);
  if (!project) return {};
  const { frontmatter } = project;
  const previousImages = (await parent).openGraph?.images || [];
  return {
    metadataBase: new URL("https://cristianorrego.dev"),
    title: `Cristian Orrego Dev 👨‍💻 | ${frontmatter.title}`,
    description: frontmatter?.excerpt,
    openGraph: {
      title: `Cristian Orrego Dev 👨‍💻 | ${frontmatter.title}`,
      description: frontmatter?.excerpt,
      images: [frontmatter?.cover, ...previousImages],
      author: "cristianorregodev",
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug, locale } = await params;
  const project = await getPostBySlug(slug, process.env.PROJECTS_PATH, locale);

  if (!project) return <div>Project not found</div>;

  const { content, frontmatter } = project;

  return (
    <>
      <ProjectBody content={content} frontmatter={frontmatter} />
    </>
  );
}
