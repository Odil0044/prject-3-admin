"use client";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isLoading: false,
  isAuthenticated: false,
} as any);

export const useAuth = () => useContext(AuthContext);
const username = "admin",
  password = "admin2024";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const [data, setData] = useState({
    isLoading: false,
    isAuthenticated: process.env.NEXT_PUBLIC_ENV === "development",
  });

  // useEffect(()=>{},[])

  const login = (values: { username: string; password: string }) => {
     if (values.username === username && values.password === password) {
      setData({ isLoading: false, isAuthenticated: true });
      return router.push("/");
    }
    toast({
      title: "Username or password is incorrect!",
      description: "please try another username or password",
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
    setData({ isLoading: false, isAuthenticated: false });
  };
  return (
    <AuthContext.Provider value={{ ...data, login }}>
      {children}
    </AuthContext.Provider>
  );
}
