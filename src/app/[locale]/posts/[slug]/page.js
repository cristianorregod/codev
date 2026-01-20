import { getPostBySlug, getPosts } from "@/lib/mdx";
import { ArticleBody } from "@/components/ArticleBody";
import "highlight.js/styles/atom-one-dark.css";
import "highlightjs-copy/styles/highlightjs-copy.css";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const locales = routing.locales;
  const paths = [];

  for (const locale of locales) {
    const posts = getPosts(process.env.ARTICLES_PATH, locale);
    posts.forEach((post) => {
      paths.push({
        locale,
        slug: post.replace(/\.mdx?$/, ""),
      });
    });
  }

  return paths;
}

export async function generateMetadata({ params }, parent) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, process.env.ARTICLES_PATH, locale);
  if (!post) return {};
  const { frontmatter } = post;
  const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL("https://cristianorrego.dev"),
    title: `Cristian Orrego Dev 👨‍💻 | ${frontmatter?.title}`,
    description: frontmatter.description,
    openGraph: {
      title: `Cristian Orrego Dev 👨‍💻 | ${frontmatter?.title}`,
      description: frontmatter.description,
      images: [frontmatter.cover, ...previousImages],
      author: "cristianorregodev",
    },
  };
}

export default async function PostPage({ params }) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, process.env.ARTICLES_PATH, locale);

  if (!post) return <div>Post not found</div>;

  const { content, frontmatter } = post;

  return (
    <>
      <ArticleBody content={content} frontmatter={frontmatter} />
    </>
  );
}
