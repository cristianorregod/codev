import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const root = process.cwd();

export const getPosts = (sourcePath, locale = "es") => {
  const fullPath = path.join(root, sourcePath, locale);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath);
};

export const getPostBySlug = async (slug, sourcePath, locale = "es") => {
  const filePath = path.join(root, sourcePath, locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const mdxSource = fs.readFileSync(filePath, "utf-8");
  const { data, content } = await matter(mdxSource);
  const source = await serialize(content);
  return {
    content,
    frontmatter: {
      slug,
      ...data,
    },
  };
};

export const getAllPostsMetadata = (sourcePath, locale = "es") => {
  const files = getPosts(sourcePath, locale);

  return files.reduce((allPosts, postSlug) => {
    const filePath = path.join(root, sourcePath, locale, postSlug);
    const mdxSource = fs.readFileSync(filePath, "utf-8");

    const { data } = matter(mdxSource);
    return [{ ...data, slug: postSlug.replace(".mdx", "") }, ...allPosts];
  }, []);
};
