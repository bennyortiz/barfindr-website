import { Metadata } from "next";
import { generateCategoryMetadata } from "@/lib/metadata-utils";
import { generateBarListStructuredData, generateFAQStructuredData } from "@/lib/structured-data";
import { bars } from "@/lib/data";
import { Bar } from "@/lib/types";
import Script from "next/script";

// Client components
import ClientPage from "./client-page";

// This allows us to generate static metadata for each page
export async function generateMetadata({ params }: { params: { attribute: string; value: string } }): Promise<Metadata> {
  const { attribute, value } = params;

  // Get attribute configuration or use defaults
  const attributeConfig = attributeMappings[attribute as keyof typeof attributeMappings]?.[value as any] || {
    title: `${value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Bars in Austin`,
    description: `Discover Austin bars with ${value.split('-').join(' ')}`,
    filterFn: (bar: Bar) => true,
    relatedAttributes: []
  };

  return generateCategoryMetadata(attribute, value, attributeConfig.title, attributeConfig.description);
}

// Define attribute mappings for SEO and filtering
const attributeMappings = {
  feature: {
    patio: {
      title: "Bars with Patios in Austin",
      description: "Enjoy Austin's beautiful weather at these bars with outdoor patios",
      filterFn: (bar: Bar) => bar.features?.includes("patio") || bar.tags.some(tag => tag.toLowerCase().includes("patio")),
      relatedAttributes: ["rooftop", "dog-friendly", "live-music"]
    },
    rooftop: {
      title: "Rooftop Bars in Austin",
      description: "Experience stunning views at Austin's best rooftop bars",
      filterFn: (bar: Bar) => bar.features?.includes("rooftop") || bar.tags.some(tag => tag.toLowerCase().includes("rooftop")),
      relatedAttributes: ["patio", "views", "cocktails"]
    },
    "live-music": {
      title: "Live Music Bars in Austin",
      description: "Discover Austin's vibrant live music scene at these top bars",
      filterFn: (bar: Bar) => bar.features?.includes("live music") || bar.tags.some(tag => tag.toLowerCase().includes("music")),
      relatedAttributes: ["patio", "downtown", "local-bands"]
    },
    "dog-friendly": {
      title: "Dog-Friendly Bars in Austin",
      description: "Bring your furry friend to these dog-friendly bars in Austin",
      filterFn: (bar: Bar) => bar.features?.includes("dog friendly") || bar.tags.some(tag => tag.toLowerCase().includes("dog")),
      relatedAttributes: ["patio", "outdoor", "casual"]
    },
    "craft-beer": {
      title: "Craft Beer Bars in Austin",
      description: "Explore Austin's best craft beer bars with extensive selections",
      filterFn: (bar: Bar) => bar.features?.includes("craft beer") || bar.tags.some(tag => tag.toLowerCase().includes("craft") || tag.toLowerCase().includes("beer")),
      relatedAttributes: ["brewery", "local", "pub"]
    },
    "sports-bar": {
      title: "Sports Bars in Austin",
      description: "Catch the game at Austin's top sports bars with great atmosphere",
      filterFn: (bar: Bar) => bar.features?.includes("sports") || bar.tags.some(tag => tag.toLowerCase().includes("sports")),
      relatedAttributes: ["tvs", "beer", "wings"]
    },
    "cocktail-bar": {
      title: "Cocktail Bars in Austin",
      description: "Sip on expertly crafted cocktails at these Austin bars",
      filterFn: (bar: Bar) => bar.features?.includes("cocktails") || bar.tags.some(tag => tag.toLowerCase().includes("cocktail")),
      relatedAttributes: ["speakeasy", "upscale", "mixology"]
    },
  },
  neighborhood: {
    downtown: {
      title: "Downtown Austin Bars",
      description: "Explore the vibrant bar scene in downtown Austin",
      filterFn: (bar: Bar) => bar.neighborhood?.toLowerCase() === "downtown" || bar.address.toLowerCase().includes("downtown"),
      relatedAttributes: ["sixth-street", "warehouse-district", "rainey-street"]
    },
    "east-austin": {
      title: "East Austin Bars",
      description: "Discover the eclectic bars in East Austin's trendy neighborhoods",
      filterFn: (bar: Bar) => bar.neighborhood?.toLowerCase() === "east austin" || bar.address.toLowerCase().includes("east"),
      relatedAttributes: ["hipster", "craft-beer", "cocktail-bar"]
    },
    "south-congress": {
      title: "South Congress Bars in Austin",
      description: "Visit the unique bars along Austin's iconic South Congress Avenue",
      filterFn: (bar: Bar) => bar.neighborhood?.toLowerCase() === "south congress" || bar.address.toLowerCase().includes("south congress"),
      relatedAttributes: ["south-austin", "food", "shopping"]
    },
    "rainey-street": {
      title: "Rainey Street Bars in Austin",
      description: "Experience the charm of historic homes turned bars on Rainey Street",
      filterFn: (bar: Bar) => bar.neighborhood?.toLowerCase() === "rainey street" || bar.address.toLowerCase().includes("rainey"),
      relatedAttributes: ["downtown", "patio", "food-trucks"]
    },
  },
  price: {
    cheap: {
      title: "Cheap Bars in Austin",
      description: "Find affordable drinks and great deals at these budget-friendly Austin bars",
      filterFn: (bar: Bar) => bar.priceRange === 1,
      relatedAttributes: ["happy-hour", "dive-bar", "student"]
    },
    moderate: {
      title: "Moderately Priced Bars in Austin",
      description: "Enjoy quality drinks at reasonable prices at these Austin bars",
      filterFn: (bar: Bar) => bar.priceRange === 2,
      relatedAttributes: ["casual", "popular", "local"]
    },
    upscale: {
      title: "Upscale Bars in Austin",
      description: "Indulge in premium drinks and atmosphere at Austin's upscale bars",
      filterFn: (bar: Bar) => bar.priceRange >= 3,
      relatedAttributes: ["cocktail-bar", "wine-bar", "downtown"]
    },
  },
  type: {
    "dive-bar": {
      title: "Dive Bars in Austin",
      description: "Experience the authentic charm of Austin's best dive bars",
      filterFn: (bar: Bar) => bar.type?.toLowerCase() === "dive bar" || bar.tags.some(tag => tag.toLowerCase().includes("dive")),
      relatedAttributes: ["cheap", "pool-table", "jukebox"]
    },
    "wine-bar": {
      title: "Wine Bars in Austin",
      description: "Discover Austin's finest wine bars with extensive selections",
      filterFn: (bar: Bar) => bar.type?.toLowerCase() === "wine bar" || bar.tags.some(tag => tag.toLowerCase().includes("wine")),
      relatedAttributes: ["upscale", "date-spot", "tasting"]
    },
    pub: {
      title: "Pubs in Austin",
      description: "Enjoy the cozy atmosphere of Austin's best pubs",
      filterFn: (bar: Bar) => bar.type?.toLowerCase() === "pub" || bar.tags.some(tag => tag.toLowerCase().includes("pub")),
      relatedAttributes: ["beer", "food", "casual"]
    },
    lounge: {
      title: "Lounges in Austin",
      description: "Relax in style at Austin's comfortable and stylish lounges",
      filterFn: (bar: Bar) => bar.type?.toLowerCase() === "lounge" || bar.tags.some(tag => tag.toLowerCase().includes("lounge")),
      relatedAttributes: ["cocktails", "upscale", "date-spot"]
    },
  },
  occasion: {
    "date-night": {
      title: "Best Date Night Bars in Austin",
      description: "Impress your date at these romantic Austin bars perfect for couples",
      filterFn: (bar: Bar) => bar.tags.some(tag => tag.toLowerCase().includes("romantic") || tag.toLowerCase().includes("date")),
      relatedAttributes: ["cocktail-bar", "wine-bar", "upscale"]
    },
    "group-outings": {
      title: "Best Bars for Groups in Austin",
      description: "Plan your next group outing at these Austin bars perfect for friends",
      filterFn: (bar: Bar) => bar.features?.includes("group friendly") || bar.tags.some(tag => tag.toLowerCase().includes("group")),
      relatedAttributes: ["games", "large-space", "private-room"]
    },
    "happy-hour": {
      title: "Best Happy Hour Bars in Austin",
      description: "Find the best happy hour deals at these Austin bars",
      filterFn: (bar: Bar) => bar.hasHappyHour,
      relatedAttributes: ["cheap", "after-work", "specials"]
    },
  }
};

// Loading fallback
function BarsLoading() {
  return (
    <div className="space-y-8">
      <div className="h-10 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
      <div className="h-6 w-96 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-80 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

// Bar listing content
function AttributePageContent() {
  const params = useParams();
  const attribute = String(params.attribute);
  const value = String(params.value);

  // Get attribute configuration or use defaults
  const attributeConfig = attributeMappings[attribute as keyof typeof attributeMappings]?.[value as any] || {
    title: `${value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Bars in Austin`,
    description: `Discover Austin bars with ${value.split('-').join(' ')}`,
    filterFn: (bar: Bar) => true,
    relatedAttributes: []
  };

  // Filter bars based on attribute
  const filteredBars = bars.filter(attributeConfig.filterFn);

  // Generate related links
  const relatedLinks = attributeConfig.relatedAttributes.map(relatedValue => {
    const relatedTitle = relatedValue.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return {
      href: `/bars/${attribute}/${relatedValue}`,
      title: relatedTitle
    };
  });

  return (
    <div className="space-y-10">
      {/* SEO Content Section */}
      <section className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {attributeConfig.description}. Austin offers a diverse range of bars to suit every taste and occasion.
          Whether you're looking for craft cocktails, local brews, or a lively atmosphere, these venues deliver
          exceptional experiences for visitors and locals alike.
        </p>
      </section>

      {/* Results count */}
      <div className="text-sm text-neutral-500 dark:text-neutral-400">
        Found {filteredBars.length} {filteredBars.length === 1 ? 'bar' : 'bars'}
      </div>

      {/* Bar grid */}
      {filteredBars.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBars.map((bar, index) => (
            <EnhancedBarCard
              key={bar.id}
              bar={bar}
              delay={index}
              featured={index === 0 && filteredBars.length > 3}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-4">
            <MapPin className="h-8 w-8 text-neutral-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No bars found</h3>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
            We couldn't find any bars matching this criteria. Try exploring other categories.
          </p>
          <Link href="/bars">
            <EnhancedButton
              variant="apple-primary"
              className="mt-6"
            >
              View all bars
            </EnhancedButton>
          </Link>
        </div>
      )}

      {/* Related Categories */}
      {relatedLinks.length > 0 && (
        <section className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <h2 className="text-xl font-semibold mb-4">Related Categories</h2>
          <div className="flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="inline-block px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full text-sm font-medium transition-colors">
                  {link.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Additional SEO Content */}
      <section className="prose prose-lg dark:prose-invert max-w-none pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <h2>Exploring {attributeConfig.title}</h2>
        <p>
          Austin's bar scene is known for its diversity and vibrant atmosphere. When looking for
          {value.includes('bar') ? '' : ' bars with'} {value.split('-').join(' ')},
          visitors can expect unique experiences that showcase the city's distinctive character.
        </p>
        <p>
          From downtown hotspots to hidden gems in neighborhoods like East Austin and South Congress,
          the city offers something for everyone. Many of these establishments feature local craft beers,
          innovative cocktails, and regular events that highlight Austin's rich cultural scene.
        </p>
        <h3>What to Expect</h3>
        <p>
          When visiting these bars, you'll often find friendly staff, a welcoming atmosphere, and a
          chance to experience authentic Austin culture. Many venues also offer food options ranging
          from bar snacks to full menus featuring local cuisine.
        </p>
        <p>
          Whether you're a local or just visiting, exploring Austin's {value.split('-').join(' ')} bars
          is a great way to experience the city's famous hospitality and unique character.
        </p>
      </section>
    </div>
  );
}

/**
 * Dynamic attribute-based bar listing page
 *
 * This page automatically generates SEO-optimized content for different
 * bar attributes like features, neighborhoods, price ranges, etc.
 */
export default function AttributePage() {
  const params = useParams();
  const attribute = String(params.attribute);
  const value = String(params.value);

  // Get attribute configuration or use defaults
  const attributeConfig = attributeMappings[attribute as keyof typeof attributeMappings]?.[value as any] || {
    title: `${value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Bars in Austin`,
    description: `Discover Austin bars with ${value.split('-').join(' ')}`,
    filterFn: (bar: Bar) => true,
    relatedAttributes: []
  };

    return <ClientPage />;
}
