import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/db";

let stripe: Stripe | null = null;

function getStripe() {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
}

export async function POST() {
  try {
    const stripe = getStripe();
    if (!stripe) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });

    // Get sessions from last 48 hours
    const twoDaysAgo = Math.floor((Date.now() - 48 * 60 * 60 * 1000) / 1000);
    const sessions = await stripe.checkout.sessions.list({
      created: { gte: twoDaysAgo },
      limit: 100
    });

    let reconciled = 0;
    let skipped = 0;
    let errors = 0;

    for (const session of sessions.data) {
      try {
        // Check if we already processed this session
        const { data: existingOrder } = await supabaseAdmin
          .from('orders')
          .select('id')
          .eq('stripe_session_id', session.id)
          .single();

        if (existingOrder) {
          skipped++;
          continue;
        }

        // Check if webhook was already logged
        const { data: existingEvent } = await supabaseAdmin
          .from('stripe_events')
          .select('processed')
          .eq('id', session.id)
          .single();

        if (existingEvent?.processed) {
          skipped++;
          continue;
        }

        // Process the session (similar to webhook handler)
        if (session.status === 'complete' && session.payment_status === 'paid') {
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

            // If reservation was held, just confirm it
            if (session.metadata.reservation_held === "true") {
              await supabaseAdmin
                .from('pickup_slots')
                .update({
                  hold_expires_at: null,
                  held_by_session: null
                })
                .eq('id', session.metadata.pickup_slot_id);
            } else {
              // Legacy: increment reservation
              const { error: updateError } = await supabaseAdmin
                .from('pickup_slots')
                .update({ reserved: supabaseAdmin.raw('reserved + 1') })
                .eq('id', session.metadata.pickup_slot_id);

              if (updateError) {
                console.error('Error updating pickup slot reservation:', updateError);
              }
            }

            // Get pickup slot details for email
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

          // Insert order
          const { data: order, error: orderError } = await supabaseAdmin
            .from('orders')
            .insert(orderData)
            .select()
            .single();

          if (!orderError && order) {
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

            // Log audit event
            await supabaseAdmin.from('audit_log').insert({
              actor: 'webhook_reconciliation',
              action: 'create_order',
              entity: 'orders',
              entity_id: order.id,
              meta: {
                stripe_session_id: session.id,
                source: 'reconciliation',
                item_count: orderItems.length
              }
            });
          }

          // Log the webhook event as processed
          await supabaseAdmin
            .from('stripe_events')
            .upsert({
              id: session.id,
              type: 'checkout.session.completed',
              received_at: new Date().toISOString(),
              processed: true,
              raw_payload: session
            }, { onConflict: 'id' });

          reconciled++;
        }
      } catch (error) {
        console.error(`Error reconciling session ${session.id}:`, error);
        errors++;

        // Log error in stripe_events
        await supabaseAdmin
          .from('stripe_events')
          .upsert({
            id: session.id,
            type: 'checkout.session.completed',
            received_at: new Date().toISOString(),
            processed: false,
            error_message: error instanceof Error ? error.message : 'Unknown error',
            raw_payload: session
          }, { onConflict: 'id' });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Reconciliation complete`,
      stats: {
        reconciled,
        skipped,
        errors,
        totalProcessed: reconciled + skipped + errors
      }
    });

  } catch (error) {
    console.error('Error in webhook reconciliation:', error);
    return NextResponse.json({ error: 'Reconciliation failed' }, { status: 500 });
  }
}
