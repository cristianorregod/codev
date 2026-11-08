import "server-only";

export const LOCALES = ["es", "en"];
export const DEFAULT_LOCALE = "es";

export const EMBEDDING_MODEL = "text-embedding-3-small";
export const EMBEDDING_DIMS = 512;

// gpt-5.4-mini is the newest small GPT model on the account; it is a
// reasoning model, so it runs with the lowest effort it supports ("none").
export const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || "gpt-5.4-mini";
export const REASONING_EFFORT =
  process.env.OPENAI_REASONING_EFFORT ||
  (/^(gpt-5|o\d)/.test(CHAT_MODEL) ? "none" : null);
export const MAX_OUTPUT_TOKENS = 700;

export const LIMITS = {
  questionMax: 300,
  historyMax: 6,
  historyContentMax: 1500,
  pageMax: 200,
};

export const RETRIEVAL = {
  semanticK: 8,
  maxTechProjects: 6,
  maxContextChars: 6500,
  followUpMaxWords: 8,
  maxSources: 4,
  fallbackSources: 3,
};

export const MESSAGES = {
  es: {
    rateLimited:
      "Has hecho muchas preguntas seguidas. Espera un momento y vuelve a intentarlo.",
    error:
      "No pude generar una respuesta en este momento. Inténtalo de nuevo en unos segundos.",
    invalid: "La pregunta no es válida.",
    forbidden: "Origen no permitido.",
  },
  en: {
    rateLimited:
      "You've asked a lot of questions in a row. Please wait a moment and try again.",
    error:
      "I couldn't generate an answer right now. Please try again in a few seconds.",
    invalid: "The question is not valid.",
    forbidden: "Origin not allowed.",
  },
};

export const messagesFor = (locale) =>
  MESSAGES[locale] || MESSAGES[DEFAULT_LOCALE];
