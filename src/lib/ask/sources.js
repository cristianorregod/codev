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
export function resolveMeta(meta, { docs, docIds, techFacts = [] }) {
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
          .map((f) => f.trim().slice(0, 140))
          .slice(0, 2)
      : [];

  return { sources, follow, noInfo: valid ? meta.noInfo === true : false };
}
