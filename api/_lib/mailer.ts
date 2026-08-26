import nodemailer from 'nodemailer'

let transport: nodemailer.Transporter | null = null

/** Shared GoDaddy SMTP transport, built lazily from env vars so a missing
 *  config fails at request time (with a clear error) rather than at import. */
function getTransport() {
  if (transport) return transport

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS must be set')
  }

  transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
  return transport
}

export async function sendMail(opts: { to: string; subject: string; text: string; replyTo?: string }) {
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER
  await getTransport().sendMail({
    from: `Vega Charge <${from}>`,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    replyTo: opts.replyTo,
  })
}
