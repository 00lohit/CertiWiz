import type { Metadata } from "next";
import "./globals.css";

import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import RootProvider from "@/components/custom/root-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CertiWiz",
  description: "Access, share, and generate certificates",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data: any = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <RootProvider data={data}>{children}</RootProvider>
      </body>
    </html>
  );
}
