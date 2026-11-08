import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { PERSONAL_LINKS_DATA } from "@/data/personal-links";

const SOCIAL = PERSONAL_LINKS_DATA.profile.social.filter(
  (social) => social.id !== "email",
);

const linkClass =
  "navlink inline-flex min-h-11 items-center text-muted no-underline lg:min-h-0";

export const Footer = () => {
  const t = useTranslations("HomePage");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-3 px-6 py-7 text-sm text-muted">
        <span>
          © {year} Cristian Orrego. {t("Footer.rights")}
        </span>
        <ul className="mono m-0 flex list-none flex-wrap gap-x-[18px] p-0 text-[13px]">
          <li>
            <Link href="/services" className={linkClass}>
              {t("Nav.services")}
            </Link>
          </li>
          {SOCIAL.map((social) => (
            <li key={social.id}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {t(`Footer.${social.id}`)}
              </a>
            </li>
          ))}
          <li>
            <Link href="/links" className={linkClass}>
              {t("Footer.links")}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
