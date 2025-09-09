import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react"

export function OnboardingBanner() {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <Sparkles className="h-5 w-5 text-purple-600" />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100">
              Welcome to Little Bow Meadows SEO Lab
            </h3>
            <Badge variant="secondary" className="text-xs">
              Farm Business Edition
            </Badge>
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">
            Your complete toolkit for managing online marketing, product sales, and customer relationships
            for your prairie wedding venue and floral farm business.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href="/apps/onboarding">
                <CheckCircle className="h-4 w-4 mr-2" />
                Start Setup Guide
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href="#tools">
                Browse Tools
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
