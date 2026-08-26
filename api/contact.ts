import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sendMail } from './_lib/mailer'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { name, email, phone, message } = req.body ?? {}
  if (!name || !email || !message) {
    res.status(400).json({ error: 'name, email, and message are required' })
    return
  }

  try {
    await sendMail({
      to: process.env.LEAD_TO_EMAIL ?? 'admin@vegacharge.in',
      subject: `New contact enquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || '(not provided)'}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      replyTo: email,
    })
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[api/contact]', err)
    res.status(502).json({ error: 'Failed to send message' })
  }
}
