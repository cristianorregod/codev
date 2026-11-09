"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { SparkIcon } from "./icons";
import { countQuestions, loadMessages } from "./storage";
import styles from "./pill.module.css";

// The panel (chat, streaming, markdown) is only downloaded on first open.
const loadPanel = () => import("./AskPanel");
const AskPanel = dynamic(loadPanel, { ssr: false });

const HIDE_AFTER = 160;

/** Floating "Ask AI" pill. Opens the assistant panel on click or ⌘K / Ctrl K. */
export const AskAI = () => {
  const t = useTranslations("AskAI");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [count, setCount] = useState(0);
  const [isMac, setIsMac] = useState(false);
  const pillRef = useRef(null);
  const openRef = useRef(false);

  const show = useCallback(() => {
    setMounted(true);
    setHidden(false);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setHidden(false);
    requestAnimationFrame(() =>
      pillRef.current?.focus({ preventScroll: true }),
    );
  }, []);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    setCount(countQuestions(loadMessages()));
    setIsMac(/Mac|iPhone|iPad/.test(navigator.userAgent || ""));
  }, []);

  // ⌘K / Ctrl K toggles the panel from anywhere on the page.
  useEffect(() => {
    const onKey = (event) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey &&
        String(event.key).toLowerCase() === "k"
      ) {
        event.preventDefault();
        if (openRef.current) close();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, show]);

  // Hide while scrolling down past the fold, show again when scrolling up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      if (openRef.current) return;
      const y = window.scrollY;
      if (y > lastY + 4 && y > HIDE_AFTER) setHidden(true);
      else if (y < lastY - 4 || y < HIDE_AFTER) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const state = open ? styles.away : hidden ? styles.hidden : "";

  return (
    <>
      <button
        ref={pillRef}
        type="button"
        onClick={show}
        onPointerEnter={loadPanel}
        onFocus={loadPanel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-keyshortcuts="Meta+K Control+K"
        tabIndex={open ? -1 : 0}
        className={`${styles.pill} ${state} flex h-[58px] cursor-pointer items-center gap-3.5 rounded-full border border-p-line py-0 pl-2.5 pr-2 font-sans text-fg`}
      >
        <kbd
          aria-hidden="true"
          className="mono hidden flex-none items-center gap-1 rounded-full border border-line bg-surface-2 px-2.5 py-1.5 text-xs text-muted sm:inline-flex"
        >
          {isMac ? "⌘K" : "Ctrl K"}
        </kbd>
        <span className="flex min-w-0 flex-1 items-center gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap text-left text-[15px] font-medium sm:text-base">
          {count > 0 && (
            <span
              aria-hidden="true"
              className={`${styles.live} h-2 w-2 flex-none rounded-full`}
            />
          )}
          <span className="truncate">
            {count > 0 ? t("pillContinue", { count }) : t("pill")}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-full bg-p-fill text-p-on"
        >
          <SparkIcon className={styles.spark} />
        </span>
      </button>
      {mounted && <AskPanel open={open} onClose={close} onCount={setCount} />}
    </>
  );
};
