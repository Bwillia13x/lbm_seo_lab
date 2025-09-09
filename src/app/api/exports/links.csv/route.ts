import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";
import { toCSV } from "@/lib/csv";

export async function GET() {
  try {
    const { data: links, error } = await supabaseAdmin
      .from('links')
      .select('id,label,short_slug,target_url,utm_source,utm_medium,utm_campaign,created_at');

    if (error) {
      return new NextResponse('Failed to fetch links', { status: 500 });
    }

    const rows = (links || []).map(l => ({
      label: l.label,
      short_url: `${process.env.NEXT_PUBLIC_SITE_URL}/r/${l.short_slug}`,
      target_url: l.target_url,
      utm_source: l.utm_source || '',
      utm_medium: l.utm_medium || '',
      utm_campaign: l.utm_campaign || '',
      created_at: new Date(l.created_at).toISOString(),
    }));

    const csv = toCSV(rows);
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="links.csv"`
      }
    });
  } catch (error) {
    return new NextResponse('Internal server error', { status: 500 });
  }
}


