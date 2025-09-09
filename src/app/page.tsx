import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  Link2,
  Tags,
  MessageSquare,
  Image as ImageIcon,
  TrendingUp,
  Shield,
  FileText,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  Home as HomeIcon,
  Sparkles,
} from "lucide-react";
import { OnboardingBanner } from "@/components/ui/onboarding-banner";
import { LBM_CONSTANTS } from "@/lib/constants";

const toolCategories = [
  {
    title: "Marketing & Tracking",
    icon: Tags,
    description: "Track wedding inquiries and farm product sales",
    tools: [
      {
        name: "Campaign Link Builder",
        href: "/apps/utm-dashboard",
        description: "Track where customers come from for weddings and products",
      },
      {
        name: "QR Code Maker",
        href: "/apps/utm-qr",
        description: "Generate QR codes for farm events and pickup locations",
      },
    ],
  },
  {
    title: "Content Creation",
    icon: ImageIcon,
    description: "Create posts for seasonal farming and wedding marketing",
    tools: [
      {
        name: "Google Business Posts",
        href: "/apps/gbp-composer",
        description: "Write posts about seasonal produce and wedding updates",
      },
      {
        name: "Social Media Studio",
        href: "/apps/post-studio",
        description: "Create content for Facebook and Instagram",
      },
    ],
  },
  {
    title: "Farm Business Tools",
    icon: ShoppingBag,
    description: "Tools specifically for farm sales and operations",
    tools: [
      {
        name: "Product Manager",
        href: "/apps/product-manager",
        description: "Manage farm products and seasonal pricing",
      },
      {
        name: "Order Tracker",
        href: "/apps/order-tracker",
        description: "Track customer orders and pickup coordination",
      },
      {
        name: "Inventory Manager",
        href: "/apps/inventory-manager",
        description: "Monitor stock levels and manage inventory",
      },
      {
        name: "Sales Analytics",
        href: "/apps/sales-analytics",
        description: "Track revenue, trends, and business performance",
      },
    ],
  },
  {
    title: "AI-Powered Tools",
    icon: Sparkles,
    description: "Artificial intelligence tools for business optimization",
    tools: [
      {
        name: "AI Wedding Planner",
        href: "/apps/ai-wedding-planner",
        description: "Generate personalized wedding plans with AI",
      },
      {
        name: "AI Content Writer",
        href: "/apps/ai-content-writer",
        description: "Create engaging content for all platforms",
      },
      {
        name: "AI Customer Insights",
        href: "/apps/ai-customer-insights",
        description: "Analyze customer data and preferences",
      },
      {
        name: "AI Menu Planner",
        href: "/apps/ai-menu-planner",
        description: "Create farm-to-table menus with seasonal ingredients",
      },
      {
        name: "AI Marketing Assistant",
        href: "/apps/ai-marketing-assistant",
        description: "Develop comprehensive marketing strategies",
      },
    ],
  },
  {
    title: "Search Performance",
    icon: BarChart3,
    description: "Monitor online visibility for weddings and farm products",
    tools: [
      {
        name: "Search Results Analyzer",
        href: "/apps/gsc-ctr-miner",
        description: "See how customers find Little Bow Meadows online",
      },
      {
        name: "Local Rankings",
        href: "/apps/rank-grid",
        description: "Track rankings for wedding venues and farm searches",
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 fade-in">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Image
            src="/images/PRAIRIESIGNALLOGO.png"
            alt="Prairie Signal"
            width={48}
            height={48}
            className="h-12 w-12"
          />
          <h1 className="text-4xl font-bold tracking-tight belmont-accent-text">
            Little Bow Meadows SEO Lab
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Professional online marketing toolkit for Little Bow Meadows wedding venue,
          floral farm, and farm-to-table operations. Streamline your prairie marketing with
          easy-to-use tools designed for farm businesses.
        </p>

        {/* Quick Start Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button size="lg" className="belmont-accent text-white shadow-lg hover:shadow-xl transition-all duration-200" asChild>
            <Link href="/apps/onboarding">
              <ArrowRight className="h-5 w-5 mr-2" />
              Get Started
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#tools">Browse All Tools</Link>
          </Button>
        </div>
      </div>

      {/* Quick Start Guide */}
      <OnboardingBanner />

      {/* Quick Contact Actions */}
      <div className="flex justify-center gap-4">
        <Button asChild size="sm">
          <a href={LBM_CONSTANTS.PHONE_TEL} className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Call Little Bow Meadows
          </a>
        </Button>
        <Button asChild size="sm">
          <a href={LBM_CONSTANTS.BOOK_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Book Wedding Tour
          </a>
        </Button>
        <Button asChild size="sm">
          <a href="/shop" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Shop Farm Products
          </a>
        </Button>
      </div>

      {/* Tool Categories */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Complete Farm Marketing Toolkit</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            15+ Easy-to-use tools organized by category for comprehensive farm business management
          </p>
        </div>

        <div className="grid gap-8">
          {toolCategories.map((category) => (
            <Card key={category.title} className="elevated-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    {category.title}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {category.tools.length} tools
                    </Badge>
                  </div>
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {category.tools.map((tool) => (
                    <div key={tool.name} className="group p-4 border rounded-lg hover:border-primary/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-sm leading-tight">{tool.name}</h4>
                        <Button asChild variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={tool.href}>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{tool.description}</p>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={tool.href}>Open Tool</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Little Bow Meadows-Specific Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Everything Set Up for Little Bow Meadows Farm Operations
          </CardTitle>
          <CardDescription>
            All tools are configured for your wedding venue and farm business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Business Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Business Name: {LBM_CONSTANTS.BUSINESS_NAME}</li>
                <li>• Location: {LBM_CONSTANTS.ADDRESS_STR}</li>
                <li>• Phone: {LBM_CONSTANTS.PHONE_DISPLAY}</li>
                <li>• Website: {LBM_CONSTANTS.WEBSITE_URL.replace("https://", "")}</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Farm Operations</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Outdoor Prairie Wedding Venue</li>
                <li>• Seasonal Cut Flower Farm</li>
                <li>• Farm-to-Table Products</li>
                <li>• Floral Workshops & Events</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}