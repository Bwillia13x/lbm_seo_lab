"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { CheckCircle, ArrowRight, Target, Users, BarChart3, MessageSquare } from "lucide-react";
import Link from "next/link";
import { LBM_CONSTANTS } from "@/lib/constants";

const onboardingSteps = [
  {
    step: 1,
    title: "Welcome to Prairie Artistry Studio SEO Lab",
    description: "Your complete marketing toolkit for art workshops, commissions, and creative services",
    icon: Target,
    completed: true,
  },
  {
    step: 2,
    title: "Set Up Your Business Information",
    description: "Configure your studio details, contact information, and service offerings",
    icon: Users,
    completed: false,
  },
  {
    step: 3,
    title: "Create Your First Campaign",
    description: "Generate tracking links for your art workshops and commission inquiries",
    icon: BarChart3,
    completed: false,
  },
  {
    step: 4,
    title: "Start Collecting Reviews",
    description: "Set up review collection for workshop participants and commission clients",
    icon: MessageSquare,
    completed: false,
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Welcome to Prairie Artistry Studio SEO Lab"
        subtitle="Let's get you started with your art studio marketing toolkit"
      />

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Follow these steps to set up your art studio marketing tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {onboardingSteps.map((step, index) => (
              <div
                key={step.step}
                className={`flex items-start gap-4 p-4 border rounded-lg ${
                  step.completed ? "bg-green-50 dark:bg-green-950/20" : "bg-gray-50 dark:bg-gray-950/20"
                }`}
              >
                <div className="flex-shrink-0">
                  {step.completed ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <div className="h-6 w-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-500">{step.step}</span>
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="text-muted-foreground mt-1">{step.description}</p>
                </div>
                {step.completed && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Completed
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Campaign Tracking
            </CardTitle>
            <CardDescription>
              Create tracking links for your art workshops and commission inquiries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/apps/utm-dashboard">
                Start Tracking
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              Review Management
            </CardTitle>
            <CardDescription>
              Set up review collection for workshop participants and clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/apps/review-link">
                Get Reviews
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Analytics
            </CardTitle>
            <CardDescription>
              Track your marketing performance and search rankings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/apps/gsc-ctr-miner">
                View Analytics
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help Getting Started?</CardTitle>
          <CardDescription>
            Our team is here to help you make the most of your art studio marketing tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <a href={LBM_CONSTANTS.PHONE_TEL}>
                Call Prairie Artistry Studio
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={`mailto:info@prairieartistry.ca`}>
                Email Support
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}