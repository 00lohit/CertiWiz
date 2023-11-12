"use client";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { SessionProvider } from "next-auth/react";
import NavMenu from "./NavMenu";
import { dataFormat } from "../NavMenu/Profile";

export default function RootProvider({
  data,
  children,
}: {
  data: dataFormat;
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <NavMenu data={data} />
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}
