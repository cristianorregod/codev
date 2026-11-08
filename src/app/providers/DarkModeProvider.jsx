"use client";

import { ThemeProvider } from "next-themes";

// Dark is the default for first-time visitors; the choice is persisted by
// next-themes (localStorage) and applied before paint to avoid a flash.
export function DarkModeProvider({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      themes={["dark", "light"]}
    >
      {children}
    </ThemeProvider>
  );
}
