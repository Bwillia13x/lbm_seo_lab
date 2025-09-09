import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET() {
  try {
    const { data: links, error } = await supabaseAdmin
      .from('links')
      .select(`
        *,
        link_hits (
          id,
          ts,
          ip,
          ua
        )
      `)
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching links:', error);
      return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
    }

    // Calculate hit counts for each link
    const linksWithStats = links.map(link => ({
      ...link,
      hits: link.link_hits.length,
      recentHits: link.link_hits.filter((hit: any) =>
        new Date(hit.ts) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length
    }));

    return NextResponse.json({ links: linksWithStats });
  } catch (error) {
    console.error('Error in links API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { label, target_url, utm_source, utm_medium, utm_campaign } = body;

    // Generate short slug
    const shortSlug = Math.random().toString(36).substring(2, 8);

    const { data: link, error } = await supabaseAdmin
      .from('links')
      .insert({
        label,
        target_url,
        short_slug: shortSlug,
        utm_source,
        utm_medium,
        utm_campaign,
        active: true
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating link:', error);
      return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
    }

    return NextResponse.json({ link });
  } catch (error) {
    console.error('Error in create link API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
