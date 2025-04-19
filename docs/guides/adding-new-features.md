# Adding New Features

This guide explains how to add new features to the BarFindr application, following the established patterns and best practices.

## Feature Structure

In BarFindr, features are organized in a modular way under the `src/features` directory. Each feature has its own directory with the following structure:

```
src/features/feature-name/
├── components/     # Components specific to this feature
├── hooks/          # Custom hooks for this feature
├── utils/          # Utility functions for this feature
└── index.ts        # Exports the public API of this feature
```

## Step-by-Step Guide

### 1. Plan Your Feature

Before writing any code, plan your feature:

- Define the purpose and scope of the feature
- Identify the components, hooks, and utilities you'll need
- Determine how the feature will integrate with the rest of the application
- Consider the user experience and interface design

### 2. Create the Feature Directory Structure

Create a new directory for your feature under `src/features`:

```bash
mkdir -p src/features/your-feature-name/components
mkdir -p src/features/your-feature-name/hooks
mkdir -p src/features/your-feature-name/utils
```

### 3. Create Components

Create the components needed for your feature in the `components` directory:

```tsx
// src/features/your-feature-name/components/YourComponent.tsx

import React from 'react';
import { Button } from '@/core/components/ui/button';

interface YourComponentProps {
  title: string;
  onAction: () => void;
}

/**
 * YourComponent description
 * 
 * @component
 * @example
 * ```tsx
 * <YourComponent title="Example" onAction={() => console.log('Action')} />
 * ```
 */
export function YourComponent({ title, onAction }: YourComponentProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <Button onClick={onAction}>Take Action</Button>
    </div>
  );
}
```

### 4. Create Hooks

Create custom hooks for your feature in the `hooks` directory:

```tsx
// src/features/your-feature-name/hooks/useYourFeature.ts

import { useState, useEffect } from 'react';

interface UseYourFeatureOptions {
  initialValue?: string;
}

interface UseYourFeatureResult {
  value: string;
  setValue: (value: string) => void;
  reset: () => void;
}

/**
 * Custom hook for your feature
 * 
 * @param options - Hook options
 * @returns Hook result
 * 
 * @example
 * ```tsx
 * const { value, setValue, reset } = useYourFeature({ initialValue: 'Initial' });
 * ```
 */
export function useYourFeature({ initialValue = '' }: UseYourFeatureOptions = {}): UseYourFeatureResult {
  const [value, setValue] = useState(initialValue);

  const reset = () => {
    setValue(initialValue);
  };

  useEffect(() => {
    // Effect logic here
    return () => {
      // Cleanup logic here
    };
  }, []);

  return {
    value,
    setValue,
    reset,
  };
}
```

### 5. Create Utilities

Create utility functions for your feature in the `utils` directory:

```tsx
// src/features/your-feature-name/utils/your-feature-utils.ts

/**
 * Format a value for display
 * 
 * @param value - The value to format
 * @returns The formatted value
 * 
 * @example
 * ```tsx
 * const formatted = formatValue('example');
 * ```
 */
export function formatValue(value: string): string {
  return value.toUpperCase();
}

/**
 * Validate a value
 * 
 * @param value - The value to validate
 * @returns Whether the value is valid
 * 
 * @example
 * ```tsx
 * const isValid = validateValue('example');
 * ```
 */
export function validateValue(value: string): boolean {
  return value.length > 0;
}
```

### 6. Create an Index File

Create an index file to export the public API of your feature:

```tsx
// src/features/your-feature-name/index.ts

// Export components
export { YourComponent } from './components/YourComponent';

// Export hooks
export { useYourFeature } from './hooks/useYourFeature';

// Export utilities
export { formatValue, validateValue } from './utils/your-feature-utils';
```

### 7. Create Pages for Your Feature

Create pages that use your feature in the `src/app` directory:

```tsx
// src/app/your-feature/page.tsx

"use client";

import { StandardPage } from "@/core/components/layout/StandardPage";
import { YourComponent } from "@/features/your-feature-name/components/YourComponent";
import { useYourFeature } from "@/features/your-feature-name/hooks/useYourFeature";

export default function YourFeaturePage() {
  const { value, setValue, reset } = useYourFeature({ initialValue: 'Initial Value' });

  const handleAction = () => {
    // Handle action
    console.log('Action taken');
  };

  return (
    <StandardPage
      title="Your Feature"
      description="Description of your feature"
    >
      <div className="space-y-6">
        <p>Current value: {value}</p>
        <YourComponent
          title="Feature Component"
          onAction={handleAction}
        />
        <button onClick={reset}>Reset</button>
      </div>
    </StandardPage>
  );
}
```

### 8. Update Navigation

Update the navigation to include your feature:

```tsx
// src/core/components/layout/Navbar.tsx

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/bars", label: "Bars" },
  { href: "/map", label: "Map" },
  { href: "/happy-hours", label: "Happy Hours" },
  { href: "/your-feature", label: "Your Feature" }, // Add your feature here
];
```

### 9. Add Tests (Optional but Recommended)

Add tests for your feature components, hooks, and utilities:

```tsx
// src/features/your-feature-name/components/YourComponent.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { YourComponent } from './YourComponent';

describe('YourComponent', () => {
  it('renders correctly', () => {
    const mockOnAction = jest.fn();
    render(<YourComponent title="Test Title" onAction={mockOnAction} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /take action/i })).toBeInTheDocument();
  });
  
  it('calls onAction when button is clicked', () => {
    const mockOnAction = jest.fn();
    render(<YourComponent title="Test Title" onAction={mockOnAction} />);
    
    fireEvent.click(screen.getByRole('button', { name: /take action/i }));
    expect(mockOnAction).toHaveBeenCalledTimes(1);
  });
});
```

### 10. Document Your Feature

Add documentation for your feature:

```markdown
# Your Feature

This document describes the Your Feature functionality in BarFindr.

## Components

### YourComponent

A component that displays a title and an action button.

```tsx
import { YourComponent } from "@/features/your-feature-name/components/YourComponent";

<YourComponent
  title="Feature Component"
  onAction={() => console.log('Action')}
/>
```

## Hooks

### useYourFeature

A hook that provides state management for your feature.

```tsx
import { useYourFeature } from "@/features/your-feature-name/hooks/useYourFeature";

const { value, setValue, reset } = useYourFeature({ initialValue: 'Initial' });
```

## Utilities

### formatValue

Formats a value for display.

```tsx
import { formatValue } from "@/features/your-feature-name/utils/your-feature-utils";

const formatted = formatValue('example'); // 'EXAMPLE'
```

### validateValue

Validates a value.

```tsx
import { validateValue } from "@/features/your-feature-name/utils/your-feature-utils";

const isValid = validateValue('example'); // true
```
```

## Example: Adding a Reviews Feature

Let's walk through an example of adding a reviews feature to BarFindr.

### 1. Create the Feature Directory Structure

```bash
mkdir -p src/features/reviews/components
mkdir -p src/features/reviews/hooks
mkdir -p src/features/reviews/utils
```

### 2. Create Types

First, let's define the types for our reviews:

```tsx
// src/lib/types.ts (add to existing types)

export interface Review {
  id: string;
  barId: string;
  userId: string;
  userName: string;
  rating: number;
  text: string;
  date: string;
}
```

### 3. Create Components

```tsx
// src/features/reviews/components/ReviewList.tsx

import React from 'react';
import { Review } from '@/lib/types';
import { ReviewItem } from './ReviewItem';

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-muted-foreground">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}
```

```tsx
// src/features/reviews/components/ReviewItem.tsx

import React from 'react';
import { Review } from '@/lib/types';
import { formatDate } from '@/core/utils/date-utils';
import { StarRating } from './StarRating';

interface ReviewItemProps {
  review: Review;
}

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{review.userName}</h3>
          <p className="text-sm text-muted-foreground">
            {formatDate(new Date(review.date), 'MMMM d, yyyy')}
          </p>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="mt-2">{review.text}</p>
    </div>
  );
}
```

```tsx
// src/features/reviews/components/StarRating.tsx

import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  max?: number;
}

export function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <div className="flex">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}
```

```tsx
// src/features/reviews/components/ReviewForm.tsx

import React, { useState } from 'react';
import { Button } from '@/core/components/ui/button';
import { Textarea } from '@/core/components/ui/textarea';
import { StarRatingInput } from './StarRatingInput';

interface ReviewFormProps {
  barId: string;
  onSubmit: (review: { rating: number; text: string }) => void;
}

export function ReviewForm({ barId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, text });
    setRating(0);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Write a Review</h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">Rating</label>
        <StarRatingInput rating={rating} onChange={setRating} />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="review-text" className="block text-sm font-medium">Review</label>
        <Textarea
          id="review-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience..."
          rows={4}
          required
        />
      </div>
      
      <Button type="submit" disabled={rating === 0 || text.trim() === ''}>
        Submit Review
      </Button>
    </form>
  );
}
```

### 4. Create Hooks

```tsx
// src/features/reviews/hooks/useReviews.ts

import { useState, useEffect } from 'react';
import { Review } from '@/lib/types';

interface UseReviewsOptions {
  barId: string;
}

interface UseReviewsResult {
  reviews: Review[];
  loading: boolean;
  error: Error | null;
  addReview: (review: Omit<Review, 'id' | 'date' | 'userId' | 'userName'>) => void;
}

// Mock data for demonstration
const mockReviews: Review[] = [
  {
    id: '1',
    barId: 'roosevelt-room',
    userId: 'user1',
    userName: 'John Doe',
    rating: 4,
    text: 'Great atmosphere and excellent cocktails!',
    date: '2023-01-15T00:00:00Z',
  },
  {
    id: '2',
    barId: 'roosevelt-room',
    userId: 'user2',
    userName: 'Jane Smith',
    rating: 5,
    text: 'The best bar in Austin! Highly recommend the Old Fashioned.',
    date: '2023-02-20T00:00:00Z',
  },
];

export function useReviews({ barId }: UseReviewsOptions): UseReviewsResult {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter reviews for this bar
        const barReviews = mockReviews.filter(review => review.barId === barId);
        setReviews(barReviews);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch reviews'));
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [barId]);

  const addReview = (newReview: Omit<Review, 'id' | 'date' | 'userId' | 'userName'>) => {
    // In a real app, this would be an API call
    const review: Review = {
      ...newReview,
      id: `temp-${Date.now()}`,
      date: new Date().toISOString(),
      userId: 'current-user',
      userName: 'Current User',
    };

    setReviews(prev => [review, ...prev]);
  };

  return {
    reviews,
    loading,
    error,
    addReview,
  };
}
```

### 5. Create Utilities

```tsx
// src/features/reviews/utils/review-utils.ts

import { Review } from '@/lib/types';

/**
 * Calculate the average rating from a list of reviews
 * 
 * @param reviews - The reviews to calculate the average from
 * @returns The average rating, or 0 if there are no reviews
 */
export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10; // Round to 1 decimal place
}

/**
 * Get the distribution of ratings (how many 1-star, 2-star, etc.)
 * 
 * @param reviews - The reviews to analyze
 * @param maxRating - The maximum rating (default: 5)
 * @returns An array with the count for each rating
 */
export function getRatingDistribution(reviews: Review[], maxRating = 5): number[] {
  const distribution = Array(maxRating).fill(0);
  
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= maxRating) {
      distribution[review.rating - 1]++;
    }
  });
  
  return distribution;
}
```

### 6. Create an Index File

```tsx
// src/features/reviews/index.ts

// Export components
export { ReviewList } from './components/ReviewList';
export { ReviewItem } from './components/ReviewItem';
export { ReviewForm } from './components/ReviewForm';
export { StarRating } from './components/StarRating';

// Export hooks
export { useReviews } from './hooks/useReviews';

// Export utilities
export { calculateAverageRating, getRatingDistribution } from './utils/review-utils';
```

### 7. Integrate with Bar Detail Page

```tsx
// src/app/bars/[id]/page.tsx (update the existing file)

// Add this import
import { ReviewList, ReviewForm, useReviews } from '@/features/reviews';

// Inside the component
const { reviews, loading, error, addReview } = useReviews({ barId: bar.id });

// Add this to the JSX, perhaps in the BarDetailTabs component
<div className="space-y-6">
  <ReviewForm barId={bar.id} onSubmit={addReview} />
  {loading ? (
    <p>Loading reviews...</p>
  ) : error ? (
    <p className="text-red-500">Error loading reviews: {error.message}</p>
  ) : (
    <ReviewList reviews={reviews} />
  )}
</div>
```

## Best Practices

1. **Follow the feature-based organization**
   - Keep all related code in the feature directory
   - Use clear, descriptive names for components, hooks, and utilities

2. **Use TypeScript**
   - Define interfaces for all props and return types
   - Use proper typing for all variables and functions

3. **Document your code**
   - Add JSDoc comments to explain the purpose and usage of components, hooks, and utilities
   - Include examples in the documentation

4. **Follow the component hierarchy**
   - Use core UI components for basic UI elements
   - Create feature-specific components for specialized functionality

5. **Keep components focused**
   - Each component should have a single responsibility
   - Extract complex logic to custom hooks

6. **Make features modular**
   - Features should be self-contained and reusable
   - Avoid tight coupling with other features

7. **Test your code**
   - Write tests for components, hooks, and utilities
   - Test edge cases and error handling

## Related Documentation

- [Component System](../components/component-system.md) - Overview of the component system
- [Adding New Pages](./adding-new-pages.md) - How to create new pages
- [Project Structure](../getting-started/project-structure.md) - Overview of the codebase organization
