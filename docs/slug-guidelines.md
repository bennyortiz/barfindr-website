# BarFindr Slug Guidelines

This document outlines the guidelines for creating and managing URL slugs in the BarFindr application.

## What are Slugs?

Slugs are URL-friendly versions of a text string, typically a page title or name. They are used in URLs to identify a specific page in a human-readable way.

Example:
- Bar name: "The Roosevelt Room"
- Slug: `the-roosevelt-room`
- URL: `https://barfindr.com/bars/the-roosevelt-room`

## Benefits of Using Slugs

1. **SEO Benefits**: Search engines prefer descriptive URLs that contain relevant keywords.
2. **User Experience**: Users can understand what a page is about just by looking at the URL.
3. **Memorability**: Descriptive URLs are easier to remember than numeric IDs.
4. **Shareability**: Slugs make URLs more shareable and clickable in emails and messages.

## Slug Format Guidelines

All slugs in BarFindr should follow these formatting rules:

1. **Lowercase**: All slugs should be lowercase.
   - Example: `whislers` not `Whislers`

2. **Hyphens for Spaces**: Use hyphens to replace spaces.
   - Example: `the-white-horse` not `the_white_horse` or `thewhitehorse`

3. **No Special Characters**: Remove all special characters, including punctuation.
   - Example: `whislers` not `whisler's`

4. **No Trailing Hyphens**: Slugs should not start or end with hyphens.
   - Example: `dive-bar` not `-dive-bar-`

5. **Uniqueness**: Each slug must be unique across the entire application.
   - If a duplicate is detected, a number suffix will be added (e.g., `bar-name-2`)

## Slug Creation Process

When adding a new bar to BarFindr:

1. The slug is automatically generated from the bar name using the `generateSlug` function.
2. The system checks if the slug is unique.
3. If the slug is already in use, a number suffix is added to ensure uniqueness.

## Backward Compatibility

To maintain backward compatibility with existing links:

1. We've implemented a middleware that redirects requests with numeric IDs to the corresponding slug-based URL.
2. Example: `/bars/1` will redirect to `/bars/the-roosevelt-room`

## Adding New Bars

When adding new bars to the system:

1. Use the provided script: `node scripts/add-new-bar.js`
2. The script will prompt for all required information and automatically generate a slug.
3. The script will create the JSON file and update the data.ts file.

## Slug Structure for Different Content Types

Different types of content should follow consistent slug patterns:

1. **Bars**: `/bars/[bar-name]`
   - Example: `/bars/the-roosevelt-room`

2. **Categories**: `/categories/[type]/[value]`
   - Example: `/categories/neighborhood/downtown`

3. **Happy Hours**: `/happy-hours/[day]`
   - Example: `/happy-hours/monday`

## SEO Considerations

When creating content and slugs, consider these SEO best practices:

1. **Include Keywords**: Use relevant keywords in the bar name and description.
2. **Keep it Concise**: Shorter slugs are generally better for SEO.
3. **Be Descriptive**: The slug should accurately describe the content.
4. **Avoid Stop Words**: Consider removing words like "the", "and", "or" if the slug is too long.

## Troubleshooting

If you encounter issues with slugs:

1. **Duplicate Slugs**: Check the `ensureUniqueSlug` function in `slug-utils.ts`.
2. **Redirect Issues**: Check the middleware implementation in `middleware.ts`.
3. **Invalid Characters**: Ensure the slug follows the formatting guidelines above.

## Future Considerations

As the application scales:

1. **Database Storage**: Consider moving bar data to a database for easier management.
2. **Slug Generation API**: Create an API endpoint for generating and validating slugs.
3. **Slug History**: Implement a system to track slug changes and maintain redirects.
