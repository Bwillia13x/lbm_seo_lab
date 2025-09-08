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
  Palette,
  Users,
  Calendar,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Brush,
  Heart,
  Gift,
  Camera,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import { LBM_CONSTANTS } from "@/lib/constants";

const commissionTypes = [
  {
    name: "Portrait Commission",
    description: "Custom portraits in your preferred style and medium",
    startingPrice: "$300",
    timeline: "2-4 weeks",
    includes: [
      "Initial consultation",
      "Sketch approval process",
      "Professional-grade materials",
      "Framing options available",
      "Progress updates",
    ],
    popular: true,
  },
  {
    name: "Landscape Commission",
    description: "Prairie landscapes and scenic Alberta views",
    startingPrice: "$250",
    timeline: "3-5 weeks",
    includes: [
      "Site visit or photo reference",
      "Color palette consultation",
      "Multiple size options",
      "Weather protection coating",
      "Installation guidance",
    ],
    popular: false,
  },
  {
    name: "Abstract Commission",
    description: "Custom abstract pieces for homes and offices",
    startingPrice: "$200",
    timeline: "2-3 weeks",
    includes: [
      "Color and mood consultation",
      "Size and format options",
      "Multiple concept sketches",
      "Professional finishing",
      "Care instructions",
    ],
    popular: false,
  },
  {
    name: "Corporate Art",
    description: "Large-scale pieces for business spaces",
    startingPrice: "$500",
    timeline: "4-6 weeks",
    includes: [
      "Space assessment visit",
      "Brand color integration",
      "Professional installation",
      "Maintenance guidance",
      "Certificate of authenticity",
    ],
    popular: false,
  },
];

const commissionProcess = [
  {
    step: "1",
    title: "Initial Consultation",
    description: "Discuss your vision, space, and preferences",
    duration: "30-60 minutes",
  },
  {
    step: "2",
    title: "Concept Development",
    description: "Create sketches and color studies for approval",
    duration: "3-5 days",
  },
  {
    step: "3",
    title: "Creation Process",
    description: "Artwork creation with regular progress updates",
    duration: "2-6 weeks",
  },
  {
    step: "4",
    title: "Final Review",
    description: "Final approval and any minor adjustments",
    duration: "1-2 days",
  },
  {
    step: "5",
    title: "Delivery",
    description: "Professional packaging and delivery or pickup",
    duration: "Same day",
  },
];

const portfolioCategories = [
  {
    category: "Portraits",
    count: 24,
    description: "Realistic and stylized portrait commissions",
  },
  {
    category: "Landscapes",
    count: 18,
    description: "Alberta prairies and mountain scenes",
  },
  {
    category: "Abstract",
    count: 15,
    description: "Contemporary abstract works for modern spaces",
  },
  {
    category: "Corporate",
    count: 8,
    description: "Large-scale pieces for business environments",
  },
];

export default function CommissionsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary" className="text-sm">
            Custom Artwork Commissions
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Bring Your Vision to Life
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Commission a unique piece of artwork created specifically for you.
            From portraits to landscapes to abstract expressions, our talented artists
            will transform your ideas into beautiful, lasting art.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button size="lg" className="belmont-accent text-white">
            <MessageSquare className="h-5 w-5 mr-2" />
            Start Commission Inquiry
          </Button>
          <Button variant="outline" size="lg">
            <Eye className="h-5 w-5 mr-2" />
            View Portfolio
          </Button>
        </div>
      </div>

      {/* Commission Types */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Commission Types</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Choose from our range of commission options, each tailored to create
            the perfect artwork for your space and vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {commissionTypes.map((commission, index) => (
            <Card key={index} className="relative group hover:scale-105 transition-transform duration-200">
              {commission.popular && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-orange-500 hover:bg-orange-600">Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{commission.name}</CardTitle>
                <CardDescription>{commission.description}</CardDescription>
                <div className="flex items-center justify-between mt-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {commission.timeline}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{commission.startingPrice}</div>
                    <div className="text-xs text-muted-foreground">starting price</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Includes:</p>
                  <ul className="space-y-1">
                    {commission.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full">
                  Request Quote
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Commission Process */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brush className="h-5 w-5" />
            Commission Process
          </CardTitle>
          <CardDescription>
            How we bring your custom artwork to life
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {commissionProcess.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{step.step}</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {step.duration}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Portfolio Categories
          </CardTitle>
          <CardDescription>
            Explore our range of commission styles and subjects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioCategories.map((category, index) => (
              <div key={index} className="text-center p-4 border rounded-lg hover:border-primary/50 transition-colors">
                <div className="text-2xl font-bold text-primary mb-1">{category.count}</div>
                <h4 className="font-semibold mb-2">{category.category}</h4>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline">
              View Full Portfolio
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Commission Pricing
          </CardTitle>
          <CardDescription>
            Transparent pricing for custom artwork
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Pricing Factors</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Size and complexity of artwork</li>
                <li>• Medium and materials required</li>
                <li>• Timeline and urgency</li>
                <li>• Number of subjects or elements</li>
                <li>• Framing and finishing options</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Payment Terms</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 50% deposit to begin work</li>
                <li>• 50% balance upon completion</li>
                <li>• Payment plans available for larger pieces</li>
                <li>• All major payment methods accepted</li>
                <li>• Satisfaction guarantee</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Commission Your Artwork?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's discuss your vision and create something truly unique together.
            Contact us for a free consultation and quote.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="belmont-accent text-white">
              <MessageSquare className="h-5 w-5 mr-2" />
              Start Commission
            </Button>
            <Button variant="outline" size="lg">
              <Phone className="h-5 w-5 mr-2" />
              Call for Consultation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}