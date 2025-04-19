# Adding New Pages

This guide explains how to add new pages to the BarFindr application, following the established patterns and best practices.

## Page Types

BarFindr uses several page types, each with its own layout and purpose:

1. **Standard Pages**: Content-focused pages with optional title and description
2. **Detail Pages**: Entity detail pages with a hero section
3. **List Pages**: Pages that display lists of items with filtering
4. **Special Pages**: Pages with unique layouts for specific purposes

## Step-by-Step Guide

### 1. Determine the Page Type

First, determine which type of page you need to create:

- Use **Standard Page** for most content pages
- Use **Detail Page** for entity detail pages (bars, restaurants, etc.)
- Use **List Page** for pages that display lists of items
- Create a custom layout for special pages

### 2. Create the Page File

Create a new file in the appropriate directory under `src/app`. The file name and directory structure will determine the URL path.

For example:
- `src/app/about/page.tsx` will be accessible at `/about`
- `src/app/bars/specials/page.tsx` will be accessible at `/bars/specials`

### 3. Use the Appropriate Layout Component

Import and use the appropriate layout component for your page type:

#### Standard Page Example

```tsx
"use client";

import { StandardPage } from "@/core/components/layout/StandardPage";

export default function AboutPage() {
  return (
    <StandardPage
      title="About BarFindr"
      description="Learn more about the BarFindr application and its features"
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          BarFindr is an application designed to help you discover the best bars in Austin, TX.
          Whether you're looking for happy hour deals, craft cocktails, or live music, BarFindr
          has you covered.
        </p>
        {/* More content */}
      </div>
    </StandardPage>
  );
}
```

#### Detail Page Example

```tsx
"use client";

import { DetailPage } from "@/core/components/layout/DetailPage";
import { Hero } from "@/core/components/ui/hero";
import { useParams } from "next/navigation";
import { getBar } from "@/lib/bar-data";
import { notFound } from "next/navigation";

export default function BarDetailPage() {
  const params = useParams();
  const idOrSlug = String(params.id);
  const bar = getBar(idOrSlug);

  if (!bar) {
    notFound();
  }

  return (
    <DetailPage
      hero={
        <Hero
          title={bar.name}
          image={bar.imageUrl}
          badges={bar.tags}
        />
      }
    >
      <div className="grid gap-6 md:gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          {/* Main content */}
        </div>
        <div>
          {/* Sidebar content */}
        </div>
      </div>
    </DetailPage>
  );
}
```

#### List Page Example

```tsx
"use client";

import { useState } from "react";
import { StandardPage } from "@/core/components/layout/StandardPage";
import { BarCard } from "@/features/bars/components/BarCard";
import { BarFilter } from "@/features/bars/components/BarFilter";
import { bars } from "@/lib/data";

export default function BarsPage() {
  const [filteredBars, setFilteredBars] = useState(bars);

  return (
    <StandardPage
      title="Bars in Austin"
      description="Discover the best bars Austin has to offer"
    >
      <div className="flex flex-col gap-6">
        <BarFilter onFilterChange={setFilteredBars} />
        
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBars.map((bar) => (
            <BarCard key={bar.id} bar={bar} />
          ))}
        </div>
      </div>
    </StandardPage>
  );
}
```

### 4. Add Metadata (Optional)

For static metadata, you can export a `metadata` object:

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BarFindr",
  description: "Learn more about the BarFindr application and its features",
};
```

For dynamic metadata, you can use the `generateMetadata` function:

```tsx
import { Metadata } from "next";
import { getBar } from "@/lib/bar-data";

export async function generateMetadata({ params }): Promise<Metadata> {
  const bar = getBar(params.id);
  
  if (!bar) {
    return {
      title: "Bar Not Found",
      description: "The requested bar could not be found",
    };
  }
  
  return {
    title: `${bar.name} | BarFindr`,
    description: bar.description,
  };
}
```

### 5. Add Structured Data (Optional)

For SEO, you can add structured data to your pages:

```tsx
import Script from "next/script";
import { generateBarStructuredData } from "@/lib/structured-data";

export default function BarDetailPage() {
  // ...

  return (
    <>
      <Script
        id="bar-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBarStructuredData(bar)),
        }}
      />
      <DetailPage>
        {/* ... */}
      </DetailPage>
    </>
  );
}
```

### 6. Add Client-Side Interactivity

For client-side interactivity, use React hooks and event handlers:

```tsx
"use client";

import { useState } from "react";
import { StandardPage } from "@/core/components/layout/StandardPage";
import { Button } from "@/core/components/ui/button";

export default function InteractivePage() {
  const [count, setCount] = useState(0);

  return (
    <StandardPage title="Interactive Page">
      <div className="flex flex-col items-center gap-4">
        <p>Count: {count}</p>
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
      </div>
    </StandardPage>
  );
}
```

### 7. Add Navigation Links

Update the navigation links in the Navbar component to include your new page:

```tsx
// src/core/components/layout/Navbar.tsx

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/bars", label: "Bars" },
  { href: "/map", label: "Map" },
  { href: "/happy-hours", label: "Happy Hours" },
  { href: "/about", label: "About" }, // Add your new page here
];
```

## Best Practices

1. **Use the appropriate layout component**
   - Choose the layout that best fits your page's purpose
   - Customize the layout with props as needed

2. **Follow the established patterns**
   - Look at existing pages for guidance
   - Maintain consistency in structure and styling

3. **Use components from the component system**
   - Reuse existing components when possible
   - Create new components when needed

4. **Add proper metadata and structured data**
   - Improve SEO with descriptive metadata
   - Use structured data for rich search results

5. **Make pages responsive**
   - Use responsive design patterns
   - Test on different screen sizes

6. **Add proper error handling**
   - Handle loading states
   - Handle error states
   - Use the `notFound` function for 404 errors

7. **Document your page**
   - Add JSDoc comments to explain the page's purpose
   - Update documentation if needed

## Examples

### About Page

```tsx
"use client";

import { StandardPage } from "@/core/components/layout/StandardPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BarFindr",
  description: "Learn more about the BarFindr application and its features",
};

export default function AboutPage() {
  return (
    <StandardPage
      title="About BarFindr"
      description="Learn more about our mission and features"
    >
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>Our Mission</h2>
        <p>
          BarFindr was created to help people discover the best bars in Austin, TX.
          We believe that finding the perfect spot for drinks shouldn't be difficult,
          and we're here to make it easier.
        </p>
        
        <h2>Features</h2>
        <ul>
          <li>Comprehensive bar listings with detailed information</li>
          <li>Interactive map to find bars near you</li>
          <li>Happy hour finder to get the best deals</li>
          <li>Filtering by various attributes like neighborhood, price, and features</li>
        </ul>
        
        <h2>Contact Us</h2>
        <p>
          Have questions or suggestions? We'd love to hear from you!
          Email us at <a href="mailto:contact@barfindr.com">contact@barfindr.com</a>.
        </p>
      </div>
    </StandardPage>
  );
}
```

### Contact Page

```tsx
"use client";

import { useState } from "react";
import { StandardPage } from "@/core/components/layout/StandardPage";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Textarea } from "@/core/components/ui/textarea";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <StandardPage
      title="Contact Us"
      description="Get in touch with the BarFindr team"
    >
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </StandardPage>
  );
}
```

## Related Documentation

- [Layout System](../components/layout-system.md) - Documentation for layout components
- [Component System](../components/component-system.md) - Overview of the component system
- [Adding New Features](./adding-new-features.md) - How to add new features
