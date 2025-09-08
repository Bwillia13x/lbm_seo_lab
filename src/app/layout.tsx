import "./globals.css";
import AppShell from "@/components/shell/AppShell";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { LBM_CONSTANTS } from "@/lib/constants";

const SITE_BASE =
  process.env.NEXT_PUBLIC_SITE_BASE || LBM_CONSTANTS.WEBSITE_URL;
const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const metadata = {
  title:
    "Prairie Artistry Studio SEO Lab - Art Studio & Creative Workshop Marketing Tools",
  description:
    "Professional SEO toolkit for Prairie Artistry Studio art workshops, custom commissions, and creative therapy. UTM tracking, review management, GBP posting, and Calgary art marketing tools.",
  keywords: [
    "SEO tools",
    "local SEO",
    "UTM tracking",
    "Google Business Profile",
    "review management",
    "art studio marketing",
    "creative workshop marketing",
    "calgary art studio",
    "art therapy calgary",
    "custom artwork calgary",
    "painting workshops calgary",
    "art classes alberta",
    "creative therapy",
    "art commissions",
    "prairie art",
    "local business marketing",
    "art studio marketing",
  ],
  authors: [{ name: "Little Bow Meadows" }],
  creator: "Prairie Artistry Studio",
  publisher: "Prairie Artistry Studio",
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
    title: "Prairie Artistry Studio SEO Lab - Art Studio Marketing Tools",
    description:
      "Complete SEO toolkit for Prairie Artistry Studio art workshops, custom commissions, and creative therapy in Calgary",
    url: SITE_BASE,
    siteName: "Prairie Artistry Studio",
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: "/images/PRAIRIESIGNALLOGO.png",
        width: 1200,
        height: 630,
        alt: "Prairie Signal - Prairie Artistry Studio SEO Lab Professional Art Marketing Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prairie Artistry Studio SEO Lab - Art Studio Marketing Tools",
    description:
      "Complete SEO toolkit for Prairie Artistry Studio art workshops, custom commissions, and creative therapy in Calgary",
    creator: "@PrairieArtistry",
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
      name: "Prairie Artistry Studio",
      url: "https://prairie-artistry-studio.lovable.app",
      logo: "https://littlebowmeadows.ca/images/PRAIRIESIGNALLOGO.png",
      description:
        "Creative art studio offering workshops, custom commissions, art therapy, and gallery exhibitions in Calgary",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calgary",
        addressLocality: "Calgary",
        addressRegion: "AB",
        postalCode: "T2X XXX",
        addressCountry: "CA",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-403-555-0123",
        contactType: "customer service",
      },
    }),
    "schema:ArtGallery": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ArtGallery",
      name: "Prairie Artistry Studio Gallery",
      description:
        "Contemporary art gallery featuring prairie-inspired works and local Calgary artists",
      url: "https://prairie-artistry-studio.lovable.app/gallery",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calgary",
        addressLocality: "Calgary",
        addressRegion: "AB",
        postalCode: "T2X XXX",
        addressCountry: "CA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "51.0447",
        longitude: "-114.0719",
      },
    }),
    "schema:EducationalOrganization": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Prairie Artistry Studio Workshops",
      description:
        "Art workshops, creative classes, and art therapy sessions for all skill levels in Calgary",
      url: "https://prairie-artistry-studio.lovable.app/workshops",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calgary",
        addressLocality: "Calgary",
        addressRegion: "AB",
        postalCode: "T2X XXX",
        addressCountry: "CA",
      },
    }),
    "schema:LocalBusiness": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Prairie Artistry Studio",
      description:
        "Professional art studio offering custom commissions, creative workshops, and art therapy in Calgary",
      url: "https://prairie-artistry-studio.lovable.app",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Calgary",
        addressLocality: "Calgary",
        addressRegion: "AB",
        postalCode: "T2X XXX",
        addressCountry: "CA",
      },
      telephone: "+1-403-555-0123",
    }),
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
              name: "Prairie Artistry Studio",
              url: "https://prairie-artistry-studio.lovable.app",
              logo: "https://littlebowmeadows.ca/images/PRAIRIESIGNALLOGO.png",
              description:
                "Creative art studio offering workshops, custom commissions, art therapy, and gallery exhibitions in Calgary",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Calgary",
                addressLocality: "Calgary",
                addressRegion: "AB",
                postalCode: "T2X XXX",
                addressCountry: "CA",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-403-555-0123",
                contactType: "customer service",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ArtGallery",
              name: "Prairie Artistry Studio Gallery",
              description:
                "Contemporary art gallery featuring prairie-inspired works and local Calgary artists",
              url: "https://prairie-artistry-studio.lovable.app/gallery",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Calgary",
                addressLocality: "Calgary",
                addressRegion: "AB",
                postalCode: "T2X XXX",
                addressCountry: "CA",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "51.0447",
                longitude: "-114.0719",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Prairie Artistry Studio Workshops",
              description:
                "Art workshops, creative classes, and art therapy sessions for all skill levels in Calgary",
              url: "https://prairie-artistry-studio.lovable.app/workshops",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Calgary",
                addressLocality: "Calgary",
                addressRegion: "AB",
                postalCode: "T2X XXX",
                addressCountry: "CA",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Prairie Artistry Studio",
              description:
                "Professional art studio offering custom commissions, creative workshops, and art therapy in Calgary",
              url: "https://prairie-artistry-studio.lovable.app",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Calgary",
                addressLocality: "Calgary",
                addressRegion: "AB",
                postalCode: "T2X XXX",
                addressCountry: "CA",
              },
              telephone: "+1-403-555-0123",
            }),
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
