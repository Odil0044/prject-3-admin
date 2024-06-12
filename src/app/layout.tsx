 import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import AppLayout from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "./providers/AuthProvider";
 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const {isAuthenticated} = useAuth()

  return (
    <html lang="en">
      <body className={inter.className}>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AppLayout>{children}</AppLayout> <Toaster />
            </ThemeProvider>
          </AuthProvider>
      </body>
    </html>
  );
}
