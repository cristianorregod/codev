import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="gridbg border-b border-line">
      <div className="mx-auto flex min-h-[60vh] max-w-site flex-col justify-center gap-[18px] px-6 py-20">
        <span className="mono text-[13px] text-p">{t("label")}</span>
        <h1 className="m-0 text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[56px]">
          {t("title")}
        </h1>
        <p className="m-0 max-w-[560px] text-[17px] leading-[1.6] text-muted sm:text-[18px]">
          {t("description")}
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Link
            href="/"
            className="btn inline-flex min-h-12 items-center rounded-xl bg-p-fill px-[22px] font-bold text-p-on no-underline"
          >
            {t("home")}
          </Link>
          <Link
            href="/projects"
            className="ghost btn inline-flex min-h-12 items-center rounded-xl border border-line px-[18px] font-semibold text-muted no-underline"
          >
            {t("projects")}
          </Link>
          <Link
            href="/posts"
            className="ghost btn inline-flex min-h-12 items-center rounded-xl border border-line px-[18px] font-semibold text-muted no-underline"
          >
            {t("posts")}
          </Link>
        </div>
      </div>
    </section>
  );
}
