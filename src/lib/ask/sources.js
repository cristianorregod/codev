import "server-only";
import { CONTACT_DOC_IDS, RETRIEVAL } from "./config";

// Contact channels shown as cards whenever the contact knowledge doc is used.
const CHANNEL_IDS = CONTACT_DOC_IDS.filter((id) => id !== "contact:cv");
const CONTACT_KNOWLEDGE_ID = "knowledge:contact";

const withContactChannels = (ids) => {
  if (!ids.includes(CONTACT_KNOWLEDGE_ID)) return ids;
  if (ids.some((id) => CHANNEL_IDS.includes(id))) return ids;
  return [...CHANNEL_IDS, ...ids.filter((id) => id !== CONTACT_KNOWLEDGE_ID)];
};

// Follow-ups are the visitor speaking. The model sometimes writes them in
// Cristian's voice ("¿Qué hice yo…?"): Spanish first-person preterites are
// rewritten to "tú", and English ones that can't be fixed are dropped.
const ES_OWN_VERBS = {
  hice: "hiciste",
  tuve: "tuviste",
  usé: "usaste",
  construí: "construiste",
  lideré: "lideraste",
  diseñé: "diseñaste",
  desarrollé: "desarrollaste",
  implementé: "implementaste",
  logré: "lograste",
  trabajé: "trabajaste",
  estudié: "estudiaste",
  aprendí: "aprendiste",
};
const ES_OWN_RE = new RegExp(
  `(?<!\\p{L})(${Object.keys(ES_OWN_VERBS).join("|")})(\\s+yo)?(?!\\p{L})`,
  "giu",
);
const EN_OWN_RE = /\b(did I|have I|was I|am I|my role|my projects)\b/i;

const fixFollowVoice = (text, locale) => {
  if (locale === "en") return EN_OWN_RE.test(text) ? null : text;
  return text.replace(ES_OWN_RE, (_, verb) => {
    const fixed = ES_OWN_VERBS[verb.toLowerCase()];
    return verb[0] === verb[0].toUpperCase()
      ? fixed[0].toUpperCase() + fixed.slice(1)
      : fixed;
  });
};

const toCard = (id, doc) => ({
  id,
  type: doc.type,
  title: doc.title,
  url: doc.url,
  ...(doc.cover ? { cover: doc.cover } : {}),
  // How the UI should open it: site page, external profile or file download.
  kind: doc.kind || "internal",
});

/**
 * Turns the model meta into the final `{ sources, follow, noInfo }`.
 * Only ids present among the retrieved/virtual docs are kept. When the meta
 * is missing or malformed, the top retrieved docs are used instead.
 */
export function resolveMeta(meta, { docs, docIds, techFacts = [] }, locale) {
  const allowed = new Set([
    ...docIds,
    ...techFacts.flatMap((f) => f.projects),
    ...CONTACT_DOC_IDS,
  ]);
  const valid = meta && typeof meta === "object" && Array.isArray(meta.sources);

  let ids;
  if (valid) {
    ids = meta.sources.filter(
      (id) => typeof id === "string" && allowed.has(id) && docs[id],
    );
    if (meta.noInfo === true && !ids.length) ids = ["contact:linkedin"];
    ids = withContactChannels(ids);
  } else {
    ids = docIds.filter((id) => docs[id]).slice(0, RETRIEVAL.fallbackSources);
  }
  const sources = [...new Set(ids)]
    .slice(0, RETRIEVAL.maxSources)
    .map((id) => toCard(id, docs[id]));

  const follow =
    valid && Array.isArray(meta.follow)
      ? meta.follow
          .filter((f) => typeof f === "string" && f.trim())
          .map((f) => fixFollowVoice(f.trim(), locale)?.slice(0, 140))
          .filter(Boolean)
          .slice(0, 2)
      : [];

  return { sources, follow, noInfo: valid ? meta.noInfo === true : false };
}
