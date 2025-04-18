"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  MapPin,
  Star,
  Users,
  Utensils,
  Music,
  Calendar,
  MessageSquare
} from "lucide-react"
import { Bar } from "@/lib/types"

interface BarDetailTabsProps {
  bar: Bar;
}

export function BarDetailTabs({ bar }: BarDetailTabsProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{bar.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="about">
          <TabsList className="mb-6 w-full">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="hours">Hours</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-medium">About {bar.name}</h3>
                <p className="text-muted-foreground mt-2">
                  {bar.description}
                </p>
              </div>

              <div className="grid gap-3 mt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="size-5 text-primary" />
                  <span>{bar.address}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="size-5 text-primary" />
                  <span>Rating: {bar.rating}/5</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="size-5 text-primary" />
                  <span>Popular for: {bar.tags.join(", ")}</span>
                </div>
              </div>

              {bar.hasHappyHour && (
                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <h3 className="text-lg font-medium flex items-center gap-2 text-primary">
                    <Clock className="size-5 text-primary" />
                    Happy Hour
                  </h3>
                  <p className="mt-2">{bar.happyHourDetails}</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="hours">
            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-medium">Opening Hours</h3>
                <p className="text-muted-foreground mt-2">
                  When you can visit {bar.name}
                </p>
              </div>

              <div className="grid gap-3 mt-4">
                {Object.entries(bar.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center py-2 border-b border-border/40">
                    <span className="font-medium">{day}</span>
                    <span className="text-muted-foreground">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="menu">
            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-medium">Menu Highlights</h3>
                <p className="text-muted-foreground mt-2">
                  Popular drinks and food at {bar.name}
                </p>
              </div>

              <div className="grid gap-6 mt-4">
                <div>
                  <h4 className="font-medium flex items-center gap-2 mb-3">
                    <Utensils className="size-4 text-primary" />
                    Signature Cocktails
                  </h4>
                  <div className="grid gap-3">
                    <div className="flex justify-between items-center">
                      <span>Austin Mule</span>
                      <span className="text-muted-foreground">$12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Texas Old Fashioned</span>
                      <span className="text-muted-foreground">$14</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Violet Crown Fizz</span>
                      <span className="text-muted-foreground">$13</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium flex items-center gap-2 mb-3">
                    <Utensils className="size-4 text-primary" />
                    Bar Snacks
                  </h4>
                  <div className="grid gap-3">
                    <div className="flex justify-between items-center">
                      <span>Loaded Nachos</span>
                      <span className="text-muted-foreground">$10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Spicy Wings</span>
                      <span className="text-muted-foreground">$12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Truffle Fries</span>
                      <span className="text-muted-foreground">$8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-medium">Upcoming Events</h3>
                <p className="text-muted-foreground mt-2">
                  What&apos;s happening at {bar.name}
                </p>
              </div>

              <div className="grid gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="size-5 text-primary" />
                    <span className="font-medium">Live Music Night</span>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Local bands perform every Friday night from 8pm to midnight.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Every Friday, 8:00 PM - 12:00 AM
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="size-5 text-primary" />
                    <span className="font-medium">Trivia Night</span>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Test your knowledge with our weekly trivia competition.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Every Wednesday, 7:00 PM - 9:00 PM
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Music className="size-5 text-primary" />
                    <span className="font-medium">DJ Night</span>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Dance to the latest hits with our resident DJ.
                  </p>
                  <div className="text-sm text-muted-foreground">
                    Every Saturday, 9:00 PM - 2:00 AM
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <p className="text-muted-foreground mt-2">
                  What people are saying about {bar.name}
                </p>
              </div>

              <div className="grid gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Sarah Johnson</div>
                    <div className="flex items-center">
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 fill-primary text-primary" />
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    &quot;Amazing atmosphere and great cocktails! The happy hour deals are unbeatable.&quot;
                  </p>
                  <div className="text-xs text-muted-foreground">
                    2 weeks ago
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Michael Rodriguez</div>
                    <div className="flex items-center">
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    &quot;Great spot for after-work drinks. The bartenders are friendly and knowledgeable.&quot;
                  </p>
                  <div className="text-xs text-muted-foreground">
                    1 month ago
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Emily Chen</div>
                    <div className="flex items-center">
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 fill-primary text-primary" />
                      <Star className="size-4 fill-primary text-primary" />
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    &quot;Love the vibe here! The music is always on point and the drinks are delicious.&quot;
                  </p>
                  <div className="text-xs text-muted-foreground">
                    2 months ago
                  </div>
                </div>

                <Button variant="outline" className="mt-2 w-full">
                  <MessageSquare className="mr-2 size-4" />
                  Write a Review
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
