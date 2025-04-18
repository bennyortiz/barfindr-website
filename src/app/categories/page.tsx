"use client";

import { StandardPage } from "@/core/components/layout/StandardPage";
import Link from "next/link";
import { motion } from "framer-motion";
import { designSystem } from "@/lib/design-system";
import {
  Utensils, MapPin, DollarSign, Beer, Calendar,
  Music, Umbrella, Building, Users, Clock, Wine, Coffee
} from "lucide-react";

// Define category groups
const categories = [
  {
    title: "Bar Features",
    icon: <Umbrella className="h-5 w-5" />,
    items: [
      { name: "Patio", href: "/categories/feature/patio" },
      { name: "Rooftop", href: "/categories/feature/rooftop" },
      { name: "Live Music", href: "/categories/feature/live-music" },
      { name: "Dog Friendly", href: "/categories/feature/dog-friendly" },
      { name: "Craft Beer", href: "/categories/feature/craft-beer" },
      { name: "Sports Bar", href: "/categories/feature/sports-bar" },
      { name: "Cocktail Bar", href: "/categories/feature/cocktail-bar" },
    ]
  },
  {
    title: "Neighborhoods",
    icon: <MapPin className="h-5 w-5" />,
    items: [
      { name: "Downtown", href: "/categories/neighborhood/downtown" },
      { name: "East Austin", href: "/categories/neighborhood/east-austin" },
      { name: "South Congress", href: "/categories/neighborhood/south-congress" },
      { name: "Rainey Street", href: "/categories/neighborhood/rainey-street" },
    ]
  },
  {
    title: "Price Range",
    icon: <DollarSign className="h-5 w-5" />,
    items: [
      { name: "Budget Friendly", href: "/categories/price/cheap" },
      { name: "Moderately Priced", href: "/categories/price/moderate" },
      { name: "Upscale", href: "/categories/price/upscale" },
    ]
  },
  {
    title: "Bar Types",
    icon: <Beer className="h-5 w-5" />,
    items: [
      { name: "Dive Bars", href: "/categories/type/dive-bar" },
      { name: "Wine Bars", href: "/categories/type/wine-bar" },
      { name: "Pubs", href: "/categories/type/pub" },
      { name: "Lounges", href: "/categories/type/lounge" },
    ]
  },
  {
    title: "Occasions",
    icon: <Calendar className="h-5 w-5" />,
    items: [
      { name: "Date Night", href: "/categories/occasion/date-night" },
      { name: "Group Outings", href: "/categories/occasion/group-outings" },
      { name: "Happy Hour", href: "/categories/occasion/happy-hour" },
    ]
  },
];

/**
 * Categories page that links to all attribute-based pages
 *
 * This page serves as a hub for SEO, allowing search engines to discover
 * all the attribute pages and users to browse by different categories.
 */
export default function CategoriesPage() {
  return (
    <StandardPage
      title="Browse Austin Bars by Category"
      description="Explore Austin's bar scene by features, neighborhoods, price range, and more"
    >
      <div className="space-y-12">
        {/* Intro section */}
        <section className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Discover the perfect bar for any occasion in Austin. Browse our comprehensive
            directory organized by features, neighborhoods, price ranges, and more to find
            exactly what you're looking for.
          </p>
        </section>

        {/* Categories grid */}
        <div className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: categoryIndex * 0.1,
                ease: designSystem.animation.timingFunctions["apple-standard"]
              }}
              className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-apple-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                  {category.icon}
                </div>
                <h2 className="text-xl font-semibold">{category.title}</h2>
              </div>

              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.2 + (categoryIndex * 0.1) + (itemIndex * 0.05),
                      ease: designSystem.animation.timingFunctions["apple-standard"]
                    }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-center text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600 group-hover:bg-primary-500 mr-2 transition-colors"></span>
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* SEO content */}
        <section className="prose prose-lg dark:prose-invert max-w-none pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <h2>Exploring Austin's Diverse Bar Scene</h2>
          <p>
            Austin, Texas is renowned for its vibrant and diverse bar scene, offering something for
            every taste and occasion. From laid-back patios perfect for enjoying Austin's beautiful
            weather to upscale cocktail lounges ideal for special nights out, the city's drinking
            establishments reflect its unique character and culture.
          </p>

          <p>
            Each neighborhood in Austin has its own distinct bar atmosphere. Downtown Austin features
            everything from sophisticated rooftop bars to energetic dance clubs, while East Austin is
            known for its eclectic and artistic venues. The historic Rainey Street area offers bars in
            converted houses with spacious backyards, and South Congress provides a mix of trendy and
            classic establishments.
          </p>

          <p>
            Whether you're looking for craft beer, innovative cocktails, live music, or sports viewing,
            Austin's bar scene has you covered. Many venues also feature excellent food options, outdoor
            spaces, and regular events that showcase local talent and culture.
          </p>

          <p>
            Use our category guides to find the perfect bar for your next outing in Austin, whether you're
            a local looking for new spots or a visitor wanting to experience the best of what the city has
            to offer.
          </p>
        </section>
      </div>
    </StandardPage>
  );
}
