import { Bar } from "./types";
import { loadBars } from "./bar-data-loader";

// For client-side rendering, we need to have a static array
// This is because Next.js can't use fs module on the client side
// In a real production app, this would be fetched from an API

// Import the static JSON files for each bar
import rooseveltRoom from "../data/bars/roosevelt-room.json";
import whislers from "../data/bars/whislers.json";
import raineyStreetBars from "../data/bars/rainey-street-bars.json";
import midnightCowboy from "../data/bars/midnight-cowboy.json";
import whiteHorse from "../data/bars/white-horse.json";
import firehouseLounge from "../data/bars/firehouse-lounge.json";

// Export the bars array
export const bars: Bar[] = [
  rooseveltRoom,
  whislers,
  raineyStreetBars,
  midnightCowboy,
  whiteHorse,
  firehouseLounge
] as Bar[];

// In a server component or API route, you could use this instead:
// export async function getBars() {
//   return loadBars();
// }
