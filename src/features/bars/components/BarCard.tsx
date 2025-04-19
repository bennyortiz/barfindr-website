import { Bar } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
import { BarRatings } from "./BarRatings";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getBarUrl } from "@/lib/bar-data";

interface BarCardProps {
  bar: Bar;
  className?: string;
}

export function BarCard({ bar, className }: BarCardProps) {
  return (
    <Link href={getBarUrl(bar)} className="block h-full">
      <Card className={cn("overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col rounded-lg", className)}>
        <div className="relative aspect-video w-full rounded-t-lg overflow-hidden">
          <Image
            src={bar.imageUrl}
            alt={bar.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            className="object-cover"
          />
        </div>
:start_line:30
-------
        <CardHeader className="px-3 py-2 sm:px-4 sm:py-3">
          <div className="flex items-center justify-between">
            <CardTitle className="line-clamp-1 text-lg sm:text-xl font-semibold">{bar.name}</CardTitle>
            <BarRatings bar={bar} className="scale-95 origin-right" />
          </div>
          <CardDescription className="flex items-center gap-0.5 text-sm text-muted-foreground mt-0.5 truncate">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{bar.address}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3 py-1.5 sm:px-4 sm:py-2 flex-grow">
          <p className="line-clamp-3 text-sm text-muted-foreground">{bar.description}</p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-1.5 px-3 py-2 sm:px-4 sm:py-3 pt-0">
          {bar.hasHappyHour && (
            <Badge variant="secondary" className="flex items-center gap-1 text-sm">
              <Clock className="h-4 w-4" />
              Happy Hour
            </Badge>
          )}
          {bar.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-sm">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
