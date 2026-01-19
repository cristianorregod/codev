"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTransition } from "react";

export const LanguageSwitcher = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();
    const localActive = useLocale();

    const onSelectChange = (e) => {
        const nextLocale = e.target.value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <select
                defaultValue={localActive}
                className="bg-transparent text-dark-700 dark:text-dark-200 text-sm font-medium focus:outline-none cursor-pointer"
                onChange={onSelectChange}
                disabled={isPending}
            >
                <option value="es" className="bg-dark-50 dark:bg-dark-950">ES</option>
                <option value="en" className="bg-dark-50 dark:bg-dark-950">EN</option>
            </select>
        </label>
    );
};
