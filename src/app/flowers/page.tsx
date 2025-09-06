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
  Truck,
  Calendar,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Leaf,
  Heart,
  Gift,
  ShoppingCart,
} from "lucide-react";
import { LBM_CONSTANTS } from "@/lib/constants";

const seasonalBouquets = [
  {
    season: "Spring",
    name: "Wildflower Awakening",
    description: "Delicate spring blooms in soft pastels",
    flowers: ["Tulips", "Daffodils", "Hyacinths", "Prairie Crocus"],
    price: "$65",
    available: "April - May",
  },
  {
    season: "Summer",
    name: "Prairie Sunset",
    description: "Vibrant summer colors with wildflowers",
    flowers: ["Sunflowers", "Lavender", "Delphiniums", "Black-eyed Susans"],
    price: "$75",
    available: "June - August",
  },
  {
    season: "Fall",
    name: "Harvest Glow",
    description: "Warm autumn tones and seasonal blooms",
    flowers: ["Mums", "Asters", "Sunflowers", "Dried Grasses"],
    price: "$70",
    available: "September - October",
  },
  {
    season: "Winter",
    name: "Evergreen Elegance",
    description: "Sophisticated winter arrangements",
    flowers: ["Pine", "Holly", "Evergreens", "Roses"],
    price: "$80",
    available: "November - March",
  },
];

const floralServices = [
  {
    icon: Flower,
    title: "Seasonal Bouquets",
    description: "Fresh, locally grown arrangements delivered weekly or on demand",
    features: ["Farm-fresh flowers", "Seasonal varieties", "Custom arrangements"],
  },
  {
    icon: Gift,
    title: "CSA Flower Shares",
    description: "Weekly or monthly flower deliveries with exclusive access to new blooms",
    features: ["Weekly deliveries", "Exclusive varieties", "Flexible scheduling"],
  },
  {
    icon: Heart,
    title: "Wedding Flowers",
    description: "Complete floral design for your special day, from bouquets to decor",
    features: ["Bridal bouquets", "Ceremony decor", "Reception arrangements"],
  },
  {
    icon: Leaf,
    title: "Floral Workshops",
    description: "Learn to arrange flowers with our expert florists",
    features: ["Hands-on learning", "Seasonal techniques", "Small groups"],
  },
];

const careTips = [
  {
    title: "Fresh Water Daily",
    description: "Change water every 1-2 days and trim stems at an angle",
  },
  {
    title: "Flower Food",
    description: "Use the included flower food packet for longer-lasting blooms",
  },
  {
    title: "Cool Location",
    description: "Keep flowers away from direct sunlight, heat, and drafts",
  },
  {
    title: "Stem Care",
    description: "Remove leaves that will be below water level to prevent bacteria",
  },
];

export default function FlowersPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary" className="text-sm">
            Alberta Floral Farm
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Seasonal Flowers from the Prairie
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Fresh, locally grown flowers and expert floral design services.
            From seasonal bouquets to complete wedding florals, we bring Alberta's
            natural beauty to your home or special event.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button size="lg" className="belmont-accent text-white">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Order Flowers
          </Button>
          <Button variant="outline" size="lg">
            <Calendar className="h-5 w-5 mr-2" />
            Join CSA Program
          </Button>
        </div>
      </div>

      {/* Seasonal Bouquets */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Seasonal Bouquets</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Fresh arrangements featuring Alberta-grown flowers and prairie wildflowers,
            available seasonally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalBouquets.map((bouquet, index) => (
            <Card key={index} className="group hover:scale-105 transition-transform duration-200">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{bouquet.season}</Badge>
                  <span className="text-lg font-semibold text-primary">{bouquet.price}</span>
                </div>
                <CardTitle className="text-lg">{bouquet.name}</CardTitle>
                <CardDescription>{bouquet.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Includes:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {bouquet.flowers.map((flower, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        {flower}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-muted-foreground">
                  Available: {bouquet.available}
                </p>
                <Button className="w-full" size="sm">
                  Order Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floral Services */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Floral Services</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            From fresh bouquets to complete wedding florals, we offer comprehensive
            floral design services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {floralServices.map((service, index) => (
            <Card key={index} className="group hover:scale-105 transition-transform duration-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CSA Program */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Flower CSA Program
          </CardTitle>
          <CardDescription>
            Never miss our freshest blooms with our Community Supported Agriculture program
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">$45</div>
              <div className="text-sm font-medium">Weekly Share</div>
              <div className="text-xs text-muted-foreground">Fresh bouquet every week</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">$160</div>
              <div className="text-sm font-medium">Monthly Share</div>
              <div className="text-xs text-muted-foreground">4 bouquets per month</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">$120</div>
              <div className="text-sm font-medium">Bi-weekly Share</div>
              <div className="text-xs text-muted-foreground">2 bouquets per month</div>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" className="belmont-accent text-white">
              <Calendar className="h-5 w-5 mr-2" />
              Start My Flower Share
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Flower Care Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Flower Care Guide
          </CardTitle>
          <CardDescription>
            Keep your blooms fresh and beautiful with these simple care tips
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careTips.map((tip, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Delivery & Pickup
          </CardTitle>
          <CardDescription>
            Convenient options for getting your flowers home
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Local Delivery</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Calgary & area: $15 delivery fee</li>
                <li>• High River & Okotoks: $10 delivery fee</li>
                <li>• Same-day delivery available</li>
                <li>• Minimum order $50 for delivery</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Farm Pickup</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Free pickup at the farm</li>
                <li>• See flowers before purchasing</li>
                <li>• Open daily during season</li>
                <li>• No minimum order required</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4">Bring Home Prairie Beauty</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Order fresh flowers today and experience the natural beauty of Alberta's
            floral farms in your home.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="belmont-accent text-white">
              <Flower className="h-5 w-5 mr-2" />
              Shop Seasonal Bouquets
            </Button>
            <Button variant="outline" size="lg">
              <Phone className="h-5 w-5 mr-2" />
              Call for Custom Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
