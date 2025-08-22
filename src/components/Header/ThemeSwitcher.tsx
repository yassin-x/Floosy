"use client";
import React from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Themes } from "@/constants/enums";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      onClick={() =>
        setTheme(theme === Themes.DARK ? Themes.LIGHT : Themes.DARK)
      }
      aria-label="Toggle Theme"
      className="p-4 rounded-full"
      suppressHydrationWarning
      variant={"ghost"}
    >
      {theme === Themes.DARK ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
