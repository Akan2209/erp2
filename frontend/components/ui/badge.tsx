import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-zinc-200 bg-zinc-100 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50",
        pending:
          "border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-200",
        approved:
          "border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-950/40 dark:text-emerald-200",
        rejected:
          "border-red-200 bg-red-100 text-red-800 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-200",
        allocated:
          "border-sky-200 bg-sky-100 text-sky-800 dark:border-sky-500/40 dark:bg-sky-950/40 dark:text-sky-200",
        outline:
          "border-zinc-200 bg-transparent text-zinc-900 dark:border-zinc-800 dark:text-zinc-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { badgeVariants };

