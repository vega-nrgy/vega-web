export type Station = {
  id: string
  slug: string
  name: string
  corridor: string
  chargers: string
  standards: string[]
  area: string
  traffic: string
  launch: string
  status: 'PLANNING' | 'ACQUISITION'
  lat: number
  lng: number
  mapUrl: string
}

const STANDARDS = ['CCS2', 'CHAdeMO', 'Bharat DC-001']

/** Single source of truth for the 5 planned/acquired stations — was previously
 *  hand-duplicated across StationList, StationMap, FlagshipStation, and
 *  NetworkMap. Includes a `slug` for the future /network/:slug pages. */
export const STATIONS: Station[] = [
  {
    id: 'VC 001',
    slug: 'narketpally',
    name: 'Vega Narketpally',
    corridor: 'NH-65 · Hyderabad–Vijayawada · Nalgonda, TS',
    chargers: '3 × 180 kW DC',
    standards: STANDARDS,
    area: '2,200 sq. yd · 103 ft frontage',
    traffic: '>40,000 vehicles/day',
    launch: 'Opening Sep 2026',
    status: 'PLANNING',
    lat: 17.222,
    lng: 79.207,
    mapUrl: 'https://maps.app.goo.gl/HDpiyMm8LLJXU7eZ6',
  },
  {
    id: 'VC 002',
    slug: 'tekmatla-khammam-bypass',
    name: 'Vega Tekmatla — Khammam Bypass',
    corridor: 'Hyderabad–Visakhapatnam · via Khammam',
    chargers: '3 × 180 + 1 × 240 kW DC',
    standards: STANDARDS,
    area: '3,630 sq. yd · 170 ft frontage',
    traffic: '>20,000 vehicles/day',
    launch: 'Opening Oct 2026',
    status: 'PLANNING',
    lat: 17.275,
    lng: 80.105,
    mapUrl: 'https://maps.app.goo.gl/nasBZ3A7f9DvudjX8',
  },
  {
    id: 'VC 003',
    slug: 'pillalamarri',
    name: 'Vega Pillalamarri',
    corridor: 'NH-65 · Hyderabad–Vijayawada',
    chargers: '4 × 180 + 2 × 240 kW DC',
    standards: STANDARDS,
    area: '3,270 sq. yd · 172 ft frontage',
    traffic: '>25,000 vehicles/day',
    launch: 'Opening Sep 2026',
    status: 'PLANNING',
    lat: 17.125,
    lng: 79.605,
    mapUrl: 'https://maps.app.goo.gl/4BNxu8rbfWQ7u2nB6',
  },
  {
    id: 'VC 004',
    slug: 'tallampadu',
    name: 'Vega Tallampadu',
    corridor: 'Hyderabad–Visakhapatnam · via Khammam',
    chargers: '3 × 180 + 1 × 240 kW DC',
    standards: STANDARDS,
    area: '7,260 sq. yd · 316 ft frontage',
    traffic: '>20,000 vehicles/day',
    launch: 'Opening Oct 2026',
    status: 'PLANNING',
    lat: 17.24,
    lng: 80.02,
    mapUrl: 'https://maps.app.goo.gl/SudRLnPPe1KgZBaZ9',
  },
  {
    id: 'VC 005',
    slug: 'tekmatla',
    name: 'Vega Tekmatla',
    corridor: 'Visakhapatnam–Hyderabad · via Khammam',
    chargers: '3 × 180 + 1 × 240 kW DC',
    standards: STANDARDS,
    area: '4,840 sq. yd · 120+ ft frontage',
    traffic: '>20,000 vehicles/day',
    launch: 'Launch date TBA',
    status: 'ACQUISITION',
    lat: 17.3,
    lng: 80.06,
    mapUrl: 'https://maps.app.goo.gl/wB7xSW9zF5Rfi5kT8',
  },
]

export function getStationBySlug(slug: string): Station | undefined {
  return STATIONS.find((s) => s.slug === slug)
}
