/**
 * BarFilter Component
 *
 * Provides filtering and sorting functionality for the bars listing page.
 * Includes search, tag filtering, happy hour filtering, and sorting options.
 *
 * @component
 */

"use client";

import { useState, useEffect } from "react";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { Bar } from "@/lib/types";

/**
 * Extracts all unique tags from the bars data
 * @param bars - Array of bar objects
 * @returns Array of unique tags sorted alphabetically
 */
const getUniqueTags = (bars: Bar[]): string[] => {
  const tagsSet = new Set<string>();
  bars.forEach((bar) => {
    bar.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

interface BarFilterProps {
  /** Array of all bars to be filtered */
  bars: Bar[];
  /** Callback function to receive the filtered bars */
  onFilterChange: (filteredBars: Bar[]) => void;
  /** Optional initial search query (e.g., from URL parameters) */
  initialSearchQuery?: string;
}

export default function BarFilter({ bars, onFilterChange, initialSearchQuery = "" }: BarFilterProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showHappyHourOnly, setShowHappyHourOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>("default");

  const allTags = getUniqueTags(bars);

  // Apply initial search query if provided
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Apply filters whenever filter criteria change
  useEffect(() => {
    const filtered = bars.filter((bar) => {
      // Filter by search query
      const matchesSearch = bar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           bar.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by selected tags
      const matchesTags = selectedTags.length === 0 ||
                         selectedTags.some(tag => bar.tags.includes(tag));

      // Filter by happy hour
      const matchesHappyHour = !showHappyHourOnly || bar.hasHappyHour;

      return matchesSearch && matchesTags && matchesHappyHour;
    });

    // Sort the filtered bars
    const sortedBars = [...filtered];
    if (sortBy === "rating-high") {
      sortedBars.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "rating-low") {
      sortedBars.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === "name-asc") {
      sortedBars.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      sortedBars.sort((a, b) => b.name.localeCompare(a.name));
    }

    onFilterChange(sortedBars);
  }, [searchQuery, selectedTags, showHappyHourOnly, sortBy, bars, onFilterChange]);

  /**
   * Toggles a tag in the selected tags array
   * @param tag - The tag to toggle
   */
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  /**
   * Clears all filters and resets to default state
   */
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setShowHappyHourOnly(false);
    setSortBy("default");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bars..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>

                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="rating-high">Rating (High to Low)</SelectItem>
                <SelectItem value="rating-low">Rating (Low to High)</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-primary/10" : ""}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="p-4 border rounded-lg bg-card shadow-sm">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={showHappyHourOnly ? "default" : "outline"}
                  className="cursor-pointer text-xs"
                  onClick={() => setShowHappyHourOnly(!showHappyHourOnly)}
                >
                  Happy Hour
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
