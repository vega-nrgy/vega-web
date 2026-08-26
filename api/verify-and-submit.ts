import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sendMail } from './_lib/mailer'
import { verifyOtp } from './_lib/otp'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { token, code, email, type, fields } = req.body ?? {}
  if (!token || !code || !email || !type || !fields || typeof fields !== 'object') {
    res.status(400).json({ error: 'token, code, email, type, and fields are required' })
    return
  }

  if (!verifyOtp(token, code, email)) {
    res.status(401).json({ error: 'Invalid or expired verification code' })
    return
  }

  const lines = Object.entries(fields as Record<string, string>)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)

  try {
    await sendMail({
      to: process.env.LEAD_TO_EMAIL ?? 'admin@vegacharge.in',
      subject: `New ${type} partner lead — ${email}`,
      text: [`Type: ${type}`, `Email: ${email}`, '', ...lines].join('\n'),
      replyTo: email,
    })
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[api/verify-and-submit]', err)
    res.status(502).json({ error: 'Failed to submit' })
  }
}
