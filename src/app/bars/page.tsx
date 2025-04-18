"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BarCard from "@/components/bars/BarCard";
import BarFilter from "@/components/bars/BarFilter";
import { bars } from "@/lib/data";
import { PageLayout } from "@/components/layout/page-layout";
import { Bar } from "@/lib/types";

export default function BarsPage() {
  const searchParams = useSearchParams();
  const [filteredBars, setFilteredBars] = useState<Bar[]>(bars);
  const [initialSearchQuery, setInitialSearchQuery] = useState<string>("");

  // Get search query from URL parameters
  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setInitialSearchQuery(searchQuery);
    }
  }, [searchParams]);

  return (
    <PageLayout>
        <div className="flex flex-col gap-4 sm:gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Bars in Austin</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
              Discover the best bars Austin has to offer
            </p>
          </div>

          <BarFilter bars={bars} onFilterChange={setFilteredBars} initialSearchQuery={initialSearchQuery} />

          <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBars.length > 0 ? (
              filteredBars.map((bar) => (
                <BarCard key={bar.id} bar={bar} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-muted-foreground">No bars match your filters.</p>
                <p className="text-sm text-muted-foreground mt-2">Try adjusting your search criteria.</p>
              </div>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredBars.length} of {bars.length} bars
          </div>
        </div>
    </PageLayout>
  );
}
