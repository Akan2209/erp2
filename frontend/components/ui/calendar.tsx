import * as React from "react";
import { cn } from "@/lib/utils";

// Minimal calendar using native input[type="date"] for simplicity.

export type CalendarProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Calendar({ className, ...props }: CalendarProps) {
  return (
    <input
      type="date"
      className={cn(
        "flex h-9 w-full rounded-md border border-zinc-200 bg-white/80 px-3 text-sm shadow-sm outline-none ring-offset-background focus-visible:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-900/10 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-50 dark:focus-visible:ring-zinc-50/20",
        className,
      )}
      {...props}
    />
  );
}


