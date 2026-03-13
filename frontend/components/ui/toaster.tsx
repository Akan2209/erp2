"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      richColors
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "rounded-xl border border-zinc-200 bg-white/90 text-sm shadow-lg backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90",
        },
      }}
    />
  );
}

