import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useAuthStore } from "@/lib/auth-store";

function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuthStore();
  if (!user) {
    redirect("/login");
  }
  return <>{children}</>;
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900 text-zinc-50">
      <div className="m-3 flex w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
        <AppSidebar />
        <div className="flex flex-1 flex-col rounded-l-2xl bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900">
          <Topbar />
          <main className="flex-1 overflow-y-auto px-6 py-5">
            <RequireAuth>{children}</RequireAuth>
          </main>
        </div>
      </div>
    </div>
  );
}

