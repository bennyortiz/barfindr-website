/**
 * useBarData Hook
 * 
 * Custom hook for working with bar data.
 * Provides filtering, sorting, and search functionality.
 */

import { useState, useEffect, useMemo } from "react";
import { Bar } from "@/lib/types";
import { getCurrentDay } from "@/utils/date-utils";

type SortOption = "default" | "rating-high" | "rating-low" | "name-asc" | "name-desc";

interface UseBarDataProps {
  /** Array of all bars */
  bars: Bar[];
  /** Initial search query */
  initialSearchQuery?: string;
  /** Initial selected tags */
  initialTags?: string[];
  /** Initial happy hour filter */
  initialHappyHourOnly?: boolean;
  /** Initial sort option */
  initialSortBy?: SortOption;
}

interface UseBarDataReturn {
  /** Filtered and sorted bars */
  filteredBars: Bar[];
  /** Current search query */
  searchQuery: string;
  /** Set search query */
  setSearchQuery: (query: string) => void;
  /** Currently selected tags */
  selectedTags: string[];
  /** Toggle a tag selection */
  toggleTag: (tag: string) => void;
  /** Whether to show only bars with happy hour */
  showHappyHourOnly: boolean;
  /** Set happy hour filter */
  setShowHappyHourOnly: (show: boolean) => void;
  /** Current sort option */
  sortBy: SortOption;
  /** Set sort option */
  setSortBy: (option: SortOption) => void;
  /** Clear all filters */
  clearFilters: () => void;
  /** All unique tags from the bars */
  allTags: string[];
  /** Bars that are currently open */
  openBars: Bar[];
  /** Bars with happy hour today */
  happyHourBars: Bar[];
}

/**
 * Custom hook for working with bar data
 */
export function useBarData({
  bars,
  initialSearchQuery = "",
  initialTags = [],
  initialHappyHourOnly = false,
  initialSortBy = "default"
}: UseBarDataProps): UseBarDataReturn {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [showHappyHourOnly, setShowHappyHourOnly] = useState(initialHappyHourOnly);
  const [sortBy, setSortBy] = useState<SortOption>(initialSortBy);

  // Extract all unique tags from the bars
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    bars.forEach((bar) => {
      bar.tags.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  }, [bars]);

  // Filter and sort the bars
  const filteredBars = useMemo(() => {
    // Filter by search query, tags, and happy hour
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
    let sortedBars = [...filtered];
    if (sortBy === "rating-high") {
      sortedBars.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "rating-low") {
      sortedBars.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === "name-asc") {
      sortedBars.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      sortedBars.sort((a, b) => b.name.localeCompare(a.name));
    }

    return sortedBars;
  }, [bars, searchQuery, selectedTags, showHappyHourOnly, sortBy]);

  // Get bars that are currently open
  const openBars = useMemo(() => {
    const currentDay = getCurrentDay();
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }).toLowerCase();
    
    return bars.filter(bar => {
      const hours = bar.openingHours[currentDay];
      
      // Skip bars that are closed or have variable hours
      if (hours === "Closed" || hours === "Varies by bar") {
        return false;
      }
      
      // For simplicity, we'll just check if the bar is open today
      // A more sophisticated implementation would check the actual time
      return hours !== "Closed";
    });
  }, [bars]);

  // Get bars with happy hour today
  const happyHourBars = useMemo(() => {
    return bars.filter(bar => bar.hasHappyHour);
  }, [bars]);

  // Toggle a tag in the selected tags array
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setShowHappyHourOnly(false);
    setSortBy("default");
  };

  return {
    filteredBars,
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    showHappyHourOnly,
    setShowHappyHourOnly,
    sortBy,
    setSortBy,
    clearFilters,
    allTags,
    openBars,
    happyHourBars
  };
}
