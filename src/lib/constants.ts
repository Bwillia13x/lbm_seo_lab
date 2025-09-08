// Prairie Artistry Studio Constants - Centralize all business-specific data here
export const LBM_CONSTANTS = {
  // Business Info
  BUSINESS_NAME: "Prairie Artistry Studio",
  BOOK_URL: "https://prairie-artistry-studio.lovable.app/book", // Main booking page
  WEBSITE_URL: "https://prairie-artistry-studio.lovable.app",
  PHONE_TEL: "tel:403-457-0420", // Prairie Artistry Studio phone
  PHONE_DISPLAY: "403-457-0420", // Prairie Artistry Studio phone
  ADDRESS_STR: "Calgary, Alberta", // Prairie Artistry Studio address
  MAP_URL: "https://maps.google.com/?q=Prairie+Artistry+Studio,+Calgary,+AB",

  // Review Links - Placeholder Google Place ID needed
  REVIEW_GOOGLE_URL:
    "https://search.google.com/local/writereview?placeid=PLACEHOLDER_NEEDS_PRAIRIE_ARTISTRY_PLACE_ID",
  REVIEW_APPLE_URL:
    "https://maps.apple.com/?q=Prairie+Artistry+Studio,+Calgary,+AB",

  // Social & Contact
  INSTAGRAM_URL: "https://instagram.com/prairieartistry",
  FACEBOOK_URL: "https://facebook.com/prairieartistry",

  // Services (for UTM content) - Art & Creative Services
  SERVICES: [
    "art-commission",
    "workshop-booking",
    "gallery-visit",
    "private-lesson",
    "art-consultation",
    "custom-artwork",
    "group-workshop",
    "art-therapy",
    "corporate-workshop",
    "art-supplies",
  ],

  // UTM Campaign Base
  UTM_CAMPAIGN_BASE: "prairie_artistry",

  // Local Keywords (Calgary art studio focus)
  LOCAL_KEYWORDS: [
    "calgary art studio",
    "prairie art workshops",
    "custom artwork calgary",
    "art classes calgary",
    "local artist calgary",
    "art therapy calgary",
    "painting workshops alberta",
    "creative studio calgary",
    "art commissions calgary",
    "group art classes",
  ],

  // Business Lines
  BUSINESS_LINES: {
    WORKSHOPS: "workshops",
    COMMISSIONS: "commissions",
    GALLERY: "gallery",
    THERAPY: "therapy",
  },

  // Seasonal Content Themes
  SEASONS: {
    SPRING: "spring-inspiration",
    SUMMER: "summer-workshops",
    FALL: "fall-colors",
    WINTER: "winter-creativity",
  },
};

// Pre-configured UTM Presets for Prairie Artistry Studio
export const LBM_UTM_PRESETS = {
  gbp_post: {
    label: "GBP Post",
    source: "google",
    medium: "gbp",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_${new Date().toISOString().slice(0, 7)}`,
    content: "art-studio",
  },
  gbp_profile: {
    label: "GBP Profile",
    source: "google",
    medium: "gbp-profile",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_${new Date().toISOString().slice(0, 7)}`,
    content: "studio-profile",
  },
  instagram_bio: {
    label: "Instagram Bio",
    source: "instagram",
    medium: "bio",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_${new Date().toISOString().slice(0, 7)}`,
    content: "art-bio",
  },
  instagram_post: {
    label: "Instagram Post",
    source: "instagram",
    medium: "post",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_${new Date().toISOString().slice(0, 7)}`,
    content: "art-post",
  },
  workshop_booking: {
    label: "Workshop Booking",
    source: "instagram",
    medium: "bio",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_workshop_${new Date().toISOString().slice(0, 7)}`,
    content: "workshop-signup",
  },
  commission_inquiry: {
    label: "Commission Inquiry",
    source: "instagram",
    medium: "bio",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_commission_${new Date().toISOString().slice(0, 7)}`,
    content: "custom-art",
  },
  gallery_visit: {
    label: "Gallery Visit",
    source: "instagram",
    medium: "bio",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_gallery_${new Date().toISOString().slice(0, 7)}`,
    content: "gallery-tour",
  },
  art_therapy: {
    label: "Art Therapy",
    source: "instagram",
    medium: "bio",
    campaign: `${LBM_CONSTANTS.UTM_CAMPAIGN_BASE}_therapy_${new Date().toISOString().slice(0, 7)}`,
    content: "therapy-session",
  },
};

// Prairie Artistry Studio-specific content templates
export const LBM_CONTENT_TEMPLATES = {
  gbp_posts: [
    "🎨 New art workshop this weekend! Learn watercolor techniques with prairie landscapes. Limited spots available. #PrairieArt #CalgaryArt #ArtWorkshop",
    "✨ Custom artwork commissions now open! Transform your space with original prairie-inspired pieces. #CustomArt #CalgaryArtist #PrairieArtistry",
    "🖼️ Gallery open for private viewings! See our latest collection of prairie landscapes and abstract works. #ArtGallery #CalgaryArt #PrairieArtistry",
    "🧘 Art therapy sessions available - healing through creative expression. Book your consultation today. #ArtTherapy #CalgaryWellness #CreativeHealing",
  ],
  instagram_captions: [
    "Where prairie inspiration meets artistic expression. Join us for workshops, commissions, and creative healing. Book your session: [link] #PrairieArt #CalgaryArtist #CreativeStudio",
    "From landscape paintings to abstract expressions - we bring the beauty of the prairies to life through art. #PrairieInspired #CalgaryArt #ArtStudio",
    "Discover your creative voice in our welcoming studio space. Workshops, private lessons, and art therapy available. #CreativeJourney #CalgaryArt #ArtWorkshops",
    "Custom artwork that captures the essence of prairie life. Commission your unique piece today. #CustomArt #PrairieArtistry #CalgaryCommissions",
  ],
  workshop_posts: [
    "🌾 Prairie Landscape Painting Workshop - capture the beauty of Alberta's golden fields. #LandscapeArt #PrairieWorkshop #CalgaryArt",
    "🎭 Abstract Expression Workshop - explore color, texture, and emotion through paint. #AbstractArt #CreativeWorkshop #CalgaryArtist",
    "👨‍👩‍👧‍👦 Family Art Day - creative fun for all ages with prairie-themed projects. #FamilyArt #CalgaryWorkshops #CreativeFamily",
    "🧘‍♀️ Mindful Art Session - combine meditation with creative expression for wellness. #ArtTherapy #MindfulArt #CalgaryWellness",
  ],
  commission_posts: [
    "🏠 Transform your home with custom prairie-inspired artwork. From landscapes to abstracts. #CustomArt #HomeDecor #PrairieArtistry",
    "💼 Corporate art commissions - enhance your workspace with original Calgary artist creations. #CorporateArt #OfficeDecor #CalgaryBusiness",
    "💝 Gift commissions available - surprise someone special with personalized artwork. #ArtGifts #CustomCommissions #PrairieArt",
  ],
  gallery_posts: [
    "🖼️ New exhibition opening: 'Prairie Dreams' - contemporary interpretations of Alberta landscapes. #ArtExhibition #CalgaryGallery #PrairieArt",
    "👁️ Gallery tours available by appointment - see our full collection of prairie-inspired works. #GalleryTour #CalgaryArt #ArtViewing",
    "🎨 Featured artist spotlight: Local Calgary creators showcasing prairie life through various mediums. #LocalArtist #CalgaryCreatives #PrairieArtistry",
  ],
  therapy_posts: [
    "🌱 Art therapy sessions help process emotions through creative expression. Safe, supportive environment. #ArtTherapy #MentalHealth #CreativeHealing",
    "🤝 Group art therapy sessions - connect with others while exploring creativity. #GroupTherapy #CommunityHealing #ArtWellness",
    "💆‍♀️ Stress relief through art - discover the therapeutic power of creative expression. #StressRelief #ArtHealing #CalgaryWellness",
  ],
};

// Prairie Artistry Studio partner prospects for Calgary art community
export const LBM_PARTNERS = [
  {
    name: "Calgary Arts Development",
    url: "https://calgaryartsdevelopment.com",
    type: "arts",
    email: "info@calgaryartsdevelopment.com",
  },
  {
    name: "Alberta Society of Artists",
    url: "https://albertaartists.com",
    type: "arts",
    email: "info@albertaartists.com",
  },
  {
    name: "Calgary Public Library",
    url: "https://calgarylibrary.ca",
    type: "community",
    email: "info@calgarylibrary.ca",
  },
  {
    name: "Kensington Art Supply",
    url: "https://kensingtonartsupply.com",
    type: "supplier",
    email: "info@kensingtonartsupply.ca",
  },
  {
    name: "Calgary Mental Health Association",
    url: "https://cmha.calgary.ab.ca",
    type: "wellness",
    email: "info@cmha.calgary.ab.ca",
  },
  {
    name: "Hillhurst Sunnyside Community Association",
    url: "https://hsca.ca",
    type: "community",
    email: "info@hsca.ca",
  },
  {
    name: "Calgary Wellness Centre",
    url: "https://calgarywellness.ca",
    type: "wellness",
    email: "info@calgarywellness.ca",
  },
  {
    name: "Alberta Art Therapy Association",
    url: "https://albertaarttherapy.com",
    type: "therapy",
    email: "info@albertaarttherapy.com",
  },
];