import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { STATIONS as BASE_STATIONS } from '../../../lib/stations'

/* Popup blurb per station — deliberately more compact than the full
   corridor/launch text in src/lib/stations.ts, so it's kept as its own
   editorial copy rather than derived. Coordinates, id, name, map link, and
   the live/pending pin style all come from the shared station data. */
const POPUP_META: Record<string, string> = {
  'VC 001': 'NH-65 &middot; Hyderabad&ndash;Vijayawada<br>3 &times; 120 kW DC &middot; Opening Sep 2026',
  'VC 002':
    'Hyderabad&ndash;Visakhapatnam &middot; via Khammam<br>3 &times; 120 + 1 &times; 240 kW DC &middot; Opening Oct 2026',
  'VC 003': 'NH-65 &middot; Hyderabad&ndash;Vijayawada<br>4 &times; 120 + 2 &times; 240 kW DC &middot; Opening Sep 2026',
  'VC 004':
    'Hyderabad&ndash;Visakhapatnam &middot; via Khammam<br>3 &times; 120 + 1 &times; 240 kW DC &middot; Opening Oct 2026',
  'VC 005': 'Visakhapatnam&ndash;Hyderabad &middot; via Khammam<br>3 &times; 120 + 1 &times; 240 kW DC &middot; Launch TBA',
}

const STATIONS = BASE_STATIONS.map((s) => ({
  id: s.id,
  name: s.name,
  lat: s.lat,
  lng: s.lng,
  meta: POPUP_META[s.id],
  map: s.mapUrl,
  live: s.status === 'PLANNING',
}))

type StationMapProps = {
  /** Tailwind height class for the map container — defaults to the Network page's size. */
  heightClass?: string
}

export function StationMap({ heightClass = 'h-[520px]' }: StationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      scrollWheelZoom: true,
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
    <div className="relative isolate z-0 overflow-hidden rounded-card border border-hairline">
      <div ref={containerRef} className={`${heightClass} w-full bg-grey-soft`} />
    </div>
  )
}
