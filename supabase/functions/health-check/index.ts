// Nightly end-to-end health check of the website quote pipeline.
// Submits a clearly-labeled test quote to the ShopManager backend and emails
// phil@hellscanyondesigns.com ONLY when something fails.
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const SHOPMANAGER_URL = 'https://fzkxeodjkaeqkwqhwcdv.supabase.co'
const SHOPMANAGER_KEY = 'sb_publishable_RnBT83Kf0jDUY6g2hORnqQ_4YDnM63a'
const SITE_URL = 'https://hellscanyondesigns.com'
const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'
const NOTIFY_EMAIL = 'phil@hellscanyondesigns.com'

async function sendAlert(failures: string[]) {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
  if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
    console.error('Cannot send alert: email service not configured')
    return
  }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:520px;">
      <h2 style="margin:0 0 12px;color:#b00;">Website check failed</h2>
      <p>The automatic nightly check found a problem with the website:</p>
      <ul>${failures.map((f) => `<li>${f}</li>`).join('')}</ul>
      <p style="color:#555;font-size:14px;">
        Customers may not be able to send quote requests right now. Checked at ${new Date().toUTCString()}.
      </p>
    </div>`

  const res = await fetch(`${GATEWAY_URL}/emails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': RESEND_API_KEY,
    },
    body: JSON.stringify({
      from: 'HCD Website <onboarding@resend.dev>',
      to: [NOTIFY_EMAIL],
      subject: 'ALERT: Hells Canyon Designs website check failed',
      html,
    }),
  })
  if (!res.ok) console.error('Alert email failed:', res.status, await res.text())
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const expected = Deno.env.get('HEALTH_CHECK_KEY')
  if (!expected || req.headers.get('x-health-token') !== expected) {
    return new Response('Unauthorized', { status: 401, headers: corsHeaders })
  }

  const failures: string[] = []
  const checks: Record<string, string> = {}

  // Retry transient blips twice before treating a check as a real failure.
  async function withRetry<T>(fn: () => Promise<T | null>): Promise<T | null> {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const result = await fn()
        if (result !== null) return result
      } catch (_err) {
        // fall through to retry
      }
      if (attempt < 2) await new Promise((r) => setTimeout(r, 5000))
    }
    return null
  }

  // 1. Is the public website reachable?
  const siteOk = await withRetry(async () => {
    const site = await fetch(SITE_URL, { redirect: 'follow' })
    return site.ok ? 'ok' : null
  })
  checks.website = siteOk ? 'ok' : 'unreachable after 3 attempts'
  if (!siteOk) failures.push('The website could not be reached (checked 3 times).')

  // 2. Can a quote actually be created end to end?
  let lastQuoteError = 'unknown'
  const quoteOk = await withRetry(async () => {
    const res = await fetch(`${SHOPMANAGER_URL}/functions/v1/create-quote-action-item`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SHOPMANAGER_KEY },
      body: JSON.stringify({
        serviceType: 'custom_hats',
        name: 'AUTOMATED SYSTEM CHECK — ignore',
        email: 'systemcheck@hellscanyondesigns.com',
        phone: '0000000000',
        company: 'AUTOMATED SYSTEM CHECK',
        source: 'nightly-health-check',
        notes: 'AUTOMATED NIGHTLY SYSTEM CHECK — not a real customer. Safe to delete.',
        quantity: 1,
        details: { check: 'nightly' },
        customer_name: 'AUTOMATED SYSTEM CHECK — ignore',
        customer_email: 'systemcheck@hellscanyondesigns.com',
        customer_phone: '0000000000',
        customer_company: 'AUTOMATED SYSTEM CHECK',
      }),
    })
    const text = await res.text()
    if (!res.ok) {
      failures.push(`Quote requests are failing (error ${res.status}). Customers cannot submit quotes.`)
      checks.quotes = `status ${res.status}: ${text.slice(0, 300)}`
    } else {
      checks.quotes = 'ok'
    }
  } catch (err) {
    failures.push('The quote system could not be reached. Customers cannot submit quotes.')
    checks.quotes = `error: ${String(err)}`
  }

  if (failures.length > 0) {
    await sendAlert(failures)
  }

  return new Response(
    JSON.stringify({ healthy: failures.length === 0, failures, checks }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  )
})
