"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Users, 
  Sun, 
  Cloud, 
  Snowflake,
  BarChart3,
  Brain,
  AlertCircle,
  CheckCircle,
  Clock,
  Target
} from "lucide-react";

interface PricingFactors {
  season: string;
  dayOfWeek: string;
  weather: string;
  demand: number;
  competition: number;
  historical: number;
}

interface PricingRecommendation {
  basePrice: number;
  adjustedPrice: number;
  factors: PricingFactors;
  confidence: number;
  reasoning: string[];
  suggestions: string[];
}

interface VenuePackage {
  id: string;
  name: string;
  basePrice: number;
  guestCapacity: number;
  description: string;
}

const VENUE_PACKAGES: VenuePackage[] = [
  {
    id: "rustic-barn",
    name: "Rustic Barn Package",
    basePrice: 2500,
    guestCapacity: 75,
    description: "Intimate ceremonies in our charming barn"
  },
  {
    id: "garden-elegance",
    name: "Garden Elegance Package",
    basePrice: 3500,
    guestCapacity: 120,
    description: "Outdoor garden ceremonies with tented reception"
  },
  {
    id: "grand-celebration",
    name: "Grand Celebration Package",
    basePrice: 5000,
    guestCapacity: 150,
    description: "Full venue access with premium amenities"
  }
];

const SEASONS = {
  spring: { name: "Spring", multiplier: 1.1, months: [3, 4, 5] },
  summer: { name: "Summer", multiplier: 1.3, months: [6, 7, 8] },
  fall: { name: "Fall", multiplier: 1.2, months: [9, 10, 11] },
  winter: { name: "Winter", multiplier: 0.8, months: [12, 1, 2] }
};

const DAYS_OF_WEEK = {
  monday: { name: "Monday", multiplier: 0.7 },
  tuesday: { name: "Tuesday", multiplier: 0.7 },
  wednesday: { name: "Wednesday", multiplier: 0.8 },
  thursday: { name: "Thursday", multiplier: 0.9 },
  friday: { name: "Friday", multiplier: 1.1 },
  saturday: { name: "Saturday", multiplier: 1.3 },
  sunday: { name: "Sunday", multiplier: 1.0 }
};

const WEATHER_CONDITIONS = {
  sunny: { name: "Sunny", multiplier: 1.1 },
  partly_cloudy: { name: "Partly Cloudy", multiplier: 1.0 },
  cloudy: { name: "Cloudy", multiplier: 0.95 },
  rainy: { name: "Rainy", multiplier: 0.8 },
  snowy: { name: "Snowy", multiplier: 0.7 }
};

export default function DynamicPricingPage() {
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [guestCount, setGuestCount] = useState<number>(50);
  const [pricingRecommendation, setPricingRecommendation] = useState<PricingRecommendation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getSeasonFromDate = (date: string) => {
    if (!date) return "spring";
    const month = new Date(date).getMonth() + 1;
    for (const [key, season] of Object.entries(SEASONS)) {
      if (season.months.includes(month)) {
        return key;
      }
    }
    return "spring";
  };

  const getDayOfWeek = (date: string) => {
    if (!date) return "saturday";
    const dayIndex = new Date(date).getDay();
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return days[dayIndex];
  };

  const simulateWeather = (date: string) => {
    // Simulate weather based on season and randomness
    const season = getSeasonFromDate(date);
    const weatherOptions = {
      spring: ["sunny", "partly_cloudy", "cloudy", "rainy"],
      summer: ["sunny", "partly_cloudy", "cloudy"],
      fall: ["partly_cloudy", "cloudy", "rainy"],
      winter: ["cloudy", "snowy", "partly_cloudy"]
    };
    const options = weatherOptions[season as keyof typeof weatherOptions] || weatherOptions.spring;
    return options[Math.floor(Math.random() * options.length)];
  };

  const calculateDemandScore = (date: string, packageId: string) => {
    // Simulate demand based on various factors
    const season = getSeasonFromDate(date);
    const dayOfWeek = getDayOfWeek(date);
    
    let demandScore = 0.5; // Base demand
    
    // Season factor
    const seasonMultiplier = SEASONS[season as keyof typeof SEASONS]?.multiplier || 1.0;
    demandScore += (seasonMultiplier - 1) * 0.3;
    
    // Day of week factor
    const dayMultiplier = DAYS_OF_WEEK[dayOfWeek as keyof typeof DAYS_OF_WEEK]?.multiplier || 1.0;
    demandScore += (dayMultiplier - 1) * 0.2;
    
    // Package popularity factor
    const packageFactors = {
      "rustic-barn": 0.8,
      "garden-elegance": 1.0,
      "grand-celebration": 1.2
    };
    demandScore += (packageFactors[packageId as keyof typeof packageFactors] || 1.0 - 1) * 0.1;
    
    return Math.max(0, Math.min(1, demandScore));
  };

  const calculateCompetitionScore = () => {
    // Simulate competition analysis
    return 0.6 + Math.random() * 0.3; // 0.6 to 0.9
  };

  const generatePricingRecommendation = async () => {
    if (!selectedPackage || !eventDate) {
      alert("Please select a package and event date");
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const packageData = VENUE_PACKAGES.find(p => p.id === selectedPackage);
    if (!packageData) return;

    const season = getSeasonFromDate(eventDate);
    const dayOfWeek = getDayOfWeek(eventDate);
    const weather = simulateWeather(eventDate);
    const demand = calculateDemandScore(eventDate, selectedPackage);
    const competition = calculateCompetitionScore();
    const historical = 0.7 + Math.random() * 0.3; // Historical performance

    const factors: PricingFactors = {
      season,
      dayOfWeek,
      weather,
      demand,
      competition,
      historical
    };

    // Calculate adjusted price
    const seasonMultiplier = SEASONS[season as keyof typeof SEASONS]?.multiplier || 1.0;
    const dayMultiplier = DAYS_OF_WEEK[dayOfWeek as keyof typeof DAYS_OF_WEEK]?.multiplier || 1.0;
    const weatherMultiplier = WEATHER_CONDITIONS[weather as keyof typeof WEATHER_CONDITIONS]?.multiplier || 1.0;
    const demandMultiplier = 0.8 + (demand * 0.4); // 0.8 to 1.2
    const competitionMultiplier = 0.9 + (competition * 0.2); // 0.9 to 1.1
    const guestMultiplier = guestCount > packageData.guestCapacity ? 1.2 : 1.0;

    const totalMultiplier = seasonMultiplier * dayMultiplier * weatherMultiplier * 
                           demandMultiplier * competitionMultiplier * guestMultiplier;

    const adjustedPrice = Math.round(packageData.basePrice * totalMultiplier);

    // Generate reasoning
    const reasoning: string[] = [];
    if (seasonMultiplier > 1.1) reasoning.push(`High demand season (${SEASONS[season as keyof typeof SEASONS]?.name})`);
    if (dayMultiplier > 1.1) reasoning.push(`Premium day of week (${DAYS_OF_WEEK[dayOfWeek as keyof typeof DAYS_OF_WEEK]?.name})`);
    if (weatherMultiplier > 1.0) reasoning.push(`Favorable weather conditions (${WEATHER_CONDITIONS[weather as keyof typeof WEATHER_CONDITIONS]?.name})`);
    if (demand > 0.7) reasoning.push("High market demand detected");
    if (competition > 0.8) reasoning.push("Strong competitive positioning");
    if (guestCount > packageData.guestCapacity) reasoning.push("Guest count exceeds standard capacity");

    // Generate suggestions
    const suggestions: string[] = [];
    if (adjustedPrice > packageData.basePrice * 1.2) {
      suggestions.push("Consider offering early bird discounts to maintain competitiveness");
    }
    if (demand < 0.4) {
      suggestions.push("Low demand period - consider promotional pricing");
    }
    if (weather === "rainy" || weather === "snowy") {
      suggestions.push("Weather contingency pricing - offer indoor alternatives");
    }
    if (competition < 0.7) {
      suggestions.push("Competitive advantage detected - premium pricing justified");
    }

    const confidence = Math.min(95, 60 + (demand * 20) + (competition * 15));

    const recommendation: PricingRecommendation = {
      basePrice: packageData.basePrice,
      adjustedPrice,
      factors,
      confidence: Math.round(confidence),
      reasoning,
      suggestions
    };

    setPricingRecommendation(recommendation);
    setIsAnalyzing(false);
  };

  const getFactorIcon = (factor: string, value: number) => {
    if (value > 0.7) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (value < 0.4) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Target className="h-4 w-4 text-yellow-600" />;
  };

  const getFactorColor = (value: number) => {
    if (value > 0.7) return "text-green-600";
    if (value < 0.4) return "text-red-600";
    return "text-yellow-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dynamic Pricing Engine</h1>
        <p className="text-muted-foreground">
          AI-powered pricing recommendations based on market conditions, demand, and seasonal factors
        </p>
      </div>

      {/* Pricing Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing Analysis</CardTitle>
          <CardDescription>
            Enter event details to get AI-powered pricing recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="package">Venue Package</Label>
              <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a package" />
                </SelectTrigger>
                <SelectContent>
                  {VENUE_PACKAGES.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id}>
                      {pkg.name} - ${pkg.basePrice.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Event Date</Label>
              <Input
                id="date"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="guests">Guest Count</Label>
              <Input
                id="guests"
                type="number"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
          <Button 
            onClick={generatePricingRecommendation}
            disabled={isAnalyzing || !selectedPackage || !eventDate}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Market Conditions...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Generate Pricing Recommendation
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Pricing Recommendation */}
      {pricingRecommendation && (
        <div className="space-y-6">
          {/* Price Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Pricing Recommendation</span>
                <Badge variant="outline" className="ml-auto">
                  {pricingRecommendation.confidence}% Confidence
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Base Price</p>
                  <p className="text-2xl font-bold">${pricingRecommendation.basePrice.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Recommended Price</p>
                  <p className="text-3xl font-bold text-green-600">
                    ${pricingRecommendation.adjustedPrice.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Price Adjustment</p>
                  <p className={`text-2xl font-bold ${
                    pricingRecommendation.adjustedPrice > pricingRecommendation.basePrice 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {pricingRecommendation.adjustedPrice > pricingRecommendation.basePrice ? '+' : ''}
                    ${(pricingRecommendation.adjustedPrice - pricingRecommendation.basePrice).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Market Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Season</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getFactorIcon('season', 0.8)}
                      <span className={getFactorColor(0.8)}>
                        {SEASONS[pricingRecommendation.factors.season as keyof typeof SEASONS]?.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Day of Week</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getFactorIcon('day', 0.8)}
                      <span className={getFactorColor(0.8)}>
                        {DAYS_OF_WEEK[pricingRecommendation.factors.dayOfWeek as keyof typeof DAYS_OF_WEEK]?.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <span>Weather</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getFactorIcon('weather', 0.8)}
                      <span className={getFactorColor(0.8)}>
                        {WEATHER_CONDITIONS[pricingRecommendation.factors.weather as keyof typeof WEATHER_CONDITIONS]?.name}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>Market Demand</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getFactorIcon('demand', pricingRecommendation.factors.demand)}
                      <span className={getFactorColor(pricingRecommendation.factors.demand)}>
                        {Math.round(pricingRecommendation.factors.demand * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4" />
                      <span>Competition</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getFactorIcon('competition', pricingRecommendation.factors.competition)}
                      <span className={getFactorColor(pricingRecommendation.factors.competition)}>
                        {Math.round(pricingRecommendation.factors.competition * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4" />
                      <span>Historical Performance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getFactorIcon('historical', pricingRecommendation.factors.historical)}
                      <span className={getFactorColor(pricingRecommendation.factors.historical)}>
                        {Math.round(pricingRecommendation.factors.historical * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reasoning & Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Pricing Factors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {pricingRecommendation.reasoning.map((reason, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm">{reason}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>AI Suggestions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {pricingRecommendation.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-sm">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}