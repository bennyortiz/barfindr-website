export interface Bar {
  id: string;
  name: string;
  slug: string; // URL-friendly version of the name
  address: string;
  description: string;
  rating: number; // Overall/average rating
  ratings: {
    google?: number;
    yelp?: number;
    internal?: number;
    // Add more rating sources as needed
  };
  imageUrl: string;
  hasHappyHour: boolean;
  happyHourDetails?: string;
  openingHours: {
    [key: string]: string;
  };
  tags: string[];
  location: {
    lat: number;
    lng: number;
  };
  type?: string; // Type of bar (e.g., dive bar, wine bar)
  priceRange?: number; // Price range (1-4, where 1 is cheap and 4 is expensive)
  neighborhood?: string; // Neighborhood (e.g., downtown, east austin)
  features?: string[]; // Special features (e.g., patio, rooftop)
  zipCode?: string; // ZIP code for more precise location filtering
}
