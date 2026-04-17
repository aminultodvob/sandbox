import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import { siteConfig } from "@/lib/site-content";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.domain,
    siteName: siteConfig.name,
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: siteConfig.name }],
    locale: "en_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${bodyFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] font-sans text-[var(--foreground)]">
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
