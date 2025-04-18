"use client";

import { Button } from "@/core/components/ui/button";
import BarCard from "@/components/BarCard";
import { bars } from "@/lib/data";
import { MapPin, Search, Clock, Star } from "lucide-react";
import Link from "next/link";
import { Container } from "@/core/components/ui/container";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background z-10" />
          <div
            className="h-[50vh] md:h-[60vh] lg:h-[70vh] w-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=2070')" }}
          />
          <Container className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Discover Austin&apos;s <span className="text-primary">Best Bars</span>
            </h1>
            <p className="mt-4 max-w-3xl text-base sm:text-lg md:text-xl text-muted-foreground">
              Find the perfect spot for drinks, happy hours, and good times in Austin, TX.
            </p>
            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
              <Button size="default" className="w-full sm:w-auto" asChild>
                <Link href="/bars">Explore Bars</Link>
              </Button>
              <Button size="default" variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/map">View Map</Link>
              </Button>
            </div>
          </Container>
        </section>

        {/* Featured Bars Section */}
        <section className="py-8 sm:py-12 md:py-16">
          <Container>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Featured Bars</h2>
                <p className="text-sm sm:text-base text-muted-foreground">Discover some of Austin&apos;s most popular bars</p>
              </div>
              <Button variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/bars">View All</Link>
              </Button>
            </div>
            <div className="mt-8 md:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {bars.slice(0, 3).map((bar) => (
                <BarCard key={bar.id} bar={bar} />
              ))}
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-8 sm:py-12 md:py-16">
          <Container>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Everything You Need to Know</h2>
              <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                BarFindr helps you find the perfect bar for any occasion
              </p>
            </div>
            <div className="mt-10 md:mt-16 grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4 rounded-lg border border-border/40 bg-card/30">
                <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <h3 className="mt-3 md:mt-4 text-lg md:text-xl font-medium">Interactive Map</h3>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                  Find bars near you with our interactive map and get directions instantly
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg border border-border/40 bg-card/30">
                <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <h3 className="mt-3 md:mt-4 text-lg md:text-xl font-medium">Happy Hour Finder</h3>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                  Never miss a happy hour again with our comprehensive listings
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg border border-border/40 bg-card/30">
                <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                </div>
                <h3 className="mt-3 md:mt-4 text-lg md:text-xl font-medium">Verified Reviews</h3>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                  Read honest reviews from real customers to find your next favorite spot
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-8 sm:py-12 md:py-16 bg-primary/5">
          <Container>
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Ready to Find Your Next Favorite Bar?</h2>
              <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Start exploring Austin&apos;s vibrant bar scene today
              </p>
              <Button size="default" className="mt-6 md:mt-8 w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" /> Search Bars
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
