"use client";

import { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";
import hljs from "highlight.js";
import CopyButtonPlugin from "highlightjs-copy";
import "highlightjs-copy/styles/highlightjs-copy.css";
import { useLocale, useTranslations } from "next-intl";
import { TableOfContents } from "./TableOfContent";

let copyPluginRegistered = false;

/**
 * Renders MDX/markdown prose with themed code highlighting and a table of
 * contents built from the rendered h2 headings (sticky aside on desktop,
 * collapsible block on mobile).
 */
export const LongformContent = ({ content }) => {
  const t = useTranslations("Article");
  const locale = useLocale();
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (!copyPluginRegistered) {
      hljs.addPlugin(
        new CopyButtonPlugin({
          autohide: false,
          lang: locale,
        }),
      );
      copyPluginRegistered = true;
    }
    document
      .querySelectorAll("#article-body pre code:not([data-highlighted])")
      .forEach((block) => hljs.highlightElement(block));

    setHeadings(
      Array.from(document.querySelectorAll("#article-body h2[id]")).map(
        (heading) => ({ id: heading.id, title: heading.textContent }),
      ),
    );
  }, [content, locale]);

  const hasToc = headings.length > 1;

  return (
    <div className="mx-auto flex max-w-site items-start gap-14 px-6 pb-24 pt-10 sm:pt-14">
      <div className="min-w-0 max-w-[720px] flex-1">
        {hasToc ? (
          <details className="group mb-10 rounded-2xl border border-line bg-surface lg:hidden">
            <summary className="mono flex min-h-12 cursor-pointer list-none items-center justify-between px-[18px] text-[13px] text-muted [&::-webkit-details-marker]:hidden">
              {t("contentTable")}
              <span
                aria-hidden="true"
                className="text-p transition-transform group-open:rotate-180"
              >
                ▾
              </span>
            </summary>
            <div className="border-t border-line px-[18px] py-3">
              <TableOfContents headings={headings} />
            </div>
          </details>
        ) : null}
        <article id="article-body">
          <Markdown>{content}</Markdown>
        </article>
      </div>
      {hasToc ? (
        <aside
          aria-label={t("contentTable")}
          className="sticky top-24 hidden w-[260px] shrink-0 lg:block"
        >
          <p className="mono m-0 mb-4 text-[13px] text-p">
            {t("contentTable")}
          </p>
          <TableOfContents headings={headings} tracked />
        </aside>
      ) : null}
    </div>
  );
};
