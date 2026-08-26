import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'
const NOTIFY_EMAIL = 'phil@hellscanyondesigns.com'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      throw new Error('Email service is not configured')
    }

    const body = await req.json()
    const name = typeof body?.name === 'string' ? body.name.slice(0, 200) : ''
    const email = typeof body?.email === 'string' ? body.email.slice(0, 200) : ''
    const phone = typeof body?.phone === 'string' ? body.phone.slice(0, 50) : ''
    const company = typeof body?.company === 'string' ? body.company.slice(0, 200) : ''
    const serviceType = typeof body?.serviceType === 'string' ? body.serviceType.slice(0, 100) : ''
    const quoteNumber = typeof body?.quoteNumber === 'string' ? body.quoteNumber.slice(0, 50) : ''

    if (!name || !email) {
      return new Response(JSON.stringify({ error: 'name and email are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const rows = [
      quoteNumber && `<tr><td style="padding:4px 12px 4px 0;color:#888;">Quote</td><td><strong>${quoteNumber}</strong></td></tr>`,
      `<tr><td style="padding:4px 12px 4px 0;color:#888;">Name</td><td>${name}</td></tr>`,
      company && `<tr><td style="padding:4px 12px 4px 0;color:#888;">Company</td><td>${company}</td></tr>`,
      `<tr><td style="padding:4px 12px 4px 0;color:#888;">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>`,
      phone && `<tr><td style="padding:4px 12px 4px 0;color:#888;">Phone</td><td><a href="tel:${phone}">${phone}</a></td></tr>`,
      serviceType && `<tr><td style="padding:4px 12px 4px 0;color:#888;">Product</td><td>${serviceType}</td></tr>`,
    ].filter(Boolean).join('')

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:520px;">
        <h2 style="margin:0 0 12px;">New quote request${quoteNumber ? ` — ${quoteNumber}` : ''}</h2>
        <table style="border-collapse:collapse;font-size:15px;">${rows}</table>
        <p style="margin-top:16px;color:#555;font-size:14px;">
          Full details (notes, artwork links) are in the shop manager database under this quote number.
        </p>
      </div>`

    const response = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: 'HCD Website <onboarding@resend.dev>',
        to: [NOTIFY_EMAIL],
        subject: `New quote request${quoteNumber ? ` ${quoteNumber}` : ''} — ${name}`,
        html,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(`Resend gateway failed [${response.status}]: ${errorBody}`)
      return new Response(
        JSON.stringify({ error: 'Email provider request failed', status: response.status, details: errorBody }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const result = await response.json()
    return new Response(JSON.stringify({ success: true, id: result?.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('notify-quote error:', err)
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
