import { ChevronLeft } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="flex h-[85vh] items-center justify-center">
      <Card className="w-full max-w-md bg-background/60 shadow border-2 border-dashed border-border m-5">
        <CardContent className="flex flex-col items-center justify-center space-y-6 pt-8 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter">Not Found</h1>
            <p className="text-lg text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
