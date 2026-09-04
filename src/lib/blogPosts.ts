export type BlogSection = {
  heading?: string
  paragraphs: string[]
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  coverImage: string
  /** Excluded from the /blog listing (and from sitemap.xml / prerender.mjs)
   *  until flipped to false — the route itself still resolves for preview. */
  draft: boolean
  sections: BlogSection[]
}

/** Single source of truth for blog posts — mirrors the pattern in stations.ts.
 *  Add new posts here; flip `draft: false` and wire up nav/sitemap/prerender
 *  when a post is ready to go live. */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'hyderabad-nh65-ev-charging-investment',
    title: "Hyderabad's Highway EV Charging Boom: Why NH-65 Is the Corridor to Watch",
    excerpt:
      "India's highway EV charging build-out is accelerating fastest around Hyderabad. Here's why the NH-65 corridor — and highway-adjacent land along it — is becoming one of the more interesting infrastructure plays in the sector.",
    date: '2026-08-25',
    author: 'Vega Charge Team',
    coverImage: '/media/nh65-highway.jpg',
    draft: false,
    sections: [
      {
        paragraphs: [
          "Telangana registered over 1.7 lakh electric vehicles in the last two years, and a growing share of them aren't staying inside city limits — they're doing the Hyderabad–Vijayawada run, the Hyderabad–Warangal run, the weekend trip to the coast. That shift changes what \"charging infrastructure\" needs to mean. A city full of AC chargers doesn't help a driver who's 150 km out on NH-65 watching the battery percentage drop.",
        ],
      },
      {
        heading: 'The gap the market hasn’t filled yet',
        paragraphs: [
          'Most public charging investment in India over the last five years has gone into dense urban clusters — malls, tech parks, apartment complexes. That made sense while EV ownership was itself concentrated in cities. It also means the highway network connecting those cities has been left behind: long stretches with no reliable DC fast charging, inconsistent uptime where chargers do exist, and almost no amenities built around the stop itself.',
          "NH-65 is a useful example. It's one of the busiest corridors out of Hyderabad, carrying tens of thousands of vehicles a day toward Vijayawada and the coast, and until recently it had essentially no dedicated fast-charging infrastructure built for the way people actually drive it — in one sitting, wanting to stop once, wanting that stop to be worth the fifteen minutes.",
        ],
      },
      {
        heading: 'Why this is an investable moment, not just a driver-experience problem',
        paragraphs: [
          "Three things are converging at once: EV penetration in Telangana and Andhra Pradesh is past the point where highway charging is a nice-to-have, the cost of 120 kW and 240 kW DC hardware has come down enough to make highway sites economically viable, and highway-adjacent land along corridors like NH-65 is still available at prices that make sense for a charging-plus-amenities footprint (retail, washrooms, a place to actually wait).",
          "That combination — real demand, viable unit economics, available land — is what makes a highway charging corridor different from a purely speculative infrastructure bet. It's also why site partnerships and land-owner conversations along NH-65 have picked up noticeably over the past year.",
        ],
      },
      {
        heading: "Where Vega Charge fits",
        paragraphs: [
          "We're building highway-fast-charging stations directly on NH-65 — not just chargers, but full stops: 120 kW and 240 kW DC hardware across multiple standards, plus the waiting lounge, washrooms, and retail that make a 20-minute charge feel like a normal part of the drive rather than an inconvenience. Our first stations are landing at Narketpally and along the Nalgonda stretch, chosen specifically for traffic density and the lack of existing fast-charging coverage nearby.",
          "If you own highway-adjacent land on this corridor, run a fleet that does this route regularly, or are looking at highway charging infrastructure from an investment angle, that's exactly the conversation we're set up to have.",
        ],
      },
    ],
  },
]

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function getPublishedBlogPosts() {
  return BLOG_POSTS.filter((p) => !p.draft).sort((a, b) => b.date.localeCompare(a.date))
}
