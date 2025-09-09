import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  const ua = request.headers.get('user-agent') || 'unknown';

  try {
    // Find the link by slug
    const { data: link, error: linkError } = await supabaseAdmin
      .from('links')
      .select('*')
      .eq('short_slug', slug)
      .single();

    if (linkError || !link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    // Log the hit
    const { error: hitError } = await supabaseAdmin
      .from('link_hits')
      .insert({
        link_id: link.id,
        ts: new Date().toISOString(),
        ip,
        ua
      });

    if (hitError) {
      console.error('Error logging link hit:', hitError);
    }

    // Build target URL with UTM parameters
    const targetUrl = new URL(link.target_url);
    if (link.utm_source) targetUrl.searchParams.set('utm_source', link.utm_source);
    if (link.utm_medium) targetUrl.searchParams.set('utm_medium', link.utm_medium);
    if (link.utm_campaign) targetUrl.searchParams.set('utm_campaign', link.utm_campaign);

    // Redirect to target URL
    return NextResponse.redirect(targetUrl.toString(), { status: 302 });
  } catch (error) {
    console.error('Error processing link redirect:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
