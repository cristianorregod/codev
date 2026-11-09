// Session persistence for the Ask AI conversation. Kept tiny because the
// floating pill imports it to show the question count before the panel loads.
export const STORAGE_KEY = "codev:ask:v1";

export function loadMessages() {
  try {
    const data = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY));
    return Array.isArray(data?.messages) ? data.messages : [];
  } catch {
    return [];
  }
}

export function saveMessages(messages) {
  try {
    if (messages.length) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages }));
    } else {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Storage unavailable (private mode, quota): the chat still works.
  }
}

export const countQuestions = (messages) =>
  messages.filter((m) => m.role === "user").length;
