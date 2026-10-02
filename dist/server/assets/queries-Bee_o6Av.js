//#region src/lib/site.ts
/**
* Site-wide constants - business identity, contact, nav.
* Defaults are the recovered values; admin can override most of them live
* from Dashboard > Settings (stored in the site_settings table).
*/
var SITE = {
	name: "SS Property",
	tagline: "Premium Real Estate in Kolkata",
	phone: "+91 94296 93786",
	phoneHref: "tel:+919429693786",
	whatsapp: "https://wa.me/919429693786",
	email: "writetous@ssproperty.in",
	emailHref: "mailto:writetous@ssproperty.in",
	city: "Kolkata, West Bengal",
	instagram: "https://instagram.com/sspropertykol",
	instagramHandle: "sspropertykol",
	facebook: "https://facebook.com/sspropertykol",
	youtube: "https://youtube.com/@SSProperty"
};
var NAV_LINKS = [
	{
		label: "Properties",
		to: "/properties"
	},
	{
		label: "Partners",
		to: "/partners"
	},
	{
		label: "Compare",
		to: "/compare"
	},
	{
		label: "Sell",
		to: "/sell"
	},
	{
		label: "Calculator",
		to: "/calculator"
	},
	{
		label: "Journal",
		to: "/journal"
	},
	{
		label: "About",
		to: "/about"
	},
	{
		label: "Instagram",
		to: "/instagram"
	}
];
var FOOTER_SERVICES = [
	{
		label: "Buy a Property",
		to: "/properties"
	},
	{
		label: "Sell Your Property",
		to: "/sell"
	},
	{
		label: "Partner With Us",
		to: "/partners"
	}
];
/**
* Merge admin settings (site_settings table) over the defaults above.
* Every key is optional - anything the admin has not written keeps the default.
*/
function applySettings(settings) {
	const wa = settings.whatsapp_number ? `https://wa.me/${settings.whatsapp_number.replace(/\D/g, "")}` : SITE.whatsapp;
	const phone = settings.phone ?? SITE.phone;
	return {
		name: settings.brand_name ?? SITE.name,
		tagline: settings.tagline ?? SITE.tagline,
		phone,
		phoneHref: `tel:${phone.replace(/[^\d+]/g, "")}`,
		whatsapp: wa,
		email: settings.email ?? SITE.email,
		emailHref: `mailto:${settings.email ?? SITE.email}`,
		city: settings.city ?? SITE.city,
		instagram: settings.instagram_url ?? SITE.instagram,
		instagramHandle: settings.instagram_handle ?? SITE.instagramHandle,
		facebook: settings.facebook_url ?? SITE.facebook,
		youtube: settings.youtube_url ?? SITE.youtube,
		footerNote: settings.footer_note ?? "Verified listings. Transparent pricing. No hidden charges."
	};
}
//#endregion
//#region src/lib/fallback-data.ts
var FALLBACK_PROPERTIES = [
	{
		"id": "743055fa-20d3-496f-b9d9-393924e223ba",
		"slug": "furnished-commercial-space-for-sale-next-to-chandni-chowk-metro-1000-sq-ft",
		"title": "Furnished Commercial Space for Sale Next to Chandni Chowk Metro | 1000 sq.ft",
		"location": "Chittaranjan Avenue, Bow Barracks, Kolkata, West Bengal 700072",
		"locality": "C.R. Avenue",
		"price_inr": 135e5,
		"price_display": null,
		"bhk_type": "Commercial Office Space",
		"property_type": "Apartment",
		"possession_status": "Available",
		"furnishing_status": "Furnished",
		"area_sqft": 1e3,
		"bathrooms": 1,
		"balconies": 0,
		"floor": null,
		"facing": null,
		"parking": "N/A",
		"amenities": ["24×7 Gated Security & CCTV Surveillance"],
		"landmarks": ["Next to Chandni Chowk Metro Station", "2 mins – Esplanade Crossing"],
		"description": "A furnished commercial office space next to Chandni Chowk Metro Station, 2 minutes from Esplanade Crossing - high-visibility central Kolkata location.",
		"category": "Resale",
		"status": "Active",
		"main_image": "/images/properties/office.jpg",
		"main_image_thumb": "/images/properties/office.jpg",
		"developer_name": "Kolkata Commercial Properties",
		"instagram_url": "https://www.instagram.com/p/DbOJFFwztXB/",
		"is_featured": true,
		"is_published": true,
		"created_at": "2026-08-25T05:19:10.624Z",
		"updated_at": "2026-08-25T05:19:10.624Z"
	},
	{
		"id": "007e57c0-b818-4005-b8e2-3c67c9a26cb5",
		"slug": "ready-to-move-2-bhk-furnished-flat-near-acropolis-mall-kasba",
		"title": "Ready-to-Move 2 BHK Furnished Flat Near Acropolis Mall, Kasba",
		"location": "Kasba, Near Acropolis Mall, Kolkata",
		"locality": "Kasba",
		"price_inr": 72e5,
		"price_display": null,
		"bhk_type": "2 BHK",
		"property_type": "Apartment",
		"possession_status": "Available",
		"furnishing_status": "Furnished",
		"area_sqft": 980,
		"bathrooms": 2,
		"balconies": 1,
		"floor": "4th out of G+7",
		"facing": "South",
		"parking": "1 open car parking",
		"amenities": [
			"Modular Kitchen",
			"Wardrobes",
			"ACs",
			"Geysers",
			"24/7 Security",
			"Lift"
		],
		"landmarks": [],
		"description": "A furnished 2 BHK flat near Acropolis Mall, Kasba - 5 minutes' walk from the mall and 5 minutes from Ruby Crossing, ideal for city-centre convenience. | Landmarks: 5 mins walk Acropolis Mall, 5 mins Ruby Crossing",
		"category": "Ready To Move",
		"status": "Available",
		"main_image": "/images/properties/living.jpg",
		"main_image_thumb": "/images/properties/living.jpg",
		"developer_name": "Urban Living Projects",
		"instagram_url": "https://www.instagram.com/p/Da-sSi0NCT-/",
		"is_featured": false,
		"is_published": true,
		"created_at": "2026-08-25T09:33:39.366Z",
		"updated_at": "2026-08-25T09:33:39.366Z"
	},
	{
		"id": "9e2c5d3d-f7a8-4ea5-8901-2231842fd596",
		"slug": "3-bhk-fully-furnished-flat-in-chinar-park",
		"title": "3 BHK Fully Furnished Flat in Chinar Park",
		"location": "Chinar Park, Kolkata",
		"locality": "Chinar Park",
		"price_inr": 95e5,
		"price_display": null,
		"bhk_type": "3 BHK",
		"property_type": "Apartment",
		"possession_status": "Available",
		"furnishing_status": "Furnished",
		"area_sqft": 1300,
		"bathrooms": 3,
		"balconies": 2,
		"floor": "3rd out of G+5",
		"facing": "South",
		"parking": "1 Covered Parking",
		"amenities": [
			"Gym",
			"Children's Play Area",
			"24/7 Water Supply",
			"Security",
			"Lift"
		],
		"landmarks": [],
		"description": "Beautifully furnished 3 BHK flat in Chinar Park. Ready to move in with all essential furniture and appliances. Excellent location with easy access to airport and shopping malls.",
		"category": "Budget",
		"status": "Available",
		"main_image": "/images/properties/facade.jpg",
		"main_image_thumb": "/images/properties/facade.jpg",
		"developer_name": "Green Valley Builders",
		"instagram_url": "https://www.instagram.com/p/DbgKmveT7Y2/",
		"is_featured": true,
		"is_published": true,
		"created_at": "2026-08-25T12:48:07.489Z",
		"updated_at": "2026-08-25T12:48:07.489Z"
	},
	{
		"id": "523a8c56-1b1d-453f-b82e-28b0e321798d",
		"slug": "urban-lakes-konnagar-2-bhk-flat",
		"title": "Urban Lakes Konnagar 2 BHK Flat",
		"location": "Konnagar, Hooghly",
		"locality": "Konnagar",
		"price_inr": 45e5,
		"price_display": null,
		"bhk_type": "2 BHK",
		"property_type": "Apartment",
		"possession_status": "Available",
		"furnishing_status": "Unfurnished",
		"area_sqft": 950,
		"bathrooms": 2,
		"balconies": 2,
		"floor": "5th out of G+10",
		"facing": "East",
		"parking": "1 Covered Parking",
		"amenities": [
			"Swimming Pool",
			"Gym",
			"Community Hall",
			"Kids Play Area",
			"24/7 Security"
		],
		"landmarks": [],
		"description": "An unfurnished 2 BHK in the Urban Lakes township, Konnagar, offering resort-style amenities including a clubhouse and swimming pool, 3 minutes from Konnagar Station. | Landmarks: 3 mins Konnagar Station, 6 mins GT Road",
		"category": "Budget",
		"status": "Available",
		"main_image": "/images/properties/living.jpg",
		"main_image_thumb": "/images/properties/living.jpg",
		"developer_name": "Urban Developers",
		"instagram_url": "https://www.instagram.com/p/DaS6w7UPqDd/",
		"is_featured": false,
		"is_published": true,
		"created_at": "2026-08-25T12:48:07.491Z",
		"updated_at": "2026-08-25T12:48:07.491Z"
	},
	{
		"id": "c7494b18-e81a-478f-a0cb-f43abb641a9b",
		"slug": "3-bhk-luxury-flat-in-complex-with-infinity-pool-newtown",
		"title": "3 BHK Luxury Flat in Complex with Infinity Pool - Newtown",
		"location": "Newtown, Kolkata",
		"locality": "Newtown",
		"price_inr": 95e5,
		"price_display": null,
		"bhk_type": "3 BHK",
		"property_type": "Apartment",
		"possession_status": "Available",
		"furnishing_status": "Unfurnished",
		"area_sqft": 1400,
		"bathrooms": 3,
		"balconies": 2,
		"floor": "12th out of G+20",
		"facing": "South-West",
		"parking": "2 Covered Parking",
		"amenities": [
			"Infinity Pool",
			"Gymnasium",
			"Club House",
			"Landscaped Gardens",
			"24/7 Concierge",
			"Power Backup",
			"Lift"
		],
		"landmarks": [],
		"description": "A high-floor luxury 3 BHK residence in a premium Newtown complex, 5 minutes' walk from Coal Bhawan and 7 minutes from Biswa Bangla Gate. The complex offers resort-grade amenities for an elevated lifestyle. | Landmarks: 5 mins walk Coal Bhawan, 7 mins Biswa Bangla Gate | Amenities: Infinity Pool, Gym, Private Theatre, Indoor Games, Sky Gardens | Parking: 1 Bike Parking + 1 Car Parking",
		"category": "Premium",
		"status": "Available",
		"main_image": "/images/properties/facade.jpg",
		"main_image_thumb": "/images/properties/facade.jpg",
		"developer_name": "Skyline Residences",
		"instagram_url": "https://www.instagram.com/p/Db8fTOhPG9Q/",
		"is_featured": false,
		"is_published": true,
		"created_at": "2026-08-25T13:24:30.243Z",
		"updated_at": "2026-08-25T13:24:30.243Z"
	},
	{
		"id": "3930b887-9f6e-4e5c-a3ab-9e15911c3dbd",
		"slug": "4-bhk-ready-to-move-flat-with-covered-parking-in-lake-town",
		"title": "4 BHK Ready to Move Flat with Covered Parking in Lake Town",
		"location": "Lake Town, Kolkata",
		"locality": "Lake Town",
		"price_inr": 12e6,
		"price_display": null,
		"bhk_type": "4 BHK",
		"property_type": "Apartment",
		"possession_status": "Available",
		"furnishing_status": "Unfurnished",
		"area_sqft": 1800,
		"bathrooms": 3,
		"balconies": 3,
		"floor": "2nd out of G+4",
		"facing": "North-East",
		"parking": "1 Covered Parking",
		"amenities": [
			"24/7 Security",
			"Power Backup",
			"Lift",
			"Intercom",
			"Visitor Parking"
		],
		"landmarks": [],
		"description": "An unfurnished 4 BHK flat with covered parking in Lake Town, 3 minutes from HDFC Bank Laketown, 5 minutes from VIP Road, and 10 minutes from Ultadanga Crossing.",
		"category": "Ready To Move",
		"status": "Available",
		"main_image": "/images/properties/penthouse.jpg",
		"main_image_thumb": "/images/properties/penthouse.jpg",
		"developer_name": "Lakeview Estates",
		"instagram_url": "https://www.instagram.com/p/DcTVwojzff1/",
		"is_featured": false,
		"is_published": true,
		"created_at": "2026-08-25T13:24:30.244Z",
		"updated_at": "2026-08-25T13:24:30.244Z"
	},
	{
		"id": "9eee2c09-0d4a-4898-ac5f-035437c361d8",
		"slug": "ready-to-move-2-bhk-gated-society-flat-near-garia-more",
		"title": "Ready-to-Move 2 BHK Gated Society Flat Near Garia More",
		"location": "Garia More, Kolkata",
		"locality": "Garia",
		"price_inr": 45e5,
		"price_display": null,
		"bhk_type": "2 BHK",
		"property_type": "Apartment",
		"possession_status": "Available",
		"furnishing_status": "Semi-Furnished",
		"area_sqft": 950,
		"bathrooms": 2,
		"balconies": 2,
		"floor": "5th out of G+7",
		"facing": "East",
		"parking": "1 Covered Parking",
		"amenities": [
			"24/7 Security",
			"Power Backup",
			"Lift",
			"Community Hall",
			"Children's Play Area"
		],
		"landmarks": [],
		"description": "An affordable, ready-to-move 2 BHK in a gated society at Brahmapur, near Garia More - ideal for first-time buyers or investors. 7 minutes from Master Da Surya Sen Metro and 5 minutes from Garia More.",
		"category": "Ready To Move",
		"status": "Available",
		"main_image": "/images/properties/facade.jpg",
		"main_image_thumb": "/images/properties/facade.jpg",
		"developer_name": "Green Valley Developers",
		"instagram_url": "https://www.instagram.com/p/DbBRZTeTSOl/",
		"is_featured": false,
		"is_published": true,
		"created_at": "2026-08-25T13:24:30.245Z",
		"updated_at": "2026-08-25T13:24:30.245Z"
	},
	{
		"id": "b2d7ca00-a249-4411-a5ef-c57f03170891",
		"slug": "4-bhk-flat-in-lake-town-block-a",
		"title": "4 BHK Flat in Lake Town Block A",
		"location": "Lake Town Block A, Kolkata",
		"locality": "Lake Town",
		"price_inr": 15e6,
		"price_display": null,
		"bhk_type": "4 BHK",
		"property_type": "Apartment",
		"possession_status": "Available",
		"furnishing_status": "Furnished",
		"area_sqft": 2e3,
		"bathrooms": 3,
		"balconies": 3,
		"floor": "8th out of G+12",
		"facing": "South",
		"parking": "2 covered car parking",
		"amenities": [
			"Rooftop Garden",
			"Kids Play Area",
			"Community Hall",
			"Gym",
			"Power Backup",
			"24/7 Security"
		],
		"landmarks": [],
		"description": "Luxurious 4 BHK fully furnished flat in a prestigious complex in Lake Town Block A. Offers panoramic city views, high-end finishes, and a host of exclusive amenities. Perfect for a large family seeking comfort and elegance.",
		"category": "Luxury",
		"status": "Available",
		"main_image": "/images/properties/penthouse.jpg",
		"main_image_thumb": "/images/properties/penthouse.jpg",
		"developer_name": "Elite Residences",
		"instagram_url": "https://www.instagram.com/p/DcGyiUTPVV9/",
		"is_featured": false,
		"is_published": true,
		"created_at": "2026-08-25T14:03:05.829Z",
		"updated_at": "2026-08-25T14:03:05.829Z"
	},
	{
		"id": "e911f87a-f3bf-41ff-8d84-331cde9a4e09",
		"slug": "3-bhk-flat-in-bangur-avenue-lake-town",
		"title": "3 BHK Flat in Bangur Avenue, Lake Town",
		"location": "Bangur Avenue, Lake Town, Kolkata",
		"locality": "Lake Town",
		"price_inr": 62e5,
		"price_display": null,
		"bhk_type": "3 BHK",
		"property_type": "Apartment",
		"possession_status": "Available",
		"furnishing_status": "Unfurnished",
		"area_sqft": 1100,
		"bathrooms": 2,
		"balconies": 1,
		"floor": "2nd out of G+4",
		"facing": "North-East",
		"parking": "Street parking available",
		"amenities": [
			"24/7 Water Supply",
			"Lift",
			"Intercom",
			"Security"
		],
		"landmarks": [],
		"description": "Cozy 3 BHK unfurnished flat in the heart of Bangur Avenue. Ideal for families looking for an affordable home with good connectivity. Close to schools, hospitals, and local markets.",
		"category": "Budget",
		"status": "Available",
		"main_image": "/images/properties/facade.jpg",
		"main_image_thumb": "/images/properties/facade.jpg",
		"developer_name": "Urban Homes Builders",
		"instagram_url": "https://www.instagram.com/p/DcL-Z_szXwK/",
		"is_featured": false,
		"is_published": true,
		"created_at": "2026-08-25T14:03:05.830Z",
		"updated_at": "2026-08-25T14:03:05.830Z"
	},
	{
		"id": "1cf3cbaa-7933-45b3-9451-137d8b663e3a",
		"slug": "3-bhk-semifurnished-flat-in-rajarhat",
		"title": "3 BHK Semifurnished Flat in Rajarhat",
		"location": "Rajarhat, Kolkata",
		"locality": "Rajarhat",
		"price_inr": 13e6,
		"price_display": null,
		"bhk_type": "3 BHK",
		"property_type": "Semi furnished property",
		"possession_status": "Available",
		"furnishing_status": "Semi-Furnished",
		"area_sqft": 1450,
		"bathrooms": 2,
		"balconies": 2,
		"floor": "5th out of G+10",
		"facing": "East",
		"parking": "1 covered car parking",
		"amenities": [
			"Swimming Pool",
			"Gym",
			"Club House",
			"24/7 Security",
			"Power Backup"
		],
		"landmarks": [],
		"description": "Spacious 3 BHK semi-furnished flat in a prime location of Rajarhat. Features modern interiors, ample natural light, and access to all premium amenities. Close to major IT hubs and entertainment zones.",
		"category": "Premium",
		"status": "Available",
		"main_image": "/images/properties/penthouse.jpg",
		"main_image_thumb": "/images/properties/penthouse.jpg",
		"developer_name": "Green Valley Developers",
		"instagram_url": "https://www.instagram.com/p/DcGyiUTPVV9/",
		"is_featured": true,
		"is_published": true,
		"created_at": "2026-08-25T14:03:05.831Z",
		"updated_at": "2026-08-25T14:03:05.831Z"
	},
	{
		"id": "03965c67-6e19-4c8d-af1b-d8bacf5e3ea4",
		"slug": "4-bhk-flat-in-lake-town-block-a-371",
		"title": "4 BHK Flat in Lake Town Block A",
		"location": "Lake Town, South Dumdum, Kolkata, West Bengal 700089",
		"locality": "Lake Town",
		"price_inr": 14e6,
		"price_display": null,
		"bhk_type": "4 BHK",
		"property_type": "Semi furnished",
		"possession_status": "Available",
		"furnishing_status": "",
		"area_sqft": null,
		"bathrooms": 1,
		"balconies": 2,
		"floor": "G+5",
		"facing": null,
		"parking": "1 parking",
		"amenities": [
			"Community Hall",
			"Water Filtration",
			"24x7 Security",
			"Parking: Covered Car Parking"
		],
		"landmarks": ["3 mins HDFC Bank Laketown, 5 mins VIP Road"],
		"description": "",
		"category": "Resale",
		"status": "Available",
		"main_image": "/images/properties/penthouse.jpg",
		"main_image_thumb": "/images/properties/penthouse.jpg",
		"developer_name": null,
		"instagram_url": null,
		"is_featured": false,
		"is_published": true,
		"created_at": "2026-08-25T20:59:22.067Z",
		"updated_at": "2026-08-25T20:59:22.067Z"
	},
	{
		"id": "9918382c-8a94-43fa-a160-fcb1b00e453c",
		"slug": "ready-to-move-3-bhk-in-howrah-ac-market-area",
		"title": "Ready to Move 3 BHK in Howrah AC Market Area",
		"location": "Howrah AC Market Area, Howrah",
		"locality": "Howrah",
		"price_inr": 68e5,
		"price_display": null,
		"bhk_type": "3 BHK",
		"property_type": "Apartment",
		"possession_status": "Ready To Move",
		"furnishing_status": "Furnished",
		"area_sqft": 1200,
		"bathrooms": 2,
		"balconies": 2,
		"floor": "5th out of G+7",
		"facing": "North-East",
		"parking": "1 Open Parking",
		"amenities": [
			"Gym",
			"Community Hall",
			"Power Backup",
			"Intercom",
			"24/7 Water Supply"
		],
		"landmarks": ["Near Howrah Station, AC Market, Avani Riverside Mall"],
		"description": "A meticulously maintained 3 BHK apartment located in the bustling Howrah AC Market Area. This fully furnished property is ready for immediate occupancy, offering a comfortable living space with all essential amenities. Excellent connectivity to Howrah Station and local markets.",
		"category": "Ready To Move",
		"status": "Available",
		"main_image": "/images/properties/living.jpg",
		"main_image_thumb": "/images/properties/living.jpg",
		"developer_name": "Howrah Builders",
		"instagram_url": null,
		"is_featured": true,
		"is_published": true,
		"created_at": "2026-08-29T17:27:52.844Z",
		"updated_at": "2026-08-29T17:27:52.844Z"
	},
	{
		"id": "d4a181c1-07ea-47b3-ae9b-60a34b673f71",
		"slug": "ready-to-move-2-bhk-in-rajarhat-bablatala",
		"title": "Ready-to-Move 2 BHK in Rajarhat, Bablatala",
		"location": "Rajarhat, Bablatala, Kolkata",
		"locality": "Rajarhat",
		"price_inr": 45e5,
		"price_display": null,
		"bhk_type": "2 BHK",
		"property_type": "Apartment",
		"possession_status": "Ready To Move",
		"furnishing_status": "Semi-Furnished",
		"area_sqft": 950,
		"bathrooms": 2,
		"balconies": 1,
		"floor": "3rd out of G+5",
		"facing": "East",
		"parking": "1 Covered Parking",
		"amenities": [
			"Gym",
			"Swimming Pool",
			"Children's Play Area",
			"24/7 Security",
			"Power Backup"
		],
		"landmarks": ["Near City Centre 2, DPS Newtown"],
		"description": "Spacious and well-ventilated 2 BHK apartment in a prime location of Rajarhat, Bablatala. This ready-to-move property offers modern amenities and excellent connectivity to major city hubs and educational institutions. Ideal for families looking for comfort and convenience.",
		"category": "Ready To Move",
		"status": "Available",
		"main_image": "/images/properties/facade.jpg",
		"main_image_thumb": "/images/properties/facade.jpg",
		"developer_name": "Greenfield Developers",
		"instagram_url": null,
		"is_featured": false,
		"is_published": true,
		"created_at": "2026-08-29T17:27:52.845Z",
		"updated_at": "2026-08-29T17:27:52.845Z"
	},
	{
		"id": "d97b4b66-08e0-4962-8e6b-6ad9a160a110",
		"slug": "luxurious-4-bhk-flat-in-lake-town",
		"title": "Luxurious 4 BHK Flat in Lake Town",
		"location": "Lake Town, Kolkata",
		"locality": "Lake Town",
		"price_inr": 25e6,
		"price_display": null,
		"bhk_type": "4 BHK",
		"property_type": "Apartment",
		"possession_status": "Ready To Move",
		"furnishing_status": "Semi-Furnished",
		"area_sqft": 2200,
		"bathrooms": 4,
		"balconies": 3,
		"floor": "9th out of G+15",
		"facing": "South",
		"parking": "2 Covered Car Parking",
		"amenities": [
			"Clubhouse",
			"Gym",
			"Swimming Pool",
			"Children's Play Area",
			"Intercom",
			"24/7 Security",
			"Power Backup"
		],
		"landmarks": ["Lake Town Clock Tower, Jessore Road, Netaji Subhash Chandra Bose International Airport"],
		"description": "Experience luxury in this spacious 4 BHK semi-furnished apartment in the heart of Lake Town. Boasting premium finishes, ample natural light, and a host of amenities, it offers an unparalleled living experience.",
		"category": "Premium",
		"status": "Available",
		"main_image": "/images/properties/penthouse.jpg",
		"main_image_thumb": "/images/properties/penthouse.jpg",
		"developer_name": "Elite Homes",
		"instagram_url": null,
		"is_featured": true,
		"is_published": true,
		"created_at": "2026-08-30T11:55:58.839Z",
		"updated_at": "2026-08-30T11:55:58.839Z"
	},
	{
		"id": "9093c621-fa9b-45f2-be6e-5cb8483d0480",
		"slug": "urban-lakes-konnagar-2-bhk-flat-prop002",
		"title": "Urban Lakes Konnagar 2 BHK Flat",
		"location": "Konnagar, Hooghly",
		"locality": "Konnagar",
		"price_inr": 62e5,
		"price_display": null,
		"bhk_type": "2 BHK",
		"property_type": "Apartment",
		"possession_status": "Under Construction",
		"furnishing_status": "Unfurnished",
		"area_sqft": 980,
		"bathrooms": 2,
		"balconies": 2,
		"floor": "5th out of G+10",
		"facing": "North-East",
		"parking": "1 Open Car Parking",
		"amenities": [
			"Kids Play Area",
			"Jogging Track",
			"Landscaped Gardens",
			"24/7 Security"
		],
		"landmarks": ["Konnagar Railway Station, Hooghly River, Local Market"],
		"description": "Upcoming 2 BHK apartment in the serene Urban Lakes project in Konnagar. Enjoy modern living with excellent connectivity and a peaceful environment. Possession by end of 2024.",
		"category": "Under Construction",
		"status": "Available",
		"main_image": "/images/properties/facade.jpg",
		"main_image_thumb": "/images/properties/facade.jpg",
		"developer_name": "Urban Developers",
		"instagram_url": null,
		"is_featured": true,
		"is_published": true,
		"created_at": "2026-08-30T11:55:58.840Z",
		"updated_at": "2026-08-30T11:55:58.840Z"
	},
	{
		"id": "9befed83-ea12-42c0-b588-48fa9c5add9e",
		"slug": "ready-to-move-2-bhk-furnished-flat-near-acropolis-mall-kasba-prop001",
		"title": "Ready-to-Move 2 BHK Furnished Flat Near Acropolis Mall, Kasba",
		"location": "Kasba, Kolkata",
		"locality": "Kasba",
		"price_inr": 85e5,
		"price_display": null,
		"bhk_type": "2 BHK",
		"property_type": "Apartment",
		"possession_status": "Ready To Move",
		"furnishing_status": "Furnished",
		"area_sqft": 1050,
		"bathrooms": 2,
		"balconies": 1,
		"floor": "7th out of G+12",
		"facing": "East",
		"parking": "1 Covered Car Parking",
		"amenities": [
			"Gym",
			"Swimming Pool",
			"Community Hall",
			"24/7 Security",
			"Power Backup"
		],
		"landmarks": ["Acropolis Mall, Kasba Market, Ruby Hospital"],
		"description": "Spacious and fully furnished 2 BHK flat located in a prime area of Kasba, just a stone's throw away from Acropolis Mall. Enjoy modern amenities and excellent connectivity. Ideal for families.",
		"category": "Ready To Move",
		"status": "Available",
		"main_image": "/images/properties/living.jpg",
		"main_image_thumb": "/images/properties/living.jpg",
		"developer_name": "Greenwood Developers",
		"instagram_url": null,
		"is_featured": true,
		"is_published": true,
		"created_at": "2026-08-30T11:55:58.841Z",
		"updated_at": "2026-08-30T11:55:58.841Z"
	},
	{
		"id": "3249a160-c7ad-408a-bb7a-6913496c401f",
		"slug": "3-bhk-luxury-flat-in-complex-with-infinity-pool-newtown-prop003",
		"title": "3 BHK Luxury Flat in Complex with Infinity Pool - Newtown",
		"location": "Newtown, Kolkata",
		"locality": "Newtown",
		"price_inr": 98e5,
		"price_display": null,
		"bhk_type": "3 BHK",
		"property_type": "Apartment",
		"possession_status": "Under Construction",
		"furnishing_status": "Unfurnished",
		"area_sqft": 1500,
		"bathrooms": 3,
		"balconies": 2,
		"floor": "10th out of G+15",
		"facing": "South",
		"parking": "1 Covered Parking",
		"amenities": [
			"Infinity Pool",
			"Clubhouse",
			"Gym",
			"Spa",
			"24/7 Security",
			"Concierge Service",
			"Landscaped Gardens"
		],
		"landmarks": ["Eco Park, Axis Mall"],
		"description": "Experience luxury living in this upcoming 3 BHK apartment in Newtown. Part of a prestigious complex featuring an infinity pool, state-of-the-art clubhouse, and panoramic city views. Ideal for modern families.",
		"category": "Luxury",
		"status": "Available",
		"main_image": "/images/properties/facade.jpg",
		"main_image_thumb": "/images/properties/facade.jpg",
		"developer_name": "Infinity Homes",
		"instagram_url": null,
		"is_featured": true,
		"is_published": true,
		"created_at": "2026-08-30T12:28:18.580Z",
		"updated_at": "2026-08-30T12:28:18.580Z"
	},
	{
		"id": "4bf62e21-000e-47a2-bc4f-a6a8d52bd2f1",
		"slug": "ready-to-move-2-bhk-gated-society-flat-near-garia-more-prop001",
		"title": "Ready-to-Move 2 BHK Gated Society Flat Near Garia More",
		"location": "Garia More, Kolkata",
		"locality": "Garia",
		"price_inr": 55e5,
		"price_display": null,
		"bhk_type": "2 BHK",
		"property_type": "Apartment",
		"possession_status": "Ready To Move",
		"furnishing_status": "Semi-Furnished",
		"area_sqft": 950,
		"bathrooms": 2,
		"balconies": 1,
		"floor": "5th out of G+7",
		"facing": "East",
		"parking": "1 Covered Parking",
		"amenities": [
			"24/7 Security",
			"Power Backup",
			"Children's Play Area",
			"Gym",
			"Community Hall"
		],
		"landmarks": ["Garia More Metro Station, Peerless Hospital"],
		"description": "Spacious 2 BHK flat in a well-maintained gated society, just a stone's throw away from Garia More Metro Station. Features modern amenities and excellent connectivity.",
		"category": "Ready To Move",
		"status": "Available",
		"main_image": "/images/properties/living.jpg",
		"main_image_thumb": "/images/properties/living.jpg",
		"developer_name": "Greenwood Developers",
		"instagram_url": null,
		"is_featured": true,
		"is_published": true,
		"created_at": "2026-08-30T12:28:18.582Z",
		"updated_at": "2026-08-30T12:28:18.582Z"
	},
	{
		"id": "b9501e47-d299-4ecf-bc5c-96a6d2257177",
		"slug": "luxurious-4-bhk-flat-in-lake-town-block-a",
		"title": "Luxurious 4 BHK Flat in Lake Town Block A",
		"location": "Lake Town Block A, Kolkata",
		"locality": "Lake Town",
		"price_inr": 12e6,
		"price_display": null,
		"bhk_type": "4 BHK",
		"property_type": "Apartment",
		"possession_status": "Ready To Move",
		"furnishing_status": "Furnished",
		"area_sqft": 1800,
		"bathrooms": 3,
		"balconies": 3,
		"floor": "7th out of G+12",
		"facing": "South",
		"parking": "2 covered car parking",
		"amenities": [
			"Gym",
			"Swimming Pool",
			"Kids Play Area",
			"Intercom",
			"Power Backup",
			"24/7 Security"
		],
		"landmarks": ["Near Lake Town Big Bazaar, PVR Cinemas"],
		"description": "A spacious and fully furnished 4 BHK apartment in the prestigious Lake Town Block A. Offers a luxurious lifestyle with all modern amenities and excellent connectivity to shopping and entertainment.",
		"category": "Ready To Move",
		"status": "Available",
		"main_image": "/images/properties/penthouse.jpg",
		"main_image_thumb": "/images/properties/penthouse.jpg",
		"developer_name": "Elite Homes",
		"instagram_url": "https://www.instagram.com/reel/property346_reel",
		"is_featured": false,
		"is_published": true,
		"created_at": "2026-08-30T12:34:17.748Z",
		"updated_at": "2026-08-30T12:34:17.748Z"
	},
	{
		"id": "69d2779d-3777-4b4f-aa89-684084518fc6",
		"slug": "cozy-3-bhk-flat-in-bangur-avenue-lake-town",
		"title": "Cozy 3 BHK Flat in Bangur Avenue, Lake Town",
		"location": "Bangur Avenue, Lake Town, Kolkata",
		"locality": "Lake Town",
		"price_inr": 6e6,
		"price_display": null,
		"bhk_type": "3 BHK",
		"property_type": "Apartment",
		"possession_status": "Under Construction",
		"furnishing_status": "Unfurnished",
		"area_sqft": 1050,
		"bathrooms": 2,
		"balconies": 1,
		"floor": "3rd out of G+5",
		"facing": "North-East",
		"parking": "Open parking available",
		"amenities": [
			"Children's Play Area",
			"Community Hall",
			"24/7 Security"
		],
		"landmarks": ["Near Bangur Avenue Market, Lake Town Clock Tower"],
		"description": "An unfurnished 3 BHK flat in a prime location of Bangur Avenue, Lake Town. Ideal for families looking for a new home with essential amenities and good connectivity.",
		"category": "Budget",
		"status": "Available",
		"main_image": "/images/properties/living.jpg",
		"main_image_thumb": "/images/properties/living.jpg",
		"developer_name": "Lakeview Builders",
		"instagram_url": "https://www.instagram.com/reel/property372_reel",
		"is_featured": false,
		"is_published": true,
		"created_at": "2026-08-30T12:34:17.749Z",
		"updated_at": "2026-08-30T12:34:17.749Z"
	},
	{
		"id": "e1534117-1acb-45a8-a338-f769ca259f12",
		"slug": "spacious-3-bhk-semifurnished-flat-in-rajarhat",
		"title": "Spacious 3 BHK Semifurnished Flat in Rajarhat",
		"location": "Rajarhat, Kolkata",
		"locality": "Rajarhat",
		"price_inr": 75e5,
		"price_display": null,
		"bhk_type": "3 BHK",
		"property_type": "Apartment",
		"possession_status": "Ready To Move",
		"furnishing_status": "Semi-Furnished",
		"area_sqft": 1200,
		"bathrooms": 2,
		"balconies": 2,
		"floor": "5th out of G+10",
		"facing": "East",
		"parking": "1 covered car parking",
		"amenities": [
			"Swimming Pool",
			"Gym",
			"Club House",
			"24/7 Security",
			"Power Backup"
		],
		"landmarks": ["Near City Centre 2, DPS Newtown"],
		"description": "A beautifully designed 3 BHK semi-furnished flat in the heart of Rajarhat. Features modern amenities, spacious rooms, and excellent connectivity to major hubs.",
		"category": "Premium",
		"status": "Available",
		"main_image": "/images/properties/facade.jpg",
		"main_image_thumb": "/images/properties/facade.jpg",
		"developer_name": "Greenfield Developers",
		"instagram_url": "https://www.instagram.com/reel/property370_reel",
		"is_featured": false,
		"is_published": true,
		"created_at": "2026-08-30T12:34:17.750Z",
		"updated_at": "2026-08-30T12:34:17.750Z"
	},
	{
		"id": "54be72e8-3311-4382-9fe7-112685d64b0f",
		"slug": "3-bhk-flat-with-private-open-terrace-in-nayabad",
		"title": "3 BHK Flat with Private Open Terrace in Nayabad",
		"location": "Nayabad, Kolkata",
		"locality": "Nayabad",
		"price_inr": 62e5,
		"price_display": null,
		"bhk_type": "3 BHK",
		"property_type": "Apartment",
		"possession_status": "Ready To Move",
		"furnishing_status": "Semi-Furnished",
		"area_sqft": 1500,
		"bathrooms": 3,
		"balconies": 1,
		"floor": "Top Floor (4th out of G+4)",
		"facing": "North-East",
		"parking": "1 Covered Parking",
		"amenities": [
			"Private Terrace",
			"Power Backup",
			"Intercom",
			"Security"
		],
		"landmarks": ["Near Nayabad, kobi subhash Metro Station, Ruby Hospital"],
		"description": "Experience luxury living in this spacious 3 BHK flat in Nayabad, featuring a unique private open terrace perfect for entertaining or relaxation. The apartment is semi-furnished and offers excellent natural light. Located close to essential services and public transport.",
		"category": "Premium",
		"status": "Available",
		"main_image": "/images/properties/living.jpg",
		"main_image_thumb": "/images/properties/living.jpg",
		"developer_name": "Urban Homes Pvt. Ltd.",
		"instagram_url": null,
		"is_featured": true,
		"is_published": true,
		"created_at": "2026-08-30T12:41:16.638Z",
		"updated_at": "2026-08-30T12:41:16.638Z"
	},
	{
		"id": "75de911b-220e-4e2c-89e8-d7d901a06b1b",
		"slug": "brand-new-3-bhk-flat-in-bangur-avenue-lake-town",
		"title": "Brand New 3 BHK Flat in Bangur Avenue, Lake Town",
		"location": "Bangur Avenue, Lake Town, Kolkata",
		"locality": "Lake Town",
		"price_inr": 94e5,
		"price_display": null,
		"bhk_type": "3 BHK",
		"property_type": "Apartment",
		"possession_status": "Ready To Move",
		"furnishing_status": "Unfurnished",
		"area_sqft": 1200,
		"bathrooms": 2,
		"balconies": 2,
		"floor": "3rd out of G+4",
		"facing": "East",
		"parking": "1 Covered Parking",
		"amenities": [
			"Gym",
			"Community Hall",
			"24/7 Security",
			"Kids Play Area"
		],
		"landmarks": ["Near Lake Town Clock Tower, PVR Cinemas"],
		"description": "Discover this brand new 3 BHK flat located in the prime area of Bangur Avenue, Lake Town. Featuring spacious rooms, modern fittings, and excellent connectivity. Enjoy amenities like a gym and community hall. Ideal for families looking for a comfortable and convenient living experience.",
		"category": "Ready To Move",
		"status": "Available",
		"main_image": "/images/properties/facade.jpg",
		"main_image_thumb": "/images/properties/facade.jpg",
		"developer_name": "Greenwood Developers",
		"instagram_url": null,
		"is_featured": false,
		"is_published": true,
		"created_at": "2026-08-30T12:41:16.639Z",
		"updated_at": "2026-08-30T12:41:16.639Z"
	}
];
var FALLBACK_PROPERTY_IMAGES = [
	{
		"id": "62900ba8-06c8-48ab-9c98-efd382333f57",
		"property_id": "9befed83-ea12-42c0-b588-48fa9c5add9e",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "62900ba8-06c8-48ab-9c98-efd382333f57",
		"property_id": "4bf62e21-000e-47a2-bc4f-a6a8d52bd2f1",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "62900ba8-06c8-48ab-9c98-efd382333f57",
		"property_id": "75de911b-220e-4e2c-89e8-d7d901a06b1b",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "6b04b634-6b97-4acf-8fcd-26b73a4dcfa6",
		"property_id": "9befed83-ea12-42c0-b588-48fa9c5add9e",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "6b04b634-6b97-4acf-8fcd-26b73a4dcfa6",
		"property_id": "4bf62e21-000e-47a2-bc4f-a6a8d52bd2f1",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "6b04b634-6b97-4acf-8fcd-26b73a4dcfa6",
		"property_id": "75de911b-220e-4e2c-89e8-d7d901a06b1b",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "68bcb5e2-0368-46d7-b264-90cb9899340d",
		"property_id": "9befed83-ea12-42c0-b588-48fa9c5add9e",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "68bcb5e2-0368-46d7-b264-90cb9899340d",
		"property_id": "4bf62e21-000e-47a2-bc4f-a6a8d52bd2f1",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "68bcb5e2-0368-46d7-b264-90cb9899340d",
		"property_id": "75de911b-220e-4e2c-89e8-d7d901a06b1b",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "982f28b9-4eaa-4ccd-a73e-2230a9e5185a",
		"property_id": "9befed83-ea12-42c0-b588-48fa9c5add9e",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "982f28b9-4eaa-4ccd-a73e-2230a9e5185a",
		"property_id": "4bf62e21-000e-47a2-bc4f-a6a8d52bd2f1",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "982f28b9-4eaa-4ccd-a73e-2230a9e5185a",
		"property_id": "75de911b-220e-4e2c-89e8-d7d901a06b1b",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "634abc48-1a2a-4f15-b7af-c2ac87bd372e",
		"property_id": "9befed83-ea12-42c0-b588-48fa9c5add9e",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "634abc48-1a2a-4f15-b7af-c2ac87bd372e",
		"property_id": "4bf62e21-000e-47a2-bc4f-a6a8d52bd2f1",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "634abc48-1a2a-4f15-b7af-c2ac87bd372e",
		"property_id": "75de911b-220e-4e2c-89e8-d7d901a06b1b",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "f941549d-9996-4b75-bcf2-eead0dc7b28c",
		"property_id": "9befed83-ea12-42c0-b588-48fa9c5add9e",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "f941549d-9996-4b75-bcf2-eead0dc7b28c",
		"property_id": "4bf62e21-000e-47a2-bc4f-a6a8d52bd2f1",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "f941549d-9996-4b75-bcf2-eead0dc7b28c",
		"property_id": "75de911b-220e-4e2c-89e8-d7d901a06b1b",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "44a13995-2a17-4fde-832c-c6d60b508808",
		"property_id": "9befed83-ea12-42c0-b588-48fa9c5add9e",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "44a13995-2a17-4fde-832c-c6d60b508808",
		"property_id": "4bf62e21-000e-47a2-bc4f-a6a8d52bd2f1",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "44a13995-2a17-4fde-832c-c6d60b508808",
		"property_id": "75de911b-220e-4e2c-89e8-d7d901a06b1b",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "83ecabb7-a75e-4aac-93e7-a924fc43f1ba",
		"property_id": "9befed83-ea12-42c0-b588-48fa9c5add9e",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "83ecabb7-a75e-4aac-93e7-a924fc43f1ba",
		"property_id": "4bf62e21-000e-47a2-bc4f-a6a8d52bd2f1",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "83ecabb7-a75e-4aac-93e7-a924fc43f1ba",
		"property_id": "75de911b-220e-4e2c-89e8-d7d901a06b1b",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "fafd173c-08c7-4752-9ebe-0eeac7a54860",
		"property_id": "9befed83-ea12-42c0-b588-48fa9c5add9e",
		"sort_order": 9,
		"caption": "",
		"alt_text": "Property image 9",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "fafd173c-08c7-4752-9ebe-0eeac7a54860",
		"property_id": "4bf62e21-000e-47a2-bc4f-a6a8d52bd2f1",
		"sort_order": 9,
		"caption": "",
		"alt_text": "Property image 9",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "fafd173c-08c7-4752-9ebe-0eeac7a54860",
		"property_id": "75de911b-220e-4e2c-89e8-d7d901a06b1b",
		"sort_order": 9,
		"caption": "",
		"alt_text": "Property image 9",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "082bd7d0-4986-4077-866f-eccfaae8e7d9",
		"property_id": "54be72e8-3311-4382-9fe7-112685d64b0f",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "49071033-a95b-4002-803e-f819ba8007ed",
		"property_id": "54be72e8-3311-4382-9fe7-112685d64b0f",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "fbd1b259-ec7d-4acd-84fc-7e0f1fdf0ae2",
		"property_id": "54be72e8-3311-4382-9fe7-112685d64b0f",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "8c573024-b02d-4856-b836-472b2bca969d",
		"property_id": "54be72e8-3311-4382-9fe7-112685d64b0f",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "8998aee4-d15a-429c-b350-863356f0ece1",
		"property_id": "54be72e8-3311-4382-9fe7-112685d64b0f",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "98d9cb98-ea18-4468-8b10-0f7fe3faa957",
		"property_id": "54be72e8-3311-4382-9fe7-112685d64b0f",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "a85741d0-2422-4124-aac7-1ee2917138e5",
		"property_id": "54be72e8-3311-4382-9fe7-112685d64b0f",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "9681ab12-28b1-45d8-8cad-ac6808277258",
		"property_id": "54be72e8-3311-4382-9fe7-112685d64b0f",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "6e333916-558e-45ea-ac75-0549911af184",
		"property_id": "54be72e8-3311-4382-9fe7-112685d64b0f",
		"sort_order": 9,
		"caption": "",
		"alt_text": "Property image 9",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "ee340e03-8abf-4373-85a1-58db6ca6687a",
		"property_id": "54be72e8-3311-4382-9fe7-112685d64b0f",
		"sort_order": 10,
		"caption": "",
		"alt_text": "Property image 10",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "21f00320-811d-4c27-ab2a-8a6c68ed784a",
		"property_id": "1cf3cbaa-7933-45b3-9451-137d8b663e3a",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "21f00320-811d-4c27-ab2a-8a6c68ed784a",
		"property_id": "e1534117-1acb-45a8-a338-f769ca259f12",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "6c29f149-b543-4edf-8c4d-4e06545f8569",
		"property_id": "1cf3cbaa-7933-45b3-9451-137d8b663e3a",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "6c29f149-b543-4edf-8c4d-4e06545f8569",
		"property_id": "e1534117-1acb-45a8-a338-f769ca259f12",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "7037d501-73e6-4e61-8d1d-e7a9f4d799ec",
		"property_id": "1cf3cbaa-7933-45b3-9451-137d8b663e3a",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "7037d501-73e6-4e61-8d1d-e7a9f4d799ec",
		"property_id": "e1534117-1acb-45a8-a338-f769ca259f12",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "71c0d24d-2b24-442c-9fa7-ca6f6081560d",
		"property_id": "1cf3cbaa-7933-45b3-9451-137d8b663e3a",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "71c0d24d-2b24-442c-9fa7-ca6f6081560d",
		"property_id": "e1534117-1acb-45a8-a338-f769ca259f12",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "3e46d72c-0915-4bfa-9a67-0675c51ad3b2",
		"property_id": "1cf3cbaa-7933-45b3-9451-137d8b663e3a",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "3e46d72c-0915-4bfa-9a67-0675c51ad3b2",
		"property_id": "e1534117-1acb-45a8-a338-f769ca259f12",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "05c1af06-46bc-4511-adbb-1a3516db1a8f",
		"property_id": "1cf3cbaa-7933-45b3-9451-137d8b663e3a",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "05c1af06-46bc-4511-adbb-1a3516db1a8f",
		"property_id": "e1534117-1acb-45a8-a338-f769ca259f12",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "6ebb3dc1-39a0-42bc-a70a-1645e75e70ec",
		"property_id": "1cf3cbaa-7933-45b3-9451-137d8b663e3a",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "6ebb3dc1-39a0-42bc-a70a-1645e75e70ec",
		"property_id": "e1534117-1acb-45a8-a338-f769ca259f12",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "0fdb76df-d621-4d3c-889d-5868086ab65f",
		"property_id": "1cf3cbaa-7933-45b3-9451-137d8b663e3a",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "0fdb76df-d621-4d3c-889d-5868086ab65f",
		"property_id": "e1534117-1acb-45a8-a338-f769ca259f12",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "3ed31baa-3757-4dc8-a188-701374f4b2fa",
		"property_id": "1cf3cbaa-7933-45b3-9451-137d8b663e3a",
		"sort_order": 9,
		"caption": "",
		"alt_text": "Property image 9",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "3ed31baa-3757-4dc8-a188-701374f4b2fa",
		"property_id": "e1534117-1acb-45a8-a338-f769ca259f12",
		"sort_order": 9,
		"caption": "",
		"alt_text": "Property image 9",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "4699cd22-f0df-4e65-9332-1899f1cdb55f",
		"property_id": "1cf3cbaa-7933-45b3-9451-137d8b663e3a",
		"sort_order": 10,
		"caption": "",
		"alt_text": "Property image 10",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "4699cd22-f0df-4e65-9332-1899f1cdb55f",
		"property_id": "e1534117-1acb-45a8-a338-f769ca259f12",
		"sort_order": 10,
		"caption": "",
		"alt_text": "Property image 10",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "0b63ae66-2533-4741-b0bd-3bfc2b03ced9",
		"property_id": "e911f87a-f3bf-41ff-8d84-331cde9a4e09",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "0b63ae66-2533-4741-b0bd-3bfc2b03ced9",
		"property_id": "69d2779d-3777-4b4f-aa89-684084518fc6",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "7d093736-78c8-4d0e-b036-0bcb2a863c0b",
		"property_id": "e911f87a-f3bf-41ff-8d84-331cde9a4e09",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "7d093736-78c8-4d0e-b036-0bcb2a863c0b",
		"property_id": "69d2779d-3777-4b4f-aa89-684084518fc6",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "124d7eda-c716-4cf6-b3de-2c3d7cf5cf28",
		"property_id": "e911f87a-f3bf-41ff-8d84-331cde9a4e09",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "124d7eda-c716-4cf6-b3de-2c3d7cf5cf28",
		"property_id": "69d2779d-3777-4b4f-aa89-684084518fc6",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "38b2d927-7614-45dc-8526-3762bf79ee1a",
		"property_id": "e911f87a-f3bf-41ff-8d84-331cde9a4e09",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "38b2d927-7614-45dc-8526-3762bf79ee1a",
		"property_id": "69d2779d-3777-4b4f-aa89-684084518fc6",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "1304518e-2b93-49f0-b8bf-aae97e50e850",
		"property_id": "e911f87a-f3bf-41ff-8d84-331cde9a4e09",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "1304518e-2b93-49f0-b8bf-aae97e50e850",
		"property_id": "69d2779d-3777-4b4f-aa89-684084518fc6",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "ed3f456d-734d-4847-ac5d-2fbdd05b8305",
		"property_id": "e911f87a-f3bf-41ff-8d84-331cde9a4e09",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "ed3f456d-734d-4847-ac5d-2fbdd05b8305",
		"property_id": "69d2779d-3777-4b4f-aa89-684084518fc6",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "d2d09983-f469-43ab-8268-7cd507c6fb32",
		"property_id": "e911f87a-f3bf-41ff-8d84-331cde9a4e09",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "d2d09983-f469-43ab-8268-7cd507c6fb32",
		"property_id": "69d2779d-3777-4b4f-aa89-684084518fc6",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "13d3bb47-8d52-4a8b-aeee-ef731d93c4e9",
		"property_id": "e911f87a-f3bf-41ff-8d84-331cde9a4e09",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "13d3bb47-8d52-4a8b-aeee-ef731d93c4e9",
		"property_id": "69d2779d-3777-4b4f-aa89-684084518fc6",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "f927876b-e3ad-4b94-8c12-9de57e465fee",
		"property_id": "e911f87a-f3bf-41ff-8d84-331cde9a4e09",
		"sort_order": 9,
		"caption": "",
		"alt_text": "Property image 9",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "f927876b-e3ad-4b94-8c12-9de57e465fee",
		"property_id": "69d2779d-3777-4b4f-aa89-684084518fc6",
		"sort_order": 9,
		"caption": "",
		"alt_text": "Property image 9",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "f1578f6c-1fa2-43f6-b807-d4d2753f0154",
		"property_id": "e911f87a-f3bf-41ff-8d84-331cde9a4e09",
		"sort_order": 10,
		"caption": "",
		"alt_text": "Property image 10",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "f1578f6c-1fa2-43f6-b807-d4d2753f0154",
		"property_id": "69d2779d-3777-4b4f-aa89-684084518fc6",
		"sort_order": 10,
		"caption": "",
		"alt_text": "Property image 10",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "390d45f6-9f1d-4cc1-87ec-81363935550b",
		"property_id": "e911f87a-f3bf-41ff-8d84-331cde9a4e09",
		"sort_order": 11,
		"caption": "",
		"alt_text": "Property image 11",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "390d45f6-9f1d-4cc1-87ec-81363935550b",
		"property_id": "69d2779d-3777-4b4f-aa89-684084518fc6",
		"sort_order": 11,
		"caption": "",
		"alt_text": "Property image 11",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "ca699e58-5df7-46c0-821a-efb28d2c2bab",
		"property_id": "e911f87a-f3bf-41ff-8d84-331cde9a4e09",
		"sort_order": 12,
		"caption": "",
		"alt_text": "Property image 12",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "ca699e58-5df7-46c0-821a-efb28d2c2bab",
		"property_id": "69d2779d-3777-4b4f-aa89-684084518fc6",
		"sort_order": 12,
		"caption": "",
		"alt_text": "Property image 12",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "775a0f5b-3dee-4d76-90ac-41b6521ecb6e",
		"property_id": "3930b887-9f6e-4e5c-a3ab-9e15911c3dbd",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "775a0f5b-3dee-4d76-90ac-41b6521ecb6e",
		"property_id": "b2d7ca00-a249-4411-a5ef-c57f03170891",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "775a0f5b-3dee-4d76-90ac-41b6521ecb6e",
		"property_id": "b9501e47-d299-4ecf-bc5c-96a6d2257177",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "dc79b67b-1bb3-466a-bffb-0bcdee9104be",
		"property_id": "3930b887-9f6e-4e5c-a3ab-9e15911c3dbd",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "dc79b67b-1bb3-466a-bffb-0bcdee9104be",
		"property_id": "b2d7ca00-a249-4411-a5ef-c57f03170891",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "dc79b67b-1bb3-466a-bffb-0bcdee9104be",
		"property_id": "b9501e47-d299-4ecf-bc5c-96a6d2257177",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "5165c226-6eeb-4213-a6d9-7b454d9f2c99",
		"property_id": "3930b887-9f6e-4e5c-a3ab-9e15911c3dbd",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "5165c226-6eeb-4213-a6d9-7b454d9f2c99",
		"property_id": "b2d7ca00-a249-4411-a5ef-c57f03170891",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "5165c226-6eeb-4213-a6d9-7b454d9f2c99",
		"property_id": "b9501e47-d299-4ecf-bc5c-96a6d2257177",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "01b88589-fcef-4b82-986e-368a4b194204",
		"property_id": "3930b887-9f6e-4e5c-a3ab-9e15911c3dbd",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "01b88589-fcef-4b82-986e-368a4b194204",
		"property_id": "b2d7ca00-a249-4411-a5ef-c57f03170891",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "01b88589-fcef-4b82-986e-368a4b194204",
		"property_id": "b9501e47-d299-4ecf-bc5c-96a6d2257177",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "0c8d24f7-966a-46b2-9bcc-22de1a067816",
		"property_id": "3930b887-9f6e-4e5c-a3ab-9e15911c3dbd",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "0c8d24f7-966a-46b2-9bcc-22de1a067816",
		"property_id": "b2d7ca00-a249-4411-a5ef-c57f03170891",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "0c8d24f7-966a-46b2-9bcc-22de1a067816",
		"property_id": "b9501e47-d299-4ecf-bc5c-96a6d2257177",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "9f0bf090-f61e-4d8e-8db2-3b7594f05d67",
		"property_id": "3930b887-9f6e-4e5c-a3ab-9e15911c3dbd",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "9f0bf090-f61e-4d8e-8db2-3b7594f05d67",
		"property_id": "b2d7ca00-a249-4411-a5ef-c57f03170891",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "9f0bf090-f61e-4d8e-8db2-3b7594f05d67",
		"property_id": "b9501e47-d299-4ecf-bc5c-96a6d2257177",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "01d254b7-430b-42aa-93ac-ebd2dd55468c",
		"property_id": "3930b887-9f6e-4e5c-a3ab-9e15911c3dbd",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "01d254b7-430b-42aa-93ac-ebd2dd55468c",
		"property_id": "b2d7ca00-a249-4411-a5ef-c57f03170891",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "01d254b7-430b-42aa-93ac-ebd2dd55468c",
		"property_id": "b9501e47-d299-4ecf-bc5c-96a6d2257177",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "c6e2d305-f3e9-4774-a72b-cc0d841ad019",
		"property_id": "3930b887-9f6e-4e5c-a3ab-9e15911c3dbd",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "c6e2d305-f3e9-4774-a72b-cc0d841ad019",
		"property_id": "b2d7ca00-a249-4411-a5ef-c57f03170891",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "c6e2d305-f3e9-4774-a72b-cc0d841ad019",
		"property_id": "b9501e47-d299-4ecf-bc5c-96a6d2257177",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "0660f115-5655-4bce-a658-2a7a1ffc394e",
		"property_id": "3930b887-9f6e-4e5c-a3ab-9e15911c3dbd",
		"sort_order": 9,
		"caption": "",
		"alt_text": "Property image 9",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "0660f115-5655-4bce-a658-2a7a1ffc394e",
		"property_id": "b2d7ca00-a249-4411-a5ef-c57f03170891",
		"sort_order": 9,
		"caption": "",
		"alt_text": "Property image 9",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "0660f115-5655-4bce-a658-2a7a1ffc394e",
		"property_id": "b9501e47-d299-4ecf-bc5c-96a6d2257177",
		"sort_order": 9,
		"caption": "",
		"alt_text": "Property image 9",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "817bf222-28be-46f4-9ab7-b07eba4bf6a7",
		"property_id": "3930b887-9f6e-4e5c-a3ab-9e15911c3dbd",
		"sort_order": 10,
		"caption": "",
		"alt_text": "Property image 10",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "817bf222-28be-46f4-9ab7-b07eba4bf6a7",
		"property_id": "b2d7ca00-a249-4411-a5ef-c57f03170891",
		"sort_order": 10,
		"caption": "",
		"alt_text": "Property image 10",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "817bf222-28be-46f4-9ab7-b07eba4bf6a7",
		"property_id": "b9501e47-d299-4ecf-bc5c-96a6d2257177",
		"sort_order": 10,
		"caption": "",
		"alt_text": "Property image 10",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "b38c8881-a95c-4a2d-9b08-be0dd133cfc2",
		"property_id": "3930b887-9f6e-4e5c-a3ab-9e15911c3dbd",
		"sort_order": 11,
		"caption": "",
		"alt_text": "Property image 11",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "b38c8881-a95c-4a2d-9b08-be0dd133cfc2",
		"property_id": "b2d7ca00-a249-4411-a5ef-c57f03170891",
		"sort_order": 11,
		"caption": "",
		"alt_text": "Property image 11",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "b38c8881-a95c-4a2d-9b08-be0dd133cfc2",
		"property_id": "b9501e47-d299-4ecf-bc5c-96a6d2257177",
		"sort_order": 11,
		"caption": "",
		"alt_text": "Property image 11",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "df4ac29b-2a00-451d-bef4-5a041fbd1c30",
		"property_id": "007e57c0-b818-4005-b8e2-3c67c9a26cb5",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "df4ac29b-2a00-451d-bef4-5a041fbd1c30",
		"property_id": "d97b4b66-08e0-4962-8e6b-6ad9a160a110",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "df4ac29b-2a00-451d-bef4-5a041fbd1c30",
		"property_id": "3249a160-c7ad-408a-bb7a-6913496c401f",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "55c28855-6505-497c-9133-3b139ea2017f",
		"property_id": "007e57c0-b818-4005-b8e2-3c67c9a26cb5",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "55c28855-6505-497c-9133-3b139ea2017f",
		"property_id": "d97b4b66-08e0-4962-8e6b-6ad9a160a110",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "55c28855-6505-497c-9133-3b139ea2017f",
		"property_id": "3249a160-c7ad-408a-bb7a-6913496c401f",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "34aa4766-d908-43e5-905a-ff35d8399d2c",
		"property_id": "007e57c0-b818-4005-b8e2-3c67c9a26cb5",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "34aa4766-d908-43e5-905a-ff35d8399d2c",
		"property_id": "d97b4b66-08e0-4962-8e6b-6ad9a160a110",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "34aa4766-d908-43e5-905a-ff35d8399d2c",
		"property_id": "3249a160-c7ad-408a-bb7a-6913496c401f",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "5eb864b2-a115-44aa-9e6a-aee0ad4a9957",
		"property_id": "007e57c0-b818-4005-b8e2-3c67c9a26cb5",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "5eb864b2-a115-44aa-9e6a-aee0ad4a9957",
		"property_id": "d97b4b66-08e0-4962-8e6b-6ad9a160a110",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "5eb864b2-a115-44aa-9e6a-aee0ad4a9957",
		"property_id": "3249a160-c7ad-408a-bb7a-6913496c401f",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "5d5fb979-ad47-42cc-92d5-17f919276ed7",
		"property_id": "007e57c0-b818-4005-b8e2-3c67c9a26cb5",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "5d5fb979-ad47-42cc-92d5-17f919276ed7",
		"property_id": "d97b4b66-08e0-4962-8e6b-6ad9a160a110",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "5d5fb979-ad47-42cc-92d5-17f919276ed7",
		"property_id": "3249a160-c7ad-408a-bb7a-6913496c401f",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "cfc54a55-8200-42cb-aca8-57b9d3b7e22f",
		"property_id": "007e57c0-b818-4005-b8e2-3c67c9a26cb5",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "cfc54a55-8200-42cb-aca8-57b9d3b7e22f",
		"property_id": "d97b4b66-08e0-4962-8e6b-6ad9a160a110",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "cfc54a55-8200-42cb-aca8-57b9d3b7e22f",
		"property_id": "3249a160-c7ad-408a-bb7a-6913496c401f",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "d2e83757-5b2c-4933-8acf-41dd71b9ea27",
		"property_id": "007e57c0-b818-4005-b8e2-3c67c9a26cb5",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "d2e83757-5b2c-4933-8acf-41dd71b9ea27",
		"property_id": "d97b4b66-08e0-4962-8e6b-6ad9a160a110",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "d2e83757-5b2c-4933-8acf-41dd71b9ea27",
		"property_id": "3249a160-c7ad-408a-bb7a-6913496c401f",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "1adc2e8b-2d06-444c-805d-fe09bac6116f",
		"property_id": "007e57c0-b818-4005-b8e2-3c67c9a26cb5",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "1adc2e8b-2d06-444c-805d-fe09bac6116f",
		"property_id": "d97b4b66-08e0-4962-8e6b-6ad9a160a110",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "1adc2e8b-2d06-444c-805d-fe09bac6116f",
		"property_id": "3249a160-c7ad-408a-bb7a-6913496c401f",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "315e030a-109c-441d-9ea3-d8cef4912963",
		"property_id": "007e57c0-b818-4005-b8e2-3c67c9a26cb5",
		"sort_order": 9,
		"caption": "",
		"alt_text": "Property image 9",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "315e030a-109c-441d-9ea3-d8cef4912963",
		"property_id": "d97b4b66-08e0-4962-8e6b-6ad9a160a110",
		"sort_order": 9,
		"caption": "",
		"alt_text": "Property image 9",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "315e030a-109c-441d-9ea3-d8cef4912963",
		"property_id": "3249a160-c7ad-408a-bb7a-6913496c401f",
		"sort_order": 9,
		"caption": "",
		"alt_text": "Property image 9",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "2d53717f-5d31-4647-9d1b-13d850d7e49f",
		"property_id": "007e57c0-b818-4005-b8e2-3c67c9a26cb5",
		"sort_order": 10,
		"caption": "",
		"alt_text": "Property image 10",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "2d53717f-5d31-4647-9d1b-13d850d7e49f",
		"property_id": "d97b4b66-08e0-4962-8e6b-6ad9a160a110",
		"sort_order": 10,
		"caption": "",
		"alt_text": "Property image 10",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "2d53717f-5d31-4647-9d1b-13d850d7e49f",
		"property_id": "3249a160-c7ad-408a-bb7a-6913496c401f",
		"sort_order": 10,
		"caption": "",
		"alt_text": "Property image 10",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "c8ee3028-0945-429a-bcf6-a32c3e4a5d59",
		"property_id": "007e57c0-b818-4005-b8e2-3c67c9a26cb5",
		"sort_order": 11,
		"caption": "",
		"alt_text": "Property image 11",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "c8ee3028-0945-429a-bcf6-a32c3e4a5d59",
		"property_id": "d97b4b66-08e0-4962-8e6b-6ad9a160a110",
		"sort_order": 11,
		"caption": "",
		"alt_text": "Property image 11",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "c8ee3028-0945-429a-bcf6-a32c3e4a5d59",
		"property_id": "3249a160-c7ad-408a-bb7a-6913496c401f",
		"sort_order": 11,
		"caption": "",
		"alt_text": "Property image 11",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "0b6bd515-cae4-4729-9ec0-8c98a01d2f5d",
		"property_id": "9093c621-fa9b-45f2-be6e-5cb8483d0480",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "087ca600-a4ee-439b-bcfe-e84486c8fcca",
		"property_id": "9093c621-fa9b-45f2-be6e-5cb8483d0480",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "327bdfa9-e2d5-4211-b348-c1d5db5b9e2c",
		"property_id": "9093c621-fa9b-45f2-be6e-5cb8483d0480",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "dc20a4e2-99aa-45f8-a7cd-409d722cd6ed",
		"property_id": "9093c621-fa9b-45f2-be6e-5cb8483d0480",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "e79eafc7-2903-4dc5-bac2-5a6b257a88b7",
		"property_id": "9093c621-fa9b-45f2-be6e-5cb8483d0480",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "cf017f9b-1ef3-45a3-bfe7-af59c993f6b9",
		"property_id": "9093c621-fa9b-45f2-be6e-5cb8483d0480",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "93231aec-42d6-449d-9723-14dab0d9370c",
		"property_id": "9093c621-fa9b-45f2-be6e-5cb8483d0480",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "6cd35540-ff74-49c5-bbfb-be07ede0a9c7",
		"property_id": "d4a181c1-07ea-47b3-ae9b-60a34b673f71",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "91db82eb-55aa-421a-9e62-114ce8fab1a6",
		"property_id": "d4a181c1-07ea-47b3-ae9b-60a34b673f71",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "a81d0b22-10e0-4d4f-9428-69e22a081c86",
		"property_id": "d4a181c1-07ea-47b3-ae9b-60a34b673f71",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "d75199d6-8802-4055-9a35-c2b0500ac8ac",
		"property_id": "d4a181c1-07ea-47b3-ae9b-60a34b673f71",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "7e6925f4-efee-4c66-8c35-dfaa43ab5a04",
		"property_id": "d4a181c1-07ea-47b3-ae9b-60a34b673f71",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "f2c89ec9-193e-44c4-b1ba-47c616c9072d",
		"property_id": "d4a181c1-07ea-47b3-ae9b-60a34b673f71",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "e228dff2-03a4-48a1-8916-13e94db1ac13",
		"property_id": "d4a181c1-07ea-47b3-ae9b-60a34b673f71",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "9ba76080-4e1d-4e1c-a905-9654ad483648",
		"property_id": "d4a181c1-07ea-47b3-ae9b-60a34b673f71",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "851e4d57-0602-4f4c-98eb-d9fef6172945",
		"property_id": "9918382c-8a94-43fa-a160-fcb1b00e453c",
		"sort_order": 1,
		"caption": "",
		"alt_text": "Property image 1",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "a880449f-3ed0-40a5-97ab-f7dbfe9f4339",
		"property_id": "9918382c-8a94-43fa-a160-fcb1b00e453c",
		"sort_order": 2,
		"caption": "",
		"alt_text": "Property image 2",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "71e4977b-170b-4f6c-9f02-8e56f940d355",
		"property_id": "9918382c-8a94-43fa-a160-fcb1b00e453c",
		"sort_order": 3,
		"caption": "",
		"alt_text": "Property image 3",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "5a2ee6e3-5e09-485d-9fdf-beba5a84f72b",
		"property_id": "9918382c-8a94-43fa-a160-fcb1b00e453c",
		"sort_order": 4,
		"caption": "",
		"alt_text": "Property image 4",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "4107f2b3-3687-41f2-b6f2-dcfff0af5c9d",
		"property_id": "9918382c-8a94-43fa-a160-fcb1b00e453c",
		"sort_order": 5,
		"caption": "",
		"alt_text": "Property image 5",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "c97ea7ee-e531-4d76-9efa-a7529387b6db",
		"property_id": "9918382c-8a94-43fa-a160-fcb1b00e453c",
		"sort_order": 6,
		"caption": "",
		"alt_text": "Property image 6",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "8915327f-ac77-4281-a31d-86d1d9b96ff1",
		"property_id": "9918382c-8a94-43fa-a160-fcb1b00e453c",
		"sort_order": 7,
		"caption": "",
		"alt_text": "Property image 7",
		"image_url": "/images/properties/office.jpg",
		"thumb_url": "/images/properties/office.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "85e383ac-6d0f-41e2-b63a-db365f06a525",
		"property_id": "9918382c-8a94-43fa-a160-fcb1b00e453c",
		"sort_order": 8,
		"caption": "",
		"alt_text": "Property image 8",
		"image_url": "/images/og-banner.jpg",
		"thumb_url": "/images/og-banner.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "198776f0-3c74-44af-abde-e0fab32532af",
		"property_id": "9918382c-8a94-43fa-a160-fcb1b00e453c",
		"sort_order": 9,
		"caption": "",
		"alt_text": "Property image 9",
		"image_url": "/images/properties/living.jpg",
		"thumb_url": "/images/properties/living.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "42e2935b-c246-4411-b960-b9e0e7a8cbca",
		"property_id": "9918382c-8a94-43fa-a160-fcb1b00e453c",
		"sort_order": 10,
		"caption": "",
		"alt_text": "Property image 10",
		"image_url": "/images/properties/facade.jpg",
		"thumb_url": "/images/properties/facade.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "5f16040d-5eb3-4969-ace2-14106afbbe72",
		"property_id": "9918382c-8a94-43fa-a160-fcb1b00e453c",
		"sort_order": 11,
		"caption": "",
		"alt_text": "Property image 11",
		"image_url": "/images/properties/penthouse.jpg",
		"thumb_url": "/images/properties/penthouse.jpg",
		"created_at": "2026-08-25T05:00:00.000Z"
	}
];
var FALLBACK_BLOG_POSTS = [
	{
		"id": "7cdffa12-2922-4018-afc1-4bec360a04e7",
		"slug": "selling-your-home-in-a-competitive-market-strategies-for-success",
		"title": "Selling Your Home in a Competitive Market: Strategies for Success",
		"publish_date": "2023-09-28",
		"author": "Jessica Adams",
		"cover_image": "/images/kolkata.webp",
		"cover_thumb": "/images/kolkata.webp",
		"content": "When the market is competitive, standing out is key to selling your home quickly and for the best price. This article provides actionable strategies for sellers, including professional staging, effective pricing, high-quality photography, and compelling marketing. Learn how to highlight your home's unique features and attract serious buyers in a crowded market. We also offer tips on negotiating offers and preparing for closing.",
		"excerpt": "",
		"is_published": true,
		"created_at": "2026-08-25T05:00:00.000Z",
		"updated_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "f552939a-015d-47d7-9629-5ee4b1163091",
		"slug": "decoding-mortgage-rates-factors-that-influence-your-loan",
		"title": "Decoding Mortgage Rates: Factors That Influence Your Loan",
		"publish_date": "2023-10-05",
		"author": "Robert Green",
		"cover_image": "/images/og-banner.jpg",
		"cover_thumb": "/images/og-banner.jpg",
		"content": "Mortgage rates play a crucial role in the affordability of your home. This post demystifies how mortgage rates are determined, exploring key factors such as economic indicators, inflation, and the Federal Reserve's policies. We also discuss how your credit score, down payment, and loan type impact the rate you receive. Gain a clearer understanding to help you secure the best possible financing for your home.",
		"excerpt": "",
		"is_published": true,
		"created_at": "2026-08-25T05:00:00.000Z",
		"updated_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "47ea5159-5508-4052-b1fb-a66a72c23994",
		"slug": "first-time-homebuyer-s-checklist-what-you-need-to-know",
		"title": "First-Time Homebuyer's Checklist: What You Need to Know",
		"publish_date": "2023-08-20",
		"author": "Emily White",
		"cover_image": "/images/kolkata.webp",
		"cover_thumb": "/images/kolkata.webp",
		"content": "Buying your first home is an exciting milestone, but it can also feel overwhelming. Our comprehensive checklist guides first-time homebuyers through every step of the process, from saving for a down payment to closing on your new home. We cover pre-approval, finding a real estate agent, making an offer, and navigating inspections. Arm yourself with knowledge to make your first home purchase a smooth and successful experience.",
		"excerpt": "",
		"is_published": true,
		"created_at": "2026-08-25T05:00:00.000Z",
		"updated_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "935c5579-a97d-4365-99cb-90cae07d09ad",
		"slug": "the-benefits-of-investing-in-rental-properties",
		"title": "The Benefits of Investing in Rental Properties",
		"publish_date": "2023-11-01",
		"author": "David Lee",
		"cover_image": "/images/og-banner.jpg",
		"cover_thumb": "/images/og-banner.jpg",
		"content": "Real estate investment can be a powerful tool for building wealth, and rental properties are a popular choice. This article explores the numerous benefits of becoming a landlord, including passive income, property appreciation, and tax advantages. We delve into different types of rental properties, market analysis, and strategies for managing tenants effectively. Understand the risks and rewards to determine if this investment path is right for you.",
		"excerpt": "",
		"is_published": true,
		"created_at": "2026-08-25T05:00:00.000Z",
		"updated_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "f002d0ad-d12b-4387-bab3-6ab64f855db0",
		"slug": "top-5-home-improvements-for-maximizing-resale-value",
		"title": "Top 5 Home Improvements for Maximizing Resale Value",
		"publish_date": "2023-09-15",
		"author": "Michael Chen",
		"cover_image": "/images/kolkata.webp",
		"cover_thumb": "/images/kolkata.webp",
		"content": "Looking to sell your home soon? Certain renovations offer a higher return on investment than others. We've compiled a list of the top five home improvements that not only enhance your living space but also significantly boost your property's resale value. From kitchen remodels to bathroom updates and curb appeal enhancements, learn where to focus your efforts for the best financial outcome. Get practical advice on budgeting and choosing the right contractors.",
		"excerpt": "",
		"is_published": true,
		"created_at": "2026-08-25T05:00:00.000Z",
		"updated_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "bca161f6-8586-46ea-ab37-1f1b415243f2",
		"slug": "understanding-the-current-housing-market-a-buyer-s-guide",
		"title": "Understanding the Current Housing Market: A Buyer's Guide",
		"publish_date": "2023-10-26",
		"author": "Sarah Jenkins",
		"cover_image": "/images/og-banner.jpg",
		"cover_thumb": "/images/og-banner.jpg",
		"content": "Navigating today's housing market can be challenging, but with the right information, buyers can make informed decisions. This guide breaks down current trends, interest rates, and what to expect when searching for your dream home. We cover everything from inventory levels to negotiation strategies, ensuring you're well-prepared for your home-buying journey. Discover tips on securing financing and identifying properties that offer long-term value.",
		"excerpt": "",
		"is_published": true,
		"created_at": "2026-08-25T05:00:00.000Z",
		"updated_at": "2026-08-25T05:00:00.000Z"
	}
];
var FALLBACK_FAQS = [
	{
		"id": "c5b44225-54bf-4fb7-a7aa-ae49571d8b9f",
		"question": "What makes your real estate service unique?",
		"answer": "Our unique value proposition lies in our blend of cutting-edge technology for efficient property matching, personalized human-centric service from dedicated agents, and a commitment to transparency and ethical practices. We prioritize building long-term relationships and ensuring a seamless, stress-free experience for all our clients.",
		"category": "About Us",
		"display_order": 6,
		"is_published": true,
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "b4dfab9e-e867-4b48-930a-c7a5ac5bb648",
		"question": "How do you provide personalized property recommendations?",
		"answer": "We use a combination of advanced algorithms and human expertise. After understanding your specific preferences, budget, and lifestyle needs through a detailed consultation, our system filters properties, and our agents hand-pick the best matches, ensuring you only see homes that truly fit your criteria.",
		"category": "General",
		"display_order": 5,
		"is_published": true,
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "7038b4be-1a96-4f81-8399-ce2f16607906",
		"question": "What support do you offer for selling my property?",
		"answer": "We provide comprehensive selling assistance, including professional property valuation, high-quality photography and virtual tours, extensive marketing across multiple platforms, and expert negotiation to ensure you get the best possible price. We guide you through every step from listing to closing.",
		"category": "Selling",
		"display_order": 4,
		"is_published": true,
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "f6c79e07-074b-4c08-a8f9-32a6a3bfbc2e",
		"question": "Can you help me with real estate investment advice?",
		"answer": "Absolutely! Our team of experienced real estate advisors offers personalized investment consultations. We can help you identify high-potential properties, analyze market trends, and develop a strategy tailored to your financial goals, whether you're a first-time investor or looking to expand your portfolio.",
		"category": "Investment",
		"display_order": 3,
		"is_published": true,
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "795e0596-4b45-4fda-9689-6d480ff107ff",
		"question": "What kind of property verification do you provide?",
		"answer": "We conduct thorough due diligence on all listed properties, including verifying ownership documents, checking for any encumbrances or legal disputes, and assessing the property's physical condition. Our aim is to ensure transparency and peace of mind for our buyers.",
		"category": "Buying",
		"display_order": 2,
		"is_published": true,
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "8bec49b7-ed80-4ec4-b769-3990d9a40efb",
		"question": "How do I schedule a property viewing?",
		"answer": "You can easily schedule a property viewing by visiting the property's detail page on our website and clicking the 'Schedule a Viewing' button. Alternatively, you can contact our sales team directly via phone or email, and they will assist you in arranging a suitable time.",
		"category": "Buying",
		"display_order": 1,
		"is_published": true,
		"created_at": "2026-08-25T05:00:00.000Z"
	}
];
var FALLBACK_REELS = [{
	"id": "reel-dbqdwljpfz2",
	"title": "Featured property tour",
	"reel_url": "https://www.instagram.com/reel/DbqdwlJPfz2/",
	"embed_url": "https://www.instagram.com/reel/DbqdwlJPfz2/embed",
	"cover_image": "/images/kolkata.webp",
	"cover_thumb": "/images/kolkata.webp",
	"display_order": 1,
	"is_published": true,
	"created_at": "2026-08-25T05:00:00.000Z"
}, {
	"id": "reel-dcenruovd5a",
	"title": "Site walkthrough reel",
	"reel_url": "https://www.instagram.com/reel/DcENruovD5A/",
	"embed_url": "https://www.instagram.com/reel/DcENruovD5A/embed",
	"cover_image": "/images/kolkata.webp",
	"cover_thumb": "/images/kolkata.webp",
	"display_order": 2,
	"is_published": true,
	"created_at": "2026-08-25T05:00:00.000Z"
}];
var FALLBACK_TESTIMONIALS = [
	{
		"id": "7215429f-2aa6-4dab-817d-b5e29c32eb6d",
		"client_name": "Emily R.",
		"client_location": "Chicago, IL",
		"rating": 5,
		"review_text": "I was skeptical at first, but this service truly delivered. My expectations were exceeded, and I'm a very happy customer.",
		"review_date": "2023-11-01",
		"client_photo": "/images/owner.avif",
		"is_published": true,
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "824410e7-63ab-45be-aaf8-d5d5d8b3f58e",
		"client_name": "Michael Chen",
		"client_location": "Los Angeles, CA",
		"rating": 4,
		"review_text": "A fantastic experience from start to finish. The product quality is exceptional, and customer support was very responsive.",
		"review_date": "2023-09-15",
		"client_photo": "/images/owner.avif",
		"is_published": true,
		"created_at": "2026-08-25T05:00:00.000Z"
	},
	{
		"id": "33aabcf2-fabb-47fb-8f9f-3b0d6fb6a23a",
		"client_name": "Sarah J.",
		"client_location": "New York, NY",
		"rating": 5,
		"review_text": "Absolutely thrilled with the service! The team went above and beyond to ensure everything was perfect. Highly recommend!",
		"review_date": "2023-10-26",
		"client_photo": "/images/owner.avif",
		"is_published": true,
		"created_at": "2026-08-25T05:00:00.000Z"
	}
];
var FALLBACK_SITE_SETTINGS = {
	"brand_name": "SS Property",
	"tagline": "Premium Real Estate in Kolkata",
	"hero_title": "Homes worth the grand tour.",
	"hero_subtitle": "Hand-verified flats, penthouses and commercial spaces across Kolkata. Every listing walked through, every paper checked.",
	"hero_eyebrow": "Kolkata · Verified Listings",
	"about_intro": "SS Property is a Kolkata-based real estate advisory. We verify every listing in person - structure, papers, neighbourhood - so buyers see only what is real, and sellers deal only with serious people.",
	"phone": "+91 94296 93786",
	"whatsapp_number": "919429693786",
	"email": "writetous@ssproperty.in",
	"city": "Kolkata, West Bengal",
	"instagram_handle": "sspropertykol",
	"instagram_url": "https://instagram.com/sspropertykol",
	"facebook_url": "https://facebook.com/sspropertykol",
	"youtube_url": "https://youtube.com/@SSProperty",
	"footer_note": "Verified listings. Transparent pricing. No hidden charges.",
	"cta_title": "Selling? We put your property in front of the right buyers.",
	"cta_subtitle": "Fair valuation, verified footfalls, zero pressure.",
	"sell_intro": "Thousands of qualified buyers search with us every month. We verify, photograph and market your listing so serious people come to you.",
	"partner_intro": "Developers, interior brands and financial services - reach Kolkata's qualified property buyers.",
	"journal_intro": "Buyer guides, market notes and honest advice on Kolkata real estate.",
	"properties_intro": "Filter by locality, configuration and budget - every listing verified in person.",
	"about_stat_1_value": "100%",
	"about_stat_1_label": "Papers checked",
	"about_stat_1_note": "Title, dues and approvals verified before listing.",
	"about_stat_2_value": "1:1",
	"about_stat_2_label": "Dedicated advisor",
	"about_stat_2_note": "One person owns your search end to end.",
	"about_stat_3_value": "Local",
	"about_stat_3_label": "Kolkata born and based",
	"about_stat_3_note": "We know these streets, blocks and builders by name."
};
//#endregion
//#region src/lib/queries.ts
var isCircuitOpen = false;
var nextCircuitCheckTime = 0;
var CIRCUIT_COOLDOWN_MS = 6e4;
function isSupabaseAvailable() {
	if (!isCircuitOpen) return true;
	if (Date.now() >= nextCircuitCheckTime) return true;
	return false;
}
function recordSupabaseSuccess() {
	isCircuitOpen = false;
}
function recordSupabaseFailure(err) {
	isCircuitOpen = true;
	nextCircuitCheckTime = Date.now() + CIRCUIT_COOLDOWN_MS;
	console.warn("Supabase unreachable, circuit open for 60s. Serving local verified catalog:", err instanceof Error ? err.message : err);
}
async function withTimeout(promise, timeoutMs = 1200) {
	return Promise.race([Promise.resolve(promise), new Promise((_, reject) => setTimeout(() => reject(/* @__PURE__ */ new Error("Supabase query timeout")), timeoutMs))]);
}
/** Applies text search + facet filters to a properties query builder. */
function applyFilters(query, f) {
	let q = query.eq("is_published", true);
	if (f.q) {
		const like = `%${f.q.toLowerCase()}%`;
		q = q.or(`title.ilike.${like},location.ilike.${like},locality.ilike.${like},description.ilike.${like}`);
	}
	if (f.locality && f.locality !== "All") q = q.eq("locality", f.locality);
	if (f.bhk === "commercial") q = q.ilike("bhk_type", "Commercial%");
	else if (f.bhk) q = q.ilike("bhk_type", `${f.bhk}%`);
	if (f.minPrice != null) q = q.gte("price_inr", f.minPrice);
	if (f.maxPrice != null) q = q.lte("price_inr", f.maxPrice);
	if (f.possession && f.possession !== "All") q = q.eq("possession_status", f.possession);
	if (f.furnishing && f.furnishing !== "All") q = q.ilike("furnishing_status", `%${f.furnishing}%`);
	if (f.featuredOnly) q = q.eq("is_featured", true);
	return q;
}
async function listProperties(client, f = {}) {
	if (isSupabaseAvailable()) try {
		let q = applyFilters(client.from("properties").select("*"), f);
		if (f.sort === "price_asc") q = q.order("price_inr", {
			ascending: true,
			nullsFirst: false
		});
		else if (f.sort === "price_desc") q = q.order("price_inr", {
			ascending: false,
			nullsFirst: false
		});
		else if (f.sort === "area_desc") q = q.order("area_sqft", {
			ascending: false,
			nullsFirst: false
		});
		else if (f.sort === "newest") q = q.order("created_at", { ascending: false });
		else q = q.order("is_featured", { ascending: false }).order("created_at", { ascending: false });
		if (f.limit) q = q.limit(f.limit);
		const { data, error } = await withTimeout(q);
		if (!error && data && data.length > 0) {
			recordSupabaseSuccess();
			return data;
		}
		if (error) recordSupabaseFailure(error);
	} catch (err) {
		recordSupabaseFailure(err);
	}
	let list = FALLBACK_PROPERTIES.filter((p) => p.is_published);
	if (f.featuredOnly) list = list.filter((p) => p.is_featured);
	if (f.locality && f.locality !== "All") list = list.filter((p) => p.locality === f.locality);
	if (f.bhk === "commercial") list = list.filter((p) => p.bhk_type.toLowerCase().includes("commercial"));
	else if (f.bhk) list = list.filter((p) => p.bhk_type.toLowerCase().startsWith(f.bhk.toLowerCase()));
	if (f.minPrice != null) list = list.filter((p) => (p.price_inr ?? 0) >= f.minPrice);
	if (f.maxPrice != null) list = list.filter((p) => (p.price_inr ?? 0) <= f.maxPrice);
	if (f.possession && f.possession !== "All") list = list.filter((p) => p.possession_status === f.possession);
	if (f.furnishing && f.furnishing !== "All") list = list.filter((p) => p.furnishing_status.toLowerCase().includes(f.furnishing.toLowerCase()));
	if (f.q) {
		const term = f.q.toLowerCase();
		list = list.filter((p) => p.title.toLowerCase().includes(term) || p.location.toLowerCase().includes(term) || p.locality.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
	}
	if (f.sort === "price_asc") list.sort((a, b) => (a.price_inr ?? 0) - (b.price_inr ?? 0));
	else if (f.sort === "price_desc") list.sort((a, b) => (b.price_inr ?? 0) - (a.price_inr ?? 0));
	else if (f.sort === "area_desc") list.sort((a, b) => (b.area_sqft ?? 0) - (a.area_sqft ?? 0));
	else if (f.sort === "newest") list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
	else list.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
	if (f.limit) list = list.slice(0, f.limit);
	return list;
}
async function getPropertyBySlug(client, slug) {
	if (isSupabaseAvailable()) try {
		const { data, error } = await withTimeout(client.from("properties").select("*").eq("slug", slug).eq("is_published", true).maybeSingle());
		if (!error && data) {
			recordSupabaseSuccess();
			return data;
		}
		if (error) recordSupabaseFailure(error);
	} catch (err) {
		recordSupabaseFailure(err);
	}
	return FALLBACK_PROPERTIES.find((p) => p.slug === slug && p.is_published) ?? null;
}
async function getImagesForProperty(client, propertyId) {
	if (isSupabaseAvailable()) try {
		const { data, error } = await withTimeout(client.from("property_images").select("*").eq("property_id", propertyId).order("sort_order"));
		if (!error && data && data.length > 0) {
			recordSupabaseSuccess();
			return data;
		}
		if (error) recordSupabaseFailure(error);
	} catch (err) {
		recordSupabaseFailure(err);
	}
	const matching = FALLBACK_PROPERTY_IMAGES.filter((i) => i.property_id === propertyId);
	if (matching.length > 0) return matching;
	return [
		{
			id: `${propertyId}-1`,
			property_id: propertyId,
			sort_order: 1,
			caption: "Living Room",
			alt_text: "Spacious Living Area",
			image_url: "/images/properties/living.jpg",
			thumb_url: "/images/properties/living.jpg",
			created_at: "2026-08-25T05:00:00Z"
		},
		{
			id: `${propertyId}-2`,
			property_id: propertyId,
			sort_order: 2,
			caption: "Building Exterior",
			alt_text: "Architectural Facade",
			image_url: "/images/properties/facade.jpg",
			thumb_url: "/images/properties/facade.jpg",
			created_at: "2026-08-25T05:00:00Z"
		},
		{
			id: `${propertyId}-3`,
			property_id: propertyId,
			sort_order: 3,
			caption: "Master Suite",
			alt_text: "Master Bedroom & Balcony",
			image_url: "/images/properties/penthouse.jpg",
			thumb_url: "/images/properties/penthouse.jpg",
			created_at: "2026-08-25T05:00:00Z"
		},
		{
			id: `${propertyId}-4`,
			property_id: propertyId,
			sort_order: 4,
			caption: "Workspace & Amenities",
			alt_text: "Executive Study & Lounge",
			image_url: "/images/properties/office.jpg",
			thumb_url: "/images/properties/office.jpg",
			created_at: "2026-08-25T05:00:00Z"
		}
	];
}
/** Similar listings: same locality first, then same bhk, excluding self. */
async function getSimilarProperties(client, property, limit = 3) {
	if (isSupabaseAvailable()) try {
		const { data, error } = await withTimeout(client.from("properties").select("*").eq("is_published", true).neq("id", property.id).or(`locality.eq.${property.locality},bhk_type.eq.${property.bhk_type}`).limit(limit * 2));
		if (!error && data && data.length > 0) {
			recordSupabaseSuccess();
			return data.map((r) => {
				let score = 0;
				if (r.locality === property.locality) score += 3;
				if (r.bhk_type === property.bhk_type) score += 2;
				if (Math.abs((r.price_inr ?? 0) - (property.price_inr ?? 0)) < 2e6) score += 1;
				return {
					r,
					score
				};
			}).sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.r);
		}
		if (error) recordSupabaseFailure(error);
	} catch (err) {
		recordSupabaseFailure(err);
	}
	return FALLBACK_PROPERTIES.filter((p) => p.id !== property.id && p.is_published).map((r) => {
		let score = 0;
		if (r.locality === property.locality) score += 3;
		if (r.bhk_type === property.bhk_type) score += 2;
		if (Math.abs((r.price_inr ?? 0) - (property.price_inr ?? 0)) < 2e6) score += 1;
		return {
			r,
			score
		};
	}).sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.r);
}
async function listReels(client, onlyPublished = true) {
	if (isSupabaseAvailable()) try {
		let q = client.from("reels").select("*");
		if (onlyPublished) q = q.eq("is_published", true);
		const { data, error } = await withTimeout(q.order("display_order"));
		if (!error && data && data.length > 0) {
			recordSupabaseSuccess();
			return data;
		}
		if (error) recordSupabaseFailure(error);
	} catch (err) {
		recordSupabaseFailure(err);
	}
	return onlyPublished ? FALLBACK_REELS.filter((r) => r.is_published) : FALLBACK_REELS;
}
var DEFAULT_PARTNERS = [
	{
		id: "p-auricas",
		name: "Auricas",
		slug: "auricas",
		logo_url: "/images/partners/auricas.webp",
		website_url: "https://auricas.com",
		description: "Crafting Golden Spaces - Premium residential developments across Kolkata",
		display_order: 10,
		is_published: true,
		created_at: "2025-01-01T00:00:00Z"
	},
	{
		id: "p-credai",
		name: "CREDAI Kolkata",
		slug: "credai",
		logo_url: "/images/partners/credai.webp",
		website_url: "https://credaibengal.in",
		description: "Apex body for private real estate developers, setting ethical standards and construction excellence across Bengal.",
		display_order: 20,
		is_published: true,
		created_at: "2025-01-01T00:00:00Z"
	},
	{
		id: "p-dtc",
		name: "DTC Group",
		slug: "dtc",
		logo_url: "/images/partners/dtc.webp",
		website_url: "https://dtcgroup.in",
		description: "Commit. Deliver. Grow - Leading infrastructure and integrated township developers in Greater Kolkata.",
		display_order: 30,
		is_published: true,
		created_at: "2025-01-01T00:00:00Z"
	},
	{
		id: "p-eden",
		name: "Eden Group",
		slug: "eden",
		logo_url: "/images/partners/eden.webp",
		website_url: "https://edengroup.in",
		description: "Distinctive architectural homes across North & South Kolkata with proven legacy.",
		display_order: 40,
		is_published: true,
		created_at: "2025-01-01T00:00:00Z"
	},
	{
		id: "p-herohomes",
		name: "Hero Homes",
		slug: "herohomes",
		logo_url: "/images/partners/herohomes.webp",
		website_url: "https://herohomes.in",
		description: "Sustainable luxury communities and integrated high-rise wellness enclaves.",
		display_order: 50,
		is_published: true,
		created_at: "2025-01-01T00:00:00Z"
	},
	{
		id: "p-ruchirealty",
		name: "Ruchi Realty",
		slug: "ruchirealty",
		logo_url: "/images/partners/ruchirealty.webp",
		website_url: "https://ruchirealty.com",
		description: "Iconic commercial and residential landmarks with state-of-the-art community amenities.",
		display_order: 60,
		is_published: true,
		created_at: "2025-01-01T00:00:00Z"
	},
	{
		id: "p-silvervilla",
		name: "Silver Villa",
		slug: "silvervilla",
		logo_url: "/images/partners/silvervilla.webp",
		website_url: "",
		description: "Bespoke gated villas and premium boutique residences in peaceful green corridors.",
		display_order: 70,
		is_published: true,
		created_at: "2025-01-01T00:00:00Z"
	},
	{
		id: "p-synergy",
		name: "Synergy Group",
		slug: "synergy",
		logo_url: "/images/partners/synergy.webp",
		website_url: "",
		description: "Modern high-rise residential towers strategically connected to Kolkata's key transit nodes.",
		display_order: 80,
		is_published: true,
		created_at: "2025-01-01T00:00:00Z"
	}
];
async function listPartners(client, onlyPublished = true) {
	if (isSupabaseAvailable()) try {
		let q = client.from("partners").select("*");
		if (onlyPublished) q = q.eq("is_published", true);
		const { data, error } = await withTimeout(q.order("display_order"));
		if (!error && data && data.length > 0) {
			recordSupabaseSuccess();
			return data;
		}
		if (error) recordSupabaseFailure(error);
	} catch (err) {
		recordSupabaseFailure(err);
	}
	return DEFAULT_PARTNERS;
}
/** Site settings as a key->value map. Missing keys are filled from defaults. */
async function getSiteSettings(client) {
	const map = { ...FALLBACK_SITE_SETTINGS };
	if (isSupabaseAvailable()) try {
		const { data, error } = await withTimeout(client.from("site_settings").select("key, value"));
		if (!error && data && data.length > 0) {
			recordSupabaseSuccess();
			for (const row of data) map[row.key] = row.value;
		}
		if (error) recordSupabaseFailure(error);
	} catch (err) {
		recordSupabaseFailure(err);
	}
	return map;
}
async function listBlogPosts(client, limit) {
	if (isSupabaseAvailable()) try {
		let q = client.from("blog_posts").select("*").eq("is_published", true).order("publish_date", { ascending: false });
		if (limit) q = q.limit(limit);
		const { data, error } = await withTimeout(q);
		if (!error && data && data.length > 0) {
			recordSupabaseSuccess();
			return data;
		}
		if (error) recordSupabaseFailure(error);
	} catch (err) {
		recordSupabaseFailure(err);
	}
	const posts = FALLBACK_BLOG_POSTS.filter((p) => p.is_published);
	return limit ? posts.slice(0, limit) : posts;
}
async function getBlogPostBySlug(client, rawSlug) {
	const cleanSlug = decodeURIComponent(rawSlug || "").trim();
	if (!cleanSlug) return null;
	if (isSupabaseAvailable()) try {
		const { data, error } = await withTimeout(client.from("blog_posts").select("*").eq("slug", cleanSlug).eq("is_published", true).maybeSingle());
		if (!error && data) {
			recordSupabaseSuccess();
			return data;
		}
		const { data: dataIlike } = await withTimeout(client.from("blog_posts").select("*").ilike("slug", cleanSlug).eq("is_published", true).maybeSingle());
		if (dataIlike) {
			recordSupabaseSuccess();
			return dataIlike;
		}
		if (error) recordSupabaseFailure(error);
	} catch (err) {
		recordSupabaseFailure(err);
	}
	let post = FALLBACK_BLOG_POSTS.find((p) => p.slug === cleanSlug && p.is_published);
	if (post) return post;
	post = FALLBACK_BLOG_POSTS.find((p) => p.slug.toLowerCase() === cleanSlug.toLowerCase() && p.is_published);
	if (post) return post;
	const normalized = cleanSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
	post = FALLBACK_BLOG_POSTS.find((p) => p.slug === normalized && p.is_published);
	if (post) return post;
	post = FALLBACK_BLOG_POSTS.find((p) => p.title.toLowerCase().includes(cleanSlug.toLowerCase()) && p.is_published);
	return post ?? null;
}
async function listPublishedTestimonials(client) {
	if (isSupabaseAvailable()) try {
		const { data, error } = await withTimeout(client.from("testimonials").select("*").eq("is_published", true).order("review_date", { ascending: false }));
		if (!error && data && data.length > 0) {
			recordSupabaseSuccess();
			return data;
		}
		if (error) recordSupabaseFailure(error);
	} catch (err) {
		recordSupabaseFailure(err);
	}
	return FALLBACK_TESTIMONIALS.filter((t) => t.is_published);
}
async function listFaqs(client) {
	if (isSupabaseAvailable()) try {
		const { data, error } = await withTimeout(client.from("faqs").select("*").eq("is_published", true).order("display_order"));
		if (!error && data && data.length > 0) {
			recordSupabaseSuccess();
			return data;
		}
		if (error) recordSupabaseFailure(error);
	} catch (err) {
		recordSupabaseFailure(err);
	}
	return FALLBACK_FAQS.filter((f) => f.is_published);
}
/** Distinct localities with counts, for filter chips. */
async function listLocalities(client) {
	if (isSupabaseAvailable()) try {
		const { data, error } = await withTimeout(client.from("properties").select("locality").eq("is_published", true));
		if (!error && data && data.length > 0) {
			recordSupabaseSuccess();
			const counts = /* @__PURE__ */ new Map();
			for (const row of data) counts.set(row.locality, (counts.get(row.locality) ?? 0) + 1);
			return [...counts.entries()].map(([locality, count]) => ({
				locality,
				count
			})).sort((a, b) => b.count - a.count);
		}
		if (error) recordSupabaseFailure(error);
	} catch (err) {
		recordSupabaseFailure(err);
	}
	const counts = /* @__PURE__ */ new Map();
	for (const row of FALLBACK_PROPERTIES.filter((p) => p.is_published)) counts.set(row.locality, (counts.get(row.locality) ?? 0) + 1);
	return [...counts.entries()].map(([locality, count]) => ({
		locality,
		count
	})).sort((a, b) => b.count - a.count);
}
//#endregion
export { getSiteSettings as a, listLocalities as c, listPublishedTestimonials as d, listReels as f, applySettings as g, SITE as h, getSimilarProperties as i, listPartners as l, NAV_LINKS as m, getImagesForProperty as n, listBlogPosts as o, FOOTER_SERVICES as p, getPropertyBySlug as r, listFaqs as s, getBlogPostBySlug as t, listProperties as u };
