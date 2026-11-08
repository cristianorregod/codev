import "server-only";
import { createClient } from "@libsql/client/web";

const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS ask_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT,
  locale TEXT,
  page TEXT,
  question TEXT,
  answer TEXT,
  sources TEXT,
  no_info INTEGER,
  model TEXT,
  latency_ms INTEGER,
  status TEXT
)`;

let client;
let ready;

const getClient = () => {
  if (client !== undefined) return client;
  const url = process.env.TURSO_DATABASE_URL;
  client = url
    ? createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN })
    : null;
  return client;
};

const ensureTable = (db) => {
  if (!ready) {
    ready = db.execute(CREATE_TABLE).catch((error) => {
      ready = undefined;
      throw error;
    });
  }
  return ready;
};

/**
 * Persists one Q&A record. Never stores IP or user agent and never throws:
 * logging must not affect the response.
 */
export async function logAsk(record) {
  try {
    const db = getClient();
    if (!db) return;
    await ensureTable(db);
    await db.execute({
      sql: `INSERT INTO ask_logs (created_at, locale, page, question, answer, sources, no_info, model, latency_ms, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        new Date().toISOString(),
        record.locale,
        record.page ?? null,
        record.question,
        record.answer ?? "",
        JSON.stringify(record.sources ?? []),
        record.noInfo ? 1 : 0,
        record.model,
        Math.round(record.latencyMs ?? 0),
        record.status,
      ],
    });
  } catch (error) {
    console.error("[ask] failed to log request:", error?.message);
  }
}
