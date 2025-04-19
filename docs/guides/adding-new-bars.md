# Adding New Bars

This guide explains how to add new bars to the BarFindr application.

## Overview

Bar data in BarFindr is stored as individual JSON files in the `src/data/bars` directory. Each bar has its own file, which makes it easy to add, update, or remove bars without affecting the rest of the application.

## Using the Add Bar Script

The easiest way to add a new bar is to use the provided script:

```bash
node scripts/add-new-bar.js
```

This script will:

1. Prompt you for the bar's information
2. Generate a unique ID and slug for the bar
3. Create a new JSON file in the `src/data/bars` directory
4. Update the imports in `src/lib/data.ts`

## Manual Process

If you prefer to add a bar manually, follow these steps:

### 1. Create a New JSON File

Create a new JSON file in the `src/data/bars` directory. The file name should be the bar's slug (lowercase, hyphenated name).

For example, for a bar named "The Whiskey Room", create a file named `the-whiskey-room.json`.

### 2. Add the Bar Data

Add the bar's data to the JSON file using the following structure:

```json
{
  "id": "the-whiskey-room",
  "name": "The Whiskey Room",
  "slug": "the-whiskey-room",
  "description": "A cozy whiskey bar with over 200 varieties of whiskey from around the world.",
  "imageUrl": "/images/bars/the-whiskey-room.jpg",
  "address": {
    "street": "123 Main St",
    "city": "Austin",
    "state": "TX",
    "zip": "78701"
  },
  "location": {
    "lat": 30.267153,
    "lng": -97.743057
  },
  "phone": "512-555-1234",
  "website": "https://thewhiskeyroom.com",
  "hours": {
    "monday": "4:00 PM - 12:00 AM",
    "tuesday": "4:00 PM - 12:00 AM",
    "wednesday": "4:00 PM - 12:00 AM",
    "thursday": "4:00 PM - 2:00 AM",
    "friday": "4:00 PM - 2:00 AM",
    "saturday": "2:00 PM - 2:00 AM",
    "sunday": "2:00 PM - 12:00 AM"
  },
  "happyHour": {
    "monday": "4:00 PM - 7:00 PM",
    "tuesday": "4:00 PM - 7:00 PM",
    "wednesday": "4:00 PM - 7:00 PM",
    "thursday": "4:00 PM - 7:00 PM",
    "friday": "4:00 PM - 7:00 PM",
    "saturday": null,
    "sunday": null
  },
  "price": "$$",
  "tags": ["whiskey", "cocktails", "speakeasy"],
  "features": ["live-music", "outdoor-seating", "food"],
  "neighborhood": "downtown",
  "rating": 4.5,
  "reviews": 120
}
```

### 3. Update the Data Imports

Update the `src/lib/data.ts` file to import your new bar:

```typescript
// src/lib/data.ts

// Import existing bars
import bar1 from '@/data/bars/bar-1.json';
import bar2 from '@/data/bars/bar-2.json';
// Add your new bar import
import theWhiskeyRoom from '@/data/bars/the-whiskey-room.json';

// Export the bars array
export const bars = [
  bar1,
  bar2,
  // Add your new bar to the array
  theWhiskeyRoom,
];
```

## Bar Data Structure

When adding a new bar, make sure to include all the required fields:

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `id` | string | Unique identifier for the bar | Yes |
| `name` | string | Name of the bar | Yes |
| `slug` | string | URL-friendly version of the name | Yes |
| `description` | string | Description of the bar | Yes |
| `imageUrl` | string | URL to the bar's image | Yes |
| `address` | object | Address of the bar | Yes |
| `location` | object | Geographic coordinates of the bar | Yes |
| `phone` | string | Phone number of the bar | No |
| `website` | string | Website URL of the bar | No |
| `hours` | object | Opening hours for each day of the week | Yes |
| `happyHour` | object | Happy hour times for each day of the week | No |
| `price` | string | Price range ($ to $$$$) | Yes |
| `tags` | array | Tags describing the bar | Yes |
| `features` | array | Features of the bar | No |
| `neighborhood` | string | Neighborhood where the bar is located | Yes |
| `rating` | number | Average rating (0-5) | No |
| `reviews` | number | Number of reviews | No |

### Address Object

```json
"address": {
  "street": "123 Main St",
  "city": "Austin",
  "state": "TX",
  "zip": "78701"
}
```

### Location Object

```json
"location": {
  "lat": 30.267153,
  "lng": -97.743057
}
```

### Hours Object

```json
"hours": {
  "monday": "4:00 PM - 12:00 AM",
  "tuesday": "4:00 PM - 12:00 AM",
  "wednesday": "4:00 PM - 12:00 AM",
  "thursday": "4:00 PM - 2:00 AM",
  "friday": "4:00 PM - 2:00 AM",
  "saturday": "2:00 PM - 2:00 AM",
  "sunday": "2:00 PM - 12:00 AM"
}
```

### Happy Hour Object

```json
"happyHour": {
  "monday": "4:00 PM - 7:00 PM",
  "tuesday": "4:00 PM - 7:00 PM",
  "wednesday": "4:00 PM - 7:00 PM",
  "thursday": "4:00 PM - 7:00 PM",
  "friday": "4:00 PM - 7:00 PM",
  "saturday": null,
  "sunday": null
}
```

## Adding Bar Images

Bar images should be placed in the `public/images/bars` directory. The image URL in the bar data should be relative to the `public` directory.

For example, if your image is at `public/images/bars/the-whiskey-room.jpg`, the `imageUrl` in the bar data should be `/images/bars/the-whiskey-room.jpg`.

## Best Practices

1. **Use high-quality images**
   - Images should be at least 800x600 pixels
   - Use JPG or WebP format for better performance
   - Optimize images for web (compress them)

2. **Write detailed descriptions**
   - Include what makes the bar unique
   - Mention signature drinks or features
   - Keep descriptions between 100-200 characters

3. **Be accurate with data**
   - Double-check hours and happy hour times
   - Verify the address and location coordinates
   - Use the correct neighborhood name

4. **Use consistent tags**
   - Use existing tags when possible
   - Keep tags lowercase and hyphenated
   - Limit to 3-5 most relevant tags

5. **Follow the slug guidelines**
   - Use lowercase letters
   - Replace spaces with hyphens
   - Remove special characters
   - Keep it short and descriptive

## Related Documentation

- [Project Structure](../getting-started/project-structure.md) - Overview of the codebase organization
- [Slug Guidelines](../reference/slug-guidelines.md) - Guidelines for creating slugs
