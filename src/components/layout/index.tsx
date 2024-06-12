"use client";

import React from "react";
import { Navbar } from "./Navbar";
import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return "Loading...";
  }
  if (!isAuthenticated) {
    router.push("/signin");
  }
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Navbar></Navbar>
        {children}
      </div>
    </QueryClientProvider>
  );
}
