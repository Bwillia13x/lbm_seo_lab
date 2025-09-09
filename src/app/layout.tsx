import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PanicBanner from "@/components/PanicBanner";

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
        <PanicBanner />
        <div className="pt-8"> {/* Add padding for fixed panic banner */}
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}