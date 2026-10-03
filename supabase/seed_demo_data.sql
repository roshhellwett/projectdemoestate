-- ==============================================================================
-- CLEAN DEMO SEED FOR APEX LIVING REAL ESTATE ADVISORY
-- ==============================================================================

BEGIN;

-- 1. Truncate / delete all existing rows
DELETE FROM enquiries;
DELETE FROM property_images;
DELETE FROM property_videos;
DELETE FROM properties;
DELETE FROM reels;
DELETE FROM blog_posts;
DELETE FROM testimonials;
DELETE FROM faqs;
DELETE FROM partners;
DELETE FROM site_settings;

-- 2. Insert Site Settings
INSERT INTO site_settings (key, value, updated_at) VALUES
  ('brand_name', 'Apex Living', NOW()),
  ('tagline', 'Luxury Real Estate Advisory · Kolkata', NOW()),
  ('hero_eyebrow', 'Kolkata · Verified Architectural Inventory', NOW()),
  ('hero_title', 'Homes worth the grand tour.', NOW()),
  ('hero_subtitle', 'Hand-verified flats, penthouses and commercial spaces across Kolkata. Every listing walked through, every paper checked.', NOW()),
  ('city', 'Kolkata, West Bengal', NOW()),
  ('email', 'zenithprojects@icloud.com', NOW()),
  ('phone', '+91 98000 00000', NOW()),
  ('whatsapp_number', '+91 98000 00000', NOW()),
  ('instagram_handle', 'apexliving.demo', NOW()),
  ('instagram_url', 'https://www.instagram.com', NOW()),
  ('facebook_url', 'https://www.facebook.com', NOW()),
  ('youtube_url', 'https://www.youtube.com', NOW()),
  ('footer_note', 'Verified luxury listings. Transparent advisory. Zero compromise on title clarity.', NOW()),
  ('about_intro', 'Apex Living is a Kolkata-based luxury real estate advisory. We verify every residence in person—structural integrity, municipality sanctions, and historical title records—so buyers engage only with genuine opportunities, and sellers deal with qualified buyers.', NOW()),
  ('about_stat_1_value', '100%', NOW()),
  ('about_stat_1_label', 'Verified Title Records', NOW()),
  ('about_stat_1_note', 'KMC mutation, land tenure, and RERA sanction validated before listing.', NOW()),
  ('about_stat_2_value', '1 : 1', NOW()),
  ('about_stat_2_label', 'Senior Advisory Desk', NOW()),
  ('about_stat_2_note', 'A dedicated real estate advisor directs your search and transaction end-to-end.', NOW()),
  ('about_stat_3_value', 'Kolkata', NOW()),
  ('about_stat_3_label', 'Hyperlocal Authority', NOW()),
  ('about_stat_3_note', 'Deep knowledge of Alipore, Ballygunge, New Town, and EM Bypass corridors.', NOW()),
  ('cta_title', 'Selling or leasing a prime property?', NOW()),
  ('cta_subtitle', 'Fair valuation, qualified prospective buyers, discreet private mandates.', NOW()),
  ('sell_intro', 'Discerning buyers and NRIs look to us for verified prime residences. We provide professional architectural photography, legal vetting, and discreet marketing.', NOW()),
  ('partner_intro', 'Institutional developers, leading architects, and premier lenders collaborate with Apex Living to reach qualified real estate patrons.', NOW()),
  ('journal_intro', 'In-depth market notes, regulatory updates, and architectural guides on Kolkata real estate.', NOW()),
  ('properties_intro', 'Filter by locality, configuration, and budget. Every residence verified on-ground.', NOW());

-- 3. Insert Partners
INSERT INTO partners (id, name, slug, logo_url, website_url, description, display_order, is_published, created_at) VALUES
  ('a0000001-0000-0000-0000-000000000001', 'Auricas', 'auricas', '/images/partners/auricas.webp', 'https://auricas.com', 'Crafting Golden Spaces - Premium residential developments across Kolkata', 10, true, NOW()),
  ('a0000001-0000-0000-0000-000000000002', 'CREDAI Kolkata', 'credai', '/images/partners/credai.webp', 'https://credaibengal.in', 'Apex body for private real estate developers, setting ethical standards and construction excellence across Bengal.', 20, true, NOW()),
  ('a0000001-0000-0000-0000-000000000003', 'DTC Group', 'dtc', '/images/partners/dtc.webp', 'https://dtcgroup.in', 'Commit. Deliver. Grow - Leading infrastructure and integrated township developers in Greater Kolkata.', 30, true, NOW()),
  ('a0000001-0000-0000-0000-000000000004', 'Eden Group', 'eden', '/images/partners/eden.webp', 'https://edengroup.in', 'Distinctive architectural homes across North & South Kolkata with proven legacy.', 40, true, NOW()),
  ('a0000001-0000-0000-0000-000000000005', 'Hero Homes', 'herohomes', '/images/partners/herohomes.webp', 'https://herohomes.in', 'Sustainable luxury communities and integrated high-rise wellness enclaves.', 50, true, NOW()),
  ('a0000001-0000-0000-0000-000000000006', 'Ruchi Realty', 'ruchirealty', '/images/partners/ruchirealty.webp', 'https://ruchirealty.com', 'Iconic commercial and residential landmarks with state-of-the-art community amenities.', 60, true, NOW()),
  ('a0000001-0000-0000-0000-000000000007', 'Silver Villa', 'silvervilla', '/images/partners/silvervilla.webp', '', 'Bespoke gated villas and premium boutique residences in peaceful green corridors.', 70, true, NOW()),
  ('a0000001-0000-0000-0000-000000000008', 'Synergy Group', 'synergy', '/images/partners/synergy.webp', '', 'Modern high-rise residential towers strategically connected to Kolkata key transit nodes.', 80, true, NOW());

-- 4. Insert Verified Properties
INSERT INTO properties (
  id, slug, title, location, locality, price_inr, price_display, bhk_type, property_type,
  possession_status, furnishing_status, area_sqft, bathrooms, balconies, floor, facing,
  parking, amenities, landmarks, description, category, status, main_image, main_image_thumb,
  developer_name, instagram_url, is_featured, is_published, created_at, updated_at
) VALUES
  (
    'b1111111-1111-4111-8111-111111111111',
    'sovereign-penthouse-ballygunge-circular-road',
    'The Sovereign Penthouse at Ballygunge Circular Road',
    'Ballygunge Circular Road, Ballygunge, Kolkata, West Bengal 700019',
    'Ballygunge',
    45000000,
    '₹4.5 Cr',
    '4 BHK',
    'Penthouse',
    'Ready to Move',
    'Fully Furnished',
    3450,
    4,
    3,
    '18th out of G+18',
    'South-East',
    '2 Covered Basement Spaces',
    ARRAY['Private Sky Terrace', 'VRV Air Conditioning', 'Italian Botticino Marble', '24x7 Valet & Concierge', 'Clubhouse & Heated Lap Pool', 'Biometric Elevator Access'],
    ARRAY['2 mins to CCFC (Calcutta Cricket & Football Club)', '5 mins to Quest Mall & Park Circus', '8 mins to Park Street'],
    'An architectural masterpiece perched atop prestigious Ballygunge Circular Road. Offering 360-degree unobstructed skyline views, expansive double-height ceilings, bespoke Italian marble flooring, and an expansive private landscaped terrace lounge. Fully clear title with Occupancy Certificate.',
    'Exclusive',
    'Available',
    '/images/properties/luxury_penthouse_terrace_1790945979055.jpg',
    '/images/properties/luxury_penthouse_terrace_1790945979055.jpg',
    'Apex Signature Collection',
    'https://www.instagram.com',
    true,
    true,
    NOW() - INTERVAL '1 day',
    NOW()
  ),
  (
    'b2222222-2222-4222-8222-222222222222',
    'the-grand-manor-alipore-4bhk',
    'The Grand Manor 4 BHK Luxury Residence',
    'Alipore Park Place, Alipore, Kolkata, West Bengal 700027',
    'Alipore',
    38000000,
    '₹3.8 Cr',
    '4 BHK',
    'Apartment',
    'Ready to Move',
    'Semi-Furnished',
    2850,
    4,
    2,
    '7th out of G+12',
    'South',
    '2 Covered Reserved Bays',
    ARRAY['High-Ceiling Suites', 'Private Elevator Foyer', 'Temperature-Controlled Pool', 'Lush Zen Garden', 'EV Fast Charging Station', '24/7 Monitored Security'],
    ARRAY['3 mins to Woodlands Hospital', '5 mins to Taj Bengal Hotel', '8 mins to Agri-Horticultural Society Gardens'],
    'Nestled in Kolkata most coveted, tree-lined residential enclave. Crafted for discerning families seeking timeless luxury and serene privacy. Boasts floor-to-ceiling double glazed acoustic windows, Burma teak joinery, modular Poggenpohl kitchen, and private staff quarters.',
    'Resale',
    'Available',
    '/images/properties/luxury_living_room_1790945888128.jpg',
    '/images/properties/luxury_living_room_1790945888128.jpg',
    'Eden Luxe Group',
    'https://www.instagram.com',
    true,
    true,
    NOW() - INTERVAL '2 days',
    NOW()
  ),
  (
    'b3333333-3333-4333-8333-333333333333',
    'the-horizon-executive-suite-salt-lake-sector-v',
    'The Horizon Executive Suite at Salt Lake Sector V',
    'Sector V, Bidhannagar, Salt Lake City, Kolkata, West Bengal 700091',
    'Salt Lake',
    22000000,
    '₹2.2 Cr',
    'Commercial Office Space',
    'Commercial',
    'Available',
    'Fully Furnished',
    1850,
    2,
    1,
    '12th out of G+24',
    'East',
    '2 Multi-Level Car Parking',
    ARRAY['Grade-A Tech Park Infrastructure', '100% DG Power Backup', 'High-Speed Mitsubishi Lifts', 'Executive Boardroom & Conference Suites', 'Central HVAC Air Handling', 'Visitor RFID Turnstiles'],
    ARRAY['1 min to Sector V Metro Station', '5 mins to Eastern Metropolitan Bypass', '15 mins to Netaji Subhash Chandra Bose Airport'],
    'Turnkey corporate headquarters located in the epicenter of Kolkata technology and financial district. Fully fitted with 26 ergonomic workstations, 2 director cabins, acoustic video conference boardroom, server room, and executive kitchenette. Exceptional commercial rental yield.',
    'Commercial',
    'Available',
    '/images/properties/luxury_commercial_office_1790945944683.jpg',
    '/images/properties/luxury_commercial_office_1790945944683.jpg',
    'Synergy Commercial Assets',
    'https://www.instagram.com',
    true,
    true,
    NOW() - INTERVAL '3 days',
    NOW()
  ),
  (
    'b4444444-4444-4444-8444-444444444444',
    'parkside-garden-residence-lake-town-3bhk',
    'Parkside Garden Residence 3 BHK in Lake Town',
    'Block B, Lake Town, South Dum Dum, Kolkata, West Bengal 700089',
    'Lake Town',
    12500000,
    '₹1.25 Cr',
    '3 BHK',
    'Apartment',
    'Ready to Move',
    'Semi-Furnished',
    1520,
    3,
    2,
    '4th out of G+8',
    'North-East',
    '1 Covered Reserved Parking',
    ARRAY['Rooftop Infinity Deck', 'Children Play Arena', 'Gymnasium & Yoga Studio', '24x7 Gated Security & CCTV', 'Rainwater Harvesting', '100% Vastu Compliant'],
    ARRAY['2 mins to Lake Town Clock Tower & Jaya Cinema', '5 mins to VIP Road Hub', '10 mins to Ultadanga Rail Junction'],
    'A radiant, cross-ventilated 3 BHK apartment fronting serene residential avenues. Designed with expansive master suite, walk-in dressing niche, German-engineered modular fittings, and covered parking. Clear KMC title, ready for immediate occupation.',
    'Resale',
    'Available',
    '/images/properties/luxury_building_facade_1790945914790.jpg',
    '/images/properties/luxury_building_facade_1790945914790.jpg',
    'Auricas Developments',
    'https://www.instagram.com',
    true,
    true,
    NOW() - INTERVAL '4 days',
    NOW()
  ),
  (
    'b5555555-5555-4555-8555-555555555555',
    'botanica-signature-tower-new-town-3bhk',
    'Botanica Signature Tower 3 BHK in New Town Action Area 1',
    'Action Area 1, Near Axis Mall, New Town, Kolkata, West Bengal 700156',
    'New Town',
    16500000,
    '₹1.65 Cr',
    '3 BHK',
    'Apartment',
    'Under Construction',
    'Unfurnished',
    1780,
    3,
    2,
    '9th out of G+20',
    'South-East',
    '1 Covered Parking',
    ARRAY['Smart Home Automation System', 'Heated Swimming Pool', 'Tennis & Squash Courts', 'Grand Banquet Hall', 'Solar Common Areas', 'Dedicated Jogging Track'],
    ARRAY['3 mins to Axis Mall & Novotel Hotel', '7 mins to Biswa Bangla Gate & Eco Park', '15 mins to International Airport'],
    'State-of-the-art green-certified residential tower in New Town prime Action Area 1. Designed by renowned Singaporean master planners with sun-drenched private balconies, high acoustic insulation, and world-class sports club. Handover Q4 2026.',
    'New Launch',
    'Available',
    '/images/properties/facade.jpg',
    '/images/properties/facade.jpg',
    'Hero Homes Bengal',
    'https://www.instagram.com',
    false,
    true,
    NOW() - INTERVAL '5 days',
    NOW()
  ),
  (
    'b6666666-6666-4666-8666-666666666666',
    'belvedere-terrace-kasba-2bhk',
    'The Belvedere Terrace 2 BHK in Kasba near Acropolis Mall',
    'Rajdanga Main Road, Kasba, Kolkata, West Bengal 700107',
    'Kasba',
    8800000,
    '₹88 L',
    '2 BHK',
    'Apartment',
    'Ready to Move',
    'Fully Furnished',
    1100,
    2,
    1,
    '3rd out of G+6',
    'East',
    '1 Open Parking Space',
    ARRAY['Boutique Gated Community', 'Automatic Lift by Otis', 'Designer Modular Kitchen', '24/7 Security Personnel', 'Intercom & CCTV System'],
    ARRAY['3 mins to Acropolis Mall & Geetanjali Stadium', '5 mins to Ruby Hospital & EM Bypass', '10 mins to Gariahat Market'],
    'An impeccably styled, turn-key 2 BHK apartment in prime South Kolkata. High walkability to retail avenues, leading medical facilities, and Metro corridors. Low maintenance, verified municipal records, ideal for families or high-yield rental portfolios.',
    'Resale',
    'Available',
    '/images/properties/living.jpg',
    '/images/properties/living.jpg',
    'Boutique Living Kolkata',
    'https://www.instagram.com',
    false,
    true,
    NOW() - INTERVAL '6 days',
    NOW()
  );

-- 5. Insert Multi-Image Galleries for Each Property
INSERT INTO property_images (id, property_id, sort_order, caption, alt_text, image_url, thumb_url, created_at) VALUES
  ('c1111111-1111-0001-0000-000000000001', 'b1111111-1111-4111-8111-111111111111', 1, 'Skyline Terrace Deck', 'Private landscaped terrace', '/images/properties/luxury_penthouse_terrace_1790945979055.jpg', '/images/properties/luxury_penthouse_terrace_1790945979055.jpg', NOW()),
  ('c1111111-1111-0001-0000-000000000002', 'b1111111-1111-4111-8111-111111111111', 2, 'Grand Salon Living', 'Double height living room', '/images/properties/luxury_living_room_1790945888128.jpg', '/images/properties/luxury_living_room_1790945888128.jpg', NOW()),
  ('c1111111-1111-0001-0000-000000000003', 'b1111111-1111-4111-8111-111111111111', 3, 'Tower Architectural Facade', 'Luxury building exterior', '/images/properties/luxury_building_facade_1790945914790.jpg', '/images/properties/luxury_building_facade_1790945914790.jpg', NOW()),
  ('c1111111-1111-0001-0000-000000000004', 'b1111111-1111-4111-8111-111111111111', 4, 'Executive Home Library', 'Study and meeting lounge', '/images/properties/luxury_commercial_office_1790945944683.jpg', '/images/properties/luxury_commercial_office_1790945944683.jpg', NOW()),

  ('c2222222-2222-0002-0000-000000000001', 'b2222222-2222-4222-8222-222222222222', 1, 'Formal Drawing Room', 'Alipore luxury formal salon', '/images/properties/luxury_living_room_1790945888128.jpg', '/images/properties/luxury_living_room_1790945888128.jpg', NOW()),
  ('c2222222-2222-0002-0000-000000000002', 'b2222222-2222-4222-8222-222222222222', 2, 'Sunlit Verandah Suite', 'Verandah with greenery', '/images/properties/luxury_penthouse_terrace_1790945979055.jpg', '/images/properties/luxury_penthouse_terrace_1790945979055.jpg', NOW()),
  ('c2222222-2222-0002-0000-000000000003', 'b2222222-2222-4222-8222-222222222222', 3, 'Gated Manor Elevation', 'Alipore facade entrance', '/images/properties/facade.jpg', '/images/properties/facade.jpg', NOW()),

  ('c3333333-3333-0003-0000-000000000001', 'b3333333-3333-4333-8333-333333333333', 1, 'Executive Suite Floor', 'Modern corporate workstations', '/images/properties/luxury_commercial_office_1790945944683.jpg', '/images/properties/luxury_commercial_office_1790945944683.jpg', NOW()),
  ('c3333333-3333-0003-0000-000000000002', 'b3333333-3333-4333-8333-333333333333', 2, 'Commercial Tech Park Tower', 'High-rise glass facade', '/images/properties/luxury_building_facade_1790945914790.jpg', '/images/properties/luxury_building_facade_1790945914790.jpg', NOW()),

  ('c4444444-4444-0004-0000-000000000001', 'b4444444-4444-4444-8444-444444444444', 1, 'Residence Front Elevation', 'Lake Town building exterior', '/images/properties/luxury_building_facade_1790945914790.jpg', '/images/properties/luxury_building_facade_1790945914790.jpg', NOW()),
  ('c4444444-4444-0004-0000-000000000002', 'b4444444-4444-4444-8444-444444444444', 2, 'Spacious Living Lounge', 'Well-lit living room', '/images/properties/living.jpg', '/images/properties/living.jpg', NOW()),

  ('c5555555-5555-0005-0000-000000000001', 'b5555555-5555-4555-8555-555555555555', 1, 'Architectural Facade Rendering', 'New Town tower design', '/images/properties/facade.jpg', '/images/properties/facade.jpg', NOW()),
  ('c5555555-5555-0005-0000-000000000002', 'b5555555-5555-4555-8555-555555555555', 2, 'Show Apartment Living', 'Modern interior lounge', '/images/properties/luxury_living_room_1790945888128.jpg', '/images/properties/luxury_living_room_1790945888128.jpg', NOW()),

  ('c6666666-6666-0006-0000-000000000001', 'b6666666-6666-4666-8666-666666666666', 1, 'Furnished 2 BHK Hall', 'Kasba flat interior', '/images/properties/living.jpg', '/images/properties/living.jpg', NOW()),
  ('c6666666-6666-0006-0000-000000000002', 'b6666666-6666-4666-8666-666666666666', 2, 'Boutique Building Elevation', 'Quiet residential lane facade', '/images/properties/luxury_building_facade_1790945914790.jpg', '/images/properties/luxury_building_facade_1790945914790.jpg', NOW());

-- 6. Insert Verified Instagram Walkthrough Reels
INSERT INTO reels (id, title, reel_url, embed_url, cover_image, cover_thumb, display_order, is_published, created_at) VALUES
  (
    'reel-ballygunge-penthouse',
    'Ballygunge Duplex Penthouse Architectural Tour',
    'https://www.instagram.com',
    'https://www.instagram.com',
    '/images/properties/luxury_penthouse_terrace_1790945979055.jpg',
    '/images/properties/luxury_penthouse_terrace_1790945979055.jpg',
    10,
    true,
    NOW() - INTERVAL '1 day'
  ),
  (
    'reel-alipore-manor',
    'Alipore Signature 4 BHK Private Residence Walkthrough',
    'https://www.instagram.com',
    'https://www.instagram.com',
    '/images/properties/luxury_living_room_1790945888128.jpg',
    '/images/properties/luxury_living_room_1790945888128.jpg',
    20,
    true,
    NOW() - INTERVAL '2 days'
  ),
  (
    'reel-saltlake-office',
    'Sector V High-Rise Commercial Floor Inspection',
    'https://www.instagram.com',
    'https://www.instagram.com',
    '/images/properties/luxury_commercial_office_1790945944683.jpg',
    '/images/properties/luxury_commercial_office_1790945944683.jpg',
    30,
    true,
    NOW() - INTERVAL '3 days'
  );

-- 7. Insert Verified Journal Articles
INSERT INTO blog_posts (
  id, slug, title, publish_date, author, cover_image, cover_thumb, content, excerpt, is_published, created_at, updated_at
) VALUES
  (
    'post-market-outlook-2025',
    'kolkata-luxury-real-estate-market-outlook-2025',
    'Kolkata Luxury Real Estate Market Outlook 2025: Ballygunge, Alipore & New Town',
    '2026-02-15',
    'Apex Living Research',
    '/images/properties/luxury_building_facade_1790945914790.jpg',
    '/images/properties/luxury_building_facade_1790945914790.jpg',
    '# Kolkata Luxury Real Estate Market Outlook 2025

The luxury housing segment in Kolkata has entered an unprecedented phase of quality consolidation. Driven by high-net-worth individuals, returning global NRIs, and industrialists seeking legacy assets, the demand for verified, clear-titled penthouses and low-density gated residences is outstripping supply.

## 1. Prime Corridors: Alipore & Ballygunge
Heritage South Kolkata postal codes remain the benchmark for generational wealth. Average capital values in prime Ballygunge Circular Road and Queens Park have seen resilient 12-14% year-on-year appreciation, primarily driven by land scarcity. Buyers here prioritize:
- Freehold land tenure and clear KMC mutation records
- Boutique low-density developments with only 1-2 apartments per floor
- Dedicated servant quarters and high-capacity EV charging infrastructure

## 2. The Rise of New Town & EM Bypass High-Rises
For modern corporate leaders and tech entrepreneurs, Action Area 1 and 2 in New Town represent the city planned future. With wide arterial boulevards, seamless connectivity to Netaji Subhash Chandra Bose International Airport, and major corporate campuses, modern luxury gated townships are commanding record absorption rates.

## Key Takeaway for Buyers
Whether evaluating a resale penthouse in South Kolkata or an under-construction tower in New Town, working with an independent advisory that audits legal sanction plans and environmental NOCs before transaction signing is the single most critical safeguard.',
    'A strategic analysis of high-end property appreciation, rental yields, and shifting NRI demand across Kolkata premier postal codes.',
    true,
    NOW() - INTERVAL '15 days',
    NOW()
  ),
  (
    'post-due-diligence-checklist',
    'essential-due-diligence-checklist-buying-property-kolkata',
    'The 10-Point Legal Due Diligence Checklist for Buying Real Estate in Bengal',
    '2026-02-28',
    'Legal Advisory Desk',
    '/images/properties/luxury_penthouse_terrace_1790945979055.jpg',
    '/images/properties/luxury_penthouse_terrace_1790945979055.jpg',
    '# The 10-Point Legal Due Diligence Checklist for Real Estate in Bengal

Purchasing real estate in West Bengal requires rigorous title inspection. Unlike standardized institutional markets, Kolkata properties often have layered ownership histories spanning decades. Here is our mandatory 10-point audit framework.

### 1. 30-Year Search Report
Always commission an exhaustive title search going back at least 30 years across the Registrar of Assurances and local District Registrar offices to ensure no undisclosed mortgages or lis pendens litigations exist.

### 2. KMC / Municipal Corporation Mutation
Confirm that the vendor name is duly recorded in the municipal mutation records with an up-to-date property tax receipt (Khajana / Tax clearance certificate).

### 3. Sanctioned Building Plan & Completion Certificate (CC)
Verify that the construction strictly adheres to the approved municipal sanction plan. Never purchase an apartment without an Occupancy Certificate (OC) or Completion Certificate (CC).

### 4. WBRERA Compliance
For new developments, verify the registration status on the official WBRERA portal to track promoter escrow accounts and milestone timelines.',
    'From RERA validation and municipal mutation records to 30-year registrar searches, here is how we protect our clients against title disputes.',
    true,
    NOW() - INTERVAL '7 days',
    NOW()
  ),
  (
    'post-commercial-vs-residential',
    'commercial-space-vs-residential-yields-salt-lake-sector-v',
    'Commercial Real Estate vs Premium Residential: Where Should Capital Flow?',
    '2026-03-10',
    'Investment Strategy Team',
    '/images/properties/luxury_commercial_office_1790945944683.jpg',
    '/images/properties/luxury_commercial_office_1790945944683.jpg',
    '# Commercial Real Estate vs Premium Residential

Investors frequently ask our desk whether to deploy 2-5 Crores into grade-A office space in Sector V or prime residential real estate in South Kolkata. Both asset classes serve distinct portfolio objectives.

## Commercial Real Estate (Salt Lake Sector V & Rajarhat)
- **Net Rental Yields**: 8.0% - 9.5% per annum
- **Lease Durations**: 3 to 9 years with 15% escalation every 3 years
- **Ideal For**: Regular monthly cash flow, corporate tenants, inflation-hedged yields

## Premium Residential (Ballygunge, Alipore)
- **Net Rental Yields**: 2.5% - 3.5% per annum
- **Capital Appreciation**: 10% - 15% annual compounding in supply-constrained micro-markets
- **Ideal For**: Long-term generational wealth preservation, legacy family living

Our advisory desk assists institutional investors and private family offices in structuring balanced hybrid portfolios.',
    'Comparing net rental yields, tenant retention periods, and capital gains in Kolkata tech corridor vs heritage South Kolkata.',
    true,
    NOW() - INTERVAL '2 days',
    NOW()
  );

-- 8. Insert Authentic Client Testimonials
INSERT INTO testimonials (
  id, client_name, client_location, rating, review_text, review_date, client_photo, is_published, created_at
) VALUES
  (
    'd1111111-1111-0001-0000-000000000001',
    'Debashis & Sharmila Mukherjee',
    'Ballygunge Park, Kolkata',
    5,
    'Finding a clear-titled penthouse in South Kolkata was exhausting until we engaged Apex Living. Their advisor personally verified the municipality mutation and structural documents before we even set foot on the terrace. Truly world-class advisory.',
    '2026-01-15',
    '',
    true,
    NOW() - INTERVAL '45 days'
  ),
  (
    'd2222222-2222-0002-0000-000000000002',
    'Rahul Agarwal',
    'London, UK (NRI Investor)',
    5,
    'Being an NRI in London, buying property in Kolkata was fraught with uncertainty. The Apex Living team coordinated virtual live video walkthroughs, verified RERA sanction plans with their legal team, and managed the transaction with complete transparency.',
    '2026-02-02',
    '',
    true,
    NOW() - INTERVAL '30 days'
  ),
  (
    'd3333333-3333-0003-0000-000000000003',
    'Ananya Sengupta',
    'Alipore, Kolkata',
    5,
    'Sold our family residence through their private mandate. No spam calls, zero mass listings on open portals. They introduced two vetted, serious buyers and completed the sale registration smoothly within four weeks.',
    '2026-02-18',
    '',
    true,
    NOW() - INTERVAL '18 days'
  ),
  (
    'd4444444-4444-0004-0000-000000000004',
    'Vikram Singhania',
    'Salt Lake Sector V',
    5,
    'Helped our firm acquire commercial office space in Sector V. From valuation negotiations to lease drafting and vetting, their advisory standards are comparable to top global property consultants.',
    '2026-03-01',
    '',
    true,
    NOW() - INTERVAL '8 days'
  );

-- 9. Insert Comprehensive Real Estate FAQs
INSERT INTO faqs (id, question, answer, category, display_order, is_published, created_at) VALUES
  (
    'faq-1',
    'How does Apex Living verify property titles before listing?',
    'Every residence in our inventory undergoes a multi-point legal audit conducted by senior property advocates. We verify 30-year search records at the Registrar of Assurances, municipal tax mutation clearances, sanctioned architectural plans, and WBRERA registration numbers. Only properties with 100% marketable titles are listed.',
    'Legal & Verification',
    10,
    true,
    NOW()
  ),
  (
    'faq-2',
    'Can Non-Resident Indians (NRIs) purchase residential property in Kolkata?',
    'Yes. Under RBI guidelines and FEMA regulations, NRIs and OCIs can purchase residential and commercial properties in India with funds remitted through normal banking channels (NRE/NRO accounts). Our desk provides end-to-end assistance including video walkthroughs, power of attorney (PoA) registration, and repatriation guidance.',
    'NRI Advisory',
    20,
    true,
    NOW()
  ),
  (
    'faq-3',
    'What are the stamp duty and registration charges in West Bengal?',
    'Stamp duty in West Bengal generally ranges between 5% and 7% depending on property valuation and municipal jurisdiction, plus a 1% registration fee. Our advisory desk provides a precise transaction cost breakdown including legal and assessment fees before you sign any commitment.',
    'Financial & Taxes',
    30,
    true,
    NOW()
  ),
  (
    'faq-4',
    'How do you schedule private site visits and architectural inspections?',
    'You can schedule a private visit directly through any property page or by contacting our concierge on WhatsApp. We arrange private escorted tours with senior property advisors who provide detailed architectural drawings, building specifications, and neighborhood dossiers.',
    'Services & Visits',
    40,
    true,
    NOW()
  ),
  (
    'faq-5',
    'How is Apex Living different from open listing portals and brokers?',
    'Open portals prioritize ad volume, often listing unverified or duplicate properties. Apex Living operates as a boutique advisory: every listing is personally inspected, legally vetted, photographed on-site, and handled by a dedicated relationship manager. We never sell your contact details or spam your phone.',
    'About Advisory',
    50,
    true,
    NOW()
  ),
  (
    'faq-6',
    'Do you assist with banking valuations and home loan processing?',
    'Yes. We work directly with leading private and public banks (including HDFC, ICICI, SBI, and Kotak) to expedite property appraisal, legal search approval, and preferential home loan disbursement for our clients.',
    'Financial & Taxes',
    60,
    true,
    NOW()
  );

COMMIT;
