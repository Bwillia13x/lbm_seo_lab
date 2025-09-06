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
  Calendar,
  MapPin,
  Users,
  Flower,
  Camera,
  Music,
  Utensils,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import { LBM_CONSTANTS } from "@/lib/constants";

const weddingPackages = [
  {
    name: "Ceremony Only",
    price: "From $2,500",
    description: "Intimate outdoor ceremony with natural prairie backdrop",
    features: [
      "Outdoor ceremony space on Little Bow River",
      "Natural floral arch and aisle decorations",
      "Sound system and ceremony coordination",
      "Up to 50 guests",
      "2-hour venue access",
    ],
  },
  {
    name: "Full Day Wedding",
    price: "From $4,500",
    description: "Complete wedding experience with ceremony and reception",
    features: [
      "Everything in Ceremony Only package",
      "Reception space with river views",
      "Tables, chairs, and basic linens",
      "Access to farm kitchen and restrooms",
      "6-hour venue access",
      "Bride & groom preparation area",
    ],
  },
  {
    name: "Micro Wedding",
    price: "From $1,800",
    description: "Perfect for intimate gatherings of up to 25 guests",
    features: [
      "Cozy outdoor ceremony space",
      "Simple floral arrangements",
      "Sound system included",
      "1.5-hour venue access",
      "Perfect for elopements or small celebrations",
    ],
  },
];

const weddingFeatures = [
  {
    icon: MapPin,
    title: "Riverside Location",
    description: "Stunning outdoor venue on the Little Bow River with golden hour photo opportunities",
  },
  {
    icon: Flower,
    title: "Seasonal Flowers",
    description: "Fresh prairie wildflowers and farm-grown blooms for your special day",
  },
  {
    icon: Camera,
    title: "Photo Ready",
    description: "Multiple scenic locations perfect for wedding photography",
  },
  {
    icon: Users,
    title: "Flexible Capacity",
    description: "Accommodates intimate ceremonies to larger celebrations",
  },
];

const faqs = [
  {
    question: "What is included in the base wedding package?",
    answer: "Our base package includes the outdoor ceremony space, natural floral decorations, sound system, and basic coordination for up to 2 hours.",
  },
  {
    question: "Do you provide catering or recommend caterers?",
    answer: "We don't provide catering directly but have partnerships with local caterers who understand our venue and can work with your vision.",
  },
  {
    question: "What is the weather backup plan?",
    answer: "We have indoor spaces available as weather backup. Our team monitors forecasts and can help coordinate contingency plans.",
  },
  {
    question: "Are there accommodation options nearby?",
    answer: "Yes! Our A-frame Airbnb is perfect for bridal parties, and there are several hotels and B&Bs in nearby High River and Okotoks.",
  },
  {
    question: "Do you allow outside vendors?",
    answer: "We work with preferred vendors but are happy to accommodate your chosen photographer, caterer, or other wedding professionals.",
  },
];

export default function WeddingsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary" className="text-sm">
            Outdoor Prairie Wedding Venue
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Weddings on the Little Bow River
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Create unforgettable memories in our stunning outdoor venue, surrounded by
            Alberta's natural beauty and fresh prairie wildflowers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button size="lg" className="belmont-accent text-white">
            <Calendar className="h-5 w-5 mr-2" />
            Request a Tour
          </Button>
          <Button variant="outline" size="lg">
            <Phone className="h-5 w-5 mr-2" />
            Call for Availability
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {weddingFeatures.map((feature, index) => (
          <Card key={index} className="text-center group hover:scale-105 transition-transform duration-200">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Wedding Packages */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Wedding Packages</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Choose the perfect package for your celebration, from intimate ceremonies
            to full-day weddings with reception.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weddingPackages.map((pkg, index) => (
            <Card key={index} className="relative group hover:scale-105 transition-transform duration-200">
              <CardHeader>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription className="text-lg font-semibold text-primary">
                  {pkg.price}
                </CardDescription>
                <p className="text-sm text-muted-foreground">{pkg.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={index === 1 ? "default" : "outline"}>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Gallery Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Wedding Gallery
          </CardTitle>
          <CardDescription>
            See the magic of Little Bow Meadows weddings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Placeholder for wedding photos - would be actual images */}
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <Camera className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <Flower className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <Star className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline">
              View Full Gallery
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Partners */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Preferred Vendors
          </CardTitle>
          <CardDescription>
            Trusted partners who make your wedding day perfect
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">Photographers</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Utensils className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">Caterers</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Music className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">Musicians</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Flower className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">Florists</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Everything you need to know about weddings at Little Bow Meadows
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-semibold">{faq.question}</h4>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
              {index < faqs.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Plan Your Prairie Wedding?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Take the first step towards your dream wedding. We'll show you why couples
            choose Little Bow Meadows for their special day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="belmont-accent text-white">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule a Tour
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="h-5 w-5 mr-2" />
              Get Wedding Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
