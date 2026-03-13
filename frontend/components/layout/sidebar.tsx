"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Package,
  Settings2,
  Users,
  BarChart3,
} from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const studentNav: NavItem[] = [
  { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
  { label: "Inventory Request", href: "/student/inventory-request", icon: ClipboardList },
  { label: "My Equipment", href: "/student/my-equipment", icon: Package },
  { label: "Internships", href: "/student/internships", icon: Briefcase },
  { label: "Projects", href: "/student/projects", icon: BookOpen },
  { label: "Profile", href: "/student/profile", icon: Settings2 },
];

const facultyNav: NavItem[] = [
  { label: "Dashboard", href: "/faculty/dashboard", icon: LayoutDashboard },
  { label: "Equipment Approvals", href: "/faculty/equipment-approvals", icon: ClipboardList },
  { label: "Internship Approvals", href: "/faculty/internship-approvals", icon: Briefcase },
  { label: "Project Approvals", href: "/faculty/project-approvals", icon: BookOpen },
  { label: "Students", href: "/faculty/students", icon: GraduationCap },
];

const masterNav: NavItem[] = [
  { label: "Dashboard", href: "/master/dashboard", icon: LayoutDashboard },
  { label: "Final Approvals", href: "/master/final-approvals", icon: CheckCircle2 },
  { label: "Inventory Management", href: "/master/inventory", icon: Package },
  { label: "Equipment Allocation", href: "/master/equipment-allocation", icon: ClipboardList },
  { label: "Internships", href: "/master/internships", icon: Briefcase },
  { label: "Projects", href: "/master/projects", icon: BookOpen },
  { label: "Users", href: "/master/users", icon: Users },
  { label: "Analytics", href: "/master/analytics", icon: BarChart3 },
];

function getNav(role: string | undefined | null) {
  switch (role) {
    case "STUDENT":
      return studentNav;
    case "FACULTY":
      return facultyNav;
    case "MASTER":
      return masterNav;
    default:
      return [];
  }
}

export function AppSidebar() {
  const { user, clearAuth } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const items = getNav(user?.role);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r border-zinc-200 bg-white/80 px-4 py-4 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-950/60">
      <div className="mb-6 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 text-zinc-50 dark:from-zinc-50 dark:to-zinc-300 dark:text-zinc-900">
          <Package className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight">Campus ERP</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {user?.role ?? "Guest"}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/80 dark:hover:text-zinc-50",
                active &&
                  "bg-zinc-900 text-zinc-50 shadow-sm hover:bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-500 dark:group-hover:text-zinc-50",
                  active &&
                    "text-zinc-50 dark:text-zinc-900",
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <div className="min-w-0">
          <p className="truncate font-medium text-zinc-700 dark:text-zinc-200">
            {user?.name ?? "Not signed in"}
          </p>
          <p className="truncate text-[11px]">{user?.email ?? "—"}</p>
        </div>
        {user && (
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={handleLogout}
            aria-label="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </aside>
  );
}

