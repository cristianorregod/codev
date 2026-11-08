"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { CloseIcon, MenuIcon } from "./ui/icons";

const NAV_ITEMS = [
  { key: "experience", href: "/#experience" },
  { key: "projects", href: "/projects", section: "/projects" },
  { key: "about", href: "/#about" },
  { key: "articles", href: "/posts", section: "/posts" },
  { key: "stack", href: "/#stack" },
];

const isActive = (pathname, item) =>
  Boolean(
    item.section &&
      (pathname === item.section || pathname.startsWith(`${item.section}/`)),
  );

export const Logo = ({ onClick }) => (
  <Link
    href="/"
    onClick={onClick}
    className="mono inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-fg no-underline"
  >
    <span className="text-p">~/</span>
    cristianorrego
    <span className="text-s">_</span>
  </Link>
);

export const Navbar = () => {
  const t = useTranslations("HomePage.Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape / hash navigation / switching to the desktop layout.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (event) => event.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", close);
    desktop.addEventListener("change", onDesktop);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", close);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open, close]);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-nav backdrop-blur-[12px]">
      <nav
        aria-label={t("primary")}
        className="mx-auto flex max-w-site items-center justify-between gap-x-6 gap-y-3 px-6 py-3.5"
      >
        <Logo onClick={close} />

        {/* Desktop */}
        <div className="hidden flex-wrap items-center gap-x-[22px] gap-y-1 text-[15px] lg:flex">
          <ul className="m-0 flex list-none items-center gap-x-[22px] p-0">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`navlink inline-block py-2.5 no-underline ${
                      active ? "text-fg" : "text-muted"
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <LanguageSwitcher />
          <ThemeToggle className="size-10" />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle className="size-11" />
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? t("menuClose") : t("menuOpen")}
            onClick={() => setOpen((value) => !value)}
            className="ghost btn inline-flex size-11 cursor-pointer items-center justify-center rounded-[10px] border border-line bg-transparent text-muted"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <div
        id={menuId}
        hidden={!open}
        className="border-t border-line bg-bg lg:hidden"
      >
        <div className="mx-auto flex max-w-site flex-col gap-5 px-6 pb-6 pt-2">
          <ul className="m-0 flex list-none flex-col p-0">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item);
              return (
                <li key={item.key} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={`navlink flex min-h-12 items-center justify-between text-[17px] no-underline ${
                      active ? "text-fg" : "text-muted"
                    }`}
                  >
                    {t(item.key)}
                    <span aria-hidden="true" className="mono text-xs text-p">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between gap-4">
            <span className="mono text-xs text-muted">{t("language")}</span>
            <LanguageSwitcher size="lg" onSwitch={close} />
          </div>
        </div>
      </div>
    </header>
  );
};
