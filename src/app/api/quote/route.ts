import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
// It will fallback to a dummy key to prevent crashes if not set during dev
const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey || 're_dummy_key_to_prevent_crash');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, mobile, description, product } = body;

    // Validate required fields
    if (!email || !mobile || !product) {
      return NextResponse.json(
        { error: 'Missing required fields (email, mobile, product)' },
        { status: 400 }
      );
    }

    // Default to a placeholder if no admin email is set in environment
    const adminEmail = process.env.ADMIN_EMAIL || 'sales@edriftelectric.com';

    // If Resend API key is missing, mock the success response (useful for local testing)
    if (!resendApiKey) {
      console.warn('⚠️ RESEND_API_KEY is not set. Mocking email delivery.');
      console.log('Mock Email Content:', {
        to: adminEmail,
        subject: `New Request for Quote: ${product.name}`,
        body: `Customer Email: ${email}\nCustomer Mobile: ${mobile}\nDescription: ${description}`
      });
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return NextResponse.json({ success: true, mocked: true });
    }

    // Send the email using Resend
    const data = await resend.emails.send({
      from: 'eDrift Engineering <quotes@edriftelectric.com>', // Replace with verified domain in production
      to: adminEmail,
      subject: `New RFQ: ${product.name} (${product.sku})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0F172A;">New Request for Quote</h2>
          <p>A customer has requested a quote for the following product:</p>
          
          <div style="background-color: #F8FAFC; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Product:</strong> ${product.name}</p>
            <p style="margin: 0;"><strong>SKU:</strong> ${product.sku}</p>
          </div>

          <h3 style="color: #0F172A; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px;">Customer Details</h3>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Mobile:</strong> <a href="tel:${mobile}">${mobile}</a></p>
          
          <h3 style="color: #0F172A; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px;">Additional Requirements</h3>
          <p style="white-space: pre-wrap; background-color: #F8FAFC; padding: 12px; border-radius: 6px;">${description || '<em>No specific description provided.</em>'}</p>
          
          <hr style="border: none; border-top: 1px solid #E2E8F0; margin-top: 32px;" />
          <p style="font-size: 12px; color: #64748B;">This email was generated automatically by the eDrift Electric platform.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Failed to process quote request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
