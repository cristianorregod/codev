import { SmartLink } from "./links";
import styles from "./panel.module.css";

// Small markdown subset for answers: paragraphs, line breaks, headings (as
// bold paragraphs), bullet/numbered lists, **bold**, `code` and [links](url).
const INLINE = /(\*\*[^*\n]+\*\*|`[^`\n]+`|\[[^\]\n]+\]\([^)\s]+\))/g;

function parseBlocks(text) {
  const blocks = [];
  let para = [];
  let list = null;
  const flushPara = () => {
    if (para.length) blocks.push({ type: "p", lines: para });
    para = [];
  };
  const flushList = () => {
    if (list) blocks.push(list);
    list = null;
  };

  for (const raw of text.replace(/\r/g, "").split("\n")) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }
    const bullet = /^\s*[-*•]\s+(.*)$/.exec(line);
    const numbered = /^\s*\d+[.)]\s+(.*)$/.exec(line);
    if (bullet || numbered) {
      flushPara();
      const type = bullet ? "ul" : "ol";
      if (list?.type !== type) {
        flushList();
        list = { type, items: [] };
      }
      list.items.push((bullet || numbered)[1]);
      continue;
    }
    flushList();
    const heading = /^#{1,6}\s+(.*)$/.exec(line);
    if (heading) {
      flushPara();
      blocks.push({ type: "h", text: heading[1] });
      continue;
    }
    para.push(line);
  }
  flushPara();
  flushList();
  return blocks;
}

function renderInline(text, ctx) {
  return text.split(INLINE).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      return (
        <SmartLink
          key={i}
          href={link[2]}
          locale={ctx.locale}
          onNavigate={ctx.onNavigate}
        >
          {link[1]}
        </SmartLink>
      );
    }
    return part;
  });
}

export const Markdown = ({ text, locale, onNavigate, trailing }) => {
  const ctx = { locale, onNavigate };
  const blocks = parseBlocks(text);
  const last = blocks.length - 1;
  return (
    <div className={styles.md}>
      {blocks.map((block, i) => {
        const tail = i === last ? trailing : null;
        if (block.type === "h") {
          return (
            <p key={i}>
              <strong>{renderInline(block.text, ctx)}</strong>
              {tail}
            </p>
          );
        }
        if (block.type === "p") {
          return (
            <p key={i}>
              {block.lines.map((line, j) => (
                <span key={j}>
                  {j > 0 && <br />}
                  {renderInline(line, ctx)}
                </span>
              ))}
              {tail}
            </p>
          );
        }
        const List = block.type;
        return (
          <List key={i}>
            {block.items.map((item, j) => (
              <li key={j}>
                {renderInline(item, ctx)}
                {j === block.items.length - 1 && tail}
              </li>
            ))}
          </List>
        );
      })}
    </div>
  );
};
