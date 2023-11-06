"use client";
import { ModeToggle, ThemeProvider } from "@/components/custom/theme-provider";
import { SessionProvider } from "next-auth/react";
import NavMenu from "./NavMenu";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NavMenu />
        {children}
        <ModeToggle className="fixed right-4 bottom-4" />
      </ThemeProvider>
    </SessionProvider>
  );
}
