export const SITE_URL = 'https://vegacharge.in'
export const DEFAULT_OG_IMAGE = '/media/og-default.jpg'

type StationScheduleInput = {
  name: string
  id: string
  addressLocality: string
  addressRegion: string
  lat: number
  lng: number
  amenityFeature?: string[]
}

/** Builds an ElectricVehicleChargingStation JSON-LD record for a single station.
 *  Called once per station as they go live — see FlagshipStation's usage for Narketpally. */
export function buildStationSchema(station: StationScheduleInput) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ElectricVehicleChargingStation'],
    name: `Vega Charge — ${station.name}`,
    identifier: station.id,
    address: {
      '@type': 'PostalAddress',
      addressLocality: station.addressLocality,
      addressRegion: station.addressRegion,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: station.lat,
      longitude: station.lng,
    },
    ...(station.amenityFeature ? { amenityFeature: station.amenityFeature } : {}),
  }
}
