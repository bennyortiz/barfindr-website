import { Bar } from "@/lib/types";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface BarRatingsProps {
  bar: Bar;
  showDetailed?: boolean;
  className?: string;
}

/**
 * Component to display bar ratings
 * 
 * @param bar - The bar object with ratings
 * @param showDetailed - Whether to show detailed ratings from different sources
 * @param className - Additional CSS classes
 */
export function BarRatings({ bar, showDetailed = false, className }: BarRatingsProps) {
  // If not showing detailed ratings, just show the overall rating
  if (!showDetailed) {
    return (
      <div className={cn("flex items-center gap-1.5", className)}>
        <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-primary text-primary" />
        <span className="text-sm sm:text-base font-medium">{bar.rating}</span>
      </div>
    );
  }

  // If showing detailed ratings, show ratings from different sources
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Overall</span>
        <div className="flex items-center gap-1.5">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm font-medium">{bar.rating}</span>
        </div>
      </div>
      
      {bar.ratings?.google && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Google</span>
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-[#4285F4] text-[#4285F4]" />
            <span className="text-sm">{bar.ratings.google}</span>
          </div>
        </div>
      )}
      
      {bar.ratings?.yelp && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Yelp</span>
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-[#FF1A1A] text-[#FF1A1A]" />
            <span className="text-sm">{bar.ratings.yelp}</span>
          </div>
        </div>
      )}
      
      {bar.ratings?.internal && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">BarFindr</span>
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="text-sm">{bar.ratings.internal}</span>
          </div>
        </div>
      )}
    </div>
  );
}
