import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PanicBanner from "@/components/PanicBanner";
import ErrorBoundary from "@/components/ErrorBoundary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Little Bow Meadows SEO Lab",
    template: "%s · Little Bow Meadows",
  },
  description:
    "Professional online marketing toolkit for Little Bow Meadows wedding venue, floral farm, and farm-to-table operations.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://littlebowmeadows.ca"),
  openGraph: {
    title: "Little Bow Meadows SEO Lab",
    description:
      "Professional online marketing toolkit for Little Bow Meadows wedding venue, floral farm, and farm-to-table operations.",
    url: "https://littlebowmeadows.ca",
    siteName: "Little Bow Meadows",
    images: [
      {
        url: "/images/PRAIRIESIGNALLOGO.png",
        width: 512,
        height: 512,
        alt: "Prairie Signal / Little Bow Meadows",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Little Bow Meadows SEO Lab",
    description:
      "Professional online marketing toolkit for Little Bow Meadows wedding venue, floral farm, and farm-to-table operations.",
    images: ["/images/PRAIRIESIGNALLOGO.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus-ring fixed top-2 left-2 z-[60] bg-background text-foreground px-3 py-2 rounded-md"
        >
          Skip to content
        </a>
        <ErrorBoundary name="PanicBanner">
          <PanicBanner />
        </ErrorBoundary>
        <div className="pt-8">
          {/* Add padding for fixed panic banner */}
          <ErrorBoundary name="Navbar">
            <Navbar />
          </ErrorBoundary>
          <ErrorBoundary name="MainContent">
            <main id="main-content" className="max-w-5xl mx-auto px-6 py-8">
              {children}
            </main>
          </ErrorBoundary>
          <ErrorBoundary name="Footer">
            <Footer />
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}