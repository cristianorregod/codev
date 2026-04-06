import { ServicesLanding } from "@/components/Services/ServicesLanding";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage.meta" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    metadataBase: new URL("https://cristianorrego.dev"),
    alternates: {
      canonical: "https://cristianorrego.dev/services",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: ["/images/og-services.webp"],
      url: "https://cristianorrego.dev/services",
      type: "website",
    },
  };
}

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  return <ServicesLanding locale={locale} />;
}
