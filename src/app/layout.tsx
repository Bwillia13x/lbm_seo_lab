import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PanicBanner from "@/components/PanicBanner";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata = {
  title: "Little Bow Meadows SEO Lab",
  description: "Professional online marketing toolkit for Little Bow Meadows wedding venue, floral farm, and farm-to-table operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <ErrorBoundary name="PanicBanner">
          <PanicBanner />
        </ErrorBoundary>
        <div className="pt-8"> {/* Add padding for fixed panic banner */}
          <ErrorBoundary name="Navbar">
            <Navbar />
          </ErrorBoundary>
          <ErrorBoundary name="MainContent">
            <main>{children}</main>
          </ErrorBoundary>
          <ErrorBoundary name="Footer">
            <Footer />
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}