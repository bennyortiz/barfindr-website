# BarFindr Data Management

This document explains how data is managed in the BarFindr application, focusing on bar data structure, storage, and manipulation.

## Bar Data Structure

Each bar in the application follows this data structure:

```typescript
interface Bar {
  id: string;
  name: string;
  address: string;
  description: string;
  rating: number;
  imageUrl: string;
  hasHappyHour: boolean;
  happyHourDetails?: string;
  openingHours: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };
  tags: string[];
  location: {
    lat: number;
    lng: number;
  };
}
```

### Field Descriptions

- `id`: Unique identifier for the bar
- `name`: Name of the bar
- `address`: Full address of the bar
- `description`: Brief description of the bar
- `rating`: Rating from 0.0 to 5.0
- `imageUrl`: URL to the bar's image
- `hasHappyHour`: Whether the bar has a happy hour
- `happyHourDetails`: Details about the happy hour (required if hasHappyHour is true)
- `openingHours`: Opening hours for each day of the week
- `tags`: Array of tags for filtering
- `location`: Geographic coordinates for the map

## Data Storage

Bar data is stored in individual JSON files in the `src/data/bars/` directory. This approach provides several benefits:

1. **Maintainability**: Each bar is in its own file, making it easy to update or remove
2. **Organization**: Clear structure for adding new bars
3. **Scalability**: Can handle many bars without a single file becoming unwieldy
4. **Future-proofing**: Easy to migrate to a database or API in the future

### File Structure

```
src/data/bars/
├── _template.json         # Template for new bar data
├── schema.json            # JSON schema for bar data
├── README.md              # Documentation for bar data management
├── roosevelt-room.json    # Individual bar data file
├── whislers.json          # Individual bar data file
└── ...                    # Other bar data files
```

## Data Loading

The application loads bar data in two ways:

### Client-Side Loading

For client-side rendering, bar data is imported directly in `src/lib/data.ts`:

```typescript
// Import the static JSON files for each bar
import rooseveltRoom from "../data/bars/roosevelt-room.json";
import whislers from "../data/bars/whislers.json";
// ...other imports

// Export the bars array
export const bars: Bar[] = [
  rooseveltRoom,
  whislers,
  // ...other bars
] as Bar[];
```

### Server-Side Loading

For server-side operations (like the bar management script), data is loaded using the `loadBars` function in `src/lib/bar-data-loader.ts`:

```typescript
export function loadBars(): Bar[] {
  const barsDirectory = path.join(process.cwd(), 'src/data/bars');
  const fileNames = fs.readdirSync(barsDirectory);
  
  const bars: Bar[] = fileNames
    .filter(fileName => 
      fileName.endsWith('.json') && !fileName.startsWith('_')
    )
    .map(fileName => {
      const filePath = path.join(barsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents) as Bar;
    })
    .sort((a, b) => parseInt(a.id) - parseInt(b.id));
  
  return bars;
}
```

## Data Management Tools

### Bar Management Script

The application includes a script for managing bar data:

```bash
npm run manage-bars
```

This script provides the following functionality:

1. **Create new bar**: Add a new bar with all required fields
2. **Validate bar data**: Check all bar data for errors
3. **List all bars**: View a list of all bars in the application

### Data Validation

Bar data is validated using the `validateBar` function in `src/lib/bar-data-loader.ts`:

```typescript
export function validateBar(bar: Partial<Bar>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check required fields
  if (!bar.name) errors.push('Name is required');
  if (!bar.address) errors.push('Address is required');
  // ...other validation checks
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
```

## Adding a New Bar

### Method 1: Using the Management Script (Recommended)

1. Run the script:
   ```bash
   npm run manage-bars
   ```

2. Select option 1 to create a new bar.

3. Follow the prompts to enter the bar's details.

4. Update `src/lib/data.ts` to include the new bar:
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

3. Update `src/lib/data.ts` to include the new bar.

## Data Utilities

The application includes several utility functions for working with bar data:

### Bar Utilities (`src/utils/bar-utils.ts`)

- `getCurrentlyOpenBars`: Gets all bars that are currently open
- `getBarsWithHappyHour`: Gets all bars that have happy hour on a specific day
- `getDistance`: Calculates the distance between two geographic coordinates

### Date Utilities (`src/utils/date-utils.ts`)

- `getCurrentDay`: Gets the current day of the week
- `formatDate`: Formats a date in a human-readable format
- `isTimeInRange`: Checks if a time string is within a time range

## Custom Hooks

The application includes a custom hook for working with bar data:

### useBarData (`src/hooks/useBarData.ts`)

This hook provides filtering, sorting, and search functionality for bar data:

```typescript
const {
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
} = useBarData({
  bars,
  initialSearchQuery: "",
  initialTags: [],
  initialHappyHourOnly: false,
  initialSortBy: "default"
});
```

## Future Considerations

The current data management approach is designed to be easily migrated to a database or API in the future:

1. **API Integration**: The data loading mechanism can be replaced with API calls
2. **Database Migration**: The JSON file structure mirrors a database schema for easy migration
3. **Caching**: The current approach can be extended with client-side caching
4. **Real-time Updates**: The system can be enhanced to support real-time data updates
