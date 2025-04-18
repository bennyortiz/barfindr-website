/**
 * Date Utility Functions
 * 
 * A collection of utility functions for working with dates.
 */

/**
 * Gets the current day of the week
 * @returns The current day of the week (e.g., "Monday")
 */
export function getCurrentDay(): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayIndex = new Date().getDay();
  return days[dayIndex];
}

/**
 * Formats a date in a human-readable format
 * @param date - The date to format
 * @returns A formatted date string (e.g., "January 1, 2023")
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

/**
 * Checks if a time string is within a time range
 * @param time - The time to check (e.g., "5:30pm")
 * @param range - The time range (e.g., "5pm-7pm")
 * @returns True if the time is within the range, false otherwise
 */
export function isTimeInRange(time: string, range: string): boolean {
  if (range === "Closed" || range === "Varies by bar") {
    return false;
  }

  // Parse the time range
  const [start, end] = range.split("-");
  
  // Convert all times to minutes since midnight for easy comparison
  const timeMinutes = timeToMinutes(time);
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);
  
  // Handle ranges that cross midnight
  if (endMinutes < startMinutes) {
    return timeMinutes >= startMinutes || timeMinutes <= endMinutes;
  }
  
  return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
}

/**
 * Converts a time string to minutes since midnight
 * @param time - The time string (e.g., "5:30pm")
 * @returns The number of minutes since midnight
 */
function timeToMinutes(time: string): number {
  // Normalize the time format
  time = time.toLowerCase().trim();
  
  let hours = 0;
  let minutes = 0;
  let isPM = time.includes("pm");
  
  // Remove am/pm and extract hours and minutes
  time = time.replace(/[ap]m/, "");
  
  if (time.includes(":")) {
    const [h, m] = time.split(":");
    hours = parseInt(h);
    minutes = parseInt(m);
  } else {
    hours = parseInt(time);
    minutes = 0;
  }
  
  // Convert to 24-hour format
  if (isPM && hours < 12) {
    hours += 12;
  } else if (!isPM && hours === 12) {
    hours = 0;
  }
  
  return hours * 60 + minutes;
}
