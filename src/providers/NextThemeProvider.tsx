"use client";

import { Themes } from "@/constants/enums";
import { ThemeProvider } from "next-themes";

export default function NextThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={Themes.DARK}
      themes={[Themes.LIGHT, Themes.DARK]}
    >
      {children}
    </ThemeProvider>
  );
}
