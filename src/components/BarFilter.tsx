"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bar } from "@/lib/types";

// Get all unique tags from the bars data
const getUniqueTags = (bars: Bar[]): string[] => {
  const tagsSet = new Set<string>();
  bars.forEach((bar) => {
    bar.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

interface BarFilterProps {
  bars: Bar[];
  onFilterChange: (filteredBars: Bar[]) => void;
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

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setShowHappyHourOnly(false);
    setSortBy("default");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-72 lg:w-96">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bars..."
            className="w-full pl-8 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 w-full sm:w-auto"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
            {(selectedTags.length > 0 || showHappyHourOnly) && (
              <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {selectedTags.length + (showHappyHourOnly ? 1 : 0)}
              </Badge>
            )}
          </Button>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <Badge
              variant={showHappyHourOnly ? "default" : "outline"}
              className="cursor-pointer text-xs"
              onClick={() => setShowHappyHourOnly(!showHappyHourOnly)}
            >
              Happy Hour
            </Badge>
            {selectedTags.map(tag => (
              <Badge
                key={tag}
                variant="default"
                className="cursor-pointer text-xs"
                onClick={() => toggleTag(tag)}
              >
                {tag}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
            {(selectedTags.length > 0 || showHappyHourOnly) && (
              <Badge
                variant="outline"
                className="cursor-pointer text-xs"
                onClick={clearFilters}
              >
                Clear All
              </Badge>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="p-4 border rounded-lg bg-card/30 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Sort By</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by..." />
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
            </div>

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

          <div className="flex justify-end">
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
