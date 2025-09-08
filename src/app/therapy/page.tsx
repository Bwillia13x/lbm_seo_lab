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
  Heart,
  Users,
  Calendar,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Brain,
  Shield,
  Palette,
  MessageSquare,
} from "lucide-react";
import { LBM_CONSTANTS } from "@/lib/constants";

const therapyServices = [
  {
    name: "Individual Art Therapy",
    description: "One-on-one sessions for personal healing and growth",
    duration: "60 minutes",
    price: "$120",
    includes: [
      "Licensed art therapist guidance",
      "All art materials provided",
      "Safe, confidential environment",
      "Personalized treatment approach",
      "Take-home artwork optional",
    ],
    schedule: "Monday - Friday, flexible scheduling",
    popular: true,
  },
  {
    name: "Group Art Therapy",
    description: "Supportive group sessions for shared healing",
    duration: "90 minutes",
    price: "$85",
    includes: [
      "Small group setting (4-6 people)",
      "Peer support and connection",
      "Guided creative exercises",
      "Group reflection time",
      "Materials included",
    ],
    schedule: "Tuesdays & Thursdays 6 PM - 7:30 PM",
    popular: false,
  },
  {
    name: "Family Art Therapy",
    description: "Strengthen family bonds through creative expression",
    duration: "75 minutes",
    price: "$150",
    includes: [
      "Family-focused activities",
      "Communication skill building",
      "Age-appropriate materials",
      "Family artwork creation",
      "Take-home resources",
    ],
    schedule: "Saturdays 10 AM - 11:15 AM",
    popular: false,
  },
];

const therapyBenefits = [
  {
    icon: Heart,
    title: "Emotional Healing",
    description: "Process emotions and trauma through creative expression",
  },
  {
    icon: Brain,
    title: "Mental Wellness",
    description: "Reduce stress, anxiety, and depression through art",
  },
  {
    icon: Users,
    title: "Social Connection",
    description: "Build relationships and communication skills",
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Confidential, non-judgmental therapeutic space",
  },
];

const conditions = [
  "Anxiety and Depression",
  "Trauma and PTSD",
  "Grief and Loss",
  "Relationship Issues",
  "Self-Esteem Challenges",
  "Life Transitions",
  "Stress Management",
  "Addiction Recovery",
];

const faqs = [
  {
    question: "Do I need any art experience?",
    answer: "No art experience is necessary. Art therapy focuses on the process of creation, not the final product. Our therapists will guide you through appropriate techniques.",
  },
  {
    question: "How is art therapy different from regular therapy?",
    answer: "Art therapy uses creative expression as a primary form of communication. It can help access emotions and experiences that might be difficult to express with words alone.",
  },
  {
    question: "What should I expect in my first session?",
    answer: "Your first session will include an intake discussion about your goals, followed by a gentle introduction to art materials and simple creative exercises.",
  },
  {
    question: "Is art therapy covered by insurance?",
    answer: "Many insurance plans cover art therapy when provided by licensed therapists. We can provide receipts for insurance submission and discuss payment options.",
  },
  {
    question: "How long does treatment typically last?",
    answer: "Treatment length varies based on individual needs and goals. Some clients benefit from short-term work (6-12 sessions), while others prefer longer-term support.",
  },
];

export default function TherapyPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary" className="text-sm">
            Licensed Art Therapy Services
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Healing Through Creative Expression
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the therapeutic power of art in a safe, supportive environment.
            Our licensed art therapists help you process emotions, reduce stress,
            and find healing through creative expression.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Button size="lg" className="belmont-accent text-white">
            <Calendar className="h-5 w-5 mr-2" />
            Book Consultation
          </Button>
          <Button variant="outline" size="lg">
            <Phone className="h-5 w-5 mr-2" />
            Call for Information
          </Button>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {therapyBenefits.map((benefit, index) => (
          <Card key={index} className="text-center group hover:scale-105 transition-transform duration-200">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Therapy Services */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Art Therapy Services</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Professional art therapy services tailored to your individual needs
            and therapeutic goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {therapyServices.map((service, index) => (
            <Card key={index} className="relative group hover:scale-105 transition-transform duration-200">
              {service.popular && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-orange-500 hover:bg-orange-600">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
                <div className="flex items-center justify-between mt-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {service.duration}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{service.price}</div>
                    <div className="text-xs text-muted-foreground">per session</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Includes:</p>
                  <ul className="space-y-1">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {service.schedule}
                </div>
                <Button className="w-full">
                  Book Session
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Conditions We Help With */}
      <Card>
        <CardHeader>
          <CardTitle>Conditions We Help With</CardTitle>
          <CardDescription>
            Art therapy can be beneficial for a wide range of mental health and wellness goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {conditions.map((condition, index) => (
              <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">{condition}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Everything you need to know about art therapy at Prairie Artistry Studio
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
          <h3 className="text-2xl font-bold mb-4">Begin Your Healing Journey</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Take the first step towards wellness through creative expression.
            Our licensed art therapists are here to support your journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="belmont-accent text-white">
              <Heart className="h-5 w-5 mr-2" />
              Book Consultation
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="h-5 w-5 mr-2" />
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}