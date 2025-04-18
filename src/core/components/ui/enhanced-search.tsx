"use client";

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { designSystem } from '@/lib/design-system';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';
import { EnhancedInput } from './enhanced-input';

export interface EnhancedSearchProps {
  /**
   * Placeholder text
   * @default "Search..."
   */
  placeholder?: string;
  
  /**
   * Initial search value
   * @default ""
   */
  initialValue?: string;
  
  /**
   * Callback when search value changes
   */
  onSearch?: (value: string) => void;
  
  /**
   * Delay in ms before triggering search
   * @default 300
   */
  debounceMs?: number;
  
  /**
   * Whether the search is loading
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * Whether to show a clear button
   * @default true
   */
  showClear?: boolean;
  
  /**
   * Additional className for the input
   */
  className?: string;
  
  /**
   * Whether to animate the search input
   * @default true
   */
  animate?: boolean;
  
  /**
   * Whether to expand on focus
   * @default false
   */
  expandOnFocus?: boolean;
  
  /**
   * Width when expanded (only used if expandOnFocus is true)
   * @default "300px"
   */
  expandedWidth?: string;
}

/**
 * EnhancedSearch component with Apple-inspired design
 * 
 * Features:
 * - Smooth animations
 * - Debounced search
 * - Loading state
 * - Clear button
 * - Expand on focus option
 */
export function EnhancedSearch({
  placeholder = "Search...",
  initialValue = "",
  onSearch,
  debounceMs = 300,
  isLoading = false,
  showClear = true,
  className,
  animate = true,
  expandOnFocus = false,
  expandedWidth = "300px",
}: EnhancedSearchProps) {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle debounced search
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      onSearch?.(value);
    }, debounceMs);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, onSearch, debounceMs]);
  
  // Clear search
  const handleClear = () => {
    setValue("");
    onSearch?.("");
  };
  
  const searchInput = (
    <div 
      className={cn(
        "relative group",
        expandOnFocus && "transition-all duration-300",
        expandOnFocus && isFocused ? `w-[${expandedWidth}]` : "w-full",
        className
      )}
    >
      <EnhancedInput
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        variant="apple-search"
        rounded="apple-lg"
        animate={false}
        startIcon={
          isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary-500" />
          ) : (
            <Search className="h-4 w-4" />
          )
        }
        endIcon={
          showClear && value ? (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-full p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </button>
          ) : null
        }
        className={cn(
          "pr-2 transition-all duration-300",
          isFocused && "shadow-apple-sm"
        )}
      />
      
      {/* Focus ring animation */}
      {animate && isFocused && (
        <motion.div
          layoutId="search-focus-ring"
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.2, ease: designSystem.animation.timingFunctions["apple-standard"] }}
        />
      )}
    </div>
  );
  
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.3,
          ease: designSystem.animation.timingFunctions["apple-standard"]
        }}
      >
        {searchInput}
      </motion.div>
    );
  }
  
  return searchInput;
}

export default EnhancedSearch;
