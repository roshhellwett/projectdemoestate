# Client Data Reference & Modern Website Building Guide

> **SS Property (Kolkata, West Bengal)** — Verified luxury residences, commercial spaces, and curated property tours across Kolkata (Lake Town, Newtown, Kasba, Rajarhat, Bangur Avenue, Chinar Park, and Greater Kolkata).

This document is the **definitive developer guide** for ingesting and utilizing the real estate data, media assets, and brand elements stored inside `clientprovideddata/` to build the new modern website.

---

## 1. Directory Structure

```
clientprovideddata/
├── CLIENT_DATA_GUIDE.md       <-- You are here (Single Source of Truth)
│
├── data/                      <-- Clean JSON collections ready for import
│   ├── properties.json        (23 verified property listings with full metadata & pricing)
│   ├── propertyimages.json    (147 high-res gallery images with order & captions)
│   ├── propertyvideos.json    (10 property video tours & embed URLs)
│   ├── featuredreels.json     (6 social reels)
│   ├── blogposts.json         (6 editorial real estate articles)
│   ├── testimonials.json      (3 client reviews)
│   └── faq.json               (6 real estate FAQs)
│
├── media/                     <-- Real listing photography & video thumbnails (~80 MB)
│   ├── b/                     (70 base full-resolution original photos)
│   └── v/                     (18 responsive crops & transform variants)
│
├── brand/                     <-- Typography & vector identity assets
│   ├── fonts/                 (13 woff2 & css files: Plus Jakarta Sans & Fraunces)
│   └── svg/                   (monogram.svg, favicon.svg, grain.svg)
│
└── archive/                   <-- Historical background material (safely preserved)
    ├── app_prototype/         (previous vanilla prototype)
    ├── cloned_website/        (Wix offline mirror)
    ├── raw_captures/          (CDP browser captures & verification reports)
    └── recon_tooling/         (Python/Node recon scripts)
```

> [!TIP]
> **Lifecycle Note**: Once your new website is built and the JSON data and media files have been copied into your modern project (e.g. into `public/` and `src/data/`), the entire `clientprovideddata/` folder can be deleted without leaving any orphaned dependencies.

---

## 2. Collections & Schemas

All datasets are standard JSON arrays of objects.

### 2.1. `data/properties.json` (23 Listings)
The core real estate catalog. Each record represents a verified flat, penthouse, bungalow, or commercial space.

#### Schema & Field Types
| Field | Type | Description / Notes | Example Value |
|---|---|---|---|
| `_id` | `string` | Unique UUID identifier | `"743055fa-20d3-496f-b9d9-393924e223ba"` |
| `propertyId` | `string` | Public human-readable ID (links to galleries & tours) | `"359"`, `"PROP003"` |
| `propertyName` | `string` | Full title of the listing | `"Ready-to-Move 2 BHK Furnished Flat Near Acropolis Mall"` |
| `location` | `string` | Locality, neighborhood, and city | `"Kasba, Near Acropolis Mall, Kolkata"` |
| `price` | `number \| undefined` | Numerical price in INR or Crores (see Pricing Rules below) | `7200000.0`, `1.35` |
| `priceAsText` | `string \| undefined` | Formatted price string (used as fallback or display override) | `"INR 68 Lacs"`, `"₹1.40 Cr"` |
| `bhkType` | `string` | Bedroom configuration or property category | `"2 BHK"`, `"3 BHK"`, `"Commercial Office Space"` |
| `propertyType` | `string` | Architectural type | `"Apartment"`, `"Commercial"`, `"Semi furnished property "` |
| `possessionStatus`| `string` | Availability status | `"Available"`, `"Ready To Move"` |
| `furnishingStatus`| `string` | Furnishing condition | `"Furnished"`, `"Unfurnished"`, `"Semi-Furnished"` |
| `areaSqFt` | `number \| undefined` | Super built-up area in square feet | `980.0`, `1400.0` |
| `areaAsText` | `string \| undefined` | Formatted area text | `"1500 "`, `"2395 sq.ft"` |
| `numberOfBathrooms`| `number` | Count of bathrooms | `2.0`, `3.0` |
| `numberOfBalconies`| `number` | Count of balconies | `1.0`, `2.0` |
| `floor` | `string \| undefined` | Floor location | `"4th out of G+7"`, `"12th out of G+20"` |
| `facing` | `string \| undefined` | Directional orientation | `"South"`, `"East"`, `"North-East"` |
| `parking` | `string \| undefined` | Parking allocation details | `"1 open car parking"`, `"2 Covered Parking"` |
| `amenities` | `string` | Comma-separated list of amenities | `"Swimming Pool, Gym, Club House, 24/7 Security"` |
| `landmarks` | `string \| array` | Nearby transit and landmarks | `"5 mins walk Acropolis Mall, 5 mins Ruby Crossing"` |
| `description` | `string` | Full editorial description | `"Spacious 3 BHK semi-furnished flat in a prime location..."` |
| `category` | `string` | Budget or market tier | `"Budget"`, `"Premium"`, `"Ready To Move"`, `"Luxury"` |
| `status` | `string` | Filter status chip | `"Available"`, `"Active"` |
| `mainImage` | `string` | Primary hero image path | `"/media/b/216404_19174ccbdb1048728884de55c5a9477c~mv2.png"` |
| `developerName` | `string` | Developer or agency partner | `"Urban Living Projects"`, `"Green Valley Builders"` |
| `instagramUrl` | `string` | Social video link | `"https://www.instagram.com/p/Da-sSi0NCT-/"` |

#### Pricing Quirks & Display Logic
Because client listings were imported from multiple MLS streams, the `price` field has minor format variances:
1. **Full INR Value**: Most listings have numbers like `7200000.0` (72 Lakhs) or `12000000.0` (1.20 Crores).
2. **Short Crores Value**: Record `359` has `price: 1.35` (representing ₹1.35 Cr).
3. **`priceAsText` Fallback**: Record `371` has `price: undefined`, but `priceAsText: "₹1.40 Cr"`.
4. **Recommended Resolver**:
   ```typescript
   export function formatPropertyPrice(price?: number, priceAsText?: string): string {
     if (priceAsText && priceAsText.trim()) {
       return priceAsText.replace(/INR\s*/i, '₹').trim();
     }
     if (!price || isNaN(price)) return 'Price on Request';
     if (price < 100) return `₹${price} Cr`; // handles short values like 1.35
     if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
     if (price >= 100000) return `₹${(price / 100000).toFixed(0)} Lakhs`;
     return `₹${price.toLocaleString('en-IN')}`;
   }
   ```

---

### 2.2. `data/propertyimages.json` (147 Gallery Photos)
Detailed photo galleries, floor plans, and interior walkthrough stills.

#### Relational Link
- Connects to `properties.json` via **`propertyId`** (e.g. `"PROP003"`, `"346"`, `"368"`).

#### Schema
| Field | Type | Description |
|---|---|---|
| `_id` | `string` | Unique image record UUID |
| `propertyId` | `string` | Foreign key matching `properties.propertyId` |
| `order` | `number` | Display sort index (0-indexed, ascending) |
| `caption` | `string` | Photo caption / room label (e.g. `"Living Room"`) |
| `altText` | `string` | Accessible alt text |
| `imageData` | `string` | **Image Source**: Either a local path (`"/media/b/..."`) or an inline base64 data URI (`"data:image/jpeg;base64,..."`) |

> [!NOTE]
> 132 of the 147 gallery photos are stored as self-contained base64 data URIs (`data:image/jpeg;base64,...`). They render instantly without requiring external image hosting.

---

### 2.3. `data/propertyvideos.json` (10 Video Tours)
Embedded video walkthroughs and virtual inspections.

#### Relational Link
- Connects to `properties.json` via **`propertyId`**.

#### Key Fields
- `propertyId` (`string`): Foreign key matching property.
- `embedUrl` (`string`): YouTube embed link (`https://www.youtube.com/embed/ghijk456`) or Instagram Reel link (`https://www.instagram.com/reel/...`).
- `thumbnailImage` (`string`): Cover preview image path.
- `propertyType` (`string`): Specification label (e.g. `"4 BHK | Luxury Villa"`).

---

### 2.4. `data/featuredreels.json` (6 Social Reels)
Short-form social media reels highlighting Kolkata neighbourhoods, site walkthroughs, and buyer tips.

#### Key Fields
- `title` (`string`): Reel headline.
- `reelUrl` (`string`): Instagram reel URL.
- `coverImage` (`string`): Local image path for reel preview.
- `displayOrder` (`number`): Ordering for homepage reels carousel.
- `shortDescription` (`string`): One-sentence summary.

---

### 2.5. `data/blogposts.json` (6 Editorial Articles)
Educational real estate articles for buyers, sellers, and investors in Kolkata.

#### Key Fields
- `_id` (`string`): Article UUID (used for routing: `/blog/[id]`).
- `title` (`string`): Article title (e.g. *"Selling Your Home in a Competitive Market: Strategies for Success"*).
- `publishDate` (`string`): ISO date string (`"2023-09-28"`).
- `author` (`string`): Author name or team attribution.
- `coverImage` (`string`): Featured hero image for article card.
- `content` (`string`): Multi-paragraph article body (separated by double newlines `\n\n`).

---

### 2.6. `data/testimonials.json` (3 Verified Reviews)
Client endorsements and ratings.

#### Key Fields
- `clientName` (`string`): Full name.
- `clientLocation` (`string`): City / State.
- `rating` (`number`): Star rating (1 to 5).
- `reviewText` (`string`): Review narrative.
- `reviewDate` (`string`): Review date.

---

### 2.7. `data/faq.json` (6 Real Estate FAQs)
Accordion FAQs covering buying procedures, RERA verification, pricing, and scheduling viewings.

#### Key Fields
- `question` (`string`): Frequently asked question.
- `answer` (`string`): Clear, authoritative answer.
- `category` (`string`): Category tag (`"Buying"`, `"Selling"`, `"About Us"`).
- `displayOrder` (`number`): Sequence order.
- `isPublished` (`boolean`): Active visibility toggle.

---

## 3. Media & Assets Integration

### 3.1. Media Directory (`media/`)
- Contains 88 real estate photos:
  - `media/b/`: Base full-resolution photographs (`216404_...~mv2.png/jpg/webp`).
  - `media/v/`: Scaled crop variants.
- In JSON files, images are referenced as `/media/b/<filename>` or `/media/v/<filename>`.

#### Next.js / Vite Setup
When initializing your new project, copy `media/` into your public root:
```bash
# In Next.js or Vite:
cp -r clientprovideddata/media ./public/media
```
Every `/media/...` path in `properties.json` and `propertyimages.json` will then automatically resolve in your browser!

### 3.2. Brand Assets (`brand/`)
- **Vectors** (`brand/svg/`):
  - `monogram.svg`: SS Property brand monogram logo (ideal for navbar, header, and footer).
  - `favicon.svg`: Minimalist vector favicon.
  - `grain.svg`: Subtle film-grain noise texture overlay for luxury editorial cards.
- **Typography** (`brand/fonts/`):
  - **Fraunces**: Editorial serif display font (optical sizes 9pt-144pt, variable normal and italic) for luxury headlines, prices, and hero typography.
  - **Plus Jakarta Sans**: Crisp, high-legibility geometric sans-serif for body text, specs, and tabular numbers.

---

## 4. Recommended Design System & Color Palette

To give the new website a prestigious, high-end real estate feel:

| Role | Name | Hex Code | Purpose |
|---|---|---|---|
| Background | **Paper Ivory** | `#FAF7F2` | Warm, airy luxury canvas (avoids clinical sterile white) |
| Surface Alt | **Alabaster Warm**| `#F3EEE6` | Alternate section background, card containers |
| Typography | **Deep Ink** | `#12100E` | High-contrast editorial text, dark hero sections |
| Primary Accent | **Brushed Brass** | `#C9A24B` | CTAs, focus rings, luxury badges, active filters |
| Soft Accent | **Muted Sand** | `#E8DCC3` | Badges, borders, subtle hover highlights |
| Dividers | **Hairline Rule** | `#E4DCCE` | Elegant 1px border lines |
| Secondary Text | **Slate Taupe** | `#6E675C` | Metadata, captions, secondary specs |
| Trust / Verified | **Verdigris Green**| `#2E6E4E` | RERA badges, "Verified", "Available" status tags |

---

## 5. TypeScript Definitions & Ready-to-Use Helper Kit

Copy and paste these definitions directly into your new project (e.g. `src/types/property.ts`):

```typescript
export interface Property {
  _id: string;
  propertyId: string;
  propertyName: string;
  location: string;
  price?: number;
  priceAsText?: string;
  bhkType: string;
  propertyType: string;
  possessionStatus: string;
  furnishingStatus: string;
  areaSqFt?: number;
  areaAsText?: string;
  numberOfBathrooms: number;
  numberOfBalconies: number;
  floor?: string;
  facing?: string;
  parking?: string;
  amenities: string;
  landmarks?: string | string[];
  description: string;
  category: 'Budget' | 'Premium' | 'Luxury' | 'Ready To Move' | string;
  status: string;
  mainImage: string;
  developerName?: string;
  instagramUrl?: string;
  buildingType?: string;
}

export interface PropertyImage {
  _id: string;
  propertyId: string;
  order: number;
  caption?: string;
  altText?: string;
  imageData: string; // url or data:image/... base64
}

export interface PropertyVideo {
  _id: string;
  propertyId: string;
  embedUrl: string;
  thumbnailImage?: string;
  propertyType: string;
  location: string;
  price?: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  publishDate: string;
  author: string;
  coverImage?: string;
  content: string;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  clientLocation: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
}

export interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  isPublished: boolean;
}
```

### Gallery Builder Helper
```typescript
/** Combines mainImage with gallery images in correct order. */
export function getAllImagesForProperty(property: Property, gallery: PropertyImage[]) {
  const images = gallery
    .filter((img) => img.propertyId === property.propertyId)
    .sort((a, b) => a.order - b.order)
    .map((img) => ({
      src: img.imageData,
      alt: img.altText || property.propertyName,
      caption: img.caption || '',
    }));

  if (property.mainImage) {
    images.unshift({
      src: property.mainImage,
      alt: property.propertyName,
      caption: 'Main View',
    });
  }
  return images;
}
```

---

## 6. Suggested Site Architecture for the New Website

1. **Home (`/`)**:
   - Editorial Hero with Fraunces serif headline and quick property search capsule (Location, BHK, Budget).
   - "Featured Residences" editorial 3-column cards.
   - Neighborhood spotlight ("Where Kolkata Lives": Newtown, Lake Town, Kasba).
   - Social Video Reels strip.
   - Client Reviews & FAQs.
2. **Properties Portfolio (`/properties`)**:
   - Interactive facet filtering (BHK, Budget range slider, Category chips).
   - Real-time search by location or keyword.
   - Grid and List view toggle.
3. **Property Detail Dossier (`/property/[id]`)**:
   - High-resolution gallery & fullscreen lightbox modal.
   - 2-column architectural specification table (area, floor, facing, balconies, baths).
   - Video tour embed facade (click-to-play for optimal performance).
   - Sticky Enquiry Card with Direct Agent / WhatsApp booking.
   - Similar properties recommendation.
4. **Video Tours (`/videos`)**:
   - Dedicated reels & walkthrough gallery.
5. **The Journal (`/blog` and `/blog/[id]`)**:
   - Insights, Kolkata market updates, and buying checklists.
6. **Sell Property & Partner (`/sell-property`, `/work-with-us`)**:
   - Direct valuation and listing submission forms.
