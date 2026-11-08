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
  return <PersonalLinksLanding />;
}
