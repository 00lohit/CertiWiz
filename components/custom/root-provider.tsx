"use client";
import { ModeToggle, ThemeProvider } from "@/components/custom/theme-provider";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <ModeToggle className="fixed right-4 bottom-4" />
    </ThemeProvider>
  );
}
