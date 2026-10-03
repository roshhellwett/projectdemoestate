import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.SUPABASE_URL || "https://vuvxmzrthcitfagwebgm.supabase.co";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function run() {
  console.log("Connecting to Supabase at", url);

  // 1. Clear old data in order
  console.log("Cleaning old data...");
  await supabase.from("enquiries").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("property_images").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("property_videos").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("properties").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("reels").delete().neq("id", "placeholder");
  await supabase.from("blog_posts").delete().neq("id", "placeholder");
  await supabase.from("testimonials").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("faqs").delete().neq("id", "placeholder");
  await supabase.from("partners").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("site_settings").delete().neq("key", "__never__");

  console.log("Cleaned all tables!");

  // 2. Site settings
  console.log("Inserting site settings...");
  const settings = [
    { key: "brand_name", value: "Apex Living" },
    { key: "tagline", value: "Luxury Real Estate Advisory · Kolkata" },
    { key: "hero_eyebrow", value: "Kolkata · Verified Architectural Inventory" },
    { key: "hero_title", value: "Homes worth the grand tour." },
    { key: "hero_subtitle", value: "Hand-verified flats, penthouses and commercial spaces across Kolkata. Every listing walked through, every paper checked." },
    { key: "city", value: "Kolkata, West Bengal" },
    { key: "email", value: "zenithprojects@icloud.com" },
    { key: "phone", value: "+91 98000 00000" },
    { key: "whatsapp_number", value: "+91 98000 00000" },
    { key: "instagram_handle", value: "apexliving.demo" },
    { key: "instagram_url", value: "https://www.instagram.com" },
    { key: "facebook_url", value: "https://www.facebook.com" },
    { key: "youtube_url", value: "https://www.youtube.com" },
    { key: "footer_note", value: "Verified luxury listings. Transparent advisory. Zero compromise on title clarity." },
    { key: "about_intro", value: "Apex Living is a Kolkata-based luxury real estate advisory. We verify every residence in person—structural integrity, municipality sanctions, and historical title records—so buyers engage only with genuine opportunities, and sellers deal with qualified buyers." },
    { key: "about_stat_1_value", value: "100%" },
    { key: "about_stat_1_label", value: "Verified Title Records" },
    { key: "about_stat_1_note", value: "KMC mutation, land tenure, and RERA sanction validated before listing." },
    { key: "about_stat_2_value", value: "1 : 1" },
    { key: "about_stat_2_label", value: "Senior Advisory Desk" },
    { key: "about_stat_2_note", value: "A dedicated real estate advisor directs your search and transaction end-to-end." },
    { key: "about_stat_3_value", value: "Kolkata" },
    { key: "about_stat_3_label", value: "Hyperlocal Authority" },
    { key: "about_stat_3_note", value: "Deep knowledge of Alipore, Ballygunge, New Town, and EM Bypass corridors." },
    { key: "cta_title", value: "Selling or leasing a prime property?" },
    { key: "cta_subtitle", value: "Fair valuation, qualified prospective buyers, discreet private mandates." },
    { key: "sell_intro", value: "Discerning buyers and NRIs look to us for verified prime residences. We provide professional architectural photography, legal vetting, and discreet marketing." },
    { key: "partner_intro", value: "Institutional developers, leading architects, and premier lenders collaborate with Apex Living to reach qualified real estate patrons." },
    { key: "journal_intro", value: "In-depth market notes, regulatory updates, and architectural guides on Kolkata real estate." },
    { key: "properties_intro", value: "Filter by locality, configuration, and budget. Every residence verified on-ground." }
  ];
  const { error: setErr } = await supabase.from("site_settings").upsert(settings);
  if (setErr) console.error("Error inserting settings:", setErr);
  else console.log(`Inserted ${settings.length} site settings`);

  // 3. Partners
  console.log("Inserting partners...");
  const partners = [
    {
      id: "a0000001-0000-0000-0000-000000000001",
      name: "Auricas",
      slug: "auricas",
      logo_url: "/images/partners/auricas.webp",
      website_url: "https://auricas.com",
      description: "Crafting Golden Spaces - Premium residential developments across Kolkata",
      display_order: 10,
      is_published: true,
    },
    {
      id: "a0000001-0000-0000-0000-000000000002",
      name: "CREDAI Kolkata",
      slug: "credai",
      logo_url: "/images/partners/credai.webp",
      website_url: "https://credaibengal.in",
      description: "Apex body for private real estate developers, setting ethical standards and construction excellence across Bengal.",
      display_order: 20,
      is_published: true,
    },
    {
      id: "a0000001-0000-0000-0000-000000000003",
      name: "DTC Group",
      slug: "dtc",
      logo_url: "/images/partners/dtc.webp",
      website_url: "https://dtcgroup.in",
      description: "Commit. Deliver. Grow - Leading infrastructure and integrated township developers in Greater Kolkata.",
      display_order: 30,
      is_published: true,
    },
    {
      id: "a0000001-0000-0000-0000-000000000004",
      name: "Eden Group",
      slug: "eden",
      logo_url: "/images/partners/eden.webp",
      website_url: "https://edengroup.in",
      description: "Distinctive architectural homes across North & South Kolkata with proven legacy.",
      display_order: 40,
      is_published: true,
    },
    {
      id: "a0000001-0000-0000-0000-000000000005",
      name: "Hero Homes",
      slug: "herohomes",
      logo_url: "/images/partners/herohomes.webp",
      website_url: "https://herohomes.in",
      description: "Sustainable luxury communities and integrated high-rise wellness enclaves.",
      display_order: 50,
      is_published: true,
    },
    {
      id: "a0000001-0000-0000-0000-000000000006",
      name: "Ruchi Realty",
      slug: "ruchirealty",
      logo_url: "/images/partners/ruchirealty.webp",
      website_url: "https://ruchirealty.com",
      description: "Iconic commercial and residential landmarks with state-of-the-art community amenities.",
      display_order: 60,
      is_published: true,
    },
    {
      id: "a0000001-0000-0000-0000-000000000007",
      name: "Silver Villa",
      slug: "silvervilla",
      logo_url: "/images/partners/silvervilla.webp",
      website_url: "",
      description: "Bespoke gated villas and premium boutique residences in peaceful green corridors.",
      display_order: 70,
      is_published: true,
    },
    {
      id: "a0000001-0000-0000-0000-000000000008",
      name: "Synergy Group",
      slug: "synergy",
      logo_url: "/images/partners/synergy.webp",
      website_url: "",
      description: "Modern high-rise residential towers strategically connected to Kolkata key transit nodes.",
      display_order: 80,
      is_published: true,
    },
  ];
  const { error: partErr } = await supabase.from("partners").insert(partners);
  if (partErr) console.error("Error inserting partners:", partErr);
  else console.log(`Inserted ${partners.length} partners`);

  // 4. Properties
  console.log("Inserting properties...");
  const properties = [
    {
      id: "b1111111-1111-4111-8111-111111111111",
      slug: "sovereign-penthouse-ballygunge-circular-road",
      title: "The Sovereign Penthouse at Ballygunge Circular Road",
      location: "Ballygunge Circular Road, Ballygunge, Kolkata, West Bengal 700019",
      locality: "Ballygunge",
      price_inr: 45000000,
      price_display: "₹4.5 Cr",
      bhk_type: "4 BHK",
      property_type: "Penthouse",
      possession_status: "Ready to Move",
      furnishing_status: "Fully Furnished",
      area_sqft: 3450,
      bathrooms: 4,
      balconies: 3,
      floor: "18th out of G+18",
      facing: "South-East",
      parking: "2 Covered Basement Spaces",
      amenities: ["Private Sky Terrace", "VRV Air Conditioning", "Italian Botticino Marble", "24x7 Valet & Concierge", "Clubhouse & Heated Lap Pool", "Biometric Elevator Access"],
      landmarks: ["2 mins to CCFC (Calcutta Cricket & Football Club)", "5 mins to Quest Mall & Park Circus", "8 mins to Park Street"],
      description: "An architectural masterpiece perched atop prestigious Ballygunge Circular Road. Offering 360-degree unobstructed skyline views, expansive double-height ceilings, bespoke Italian marble flooring, and an expansive private landscaped terrace lounge. Fully clear title with Occupancy Certificate.",
      category: "Exclusive",
      status: "Available",
      main_image: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg",
      main_image_thumb: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg",
      developer_name: "Apex Signature Collection",
      instagram_url: "https://www.instagram.com",
      is_featured: true,
      is_published: true,
    },
    {
      id: "b2222222-2222-4222-8222-222222222222",
      slug: "the-grand-manor-alipore-4bhk",
      title: "The Grand Manor 4 BHK Luxury Residence",
      location: "Alipore Park Place, Alipore, Kolkata, West Bengal 700027",
      locality: "Alipore",
      price_inr: 38000000,
      price_display: "₹3.8 Cr",
      bhk_type: "4 BHK",
      property_type: "Apartment",
      possession_status: "Ready to Move",
      furnishing_status: "Semi-Furnished",
      area_sqft: 2850,
      bathrooms: 4,
      balconies: 2,
      floor: "7th out of G+12",
      facing: "South",
      parking: "2 Covered Reserved Bays",
      amenities: ["High-Ceiling Suites", "Private Elevator Foyer", "Temperature-Controlled Pool", "Lush Zen Garden", "EV Fast Charging Station", "24/7 Monitored Security"],
      landmarks: ["3 mins to Woodlands Hospital", "5 mins to Taj Bengal Hotel", "8 mins to Agri-Horticultural Society Gardens"],
      description: "Nestled in Kolkata most coveted, tree-lined residential enclave. Crafted for discerning families seeking timeless luxury and serene privacy. Boasts floor-to-ceiling double glazed acoustic windows, Burma teak joinery, modular Poggenpohl kitchen, and private staff quarters.",
      category: "Resale",
      status: "Available",
      main_image: "/images/properties/luxury_living_room_1790945888128.jpg",
      main_image_thumb: "/images/properties/luxury_living_room_1790945888128.jpg",
      developer_name: "Eden Luxe Group",
      instagram_url: "https://www.instagram.com",
      is_featured: true,
      is_published: true,
    },
    {
      id: "b3333333-3333-4333-8333-333333333333",
      slug: "the-horizon-executive-suite-salt-lake-sector-v",
      title: "The Horizon Executive Suite at Salt Lake Sector V",
      location: "Sector V, Bidhannagar, Salt Lake City, Kolkata, West Bengal 700091",
      locality: "Salt Lake",
      price_inr: 22000000,
      price_display: "₹2.2 Cr",
      bhk_type: "Commercial Office Space",
      property_type: "Commercial",
      possession_status: "Available",
      furnishing_status: "Fully Furnished",
      area_sqft: 1850,
      bathrooms: 2,
      balconies: 1,
      floor: "12th out of G+24",
      facing: "East",
      parking: "2 Multi-Level Car Parking",
      amenities: ["Grade-A Tech Park Infrastructure", "100% DG Power Backup", "High-Speed Mitsubishi Lifts", "Executive Boardroom & Conference Suites", "Central HVAC Air Handling", "Visitor RFID Turnstiles"],
      landmarks: ["1 min to Sector V Metro Station", "5 mins to Eastern Metropolitan Bypass", "15 mins to Netaji Subhash Chandra Bose Airport"],
      description: "Turnkey corporate headquarters located in the epicenter of Kolkata technology and financial district. Fully fitted with 26 ergonomic workstations, 2 director cabins, acoustic video conference boardroom, server room, and executive kitchenette. Exceptional commercial rental yield.",
      category: "Commercial",
      status: "Available",
      main_image: "/images/properties/luxury_commercial_office_1790945944683.jpg",
      main_image_thumb: "/images/properties/luxury_commercial_office_1790945944683.jpg",
      developer_name: "Synergy Commercial Assets",
      instagram_url: "https://www.instagram.com",
      is_featured: true,
      is_published: true,
    },
    {
      id: "b4444444-4444-4444-8444-444444444444",
      slug: "parkside-garden-residence-lake-town-3bhk",
      title: "Parkside Garden Residence 3 BHK in Lake Town",
      location: "Block B, Lake Town, South Dum Dum, Kolkata, West Bengal 700089",
      locality: "Lake Town",
      price_inr: 12500000,
      price_display: "₹1.25 Cr",
      bhk_type: "3 BHK",
      property_type: "Apartment",
      possession_status: "Ready to Move",
      furnishing_status: "Semi-Furnished",
      area_sqft: 1520,
      bathrooms: 3,
      balconies: 2,
      floor: "4th out of G+8",
      facing: "North-East",
      parking: "1 Covered Reserved Parking",
      amenities: ["Rooftop Infinity Deck", "Children Play Arena", "Gymnasium & Yoga Studio", "24x7 Gated Security & CCTV", "Rainwater Harvesting", "100% Vastu Compliant"],
      landmarks: ["2 mins to Lake Town Clock Tower & Jaya Cinema", "5 mins to VIP Road Hub", "10 mins to Ultadanga Rail Junction"],
      description: "A radiant, cross-ventilated 3 BHK apartment fronting serene residential avenues. Designed with expansive master suite, walk-in dressing niche, German-engineered modular fittings, and covered parking. Clear KMC title, ready for immediate occupation.",
      category: "Resale",
      status: "Available",
      main_image: "/images/properties/luxury_building_facade_1790945914790.jpg",
      main_image_thumb: "/images/properties/luxury_building_facade_1790945914790.jpg",
      developer_name: "Auricas Developments",
      instagram_url: "https://www.instagram.com",
      is_featured: true,
      is_published: true,
    },
    {
      id: "b5555555-5555-4555-8555-555555555555",
      slug: "botanica-signature-tower-new-town-3bhk",
      title: "Botanica Signature Tower 3 BHK in New Town Action Area 1",
      location: "Action Area 1, Near Axis Mall, New Town, Kolkata, West Bengal 700156",
      locality: "New Town",
      price_inr: 16500000,
      price_display: "₹1.65 Cr",
      bhk_type: "3 BHK",
      property_type: "Apartment",
      possession_status: "Under Construction",
      furnishing_status: "Unfurnished",
      area_sqft: 1780,
      bathrooms: 3,
      balconies: 2,
      floor: "9th out of G+20",
      facing: "South-East",
      parking: "1 Covered Parking",
      amenities: ["Smart Home Automation System", "Heated Swimming Pool", "Tennis & Squash Courts", "Grand Banquet Hall", "Solar Common Areas", "Dedicated Jogging Track"],
      landmarks: ["3 mins to Axis Mall & Novotel Hotel", "7 mins to Biswa Bangla Gate & Eco Park", "15 mins to International Airport"],
      description: "State-of-the-art green-certified residential tower in New Town prime Action Area 1. Designed by renowned Singaporean master planners with sun-drenched private balconies, high acoustic insulation, and world-class sports club. Handover Q4 2026.",
      category: "New Launch",
      status: "Available",
      main_image: "/images/properties/facade.jpg",
      main_image_thumb: "/images/properties/facade.jpg",
      developer_name: "Hero Homes Bengal",
      instagram_url: "https://www.instagram.com",
      is_featured: false,
      is_published: true,
    },
    {
      id: "b6666666-6666-4666-8666-666666666666",
      slug: "belvedere-terrace-kasba-2bhk",
      title: "The Belvedere Terrace 2 BHK in Kasba near Acropolis Mall",
      location: "Rajdanga Main Road, Kasba, Kolkata, West Bengal 700107",
      locality: "Kasba",
      price_inr: 8800000,
      price_display: "₹88 L",
      bhk_type: "2 BHK",
      property_type: "Apartment",
      possession_status: "Ready to Move",
      furnishing_status: "Fully Furnished",
      area_sqft: 1100,
      bathrooms: 2,
      balconies: 1,
      floor: "3rd out of G+6",
      facing: "East",
      parking: "1 Open Parking Space",
      amenities: ["Boutique Gated Community", "Automatic Lift by Otis", "Designer Modular Kitchen", "24/7 Security Personnel", "Intercom & CCTV System"],
      landmarks: ["3 mins to Acropolis Mall & Geetanjali Stadium", "5 mins to Ruby Hospital & EM Bypass", "10 mins to Gariahat Market"],
      description: "An impeccably styled, turn-key 2 BHK apartment in prime South Kolkata. High walkability to retail avenues, leading medical facilities, and Metro corridors. Low maintenance, verified municipal records, ideal for families or high-yield rental portfolios.",
      category: "Resale",
      status: "Available",
      main_image: "/images/properties/living.jpg",
      main_image_thumb: "/images/properties/living.jpg",
      developer_name: "Boutique Living Kolkata",
      instagram_url: "https://www.instagram.com",
      is_featured: false,
      is_published: true,
    },
  ];
  const { error: propErr } = await supabase.from("properties").insert(properties);
  if (propErr) console.error("Error inserting properties:", propErr);
  else console.log(`Inserted ${properties.length} properties`);

  // 5. Property Images
  console.log("Inserting property gallery images...");
  const images = [
    { id: "c1111111-1111-0001-0000-000000000001", property_id: "b1111111-1111-4111-8111-111111111111", sort_order: 1, caption: "Skyline Terrace Deck", alt_text: "Private landscaped terrace", image_url: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg", thumb_url: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg" },
    { id: "c1111111-1111-0001-0000-000000000002", property_id: "b1111111-1111-4111-8111-111111111111", sort_order: 2, caption: "Grand Salon Living", alt_text: "Double height living room", image_url: "/images/properties/luxury_living_room_1790945888128.jpg", thumb_url: "/images/properties/luxury_living_room_1790945888128.jpg" },
    { id: "c1111111-1111-0001-0000-000000000003", property_id: "b1111111-1111-4111-8111-111111111111", sort_order: 3, caption: "Tower Architectural Facade", alt_text: "Luxury building exterior", image_url: "/images/properties/luxury_building_facade_1790945914790.jpg", thumb_url: "/images/properties/luxury_building_facade_1790945914790.jpg" },
    { id: "c1111111-1111-0001-0000-000000000004", property_id: "b1111111-1111-4111-8111-111111111111", sort_order: 4, caption: "Executive Home Library", alt_text: "Study and meeting lounge", image_url: "/images/properties/luxury_commercial_office_1790945944683.jpg", thumb_url: "/images/properties/luxury_commercial_office_1790945944683.jpg" },

    { id: "c2222222-2222-0002-0000-000000000001", property_id: "b2222222-2222-4222-8222-222222222222", sort_order: 1, caption: "Formal Drawing Room", alt_text: "Alipore luxury formal salon", image_url: "/images/properties/luxury_living_room_1790945888128.jpg", thumb_url: "/images/properties/luxury_living_room_1790945888128.jpg" },
    { id: "c2222222-2222-0002-0000-000000000002", property_id: "b2222222-2222-4222-8222-222222222222", sort_order: 2, caption: "Sunlit Verandah Suite", alt_text: "Verandah with greenery", image_url: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg", thumb_url: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg" },
    { id: "c2222222-2222-0002-0000-000000000003", property_id: "b2222222-2222-4222-8222-222222222222", sort_order: 3, caption: "Gated Manor Elevation", alt_text: "Alipore facade entrance", image_url: "/images/properties/facade.jpg", thumb_url: "/images/properties/facade.jpg" },

    { id: "c3333333-3333-0003-0000-000000000001", property_id: "b3333333-3333-4333-8333-333333333333", sort_order: 1, caption: "Executive Suite Floor", alt_text: "Modern corporate workstations", image_url: "/images/properties/luxury_commercial_office_1790945944683.jpg", thumb_url: "/images/properties/luxury_commercial_office_1790945944683.jpg" },
    { id: "c3333333-3333-0003-0000-000000000002", property_id: "b3333333-3333-4333-8333-333333333333", sort_order: 2, caption: "Commercial Tech Park Tower", alt_text: "High-rise glass facade", image_url: "/images/properties/luxury_building_facade_1790945914790.jpg", thumb_url: "/images/properties/luxury_building_facade_1790945914790.jpg" },

    { id: "c4444444-4444-0004-0000-000000000001", property_id: "b4444444-4444-4444-8444-444444444444", sort_order: 1, caption: "Residence Front Elevation", alt_text: "Lake Town building exterior", image_url: "/images/properties/luxury_building_facade_1790945914790.jpg", thumb_url: "/images/properties/luxury_building_facade_1790945914790.jpg" },
    { id: "c4444444-4444-0004-0000-000000000002", property_id: "b4444444-4444-4444-8444-444444444444", sort_order: 2, caption: "Spacious Living Lounge", alt_text: "Well-lit living room", image_url: "/images/properties/living.jpg", thumb_url: "/images/properties/living.jpg" },

    { id: "c5555555-5555-0005-0000-000000000001", property_id: "b5555555-5555-4555-8555-555555555555", sort_order: 1, caption: "Architectural Facade Rendering", alt_text: "New Town tower design", image_url: "/images/properties/facade.jpg", thumb_url: "/images/properties/facade.jpg" },
    { id: "c5555555-5555-0005-0000-000000000002", property_id: "b5555555-5555-4555-8555-555555555555", sort_order: 2, caption: "Show Apartment Living", alt_text: "Modern interior lounge", image_url: "/images/properties/luxury_living_room_1790945888128.jpg", thumb_url: "/images/properties/luxury_living_room_1790945888128.jpg" },

    { id: "c6666666-6666-0006-0000-000000000001", property_id: "b6666666-6666-4666-8666-666666666666", sort_order: 1, caption: "Furnished 2 BHK Hall", alt_text: "Kasba flat interior", image_url: "/images/properties/living.jpg", thumb_url: "/images/properties/living.jpg" },
    { id: "c6666666-6666-0006-0000-000000000002", property_id: "b6666666-6666-4666-8666-666666666666", sort_order: 2, caption: "Boutique Building Elevation", alt_text: "Quiet residential lane facade", image_url: "/images/properties/luxury_building_facade_1790945914790.jpg", thumb_url: "/images/properties/luxury_building_facade_1790945914790.jpg" }
  ];
  const { error: imgErr } = await supabase.from("property_images").insert(images);
  if (imgErr) console.error("Error inserting images:", imgErr);
  else console.log(`Inserted ${images.length} gallery images`);

  // 6. Reels
  console.log("Inserting reels...");
  const reels = [
    {
      id: "reel-ballygunge-penthouse",
      title: "Ballygunge Duplex Penthouse Architectural Tour",
      reel_url: "https://www.instagram.com",
      embed_url: "https://www.instagram.com",
      cover_image: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg",
      cover_thumb: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg",
      display_order: 10,
      is_published: true,
    },
    {
      id: "reel-alipore-manor",
      title: "Alipore Signature 4 BHK Private Residence Walkthrough",
      reel_url: "https://www.instagram.com",
      embed_url: "https://www.instagram.com",
      cover_image: "/images/properties/luxury_living_room_1790945888128.jpg",
      cover_thumb: "/images/properties/luxury_living_room_1790945888128.jpg",
      display_order: 20,
      is_published: true,
    },
    {
      id: "reel-saltlake-office",
      title: "Sector V High-Rise Commercial Floor Inspection",
      reel_url: "https://www.instagram.com",
      embed_url: "https://www.instagram.com",
      cover_image: "/images/properties/luxury_commercial_office_1790945944683.jpg",
      cover_thumb: "/images/properties/luxury_commercial_office_1790945944683.jpg",
      display_order: 30,
      is_published: true,
    },
  ];
  const { error: reelErr } = await supabase.from("reels").insert(reels);
  if (reelErr) console.error("Error inserting reels:", reelErr);
  else console.log(`Inserted ${reels.length} reels`);

  // 7. Blog Posts
  console.log("Inserting journal posts...");
  const posts = [
    {
      id: "post-market-outlook-2025",
      slug: "kolkata-luxury-real-estate-market-outlook-2025",
      title: "Kolkata Luxury Real Estate Market Outlook 2025: Ballygunge, Alipore & New Town",
      publish_date: "2026-02-15",
      author: "Apex Living Research",
      cover_image: "/images/properties/luxury_building_facade_1790945914790.jpg",
      cover_thumb: "/images/properties/luxury_building_facade_1790945914790.jpg",
      content: `# Kolkata Luxury Real Estate Market Outlook 2025\n\nThe luxury housing segment in Kolkata has entered an unprecedented phase of quality consolidation. Driven by high-net-worth individuals, returning global NRIs, and industrialists seeking legacy assets, the demand for verified, clear-titled penthouses and low-density gated residences is outstripping supply.\n\n## 1. Prime Corridors: Alipore & Ballygunge\nHeritage South Kolkata postal codes remain the benchmark for generational wealth. Average capital values in prime Ballygunge Circular Road and Queens Park have seen resilient 12-14% year-on-year appreciation, primarily driven by land scarcity. Buyers here prioritize:\n- Freehold land tenure and clear KMC mutation records\n- Boutique low-density developments with only 1-2 apartments per floor\n- Dedicated servant quarters and high-capacity EV charging infrastructure\n\n## 2. The Rise of New Town & EM Bypass High-Rises\nFor modern corporate leaders and tech entrepreneurs, Action Area 1 and 2 in New Town represent the city planned future. With wide arterial boulevards, seamless connectivity to Netaji Subhash Chandra Bose International Airport, and major corporate campuses, modern luxury gated townships are commanding record absorption rates.`,
      excerpt: "A strategic analysis of high-end property appreciation, rental yields, and shifting NRI demand across Kolkata premier postal codes.",
      is_published: true,
    },
    {
      id: "post-due-diligence-checklist",
      slug: "essential-due-diligence-checklist-buying-property-kolkata",
      title: "The 10-Point Legal Due Diligence Checklist for Buying Real Estate in Bengal",
      publish_date: "2026-02-28",
      author: "Legal Advisory Desk",
      cover_image: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg",
      cover_thumb: "/images/properties/luxury_penthouse_terrace_1790945979055.jpg",
      content: `# The 10-Point Legal Due Diligence Checklist for Real Estate in Bengal\n\nPurchasing real estate in West Bengal requires rigorous title inspection. Unlike standardized institutional markets, Kolkata properties often have layered ownership histories spanning decades. Here is our mandatory 10-point audit framework.\n\n### 1. 30-Year Search Report\nAlways commission an exhaustive title search going back at least 30 years across the Registrar of Assurances and local District Registrar offices to ensure no undisclosed mortgages or lis pendens litigations exist.\n\n### 2. KMC / Municipal Corporation Mutation\nConfirm that the vendor name is duly recorded in the municipal mutation records with an up-to-date property tax receipt (Khajana / Tax clearance certificate).\n\n### 3. Sanctioned Building Plan & Completion Certificate (CC)\nVerify that the construction strictly adheres to the approved municipal sanction plan. Never purchase an apartment without an Occupancy Certificate (OC) or Completion Certificate (CC).\n\n### 4. WBRERA Compliance\nFor new developments, verify the registration status on the official WBRERA portal to track promoter escrow accounts and milestone timelines.`,
      excerpt: "From RERA validation and municipal mutation records to 30-year registrar searches, here is how we protect our clients against title disputes.",
      is_published: true,
    },
    {
      id: "post-commercial-vs-residential",
      slug: "commercial-space-vs-residential-yields-salt-lake-sector-v",
      title: "Commercial Real Estate vs Premium Residential: Where Should Capital Flow?",
      publish_date: "2026-03-10",
      author: "Investment Strategy Team",
      cover_image: "/images/properties/luxury_commercial_office_1790945944683.jpg",
      cover_thumb: "/images/properties/luxury_commercial_office_1790945944683.jpg",
      content: `# Commercial Real Estate vs Premium Residential\n\nInvestors frequently ask our desk whether to deploy 2-5 Crores into grade-A office space in Sector V or prime residential real estate in South Kolkata. Both asset classes serve distinct portfolio objectives.\n\n## Commercial Real Estate (Salt Lake Sector V & Rajarhat)\n- **Net Rental Yields**: 8.0% - 9.5% per annum\n- **Lease Durations**: 3 to 9 years with 15% escalation every 3 years\n- **Ideal For**: Regular monthly cash flow, corporate tenants, inflation-hedged yields\n\n## Premium Residential (Ballygunge, Alipore)\n- **Net Rental Yields**: 2.5% - 3.5% per annum\n- **Capital Appreciation**: 10% - 15% annual compounding in supply-constrained micro-markets\n- **Ideal For**: Long-term generational wealth preservation, legacy family living`,
      excerpt: "Comparing net rental yields, tenant retention periods, and capital gains in Kolkata tech corridor vs heritage South Kolkata.",
      is_published: true,
    },
  ];
  const { error: postErr } = await supabase.from("blog_posts").insert(posts);
  if (postErr) console.error("Error inserting posts:", postErr);
  else console.log(`Inserted ${posts.length} journal posts`);

  // 8. Testimonials
  console.log("Inserting testimonials...");
  const testimonials = [
    {
      id: "d1111111-1111-0001-0000-000000000001",
      client_name: "Debashis & Sharmila Mukherjee",
      client_location: "Ballygunge Park, Kolkata",
      rating: 5,
      review_text: "Finding a clear-titled penthouse in South Kolkata was exhausting until we engaged Apex Living. Their advisor personally verified the municipality mutation and structural documents before we even set foot on the terrace. Truly world-class advisory.",
      review_date: "2026-01-15",
      client_photo: "",
      is_published: true,
    },
    {
      id: "d2222222-2222-0002-0000-000000000002",
      client_name: "Rahul Agarwal",
      client_location: "London, UK (NRI Investor)",
      rating: 5,
      review_text: "Being an NRI in London, buying property in Kolkata was fraught with uncertainty. The Apex Living team coordinated virtual live video walkthroughs, verified RERA sanction plans with their legal team, and managed the transaction with complete transparency.",
      review_date: "2026-02-02",
      client_photo: "",
      is_published: true,
    },
    {
      id: "d3333333-3333-0003-0000-000000000003",
      client_name: "Ananya Sengupta",
      client_location: "Alipore, Kolkata",
      rating: 5,
      review_text: "Sold our family residence through their private mandate. No spam calls, zero mass listings on open portals. They introduced two vetted, serious buyers and completed the sale registration smoothly within four weeks.",
      review_date: "2026-02-18",
      client_photo: "",
      is_published: true,
    },
    {
      id: "d4444444-4444-0004-0000-000000000004",
      client_name: "Vikram Singhania",
      client_location: "Salt Lake Sector V",
      rating: 5,
      review_text: "Helped our firm acquire commercial office space in Sector V. From valuation negotiations to lease drafting and vetting, their advisory standards are comparable to top global property consultants.",
      review_date: "2026-03-01",
      client_photo: "",
      is_published: true,
    },
  ];
  const { error: testErr } = await supabase.from("testimonials").insert(testimonials);
  if (testErr) console.error("Error inserting testimonials:", testErr);
  else console.log(`Inserted ${testimonials.length} testimonials`);

  // 9. FAQs
  console.log("Inserting FAQs...");
  const faqs = [
    {
      id: "faq-1",
      question: "How does Apex Living verify property titles before listing?",
      answer: "Every residence in our inventory undergoes a multi-point legal audit conducted by senior property advocates. We verify 30-year search records at the Registrar of Assurances, municipal tax mutation clearances, sanctioned architectural plans, and WBRERA registration numbers. Only properties with 100% marketable titles are listed.",
      category: "Legal & Verification",
      display_order: 10,
      is_published: true,
    },
    {
      id: "faq-2",
      question: "Can Non-Resident Indians (NRIs) purchase residential property in Kolkata?",
      answer: "Yes. Under RBI guidelines and FEMA regulations, NRIs and OCIs can purchase residential and commercial properties in India with funds remitted through normal banking channels (NRE/NRO accounts). Our desk provides end-to-end assistance including video walkthroughs, power of attorney (PoA) registration, and repatriation guidance.",
      category: "NRI Advisory",
      display_order: 20,
      is_published: true,
    },
    {
      id: "faq-3",
      question: "What are the stamp duty and registration charges in West Bengal?",
      answer: "Stamp duty in West Bengal generally ranges between 5% and 7% depending on property valuation and municipal jurisdiction, plus a 1% registration fee. Our advisory desk provides a precise transaction cost breakdown including legal and assessment fees before you sign any commitment.",
      category: "Financial & Taxes",
      display_order: 30,
      is_published: true,
    },
    {
      id: "faq-4",
      question: "How do you schedule private site visits and architectural inspections?",
      answer: "You can schedule a private visit directly through any property page or by contacting our concierge on WhatsApp. We arrange private escorted tours with senior property advisors who provide detailed architectural drawings, building specifications, and neighborhood dossiers.",
      category: "Services & Visits",
      display_order: 40,
      is_published: true,
    },
    {
      id: "faq-5",
      question: "How is Apex Living different from open listing portals and brokers?",
      answer: "Open portals prioritize ad volume, often listing unverified or duplicate properties. Apex Living operates as a boutique advisory: every listing is personally inspected, legally vetted, photographed on-site, and handled by a dedicated relationship manager. We never sell your contact details or spam your phone.",
      category: "About Advisory",
      display_order: 50,
      is_published: true,
    },
    {
      id: "faq-6",
      question: "Do you assist with banking valuations and home loan processing?",
      answer: "Yes. We work directly with leading private and public banks (including HDFC, ICICI, SBI, and Kotak) to expedite property appraisal, legal search approval, and preferential home loan disbursement for our clients.",
      category: "Financial & Taxes",
      display_order: 60,
      is_published: true,
    },
  ];
  const { error: faqErr } = await supabase.from("faqs").insert(faqs);
  if (faqErr) console.error("Error inserting FAQs:", faqErr);
  else console.log(`Inserted ${faqs.length} FAQs`);

  console.log("ALL DEMO DATA SUCCESSFULLY SEEDED INTO SUPABASE!");
}

run().catch((err) => {
  console.error("FATAL ERROR in seed:", err);
  process.exit(1);
});
