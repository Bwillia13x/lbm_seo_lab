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
  Flower,
  Users,
  Calendar,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Heart,
  Gift,
  Palette,
  Scissors,
} from "lucide-react";
import { LBM_CONSTANTS } from "@/lib/constants";

const workshops = [
  {
    title: "Bridal Bouquet Workshop",
    description: "Create your perfect wedding bouquet with seasonal flowers",
    duration: "3 hours",
    price: "$85",
    maxParticipants: 8,
    includes: [
      "All materials and flowers",
      "Professional instruction",
      "Bridal bouquet to take home",
      "Light refreshments",
      "Flower care guide",
    ],
    schedule: "Saturdays 10 AM - 1 PM",
    popular: true,
  },
  {
    title: "Seasonal Arrangements",
    description: "Learn to create beautiful arrangements with current blooms",
    duration: "2 hours",
    price: "$65",
    maxParticipants: 12,
    includes: [
      "Seasonal flowers and greenery",
      "Professional techniques",
      "Arrangement to take home",
      "Design principles",
      "Flower care tips",
    ],
    schedule: "Wednesdays & Sundays 2 PM - 4 PM",
    popular: false,
  },
  {
    title: "Wedding Table Centerpieces",
    description: "Design stunning centerpieces for your wedding reception",
    duration: "2.5 hours",
    price: "$75",
    maxParticipants: 10,
    includes: [
      "Materials for centerpiece",
      "Professional guidance",
      "Centerpiece to take home",
      "Styling consultation",
      "Reception planning tips",
    ],
    schedule: "Fridays 6 PM - 8:30 PM",
    popular: false,
  },
  {
    title: "Kids Flower Craft",
    description: "Fun, creative floral activities for children",
    duration: "1.5 hours",
    price: "$35",
    maxParticipants: 15,
    includes: [
      "Child-friendly materials",
      "Simple arrangements",
      "Craft to take home",
      "Supervision provided",
      "Photo opportunities",
    ],
    schedule: "Saturdays 2 PM - 3:30 PM",
    popular: false,
  },
];

const workshopFeatures = [
  {
    icon: Users,
    title: "Small Groups",
    description: "Intimate class sizes ensure personalized attention",
  },
  {
    icon: Flower,
    title: "Fresh Flowers",
    description: "Work with the freshest seasonal blooms from our farm",
  },
  {
    icon: Palette,
    title: "Creative Freedom",
    description: "Express your style with guidance from our florists",
  },
  {
    icon: Gift,
    title: "Take Home Creations",
    description: "Leave with beautiful arrangements for your home",
  },
];

const upcomingWorkshops = [
  {
    title: "Spring Bridal Workshop",
    date: "April 15, 2024",
    time: "10 AM - 1 PM",
    spots: "3 spots left",
    type: "Bridal Bouquet",
  },
  {
    title: "Tulip Arrangement Class",
    date: "April 17, 2024",
    time: "2 PM - 4 PM",
    spots: "5 spots left",
    type: "Seasonal Arrangements",
  },
  {
    title: "Easter Flower Crafts",
    date: "April 20, 2024",
    time: "2 PM - 3:30 PM",
    spots: "8 spots left",
    type: "Kids Craft",
  },
];

export default function WorkshopsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary" className="text-sm">
            Floral Design Workshops
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Learn the Art of Floral Design
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join our hands-on workshops and learn to create stunning floral arrangements
            with fresh, locally grown flowers. From bridal bouquets to seasonal centerpieces,
            discover your creative potential.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button size="lg" className="belmont-accent text-white">
            <Calendar className="h-5 w-5 mr-2" />
            Book a Workshop
          </Button>
          <Button variant="outline" size="lg">
            <Users className="h-5 w-5 mr-2" />
            View Upcoming Classes
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workshopFeatures.map((feature, index) => (
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

      {/* Workshop Offerings */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Workshop Offerings</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Choose from our selection of floral design workshops, each designed to
            teach specific techniques and create beautiful arrangements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workshops.map((workshop, index) => (
            <Card key={index} className="relative group hover:scale-105 transition-transform duration-200">
              {workshop.popular && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-orange-500 hover:bg-orange-600">Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{workshop.title}</CardTitle>
                <CardDescription>{workshop.description}</CardDescription>
                <div className="flex items-center justify-between mt-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {workshop.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      Up to {workshop.maxParticipants} people
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{workshop.price}</div>
                    <div className="text-xs text-muted-foreground">per person</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Includes:</p>
                  <ul className="space-y-1">
                    {workshop.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {workshop.schedule}
                </div>
                <Button className="w-full">
                  Book This Workshop
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Workshops */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Workshops
          </CardTitle>
          <CardDescription>
            Reserve your spot in our next floral design sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingWorkshops.map((workshop, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-semibold">{workshop.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {workshop.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {workshop.time}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {workshop.type}
                  </Badge>
                </div>
                <div className="text-right space-y-2">
                  <div className="text-sm text-muted-foreground">{workshop.spots}</div>
                  <Button size="sm">
                    Reserve Spot
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline">
              View Full Schedule
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Workshop Packages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Workshop Packages
          </CardTitle>
          <CardDescription>
            Save when you book multiple workshops or bring friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg">
              <h4 className="font-semibold mb-2">Bring a Friend</h4>
              <p className="text-2xl font-bold text-primary mb-2">$15 off</p>
              <p className="text-sm text-muted-foreground">
                Save $15 per person when you both register for the same workshop
              </p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <h4 className="font-semibold mb-2">Workshop Series</h4>
              <p className="text-2xl font-bold text-primary mb-2">20% off</p>
              <p className="text-sm text-muted-foreground">
                Save 20% when you register for 3 or more workshops
              </p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <h4 className="font-semibold mb-2">Bridal Package</h4>
              <p className="text-2xl font-bold text-primary mb-2">$25 off</p>
              <p className="text-sm text-muted-foreground">
                Special discount for bridal party workshop bookings
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What to Expect */}
      <Card>
        <CardHeader>
          <CardTitle>What to Expect</CardTitle>
          <CardDescription>
            Your floral design workshop experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-semibold">Welcome & Introduction</h4>
                  <p className="text-sm text-muted-foreground">
                    Meet your instructor and learn about the flowers you'll be working with
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-semibold">Design Principles</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn fundamental floral design techniques and composition
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-semibold">Hands-On Creation</h4>
                  <p className="text-sm text-muted-foreground">
                    Create your arrangement with guidance from our expert florists
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">4</span>
                </div>
                <div>
                  <h4 className="font-semibold">Take Home & Care</h4>
                  <p className="text-sm text-muted-foreground">
                    Leave with your creation and learn how to care for your flowers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Create Floral Magic?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our community of floral enthusiasts and learn to create beautiful
            arrangements with fresh, locally grown flowers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="belmont-accent text-white">
              <Flower className="h-5 w-5 mr-2" />
              Browse Workshops
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
