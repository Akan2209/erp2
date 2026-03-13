"use client";

import * as React from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

let queryClient: QueryClient | null = null;

function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient();
  }
  return queryClient;
}

export function AppQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = React.useState(getQueryClient)[0];
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

