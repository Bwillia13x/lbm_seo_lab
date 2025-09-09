import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product_id } = body;

    if (!product_id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Get waitlist subscribers for this product
    const { data: waitlist, error: waitlistError } = await supabaseAdmin
      .from('waitlist')
      .select('id, email')
      .eq('product_id', product_id)
      .is('notified_at', null);

    if (waitlistError) {
      console.error('Error fetching waitlist:', waitlistError);
      return NextResponse.json({ error: 'Failed to fetch waitlist' }, { status: 500 });
    }

    if (!waitlist || waitlist.length === 0) {
      return NextResponse.json({
        message: 'No subscribers to notify',
        notified: 0
      });
    }

    // Get product details for the email
    const { data: product } = await supabaseAdmin
      .from('products')
      .select('name')
      .eq('id', product_id)
      .single();

    const productName = product?.name || 'our product';

    let notifiedCount = 0;
    const errors: string[] = [];

    // Send notifications
    for (const subscriber of waitlist) {
      try {
        await resend.emails.send({
          from: "Little Bow Meadows <orders@littlebowmeadows.ca>",
          to: subscriber.email,
          subject: `${productName} is back in stock!`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #16a34a;">Good news from Little Bow Meadows!</h2>

              <p>The ${productName} you were waiting for is now available!</p>

              <p>We're excited to let you know that fresh stock has just arrived. Don't miss out on this seasonal favorite.</p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/shop"
                   style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Shop Now
                </a>
              </div>

              <p>This is a one-time notification. If you're no longer interested, you can safely ignore this email.</p>

              <p>Thank you for your patience and for supporting Little Bow Meadows!</p>

              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">

              <p style="font-size: 12px; color: #6b7280;">
                Little Bow Meadows<br>
                Supporting local farming and seasonal eating
              </p>
            </div>
          `
        });

        // Mark as notified
        await supabaseAdmin
          .from('waitlist')
          .update({ notified_at: new Date().toISOString() })
          .eq('id', subscriber.id);

        notifiedCount++;

        // Log audit event
        await supabaseAdmin.from('audit_log').insert({
          actor: 'system',
          action: 'send_waitlist_notification',
          entity: 'waitlist',
          entity_id: subscriber.id,
          meta: {
            product_id,
            product_name: productName,
            email: subscriber.email
          }
        });

      } catch (error) {
        console.error(`Failed to notify ${subscriber.email}:`, error);
        errors.push(subscriber.email);
      }
    }

    return NextResponse.json({
      message: `Notified ${notifiedCount} subscribers`,
      notified: notifiedCount,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Error in waitlist notify API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
