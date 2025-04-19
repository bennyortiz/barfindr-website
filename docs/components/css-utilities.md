# CSS Utilities

This document provides an overview of the CSS utility classes available in the BarFindr application. These utilities help maintain consistency and make it easier to implement common patterns.

## Image Container

The `image-container` utility class provides a consistent way to display images in the application. It ensures that images properly fill their containers regardless of their original dimensions, and provides a smooth hover effect.

### Basic Usage

```jsx
import Image from 'next/image';

<div className="image-container aspect-video">
  <Image
    src="/path/to/image.jpg"
    alt="Description"
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

### Features

- Ensures images fill their container completely
- Provides a consistent background color while images are loading
- Adds a smooth scale animation on hover
- Works with Next.js Image component
- Responsive and accessible

### Options

#### Aspect Ratio

You can control the aspect ratio of the container using Tailwind's aspect ratio classes:

```jsx
// 16:9 aspect ratio
<div className="image-container aspect-video">
  <Image ... />
</div>

// 1:1 aspect ratio (square)
<div className="image-container aspect-square">
  <Image ... />
</div>

// 4:3 aspect ratio
<div className="image-container aspect-[4/3]">
  <Image ... />
</div>

// Custom aspect ratio
<div className="image-container aspect-[21:9]">
  <Image ... />
</div>
```

#### Disabling Hover Effect

If you don't want the hover effect, add the `no-hover` class:

```jsx
<div className="image-container no-hover aspect-video">
  <Image ... />
</div>
```

#### Width and Height

The container will take the width of its parent by default. You can control the width and height using Tailwind classes:

```jsx
// Full width
<div className="image-container w-full aspect-video">
  <Image ... />
</div>

// Fixed width
<div className="image-container w-64 aspect-square">
  <Image ... />
</div>

// Fixed height (with auto width)
<div className="image-container h-64">
  <Image ... />
</div>
```

### Examples

#### Card Image

```jsx
<Card>
  <div className="image-container aspect-video">
    <Image
      src={item.imageUrl}
      alt={item.name}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  </div>
  <CardContent>
    <h3>{item.name}</h3>
    <p>{item.description}</p>
  </CardContent>
</Card>
```

#### Hero Image

```jsx
<div className="image-container w-full h-[50vh]">
  <Image
    src="/hero-image.jpg"
    alt="Hero image"
    fill
    priority
    sizes="100vw"
  />
  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
    <h1 className="text-white text-4xl font-bold">Page Title</h1>
  </div>
</div>
```

#### Gallery Image

```jsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {images.map((image) => (
    <div key={image.id} className="image-container aspect-square">
      <Image
        src={image.url}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      />
    </div>
  ))}
</div>
```

### Implementation Details

The `image-container` utility class is defined in `src/app/globals.css` and includes the following CSS:

```css
.image-container {
  position: relative;
  overflow: hidden;
  background-color: var(--muted);
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img,
.image-container > span {
  object-fit: cover !important;
  object-position: center !important;
  width: 100% !important;
  height: 100% !important;
}

.image-container img {
  transition: transform 0.3s ease;
}

/* Apply hover effect only if not disabled */
.image-container:not(.no-hover):hover img {
  transform: scale(1.05);
}

/* Placeholder for when image is loading */
.image-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: var(--muted);
  z-index: -1;
}
```

## Prose

The `prose` utility class provides styling for long-form content, such as blog posts or articles. It's based on Tailwind's typography plugin.

### Basic Usage

```jsx
<div className="prose dark:prose-invert">
  <h1>Article Title</h1>
  <p>This is a paragraph of text...</p>
  <h2>Section Title</h2>
  <p>Another paragraph...</p>
  <ul>
    <li>List item 1</li>
    <li>List item 2</li>
  </ul>
</div>
```

### Options

#### Size Variants

```jsx
// Default size
<div className="prose">...</div>

// Larger text
<div className="prose prose-lg">...</div>

// Extra large text
<div className="prose prose-xl">...</div>

// Small text
<div className="prose prose-sm">...</div>
```

#### Dark Mode

```jsx
<div className="prose dark:prose-invert">...</div>
```

#### Full Width

By default, the prose class has a max-width. To remove it:

```jsx
<div className="prose max-w-none">...</div>
```

## Grid Layouts

Common grid layout patterns:

### Basic Grid

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* Grid items */}
</div>
```

### Auto-fit Grid

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
  {/* Grid items */}
</div>
```

### Two-Column Layout with Sidebar

```jsx
<div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
  <main>
    {/* Main content */}
  </main>
  <aside>
    {/* Sidebar content */}
  </aside>
</div>
```

## Responsive Spacing

Common responsive spacing patterns:

```jsx
// Responsive padding
<div className="p-4 md:p-6 lg:p-8">...</div>

// Responsive margin
<div className="my-4 md:my-6 lg:my-8">...</div>

// Responsive gap
<div className="flex flex-col gap-4 md:gap-6 lg:gap-8">...</div>
```

## Best Practices

1. **Use utility classes consistently**
   - Follow the established patterns
   - Use the same spacing values throughout the application

2. **Combine with Tailwind classes**
   - Utility classes can be combined with Tailwind classes
   - Use Tailwind for one-off styling needs

3. **Responsive design**
   - Use responsive variants for different screen sizes
   - Test on different devices

4. **Documentation**
   - Document new utility classes
   - Update this guide when adding new utilities

## Related Documentation

- [Component System](./component-system.md) - Overview of the component system
- [Styling Guidelines](../guides/styling-guidelines.md) - CSS and styling best practices
- [Design System](../reference/design-system.md) - Design tokens and variables
