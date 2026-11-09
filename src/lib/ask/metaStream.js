import "server-only";

const META_RE = /\[\[\s*meta\s*(\{[\s\S]*\})\s*\]\]/;

/**
 * Splits the model output into visible answer text and the trailing
 * `[[meta {...}]]` line. `push(delta)` returns the text that is safe to
 * forward right now: once a "[[" appears (or a trailing "[" could start one)
 * the rest is held back, so the meta tail never reaches the client.
 */
export const createMetaFilter = () => {
  let full = "";
  let emitted = 0;
  let cut = -1;

  const push = (delta) => {
    full += delta;
    if (cut !== -1) return "";
    const marker = full.indexOf("[[", emitted > 0 ? emitted - 1 : 0);
    let safeEnd;
    if (marker !== -1) {
      cut = marker;
      safeEnd = marker;
    } else {
      safeEnd = full.endsWith("[") ? full.length - 1 : full.length;
    }
    if (safeEnd <= emitted) return "";
    const out = full.slice(emitted, safeEnd);
    emitted = safeEnd;
    return out;
  };

  /** Returns `{ tail, answer, meta }`; `tail` is any text still unsent. */
  const finish = () => {
    let tail = "";
    if (cut === -1 && emitted < full.length) {
      tail = full.slice(emitted);
      emitted = full.length;
    }
    const answer = (cut === -1 ? full : full.slice(0, cut)).trim();
    let meta = null;
    const match = cut === -1 ? null : full.slice(cut).match(META_RE);
    if (match) {
      try {
        meta = JSON.parse(match[1]);
      } catch {
        meta = null;
      }
    }
    return { tail, answer, meta };
  };

  return { push, finish };
};
