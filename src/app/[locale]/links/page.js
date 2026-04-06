import { PersonalLinksLanding } from "@/components/PersonalLinks/PersonalLinksLanding";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PersonalLinks.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function PersonalLinksPage() {
  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-full bg-dark-50 dark:bg-dark-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,153,255,0.25),rgba(255,255,255,0))]" />
      <PersonalLinksLanding />
    </>
  );
}
