import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

/** Ported 1:1 from raw_html/network-map.html — same ids, coordinates, meta copy, and links. */
const STATIONS = [
  {
    id: 'VC 001',
    name: 'Vega Narketpally',
    lat: 17.222,
    lng: 79.207,
    meta: 'NH-65 &middot; Hyderabad&ndash;Vijayawada<br>3 &times; 180 kW DC &middot; Opening Sep 2026',
    map: 'https://maps.app.goo.gl/HDpiyMm8LLJXU7eZ6',
    live: true,
  },
  {
    id: 'VC 002',
    name: 'Vega Tekmatla — Khammam Bypass',
    lat: 17.275,
    lng: 80.105,
    meta: 'Hyderabad&ndash;Visakhapatnam &middot; via Khammam<br>3 &times; 180 + 1 &times; 240 kW DC &middot; Opening Oct 2026',
    map: 'https://maps.app.goo.gl/nasBZ3A7f9DvudjX8',
    live: true,
  },
  {
    id: 'VC 003',
    name: 'Vega Pillalamarri',
    lat: 17.125,
    lng: 79.605,
    meta: 'NH-65 &middot; Hyderabad&ndash;Vijayawada<br>4 &times; 180 + 2 &times; 240 kW DC &middot; Opening Sep 2026',
    map: 'https://maps.app.goo.gl/4BNxu8rbfWQ7u2nB6',
    live: true,
  },
  {
    id: 'VC 004',
    name: 'Vega Tallampadu',
    lat: 17.24,
    lng: 80.02,
    meta: 'Hyderabad&ndash;Visakhapatnam &middot; via Khammam<br>3 &times; 180 + 1 &times; 240 kW DC &middot; Opening Oct 2026',
    map: 'https://maps.app.goo.gl/SudRLnPPe1KgZBaZ9',
    live: true,
  },
  {
    id: 'VC 005',
    name: 'Vega Tekmatla',
    lat: 17.3,
    lng: 80.06,
    meta: 'Visakhapatnam&ndash;Hyderabad &middot; via Khammam<br>3 &times; 180 + 1 &times; 240 kW DC &middot; Launch TBA',
    map: 'https://maps.app.goo.gl/wB7xSW9zF5Rfi5kT8',
    live: false,
  },
]

export function StationMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      maxBoundsViscosity: 1.0,
    })
    mapRef.current = map

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map)

    const latLngs: L.LatLngExpression[] = STATIONS.map((s) => [s.lat, s.lng])

    STATIONS.forEach((s) => {
      const icon = L.divIcon({
        className: 'vc-marker',
        html: `<div class="vc-dot${s.live ? '' : ' pending'}"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })
      L.marker([s.lat, s.lng], { icon }).addTo(map).bindPopup(
        `<div class="vc-id">${s.id}</div>` +
          `<div class="vc-name">${s.name}</div>` +
          `<div class="vc-meta">${s.meta}</div>` +
          `<a class="vc-link" href="${s.map}" target="_blank" rel="noreferrer">Open exact location in Google Maps &#8599;</a>` +
          `<div class="vc-note">MAP PIN IS INDICATIVE &mdash; LINK IS EXACT</div>`,
      )
    })

    const bounds = L.latLngBounds(latLngs)
    map.fitBounds(bounds, { padding: [56, 56] })

    // Limit panning/zooming to the region around our stations — not all of India.
    map.setMaxBounds(bounds.pad(0.6))
    map.setMinZoom(map.getZoom())

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <div className="overflow-hidden rounded-card border border-hairline">
      <div ref={containerRef} className="h-[520px] w-full bg-grey-soft" />
    </div>
  )
}
