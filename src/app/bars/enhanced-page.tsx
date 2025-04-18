"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { StandardPage } from "@/components/templates/StandardPage";
import { EnhancedBarCard } from "@/components/bars/EnhancedBarCard";
import { EnhancedSearch } from "@/components/ui/enhanced-search";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { bars } from "@/lib/data";
import { Bar } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { designSystem } from "@/lib/design-system";
import { Filter, SlidersHorizontal, MapPin, Star, DollarSign, Clock, X } from "lucide-react";
import { Suspense } from "react";

// Filter options
const priceOptions = [
  { value: "1", label: "$" },
  { value: "2", label: "$$" },
  { value: "3", label: "$$$" },
  { value: "4", label: "$$$$" },
];

const ratingOptions = [
  { value: "4.5", label: "4.5+" },
  { value: "4", label: "4+" },
  { value: "3.5", label: "3.5+" },
  { value: "3", label: "3+" },
];

const sortOptions = [
  { value: "rating-high", label: "Highest Rated" },
  { value: "rating-low", label: "Lowest Rated" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

// Loading fallback
function BarsLoading() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="h-10 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
        <div className="h-10 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
      </div>
      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-80 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

// Bar listing with filters
function BarsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [happyHourOnly, setHappyHourOnly] = useState(false);
  const [sortBy, setSortBy] = useState("rating-high");
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // Initialize from URL params
  useEffect(() => {
    const urlSearchQuery = searchParams.get("search") || "";
    const urlPrices = searchParams.get("price")?.split(",") || [];
    const urlRatings = searchParams.get("rating")?.split(",") || [];
    const urlHappyHour = searchParams.get("happyHour") === "true";
    const urlSortBy = searchParams.get("sort") || "rating-high";
    
    setSearchQuery(urlSearchQuery);
    setSelectedPrices(urlPrices);
    setSelectedRatings(urlRatings);
    setHappyHourOnly(urlHappyHour);
    setSortBy(urlSortBy);
  }, [searchParams]);
  
  // Filter and sort bars
  const filteredBars = useMemo(() => {
    setIsSearching(true);
    
    // Apply filters
    let filtered = [...bars];
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(bar => 
        bar.name.toLowerCase().includes(query) || 
        bar.address.toLowerCase().includes(query) ||
        bar.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Price range
    if (selectedPrices.length > 0) {
      filtered = filtered.filter(bar => 
        bar.priceRange && selectedPrices.includes(bar.priceRange.toString())
      );
    }
    
    // Rating
    if (selectedRatings.length > 0) {
      const minRating = Math.min(...selectedRatings.map(r => parseFloat(r)));
      filtered = filtered.filter(bar => bar.rating >= minRating);
    }
    
    // Happy hour
    if (happyHourOnly) {
      filtered = filtered.filter(bar => bar.hasHappyHour);
    }
    
    // Sort
    if (sortBy === "rating-high") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "rating-low") {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === "name-asc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setTimeout(() => setIsSearching(false), 300);
    return filtered;
  }, [searchQuery, selectedPrices, selectedRatings, happyHourOnly, sortBy]);
  
  // Toggle price filter
  const togglePrice = (price: string) => {
    setSelectedPrices(prev => 
      prev.includes(price)
        ? prev.filter(p => p !== price)
        : [...prev, price]
    );
  };
  
  // Toggle rating filter
  const toggleRating = (rating: string) => {
    setSelectedRatings(prev => 
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedPrices([]);
    setSelectedRatings([]);
    setHappyHourOnly(false);
    setSortBy("rating-high");
  };
  
  // Count active filters
  const activeFilterCount = 
    (searchQuery ? 1 : 0) + 
    selectedPrices.length + 
    selectedRatings.length + 
    (happyHourOnly ? 1 : 0);
  
  return (
    <div className="space-y-8">
      {/* Search and filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="w-full sm:w-auto max-w-md">
          <EnhancedSearch
            placeholder="Search bars by name, location, or tag..."
            initialValue={searchQuery}
            onSearch={setSearchQuery}
            isLoading={isSearching}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <EnhancedButton
            variant="apple-secondary"
            size="apple-md"
            startIcon={<SlidersHorizontal className="h-4 w-4" />}
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              activeFilterCount > 0 && "border-primary-500 text-primary-600"
            )}
          >
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs text-white">
                {activeFilterCount}
              </span>
            )}
          </EnhancedButton>
          
          <div className="hidden md:block">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/20"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Filters panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: designSystem.animation.timingFunctions["apple-standard"] }}
            className="overflow-hidden"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-apple-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Filters</h3>
                
                <div className="flex items-center gap-3">
                  {activeFilterCount > 0 && (
                    <EnhancedButton
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-neutral-500 hover:text-neutral-700"
                    >
                      Clear all
                    </EnhancedButton>
                  )}
                  
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-neutral-500 hover:text-neutral-700"
                    aria-label="Close filters"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price range */}
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1.5 text-neutral-500" />
                    Price Range
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {priceOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => togglePrice(option.value)}
                        className={cn(
                          "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                          selectedPrices.includes(option.value)
                            ? "bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Rating */}
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center">
                    <Star className="h-4 w-4 mr-1.5 text-neutral-500" />
                    Rating
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {ratingOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => toggleRating(option.value)}
                        className={cn(
                          "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                          selectedRatings.includes(option.value)
                            ? "bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Other filters */}
                <div>
                  <h4 className="text-sm font-medium mb-3 flex items-center">
                    <Clock className="h-4 w-4 mr-1.5 text-neutral-500" />
                    Features
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setHappyHourOnly(!happyHourOnly)}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                        happyHourOnly
                          ? "bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                      )}
                    >
                      Happy Hour
                    </button>
                  </div>
                </div>
                
                {/* Sort (mobile only) */}
                <div className="md:hidden">
                  <h4 className="text-sm font-medium mb-3">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full h-10 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/20"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Active filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {searchQuery && (
            <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full px-3 py-1 text-sm">
              <span className="mr-1">Search:</span>
              <span className="font-medium">{searchQuery}</span>
              <button
                onClick={() => setSearchQuery("")}
                className="ml-1.5 text-neutral-500 hover:text-neutral-700"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          
          {selectedPrices.map(price => (
            <div key={price} className="flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full px-3 py-1 text-sm">
              <span className="mr-1">Price:</span>
              <span className="font-medium">{priceOptions.find(p => p.value === price)?.label}</span>
              <button
                onClick={() => togglePrice(price)}
                className="ml-1.5 text-neutral-500 hover:text-neutral-700"
                aria-label={`Remove ${price} filter`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          
          {selectedRatings.map(rating => (
            <div key={rating} className="flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full px-3 py-1 text-sm">
              <span className="mr-1">Rating:</span>
              <span className="font-medium">{ratingOptions.find(r => r.value === rating)?.label}</span>
              <button
                onClick={() => toggleRating(rating)}
                className="ml-1.5 text-neutral-500 hover:text-neutral-700"
                aria-label={`Remove ${rating} filter`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          
          {happyHourOnly && (
            <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full px-3 py-1 text-sm">
              <span className="font-medium">Happy Hour Only</span>
              <button
                onClick={() => setHappyHourOnly(false)}
                className="ml-1.5 text-neutral-500 hover:text-neutral-700"
                aria-label="Remove happy hour filter"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Results count */}
      <div className="text-sm text-neutral-500 dark:text-neutral-400">
        Showing {filteredBars.length} {filteredBars.length === 1 ? 'bar' : 'bars'}
      </div>
      
      {/* Bar grid */}
      {filteredBars.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBars.map((bar, index) => (
            <EnhancedBarCard
              key={bar.id}
              bar={bar}
              delay={index}
              featured={index === 0 && filteredBars.length > 3}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-4">
            <MapPin className="h-8 w-8 text-neutral-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No bars found</h3>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            We couldn't find any bars matching your filters. Try adjusting your search criteria or clearing some filters.
          </p>
          <EnhancedButton
            variant="apple-primary"
            className="mt-6"
            onClick={clearFilters}
          >
            Clear all filters
          </EnhancedButton>
        </div>
      )}
    </div>
  );
}

/**
 * Enhanced bar listing page with Apple-inspired design
 * 
 * Features:
 * - Smooth animations and transitions
 * - Advanced filtering and sorting
 * - Responsive design
 * - Refined typography and spacing
 */
export default function EnhancedBarsPage() {
  return (
    <StandardPage
      title="Bars in Austin"
      description="Discover the best bars Austin has to offer"
    >
      <Suspense fallback={<BarsLoading />}>
        <BarsContent />
      </Suspense>
    </StandardPage>
  );
}
