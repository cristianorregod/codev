/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // Design tokens. Values live as CSS variables in src/app/globals.css
      // (dark is the default, `.light` on <html> switches to the light set).
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--border)",
        fg: "var(--text)",
        muted: "var(--muted)",
        prose: "var(--prose)",
        nav: "var(--nav-bg)",
        p: {
          DEFAULT: "var(--p)",
          fill: "var(--p-fill)",
          on: "var(--p-on)",
          soft: "var(--p-soft)",
          line: "var(--p-line)",
        },
        s: {
          DEFAULT: "var(--s)",
          fill: "var(--s-fill)",
          on: "var(--s-on)",
          soft: "var(--s-soft)",
        },
      },
      fontFamily: {
        sans: ["var(--font-onest)", "Onest", "system-ui", "sans-serif"],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "ui-monospace",
          "monospace",
        ],
      },
      maxWidth: {
        site: "1120px",
      },
    },
  },
  plugins: [],
};
