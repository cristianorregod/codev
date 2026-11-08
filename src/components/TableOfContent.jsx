"use client";

import { useEffect, useState } from "react";

/** Heading list for long-form pages; highlights the section in view. */
export const TableOfContents = ({ headings, tracked = false }) => {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!tracked || headings.length === 0) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" },
    );
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [headings, tracked]);

  return (
    <ol className="m-0 flex list-none flex-col border-l border-line p-0">
      {headings.map((heading) => {
        const active = tracked && heading.id === activeId;
        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={active ? "location" : undefined}
              className={`-ml-px block border-l py-2 pl-4 text-sm leading-[1.45] no-underline transition-colors ${
                active
                  ? "border-p text-fg"
                  : "border-transparent text-muted hover:text-fg"
              }`}
            >
              {heading.title}
            </a>
          </li>
        );
      })}
    </ol>
  );
};
