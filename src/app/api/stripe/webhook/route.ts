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

// Helper to log audit events
async function logAuditEvent(action: string, entity: string, entityId: string, oldValues?: any, newValues?: any, meta?: any) {
  try {
    await supabaseAdmin.from('audit_log').insert({
      actor: 'system',
      action,
      entity,
      entity_id: entityId,
      old_values: oldValues,
      new_values: newValues,
      meta
    });
  } catch (error) {
    console.error('Failed to log audit event:', error);
  }
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

  // Log webhook event (idempotency and audit)
  try {
    const { error: logError } = await supabaseAdmin
      .from('stripe_events')
      .upsert({
        id: event.id,
        type: event.type,
        received_at: new Date().toISOString(),
        processed: false,
        raw_payload: event
      }, { onConflict: 'id' });

    if (logError) {
      console.error('Failed to log webhook event:', logError);
    }
  } catch (error) {
    console.error('Error logging webhook event:', error);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Check for duplicate processing
      const { data: existingEvent } = await supabaseAdmin
        .from('stripe_events')
        .select('processed')
        .eq('id', event.id)
        .single();

      if (existingEvent?.processed) {
        console.log(`Skipping already processed event: ${event.id}`);
        return NextResponse.json({ received: true, status: 'already_processed' });
      }

      const total = (session.amount_total! / 100).toLocaleString("en-CA", { style: "currency", currency: "CAD" });
      const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 10 });
      const summary = items.data.map(li => `• ${li.description} x ${li.quantity}`).join("\n");

      // Create order record
      const orderData = {
        stripe_session_id: session.id,
        customer_email: session.customer_details?.email,
        customer_name: session.customer_details?.name,
        total_cents: session.amount_total,
        status: 'paid'
      };

      // Handle pickup slot reservation if present
      let pickupSlotInfo = null;
      if (session.metadata?.pickup_slot_id) {
        orderData.pickup_slot_id = session.metadata.pickup_slot_id;

        try {
          // If reservation was held, just confirm it (don't increment again)
          if (session.metadata.reservation_held === "true") {
            // Clear the hold and mark as confirmed
            await supabaseAdmin
              .from('pickup_slots')
              .update({
                hold_expires_at: null,
                held_by_session: null
              })
              .eq('id', session.metadata.pickup_slot_id);

            await logAuditEvent('confirm_reservation', 'pickup_slots', session.metadata.pickup_slot_id, null, null, {
              session_id: session.id,
              customer_email: session.customer_details?.email
            });
          } else {
            // Legacy: increment reservation (for sessions without atomic reservation)
            const { error: updateError } = await supabaseAdmin
              .from('pickup_slots')
              .update({ reserved: supabaseAdmin.raw('reserved + 1') })
              .eq('id', session.metadata.pickup_slot_id);

            if (updateError) {
              console.error('Error updating pickup slot reservation:', updateError);
            }
          }

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
        } catch (error) {
          console.error('Error handling pickup slot:', error);
        }
      }

      // Insert order
      const { data: order, error: orderError } = await supabaseAdmin
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
      } else {
        // Insert order items
        const orderItems = items.data.map(item => ({
          order_id: order.id,
          product_id: item.price?.metadata?.product_id || 'unknown',
          product_name: item.description || 'Unknown Product',
          stripe_price_id: item.price?.id,
          qty: item.quantity,
          unit_price_cents: item.price?.unit_amount || 0
        }));

        const { error: itemsError } = await supabaseAdmin
          .from('order_items')
          .insert(orderItems);

        if (itemsError) {
          console.error('Error creating order items:', itemsError);
        }

        await logAuditEvent('create_order', 'orders', order.id, null, orderData, {
          stripe_session_id: session.id,
          item_count: orderItems.length
        });
      }

      // Send confirmation emails
      await sendOwnerOrderEmail({
        to: process.env.BUSINESS_EMAIL!,
        total,
        summary,
        pickupSlot: pickupSlotInfo
      });

      // Mark webhook as processed
      await supabaseAdmin
        .from('stripe_events')
        .update({ processed: true })
        .eq('id', event.id);

    } else if (event.type === "checkout.session.expired") {
      // Handle expired checkout sessions (release holds)
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.metadata?.pickup_slot_id && session.metadata.reservation_held === "true") {
        try {
          // Release the hold
          await supabaseAdmin
            .from('pickup_slots')
            .update({
              reserved: supabaseAdmin.raw('GREATEST(0, reserved - 1)'),
              hold_expires_at: null,
              held_by_session: null
            })
            .eq('id', session.metadata.pickup_slot_id);

          await logAuditEvent('release_expired_hold', 'pickup_slots', session.metadata.pickup_slot_id, null, null, {
            session_id: session.id,
            reason: 'checkout_expired'
          });

          console.log(`Released hold for expired session: ${session.id}`);
        } catch (error) {
          console.error('Error releasing expired hold:', error);
        }
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    // Log processing error
    await supabaseAdmin
      .from('stripe_events')
      .update({
        processed: false,
        error_message: error instanceof Error ? error.message : 'Unknown error'
      })
      .eq('id', event.id);

    console.error('Webhook processing error:', error);
    return new NextResponse("Webhook processing failed", { status: 500 });
  }
}
