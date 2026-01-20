import { Link } from "@/i18n/routing";
import { AiOutlineArrowRight } from "react-icons/ai";
import { SectionTitle } from "../SectionTitle";
import { Container } from "../Container";
import { getAllPostsMetadata } from "@/lib/mdx";
import { getTranslations } from "next-intl/server";

export const Projects = async ({ locale }) => {
  const t = await getTranslations({ locale, namespace: "HomePage.Projects" });
  const projects = getAllPostsMetadata(process.env.PROJECTS_PATH, locale);
  const sorted = projects
    ?.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    })
    .slice(0, 3);

  if (!sorted || sorted.length === 0) return null;

  return (
    <Container id="projects">
      <SectionTitle>{t("title")}</SectionTitle>
      <p className="mt-6 text-dark-700 dark:text-dark-200">
        {t("description")}
      </p>
      <div className="grid md:grid-cols-4 gap-4 mt-6">
        {sorted.map((project, idx) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={`relative bg-dark-100 shadow dark:shadow-primary-50/10 dark:bg-dark-900 w-full rounded-3xl min-h-[340px] p-1 group overflow-hidden ${idx === 2 ? "md:col-span-4 md:flex md:flex-row-reverse md:items-center" : "md:col-span-2"
              }`}
          >
            <figure className={`w-full rounded-3xl overflow-hidden ${idx === 2 ? "md:w-1/2 md:h-full" : ""}`}>
              <img
                className="w-full h-full min-h-[232px] object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-300"
                src={project.cover}
                alt={project.title}
                loading="lazy"
              />
            </figure>
            <div className={`p-6 ${idx === 2 ? "md:w-1/2" : ""}`}>
              <h1 className="font-bold text-lg text-primary-700 dark:text-primary-400">
                {project.title}
              </h1>
              <p className="line-clamp-3 mt-4 text-dark-700 dark:text-dark-200">
                {project.excerpt}
              </p>
              <ul className="flex gap-1 flex-wrap text-sm mt-4">
                {project?.stack.map((item, stackIdx) => (
                  <li
                    key={item + stackIdx}
                    className="rounded-full px-2 border-dark-200 dark:border-dark-800 bg-dark-300/60 dark:bg-primary-900/30 backdrop-blur-sm text-dark-700 dark:text-dark-200"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <span className="absolute top-4 left-4 backdrop-blur-md bg-dark-600/50 py-1 px-2 rounded-full z-10 text-sm font-semibold text-dark-100 ">
              {project.category}
            </span>
          </Link>
        ))}
      </div>
      <div className="flex justify-center w-full mt-8">
        <Link
          className="flex justify-center items-center gap-2 text-dark-800 font-bold dark:text-dark-200 relative overflow-hidden z-10   before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-dark-900 dark:before:bg-dark-50 before:rounded-lg   before:-z-10 before:transition-all before:duration-500 before:hover:w-full  transition-all duration-300  hover:text-dark-900  dark:hover:text-dark-50"
          href="/projects"
        >
          {t("more")} <AiOutlineArrowRight />
        </Link>
      </div>
    </Container>
  );
};
