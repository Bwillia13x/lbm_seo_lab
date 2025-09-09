import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { sendOwnerOrderEmail } from "@/lib/emails";
import { supabaseAdmin } from "@/lib/db";

export const dynamic = "force-dynamic";

let stripe: Stripe | null = null;

function getStripe() {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const raw = await req.text();

  const stripe = getStripe();
  if (!stripe) return new NextResponse("Stripe not configured", { status: 500 });

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endpointSecret) return new NextResponse("Webhook secret not configured", { status: 500 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, endpointSecret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const total = (session.amount_total! / 100).toLocaleString("en-CA", { style: "currency", currency: "CAD" });

    const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 });
    const summary = items.data.map(li => `• ${li.description} x ${li.quantity}`).join("\n");

    // Handle pickup slot reservation if present
    let pickupSlotInfo = null;
    if (session.metadata?.pickup_slot_id) {
      try {
        // Increment the reserved count for the pickup slot
        const { error: updateError } = await supabaseAdmin
          .from('pickup_slots')
          .update({ reserved: supabaseAdmin.raw('reserved + 1') })
          .eq('id', session.metadata.pickup_slot_id);

        if (updateError) {
          console.error('Error updating pickup slot reservation:', updateError);
        } else {
          // Get the pickup slot details for the email
          const { data: slotData } = await supabaseAdmin
            .from('pickup_slots')
            .select('start_ts')
            .eq('id', session.metadata.pickup_slot_id)
            .single();

          if (slotData) {
            pickupSlotInfo = {
              startTime: new Date(slotData.start_ts),
              customerName: session.customer_details?.name || undefined,
              location: 'Little Bow Meadows Farm'
            };
          }
        }
      } catch (error) {
        console.error('Error handling pickup slot:', error);
      }
    }

    await sendOwnerOrderEmail({
      to: process.env.BUSINESS_EMAIL!,
      total,
      summary,
      pickupSlot: pickupSlotInfo
    });
  }

  return NextResponse.json({ received: true });
}
