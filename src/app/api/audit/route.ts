import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');
  const entity = searchParams.get('entity');
  const action = searchParams.get('action');

  try {
    let query = supabaseAdmin
      .from('audit_log')
      .select('*')
      .order('ts', { ascending: false })
      .range(offset, offset + limit - 1);

    if (entity) {
      query = query.eq('entity', entity);
    }

    if (action) {
      query = query.eq('action', action);
    }

    const { data: logs, error, count } = await query;

    if (error) {
      console.error('Error fetching audit logs:', error);
      return NextResponse.json({ error: 'Failed to fetch audit logs' }, { status: 500 });
    }

    return NextResponse.json({
      logs: logs || [],
      total: count || 0,
      limit,
      offset
    });
  } catch (error) {
    console.error('Error in audit API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
