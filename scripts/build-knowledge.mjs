#!/usr/bin/env node
// Builds the per-locale knowledge index used by the "Ask AI" assistant.
//
// Usage:
//   npm run knowledge                 build + embed + write src/data/knowledge/{locale}.json
//   npm run knowledge -- --dry        build chunks and print stats (no OpenAI calls, no writes)
//   npm run knowledge -- --query "text" [--locale es] [--k 5]
//
// Vectors are cached by sha256(model + dims + chunk text): unchanged chunks
// reuse the vector already stored in the existing output file.

import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import OpenAI from "openai";
import { STACK_GROUPS } from "../src/data/stack.js";
import { stripEmoji } from "../src/lib/format.js";
import {
  decodeVector,
  encodeVector,
  normalize,
  topK,
} from "../src/lib/knowledge/vectors.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOCALES = ["es", "en"];
const MODEL = "text-embedding-3-small";
const DIMS = 512;
const VERSION = 1;
const MAX_CHARS = 1200;
const BATCH_SIZE = 256;

const PROJECTS_DIR = path.join(
  ROOT,
  process.env.PROJECTS_PATH || "src/projects",
);
const POSTS_DIR = path.join(ROOT, process.env.ARTICLES_PATH || "src/posts");
const KNOWLEDGE_DIR = path.join(ROOT, "content/knowledge");
const MESSAGES_DIR = path.join(ROOT, "messages");
const OUTPUT_DIR = path.join(ROOT, "src/data/knowledge");

const TYPE_LABELS = {
  es: {
    project: "Proyecto",
    post: "Artículo",
    experience: "Experiencia",
    about: "Perfil",
    stack: "Tecnologías",
    services: "Servicios",
    knowledge: "Conocimiento",
  },
  en: {
    project: "Project",
    post: "Article",
    experience: "Experience",
    about: "Profile",
    stack: "Tech stack",
    services: "Services",
    knowledge: "Knowledge",
  },
};

const SUMMARY_HEADING = { es: "Resumen", en: "Summary" };

const FACT_LABELS = {
  es: {
    role: "Rol",
    team: "Equipo",
    duration: "Duración",
    people: (n) => `${n} ${n === 1 ? "persona" : "personas"}`,
  },
  en: {
    role: "Role",
    team: "Team",
    duration: "Duration",
    people: (n) => `${n} ${n === 1 ? "person" : "people"}`,
  },
};

/** "Rol: … · Equipo: N personas · Duración: …" from project frontmatter. */
const projectFactsLine = (locale, data) => {
  const labels = FACT_LABELS[locale] || FACT_LABELS.en;
  const team = Number(data.team);
  const parts = [
    data.role ? `${labels.role}: ${cleanInline(data.role)}` : null,
    Number.isInteger(team) && team > 0
      ? `${labels.team}: ${labels.people(team)}`
      : null,
    data.duration ? `${labels.duration}: ${cleanInline(data.duration)}` : null,
  ].filter(Boolean);
  return parts.join(" · ");
};

const STACK_INTRO = {
  es: "Tecnologías y herramientas de mi stack, con las que he trabajado. El grupo «Aprendiendo» reúne las que estoy aprendiendo. Los años y el nivel por tecnología están en el documento de años de experiencia.",
  en: "Technologies and tools in my stack that I have worked with. The “Learning” group lists the ones I'm currently learning. Years and level per technology are in the years-of-experience doc.",
};

// Synonym groups for the tech index (lowercase). When any member appears in a
// project stack, every member of the group points to the same projects.
const TECH_ALIASES = [
  ["node", "node.js", "nodejs"],
  ["ts", "typescript"],
  ["js", "javascript"],
  ["postgres", "postgresql", "pg"],
  ["next", "next.js", "nextjs"],
  ["react", "react.js", "reactjs"],
  ["py", "python"],
  ["sfdc", "salesforce"],
  ["entra", "entra id", "microsoft entra id", "azure ad"],
  ["openai", "openai api", "gpt"],
  ["mcp", "model context protocol"],
  ["k8s", "kubernetes"],
];

// ServicesPage keys that hold UI chrome (buttons, ids, links), not knowledge.
const SERVICES_SKIP_KEYS = new Set([
  "meta",
  "id",
  "url",
  "href",
  "cta",
  "ctaHint",
  "primaryCta",
  "secondaryCta",
  "tertiaryCta",
  "linkLabel",
  "label",
  "labels",
  "eyebrow",
]);

// Maps service item fields to their localized label key in services.labels.
const SERVICE_FIELD_LABELS = {
  forWho: "idealFor",
  strategicResult: "strategicResult",
  problem: "problem",
  solution: "solution",
  deliverables: "deliverables",
  benefits: "benefits",
  aiOptions: "aiUseCases",
};

// ---------------------------------------------------------------------------
// Text cleaning
// ---------------------------------------------------------------------------

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PHONE_RE = /\+?\d[\d\s().-]{7,}\d/g;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Privacy guard: redacts e-mail addresses and phone-number-like sequences. */
export const redactPii = (text) =>
  text.replace(EMAIL_RE, "[redacted]").replace(PHONE_RE, (match) => {
    const digits = match.replace(/\D/g, "").length;
    if (digits < 9 || digits > 15 || ISO_DATE_RE.test(match.trim())) {
      return match;
    }
    return "[redacted]";
  });

const removeCodeBlocks = (md) =>
  md.replace(/^[ \t]*(```|~~~)[^\n]*\n[\s\S]*?^[ \t]*\1[ \t]*$/gm, "");

/** Strips MDX/markdown syntax noise and keeps readable prose. */
export const cleanMarkdown = (md) => {
  let text = String(md ?? "").replace(/\r\n?/g, "\n");
  text = removeCodeBlocks(text);
  // Protect inline code (e.g. `<div>`) from the HTML/emphasis stripping below.
  const inlineCode = [];
  text = text.replace(/`([^`\n]+)`/g, (_, code) => {
    inlineCode.push(code);
    return `\u0000${inlineCode.length - 1}\u0000`;
  });
  text = text
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/^\s*(import|export)\s[^\n]*$/gm, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<\/?[A-Za-z][^>]*>/g, "")
    .replace(/(\*\*|__)(.+?)\1/g, "$2")
    .replace(/(^|[\s(])[*_]([^*_\n]+)[*_](?=[\s).,;:!?]|$)/g, "$1$2")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/gm, "")
    .replace(/^\s*\|(.*)\|\s*$/gm, (_, row) =>
      row
        .split("|")
        .map((cell) => cell.trim())
        .join(" · "),
    )
    .replace(/^\s*[-*+]\s+/gm, "- ")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n");
  text = text.replace(/\u0000(\d+)\u0000/g, (_, i) => inlineCode[Number(i)]);
  return redactPii(text).trim();
};

const cleanInline = (value) =>
  redactPii(
    stripEmoji(String(value ?? ""))
      .replace(/\s+/g, " ")
      .trim(),
  );

const slugify = (value) =>
  String(value)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// ---------------------------------------------------------------------------
// Chunking
// ---------------------------------------------------------------------------

/** Splits a markdown body on `## ` headings -> [{ heading, body }]. */
const splitSections = (md) => {
  const sections = [];
  let current = { heading: null, lines: [] };
  for (const line of removeCodeBlocks(md).split("\n")) {
    const match = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (match) {
      sections.push(current);
      current = { heading: match[1], lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  sections.push(current);
  return sections
    .map((s) => ({
      heading: s.heading ? cleanInline(cleanMarkdown(s.heading)) : null,
      body: cleanMarkdown(s.lines.join("\n")),
    }))
    .filter((s) => s.body);
};

/** Hard-splits one oversized paragraph at sentence (then word) boundaries. */
const splitParagraph = (paragraph, max) => {
  if (paragraph.length <= max) return [paragraph];
  const sentences = paragraph.match(/[^.!?\n]+(?:[.!?]+|\n|$)\s*/g) || [
    paragraph,
  ];
  const parts = [];
  let buffer = "";
  for (const sentence of sentences) {
    if (sentence.length > max) {
      if (buffer) parts.push(buffer.trim());
      buffer = "";
      let rest = sentence;
      while (rest.length > max) {
        const cut =
          rest.lastIndexOf(" ", max) > 0 ? rest.lastIndexOf(" ", max) : max;
        parts.push(rest.slice(0, cut).trim());
        rest = rest.slice(cut);
      }
      buffer = rest;
    } else if ((buffer + sentence).length > max) {
      parts.push(buffer.trim());
      buffer = sentence;
    } else {
      buffer += sentence;
    }
  }
  if (buffer.trim()) parts.push(buffer.trim());
  return parts.filter(Boolean);
};

/** Packs paragraphs into pieces no longer than `max` characters. */
const packParagraphs = (text, max) => {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .flatMap((p) => splitParagraph(p, max));
  const pieces = [];
  let buffer = "";
  for (const paragraph of paragraphs) {
    const candidate = buffer ? `${buffer}\n\n${paragraph}` : paragraph;
    if (candidate.length > max && buffer) {
      pieces.push(buffer);
      buffer = paragraph;
    } else {
      buffer = candidate;
    }
  }
  if (buffer) pieces.push(buffer);
  return pieces;
};

/**
 * Turns a doc + its sections into chunks. Each chunk text is prefixed with
 * "{TypeLabel}: {title} — {heading}" so it is self-describing for retrieval.
 */
const chunkDoc = (locale, doc, sections) => {
  const typeLabel =
    TYPE_LABELS[locale][doc.type] || TYPE_LABELS[locale].knowledge;
  const chunks = [];
  for (const { heading, body } of sections) {
    const prefix = `${typeLabel}: ${doc.title}${heading ? ` — ${heading}` : ""}`;
    const budget = Math.max(300, MAX_CHARS - prefix.length - 2);
    for (const piece of packParagraphs(body, budget)) {
      const text = `${prefix}\n\n${piece}`;
      chunks.push({
        id: `${doc.id}#${chunks.length}`,
        docId: doc.id,
        heading: heading || null,
        text,
        hash: hashText(text),
      });
    }
  }
  return chunks;
};

const hashText = (text) =>
  createHash("sha256").update(`${MODEL}\n${DIMS}\n${text}`).digest("hex");

// ---------------------------------------------------------------------------
// Sources
// ---------------------------------------------------------------------------

const listFiles = async (dir, extensions) => {
  if (!existsSync(dir)) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && extensions.some((ext) => e.name.endsWith(ext)))
    .map((e) => e.name)
    .sort();
};

const readMatter = async (file) => matter(await readFile(file, "utf8"));

const toList = (value) =>
  Array.isArray(value)
    ? value.map(String)
    : value
      ? String(value)
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
      : [];

async function loadProjects(locale) {
  const dir = path.join(PROJECTS_DIR, locale);
  const out = [];
  for (const name of await listFiles(dir, [".mdx", ".md"])) {
    const slug = name.replace(/\.mdx?$/, "");
    const { data, content } = await readMatter(path.join(dir, name));
    const doc = {
      id: `project:${slug}`,
      type: "project",
      title: cleanInline(data.title || slug),
      url: `/${locale}/projects/${slug}`,
      cover: data.cover || null,
      excerpt: cleanInline(data.excerpt || ""),
      category: data.category || null,
      stack: toList(data.stack),
      date: data.date ? String(data.date) : null,
    };
    const facts = projectFactsLine(locale, data);
    const summary = [doc.excerpt, facts].filter(Boolean).join("\n\n");
    const sections = [];
    if (summary) {
      sections.push({ heading: SUMMARY_HEADING[locale], body: summary });
    }
    sections.push(...splitSections(content));
    out.push({ doc, sections });
  }
  return out;
}

async function loadPosts(locale) {
  const dir = path.join(POSTS_DIR, locale);
  const out = [];
  for (const name of await listFiles(dir, [".mdx", ".md"])) {
    const slug = name.replace(/\.mdx?$/, "");
    const { data, content } = await readMatter(path.join(dir, name));
    const doc = {
      id: `post:${slug}`,
      type: "post",
      title: cleanInline(data.title || slug),
      url: `/${locale}/posts/${slug}`,
      cover: data.cover || null,
      description: cleanInline(data.description || ""),
      tags: toList(data.tags),
      date: data.date ? String(data.date) : null,
    };
    const sections = splitSections(removeCodeBlocks(content));
    if (doc.description) {
      sections.unshift({
        heading: SUMMARY_HEADING[locale],
        body: doc.description,
      });
    }
    out.push({ doc, sections });
  }
  return out;
}

async function loadKnowledge(locale) {
  const dir = path.join(KNOWLEDGE_DIR, locale);
  const out = [];
  for (const name of await listFiles(dir, [".md"])) {
    const slug = name.replace(/\.md$/, "");
    const { data, content } = await readMatter(path.join(dir, name));
    const doc = {
      id: `knowledge:${slug}`,
      type: data.type ? String(data.type) : "knowledge",
      title: cleanInline(data.title || slug),
      url: data.url ? String(data.url) : null,
    };
    out.push({ doc, sections: splitSections(content) });
  }
  return out;
}

function loadExperience(locale, messages) {
  const items = messages?.HomePage?.Experience?.items || [];
  const seen = new Map();
  return items.map((item) => {
    const base = slugify(`${item.company}-${item.role}`) || "item";
    const count = seen.get(base) || 0;
    seen.set(base, count + 1);
    const role = cleanInline(
      item.roleNote ? `${item.role} ${item.roleNote}` : item.role,
    );
    const doc = {
      id: `experience:${count ? `${base}-${count}` : base}`,
      type: "experience",
      title: `${cleanInline(item.role)} — ${cleanInline(item.company)}`,
      url: `/${locale}#experience`,
      company: cleanInline(item.company),
      role,
      date: cleanInline(item.date),
    };
    const body = [
      `${role} · ${doc.company} · ${doc.date}`,
      cleanInline(item.description),
    ].join("\n\n");
    return { doc, sections: [{ heading: null, body }] };
  });
}

function loadAbout(locale, messages) {
  const banner = messages?.HomePage?.Banner || {};
  const about = messages?.HomePage?.About || {};
  const name = cleanInline(about.caption?.split("·")[0] || banner.name || "");
  const doc = {
    id: "about:profile",
    type: "about",
    title: name || TYPE_LABELS[locale].about,
    url: `/${locale}#about`,
  };
  // The role is already the section heading, so it is not repeated in the body.
  const intro = [banner.lead, banner.body].map(cleanInline);
  const bio = [about.lead, about.p2, about.p3].map(cleanInline);
  const sections = [
    {
      heading: cleanInline(banner.role) || null,
      body: intro.filter(Boolean).join("\n\n"),
    },
    {
      heading: cleanInline(about.title) || null,
      body: bio.filter(Boolean).join("\n\n"),
    },
  ].filter((s) => s.body);
  return [{ doc, sections }];
}

function loadStack(locale, messages) {
  const labels = messages?.HomePage?.Stack || {};
  const doc = {
    id: "stack:technologies",
    type: "stack",
    title: cleanInline(labels.title) || TYPE_LABELS[locale].stack,
    url: `/${locale}#stack`,
  };
  const lines = STACK_GROUPS.map(
    (group) =>
      `${cleanInline(labels[group.key] || group.key)}: ${group.items
        .map((item) => item.name)
        .join(", ")}`,
  );
  // The site caption ("tools I build with daily…") is not used: it would make
  // the assistant claim daily use of every listed tool.
  const intro = STACK_INTRO[locale];
  const body = [intro, lines.join("\n")].filter(Boolean).join("\n\n");
  return [{ doc, sections: [{ heading: null, body }] }];
}

/** Flattens a nested ServicesPage value into readable text lines. */
const flattenServices = (value, fieldLabels = {}) => {
  if (value == null) return [];
  if (typeof value === "string" || typeof value === "number") {
    const text = cleanInline(value);
    return text ? [text] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item) =>
      typeof item === "object" && item !== null
        ? [flattenServices(item, fieldLabels).join("\n")]
        : flattenServices(item).map((line) => `- ${line}`),
    );
  }
  const lines = [];
  for (const [key, child] of Object.entries(value)) {
    if (SERVICES_SKIP_KEYS.has(key)) continue;
    const label = fieldLabels[SERVICE_FIELD_LABELS[key]];
    const childLines = flattenServices(child, fieldLabels);
    if (!childLines.length) continue;
    if (label && Array.isArray(child)) {
      lines.push(`${cleanInline(label)}:`, ...childLines);
    } else if (label) {
      lines.push(`${cleanInline(label)}: ${childLines.join(" ")}`);
    } else {
      lines.push(...childLines);
    }
  }
  return lines;
};

function loadServices(locale, messages) {
  const page = messages?.ServicesPage || {};
  const doc = {
    id: "services:services",
    type: "services",
    title: cleanInline(page.hero?.eyebrow) || TYPE_LABELS[locale].services,
    url: `/${locale}/services`,
  };
  const fieldLabels = page.services?.labels || {};
  const sections = [];
  for (const [key, section] of Object.entries(page)) {
    if (SERVICES_SKIP_KEYS.has(key) || typeof section !== "object") continue;
    const heading = cleanInline(section.title) || key;
    const { title: _title, ...rest } = section;
    // Arrays of objects become one paragraph per item so long sections split
    // between items rather than inside them.
    const blocks = [];
    for (const [childKey, child] of Object.entries(rest)) {
      if (SERVICES_SKIP_KEYS.has(childKey)) continue;
      if (Array.isArray(child) && child.some((c) => typeof c === "object")) {
        blocks.push(...flattenServices(child, fieldLabels));
      } else {
        const lines = flattenServices({ [childKey]: child }, fieldLabels);
        if (lines.length) blocks.push(lines.join("\n"));
      }
    }
    const body = redactPii(blocks.filter(Boolean).join("\n\n"));
    if (body) sections.push({ heading, body });
  }
  return [{ doc, sections }];
}

// ---------------------------------------------------------------------------
// Index assembly
// ---------------------------------------------------------------------------

function buildTechIndex(projectDocs) {
  const index = new Map();
  const add = (key, docId) => {
    if (!key) return;
    if (!index.has(key)) index.set(key, new Set());
    index.get(key).add(docId);
  };
  for (const doc of projectDocs) {
    for (const tech of doc.stack) {
      const key = tech.trim().toLowerCase();
      add(key, doc.id);
      // "foo.js" is also reachable as "foo" and "foojs".
      if (key.endsWith(".js")) {
        add(key.slice(0, -3), doc.id);
        add(key.replace(".js", "js"), doc.id);
      }
    }
  }
  for (const group of TECH_ALIASES) {
    const ids = group.flatMap((key) => [...(index.get(key) || [])]);
    for (const key of group) for (const docId of ids) add(key, docId);
  }
  return Object.fromEntries(
    [...index.keys()].sort().map((key) => [key, [...index.get(key)].sort()]),
  );
}

async function buildLocale(locale) {
  const messages = JSON.parse(
    await readFile(path.join(MESSAGES_DIR, `${locale}.json`), "utf8"),
  );
  const entries = [
    ...loadAbout(locale, messages),
    ...loadExperience(locale, messages),
    ...(await loadProjects(locale)),
    ...(await loadPosts(locale)),
    ...loadStack(locale, messages),
    ...loadServices(locale, messages),
    ...(await loadKnowledge(locale)),
  ];
  const docs = {};
  const chunks = [];
  for (const { doc, sections } of entries) {
    const { id, ...meta } = doc;
    if (docs[id]) throw new Error(`Duplicate doc id "${id}" (${locale})`);
    docs[id] = meta;
    chunks.push(...chunkDoc(locale, doc, sections));
  }
  const tech = buildTechIndex(
    entries.filter((e) => e.doc.type === "project").map((e) => e.doc),
  );
  return { docs, chunks, tech };
}

// ---------------------------------------------------------------------------
// Embeddings
// ---------------------------------------------------------------------------

const outputPath = (locale) => path.join(OUTPUT_DIR, `${locale}.json`);

async function readExisting(locale) {
  const file = outputPath(locale);
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    console.warn(
      `  ! Could not parse ${path.relative(ROOT, file)}; rebuilding.`,
    );
    return null;
  }
}

let client;
const getClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set (expected in .env).");
  }
  client ??= new OpenAI();
  return client;
};

/** Embeds texts in batches; returns { vectors: Float32Array[], tokens }. */
async function embed(texts) {
  const vectors = [];
  let tokens = 0;
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    const response = await getClient().embeddings.create({
      model: MODEL,
      dimensions: DIMS,
      input: batch,
      encoding_format: "float",
    });
    const ordered = [...response.data].sort((a, b) => a.index - b.index);
    vectors.push(...ordered.map((d) => normalize(d.embedding)));
    tokens += response.usage?.total_tokens || 0;
  }
  return { vectors, tokens };
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

function printStats(locale, { docs, chunks, tech }) {
  const byType = {};
  for (const [id, doc] of Object.entries(docs)) {
    byType[doc.type] ??= { docs: 0, chunks: 0, chars: 0, max: 0 };
    byType[doc.type].docs += 1;
    for (const chunk of chunks) {
      if (chunk.docId !== id) continue;
      byType[doc.type].chunks += 1;
      byType[doc.type].chars += chunk.text.length;
      byType[doc.type].max = Math.max(byType[doc.type].max, chunk.text.length);
    }
  }
  console.log(
    `\n[${locale}] ${Object.keys(docs).length} docs, ${chunks.length} chunks, ${Object.keys(tech).length} tech keys`,
  );
  console.table(
    Object.fromEntries(
      Object.entries(byType).map(([type, s]) => [
        type,
        {
          docs: s.docs,
          chunks: s.chunks,
          avgChars: s.chunks ? Math.round(s.chars / s.chunks) : 0,
          maxChars: s.max,
        },
      ]),
    ),
  );
}

async function runBuild({ dry }) {
  let totalTokens = 0;
  for (const locale of LOCALES) {
    const index = await buildLocale(locale);
    printStats(locale, index);
    if (dry) continue;

    const existing = await readExisting(locale);
    const cache = new Map();
    if (existing?.model === MODEL && existing?.dims === DIMS) {
      for (const chunk of existing.chunks || []) {
        if (chunk.hash && chunk.vector) cache.set(chunk.hash, chunk.vector);
      }
    }

    const missing = [...new Set(index.chunks.map((c) => c.hash))].filter(
      (hash) => !cache.has(hash),
    );
    const textByHash = new Map(index.chunks.map((c) => [c.hash, c.text]));
    const reused = index.chunks.filter((c) => cache.has(c.hash)).length;
    let tokens = 0;
    if (missing.length) {
      const result = await embed(missing.map((hash) => textByHash.get(hash)));
      result.vectors.forEach((vector, i) =>
        cache.set(missing[i], encodeVector(vector)),
      );
      tokens = result.tokens;
    }
    totalTokens += tokens;

    const output = {
      version: VERSION,
      model: MODEL,
      dims: DIMS,
      docs: index.docs,
      chunks: index.chunks.map((c) => ({ ...c, vector: cache.get(c.hash) })),
      tech: index.tech,
    };
    await mkdir(OUTPUT_DIR, { recursive: true });
    const json = `${JSON.stringify(output, null, 2)}\n`;
    await writeFile(outputPath(locale), json);
    console.log(
      `  reused ${reused}, new ${missing.length}, tokens ${tokens}, wrote ${path.relative(ROOT, outputPath(locale))} (${(Buffer.byteLength(json) / 1024).toFixed(1)} KB)`,
    );
  }
  if (!dry) console.log(`\nTotal embedding tokens used: ${totalTokens}`);
}

async function runQuery({ query, locale, k }) {
  const existing = await readExisting(locale);
  if (!existing) {
    throw new Error(`No index for "${locale}". Run "npm run knowledge" first.`);
  }
  const { vectors, tokens } = await embed([query]);
  const chunks = existing.chunks.map((c) => ({
    ...c,
    vector: decodeVector(c.vector),
  }));
  console.log(`\n[${locale}] "${query}" (tokens ${tokens})`);
  for (const { chunk, score } of topK(vectors[0], chunks, k)) {
    const doc = existing.docs[chunk.docId] || {};
    console.log(
      `  ${score.toFixed(4)}  ${chunk.id.padEnd(60)} ${doc.title}${chunk.heading ? ` — ${chunk.heading}` : ""}`,
    );
  }
}

const parseArgs = (argv) => {
  const args = { dry: false, query: null, locale: "es", k: 5 };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dry") args.dry = true;
    else if (arg === "--query") args.query = argv[++i];
    else if (arg === "--locale") args.locale = argv[++i];
    else if (arg === "--k") args.k = Number(argv[++i]) || 5;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!LOCALES.includes(args.locale)) {
    throw new Error(
      `Unsupported locale "${args.locale}" (${LOCALES.join(", ")}).`,
    );
  }
  if (args.query !== null && !args.query?.trim()) {
    throw new Error("--query requires a non-empty text.");
  }
  return args;
};

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.query) await runQuery(args);
  else await runBuild(args);
} catch (error) {
  console.error(`\nbuild-knowledge failed: ${error.message}`);
  process.exitCode = 1;
}
