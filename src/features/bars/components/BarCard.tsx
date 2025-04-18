import { Bar } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { BarRatings } from "./BarRatings";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BarCardProps {
  bar: Bar;
  className?: string;
}

export default function BarCard({ bar, className }: BarCardProps) {
  return (
    <Link href={`/bars/${bar.slug}`} className="block h-full">
      <Card className={cn("overflow-hidden transition-all hover:shadow-md h-full flex flex-col", className)}>
        <div className="aspect-video w-full overflow-hidden relative">
          <Image
            src={bar.imageUrl}
            alt={bar.name}
            className="object-cover transition-transform hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <CardHeader className="p-3 sm:p-4">
          <div className="flex items-start justify-between">
            <CardTitle className="line-clamp-1 text-base sm:text-lg md:text-xl">{bar.name}</CardTitle>
            <BarRatings bar={bar} className="scale-90 origin-right" />
          </div>
          <CardDescription className="flex items-center gap-1 text-xs mt-1">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{bar.address}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-0 flex-grow">
          <p className="line-clamp-2 text-xs sm:text-sm text-muted-foreground">{bar.description}</p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-1 sm:gap-2 p-3 sm:p-4 pt-0">
          {bar.hasHappyHour && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs">
              <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              Happy Hour
            </Badge>
          )}
          {bar.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
