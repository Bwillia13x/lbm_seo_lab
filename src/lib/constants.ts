// Little Bow Meadows Constants - Centralize all LBM-specific data here
export const LBM_CONSTANTS = {
  // Business Info
  BUSINESS_NAME: "Little Bow Meadows",
  BOOK_URL: "https://www.airbnb.com/slink/ezl2mtlK", // Airbnb A-frame booking
  WEBSITE_URL: "https://littlebowmeadows.ca",
  PHONE_TEL: "tel:403-555-0123", // Placeholder - needs actual number
  PHONE_DISPLAY: "403-555-0123", // Placeholder - needs actual number
  ADDRESS_STR: "Little Bow River, High River, Alberta, T1V 1M6", // Placeholder - needs actual address
  MAP_URL: "https://maps.google.com/?q=Little+Bow+River,+High+River,+AB,+T1V+1M6",

  // Review Links - Placeholder Google Place ID needed
  REVIEW_GOOGLE_URL:
    "https://search.google.com/local/writereview?placeid=PLACEHOLDER_NEEDS_LBM_PLACE_ID",
  REVIEW_APPLE_URL:
    "https://maps.apple.com/?q=Little+Bow+River,+High+River,+AB,+T1V+1M6",

  // Social & Contact
  INSTAGRAM_URL: "https://instagram.com/littlebowmeadows",
  FACEBOOK_URL: "https://facebook.com/littlebowmeadows",

  // Services (for UTM content) - Three monetization lines
  SERVICES: [
    "wedding-tour",
    "bouquet-order",
    "workshop-signup",
    "airbnb-booking",
    "floral-consultation",
    "seasonal-csa",
    "engagement-session",
    "farm-visit",
  ],

  // UTM Campaign Base
  UTM_CAMPAIGN_BASE: "lbm",

  // Local Keywords (Southern Alberta wedding/farm focus)
  LOCAL_KEYWORDS: [
    "southern alberta outdoor wedding venues",
    "prairie wildflower bouquets",
    "high river weekend stay",
    "calgary wedding venue near river",
    "seasonal farm bouquets alberta",
    "little bow river wedding",
    "prairie wedding photography",
    "alberta floral farm",
    "high river airbnb",
    "calgary floral delivery",
  ],

  // Business Lines
  BUSINESS_LINES: {
    WEDDINGS: "weddings",
    FLOWERS: "flowers",
    STAY: "stay",
  },

  // Seasonal Content Themes
  SEASONS: {
    SPRING: "spring-blooms",
    SUMMER: "summer-weddings",
    FALL: "fall-harvest",
    WINTER: "winter-planning",
  },
};

// Pre-configured UTM Presets for LBM
export const LBM_UTM_PRESETS = {
  gbp_post: {
    label: "GBP Post",
    source: "google",
    medium: "gbp",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_${new Date().toISOString().slice(0, 7)}`,
    content: "prairie-wedding",
  },
  gbp_profile: {
    label: "GBP Profile",
    source: "google",
    medium: "gbp-profile",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_${new Date().toISOString().slice(0, 7)}`,
    content: "little-bow-profile",
  },
  instagram_bio: {
    label: "Instagram Bio",
    source: "instagram",
    medium: "bio",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_${new Date().toISOString().slice(0, 7)}`,
    content: "prairie-bio",
  },
  instagram_post: {
    label: "Instagram Post",
    source: "instagram",
    medium: "post",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_${new Date().toISOString().slice(0, 7)}`,
    content: "prairie-post",
  },
  wedding_tour: {
    label: "Wedding Tour",
    source: "instagram",
    medium: "bio",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_wedding_${new Date().toISOString().slice(0, 7)}`,
    content: "tour-request",
  },
  bouquet_order: {
    label: "Bouquet Order",
    source: "instagram",
    medium: "bio",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_flowers_${new Date().toISOString().slice(0, 7)}`,
    content: "bouquet-shop",
  },
  workshop_signup: {
    label: "Workshop Signup",
    source: "instagram",
    medium: "bio",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_workshop_${new Date().toISOString().slice(0, 7)}`,
    content: "floral-workshop",
  },
  airbnb_stay: {
    label: "Airbnb Stay",
    source: "instagram",
    medium: "bio",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_stay_${new Date().toISOString().slice(0, 7)}`,
    content: "a-frame-booking",
  },
};

// LBM-specific content templates
export const LBM_CONTENT_TEMPLATES = {
  gbp_posts: [
    "💐 Seasonal prairie wildflowers now blooming! Fresh bouquets available for pickup or delivery. #PrairieFlowers #AlbertaFlorist #LittleBowMeadows",
    "💒 Dreamy outdoor wedding venue on the Little Bow River. Request a tour today! #PrairieWedding #AlbertaWeddingVenue #LittleBowMeadows",
    "🏠 Cozy A-frame stay on the river - perfect for your prairie escape. Book through Airbnb! #PrairieStay #LittleBowRiver #AlbertaTravel",
    "🌸 Join our floral workshop this weekend! Learn to arrange prairie blooms. Limited spots available. #FloralWorkshop #AlbertaFlowers #LittleBowMeadows",
  ],
  instagram_captions: [
    "Southern Alberta's premier outdoor wedding venue & floral farm. Where prairie dreams come to life. Request a tour: [link] #PrairieWedding #AlbertaWedding #LittleBowMeadows",
    "From wildflower bouquets to ceremony arches - we create magical moments on the Little Bow River. #WeddingFlowers #PrairieVenue #Alberta",
    "Our A-frame on the river offers the perfect blend of rustic charm and modern comfort. Your prairie getaway awaits. #PrairieStay #LittleBowRiver #Alberta",
    "Planning your special day? Our floral workshops teach you to create stunning arrangements with seasonal blooms. #FloralWorkshop #WeddingPlanning #AlbertaFlowers",
  ],
  wedding_posts: [
    "🌅 Golden hour ceremonies overlooking the Little Bow River - pure magic! #PrairieWedding #OutdoorWedding #LittleBowMeadows",
    "💑 Intimate micro-weddings for just the two of you, surrounded by wildflowers. #MicroWedding #PrairieRomance #AlbertaWedding",
    "🎨 Our flexible ceremony spaces adapt to your vision - from elopements to grand celebrations. #WeddingVenue #LittleBowRiver #Alberta",
  ],
  flower_posts: [
    "🌼 This week's seasonal bouquet: peonies, delphiniums, and prairie wildflowers. #SeasonalBouquets #PrairieFlowers #LittleBowMeadows",
    "🌾 CSA flower shares deliver fresh blooms to your door weekly. Support local farming! #CSAFlowers #AlbertaFlorist #FarmFresh",
    "🎁 Custom bridal bouquets featuring Alberta-grown flowers. Let's create your perfect arrangement. #BridalBouquet #WeddingFlowers #Prairie",
  ],
  workshop_posts: [
    "👐 Hands-on floral design workshop this Saturday. Learn from our expert florists! #FloralWorkshop #FlowerArranging #LittleBowMeadows",
    "👨‍👩‍👧 Family-friendly flower crafts for all ages. Create memories with prairie blooms. #FamilyWorkshop #AlbertaFlowers #Prairie",
    "💡 Bridal consultation + workshop bundle - perfect preparation for your wedding flowers. #WeddingPlanning #FloralDesign #Alberta",
  ],
  stay_posts: [
    "🌙 Stargazing from our A-frame deck - the perfect end to your prairie day. #PrairieStay #LittleBowRiver #Alberta",
    "☕ Morning coffee with river views. Start your day in pure tranquility. #PrairieEscape #AlbertaTravel #LittleBowMeadows",
    "🚶‍♀️ Hiking trails, fishing spots, and farm visits - adventure awaits at Little Bow Meadows. #PrairieAdventure #Alberta #LittleBowRiver",
  ],
};

// LBM partner prospects for Southern Alberta wedding industry
export const LBM_PARTNERS = [
  {
    name: "High River Chamber of Commerce",
    url: "https://highriverchamber.ca",
    type: "business",
    email: "info@highriverchamber.ca",
  },
  {
    name: "Okotoks Chamber of Commerce",
    url: "https://okotokschamber.com",
    type: "business",
    email: "info@okotokschamber.com",
  },
  {
    name: "Alberta Game Farm",
    url: "https://albertagamefarm.com",
    type: "venue",
    email: "info@albertagamefarm.com",
  },
  {
    name: "Bow Valley Ranche",
    url: "https://bowvalleyranche.com",
    type: "venue",
    email: "info@bowvalleyranche.com",
  },
  {
    name: "Meadow Muse",
    url: "https://meadowmuse.ca",
    type: "venue",
    email: "hello@meadowmuse.ca",
  },
  {
    name: "Prairie Wedding Association",
    url: "https://prairieweddingassociation.com",
    type: "industry",
    email: "info@prairieweddingassociation.com",
  },
  {
    name: "Alberta Wedding Planners Association",
    url: "https://albertaweddingplanners.com",
    type: "industry",
    email: "info@albertaweddingplanners.com",
  },
  {
    name: "Foothills Wedding Directory",
    url: "https://foothillsweddings.ca",
    type: "directory",
    email: "info@foothillsweddings.ca",
  },
];
