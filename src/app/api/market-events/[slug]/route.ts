import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    const { data: event, error } = await supabaseAdmin
      .from('market_events')
      .select(`
        *,
        event_products (
          product_id,
          limit_per_customer
        )
      `)
      .eq('slug', slug)
      .eq('active', true)
      .single();

    if (error || !event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Error fetching market event:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
