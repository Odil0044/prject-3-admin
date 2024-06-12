"use client";

import Link from "next/link";
import styles from "./index.module.scss";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "Images",
    link: "/",
  },
  {
    title: "Contact requests",
    link: "/contact-requests",
  },
];

export function Navbar({ ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex items-center space-x-4 container  lg:space-x-6",
        styles.navbar
      )}
      {...props}
    >
      {links.map((link) => (
        <Link
          key={link.link}
          href={link.link}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === link.link || "text-muted-foreground"
          )}
        >
          {link.title}
        </Link>
      ))}

      <div style={{ marginLeft: "auto" }}></div>
      <ThemeToggle />
    </nav>
  );
}
