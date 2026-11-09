import "server-only";
import es from "@/data/knowledge/es.json";
import en from "@/data/knowledge/en.json";
import { decodeVector } from "@/lib/knowledge/vectors";
import { PERSONAL_LINKS_DATA } from "@/data/personal-links";

const RAW = { es, en };
const CV_PATHS = {
  es: "/cristian-orrego-cv.pdf",
  en: "/cristian-orrego-cv-en.pdf",
};

// Public WhatsApp link (same number as the services page CTAs).
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=+573113988094";

const cache = new Map();

const socialUrl = (id) =>
  PERSONAL_LINKS_DATA.profile.social.find((s) => s.id === id)?.url;

/** Static, citable docs that do not live in the knowledge index. */
const virtualDocs = (locale) => ({
  "contact:linkedin": {
    type: "contact",
    title: "LinkedIn — Cristian Orrego",
    url: socialUrl("linkedin"),
    kind: "external",
  },
  "contact:whatsapp": {
    type: "contact",
    title: "WhatsApp — Cristian Orrego",
    url: WHATSAPP_URL,
    kind: "external",
  },
  "contact:email": {
    type: "contact",
    title:
      locale === "es" ? "Correo — Cristian Orrego" : "E-mail — Cristian Orrego",
    url: socialUrl("email"),
    kind: "external",
  },
  "contact:cv": {
    type: "contact",
    title:
      locale === "es"
        ? "CV — Cristian Orrego (PDF)"
        : "Resume — Cristian Orrego (PDF)",
    url: CV_PATHS[locale],
    kind: "download",
  },
});

/**
 * Returns the decoded knowledge base for `locale`. Decoding happens once per
 * server instance; the result is reused by every request.
 */
export const getKnowledge = (locale) => {
  if (cache.has(locale)) return cache.get(locale);
  const raw = RAW[locale];
  const chunks = raw.chunks.map((chunk) => ({
    ...chunk,
    vector: decodeVector(chunk.vector),
  }));
  const chunksByDoc = new Map();
  for (const chunk of chunks) {
    if (!chunksByDoc.has(chunk.docId)) chunksByDoc.set(chunk.docId, []);
    chunksByDoc.get(chunk.docId).push(chunk);
  }
  const docs = { ...raw.docs, ...virtualDocs(locale) };
  // Longest keys first so "node.js" wins over "node" when both match.
  const techKeys = Object.keys(raw.tech).sort((a, b) => b.length - a.length);
  const knowledge = {
    locale,
    docs,
    chunks,
    chunksByDoc,
    tech: raw.tech,
    techKeys,
  };
  cache.set(locale, knowledge);
  return knowledge;
};
