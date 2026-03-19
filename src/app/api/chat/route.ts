import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

// Client initialization moved inside handler to prevent build-time errors

const SYSTEM_PROMPT = `
You are an expert sales and technical assistant for eDrift Electric Private Limited, 
an Indian EV power electronics company based in Coimbatore, Tamil Nadu.

Company Products:
1. On-Board Charger (OBC) — 3.3kW and 6.6kW variants
   - 3.3kW: Input 170-270V AC, 16A, Output 48V/60V/72V/84V/96V, 98% efficiency, PF 0.98
   - 6.6kW: Input 170-270V AC, 32A, Output 108V/144V/312V/520V, 98% efficiency, PF 0.98
2. Portable EV Charger — same power range, IP67, compact
3. DC-DC Converter (Upcoming): 44-450V input range, 14V output, 1kW-1.5kW
4. Integrated Charger (Upcoming)
5. Bidirectional Charger (Upcoming)

Key technology: SiC MOSFET, GaN, LLC resonant topology, CAN communication
Protection: OVP, OCP, OTP, Short Circuit
IP67 | Operating temp: -40°C to +55°C | Size: ~280x160x140mm
Contact: sankar.s@edriftelectric.com | +91-9790274709

Answer technical questions about EV charging, help customers select the right product 
for their battery voltage and power needs, explain specifications clearly.
For quotes or custom orders, direct users to the contact form at /contact.
Be helpful, professional, and concise. Do not make up specifications not listed above.
`

export async function POST(req: NextRequest) {
  try {
    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || 'sk_dummy',
    })
    if (!process.env.ANTHROPIC_API_KEY) {
       return NextResponse.json({ 
         content: "I'm currently in demo mode. For sales inquiries, please contact sankar.s@edriftelectric.com directly." 
       });
    }

    const { messages } = await req.json()
    
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: any) => ({ role: m.role, content: m.content })),
    })
    
    return NextResponse.json({ 
      content: response.content[0].type === 'text' ? response.content[0].text : 'I encountered an issue processing your request.' 
    })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
