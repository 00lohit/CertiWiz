"use client";
import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function ModeToggle({ className }: { className: string }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("system");
  }, [setTheme]);

  return (
    <Button className={className} variant="outline" size="icon">
      <div
        onClick={() => setTheme("dark")}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 w-full h-full flex items-center justify-center"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </div>
      <div
        onClick={() => setTheme("light")}
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 w-full h-full flex items-center justify-center"
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
