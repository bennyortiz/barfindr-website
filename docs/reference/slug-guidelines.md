# Slug Guidelines

This document provides guidelines for creating slugs in the BarFindr application.

## What is a Slug?

A slug is a URL-friendly version of a string. It's typically used in URLs to represent a resource in a human-readable way. For example, a bar named "The Roosevelt Room" might have a slug of "the-roosevelt-room".

## Slug Format

Slugs in BarFindr should follow these rules:

1. **Lowercase**: All characters should be lowercase
2. **Hyphens**: Spaces should be replaced with hyphens
3. **Alphanumeric**: Only letters, numbers, and hyphens are allowed
4. **No special characters**: Special characters should be removed or replaced
5. **No trailing hyphens**: Slugs should not start or end with a hyphen
6. **No consecutive hyphens**: Slugs should not contain consecutive hyphens

## Creating Slugs

### Using the `slugify` Function

BarFindr provides a `slugify` function in `src/lib/utils.ts` that converts a string to a slug:

```typescript
import { slugify } from "@/lib/utils";

const slug = slugify("The Roosevelt Room"); // "the-roosevelt-room"
```

### Implementation

```typescript
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}
```

## Examples

| Original | Slug |
|----------|------|
| The Roosevelt Room | the-roosevelt-room |
| Whisler's | whislers |
| Drink.Well | drinkwell |
| Half Step | half-step |
| Small Victory | small-victory |
| The White Horse | the-white-horse |
| Nickel City | nickel-city |
| Garage | garage |
| The Driskill Bar | the-driskill-bar |
| Midnight Cowboy | midnight-cowboy |
| Seven Grand | seven-grand |
| The Little Darlin' | the-little-darlin |
| Kitty Cohen's | kitty-cohens |
| The Elephant Room | the-elephant-room |
| The Townsend | the-townsend |
| The Cloak Room | the-cloak-room |
| The Liberty | the-liberty |
| Stay Gold | stay-gold |
| The Wheel | the-wheel |
| King Bee Lounge | king-bee-lounge |

## Special Cases

### Ampersands

Ampersands (`&`) should be replaced with "and":

| Original | Slug |
|----------|------|
| Gin & Tonic | gin-and-tonic |
| Salt & Time | salt-and-time |

### Apostrophes

Apostrophes should be removed:

| Original | Slug |
|----------|------|
| Whisler's | whislers |
| Kitty Cohen's | kitty-cohens |
| The Little Darlin' | the-little-darlin |

### Periods

Periods should be removed:

| Original | Slug |
|----------|------|
| Drink.Well | drinkwell |
| P.Terry's | pterrys |

### Numbers

Numbers should be kept as is:

| Original | Slug |
|----------|------|
| Seven Grand | seven-grand |
| 6th Street | 6th-street |
| Bar 96 | bar-96 |

## Slug Uniqueness

Slugs must be unique across all bars. If a slug already exists, you should add a suffix to make it unique:

| Original | Slug |
|----------|------|
| The Bar | the-bar |
| The Bar (Downtown) | the-bar-downtown |

## Slug Length

Slugs should be concise but descriptive. Aim for slugs that are:

- **Minimum**: 3 characters
- **Maximum**: 50 characters
- **Ideal**: 20-30 characters

## Slug Usage

Slugs are used in several places in the BarFindr application:

1. **URLs**: Slugs are used in URLs to identify bars
2. **Data Files**: Bar data files are named using slugs
3. **Data References**: Bars are referenced by slug in the codebase

### URLs

Slugs are used in URLs to identify bars:

```
https://barfindr.com/bars/the-roosevelt-room
```

### Data Files

Bar data files are named using slugs:

```
src/data/bars/the-roosevelt-room.json
```

### Data References

Bars are referenced by slug in the codebase:

```typescript
import { getBar } from "@/lib/bar-data";

const bar = getBar("the-roosevelt-room");
```

## Best Practices

1. **Keep slugs simple**
   - Use simple, descriptive slugs
   - Avoid unnecessary words

2. **Be consistent**
   - Follow the slug format consistently
   - Use the `slugify` function to create slugs

3. **Check for uniqueness**
   - Ensure slugs are unique across all bars
   - Add suffixes if needed

4. **Update slugs carefully**
   - Changing a slug will break existing links
   - Consider adding redirects for changed slugs

5. **Document special cases**
   - Document any special cases or exceptions
   - Explain the reasoning behind them

## Related Documentation

- [Adding New Bars](../guides/adding-new-bars.md) - How to add new bar data
- [Data Management](../architecture/data-management.md) - How data is stored and managed
