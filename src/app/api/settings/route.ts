import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET() {
  try {
    const { data: settings, error } = await supabaseAdmin
      .from('global_settings')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows
      console.error('Error fetching settings:', error);
      return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }

    return NextResponse.json({ settings: settings || { panic_mode: false, auto_pause_threshold: 8 } });
  } catch (error) {
    console.error('Error in settings API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { panic_mode, auto_pause_threshold } = body;

    const { data: settings, error } = await supabaseAdmin
      .from('global_settings')
      .update({
        panic_mode,
        auto_pause_threshold,
        updated_at: new Date().toISOString(),
        updated_by: 'api' // In production, get from auth
      })
      .eq('id', 1)
      .select()
      .single();

    if (error) {
      console.error('Error updating settings:', error);
      return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error in update settings API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
