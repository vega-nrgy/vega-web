import { PageIntro } from "../components/ui/PageIntro";
import { Section } from "../components/ui/Section";
import { usePageMeta } from "../hooks/usePageMeta";

/* DRAFT — reflects what the site's forms (ContactForm, PartnerForm) actually
   collect today (name/email/phone/message, OTP email verification, and the
   type-specific partner fields). Not legal advice — needs sign-off from
   counsel familiar with India's DPDP Act, 2023 before this replaces the
   placeholder in production. Update the "Last updated" line on publish. */

const SECTIONS: { heading: string; paragraphs: string[]; bullets?: string[] }[] = [
  {
    heading: "Overview",
    paragraphs: [
      "This Privacy Policy explains how Vega Charge (“we”, “us”, “our”) collects, uses, shares and protects information when you visit vegacharge.in (the “Site”) or contact us through it.",
      "Vega Charge is a technology-led EV charging infrastructure company developing high-power charging hubs along India’s highway corridors, headquartered in Hyderabad, Telangana, India.",
    ],
  },
  {
    heading: "Information We Collect",
    paragraphs: ["We collect information you choose to share with us through the forms on this Site:"],
    bullets: [
      "Contact form (/contact): your name, email address, phone number (optional) and message.",
      "Partner enquiry form (/partner): your email address and phone number, plus details relevant to your enquiry type — for example, fleet size and vehicle types for fleet enquiries; site location, state and ownership status for site & land partnership enquiries; or investor type and ticket size for investor enquiries.",
      "Email verification: before a partner enquiry is submitted, we send a one-time verification code to the email address you provide, to confirm it belongs to you.",
    ],
  },
  {
    heading: "Cookies & Analytics",
    paragraphs: [
      "This Site does not currently use analytics or tracking cookies. If that changes as the Site develops, this policy will be updated first to reflect it.",
    ],
  },
  {
    heading: "How We Use Your Information",
    paragraphs: ["We use the information you provide to:"],
    bullets: [
      "Respond to your enquiry and route it to the right team (driver support, fleet, site partnerships, or investor relations).",
      "Verify your email address before a partner enquiry is submitted.",
      "Maintain records of enquiries for our own business purposes.",
    ],
  },
  {
    heading: "How We Share Information",
    paragraphs: [
      "We do not sell your personal information, and we do not use it for advertising. We only share it with service providers who help us operate this Site and deliver emails or verification codes on our behalf, under obligations to keep it confidential, or where required by law.",
    ],
  },
  {
    heading: "Data Retention",
    paragraphs: [
      "We retain enquiry information for as long as reasonably necessary to respond to it and maintain business records, after which it is deleted or anonymised.",
    ],
  },
  {
    heading: "Your Rights",
    paragraphs: [
      "Under India’s Digital Personal Data Protection Act, 2023, and other applicable law, you have the right to:",
    ],
    bullets: [
      "Access the personal data we hold about you.",
      "Request correction of inaccurate or incomplete data.",
      "Request erasure of your data, where applicable.",
      "Withdraw consent at any time — this will not affect processing already carried out before withdrawal.",
      "Raise a grievance with our Grievance Officer (see Contact Us below), or with the relevant data protection authority.",
    ],
  },
  {
    heading: "Data Security",
    paragraphs: [
      "We take reasonable technical and organisational measures to protect the information you share with us. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    heading: "Children’s Privacy",
    paragraphs: [
      "This Site is not directed at children, and we do not knowingly collect personal information from anyone under 18.",
    ],
  },
  {
    heading: "Changes to This Policy",
    paragraphs: [
      "We may update this policy as our services and this Site evolve. Material changes will be reflected here with an updated date.",
    ],
  },
  {
    heading: "Contact Us / Grievance Officer",
    paragraphs: [
      "For questions about this policy, or to exercise your rights above, contact us at admin@vegacharge.in.",
      "Vega Charge, Corporate Office: Hyderabad, Telangana, India.",
    ],
  },
];

export function PrivacyPage() {
  usePageMeta({
    title: "Privacy Policy — Vega Charge",
    description: "How Vega Charge collects, uses and protects information submitted through vegacharge.in.",
    path: "/privacy",
  });

  return (
    <>
      <PageIntro eyebrow="PRIVACY POLICY" heading="Privacy Policy">
        <div className="mt-9 max-w-2xl rounded-card border border-hairline bg-grey-soft p-6">
          <p className="font-display text-sm font-semibold text-ink">Draft — pending legal review</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
            This page reflects the data our current forms collect, but has not yet been reviewed by counsel. Do
            not treat it as final until that review is complete and this notice is removed.
          </p>
        </div>
        <p className="mt-6 text-[13px] text-muted-onink">Last updated: [insert date on publish]</p>
      </PageIntro>

      <Section id="privacy-body" labelledBy="page-heading" className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 pb-28 pt-10 lg:px-8">
          <div className="space-y-9">
            {SECTIONS.map(({ heading, paragraphs, bullets }) => (
              <div key={heading}>
                <h2 className="font-display text-2xl font-semibold tracking-[-0.015em] text-ink">{heading}</h2>
                <div className="mt-3.5 space-y-4 text-base leading-[1.75] text-ink-soft">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {bullets && (
                  <ul className="mt-4 space-y-2.5 border-t border-hairline pt-4">
                    {bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-mint-deep" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
