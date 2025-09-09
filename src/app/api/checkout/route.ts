import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { findBySlug, assertPurchasable } from "@/lib/products";
import { supabaseAdmin } from "@/lib/db";

export const dynamic = "force-dynamic";

let stripe: Stripe | null = null;

function getStripe() {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const qty = Number(searchParams.get("qty") || 1);

  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  const p = findBySlug(slug);
  if (!p) return NextResponse.json({ error: "Invalid product" }, { status: 400 });

  // Check panic mode and auto-pause conditions
  try {
    const { data: settings } = await supabaseAdmin
      .from('global_settings')
      .select('panic_mode, auto_pause_threshold')
      .single();

    if (settings?.panic_mode) {
      return NextResponse.json({
        error: "We're currently experiencing high demand and have temporarily paused online orders. Please contact us directly to place your order."
      }, { status: 503 });
    }

    // Check auto-pause: if today has high occupancy and reservations exceed threshold
    if (settings?.auto_pause_threshold && settings.auto_pause_threshold > 0) {
      const today = new Date().toISOString().split('T')[0];
      const { data: todaysSlots } = await supabaseAdmin
        .from('pickup_slots')
        .select('reserved, capacity')
        .eq('day', today);

      const totalReserved = todaysSlots?.reduce((sum, slot) => sum + slot.reserved, 0) || 0;
      const totalCapacity = todaysSlots?.reduce((sum, slot) => sum + slot.capacity, 0) || 0;

      if (totalCapacity > 0 && (totalReserved / totalCapacity) >= (settings.auto_pause_threshold / 100)) {
        return NextResponse.json({
          error: "We're fully booked for today! Please try selecting a different pickup date or contact us for availability."
        }, { status: 503 });
      }
    }
  } catch (error) {
    console.error('Error checking panic/auto-pause mode:', error);
    // Continue with checkout if settings check fails
  }

  try {
    assertPurchasable(p, qty);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });

  // Get pickup slot from query params if provided
  const pickupSlotId = searchParams.get("pickup_slot_id");

  // Atomic slot reservation (CRITICAL: prevents overselling)
  let reservationSuccessful = false;
  if (pickupSlotId) {
    try {
      const { data: reservationResult, error: reservationError } = await supabaseAdmin
        .rpc('reserve_slot', { p_slot: pickupSlotId, p_qty: qty });

      if (reservationError || !reservationResult) {
        return NextResponse.json({
          error: "Sorry, this time slot is no longer available. Please select another time."
        }, { status: 409 });
      }

      reservationSuccessful = true;

      // Set hold expiration (15 minutes)
      const holdExpiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      await supabaseAdmin
        .from('pickup_slots')
        .update({
          hold_expires_at: holdExpiresAt,
          held_by_session: `pending-${Date.now()}`
        })
        .eq('id', pickupSlotId);

    } catch (error) {
      console.error('Slot reservation failed:', error);
      return NextResponse.json({
        error: "Unable to reserve slot. Please try again."
      }, { status: 500 });
    }
  }

  const sessionConfig: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    line_items: [{ price: p.stripe_price_id, quantity: qty }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/product/${p.slug}`,
    automatic_tax: { enabled: true },
    metadata: {
      product_slug: p.slug,
      pickup_only: "true"
    }
  };

  // Add pickup slot metadata if provided and reservation successful
  if (pickupSlotId && reservationSuccessful) {
    sessionConfig.metadata!.pickup_slot_id = pickupSlotId;
    sessionConfig.metadata!.reservation_held = "true";
  }

  try {
    const session = await stripe.checkout.sessions.create(sessionConfig);
    return NextResponse.redirect(session.url!, { status: 303 });
  } catch (error) {
    // Release reservation on Stripe error
    if (pickupSlotId && reservationSuccessful) {
      try {
        await supabaseAdmin
          .from('pickup_slots')
          .update({
            reserved: supabaseAdmin.raw('GREATEST(0, reserved - ?)', [qty]),
            hold_expires_at: null,
            held_by_session: null
          })
          .eq('id', pickupSlotId);
      } catch (releaseError) {
        console.error('Failed to release reservation:', releaseError);
      }
    }
    throw error;
  }
}
