"use client";

import { useEffect, useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { PERSONAL_LINKS_DATA } from "@/data/personal-links";
import { copyTextWithFallback } from "@/helpers/personalLinks";
import { PersonalLinksSkeleton } from "./PersonalLinksSkeleton";

const SOCIAL_ICONS = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  email: FaEnvelope,
};

export const PersonalLinksLanding = () => {
  const t = useTranslations("PersonalLinks");
  const [openAccordion, setOpenAccordion] = useState(null);
  const [shareStatus, setShareStatus] = useState("idle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleToggleAccordion = (id) => {
    setOpenAccordion((currentId) => (currentId === id ? null : id));
  };

  const handleCopyUrl = async () => {
    const copied = await copyTextWithFallback(window.location.href);
    setShareStatus(copied ? "success" : "error");

    setTimeout(() => {
      setShareStatus("idle");
    }, 2200);
  };

  if (loading) {
    return <PersonalLinksSkeleton />;
  }

  return (
    <section className="container mx-auto px-3 pt-32 pb-14">
      <div className="mx-auto w-full max-w-md">
        <article className="rounded-3xl border border-white/25 bg-white/15 dark:bg-dark-900/40 backdrop-blur-xl shadow-xl shadow-primary-900/10 p-6 text-center">
          <img
            src={PERSONAL_LINKS_DATA.profile.avatar}
            alt={PERSONAL_LINKS_DATA.profile.name}
            width={160}
            height={160}
            className="mx-auto h-24 w-24 rounded-full object-cover shadow-lg"
            loading="lazy"
          />

          <h1 className="mt-4 text-2xl font-bold text-dark-800 dark:text-dark-100">
            {PERSONAL_LINKS_DATA.profile.name}
          </h1>

          <p className="mt-2 text-sm text-dark-700 dark:text-dark-200">
            {t(PERSONAL_LINKS_DATA.profile.bioKey)}
          </p>

          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {PERSONAL_LINKS_DATA.profile.social.map((socialLink) => {
              const Icon = SOCIAL_ICONS[socialLink.id];
              const label = t(socialLink.labelKey);

              return (
                <li key={socialLink.id}>
                  <a
                    href={socialLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/30 dark:bg-dark-800/60 px-3 py-1.5 text-sm text-dark-800 dark:text-dark-100 hover:bg-white/50 dark:hover:bg-dark-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
                    aria-label={t("links.open", { label })}
                  >
                    {Icon ? <Icon className="size-3.5" /> : null}
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-5">
            <button
              type="button"
              onClick={handleCopyUrl}
              className="w-full lg:w-fit rounded-2xl border border-primary-400/40 bg-primary-500/20 px-4 py-3 text-sm font-semibold text-primary-900 dark:text-primary-100 hover:bg-primary-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
            >
              {t("share.button")}
            </button>
            <p
              className="mt-2 min-h-5 text-xs text-dark-700 dark:text-dark-300"
              role="status"
            >
              {shareStatus === "success" ? t("share.success") : ""}
              {shareStatus === "error" ? t("share.error") : ""}
            </p>
          </div>
        </article>

        <div className="mt-5 space-y-3">
          {PERSONAL_LINKS_DATA.sections.map((section) => {
            if (section.type === "simple") {
              return (
                <a
                  key={section.id}
                  href={section.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-white/20 bg-white/15 dark:bg-dark-900/40 backdrop-blur-xl px-4 py-4 hover:bg-white/30 dark:hover:bg-dark-800/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
                  aria-label={t("links.open", { label: t(section.titleKey) })}
                >
                  <p className="text-base font-semibold text-dark-800 dark:text-dark-100">
                    {section.icon} {t(section.titleKey)}
                  </p>
                  <p className="mt-1 text-sm text-dark-700 dark:text-dark-300">
                    {t(section.descriptionKey)}
                  </p>
                </a>
              );
            }

            const isOpen = openAccordion === section.id;
            const sectionTitle = t(section.titleKey);

            return (
              <article
                key={section.id}
                className="rounded-2xl border border-white/20 bg-white/15 dark:bg-dark-900/40 backdrop-blur-xl"
              >
                <button
                  type="button"
                  onClick={() => handleToggleAccordion(section.id)}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-${section.id}`}
                  aria-label={
                    isOpen
                      ? t("accordion.close", { title: sectionTitle })
                      : t("accordion.open", { title: sectionTitle })
                  }
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-dark-800 dark:text-dark-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-2xl"
                >
                  <span className="font-semibold">
                    {section.icon} {sectionTitle}
                    {t(section.descriptionKey) ? (
                      <p className="mt-1 text-sm text-dark-700 dark:text-dark-300">
                        {t(section.descriptionKey)}
                      </p>
                    ) : null}
                  </span>
                  <span
                    aria-hidden
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>

                </button>

                <div
                  id={`accordion-panel-${section.id}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="px-4 pb-4 space-y-2">
                      {section.items.map((item) => {
                        const itemLabel = t(item.labelKey);

                        return (
                          <li key={item.id}>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block rounded-xl bg-white/35 dark:bg-dark-800/60 px-3 py-2 text-sm text-dark-800 dark:text-dark-100 hover:bg-white/50 dark:hover:bg-dark-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors"
                              aria-label={t("links.open", { label: itemLabel })}
                            >
                              {itemLabel}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
