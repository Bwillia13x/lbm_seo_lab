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
  Flower2,
  DollarSign,
  Users,
} from "lucide-react";
import { OnboardingBanner } from "@/components/ui/onboarding-banner";
import { LBM_CONSTANTS } from "@/lib/constants";

const toolCategories = [
  {
    title: "Venue Management",
    icon: Calendar,
    description:
      "Manage wedding bookings, venue availability, and event coordination for Little Bow Meadows",
    tools: [
      {
        name: "Venue Booking System",
        href: "/apps/venue-booking",
        description:
          "Complete wedding venue management with booking calendar, package selection, and customer management",
      },
      {
        name: "Event Coordination",
        href: "/apps/event-coordination",
        description:
          "Manage wedding day timelines, vendor coordination, and day-of event management",
      },
      {
        name: "Venue Tours",
        href: "/apps/venue-tours",
        description: "Schedule and manage venue tours for potential wedding couples",
      },
    ],
  },
  {
    title: "Floral Operations",
    icon: Flower2,
    description: "Manage floral farm operations, inventory, and custom arrangements",
    tools: [
      {
        name: "Floral Operations Dashboard",
        href: "/apps/floral-operations",
        description:
          "Track floral inventory, crop planning, and manage custom wedding arrangements",
      },
      {
        name: "Crop Planning",
        href: "/apps/crop-planning",
        description:
          "Plan seasonal flower planting and harvest schedules for optimal wedding season supply",
      },
      {
        name: "Floral Design Studio",
        href: "/apps/floral-design",
        description: "Create custom bouquets and centerpieces with AI-powered design suggestions",
      },
    ],
  },
  {
    title: "Pricing & Revenue",
    icon: DollarSign,
    description: "AI-powered pricing optimization and revenue management",
    tools: [
      {
        name: "Dynamic Pricing Engine",
        href: "/apps/dynamic-pricing",
        description:
          "AI-powered pricing recommendations based on season, demand, and market conditions",
      },
      {
        name: "Revenue Analytics",
        href: "/apps/revenue-analytics",
        description:
          "Track revenue performance, profit margins, and identify growth opportunities",
      },
      {
        name: "Package Optimizer",
        href: "/apps/package-optimizer",
        description: "Optimize wedding packages for maximum revenue and customer satisfaction",
      },
    ],
  },
  {
    title: "Customer Management",
    icon: Users,
    description: "Manage customer relationships and wedding planning process",
    tools: [
      {
        name: "Wedding CRM",
        href: "/apps/wedding-crm",
        description:
          "Track wedding inquiries, couple profiles, and manage the entire planning process",
      },
      {
        name: "Customer Portal",
        href: "/apps/customer-portal",
        description:
          "Self-service portal for couples to manage their wedding planning and payments",
      },
      {
        name: "Communication Hub",
        href: "/apps/communication-hub",
        description: "Centralized communication with couples, vendors, and team members",
      },
    ],
  },
  {
    title: "Marketing & Promotion",
    icon: Tags,
    description: "Digital marketing tools for wedding venue and floral farm promotion",
    tools: [
      {
        name: "Campaign Link Builder",
        href: "/apps/utm-dashboard",
        description:
          "Create tracking links for wedding venue marketing campaigns and social media",
      },
      {
        name: "Social Media Studio",
        href: "/apps/post-studio",
        description:
          "Create beautiful social media content showcasing weddings and floral arrangements",
      },
      {
        name: "Google Business Posts",
        href: "/apps/gbp-composer",
        description:
          "Generate Google Business Profile posts about venue availability and special offers",
      },
      {
        name: "Marketing Automation",
        href: "/apps/marketing-automation",
        description:
          "Automate email campaigns, social media posting, and lead nurturing sequences",
      },
    ],
  },
  {
    title: "Business Intelligence",
    icon: BarChart3,
    description: "AI-powered analytics and business insights for data-driven decisions",
    tools: [
      {
        name: "Business Intelligence",
        href: "/apps/business-intelligence",
        description:
          "AI-powered analytics and insights for data-driven business decisions",
      },
      {
        name: "Demand Forecasting",
        href: "/apps/demand-forecasting",
        description:
          "Predict wedding booking demand and optimize staffing and inventory planning",
      },
      {
        name: "Competitive Analysis",
        href: "/apps/competitive-analysis",
        description:
          "Monitor competitor pricing and market positioning for strategic advantage",
      },
    ],
  },
  {
    title: "Operations & Logistics",
    icon: Shield,
    description: "Streamline operations and reduce manual work with automation",
    tools: [
      {
        name: "Vendor Management",
        href: "/apps/vendor-management",
        description:
          "Manage preferred vendor relationships and coordinate wedding day logistics",
      },
      {
        name: "Inventory Management",
        href: "/apps/inventory-management",
        description:
          "Track venue supplies, floral inventory, and equipment maintenance schedules",
      },
      {
        name: "Task Automation",
        href: "/apps/task-automation",
        description:
          "Automate routine tasks like follow-ups, reminders, and status updates",
      },
    ],
  },
  {
    title: "Website & SEO",
    icon: FileText,
    description: "Optimize online presence and search engine visibility",
    tools: [
      {
        name: "SEO Optimizer",
        href: "/apps/seo-optimizer",
        description:
          "Optimize website content for wedding venue and floral farm search terms",
      },
      {
        name: "Local SEO Manager",
        href: "/apps/local-seo",
        description:
          "Improve local search rankings for wedding venues in Alberta",
      },
      {
        name: "Review Management",
        href: "/apps/review-management",
        description:
          "Collect and respond to customer reviews to build online reputation",
      },
    ],
  },
];

const quickStartSteps = [
  {
    step: "1",
    title: "Set Up Venue Bookings",
    description:
      "Start with the Venue Booking System to manage wedding bookings, availability, and customer information",
    tool: "Venue Booking System",
    href: "/apps/venue-booking",
  },
  {
    step: "2",
    title: "Configure Dynamic Pricing",
    description:
      "Use the Dynamic Pricing Engine to set AI-powered pricing based on season, demand, and market conditions",
    tool: "Dynamic Pricing Engine",
    href: "/apps/dynamic-pricing",
  },
  {
    step: "3",
    title: "Manage Floral Operations",
    description:
      "Set up the Floral Operations Dashboard to track inventory, crop planning, and custom arrangements",
    tool: "Floral Operations Dashboard",
    href: "/apps/floral-operations",
  },
  {
    step: "4",
    title: "Create Marketing Content",
    description:
      "Use Google Business Posts to create professional content about venue availability and wedding packages",
    tool: "Google Business Posts",
    href: "/apps/gbp-composer",
  },
  {
    step: "5",
    title: "Set Up Customer Management",
    description:
      "Configure the Wedding CRM to track inquiries, manage couple profiles, and streamline the planning process",
    tool: "Wedding CRM",
    href: "/apps/wedding-crm",
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
            alt="Little Bow Meadows"
            width={48}
            height={48}
            className="h-12 w-12"
          />
          <h1 className="text-4xl font-bold tracking-tight belmont-accent-text">
            Little Bow Meadows Digital Platform
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          AI-powered business management platform for{" "}
          <a
            href="https://littlebowmeadows.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium transition-colors"
          >
            Little Bow Meadows
          </a>{" "}
          wedding venue and floral farm in Alberta. Optimize your business operations with intelligent digital tools.
        </p>

        {/* Quick Start Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button
            size="lg"
            className="belmont-accent text-white shadow-lg hover:shadow-xl transition-all duration-200"
            asChild
          >
            <Link href="/apps/onboarding">
              <ArrowRight className="h-5 w-5 mr-2" />
              Get Started
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#tools">
              Browse All Tools
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Start Guide */}
      <OnboardingBanner />
      <Card className="elevated-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Quick Start (3 minutes to first win)
          </CardTitle>
          <CardDescription>
            Get immediate results with these essential first steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-start gap-3 p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
              <Badge
                variant="outline"
                className="mt-1 border-green-200 text-green-700 dark:border-green-800 dark:text-green-300"
              >
                1
              </Badge>
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200">
                  Enable Simple Mode
                </h4>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  Click "Simple Mode" in the header for guided explanations
                  under each tool.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <Badge
                variant="outline"
                className="mt-1 border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300"
              >
                2
              </Badge>
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                  Set Up Venue Bookings
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Use the{" "}
                  <Link
                    href="/apps/venue-booking"
                    className="underline font-medium hover:text-blue-600"
                  >
                    Venue Booking System
                  </Link>{" "}
                  to manage wedding bookings, availability, and customer information.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20">
              <Badge
                variant="outline"
                className="mt-1 border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-300"
              >
                3
              </Badge>
              <div>
                <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                  Configure Dynamic Pricing
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                  Set up the{" "}
                  <Link
                    href="/apps/dynamic-pricing"
                    className="underline font-medium hover:text-purple-600"
                  >
                    Dynamic Pricing Engine
                  </Link>{" "}
                  for AI-powered pricing based on season and demand.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Contact Actions */}
        <div className="flex justify-center gap-4">
        <Button asChild size="sm">
          <a href={LBM_CONSTANTS.PHONE_TEL} className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Call Little Bow Meadows
          </a>
        </Button>
        <Button asChild size="sm">
          <a
            href={LBM_CONSTANTS.BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Book Venue Tour
          </a>
        </Button>
        <Button asChild size="sm">
          <a
            href={LBM_CONSTANTS.MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            Find Us
          </a>
        </Button>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card className="elevated-card text-center group hover:scale-105 transition-transform duration-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Alberta Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Designed specifically for Alberta wedding venues and floral farms
              with local market intelligence and seasonal optimization
            </p>
          </CardContent>
        </Card>

        <Card className="elevated-card text-center group hover:scale-105 transition-transform duration-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Ready to Use
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Everything is set up with Little Bow Meadows' branding, wedding venue,
              floral farm, and AI-powered business optimization tools
            </p>
          </CardContent>
        </Card>

        <Card className="elevated-card text-center group hover:scale-105 transition-transform duration-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              AI-Powered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Advanced AI features for pricing optimization, demand forecasting,
              and automated business intelligence
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Start Guide - 5 Steps to Little Bow Meadows Business Success
          </CardTitle>
          <CardDescription>
            Follow these steps to get started with Little Bow Meadows' AI-powered business platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {quickStartSteps.map((step, index) => (
              <div
                key={step.step}
                className="flex items-start gap-4 p-4 border rounded-lg"
              >
                <div className="flex-shrink-0">
                  <Badge
                    variant="outline"
                    className="h-8 w-8 rounded-full flex items-center justify-center"
                  >
                    {step.step}
                  </Badge>
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {step.description}
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href={step.href}>
                      Open {step.tool}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tool Categories */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Complete Business Management Platform</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            AI-powered tools organized by category for comprehensive wedding venue
            and floral farm business management
          </p>
        </div>

        <div className="grid gap-8">
          {toolCategories.map((category, index) => (
            <Card key={category.title} className={`elevated-card ${
              (category as any).advanced ? "advanced-only" : ""
            }`}>
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
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {category.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="group p-4 border rounded-lg hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-sm leading-tight">
                          {tool.name}
                        </h4>
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Link href={tool.href}>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                        {tool.description}
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Link href={tool.href}>
                          Open Tool
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Belmont-Specific Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Everything Set Up for Little Bow Meadows
          </CardTitle>
          <CardDescription>
            All the settings and information are already configured for
            Little Bow Meadows wedding venue and floral farm with AI-powered optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Business Information</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Business Name: {LBM_CONSTANTS.BUSINESS_NAME}</li>
                <li>• Address: {LBM_CONSTANTS.ADDRESS_STR}</li>
                <li>• Phone: {LBM_CONSTANTS.PHONE_DISPLAY}</li>
                <li>• Website: {LBM_CONSTANTS.WEBSITE_URL.replace("https://", "")}</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Service Offerings</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Wedding Venue Rental</li>
                <li>• Custom Floral Arrangements</li>
                <li>• Event Planning Services</li>
                <li>• Venue Tours & Consultations</li>
                <li>• Floral Farm Products</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Popular Search Terms</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• "wedding venue alberta"</li>
                <li>• "floral farm alberta"</li>
                <li>• "rustic wedding venue"</li>
                <li>• "wedding flowers alberta"</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Marketing Campaigns</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Spring wedding season promotions</li>
                <li>• Summer peak season pricing</li>
                <li>• Fall harvest wedding themes</li>
                <li>• Winter wonderland packages</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>