import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET() {
  try {
    const { data: rules, error } = await supabaseAdmin
      .from('seasonality_rules')
      .select('*')
      .order('start_week');

    if (error) {
      console.error('Error fetching seasonality rules:', error);
      return NextResponse.json({ error: 'Failed to fetch rules' }, { status: 500 });
    }

    return NextResponse.json({ rules });
  } catch (error) {
    console.error('Error in seasonality rules API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product_name, start_week, end_week } = body;

    const { data: rule, error } = await supabaseAdmin
      .from('seasonality_rules')
      .insert({
        product_name,
        start_week,
        end_week,
        active: true
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating seasonality rule:', error);
      return NextResponse.json({ error: 'Failed to create rule' }, { status: 500 });
    }

    return NextResponse.json({ rule });
  } catch (error) {
    console.error('Error in create seasonality rule API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
