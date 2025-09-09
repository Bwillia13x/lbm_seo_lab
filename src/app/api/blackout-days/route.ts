import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET() {
  try {
    const { data: blackoutDays, error } = await supabaseAdmin
      .from('blackout_days')
      .select('*')
      .order('day');

    if (error) {
      console.error('Error fetching blackout days:', error);
      return NextResponse.json({ error: 'Failed to fetch blackout days' }, { status: 500 });
    }

    return NextResponse.json({ blackoutDays });
  } catch (error) {
    console.error('Error in blackout days API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { day, reason } = body;

    const { data: blackoutDay, error } = await supabaseAdmin
      .from('blackout_days')
      .insert({
        day,
        reason,
        created_by: 'api' // In production, get from auth
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating blackout day:', error);
      return NextResponse.json({ error: 'Failed to create blackout day' }, { status: 500 });
    }

    return NextResponse.json({ blackoutDay });
  } catch (error) {
    console.error('Error in create blackout day API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
