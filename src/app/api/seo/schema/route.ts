import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Generate JSON-LD schema markup for LocalBusiness
    const businessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Little Bow Meadows",
      "description": "Fresh, locally-sourced farm products including eggs, vegetables, flowers, and seasonal produce. Pickup-only farm stand with pre-order options.",
      "url": process.env.NEXT_PUBLIC_SITE_URL,
      "telephone": "+1-XXX-XXX-XXXX", // Replace with actual phone
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Your Street Address",
        "addressLocality": "Your City",
        "addressRegion": "AB", // Replace with actual province
        "postalCode": "Your Postal Code",
        "addressCountry": "CA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "51.0447", // Replace with actual coordinates
        "longitude": "-114.0719"
      },
      "openingHours": [
        "Mo-Sa 10:00-18:00",
        "Su 14:00-17:00"
      ],
      "priceRange": "$$",
      "paymentAccepted": "Cash, Credit Card",
      "currenciesAccepted": "CAD",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127"
      },
      "sameAs": [
        "https://www.instagram.com/littlebowmeadows",
        "https://www.facebook.com/littlebowmeadows"
      ]
    };

    // Generate Product schema examples
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Farm Fresh Eggs",
      "description": "Free-range, organic eggs from our heritage breed chickens. Available seasonally.",
      "image": `${process.env.NEXT_PUBLIC_SITE_URL}/images/eggs.jpg`,
      "brand": {
        "@type": "Brand",
        "name": "Little Bow Meadows"
      },
      "offers": {
        "@type": "Offer",
        "price": "7.50",
        "priceCurrency": "CAD",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        "seller": {
          "@type": "LocalBusiness",
          "name": "Little Bow Meadows"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "89"
      }
    };

    // Generate Organization schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Little Bow Meadows",
      "url": process.env.NEXT_PUBLIC_SITE_URL,
      "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
      "sameAs": [
        "https://www.instagram.com/littlebowmeadows",
        "https://www.facebook.com/littlebowmeadows"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-XXX-XXX-XXXX",
        "contactType": "customer service",
        "availableLanguage": "English"
      }
    };

    return NextResponse.json({
      business: businessSchema,
      product: productSchema,
      organization: organizationSchema
    });
  } catch (error) {
    console.error('Error generating schema markup:', error);
    return NextResponse.json({ error: 'Failed to generate schema markup' }, { status: 500 });
  }
}
