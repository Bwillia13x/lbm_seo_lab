import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground">We couldn’t find the page you’re looking for.</p>
      </div>

      <Card className="elevated-card">
        <CardContent className="p-6 space-y-4">
          <p className="text-sm text-muted-foreground">
            Try going back or explore the tools below.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/#tools">
                <Search className="h-4 w-4 mr-2" />
                Browse Tools
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="#" onClick={(e) => { e.preventDefault(); history.back(); }}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
