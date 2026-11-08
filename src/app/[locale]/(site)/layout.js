import { useTranslations } from "next-intl";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SiteLayout({ children }) {
  const t = useTranslations("HomePage.Nav");
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-p-fill px-4 py-3 font-semibold text-p-on focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t("skip")}
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
