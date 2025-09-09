import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET() {
  try {
    const { data: checklist, error } = await supabaseAdmin
      .from('seo_checklist')
      .select('*')
      .order('category');

    if (error) {
      console.error('Error fetching SEO checklist:', error);
      return NextResponse.json({ error: 'Failed to fetch checklist' }, { status: 500 });
    }

    return NextResponse.json({ checklist });
  } catch (error) {
    console.error('Error in SEO checklist API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, completed, notes } = body;

    const { data: item, error } = await supabaseAdmin
      .from('seo_checklist')
      .update({
        completed,
        notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating SEO checklist item:', error);
      return NextResponse.json({ error: 'Failed to update checklist item' }, { status: 500 });
    }

    return NextResponse.json({ item });
  } catch (error) {
    console.error('Error in update SEO checklist API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
