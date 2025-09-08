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
  Image as ImageIcon,
  Calendar,
  Users,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Palette,
  Heart,
  Eye,
  Camera,
} from "lucide-react";
import { LBM_CONSTANTS } from "@/lib/constants";

const exhibitions = [
  {
    title: "Prairie Dreams",
    artist: "Sarah Mitchell",
    description: "Contemporary interpretations of Alberta's vast landscapes",
    startDate: "April 1, 2024",
    endDate: "May 15, 2024",
    pieces: 12,
    medium: "Oil on Canvas",
    status: "current",
  },
  {
    title: "Urban Abstracts",
    artist: "David Chen",
    description: "Abstract expressions of city life and human connection",
    startDate: "May 20, 2024",
    endDate: "June 30, 2024",
    pieces: 8,
    medium: "Acrylic & Mixed Media",
    status: "upcoming",
  },
  {
    title: "Healing Through Art",
    artist: "Emma Rodriguez",
    description: "Art therapy works exploring themes of growth and renewal",
    startDate: "July 5, 2024",
    endDate: "August 20, 2024",
    pieces: 15,
    medium: "Watercolor & Digital",
    status: "upcoming",
  },
];

const galleryFeatures = [
  {
    icon: Eye,
    title: "Rotating Exhibitions",
    description: "Fresh artwork and new perspectives every 6-8 weeks",
  },
  {
    icon: Users,
    title: "Local Artists",
    description: "Showcasing the best of Calgary's creative community",
  },
  {
    icon: Heart,
    title: "Art for Sale",
    description: "Purchase original works directly from featured artists",
  },
  {
    icon: Calendar,
    title: "Opening Events",
    description: "Meet the artists at our exhibition opening receptions",
  },
];

const featuredArtists = [
  {
    name: "Sarah Mitchell",
    specialty: "Landscape Painting",
    description: "Captures the essence of Alberta's prairies with bold colors and dynamic brushwork",
    exhibitions: 3,
    yearsActive: 8,
  },
  {
    name: "David Chen",
    specialty: "Abstract Art",
    description: "Explores urban themes through abstract expressionism and mixed media",
    exhibitions: 2,
    yearsActive: 5,
  },
  {
    name: "Emma Rodriguez",
    specialty: "Art Therapy",
    description: "Licensed art therapist creating healing-focused artwork and leading therapeutic workshops",
    exhibitions: 4,
    yearsActive: 12,
  },
];

export default function GalleryPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary" className="text-sm">
            Contemporary Art Gallery
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Prairie Artistry Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover exceptional artwork from Calgary's most talented artists.
            Our rotating exhibitions showcase diverse perspectives, from prairie landscapes
            to urban abstracts, in an intimate gallery setting.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button size="lg" className="belmont-accent text-white">
            <Calendar className="h-5 w-5 mr-2" />
            Schedule Gallery Visit
          </Button>
          <Button variant="outline" size="lg">
            <Eye className="h-5 w-5 mr-2" />
            Current Exhibition
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {galleryFeatures.map((feature, index) => (
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

      {/* Current & Upcoming Exhibitions */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Exhibitions</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Explore our carefully curated exhibitions featuring works by local Calgary artists
            and emerging talents from across Alberta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exhibitions.map((exhibition, index) => (
            <Card key={index} className="relative group hover:scale-105 transition-transform duration-200">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={exhibition.status === "current" ? "default" : "secondary"}>
                    {exhibition.status === "current" ? "Now Showing" : "Coming Soon"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{exhibition.pieces} pieces</span>
                </div>
                <CardTitle className="text-xl">{exhibition.title}</CardTitle>
                <CardDescription>by {exhibition.artist}</CardDescription>
                <p className="text-sm text-muted-foreground mt-2">{exhibition.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{exhibition.startDate} - {exhibition.endDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Palette className="h-4 w-4" />
                    <span>{exhibition.medium}</span>
                  </div>
                </div>
                <Button className="w-full" variant={exhibition.status === "current" ? "default" : "outline"}>
                  {exhibition.status === "current" ? "Visit Exhibition" : "Learn More"}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Artists */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Featured Artists
          </CardTitle>
          <CardDescription>
            Meet the talented artists who make our gallery special
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArtists.map((artist, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Palette className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{artist.name}</h4>
                  <p className="text-sm text-primary">{artist.specialty}</p>
                  <p className="text-sm text-muted-foreground mt-2">{artist.description}</p>
                </div>
                <div className="flex justify-center gap-4 text-xs text-muted-foreground">
                  <span>{artist.exhibitions} exhibitions</span>
                  <span>{artist.yearsActive} years active</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gallery Hours & Visits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gallery Hours</CardTitle>
            <CardDescription>Visit us during these times</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Tuesday - Friday</span>
              <span>10 AM - 6 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Saturday</span>
              <span>10 AM - 4 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Sunday</span>
              <span>12 PM - 4 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Monday</span>
              <span>Closed</span>
            </div>
            <Separator />
            <p className="text-xs text-muted-foreground">
              Private viewings available by appointment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan Your Visit</CardTitle>
            <CardDescription>Make the most of your gallery experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Free admission</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Wheelchair accessible</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Photography allowed</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Artist meet & greets</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Artwork purchase options</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact CTA */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4">Experience Calgary's Creative Heart</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Visit our gallery and immerse yourself in the vibrant world of prairie artistry.
            Discover new perspectives and find the perfect piece for your collection.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="belmont-accent text-white">
              <Eye className="h-5 w-5 mr-2" />
              Visit Gallery
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="h-5 w-5 mr-2" />
              Contact Curator
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}