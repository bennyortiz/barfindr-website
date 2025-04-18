export interface Bar {
  id: string;
  name: string;
  address: string;
  description: string;
  rating: number;
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
}
