"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTransition, useState, useRef, useEffect } from "react";
import { HiChevronDown, HiTranslate } from "react-icons/hi";

export const LanguageSwitcher = () => {
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const languages = [
        { code: "es", name: "ES" },
        { code: "en", name: "EN" }
    ];

    const currentLanguage = languages.find(l => l.code === locale) || languages[0];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const switchLanguage = (nextLocale) => {
        setIsOpen(false);
        if (nextLocale === locale) return;

        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                disabled={isPending}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-dark-700 dark:text-dark-200 bg-dark-100/50 dark:bg-dark-800/50 hover:bg-dark-200 dark:hover:bg-dark-700 backdrop-blur-sm rounded-lg transition-all duration-300 ring-1 ring-dark-200/50 dark:ring-dark-700/50 shadow-sm"
                aria-label="Select language"
            >
                <HiTranslate className="size-4 opacity-70" />
                <span>{currentLanguage.name}</span>
                <HiChevronDown className={`size-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <ul className="absolute right-0 mt-2 w-28 py-1.5 bg-white/95 dark:bg-dark-900/95 backdrop-blur-md border border-dark-200/50 dark:border-dark-700/50 rounded-xl shadow-2xl z-50 transition-all duration-200 ring-1 ring-black/5 dark:ring-white/5 overflow-hidden origin-top-right">
                    {languages.map((lang) => (
                        <li key={lang.code}>
                            <button
                                onClick={() => switchLanguage(lang.code)}
                                className={`w-full text-left px-3 py-2 text-sm transition-all duration-200 flex items-center justify-between
                                    ${locale === lang.code
                                        ? "text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-950/30 font-bold"
                                        : "text-dark-700 dark:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 hover:pl-4"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    {lang.name}
                                </span>
                                {locale === lang.code && (
                                    <span className="size-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(0,143,212,0.6)]"></span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
