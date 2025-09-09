import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { findBySlug, assertPurchasable } from "@/lib/products";

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

  try {
    assertPurchasable(p, qty);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });

  // Get pickup slot from query params if provided
  const pickupSlotId = searchParams.get("pickup_slot_id");

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

  // Add pickup slot metadata if provided
  if (pickupSlotId) {
    sessionConfig.metadata!.pickup_slot_id = pickupSlotId;
  }

  const session = await stripe.checkout.sessions.create(sessionConfig);

  return NextResponse.redirect(session.url!, { status: 303 });
}
