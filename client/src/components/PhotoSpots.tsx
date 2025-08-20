import { Camera, MapPin, Clock, Star } from "lucide-react";

interface PhotoSpot {
  name: string;
  description: string;
  lat: number;
  lng: number;
  city: string;
  bestTime: string;
  tips: string;
  category: string;
  difficulty: 'easy' | 'moderate' | 'advanced';
}

const photoSpots: PhotoSpot[] = [
  // Kraków
  {
    name: "Main Market Square at Dawn",
    description: "Capture the historic square without crowds and with golden light",
    lat: 50.0616,
    lng: 19.9373,
    city: "Kraków",
    bestTime: "6:00-7:30 AM",
    tips: "Stand near the Cloth Hall for symmetrical composition. Use wide angle lens.",
    category: "architecture",
    difficulty: "easy"
  },
  {
    name: "Wawel Castle from Vistula Bridge",
    description: "Classic postcard view of the castle reflecting in the river",
    lat: 50.0531,
    lng: 19.9356,
    city: "Kraków",
    bestTime: "Golden hour (1 hour before sunset)",
    tips: "Bring tripod for long exposure. Best from the pedestrian walkway.",
    category: "landscape",
    difficulty: "moderate"
  },
  {
    name: "St. Mary's Basilica Tower Detail",
    description: "Gothic architecture details and the famous trumpet window",
    lat: 50.0619,
    lng: 19.9394,
    city: "Kraków",
    bestTime: "10:00 AM (trumpet call)",
    tips: "Use telephoto lens. Wait for the hourly trumpet call for action shot.",
    category: "architecture",
    difficulty: "moderate"
  },
  {
    name: "Kazimierz Street Art & Synagogues",
    description: "Colorful murals contrasting with historic Jewish quarter",
    lat: 50.0513,
    lng: 19.9457,
    city: "Kraków",
    bestTime: "Mid-morning to afternoon",
    tips: "Explore side streets. Respect religious sites - ask before photographing.",
    category: "street",
    difficulty: "easy"
  },
  {
    name: "Planty Park Autumn Colors",
    description: "Tree-lined walkway circling the Old Town",
    lat: 50.0647,
    lng: 19.9450,
    city: "Kraków",
    bestTime: "Early morning or late afternoon",
    tips: "September colors are subtle but beautiful. Focus on leading lines.",
    category: "nature",
    difficulty: "easy"
  },

  // Wrocław
  {
    name: "Market Square from Town Hall Tower",
    description: "Aerial view of colorful baroque buildings",
    lat: 51.1095,
    lng: 17.0317,
    city: "Wrocław",
    bestTime: "Mid-afternoon",
    tips: "Buy tower access ticket. Use wide angle for full square coverage.",
    category: "architecture",
    difficulty: "advanced"
  },
  {
    name: "Ostrów Tumski at Blue Hour",
    description: "Cathedral Island with gas lamps being lit manually",
    lat: 51.1145,
    lng: 17.0467,
    city: "Wrocław",
    bestTime: "30 minutes after sunset",
    tips: "Arrive early to watch lamplighter. Bring tripod for night shots.",
    category: "night",
    difficulty: "advanced"
  },
  {
    name: "Gnome Hunt Collection",
    description: "Create a series of the famous bronze dwarfs",
    lat: 51.1079,
    lng: 17.0385,
    city: "Wrocław",
    bestTime: "Any time",
    tips: "Get down to gnome eye level. Each has unique character and story.",
    category: "fun",
    difficulty: "easy"
  },
  {
    name: "Centennial Hall Architecture",
    description: "UNESCO concrete masterpiece with geometric patterns",
    lat: 51.1067,
    lng: 17.0774,
    city: "Wrocław",
    bestTime: "Morning for best light",
    tips: "Focus on the innovative concrete work. Capture both exterior and interior.",
    category: "architecture",
    difficulty: "moderate"
  },
  {
    name: "Nadodrze Street Art Tour",
    description: "Large-scale murals in former industrial district",
    lat: 51.1067,
    lng: 17.0154,
    city: "Wrocław",
    bestTime: "Anytime (good lighting all day)",
    tips: "Allow 2-3 hours to explore. Respect private property boundaries.",
    category: "street",
    difficulty: "easy"
  }
];

const categories = [
  { id: "architecture", name: "Architecture", icon: "🏛️" },
  { id: "landscape", name: "Landscape", icon: "🌄" },
  { id: "street", name: "Street", icon: "🎨" },
  { id: "night", name: "Night", icon: "🌙" },
  { id: "nature", name: "Nature", icon: "🌳" },
  { id: "fun", name: "Fun", icon: "😄" }
];

export default function PhotoSpots() {
  const openInMaps = (lat: number, lng: number, name: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.icon || '📷';
  };

  return (
    <div className="bg-warm-grey border border-gray-200 rounded-lg p-6">
      <h3 className="font-playfair text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
        <Camera className="w-5 h-5" />
        Photo Spots
      </h3>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {Object.entries(
          photoSpots.reduce((groups, spot) => {
            if (!groups[spot.city]) groups[spot.city] = [];
            groups[spot.city].push(spot);
            return groups;
          }, {} as Record<string, PhotoSpot[]>)
        ).map(([city, spots]) => (
          <div key={city}>
            <h4 className="text-sm font-semibold text-gray-800 mb-2 border-b border-gray-300 pb-1">
              📍 {city}
            </h4>
            <div className="space-y-3">
              {spots.map((spot, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-100">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2 flex-1">
                      <span className="text-lg">{getCategoryIcon(spot.category)}</span>
                      <div className="min-w-0 flex-1">
                        <h5 className="text-sm font-medium text-gray-900 mb-1">{spot.name}</h5>
                        <p className="text-xs text-gray-600 mb-2">{spot.description}</p>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(spot.difficulty)}`}>
                            {spot.difficulty}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {spot.bestTime}
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-700 mb-2">
                          <strong>Tips:</strong> {spot.tips}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => openInMaps(spot.lat, spot.lng, spot.name)}
                      className="ml-2 p-1 text-gray-400 hover:text-sienna transition-colors"
                      title="Open in Maps"
                    >
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Camera className="w-4 h-4 text-blue-500 mt-0.5" />
          <div className="text-xs text-blue-700">
            <p className="font-medium mb-1">Photography Tips:</p>
            <p>Always respect local customs and ask permission when photographing people. Some locations may require entry fees or have restricted hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}