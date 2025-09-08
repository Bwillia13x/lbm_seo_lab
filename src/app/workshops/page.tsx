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
  Scissors,
} from "lucide-react";
import { LBM_CONSTANTS } from "@/lib/constants";

const workshops = [
  {
    title: "Prairie Landscape Painting",
    description: "Capture the beauty of Alberta's golden fields and endless skies",
    duration: "3 hours",
    price: "$85",
    maxParticipants: 8,
    includes: [
      "All painting materials and canvas",
      "Professional instruction",
      "Finished landscape painting to take home",
      "Light refreshments",
      "Technique guide",
    ],
    schedule: "Saturdays 10 AM - 1 PM",
    popular: true,
  },
  {
    title: "Abstract Expression Workshop",
    description: "Explore color, texture, and emotion through abstract painting",
    duration: "2.5 hours",
    price: "$75",
    maxParticipants: 10,
    includes: [
      "Acrylic paints and brushes",
      "Large canvas for expression",
      "Abstract artwork to take home",
      "Color theory guidance",
      "Creative process exploration",
    ],
    schedule: "Wednesdays & Sundays 2 PM - 4:30 PM",
    popular: false,
  },
  {
    title: "Art Therapy Session",
    description: "Healing and self-discovery through guided creative expression",
    duration: "1.5 hours",
    price: "$120",
    maxParticipants: 6,
    includes: [
      "All art materials provided",
      "Licensed art therapist guidance",
      "Safe, supportive environment",
      "Personal artwork creation",
      "Reflection and processing time",
    ],
    schedule: "Tuesdays & Thursdays 6 PM - 7:30 PM",
    popular: false,
  },
  {
    title: "Family Art Day",
    description: "Creative fun for all ages with prairie-themed projects",
    duration: "2 hours",
    price: "$45",
    maxParticipants: 12,
    includes: [
      "Family-friendly materials",
      "Age-appropriate projects",
      "Art pieces to take home",
      "Instruction for all skill levels",
      "Photo opportunities",
    ],
    schedule: "Saturdays 2 PM - 4 PM",
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
    icon: Palette,
    title: "Quality Materials",
    description: "Work with professional-grade art supplies and tools",
  },
  {
    icon: Brush,
    title: "Expert Instruction",
    description: "Learn from experienced artists and certified instructors",
  },
  {
    icon: Gift,
    title: "Take Home Creations",
    description: "Leave with beautiful artwork you've created yourself",
  },
];

const upcomingWorkshops = [
  {
    title: "Spring Prairie Colors",
    date: "April 15, 2024",
    time: "10 AM - 1 PM",
    spots: "3 spots left",
    type: "Landscape Painting",
  },
  {
    title: "Abstract Emotions",
    date: "April 17, 2024",
    time: "2 PM - 4:30 PM",
    spots: "5 spots left",
    type: "Abstract Expression",
  },
  {
    title: "Family Creative Time",
    date: "April 20, 2024",
    time: "2 PM - 4 PM",
    spots: "8 spots left",
    type: "Family Art",
  },
];

export default function WorkshopsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary" className="text-sm">
            Creative Art Workshops
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Discover Your Creative Voice
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join our hands-on art workshops and explore your creativity in a supportive,
            inspiring environment. From landscape painting to abstract expression,
            discover new techniques and create beautiful artwork.
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
            Choose from our selection of art workshops, each designed to
            teach specific techniques and inspire creative expression.
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
            Reserve your spot in our next creative sessions
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
              <h4 className="font-semibold mb-2">Corporate Package</h4>
              <p className="text-2xl font-bold text-primary mb-2">$50 off</p>
              <p className="text-sm text-muted-foreground">
                Special discount for corporate team building workshops
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
            Your creative workshop experience
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
                  <h4 className="font-semibold">Welcome & Setup</h4>
                  <p className="text-sm text-muted-foreground">
                    Meet your instructor and get familiar with materials and techniques
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-semibold">Skill Building</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn fundamental techniques and artistic principles
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
                  <h4 className="font-semibold">Creative Expression</h4>
                  <p className="text-sm text-muted-foreground">
                    Create your artwork with guidance and encouragement
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">4</span>
                </div>
                <div>
                  <h4 className="font-semibold">Share & Celebrate</h4>
                  <p className="text-sm text-muted-foreground">
                    Share your creation and celebrate your artistic journey
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
          <h3 className="text-2xl font-bold mb-4">Ready to Create Something Beautiful?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our community of artists and discover your creative potential
            in our welcoming Calgary studio space.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="belmont-accent text-white">
              <Palette className="h-5 w-5 mr-2" />
              Browse Workshops
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="h-5 w-5 mr-2" />
              Contact Studio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}