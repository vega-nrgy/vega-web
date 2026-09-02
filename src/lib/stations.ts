export type Station = {
  id: string;
  slug: string;
  name: string;
  corridor: string;
  chargers: string;
  standards: string[];
  area: string;
  traffic: string;
  launch: string;
  status: "PLANNING" | "ACQUISITION";
  lat: number;
  lng: number;
  mapUrl: string;
};

const STANDARDS = ["CCS2", "CHAdeMO", "Bharat DC-001"];

/** Single source of truth for the 5 planned/acquired stations — was previously
 *  hand-duplicated across StationList, StationMap, FlagshipStation, and
 *  NetworkMap. Includes a `slug` for the future /network/:slug pages. */
export const STATIONS: Station[] = [
  {
    id: "VC 001",
    slug: "narketpally",
    name: "Vega Narketpally",
    corridor: "NH-65 · Hyderabad–Vijayawada · Nalgonda, TS",
    chargers: "3 × 120 kW DC",
    standards: STANDARDS,
    area: "2,200 sq. yd · 103 ft frontage",
    traffic: ">40,000 vehicles/day",
    launch: "Opening Sep 2026",
    status: "PLANNING",
    lat: 17.2118425,
    lng: 79.1659196,
    mapUrl: "https://maps.app.goo.gl/2CsNn1Xk1gqEKgeK7",
  },
  {
    id: "VC 002",
    slug: "tekmatla-khammam-bypass",
    name: "Vega Tekmatla — Khammam Bypass",
    corridor: "Hyderabad–Visakhapatnam · via Khammam",
    chargers: "3 × 120 + 1 × 240 kW DC",
    standards: STANDARDS,
    area: "3,630 sq. yd · 170 ft frontage",
    traffic: ">20,000 vehicles/day",
    launch: "Opening Oct 2026",
    status: "PLANNING",
    lat: 17.1628523,
    lng: 79.5583281,
    mapUrl: "https://maps.app.goo.gl/NMxefN1cFcrsbVAE9",
  },
  {
    id: "VC 003",
    slug: "pillalamarri",
    name: "Vega Pillalamarri",
    corridor: "NH-65 · Hyderabad–Vijayawada",
    chargers: "4 × 120 + 2 × 240 kW DC",
    standards: STANDARDS,
    area: "3,270 sq. yd · 172 ft frontage",
    traffic: ">25,000 vehicles/day",
    launch: "Opening Sep 2026",
    status: "PLANNING",
    lat: 17.1491875,
    lng: 79.5780625,
    mapUrl: "https://maps.app.goo.gl/nK5k3HTnLAFnTRUk7",
  },
  {
    id: "VC 004",
    slug: "tallampadu",
    name: "Vega Tallampadu",
    corridor: "Hyderabad–Visakhapatnam · via Khammam",
    chargers: "3 × 120 + 1 × 240 kW DC",
    standards: STANDARDS,
    area: "7,260 sq. yd · 316 ft frontage",
    traffic: ">20,000 vehicles/day",
    launch: "Opening Oct 2026",
    status: "PLANNING",
    lat: 17.2266875,
    lng: 80.0409375,
    mapUrl: "https://maps.app.goo.gl/AH8AMoj6qjFaobyV6",
  },
  {
    id: "VC 005",
    slug: "tekmatla",
    name: "Vega Tekmatla",
    corridor: "Visakhapatnam–Hyderabad · via Khammam",
    chargers: "3 × 120 + 1 × 240 kW DC",
    standards: STANDARDS,
    area: "4,840 sq. yd · 120+ ft frontage",
    traffic: ">20,000 vehicles/day",
    launch: "Launch date TBA",
    status: "ACQUISITION",
    lat: 17.1615625,
    lng: 79.5550625,
    mapUrl: "https://maps.app.goo.gl/gnkgawpzEYFJ1dPp7",
  },
];

export function getStationBySlug(slug: string): Station | undefined {
  return STATIONS.find((s) => s.slug === slug);
}
