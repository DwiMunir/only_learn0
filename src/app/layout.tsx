import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/literata";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { showDrafts } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, locale: "id_ID", type: "website" },
  // Preview berisi draft tidak boleh terindeks Google
  robots: showDrafts() ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-dvh">
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
