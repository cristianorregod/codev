import "server-only";
import { topK } from "@/lib/knowledge/vectors";
import { CONTACT_DOC_IDS, RETRIEVAL } from "./config";
import { getKnowledge } from "./knowledge";
import { embed } from "./openai";

const CONTACT_RE =
  /\b(contact\w*|linkedin|cv|curr[ií]cul\w*|resume|r[eé]sum[eé]|hire|hiring|contrat\w*|email|e-mail|correo|mail|tel[eé]fono|phone|whatsapp|disponib\w*|available|availability|reach|escrib\w*|hablar|talk|entrevista|interview|freelance|salari\w*|salary|tarifa\w*|rates?|cobr\w*|precio\w*|prices?|pricing)\b/i;

/** Lowercases and strips accents so matching is case/accent-insensitive. */
const fold = (value) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const escapeRe = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const wordCount = (value) => value.trim().split(/\s+/).filter(Boolean).length;

const lastUserQuestion = (history) =>
  [...history].reverse().find((item) => item.role === "user")?.content;

/**
 * Finds tech-index keys mentioned in `text` (word-boundary, case/accent
 * insensitive). Longer keys are matched first and mask their span, so
 * "Node.js" yields "node.js" and not also "node".
 */
export const detectTech = (text, techKeys) => {
  let haystack = fold(text);
  const found = [];
  for (const key of techKeys) {
    const re = new RegExp(
      `(?<![a-z0-9])${escapeRe(fold(key))}(?![a-z0-9])`,
      "g",
    );
    if (re.test(haystack)) {
      found.push(key);
      haystack = haystack.replace(re, (m) => " ".repeat(m.length));
    }
  }
  return found;
};

/** Original-cased tech label from any project stack, e.g. "fastapi" -> "FastAPI". */
const techLabel = (key, docs) => {
  for (const doc of Object.values(docs)) {
    const hit = doc.stack?.find((tech) => tech.trim().toLowerCase() === key);
    if (hit) return hit.trim();
  }
  return key;
};

const formatChunk = (chunk, docs) => {
  const doc = docs[chunk.docId] || {};
  return `<doc id="${chunk.docId}" type="${doc.type}" title="${doc.title}">\n${chunk.text}\n</doc>`;
};

const emailAddress = (docs) =>
  String(docs["contact:email"]?.url || "").replace(/^mailto:/, "");

const contactBlock = (locale, docs) => {
  const email = emailAddress(docs);
  const lines =
    locale === "es"
      ? [
          `- LinkedIn (id "contact:linkedin"): respondo rápido, en cuestión de minutos.`,
          `- WhatsApp (id "contact:whatsapp"): respondo rápido, en cuestión de minutos. Prefiero mensajes antes que llamadas porque trabajo presencial.`,
          `- Correo (id "contact:email"): ${email} — lo reviso durante el día.`,
          `- CV en PDF (id "contact:cv"): descargable desde el sitio.`,
        ]
      : [
          `- LinkedIn (id "contact:linkedin"): I reply quickly, within minutes.`,
          `- WhatsApp (id "contact:whatsapp"): I reply quickly, within minutes. I prefer messages over calls because I work on-site.`,
          `- E-mail (id "contact:email"): ${email} — I check it during the day.`,
          `- Resume PDF (id "contact:cv"): downloadable from the site.`,
        ];
  const title = locale === "es" ? "Contacto" : "Contact";
  return `<doc id="contact" type="contact" title="${title}">\n${lines.join("\n")}\n</doc>`;
};

/**
 * Retrieves the context for a question.
 * Returns `{ context, docIds, techFacts }` where `docIds` lists the retrieved
 * doc ids in relevance order (used as the fallback for sources).
 */
export async function retrieve({ question, history = [], locale, signal }) {
  const knowledge = getKnowledge(locale);
  const { docs, chunks, chunksByDoc, tech, techKeys } = knowledge;

  const previous = lastUserQuestion(history);
  const isFollowUp =
    Boolean(previous) && wordCount(question) <= RETRIEVAL.followUpMaxWords;
  const queryText = isFollowUp ? `${previous}\n${question}` : question;

  const queryVec = await embed(queryText, { signal });
  const semantic = topK(queryVec, chunks, RETRIEVAL.semanticK).map(
    (r) => r.chunk,
  );

  // Tech detection on the question (and the previous one for follow-ups).
  const techText = isFollowUp ? `${previous}\n${question}` : question;
  const techHits = detectTech(techText, techKeys);
  const techFacts = techHits.map((key) => ({
    tech: techLabel(key, docs),
    projects: tech[key],
  }));

  const techProjects = [...new Set(techFacts.flatMap((f) => f.projects))].slice(
    0,
    RETRIEVAL.maxTechProjects,
  );
  // Summary + role chunks of every project that uses a mentioned technology.
  const techChunks = techProjects.flatMap((docId) =>
    (chunksByDoc.get(docId) || []).slice(0, 2),
  );

  const selected = [];
  const seen = new Set();
  let budget = RETRIEVAL.maxContextChars;

  const factLine = techFacts.length
    ? `<facts>\n${techFacts
        .map(
          (f) =>
            `${locale === "es" ? "Tecnología → proyectos" : "Technology → projects"}: ${f.tech}: ${f.projects
              .map((id) => `${docs[id]?.title} (id "${id}")`)
              .join(", ")}`,
        )
        .join("\n")}\n</facts>`
    : "";
  budget -= factLine.length;

  // Tech project summaries go first (most precise evidence), then semantic
  // hits, then the remaining tech chunks (roles) while the budget allows.
  const summaries = techProjects
    .map((docId) => chunksByDoc.get(docId)?.[0])
    .filter(Boolean);
  const queue = [...summaries, ...semantic, ...techChunks];

  for (const chunk of queue) {
    if (seen.has(chunk.id)) continue;
    const block = formatChunk(chunk, docs);
    if (block.length > budget) continue;
    seen.add(chunk.id);
    selected.push({ chunk, block });
    budget -= block.length;
  }

  const docIds = [...new Set(selected.map((s) => s.chunk.docId))];
  const isContact = CONTACT_RE.test(fold(question));

  const context = [
    factLine,
    ...selected.map((s) => s.block),
    contactBlock(locale, docs),
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    context,
    docs,
    docIds: isContact ? [...CONTACT_DOC_IDS, ...docIds] : docIds,
    techFacts,
    isFollowUp,
  };
}
