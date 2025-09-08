"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Calendar, 
  Heart,
  Brain,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Star,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";

interface BusinessMetric {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  target: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

interface AIInsight {
  id: string;
  type: 'opportunity' | 'warning' | 'success' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  action: string;
  createdAt: string;
}

interface SeasonalTrend {
  month: string;
  bookings: number;
  revenue: number;
  demand: number;
}

interface CompetitorAnalysis {
  name: string;
  price: number;
  rating: number;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function BusinessIntelligencePage() {
  const [metrics, setMetrics] = useState<BusinessMetric[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [seasonalTrends, setSeasonalTrends] = useState<SeasonalTrend[]>([]);
  const [competitors, setCompetitors] = useState<CompetitorAnalysis[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('6months');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Load sample data
  useEffect(() => {
    const sampleMetrics: BusinessMetric[] = [
      {
        name: "Monthly Revenue",
        value: 45000,
        change: 12.5,
        trend: 'up',
        target: 50000,
        status: 'good'
      },
      {
        name: "Booking Conversion Rate",
        value: 68.2,
        change: 5.3,
        trend: 'up',
        target: 70,
        status: 'good'
      },
      {
        name: "Average Booking Value",
        value: 8500,
        change: -2.1,
        trend: 'down',
        target: 9000,
        status: 'warning'
      },
      {
        name: "Customer Satisfaction",
        value: 4.8,
        change: 0.2,
        trend: 'up',
        target: 4.9,
        status: 'excellent'
      },
      {
        name: "Lead Response Time",
        value: 2.3,
        change: -15.2,
        trend: 'up',
        target: 2.0,
        status: 'good'
      },
      {
        name: "Revenue per Guest",
        value: 125,
        change: 8.7,
        trend: 'up',
        target: 130,
        status: 'good'
      }
    ];

    const sampleInsights: AIInsight[] = [
      {
        id: "1",
        type: 'opportunity',
        title: "Peak Season Pricing Opportunity",
        description: "Summer months show 40% higher demand. Consider implementing dynamic pricing for June-August period.",
        impact: 'high',
        confidence: 92,
        action: "Implement seasonal pricing strategy",
        createdAt: "2024-01-30"
      },
      {
        id: "2",
        type: 'warning',
        title: "Booking Conversion Decline",
        description: "Conversion rate dropped 3% this month. Review follow-up process and pricing competitiveness.",
        impact: 'medium',
        confidence: 87,
        action: "Analyze competitor pricing and improve follow-up",
        createdAt: "2024-01-28"
      },
      {
        id: "3",
        type: 'success',
        title: "Social Media Engagement Surge",
        description: "Instagram posts generated 150% more engagement this month. Continue current content strategy.",
        impact: 'medium',
        confidence: 95,
        action: "Maintain current social media approach",
        createdAt: "2024-01-25"
      },
      {
        id: "4",
        type: 'recommendation',
        title: "Floral Package Optimization",
        description: "Custom floral packages show 25% higher profit margins. Promote these packages more aggressively.",
        impact: 'high',
        confidence: 89,
        action: "Update marketing materials to highlight floral packages",
        createdAt: "2024-01-22"
      }
    ];

    const sampleTrends: SeasonalTrend[] = [
      { month: "Jan", bookings: 2, revenue: 15000, demand: 0.3 },
      { month: "Feb", bookings: 3, revenue: 22000, demand: 0.4 },
      { month: "Mar", bookings: 5, revenue: 35000, demand: 0.6 },
      { month: "Apr", bookings: 8, revenue: 48000, demand: 0.8 },
      { month: "May", bookings: 12, revenue: 65000, demand: 1.0 },
      { month: "Jun", bookings: 15, revenue: 78000, demand: 1.2 },
      { month: "Jul", bookings: 18, revenue: 92000, demand: 1.4 },
      { month: "Aug", bookings: 16, revenue: 85000, demand: 1.3 },
      { month: "Sep", bookings: 10, revenue: 55000, demand: 0.9 },
      { month: "Oct", bookings: 6, revenue: 38000, demand: 0.7 },
      { month: "Nov", bookings: 3, revenue: 20000, demand: 0.5 },
      { month: "Dec", bookings: 1, revenue: 12000, demand: 0.2 }
    ];

    const sampleCompetitors: CompetitorAnalysis[] = [
      {
        name: "Prairie Gardens",
        price: 3200,
        rating: 4.6,
        marketShare: 25,
        strengths: ["Large capacity", "Garden setting", "Established reputation"],
        weaknesses: ["Higher pricing", "Limited availability", "Older facilities"]
      },
      {
        name: "Mountain View Venue",
        price: 2800,
        rating: 4.4,
        marketShare: 20,
        strengths: ["Scenic location", "Competitive pricing", "Good reviews"],
        weaknesses: ["Smaller capacity", "Limited parking", "Weather dependent"]
      },
      {
        name: "Riverside Manor",
        price: 4500,
        rating: 4.8,
        marketShare: 30,
        strengths: ["Premium location", "Full service", "High-end amenities"],
        weaknesses: ["Expensive", "Limited availability", "Formal atmosphere"]
      }
    ];

    setMetrics(sampleMetrics);
    setInsights(sampleInsights);
    setSeasonalTrends(sampleTrends);
    setCompetitors(sampleCompetitors);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'down': return <ArrowDown className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <Target className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case 'recommendation': return <Brain className="h-5 w-5 text-purple-600" />;
      default: return <Brain className="h-5 w-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'success': return 'border-blue-200 bg-blue-50';
      case 'recommendation': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const simulateAIAnalysis = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate new insights
    const newInsight: AIInsight = {
      id: Date.now().toString(),
      type: 'recommendation',
      title: "AI-Generated Insight",
      description: "Based on current data patterns, consider offering mid-week discounts to increase off-season bookings.",
      impact: 'medium',
      confidence: 85,
      action: "Implement mid-week pricing strategy",
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setInsights([newInsight, ...insights]);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Business Intelligence Dashboard</h1>
          <p className="text-muted-foreground">
            AI-powered insights and analytics for Little Bow Meadows business optimization
          </p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={simulateAIAnalysis} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Run AI Analysis
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{metric.name}</h3>
                <Badge className={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {metric.name.includes('Rate') || metric.name.includes('Satisfaction') 
                      ? `${metric.value}%` 
                      : metric.name.includes('Revenue') || metric.name.includes('Value')
                      ? `$${metric.value.toLocaleString()}`
                      : metric.value
                    }
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-sm ${getTrendColor(metric.trend)}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Target</p>
                  <p className="text-sm font-medium">
                    {metric.name.includes('Rate') || metric.name.includes('Satisfaction') 
                      ? `${metric.target}%` 
                      : metric.name.includes('Revenue') || metric.name.includes('Value')
                      ? `$${metric.target.toLocaleString()}`
                      : metric.target
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI-Powered Insights</span>
          </CardTitle>
          <CardDescription>
            Intelligent recommendations and alerts based on your business data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight) => (
              <div key={insight.id} className={`border rounded-lg p-4 ${getInsightColor(insight.type)}`}>
                <div className="flex items-start space-x-3">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{insight.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge className={getImpactColor(insight.impact)}>
                          {insight.impact} impact
                        </Badge>
                        <Badge variant="outline">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {insight.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Action: {insight.action}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(insight.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seasonal Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Seasonal Trends Analysis</span>
          </CardTitle>
          <CardDescription>
            Monthly booking patterns and revenue trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Peak Season</h4>
                <div className="space-y-1">
                  {seasonalTrends
                    .sort((a, b) => b.demand - a.demand)
                    .slice(0, 3)
                    .map((trend, index) => (
                      <div key={trend.month} className="flex justify-between text-sm">
                        <span>{trend.month}</span>
                        <span className="font-medium">{trend.demand.toFixed(1)}x demand</span>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Revenue Leaders</h4>
                <div className="space-y-1">
                  {seasonalTrends
                    .sort((a, b) => b.revenue - a.revenue)
                    .slice(0, 3)
                    .map((trend, index) => (
                      <div key={trend.month} className="flex justify-between text-sm">
                        <span>{trend.month}</span>
                        <span className="font-medium">${trend.revenue.toLocaleString()}</span>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Booking Volume</h4>
                <div className="space-y-1">
                  {seasonalTrends
                    .sort((a, b) => b.bookings - a.bookings)
                    .slice(0, 3)
                    .map((trend, index) => (
                      <div key={trend.month} className="flex justify-between text-sm">
                        <span>{trend.month}</span>
                        <span className="font-medium">{trend.bookings} bookings</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Competitive Intelligence</span>
          </CardTitle>
          <CardDescription>
            Market positioning and competitive analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competitors.map((competitor, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{competitor.name}</h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <span>${competitor.price.toLocaleString()}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{competitor.rating}</span>
                    </div>
                    <span>{competitor.marketShare}% market share</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-green-600 mb-1">Strengths</h4>
                    <ul className="text-sm space-y-1">
                      {competitor.strengths.map((strength, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-red-600 mb-1">Weaknesses</h4>
                    <ul className="text-sm space-y-1">
                      {competitor.weaknesses.map((weakness, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <AlertCircle className="h-3 w-3 text-red-600" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}