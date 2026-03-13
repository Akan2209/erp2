import * as React from "react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-9 w-full rounded-md border border-zinc-200 bg-white/80 px-3 py-1 text-sm shadow-sm outline-none ring-offset-background focus-visible:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-900/10 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-50 dark:focus-visible:ring-zinc-50/20",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  },
);
Select.displayName = "Select";

