import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface StatCardProps {
  label: string;
  value: number | string;
  trend?: string;
  icon?: ReactNode;
  loading?: boolean;
}

export function StatCard({
  label,
  value,
  trend,
  icon,
  loading,
}: StatCardProps) {
  return (
    <Card className="h-full border-zinc-200/80 bg-zinc-50/80 dark:border-zinc-800/80 dark:bg-zinc-950/60">
      <CardHeader className="flex items-center justify-between space-y-0">
        <CardTitle className="text-xs font-medium text-zinc-500">
          {label}
        </CardTitle>
        {icon && (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/90 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="mt-2 space-y-1">
        {loading ? (
          <Skeleton className="h-6 w-16" />
        ) : (
          <p className="text-xl font-semibold tracking-tight">{value}</p>
        )}
        {trend && (
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardCardsGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

