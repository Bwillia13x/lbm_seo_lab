import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'week'; // week, month, year

    let dateFilter = '';
    const now = new Date();

    switch (period) {
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        dateFilter = `date >= '${weekAgo.toISOString().split('T')[0]}'`;
        break;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        dateFilter = `date >= '${monthAgo.toISOString().split('T')[0]}'`;
        break;
      case 'year':
        const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        dateFilter = `date >= '${yearAgo.toISOString().split('T')[0]}'`;
        break;
    }

    // Get margin tracking data
    const { data: marginData, error: marginError } = await supabaseAdmin
      .from('margin_tracking')
      .select('*')
      .order('date', { ascending: false });

    if (marginError) {
      console.error('Error fetching margin data:', marginError);
      return NextResponse.json({ error: 'Failed to fetch margin data' }, { status: 500 });
    }

    // Calculate totals
    const totalRevenue = marginData.reduce((sum, item) => sum + item.revenue_cents, 0);
    const totalCost = marginData.reduce((sum, item) => sum + item.cost_cents, 0);
    const totalFees = marginData.reduce((sum, item) => sum + item.stripe_fees_cents, 0);
    const grossMargin = totalRevenue - totalCost;
    const netMargin = grossMargin - totalFees;
    const marginPercentage = totalRevenue > 0 ? (netMargin / totalRevenue) * 100 : 0;

    // Group by product
    const productStats = marginData.reduce((acc, item) => {
      if (!acc[item.product_name]) {
        acc[item.product_name] = {
          name: item.product_name,
          revenue: 0,
          cost: 0,
          fees: 0,
          units: 0,
          margin: 0
        };
      }
      acc[item.product_name].revenue += item.revenue_cents;
      acc[item.product_name].cost += item.cost_cents;
      acc[item.product_name].fees += item.stripe_fees_cents;
      acc[item.product_name].units += item.units_sold;
      acc[item.product_name].margin = acc[item.product_name].revenue - acc[item.product_name].cost - acc[item.product_name].fees;
      return acc;
    }, {} as Record<string, any>);

    const topProducts = Object.values(productStats)
      .sort((a: any, b: any) => b.revenue - a.revenue)
      .slice(0, 5);

    // Daily revenue trend (last 30 days)
    const dailyRevenue = marginData.reduce((acc, item) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += item.revenue_cents;
      return acc;
    }, {} as Record<string, number>);

    const revenueTrend = Object.entries(dailyRevenue)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, revenue]) => ({
        date,
        revenue: (revenue as number) / 100 // Convert to dollars
      }));

    return NextResponse.json({
      period,
      totals: {
        revenue: totalRevenue / 100,
        cost: totalCost / 100,
        fees: totalFees / 100,
        grossMargin: grossMargin / 100,
        netMargin: netMargin / 100,
        marginPercentage: Math.round(marginPercentage * 100) / 100
      },
      topProducts: topProducts.map((product: any) => ({
        ...product,
        revenue: product.revenue / 100,
        cost: product.cost / 100,
        fees: product.fees / 100,
        margin: product.margin / 100
      })),
      revenueTrend
    });
  } catch (error) {
    console.error('Error in margins analytics API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
