import { PageIntro } from "../components/ui/PageIntro";
import { Section } from "../components/ui/Section";
import { usePageMeta } from "../hooks/usePageMeta";

/* DRAFT — not legal advice. Needs sign-off from counsel before this
   replaces the placeholder in production. Update the "Last updated" line,
   and section 3 in particular, once stations are actually operational and
   the Site offers live charging/payment functionality. */

const SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using vegacharge.in (the “Site”), you agree to these Terms of Use. If you do not agree, please do not use the Site.",
    ],
  },
  {
    heading: "About Vega Charge",
    paragraphs: [
      "Vega Charge is a technology-led EV charging infrastructure company developing high-power charging hubs along India’s highway corridors. Station and network information on this Site reflects our current development plans and is provided for general information only.",
    ],
  },
  {
    heading: "Station Information & Renders",
    paragraphs: [
      "Station specifications, charger configurations, locations, opening dates and status shown on this Site are planned figures unless explicitly stated as live, and are subject to change during development.",
      "Where renders or visualisations are used, they represent the intended design — actual materials, finishes and layout may vary.",
      "This Site does not currently offer live EV charging services; no charging session, reservation or payment can be made through it.",
    ],
  },
  {
    heading: "Use of the Site",
    paragraphs: [
      "You agree to use this Site only for lawful purposes, and not to misuse it — including attempting to gain unauthorised access, interfering with its operation, or submitting false or misleading information through its forms.",
    ],
  },
  {
    heading: "Enquiries & Forms",
    paragraphs: [
      "Submitting an enquiry through our contact or partner forms does not create any contractual relationship, partnership, investment commitment or guarantee of a response by a specific time. We aim to respond to enquiries within a reasonable time, but response times are not guaranteed.",
      "Information submitted through these forms is handled as described in our Privacy Policy.",
    ],
  },
  {
    heading: "Intellectual Property",
    paragraphs: [
      "All content on this Site — including text, graphics, logos and station renders — is owned by or licensed to Vega Charge, and may not be reproduced or used without our written permission.",
    ],
  },
  {
    heading: "Third-Party Links",
    paragraphs: [
      "This Site may link to third-party websites (for example, Google Maps or social media). We are not responsible for the content or practices of those sites.",
    ],
  },
  {
    heading: "No Warranty",
    paragraphs: [
      "This Site and its content are provided “as is”, without warranties of any kind, express or implied, including as to accuracy, completeness or fitness for a particular purpose.",
    ],
  },
  {
    heading: "Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by law, Vega Charge will not be liable for any indirect, incidental or consequential loss arising from your use of this Site.",
    ],
  },
  {
    heading: "Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of the courts at Hyderabad, Telangana.",
    ],
  },
  {
    heading: "Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time. Continued use of the Site after changes are posted constitutes acceptance of the updated Terms.",
    ],
  },
  {
    heading: "Contact Us",
    paragraphs: ["Questions about these Terms can be sent to admin@vegacharge.in."],
  },
];

export function TermsPage() {
  usePageMeta({
    title: "Terms of Use — Vega Charge",
    description: "The terms that govern your use of vegacharge.in.",
    path: "/terms",
  });

  return (
    <>
      <PageIntro eyebrow="TERMS OF USE" heading="Terms of Use">
        <div className="mt-9 max-w-2xl rounded-card border border-hairline bg-grey-soft p-6">
          <p className="font-display text-sm font-semibold text-ink">Draft — pending legal review</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
            This page is a working draft and has not yet been reviewed by counsel. Do not treat it as final until
            that review is complete and this notice is removed.
          </p>
        </div>
        <p className="mt-6 text-[13px] text-muted-onink">Last updated: [insert date on publish]</p>
      </PageIntro>

      <Section id="terms-body" labelledBy="page-heading" className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 pb-28 pt-10 lg:px-8">
          <div className="space-y-9">
            {SECTIONS.map(({ heading, paragraphs }) => (
              <div key={heading}>
                <h2 className="font-display text-2xl font-semibold tracking-[-0.015em] text-ink">{heading}</h2>
                <div className="mt-3.5 space-y-4 text-base leading-[1.75] text-ink-soft">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
