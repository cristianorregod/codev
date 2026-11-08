"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { PERSONAL_LINKS_DATA } from "@/data/personal-links";
import { copyTextWithFallback } from "@/helpers/personalLinks";
import {
  ArrowUpRightIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  CodeIcon,
  DatabaseIcon,
  ShareIcon,
} from "../ui/icons";

const SECTION_ICONS = {
  briefcase: BriefcaseIcon,
  code: CodeIcon,
  database: DatabaseIcon,
};

const TONES = {
  primary: "bg-p-soft text-p",
  secondary: "bg-s-soft text-s",
};

const { profile, sections } = PERSONAL_LINKS_DATA;

const IconTile = ({ icon, tone }) => {
  const Icon = SECTION_ICONS[icon];
  return (
    <span
      aria-hidden="true"
      className={`flex h-11 flex-[0_0_44px] items-center justify-center rounded-xl ${
        TONES[tone] ?? TONES.primary
      }`}
    >
      {Icon ? <Icon /> : null}
    </span>
  );
};

const CardText = ({ title, description }) => (
  <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
    <span className="font-bold">{title}</span>
    {description ? (
      <span className="text-sm leading-[1.45] text-muted">{description}</span>
    ) : null}
  </span>
);

const cardClass =
  "card flex items-center gap-4 rounded-2xl border border-line bg-surface p-[18px] text-fg no-underline";

const SimpleLink = ({ section, t }) => {
  const content = (
    <>
      <IconTile icon={section.icon} tone={section.tone} />
      <CardText
        title={t(section.titleKey)}
        description={t(section.descriptionKey)}
      />
      <ArrowUpRightIcon className="shrink-0 text-muted" />
    </>
  );

  if (section.url.startsWith("/")) {
    return (
      <Link href={section.url} className={cardClass}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={section.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
    >
      {content}
    </a>
  );
};

const AccordionLink = ({ section, t }) => {
  const [open, setOpen] = useState(false);
  const title = t(section.titleKey);
  const panelId = `links-panel-${section.id}`;

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-surface ${
        open ? "border-p-line" : "border-line"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={
          open
            ? t("accordion.close", { title })
            : t("accordion.open", { title })
        }
        className="flex w-full cursor-pointer items-center gap-4 border-0 bg-transparent p-[18px] text-left text-fg"
      >
        <IconTile icon={section.icon} tone={section.tone} />
        <CardText title={title} description={t(section.descriptionKey)} />
        <ChevronDownIcon
          className={`shrink-0 text-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <ul
        id={panelId}
        className={`mono m-0 list-none ${open ? "flex" : "hidden"} flex-col border-t border-line p-0 text-sm`}
      >
        {section.items.map((item, index) => (
          <li
            key={item.id}
            className={
              index < section.items.length - 1 ? "border-b border-line" : ""
            }
          >
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-between pl-[78px] pr-[18px] text-fg no-underline hover:text-p"
            >
              {t(item.labelKey)}
              <span aria-hidden="true" className="text-p">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const PersonalLinksLanding = () => {
  const t = useTranslations("PersonalLinks");
  const [shareStatus, setShareStatus] = useState("idle");
  const timeoutRef = useRef();

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleShare = async () => {
    const copied = await copyTextWithFallback(window.location.href);
    setShareStatus(copied ? "success" : "error");
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShareStatus("idle"), 3000);
  };

  return (
    <main className="gridbg min-h-screen">
      <div className="mx-auto flex max-w-[520px] flex-col gap-7 px-5 pb-24 pt-14 sm:pt-[72px]">
        <Link
          href="/"
          className="mono inline-flex min-h-11 items-center self-start text-[13px] text-muted no-underline hover:text-fg"
        >
          <span className="text-p">~/</span>
          {t("home")}
        </Link>

        <div className="flex flex-col items-center gap-3.5 text-center">
          <img
            src={profile.avatar}
            alt={t("profile.avatarAlt")}
            width={104}
            height={104}
            className="block size-[104px] rounded-full border-2 border-p-fill object-cover"
          />
          <h1 className="m-0 text-[28px] font-extrabold tracking-[-0.02em]">
            {profile.name}
          </h1>
          <p className="m-0 max-w-[400px] text-base leading-[1.6] text-muted">
            {t(profile.bioKey)}
          </p>
          <ul className="m-0 mt-1 flex list-none flex-wrap justify-center gap-2.5 p-0">
            {profile.social.map((social) => {
              const label = t(social.labelKey);
              return (
                <li key={social.id}>
                  <a
                    href={social.url}
                    {...(social.id === "email"
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="ghost btn mono inline-flex min-h-11 items-center rounded-[10px] border border-line bg-surface px-3.5 text-[13px] text-muted no-underline"
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label={t("navLabel")} className="flex flex-col gap-3">
          {sections.map((section) =>
            section.type === "accordion" ? (
              <AccordionLink key={section.id} section={section} t={t} />
            ) : (
              <SimpleLink key={section.id} section={section} t={t} />
            ),
          )}
        </nav>

        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="btn inline-flex min-h-12 cursor-pointer items-center gap-2.5 rounded-xl border-0 bg-p-fill px-[22px] font-bold text-p-on"
          >
            <ShareIcon />
            {t("share.button")}
          </button>
          <p role="status" className="mono m-0 min-h-5 text-[13px] text-muted">
            {shareStatus === "success" ? t("share.success") : null}
            {shareStatus === "error" ? t("share.error") : null}
          </p>
        </div>
      </div>
    </main>
  );
};
