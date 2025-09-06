import "./globals.css";
import AppShell from "@/components/shell/AppShell";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { LBM_CONSTANTS } from "@/lib/constants";

const SITE_BASE = process.env.NEXT_PUBLIC_SITE_BASE || LBM_CONSTANTS.WEBSITE_URL;
const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const metadata = {
  title: "Little Bow Meadows SEO Lab - Wedding Venue & Floral Farm Marketing Tools",
  description:
    "Professional SEO toolkit for Little Bow Meadows wedding venue, floral farm, and Airbnb stay. UTM tracking, review management, GBP posting, and prairie wedding marketing tools.",
  keywords: [
    "SEO tools",
    "local SEO",
    "UTM tracking",
    "Google Business Profile",
    "review management",
    "wedding venue marketing",
    "floral farm marketing",
    "prairie wedding venue",
    "southern alberta wedding",
    "little bow river wedding",
    "alberta floral farm",
    "high river wedding venue",
    "outdoor wedding alberta",
    "seasonal bouquets",
    "wedding flowers alberta",
    "local business marketing",
    "wedding venue marketing",
  ],
  authors: [{ name: "Little Bow Meadows" }],
  creator: "Little Bow Meadows",
  publisher: "Little Bow Meadows",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_BASE),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: ALLOW_INDEXING,
    follow: ALLOW_INDEXING,
    googleBot: {
      index: ALLOW_INDEXING,
      follow: ALLOW_INDEXING,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Little Bow Meadows SEO Lab - Prairie Wedding Marketing Tools",
    description:
      "Complete SEO toolkit for Little Bow Meadows wedding venue, floral farm, and Airbnb stay on the Little Bow River",
    url: SITE_BASE,
    siteName: "Little Bow Meadows",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/PRAIRIESIGNALLOGO.png",
        width: 1200,
        height: 630,
        alt: "Prairie Signal - Little Bow Meadows SEO Lab Professional Wedding Marketing Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Little Bow Meadows SEO Lab - Prairie Wedding Marketing Tools",
    description:
      "Complete SEO toolkit for Little Bow Meadows wedding venue, floral farm, and Airbnb stay on the Little Bow River",
    creator: "@LittleBowMeadows",
    images: ["/images/PRAIRIESIGNALLOGO.png"],
  },
  verification: {
    google: undefined,
  },
  icons: {
    icon: "/images/PRAIRIESIGNALLOGO.png",
    shortcut: "/images/PRAIRIESIGNALLOGO.png",
    apple: "/images/PRAIRIESIGNALLOGO.png",
  },
  other: {
    "schema:Organization": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Little Bow Meadows",
      "url": "https://littlebowmeadows.ca",
      "logo": "https://littlebowmeadows.ca/images/PRAIRIESIGNALLOGO.png",
      "description": "Outdoor wedding venue, seasonal floral farm, and A-frame Airbnb stay on the Little Bow River",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Little Bow River",
        "addressLocality": "High River",
        "addressRegion": "AB",
        "postalCode": "T1V 1M6",
        "addressCountry": "CA"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-403-555-0123",
        "contactType": "customer service"
      }
    }),
    "schema:EventVenue": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EventVenue",
      "name": "Little Bow Meadows Wedding Venue",
      "description": "Stunning outdoor wedding venue on the Little Bow River with prairie views and natural floral arrangements",
      "url": "https://littlebowmeadows.ca/weddings",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Little Bow River",
        "addressLocality": "High River",
        "addressRegion": "AB",
        "postalCode": "T1V 1M6",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "50.5806",
        "longitude": "-113.8744"
      }
    }),
    "schema:Florist": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Florist",
      "name": "Little Bow Meadows Floral Farm",
      "description": "Seasonal cut flowers, wedding floral arrangements, and floral design workshops from Alberta's premier prairie floral farm",
      "url": "https://littlebowmeadows.ca/flowers",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Little Bow River",
        "addressLocality": "High River",
        "addressRegion": "AB",
        "postalCode": "T1V 1M6",
        "addressCountry": "CA"
      }
    }),
    "schema:LodgingBusiness": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LodgingBusiness",
      "name": "Little Bow Meadows A-Frame",
      "description": "Charming A-frame cabin on the Little Bow River perfect for couples, families, and prairie getaways",
      "url": "https://littlebowmeadows.ca/stay",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Little Bow River",
        "addressLocality": "High River",
        "addressRegion": "AB",
        "postalCode": "T1V 1M6",
        "addressCountry": "CA"
      },
      "telephone": "+1-403-555-0123"
    })
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Little Bow Meadows",
              "url": "https://littlebowmeadows.ca",
              "logo": "https://littlebowmeadows.ca/images/PRAIRIESIGNALLOGO.png",
              "description": "Outdoor wedding venue, seasonal floral farm, and A-frame Airbnb stay on the Little Bow River",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Little Bow River",
                "addressLocality": "High River",
                "addressRegion": "AB",
                "postalCode": "T1V 1M6",
                "addressCountry": "CA"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-403-555-0123",
                "contactType": "customer service"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EventVenue",
              "name": "Little Bow Meadows Wedding Venue",
              "description": "Stunning outdoor wedding venue on the Little Bow River with prairie views and natural floral arrangements",
              "url": "https://littlebowmeadows.ca/weddings",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Little Bow River",
                "addressLocality": "High River",
                "addressRegion": "AB",
                "postalCode": "T1V 1M6",
                "addressCountry": "CA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "50.5806",
                "longitude": "-113.8744"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Florist",
              "name": "Little Bow Meadows Floral Farm",
              "description": "Seasonal cut flowers, wedding floral arrangements, and floral design workshops from Alberta's premier prairie floral farm",
              "url": "https://littlebowmeadows.ca/flowers",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Little Bow River",
                "addressLocality": "High River",
                "addressRegion": "AB",
                "postalCode": "T1V 1M6",
                "addressCountry": "CA"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "name": "Little Bow Meadows A-Frame",
              "description": "Charming A-frame cabin on the Little Bow River perfect for couples, families, and prairie getaways",
              "url": "https://littlebowmeadows.ca/stay",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Little Bow River",
                "addressLocality": "High River",
                "addressRegion": "AB",
                "postalCode": "T1V 1M6",
                "addressCountry": "CA"
              },
              "telephone": "+1-403-555-0123"
            })
          }}
        />
      </head>
      <body>
        <ErrorBoundary>
          <AppShell>{children}</AppShell>
        </ErrorBoundary>
      </body>
    </html>
  );
}
