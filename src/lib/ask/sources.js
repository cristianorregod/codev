import "server-only";
import { RETRIEVAL } from "./config";

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
    "contact:linkedin",
    "contact:cv",
  ]);
  const valid = meta && typeof meta === "object" && Array.isArray(meta.sources);

  let ids;
  if (valid) {
    ids = meta.sources.filter(
      (id) => typeof id === "string" && allowed.has(id) && docs[id],
    );
    if (meta.noInfo === true && !ids.length) ids = ["contact:linkedin"];
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
