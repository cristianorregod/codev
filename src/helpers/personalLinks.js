export async function copyTextWithFallback(text) {
  if (!text) return false;

  try {
    if (navigator?.clipboard?.writeText && window?.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    // Continue to fallback
  }

  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, textArea.value.length);

    const copied = document.execCommand("copy");
    document.body.removeChild(textArea);

    return copied;
  } catch (error) {
    return false;
  }
}
