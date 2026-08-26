import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sendMail } from './_lib/mailer'
import { createOtp } from './_lib/otp'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { email } = req.body ?? {}
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    res.status(400).json({ error: 'A valid email is required' })
    return
  }

  try {
    const { code, token } = createOtp(email)
    await sendMail({
      to: email,
      subject: 'Your Vega Charge verification code',
      text: `Your verification code is ${code}. It expires in 10 minutes.`,
    })
    res.status(200).json({ token })
  } catch (err) {
    console.error('[api/send-otp]', err)
    res.status(502).json({ error: 'Failed to send verification code' })
  }
}
