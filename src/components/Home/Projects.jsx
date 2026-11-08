import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { getAllPostsMetadata } from "@/lib/mdx";
import { sortByDateDesc } from "@/lib/format";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "../ProjectCard";

export const Projects = async ({ locale }) => {
  const t = await getTranslations({ locale, namespace: "HomePage.Projects" });
  const projects = sortByDateDesc(
    getAllPostsMetadata(process.env.PROJECTS_PATH, locale),
  ).slice(0, 3);

  if (projects.length === 0) return null;

  const [featured, ...rest] = projects;

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mx-auto max-w-site px-6 pb-6 pt-20 sm:pt-24"
    >
      <SectionHeading
        number="02"
        id="projects-title"
        title={t("title")}
        className="mb-4"
        action={
          <Link
            href="/projects"
            className="mono text-sm text-p no-underline hover:text-fg"
          >
            {t("more")} →
          </Link>
        }
      />
      <p className="mb-9 mt-0 max-w-[680px] text-[17px] leading-[1.65] text-muted">
        {t("description")}
      </p>
      <div className="flex flex-wrap gap-5">
        <ProjectCard project={featured} locale={locale} variant="featured" />
        {rest.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            locale={locale}
            variant="compact"
          />
        ))}
      </div>
    </section>
  );
};
