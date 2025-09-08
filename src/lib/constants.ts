// Little Bow Meadows Constants - Centralize all business-specific data here
export const LBM_CONSTANTS = {
  // Business Info
  BUSINESS_NAME: "Little Bow Meadows",
  BOOK_URL: "https://littlebowmeadows.com/book", // Main booking page
  WEBSITE_URL: "https://littlebowmeadows.com",
  PHONE_TEL: "tel:403-555-0123", // Update with actual number
  PHONE_DISPLAY: "403-555-0123", // Update with actual number
  ADDRESS_STR: "Little Bow Meadows, Alberta", // Update with actual address
  MAP_URL: "https://maps.google.com/?q=Little+Bow+Meadows,+Alberta",

  // Review Links - Placeholder Google Place ID needed
  REVIEW_GOOGLE_URL:
    "https://search.google.com/local/writereview?placeid=PLACEHOLDER_NEEDS_LITTLE_BOW_MEADOWS_PLACE_ID",
  REVIEW_APPLE_URL:
    "https://maps.apple.com/?q=Little+Bow+Meadows,+Alberta",

  // Social & Contact
  INSTAGRAM_URL: "https://instagram.com/littlebowmeadows",
  FACEBOOK_URL: "https://facebook.com/littlebowmeadows",

  // Services (for UTM content) - Wedding Venue & Floral Farm Services
  SERVICES: [
    "wedding-venue",
    "floral-arrangements",
    "event-planning",
    "venue-tour",
    "consultation",
    "custom-bouquets",
    "bridal-party",
    "reception-venue",
    "ceremony-venue",
    "floral-design",
  ],

  // UTM Campaign Base
  UTM_CAMPAIGN_BASE: "little_bow_meadows",

  // Local Keywords (Alberta wedding venue focus)
  LOCAL_KEYWORDS: [
    "wedding venue alberta",
    "floral farm alberta",
    "wedding flowers alberta",
    "outdoor wedding venue",
    "rustic wedding venue",
    "floral arrangements calgary",
    "wedding planning alberta",
    "bridal bouquets alberta",
    "reception venue alberta",
    "ceremony venue alberta",
  ],

  // Business Lines
  BUSINESS_LINES: {
    VENUE: "venue",
    FLORAL: "floral",
    EVENTS: "events",
    PLANNING: "planning",
  },

  // Seasonal Content Themes
  SEASONS: {
    SPRING: "spring-weddings",
    SUMMER: "summer-celebrations",
    FALL: "fall-harvest",
    WINTER: "winter-wonderland",
  },
};

// Pre-configured UTM Presets for Little Bow Meadows
export const LBM_UTM_PRESETS = {
  gbp_post: {
    label: "GBP Post",
    source: "google",
    medium: "gbp",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_${new Date().toISOString().slice(0, 7)}`,
    content: "wedding-venue",
  },
  gbp_profile: {
    label: "GBP Profile",
    source: "google",
    medium: "gbp-profile",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_${new Date().toISOString().slice(0, 7)}`,
    content: "venue-profile",
  },
  instagram_bio: {
    label: "Instagram Bio",
    source: "instagram",
    medium: "bio",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_${new Date().toISOString().slice(0, 7)}`,
    content: "wedding-bio",
  },
  instagram_post: {
    label: "Instagram Post",
    source: "instagram",
    medium: "post",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_${new Date().toISOString().slice(0, 7)}`,
    content: "wedding-post",
  },
  venue_booking: {
    label: "Venue Booking",
    source: "instagram",
    medium: "bio",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_venue_${new Date().toISOString().slice(0, 7)}`,
    content: "venue-tour",
  },
  floral_inquiry: {
    label: "Floral Inquiry",
    source: "instagram",
    medium: "bio",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_floral_${new Date().toISOString().slice(0, 7)}`,
    content: "floral-design",
  },
  venue_tour: {
    label: "Venue Tour",
    source: "instagram",
    medium: "bio",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_tour_${new Date().toISOString().slice(0, 7)}`,
    content: "venue-visit",
  },
  event_planning: {
    label: "Event Planning",
    source: "instagram",
    medium: "bio",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_planning_${new Date().toISOString().slice(0, 7)}`,
    content: "event-consultation",
  },
};

// Little Bow Meadows-specific content templates
export const LBM_CONTENT_TEMPLATES = {
  gbp_posts: [
    "💒 Book your dream wedding at Little Bow Meadows! Rustic charm meets natural beauty in Alberta's countryside. #WeddingVenue #AlbertaWeddings #RusticWedding",
    "🌸 Fresh floral arrangements from our own farm! Custom bouquets and centerpieces for your special day. #WeddingFlowers #FloralFarm #AlbertaFlorist",
    "🌿 Venue tours available this weekend! See our beautiful grounds and plan your perfect celebration. #VenueTour #WeddingPlanning #AlbertaVenue",
    "💐 Spring wedding season is here! Book now for 2024 and secure your date at Little Bow Meadows. #SpringWeddings #WeddingSeason #AlbertaBride",
  ],
  instagram_captions: [
    "Where love blooms naturally. Little Bow Meadows - Alberta's premier wedding venue and floral farm. Book your tour: [link] #WeddingVenue #AlbertaWeddings #FloralFarm",
    "From our fields to your bouquet - fresh, locally grown flowers for your special day. #LocalFlowers #WeddingBouquets #AlbertaFlorist",
    "Rustic elegance in the heart of Alberta. Plan your perfect wedding at Little Bow Meadows. #RusticWedding #AlbertaVenue #WeddingPlanning",
    "Every season brings new beauty to our venue. Book your tour to see what makes us special. #SeasonalBeauty #WeddingVenue #AlbertaCountryside",
  ],
  venue_posts: [
    "🏡 Our rustic barn venue - perfect for intimate ceremonies and receptions. #RusticBarn #WeddingVenue #AlbertaWeddings",
    "🌅 Golden hour ceremonies in our outdoor garden space. #OutdoorWedding #GardenCeremony #AlbertaVenue",
    "🍽️ Reception space for up to 150 guests with stunning prairie views. #WeddingReception #AlbertaVenue #PrairieViews",
    "🌙 Evening celebrations under the stars - magical moments at Little Bow Meadows. #EveningWedding #StarryNight #AlbertaRomance",
  ],
  floral_posts: [
    "🌹 Custom bridal bouquets featuring locally grown flowers from our farm. #BridalBouquet #LocalFlowers #AlbertaBride",
    "🌻 Sunflower season is here! Perfect for rustic summer weddings. #SunflowerWedding #SummerBouquets #AlbertaFlorist",
    "🌿 Greenery and wildflowers - natural, organic arrangements for your special day. #WildflowerBouquet #OrganicFlowers #AlbertaNature",
    "💐 Centerpieces that tell your story - custom floral designs for every celebration. #WeddingCenterpieces #CustomFlowers #AlbertaDesign",
  ],
  planning_posts: [
    "📅 2024 wedding season booking now open! Secure your perfect date at Little Bow Meadows. #WeddingBooking #2024Weddings #AlbertaVenue",
    "💍 All-inclusive wedding packages available - venue, flowers, and planning services. #WeddingPackages #AllInclusive #AlbertaWeddings",
    "🤝 Preferred vendor list available - trusted professionals for your perfect day. #WeddingVendors #AlbertaWedding #ProfessionalTeam",
    "📋 Free wedding planning consultation - let us help bring your vision to life. #WeddingConsultation #FreePlanning #AlbertaWeddingPlanner",
  ],
  seasonal_posts: [
    "🌸 Spring weddings at Little Bow Meadows - fresh blooms and new beginnings. #SpringWedding #FreshFlowers #AlbertaSpring",
    "☀️ Summer celebrations under the prairie sky - perfect weather for outdoor ceremonies. #SummerWedding #OutdoorCeremony #AlbertaSummer",
    "🍂 Fall harvest weddings - warm colors and cozy celebrations. #FallWedding #HarvestSeason #AlbertaFall",
    "❄️ Winter wonderland weddings - magical snow-covered ceremonies. #WinterWedding #SnowyRomance #AlbertaWinter",
  ],
};

// Little Bow Meadows partner prospects for wedding industry
export const LBM_PARTNERS = [
  {
    name: "Alberta Wedding Association",
    url: "https://albertaweddingassociation.com",
    type: "wedding",
    email: "info@albertaweddingassociation.com",
  },
  {
    name: "Calgary Wedding Planners",
    url: "https://calgaryweddingplanners.ca",
    type: "planning",
    email: "info@calgaryweddingplanners.ca",
  },
  {
    name: "Alberta Photographers Guild",
    url: "https://albertaphotographers.com",
    type: "photography",
    email: "info@albertaphotographers.com",
  },
  {
    name: "Prairie Catering Co",
    url: "https://prairiecatering.ca",
    type: "catering",
    email: "info@prairiecatering.ca",
  },
  {
    name: "Alberta Floral Suppliers",
    url: "https://albertafloralsuppliers.com",
    type: "supplier",
    email: "info@albertafloralsuppliers.com",
  },
  {
    name: "Calgary Wedding DJs",
    url: "https://calgaryweddingdjs.ca",
    type: "entertainment",
    email: "info@calgaryweddingdjs.ca",
  },
  {
    name: "Alberta Wedding Rentals",
    url: "https://albertaweddingrentals.com",
    type: "rentals",
    email: "info@albertaweddingrentals.com",
  },
  {
    name: "Calgary Bridal Boutiques",
    url: "https://calgarybridalboutiques.ca",
    type: "bridal",
    email: "info@calgarybridalboutiques.ca",
  },
];