"use client";

import { useTheme } from "next-themes";
import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-200 bg-white/80 px-5 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-950/60">
      <div className="flex flex-1 items-center gap-2 text-xs text-zinc-500">
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          Alpha
        </span>
        <span>Modern ERP workspace</span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <SunMedium className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonStar className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </header>
  );
}

