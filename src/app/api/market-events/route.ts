import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET() {
  try {
    const { data: events, error } = await supabaseAdmin
      .from('market_events')
      .select(`
        *,
        event_products (
          product_id,
          limit_per_customer
        )
      `)
      .eq('active', true)
      .order('event_date');

    if (error) {
      console.error('Error fetching market events:', error);
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error in market events API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, event_date, location, order_deadline } = body;

    const { data: event, error } = await supabaseAdmin
      .from('market_events')
      .insert({
        name,
        slug,
        event_date,
        location,
        order_deadline,
        active: true
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating market event:', error);
      return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Error in create market event API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
