import { Bar } from './types';

/**
 * Generate LocalBusiness structured data for a bar
 * This helps search engines understand the content and can lead to rich results
 */
export function generateBarStructuredData(bar: Bar, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BarOrPub',
    name: bar.name,
    image: bar.imageUrl,
    url: url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: bar.address,
      addressLocality: 'Austin',
      addressRegion: 'TX',
      postalCode: bar.zipCode || '78701', // Default to downtown Austin if not provided
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: bar.location.lat,
      longitude: bar.location.lng
    },
    telephone: bar.phone || '',
    priceRange: bar.priceRange ? '$'.repeat(bar.priceRange) : '$$',
    servesCuisine: bar.cuisine || 'Bar Food',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: bar.rating,
      ratingCount: bar.reviewCount || 10, // Default if not provided
      bestRating: '5',
      worstRating: '1'
    },
    openingHoursSpecification: bar.hours ? generateOpeningHours(bar.hours) : [],
    ...(bar.hasHappyHour && {
      specialOpeningHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        name: 'Happy Hour',
        description: bar.happyHourDetails || 'Special drink prices during happy hour',
        dayOfWeek: bar.happyHourDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: bar.happyHourStart || '16:00',
        closes: bar.happyHourEnd || '19:00'
      }
    })
  };
}

/**
 * Generate structured data for a list of bars (for category pages)
 */
export function generateBarListStructuredData(bars: Bar[], url: string, title: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    url: url,
    numberOfItems: bars.length,
    itemListElement: bars.map((bar, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BarOrPub',
        name: bar.name,
        image: bar.imageUrl,
        url: `https://barfindr.com/bars/${bar.id}`, // Replace with your actual domain
        address: {
          '@type': 'PostalAddress',
          streetAddress: bar.address,
          addressLocality: 'Austin',
          addressRegion: 'TX',
          addressCountry: 'US'
        },
        priceRange: bar.priceRange ? '$'.repeat(bar.priceRange) : '$$',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: bar.rating,
          ratingCount: bar.reviewCount || 10,
          bestRating: '5',
          worstRating: '1'
        }
      }
    }))
  };
}

/**
 * Generate FAQPage structured data for category pages
 */
export function generateFAQStructuredData(attribute: string, value: string) {
  // Format the attribute and value for display
  const formattedValue = value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const formattedAttribute = attribute === 'feature' 
    ? `with ${formattedValue}` 
    : attribute === 'neighborhood' 
      ? `in ${formattedValue}` 
      : `that are ${formattedValue}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What are the best bars in Austin ${formattedAttribute}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Our directory features the top-rated bars in Austin ${formattedAttribute}. These establishments have been selected based on customer reviews, atmosphere, drink quality, and overall experience. Browse our curated list to find the perfect spot for your next outing.`
        }
      },
      {
        '@type': 'Question',
        name: `What should I expect at Austin bars ${formattedAttribute}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Austin bars ${formattedAttribute} typically offer a unique atmosphere that reflects the city's vibrant culture. You can expect friendly service, a diverse selection of drinks including local craft beers and creative cocktails, and often live music or other entertainment. Many venues also serve food ranging from bar snacks to full menus.`
        }
      },
      {
        '@type': 'Question',
        name: `When is the best time to visit bars in Austin ${formattedAttribute}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The best time to visit depends on what you're looking for. For a quieter experience, weekday evenings are ideal. For a livelier atmosphere, Friday and Saturday nights are popular. Many bars offer happy hour specials on weekdays, typically between 4-7pm. Check our listings for specific hours and special events at each venue.`
        }
      }
    ]
  };
}

/**
 * Helper function to generate opening hours structured data
 */
function generateOpeningHours(hours: any) {
  if (!hours) return [];
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return daysOfWeek.map(day => {
    const dayHours = hours[day.toLowerCase()];
    if (!dayHours || !dayHours.open) {
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: day,
        opens: '00:00',
        closes: '00:00'
      };
    }
    
    return {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: day,
      opens: dayHours.open,
      closes: dayHours.close
    };
  });
}
