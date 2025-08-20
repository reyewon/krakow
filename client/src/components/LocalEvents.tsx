import { useState } from "react";
import { Calendar, MapPin, Clock, ExternalLink, Star } from "lucide-react";

interface LocalEvent {
  name: string;
  date: string;
  time: string;
  location: string;
  city: string;
  description: string;
  category: string;
  price: string;
  website?: string;
  featured: boolean;
}

// Events for September 9-15, 2025 in Kraków and Wrocław
const localEvents: LocalEvent[] = [
  // Kraków Events
  {
    name: "Kraków Film Festival",
    date: "2025-09-07",
    time: "19:00",
    location: "Kino Pod Baranami",
    city: "Kraków",
    description: "International documentary and short film festival showcasing European cinema",
    category: "film",
    price: "25-45 PLN",
    website: "https://www.krakowfilmfestival.pl",
    featured: true
  },
  {
    name: "Jazz Autumn Festival",
    date: "2025-09-12",
    time: "20:30",
    location: "Piec Art Jazz Club",
    city: "Kraków",
    description: "Evening of contemporary jazz featuring Polish and international artists",
    category: "music",
    price: "60-80 PLN",
    featured: true
  },
  {
    name: "Old Town Walking Tour",
    date: "2025-09-10",
    time: "14:00",
    location: "Main Market Square",
    city: "Kraków",
    description: "Free walking tour of medieval Kraków with local historian guides",
    category: "tour",
    price: "Free (tips appreciated)",
    featured: false
  },
  {
    name: "Kazimierz Food Festival",
    date: "2025-09-11",
    time: "12:00",
    location: "Plac Nowy",
    city: "Kraków",
    description: "Traditional Polish and Jewish cuisine tasting event",
    category: "food",
    price: "15-30 PLN per dish",
    featured: false
  },

  // Wrocław Events
  {
    name: "Wrocław Contemporary Art Biennale",
    date: "2025-09-13",
    time: "18:00",
    location: "National Museum",
    city: "Wrocław",
    description: "Opening night of contemporary art exhibition featuring Central European artists",
    category: "art",
    price: "20-35 PLN",
    website: "https://www.mnwr.art.pl",
    featured: true
  },
  {
    name: "Nadodrze Street Art Tour",
    date: "2025-09-14",
    time: "11:00",
    location: "Nadodrze District",
    city: "Wrocław",
    description: "Guided tour of large-scale murals and urban art installations",
    category: "tour",
    price: "40 PLN",
    featured: true
  },
  {
    name: "Sunday Market at Hala Targowa",
    date: "2025-09-14",
    time: "08:00",
    location: "Hala Targowa",
    city: "Wrocław",
    description: "Local farmers market with fresh produce, crafts, and regional specialties",
    category: "market",
    price: "Free entry",
    featured: false
  },
  {
    name: "Ostrów Tumski Evening Concert",
    date: "2025-09-14",
    time: "19:30",
    location: "Cathedral of St. John",
    city: "Wrocław",
    description: "Classical organ concert in the historic cathedral setting",
    category: "music",
    price: "30-50 PLN",
    featured: false
  }
];

const categories = [
  { id: "all", name: "All Events", icon: "📅" },
  { id: "music", name: "Music", icon: "🎵" },
  { id: "art", name: "Art", icon: "🎨" },
  { id: "film", name: "Film", icon: "🎬" },
  { id: "food", name: "Food", icon: "🍽️" },
  { id: "tour", name: "Tours", icon: "🚶" },
  { id: "market", name: "Markets", icon: "🏪" }
];

export default function LocalEvents() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");

  const filteredEvents = localEvents.filter(event => {
    const categoryMatch = selectedCategory === "all" || event.category === selectedCategory;
    const cityMatch = selectedCity === "all" || event.city === selectedCity;
    return categoryMatch && cityMatch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const openWebsite = (url: string) => {
    window.open(url, '_blank');
  };

  const getCategoryIcon = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.icon || '📅';
  };

  return (
    <div className="bg-warm-grey border border-gray-200 rounded-lg p-6">
      <h3 className="font-playfair text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Local Events
      </h3>

      {/* Filters */}
      <div className="space-y-3 mb-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
          <div className="flex gap-2">
            {["all", "Kraków", "Wrocław"].map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedCity === city
                    ? 'bg-sienna text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {city === "all" ? "All Cities" : city}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
          <div className="flex flex-wrap gap-1">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-sienna text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {filteredEvents.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">
            No events found for selected filters
          </p>
        ) : (
          filteredEvents.map((event, index) => (
            <div key={index} className={`bg-white rounded-lg p-3 border ${
              event.featured ? 'border-sienna bg-orange-50' : 'border-gray-100'
            }`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-2 flex-1">
                  <div className="flex items-center gap-1">
                    {event.featured && <Star className="w-3 h-3 text-sienna fill-current" />}
                    <span className="text-sm">{getCategoryIcon(event.category)}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-sm font-medium text-gray-900 mb-1">{event.name}</h5>
                    <p className="text-xs text-gray-600 mb-2">{event.description}</p>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(event.date)}</span>
                        <Clock className="w-3 h-3 ml-1" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}, {event.city}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-700">{event.price}</span>
                        {event.website && (
                          <button
                            onClick={() => openWebsite(event.website!)}
                            className="text-xs text-sienna hover:text-sienna-dark transition-colors flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Details
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Star className="w-4 h-4 text-blue-500 mt-0.5" />
          <div className="text-xs text-blue-700">
            <p className="font-medium mb-1">Featured Events:</p>
            <p>Starred events are specially recommended and may require advance booking. Check websites for current availability and COVID restrictions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}