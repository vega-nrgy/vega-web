import { createHmac, randomInt, timingSafeEqual } from 'node:crypto'

const OTP_TTL_MS = 10 * 60 * 1000

type OtpTokenPayload = {
  email: string
  codeHash: string
  expiresAt: number
}

function sign(payload: OtpTokenPayload) {
  const secret = process.env.OTP_SECRET
  if (!secret) throw new Error('OTP_SECRET must be set')
  const json = JSON.stringify(payload)
  const sig = createHmac('sha256', secret).update(json).digest('hex')
  return Buffer.from(`${json}.${sig}`).toString('base64url')
}

function hashCode(email: string, code: string) {
  const secret = process.env.OTP_SECRET
  if (!secret) throw new Error('OTP_SECRET must be set')
  return createHmac('sha256', secret).update(`${email.toLowerCase()}:${code}`).digest('hex')
}

/** Generates a 6-digit code and a self-contained, HMAC-signed token carrying
 *  its hash + expiry — no server-side storage needed between the two API calls. */
export function createOtp(email: string) {
  const code = randomInt(0, 1_000_000).toString().padStart(6, '0')
  const payload: OtpTokenPayload = {
    email: email.toLowerCase(),
    codeHash: hashCode(email, code),
    expiresAt: Date.now() + OTP_TTL_MS,
  }
  return { code, token: sign(payload) }
}

export function verifyOtp(token: string, code: string, email: string): boolean {
  const secret = process.env.OTP_SECRET
  if (!secret) throw new Error('OTP_SECRET must be set')

  let json: string
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8')
    const lastDot = decoded.lastIndexOf('.')
    json = decoded.slice(0, lastDot)
    const sig = decoded.slice(lastDot + 1)
    const expectedSig = createHmac('sha256', secret).update(json).digest('hex')
    if (sig.length !== expectedSig.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) {
      return false
    }
  } catch {
    return false
  }

  const payload = JSON.parse(json) as OtpTokenPayload
  if (payload.email !== email.toLowerCase()) return false
  if (Date.now() > payload.expiresAt) return false

  const expectedHash = hashCode(email, code)
  return (
    expectedHash.length === payload.codeHash.length &&
    timingSafeEqual(Buffer.from(expectedHash), Buffer.from(payload.codeHash))
  )
}
