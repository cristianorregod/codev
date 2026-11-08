import { About } from "@/components/Home/About";
import { Articles } from "@/components/Home/Articles";
import { Banner } from "@/components/Home/Banner";
import { Experience } from "@/components/Home/Experience";
import { Projects } from "@/components/Home/Projects";
import { Stack } from "@/components/Home/Stack";

export default async function Home({ params }) {
  const { locale } = await params;
  return (
    <>
      <Banner />
      <Experience />
      <Projects locale={locale} />
      <About />
      <Articles locale={locale} />
      <Stack />
    </>
  );
}
