import "server-only";
import OpenAI from "openai";
import { EMBEDDING_DIMS, EMBEDDING_MODEL } from "./config";
import { normalize } from "@/lib/knowledge/vectors";

let client;

export const getOpenAI = () => {
  if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
};

/** Embeds `text` and returns an L2-normalized Float32Array. */
export const embed = async (text, { signal } = {}) => {
  const response = await getOpenAI().embeddings.create(
    { model: EMBEDDING_MODEL, dimensions: EMBEDDING_DIMS, input: text },
    { signal },
  );
  return normalize(response.data[0].embedding);
};
