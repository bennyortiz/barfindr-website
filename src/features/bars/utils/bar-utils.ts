/**
 * Bar Utility Functions
 *
 * A collection of utility functions for working with bar data.
 */

import { Bar } from "@/lib/types";
import { getCurrentDay } from "./date-utils";

/**
 * Gets all bars that are currently open
 * @param bars - Array of all bars
 * @returns Array of bars that are currently open
 */
export function getCurrentlyOpenBars(bars: Bar[]): Bar[] {
  const currentDay = getCurrentDay();
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  }).toLowerCase();

  return bars.filter(bar => {
    const hours = bar.openingHours[currentDay];

    // Skip bars that are closed or have variable hours
    if (hours === "Closed" || hours === "Varies by bar") {
      return false;
    }

    // Parse the opening hours
    const [open, close] = hours.split("-");

    // Convert all times to minutes since midnight for easy comparison
    const currentMinutes = timeToMinutes(currentTime);
    const openMinutes = timeToMinutes(open);
    const closeMinutes = timeToMinutes(close);

    // Handle ranges that cross midnight
    if (closeMinutes < openMinutes) {
      return currentMinutes >= openMinutes || currentMinutes <= closeMinutes;
    }

    return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
  });
}

/**
 * Gets all bars that have happy hour on a specific day
 * @param bars - Array of all bars
 * @param day - The day to check (defaults to current day)
 * @returns Array of bars with happy hour on the specified day
 */
export function getBarsWithHappyHour(bars: Bar[], day?: string): Bar[] {
  const targetDay = day || getCurrentDay();

  return bars.filter(bar => {
    if (!bar.hasHappyHour || !bar.happyHourDetails) {
      return false;
    }

    // Check if the happy hour details mention the target day
    // This is a simple check and might need to be more sophisticated
    // depending on how happy hour details are formatted
    const details = bar.happyHourDetails.toLowerCase();

    if (details.includes("daily") || details.includes("every day")) {
      return true;
    }

    if (targetDay === "Monday" && (details.includes("monday") || details.includes("mon"))) {
      return true;
    }

    if (targetDay === "Tuesday" && (details.includes("tuesday") || details.includes("tue"))) {
      return true;
    }

    if (targetDay === "Wednesday" && (details.includes("wednesday") || details.includes("wed"))) {
      return true;
    }

    if (targetDay === "Thursday" && (details.includes("thursday") || details.includes("thu"))) {
      return true;
    }

    if (targetDay === "Friday" && (details.includes("friday") || details.includes("fri"))) {
      return true;
    }

    if (targetDay === "Saturday" && (details.includes("saturday") || details.includes("sat"))) {
      return true;
    }

    if (targetDay === "Sunday" && (details.includes("sunday") || details.includes("sun"))) {
      return true;
    }

    return false;
  });
}

/**
 * Calculates the distance between two geographic coordinates
 * @param lat1 - Latitude of the first point
 * @param lng1 - Longitude of the first point
 * @param lat2 - Latitude of the second point
 * @param lng2 - Longitude of the second point
 * @returns Distance in miles
 */
export function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  // Haversine formula to calculate distance between two points on Earth
  const R = 3958.8; // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

/**
 * Converts degrees to radians
 * @param degrees - Angle in degrees
 * @returns Angle in radians
 */
function toRadians(degrees: number): number {
  return degrees * Math.PI / 180;
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
  const isPM = time.includes("pm");

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
