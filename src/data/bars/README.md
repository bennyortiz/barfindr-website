# BarFindr Bar Data Management

This directory contains the data for all bars in the BarFindr application. Each bar is stored in its own JSON file, making it easy to add, update, or remove bars.

## Bar Data Structure

Each bar has the following structure:

```json
{
  "id": "1",                    // Unique identifier
  "name": "Bar Name",           // Name of the bar
  "address": "123 Main St...",  // Full address
  "description": "Description...", // Brief description
  "rating": 4.5,                // Rating from 0.0 to 5.0
  "imageUrl": "https://...",    // URL to the bar's image
  "hasHappyHour": true,         // Whether the bar has a happy hour
  "happyHourDetails": "...",    // Details about the happy hour (if applicable)
  "openingHours": {             // Opening hours for each day of the week
    "Monday": "5pm-2am",
    "Tuesday": "5pm-2am",
    "Wednesday": "5pm-2am",
    "Thursday": "5pm-2am",
    "Friday": "5pm-2am",
    "Saturday": "5pm-2am",
    "Sunday": "5pm-12am"
  },
  "tags": ["Tag1", "Tag2"],     // Array of tags for filtering
  "location": {                 // Geographic coordinates for the map
    "lat": 30.267153,
    "lng": -97.745254
  }
}
```

## Adding a New Bar

### Method 1: Using the Management Script (Recommended)

The easiest way to add a new bar is to use the management script:

1. Run the script from the project root:
   ```
   node scripts/manage-bars.js
   ```

2. Select option 1 to create a new bar.

3. Follow the prompts to enter the bar's details.

4. The script will create a new JSON file for the bar.

5. Update `src/lib/data.ts` to include the new bar:
   ```typescript
   import newBar from "../data/bars/new-bar.json";
   
   export const bars: Bar[] = [
     // ... existing bars
     newBar
   ] as Bar[];
   ```

### Method 2: Manual Addition

1. Copy the `_template.json` file and rename it to match your bar's name (use kebab-case).

2. Fill in all the required fields in the JSON file.

3. Generate a unique ID by finding the highest existing ID and adding 1.

4. Update `src/lib/data.ts` to include the new bar:
   ```typescript
   import newBar from "../data/bars/new-bar.json";
   
   export const bars: Bar[] = [
     // ... existing bars
     newBar
   ] as Bar[];
   ```

## Validating Bar Data

To ensure all bar data is valid:

1. Run the management script:
   ```
   node scripts/manage-bars.js
   ```

2. Select option 2 to validate bar data.

3. The script will check all bar files and report any errors.

## Finding Coordinates for a Bar

To find the latitude and longitude for a bar:

1. Go to [Google Maps](https://www.google.com/maps).
2. Search for the bar's address.
3. Right-click on the location and select "What's here?".
4. The coordinates will appear in the info card at the bottom of the screen.
5. Use these coordinates for the `location` field in the bar's JSON file.

## Best Practices

- Use high-quality images that are properly sized (recommended: 1000px width).
- Write concise but informative descriptions (50-150 characters).
- Be consistent with tag names across bars.
- Verify the address and coordinates are accurate.
- Include detailed happy hour information when applicable.
- Use the validation tool to ensure all data is complete and correct.
