import * as React from "react";
import { cn } from "@/lib/utils";

export function Table({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-zinc-200 bg-white/80 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <table
        className={cn(
          "w-full min-w-[600px] border-collapse text-sm",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function TableHeader(
  props: React.HTMLAttributes<HTMLTableSectionElement>,
) {
  return (
    <thead
      className="bg-zinc-50/80 text-xs font-medium text-zinc-500 dark:bg-zinc-900/80 dark:text-zinc-400"
      {...props}
    />
  );
}

export function TableBody(
  props: React.HTMLAttributes<HTMLTableSectionElement>,
) {
  return <tbody {...props} />;
}

export function TableRow(
  props: React.HTMLAttributes<HTMLTableRowElement>,
) {
  return (
    <tr
      className="border-t border-zinc-100 hover:bg-zinc-50/80 dark:border-zinc-800 dark:hover:bg-zinc-900/60"
      {...props}
    />
  );
}

export function TableHead(
  props: React.ThHTMLAttributes<HTMLTableCellElement>,
) {
  return (
    <th
      className="px-4 py-3 text-left font-medium first:pl-5 last:pr-5"
      {...props}
    />
  );
}

export function TableCell(
  props: React.TdHTMLAttributes<HTMLTableCellElement>,
) {
  return (
    <td
      className="px-4 py-3 align-middle text-sm text-zinc-700 first:pl-5 last:pr-5 dark:text-zinc-200"
      {...props}
    />
  );
}

