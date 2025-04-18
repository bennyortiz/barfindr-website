"use client";

import { useState, useEffect } from "react";
import BarCard from "@/components/BarCard";
import { bars } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Calendar } from "lucide-react";
import { PageLayout } from "@/components/layout/page-layout";
import { Badge } from "@/components/ui/badge";

// Helper function to parse happy hour details and determine if a bar has happy hour on a specific day
const hasHappyHourOnDay = (happyHourDetails: string, day: string): boolean => {
  if (!happyHourDetails) return false;

  // Convert day to lowercase for case-insensitive matching
  const lowerDay = day.toLowerCase();
  const shortDay = day.substring(0, 3).toLowerCase();

  // Check for common patterns in happy hour descriptions
  return (
    happyHourDetails.toLowerCase().includes(lowerDay) ||
    happyHourDetails.toLowerCase().includes(shortDay) ||
    // Check for ranges like "Monday-Friday" or "Mon-Fri"
    (happyHourDetails.toLowerCase().includes("monday") &&
     happyHourDetails.toLowerCase().includes("friday") &&
     ["monday", "tuesday", "wednesday", "thursday", "friday"].includes(lowerDay)) ||
    (happyHourDetails.toLowerCase().includes("mon") &&
     happyHourDetails.toLowerCase().includes("fri") &&
     ["monday", "tuesday", "wednesday", "thursday", "friday"].includes(lowerDay)) ||
    // Check for "daily" or "everyday"
    happyHourDetails.toLowerCase().includes("daily") ||
    happyHourDetails.toLowerCase().includes("everyday") ||
    happyHourDetails.toLowerCase().includes("every day")
  );
};

export default function HappyHoursPage() {
  const happyHourBars = bars.filter((bar) => bar.hasHappyHour);
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Get current day of the week
  const [currentDay, setCurrentDay] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");

  useEffect(() => {
    // Get the current day of the week
    const today = new Date();
    const dayOfWeek = weekdays[today.getDay() === 0 ? 6 : today.getDay() - 1]; // Adjust for Sunday being 0
    setCurrentDay(dayOfWeek);
    setSelectedDay(dayOfWeek.toLowerCase());
  }, []);

  return (
    <PageLayout>
        <div className="flex flex-col gap-4 sm:gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Happy Hours</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
              Find the best happy hour deals in Austin
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-primary/5 p-3 sm:p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs sm:text-sm">
                Happy hours are a great way to enjoy your favorite bars at discounted prices.
                {currentDay && (
                  <span className="font-medium"> Today is <span className="text-primary">{currentDay}</span>.</span>
                )}
              </p>
              <p className="text-xs sm:text-sm mt-1">
                Select a day to see what's available or view all happy hours!
              </p>
            </div>
          </div>

          <Tabs defaultValue={selectedDay || "all"} onValueChange={setSelectedDay}>
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 overflow-x-auto">
              <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
              {weekdays.map((day) => (
                <TabsTrigger
                  key={day}
                  value={day.toLowerCase()}
                  className="text-xs sm:text-sm relative"
                >
                  {day.substring(0, 3)}
                  {day === currentDay && (
                    <Badge
                      className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground"
                      variant="default"
                    >
                      !
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="all" className="mt-4 sm:mt-6">
              <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {happyHourBars.length > 0 ? (
                  happyHourBars.map((bar) => (
                    <BarCard key={bar.id} bar={bar} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-lg text-muted-foreground">No happy hours found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            {weekdays.map((day) => {
              // Filter bars that have happy hour on this day
              const barsForDay = happyHourBars.filter(bar =>
                hasHappyHourOnDay(bar.happyHourDetails || "", day)
              );

              return (
                <TabsContent key={day} value={day.toLowerCase()} className="mt-4 sm:mt-6">
                  <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {barsForDay.length > 0 ? (
                      barsForDay.map((bar) => (
                        <BarCard key={bar.id} bar={bar} />
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <p className="text-lg text-muted-foreground">No happy hours found for {day}.</p>
                        <p className="text-sm text-muted-foreground mt-2">Try another day or view all happy hours.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>

          <div className="mt-6 sm:mt-8 md:mt-10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 sm:mb-4">
              {selectedDay === "all" ? "All Happy Hour Details" : `${selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)} Happy Hour Details`}
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {(selectedDay === "all" ? happyHourBars : happyHourBars.filter(bar =>
                hasHappyHourOnDay(bar.happyHourDetails || "", selectedDay)
              )).map((bar) => (
                <div key={bar.id} className="p-4 sm:p-5 border rounded-lg hover:border-primary/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
                    <div>
                      <h3 className="text-base sm:text-lg font-medium">{bar.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate max-w-[250px] sm:max-w-none">{bar.address}</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs sm:text-sm w-fit">
                      <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      <span>Happy Hour</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm sm:text-base border-t pt-3 text-muted-foreground">{bar.happyHourDetails}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {weekdays.map(day => (
                      hasHappyHourOnDay(bar.happyHourDetails || "", day) && (
                        <Badge
                          key={day}
                          variant={day === currentDay ? "default" : "outline"}
                          className="text-xs"
                        >
                          {day.substring(0, 3)}
                        </Badge>
                      )
                    ))}
                  </div>
                </div>
              ))}
              {(selectedDay !== "all" && happyHourBars.filter(bar =>
                hasHappyHourOnDay(bar.happyHourDetails || "", selectedDay)
              ).length === 0) && (
                <div className="text-center py-8 border rounded-lg">
                  <p className="text-lg text-muted-foreground">No happy hours found for {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}.</p>
                  <p className="text-sm text-muted-foreground mt-2">Try another day or view all happy hours.</p>
                </div>
              )}
            </div>
          </div>
        </div>
    </PageLayout>
  );
}
