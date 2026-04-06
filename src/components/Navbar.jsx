"use client";
import { useRef, useState } from "react";
import { NavLink } from "./NavLink";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { ThemeSwitch } from "./ThemeSwich";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export const Navbar = () => {
  const t = useTranslations("HomePage.Nav");
  const navRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const showNavBar = () => {
    navRef.current.classList.toggle("hidden");
    setIsOpen(!isOpen);
  };

  return (
    <header className="backdrop-blur-md bg-dark-200/30 dark:bg-dark-900/30 fixed w-full z-20 top-0 left-0">
      <nav className="container px-2 lg:max-w-[1114px] flex flex-wrap items-center justify-between mx-auto py-4 ">
        <Link
          href="/"
          className="flex gap-2 items-center self-center text-3xl font-black whitespace-nowrap text-primary-600 dark:text-primary-400"
        >
          codev
        </Link>
        <div className="md:order-2">
          <ul className="hidden md:flex md:space-x-8 items-center ">
            <li>
              <LanguageSwitcher />
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/cristianorregod/"
                target="_blank"
                className="text-dark-700 hover:text-dark-500 dark:text-dark-200 dark:hover:text-dark-50 transition-colors duration-300"
                aria-label="Visit my LinkedIn profile"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/cristianorregod"
                target="_blank"
                className="text-dark-700 hover:text-dark-500 dark:text-dark-200 dark:hover:text-dark-50 transition-colors duration-300"
                aria-label="Visit my Github profile"
              >
                <FaGithub />
              </a>
            </li>
            <li>
              <ThemeSwitch />
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>
            <ThemeSwitch show={false} />
            <button
              className="p-2 text-sm text-dark-700 dark:text-dark-200 rounded-lg md:hidden"
              onClick={showNavBar}
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          ref={navRef}
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 transition-all duration-500"
        >
          <ul className="flex flex-col gap-6 p-4 md:p-0 mt-4 font-medium  md:flex-row  md:mt-0 md:border-0 ">
            {/* <li className="text-center">
              <NavLink
                label={t("services")}
                link={"/services"}
                action={showNavBar}
              />
            </li> */}
            <li className="text-center">
              <NavLink
                label={t("projects")}
                link={"/projects"}
                action={showNavBar}
              />
            </li>
            <li className="text-center">
              <NavLink
                label={t("experience")}
                link={"/#experience"}
                action={showNavBar}
              />
            </li>
            <li className="text-center">
              <NavLink
                label={t("about")}
                link={"/#about"}
                action={showNavBar}
              />
            </li>
            <li className="text-center">
              <NavLink
                label={t("articles")}
                link={"/posts"}
                action={showNavBar}
              />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
