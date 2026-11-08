// Dependency-free vector helpers shared by the knowledge build script and the
// (future) API route. Vectors are stored as base64-encoded little-endian
// Float32Array buffers, L2-normalized so that the dot product equals cosine
// similarity.

const toBinaryString = (bytes) => {
  let out = "";
  const step = 0x8000;
  for (let i = 0; i < bytes.length; i += step) {
    out += String.fromCharCode.apply(null, bytes.subarray(i, i + step));
  }
  return out;
};

/** Float32Array (or number[]) -> base64 string. */
export const encodeVector = (vector) => {
  const f32 =
    vector instanceof Float32Array ? vector : Float32Array.from(vector);
  const bytes = new Uint8Array(f32.buffer, f32.byteOffset, f32.byteLength);
  return btoa(toBinaryString(bytes));
};

/** base64 string -> Float32Array. */
export const decodeVector = (base64) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Float32Array(bytes.buffer);
};

/** Returns a new L2-normalized Float32Array. */
export const normalize = (vector) => {
  const f32 = Float32Array.from(vector);
  let sum = 0;
  for (let i = 0; i < f32.length; i += 1) sum += f32[i] * f32[i];
  const norm = Math.sqrt(sum) || 1;
  for (let i = 0; i < f32.length; i += 1) f32[i] /= norm;
  return f32;
};

/** Dot product; equals cosine similarity for normalized vectors. */
export const dot = (a, b) => {
  const n = Math.min(a.length, b.length);
  let sum = 0;
  for (let i = 0; i < n; i += 1) sum += a[i] * b[i];
  return sum;
};

/**
 * Ranks chunks by similarity to `queryVec`.
 * `chunk.vector` may be a decoded Float32Array or a base64 string.
 * Returns `[{ chunk, score }]` sorted by descending score.
 */
export const topK = (queryVec, chunks, k = 5) =>
  chunks
    .map((chunk) => {
      const vector =
        typeof chunk.vector === "string"
          ? decodeVector(chunk.vector)
          : chunk.vector;
      return { chunk, score: dot(queryVec, vector) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(0, k));
