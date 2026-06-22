import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  title: "Shiplog — ship changes, not silence",
  description: "Publish and track project changelogs. Free, open, and always public.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider><SiteHeader />{children}</ThemeProvider>
      </body>
    </html>
  );
}
