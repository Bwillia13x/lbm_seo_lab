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
} from "lucide-react";
import { OnboardingBanner } from "@/components/ui/onboarding-banner";
import { LBM_CONSTANTS } from "@/lib/constants";

const toolCategories = [
  {
    title: "Marketing & Tracking",
    icon: Tags,
    description:
      "Create tracking links and QR codes for Little Bow Meadows marketing campaigns",
    tools: [
      {
        name: "Campaign Link Builder",
        href: "/apps/utm-dashboard",
        description:
          "Create special links that track where your customers come from when they book tours or make purchases",
      },
      {
        name: "QR Code Maker",
        href: "/apps/utm-qr",
        description:
          "Generate square barcode images for easy scanning on phones at farm events and pop-ups",
      },
      {
        name: "Referral Program QR",
        href: "/apps/referral-qr",
        description: "Create QR codes for vendor and photographer referral rewards",
      },
    ],
  },
  {
    title: "Content Creation",
    icon: ImageIcon,
    description: "Create posts for social media and Google Business Profile around bloom cycles and wedding seasonality",
    tools: [
      {
        name: "Google Business Posts",
        href: "/apps/gbp-composer",
        description:
          "Write professional posts for your Google Business Profile about weddings, flowers, and farm stays",
      },
      {
        name: "Social Media Studio",
        href: "/apps/post-studio",
        description:
          "Create content for Facebook, Instagram, and other social platforms showcasing seasonal blooms and wedding magic",
      },
      {
        name: "Content Calendar",
        href: "/apps/post-oracle",
        description: "Plan and schedule your weekly social media posts around prairie seasons and wedding peaks",
      },
    ],
  },
  {
    title: "Customer Reviews",
    icon: MessageSquare,
    description: "Collect and manage customer reviews from couples, flower buyers, and guests",
    tools: [
      {
        name: "Review Request Links",
        href: "/apps/review-link",
        description:
          "Create links to ask wedding couples, flower customers, and Airbnb guests for reviews",
      },
      {
        name: "Review Response Writer",
        href: "/apps/review-composer",
        description: "Write professional responses to reviews about weddings, bouquets, and farm stays",
      },
    ],
  },
  {
    title: "Search Performance",
    icon: BarChart3,
    description: "Check how well Little Bow Meadows appears in Google searches for wedding venues and flower farms",
    tools: [
      {
        name: "Search Results Analyzer",
        href: "/apps/gsc-ctr-miner",
        description:
          "See how customers find Little Bow Meadows online and improve your search rankings for prairie weddings",
      },
      {
        name: "Local Search Rankings",
        href: "/apps/rank-grid",
        description:
          "Monitor where Little Bow Meadows appears when people search for Southern Alberta wedding venues",
      },
      {
        name: "Ranking Tracker",
        href: "/apps/rankgrid-watcher",
        description:
          "Get automatic updates on Little Bow Meadows' search position changes",
      },
    ],
  },
  {
    title: "Local Partnerships",
    icon: Link2,
    description: "Find and connect with Southern Alberta wedding vendors and local businesses",
    tools: [
      {
        name: "Partner Finder",
        href: "/apps/link-prospect-kit",
        description:
          "Discover Southern Alberta wedding vendors, photographers, and caterers for partnerships",
      },
      {
        name: "Neighborhood Content Analyzer",
        href: "/apps/neighbor-signal",
        description: "See what content works best for prairie wedding and flower customers",
      },
      {
        name: "Partnership Map",
        href: "/apps/link-map",
        description: "Visual map showing Little Bow Meadows' wedding vendor connections",
      },
    ],
  },
  {
    title: "Business Insights",
    icon: TrendingUp,
    description: "Understand seasonal patterns and predict wedding peaks and bloom cycles",
    advanced: true,
    tools: [
      {
        name: "Seasonal Traffic Predictor",
        href: "/apps/queuetime",
        description:
          "Predict when Little Bow Meadows will be busiest with weddings and flower sales",
      },
      {
        name: "Service Revenue Optimizer",
        href: "/apps/slot-yield",
        description:
          "See which offerings make the most money and optimize seasonal pricing",
      },
      {
        name: "Customer Behavior Tracker",
        href: "/apps/rfm-crm",
        description:
          "Learn which wedding couples and flower customers are your best and how to keep them happy",
      },
    ],
  },
  {
    title: "Booking Protection",
    icon: Shield,
    description: "Reduce no-shows for tours, workshops, and bookings",
    advanced: true,
    tools: [
      {
        name: "No-Show Predictor",
        href: "/apps/noshow-shield",
        description:
          "Identify wedding couples and workshop participants who might not show up and send reminders",
      },
      {
        name: "Service Recommender",
        href: "/apps/addon-recommender",
        description:
          "Suggest add-on services like floral consultation or photography sessions",
      },
    ],
  },
  {
    title: "Website Optimization",
    icon: FileText,
    description: "Make Little Bow Meadows' website work better for search engines",
    tools: [
      {
        name: "Page Title Tester",
        href: "/apps/meta-planner",
        description:
          "Test different page titles and descriptions for weddings, flowers, and stays",
      },
      {
        name: "Website Improvement Guide",
        href: "/apps/seo-brief",
        description:
          "Get step-by-step instructions to improve Little Bow Meadows' website",
      },
      {
        name: "Business Info Checker",
        href: "/apps/citation-tracker",
        description:
          "Make sure Little Bow Meadows' address and phone number are correct everywhere online",
      },
    ],
  },
];

const quickStartSteps = [
  {
    step: "1",
    title: "Create Tracking Links",
    description:
      "Start with the Campaign Link Builder to create special links that track where your wedding and flower customers come from",
    tool: "Campaign Link Builder",
    href: "/apps/utm-dashboard",
  },
  {
    step: "2",
    title: "Set Up Review Collection",
    description:
      "Use the Review Request Links to create easy ways for couples, flower buyers, and guests to leave reviews",
    tool: "Review Request Links",
    href: "/apps/review-link",
  },
  {
    step: "3",
    title: "Generate Content",
    description:
      "Use Google Business Posts to create professional content about prairie weddings and seasonal blooms",
    tool: "Google Business Posts",
    href: "/apps/gbp-composer",
  },
  {
    step: "4",
    title: "Check Search Performance",
    description:
      "Use the Search Results Analyzer to see how customers find Little Bow Meadows online",
    tool: "Search Results Analyzer",
    href: "/apps/gsc-ctr-miner",
  },
  {
    step: "5",
    title: "Find Local Partners",
    description:
      "Use the Partner Finder to discover Southern Alberta wedding vendors and photographers",
    tool: "Partner Finder",
    href: "/apps/link-prospect-kit",
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
          Professional online marketing toolkit for{" "}
          <a
            href="https://littlebowmeadows.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium transition-colors"
          >
            Little Bow Meadows
          </a>{" "}
          wedding venue, floral farm, and Airbnb stay on the Little Bow River. Streamline your prairie marketing with
          easy-to-use tools.
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
                  Create Tracking Links
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Use the{" "}
                  <Link
                    href="/apps/utm-dashboard"
                    className="underline font-medium hover:text-blue-600"
                  >
                    Campaign Link Builder
                  </Link>{" "}
                  to create special links that track wedding and flower customer sources.
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
                  Get Customer Reviews
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                  Generate{" "}
                  <Link
                    href="/apps/review-link"
                    className="underline font-medium hover:text-purple-600"
                  >
                    review request links
                  </Link>{" "}
                  and send them to recent wedding couples and flower customers.
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
            Book Tour
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
              Prairie Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Designed specifically for Southern Alberta with prairie wedding
              marketing and local vendor connections in High River and Calgary
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
              floral farm, and Airbnb services with professional templates
            </p>
          </CardContent>
        </Card>

        <Card className="elevated-card text-center group hover:scale-105 transition-transform duration-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              Private & Secure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All work happens on your computer - no data is sent to external
              servers for maximum privacy
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Start Guide - 5 Steps to Little Bow Meadows Marketing Success
          </CardTitle>
          <CardDescription>
            Follow these steps to get started with Little Bow Meadows' marketing toolkit
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
          <h2 className="text-3xl font-bold">Complete Marketing Toolkit</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            22 Easy-to-use tools organized by category for comprehensive local
            marketing management
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
            Little Bow Meadows wedding venue and floral farm
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
                <li>• Outdoor Prairie Wedding Venue</li>
                <li>• Seasonal Cut Flower Farm</li>
                <li>• Floral Workshops & Events</li>
                <li>• A-Frame Riverfront Stay</li>
                <li>• Custom Bridal Bouquets</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Popular Search Terms</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• "southern alberta wedding venues"</li>
                <li>• "prairie wildflower bouquets"</li>
                <li>• "little bow river wedding"</li>
                <li>• "high river floral farm"</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Marketing Campaigns</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Seasonal bloom promotions</li>
                <li>• Wedding vendor partnerships</li>
                <li>• Airbnb stay packages</li>
                <li>• Workshop early bird deals</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Workflow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Daily Little Bow Meadows Marketing Routine
          </CardTitle>
          <CardDescription>
            Recommended daily schedule for the best prairie marketing results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Morning (9-11 AM)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check Search Results Analyzer for wedding venue performance</li>
                <li>• Review seasonal bloom calendar and ranking updates</li>
                <li>• Plan daily content around current flower availability</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Afternoon (1-4 PM)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Create tracking links for wedding inquiries and flower sales</li>
                <li>• Write Google Business Profile posts about seasonal blooms</li>
                <li>• Send review requests to recent couples and flower customers</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Evening (4-6 PM)</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Connect with Southern Alberta wedding vendors</li>
                <li>• Study seasonal booking patterns and flower demand</li>
                <li>• Plan next day's marketing around bloom cycles</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Information */}
      <div className="text-center space-y-4">
        <Separator />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Need Help?</h3>
          <p className="text-muted-foreground">
            Contact Little Bow Meadows for help or questions about using the
            prairie marketing toolkit.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <a href={LBM_CONSTANTS.PHONE_TEL}>
                <Phone className="h-4 w-4 mr-2" />
                Call Support
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="mailto:info@littlebowmeadows.ca">Message Support</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
