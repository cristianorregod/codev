import { getAllPostsMetadata } from "@/lib/mdx";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://cristianorrego.dev";
const STATIC_PATHS = ["", "/projects", "/posts", "/services", "/links"];

const toDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

const localizedAlternates = (path) => ({
  languages: Object.fromEntries(
    routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
  ),
});

const contentEntries = (sourcePath, segment, locale) =>
  getAllPostsMetadata(sourcePath, locale).map((item) => ({
    url: `${SITE_URL}/${locale}/${segment}/${item.slug}`,
    lastModified: toDate(item.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

export default function sitemap() {
  const staticEntries = routing.locales.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency: "monthly",
      priority: path === "" ? 1 : 0.8,
      alternates: localizedAlternates(path),
    })),
  );

  const dynamicEntries = routing.locales.flatMap((locale) => [
    ...contentEntries(process.env.PROJECTS_PATH, "projects", locale),
    ...contentEntries(process.env.ARTICLES_PATH, "posts", locale),
  ]);

  return [...staticEntries, ...dynamicEntries];
}
