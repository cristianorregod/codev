"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { Markdown } from "./Markdown";
import { SourceCard } from "./SourceCard";
import { SendIcon, SparkIcon, StopIcon } from "./icons";
import { QUESTION_MAX, useAskChat } from "./useAskChat";
import styles from "./panel.module.css";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Which suggestion set fits the current (locale-less) pathname. */
const pageContext = (pathname) => {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return { key: "home" };
  const detail = /^\/(projects|posts)\/([^/]+)$/.exec(path);
  if (detail) {
    return {
      key: detail[1] === "projects" ? "project" : "post",
      slug: decodeURIComponent(detail[2]),
    };
  }
  if (path === "/projects") return { key: "projects" };
  if (path === "/posts") return { key: "posts" };
  if (path === "/services") return { key: "services" };
  return { key: "fallback" };
};

const humanize = (slug) =>
  slug.replace(/[-_]+/g, " ").replace(/^./, (c) => c.toUpperCase());

const useSuggestions = (open) => {
  const t = useTranslations("AskAI");
  const pathname = usePathname();
  const [title, setTitle] = useState("");
  const context = pageContext(pathname);

  useEffect(() => {
    if (!open || !context.slug) return;
    // The page heading holds the localized project/post title.
    const heading = document.querySelector("main h1")?.textContent?.trim();
    setTitle(heading || humanize(context.slug));
  }, [open, context.slug]);

  const raw = t.raw(`Suggestions.${context.key}`);
  const list = Array.isArray(raw) ? raw : [];
  return list.map((s) =>
    s.replaceAll("{title}", title || humanize(context.slug || "")),
  );
};

const ErrorText = ({ error }) => {
  const t = useTranslations("AskAI.Errors");
  if (error?.code === "rateLimit") {
    const seconds = error.seconds;
    if (!seconds) return t("rateLimit");
    if (seconds < 60) return t("rateLimitSeconds", { count: seconds });
    return t("rateLimitMinutes", { count: Math.ceil(seconds / 60) });
  }
  const code = ["invalid", "forbidden", "network"].includes(error?.code)
    ? error.code
    : "generic";
  return t(code);
};

const AnswerMessage = ({ message, locale, onNavigate, onAsk, busy }) => {
  const t = useTranslations("AskAI");
  const { status, content, sources = [], follow = [] } = message;
  const streaming = status === "streaming";
  const ended = status === "done" || status === "stopped";

  return (
    <div className="flex items-start gap-3.5">
      <span
        aria-hidden="true"
        className="mono flex h-[30px] w-[30px] flex-none items-center justify-center rounded-[9px] bg-p-soft text-[11px] font-semibold text-p"
      >
        {t("assistant")}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-3.5">
        {status === "searching" && (
          <p className="mono m-0 pt-1.5 text-[13px] text-muted">
            <span className="text-p">›</span> {t("searching")}
            <span className={styles.dots} aria-hidden="true">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </p>
        )}
        {content && (
          <div className="pt-[3px] text-[15px] leading-[1.7] text-fg sm:text-base">
            <Markdown
              text={content}
              locale={locale}
              onNavigate={onNavigate}
              trailing={
                streaming ? (
                  <span className={styles.cursor} aria-hidden="true" />
                ) : null
              }
            />
          </div>
        )}
        {status === "stopped" && (
          <p className="mono m-0 text-xs text-muted">{t("stopped")}</p>
        )}
        {status === "error" && (
          <p
            role="alert"
            className="m-0 rounded-xl border border-line bg-surface-2 px-3.5 py-3 text-[15px] leading-relaxed text-prose"
          >
            <ErrorText error={message.error} />
          </p>
        )}
        {ended && sources.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <span className="mono text-xs uppercase text-muted">
              {t("sourcesTitle", { count: sources.length })}
            </span>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {sources.map((source) => (
                <SourceCard
                  key={source.id || source.url}
                  source={source}
                  locale={locale}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        )}
        {ended && follow.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {follow.map((text) => (
              <button
                key={text}
                type="button"
                disabled={busy}
                onClick={() => onAsk(text)}
                className={`${styles.sugg} mono cursor-pointer rounded-full border border-line bg-transparent px-3 py-[7px] text-left text-xs text-muted disabled:cursor-not-allowed disabled:opacity-60`}
              >
                › {text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/** The Ask AI dialog: centered command palette, bottom sheet on mobile. */
export default function AskPanel({ open, onClose, onCount }) {
  const t = useTranslations("AskAI");
  const locale = useLocale();
  const titleId = useId();
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const { messages, busy, ask, stop, clear } = useAskChat({ locale, onCount });
  const suggestions = useSuggestions(open);

  const submit = useCallback(
    (text) => {
      if (busy || !text.trim()) return;
      ask(text);
      setInput("");
      inputRef.current?.focus();
    },
    [ask, busy],
  );

  // Body scroll lock (compensating the scrollbar to avoid a layout shift).
  useEffect(() => {
    if (!open) return undefined;
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const prev = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.paddingRight;
    };
  }, [open]);

  // Initial focus: the input on pointer devices, the dialog on touch devices
  // (avoids popping the on-screen keyboard over the sheet).
  useEffect(() => {
    if (!open) return undefined;
    const id = window.setTimeout(() => {
      if (window.matchMedia("(pointer: fine)").matches) {
        inputRef.current?.focus();
      } else {
        dialogRef.current?.focus();
      }
    }, 30);
    return () => window.clearTimeout(id);
  }, [open]);

  // Escape closes; Tab is trapped inside the dialog.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const nodes = [...dialogRef.current.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.getClientRects().length > 0,
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      const outside =
        !dialogRef.current.contains(active) || active === dialogRef.current;
      if (event.shiftKey && (outside || active === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (outside || active === last)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const empty = messages.length === 0;
  const lastAnswer = messages[messages.length - 1];
  const announcement =
    lastAnswer?.role !== "assistant"
      ? ""
      : lastAnswer.status === "searching"
        ? t("searching")
        : lastAnswer.status === "done"
          ? lastAnswer.content
          : "";
  const canSend = !busy && input.trim().length > 0;

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`${styles.backdrop} fixed inset-0 z-50`}
      />
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`${styles.panel} fixed inset-x-0 z-[60] mx-auto flex flex-col overflow-hidden border border-p-line bg-surface font-sans text-fg outline-none max-sm:bottom-0 max-sm:max-h-[88dvh] max-sm:w-full max-sm:rounded-t-[20px] max-sm:border-b-0 sm:top-[9vh] sm:max-h-[80vh] sm:w-[min(760px,calc(100vw-32px))] sm:rounded-[20px]`}
      >
        <h2 id={titleId} className="sr-only">
          {t("dialogLabel")}
        </h2>
        <p role="status" className="sr-only">
          {announcement}
        </p>
        <span
          aria-hidden="true"
          className="mx-auto mt-2 h-1 w-10 flex-none rounded-full bg-line sm:hidden"
        />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(input);
          }}
          className="flex flex-none items-center gap-3 border-b border-line py-3 pl-[18px] pr-3"
        >
          <SparkIcon size={20} className={`${styles.spark} flex-none text-p`} />
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={t("placeholder")}
            aria-label={t("inputLabel")}
            maxLength={QUESTION_MAX}
            autoComplete="off"
            enterKeyHint="send"
            className={`${styles.input} min-w-0 flex-1 border-0 bg-transparent py-3 font-sans text-base text-fg outline-none focus-visible:outline-none sm:text-[19px]`}
          />
          {input.length > QUESTION_MAX - 60 && (
            <span className="mono flex-none text-[11px] text-muted">
              {input.length}/{QUESTION_MAX}
            </span>
          )}
          {busy ? (
            <button
              type="button"
              onClick={stop}
              aria-label={t("stop")}
              className="btn flex h-11 w-11 flex-none cursor-pointer items-center justify-center rounded-xl border border-line bg-surface-2 text-fg"
            >
              <StopIcon />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canSend}
              aria-label={t("send")}
              className={`btn flex h-11 w-11 flex-none items-center justify-center rounded-xl border-0 ${
                canSend
                  ? "cursor-pointer bg-p-fill text-p-on"
                  : "cursor-not-allowed bg-surface-2 text-muted"
              }`}
            >
              <SendIcon />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="ghost mono h-8 flex-none cursor-pointer rounded-lg border border-line bg-transparent px-[9px] text-[11px] text-muted"
          >
            esc
          </button>
        </form>

        <div className="flex min-h-0 flex-1 flex-col-reverse overflow-y-auto overscroll-contain">
          <div className="flex flex-col gap-[22px] px-4 pb-[18px] pt-[22px] sm:px-6">
            {empty && (
              <div className="flex flex-col gap-3.5">
                <span className="mono text-xs uppercase text-muted">
                  {t("suggestionsTitle")}
                </span>
                <div className="flex flex-col gap-1.5">
                  {suggestions.map((text) => (
                    <button
                      key={text}
                      type="button"
                      onClick={() => submit(text)}
                      className={`${styles.sugg} flex cursor-pointer items-center gap-3 rounded-xl border border-transparent bg-surface-2 px-3.5 py-[13px] text-left font-sans text-[15px] text-fg sm:text-base`}
                    >
                      <span aria-hidden="true" className="mono text-p">
                        ›
                      </span>
                      <span className="flex-1">{text}</span>
                      <span
                        aria-hidden="true"
                        className="mono text-xs text-muted"
                      >
                        ↵
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((message) =>
              message.role === "user" ? (
                <div
                  key={message.id}
                  className={`${styles.msg} flex justify-end`}
                >
                  <p className="m-0 max-w-[85%] whitespace-pre-line break-words rounded-[14px_14px_4px_14px] border border-line bg-surface-2 px-[15px] py-[11px] text-[15px] leading-[1.55] sm:max-w-[78%] sm:text-base">
                    <span className="sr-only">{t("you")}: </span>
                    {message.content}
                  </p>
                </div>
              ) : (
                <div key={message.id} className={styles.msg}>
                  <AnswerMessage
                    message={message}
                    locale={locale}
                    onNavigate={onClose}
                    onAsk={submit}
                    busy={busy}
                  />
                </div>
              ),
            )}
          </div>
        </div>

        <div className="mono flex flex-none items-center gap-4 border-t border-line px-[18px] py-[11px] text-[11px] text-muted max-sm:pb-[max(11px,env(safe-area-inset-bottom))]">
          <span className="hidden sm:inline">
            <kbd className="text-fg">↵</kbd> {t("hintSend")}
          </span>
          <span className="hidden sm:inline">
            <kbd className="text-fg">esc</kbd> {t("hintClose")}
          </span>
          <span className="flex-1 leading-snug sm:text-right">
            {t("disclaimer")}
          </span>
          {!empty && (
            <button
              type="button"
              onClick={() => {
                clear();
                inputRef.current?.focus();
              }}
              className="ghost flex-none cursor-pointer rounded-[7px] border border-line bg-transparent px-[9px] py-[5px] font-[inherit] text-[11px] text-muted"
            >
              {t("clear")}
            </button>
          )}
        </div>
      </section>
    </>
  );
}
