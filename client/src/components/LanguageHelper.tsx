import { useState } from "react";
import { MessageCircle, Volume2 } from "lucide-react";

interface Phrase {
  english: string;
  polish: string;
  pronunciation: string;
  category: string;
}

const phrases: Phrase[] = [
  // Basic Greetings
  { english: "Hello", polish: "Cześć", pronunciation: "chesh-ch", category: "greetings" },
  { english: "Good morning", polish: "Dzień dobry", pronunciation: "jen DOH-bry", category: "greetings" },
  { english: "Good evening", polish: "Dobry wieczór", pronunciation: "DOH-bry VYE-choor", category: "greetings" },
  { english: "Thank you", polish: "Dziękuję", pronunciation: "jen-KOO-yeh", category: "greetings" },
  { english: "Please", polish: "Proszę", pronunciation: "PROH-sheh", category: "greetings" },
  { english: "Excuse me", polish: "Przepraszam", pronunciation: "psheh-PRAH-sham", category: "greetings" },

  // Restaurant
  { english: "Table for one, please", polish: "Stolik dla jednej osoby, proszę", pronunciation: "STOH-leek dla YED-ney oh-SOH-by PROH-sheh", category: "restaurant" },
  { english: "Menu, please", polish: "Menu, proszę", pronunciation: "MEH-noo PROH-sheh", category: "restaurant" },
  { english: "I would like...", polish: "Chciałbym...", pronunciation: "h-CHAH-wbym", category: "restaurant" },
  { english: "The bill, please", polish: "Rachunek, proszę", pronunciation: "rah-KHOO-nek PROH-sheh", category: "restaurant" },
  { english: "Is this vegetarian?", polish: "Czy to jest wegetariańskie?", pronunciation: "chi toh yest veh-geh-tah-RYAN-skyeh", category: "restaurant" },
  { english: "Water, please", polish: "Wodę, proszę", pronunciation: "VOH-deh PROH-sheh", category: "restaurant" },

  // Directions
  { english: "Where is...?", polish: "Gdzie jest...?", pronunciation: "g-jeh yest", category: "directions" },
  { english: "How do I get to...?", polish: "Jak dostać się do...?", pronunciation: "yahk DOH-stach sheh doh", category: "directions" },
  { english: "Train station", polish: "Dworzec kolejowy", pronunciation: "DVOH-zhets koh-LEH-yoh-vy", category: "directions" },
  { english: "Airport", polish: "Lotnisko", pronunciation: "lot-NEES-koh", category: "directions" },
  { english: "Left", polish: "Lewo", pronunciation: "LEH-voh", category: "directions" },
  { english: "Right", polish: "Prawo", pronunciation: "PRAH-voh", category: "directions" },

  // Emergency
  { english: "Help!", polish: "Pomoc!", pronunciation: "POH-mohts", category: "emergency" },
  { english: "Call the police", polish: "Zadzwoń na policję", pronunciation: "zah-DZVOHN nah poh-LEET-syeh", category: "emergency" },
  { english: "I need a doctor", polish: "Potrzebuję lekarza", pronunciation: "poh-TSHEH-boo-yeh leh-KAH-zhah", category: "emergency" },
  { english: "I don't speak Polish", polish: "Nie mówię po polsku", pronunciation: "nyeh MOO-vyeh poh POHL-skoo", category: "emergency" },
  { english: "Do you speak English?", polish: "Czy mówi pan/pani po angielsku?", pronunciation: "chi MOO-vee pahn/PAH-nee poh ahn-GYEL-skoo", category: "emergency" }
];

export default function LanguageHelper() {
  const [selectedCategory, setSelectedCategory] = useState<string>("greetings");

  const categories = [
    { id: "greetings", name: "Greetings", icon: "👋" },
    { id: "restaurant", name: "Restaurant", icon: "🍽️" },
    { id: "directions", name: "Directions", icon: "🗺️" },
    { id: "emergency", name: "Emergency", icon: "🚨" }
  ];

  const filteredPhrases = phrases.filter(phrase => phrase.category === selectedCategory);

  const speakPolish = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pl-PL';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-warm-grey border border-gray-200 rounded-lg p-6">
      <h3 className="font-playfair text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        Polish Phrases
      </h3>

      <div className="space-y-4">
        {/* Category Selector */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-sienna text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        {/* Phrases */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredPhrases.map((phrase, index) => (
            <div key={index} className="bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">{phrase.english}</p>
                  <p className="text-sm text-sienna font-medium mb-1">{phrase.polish}</p>
                  <p className="text-xs text-gray-500 italic">{phrase.pronunciation}</p>
                </div>
                <button
                  onClick={() => speakPolish(phrase.polish)}
                  className="ml-2 p-1 text-gray-400 hover:text-sienna transition-colors"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-xs text-gray-500 mt-2">
          Tap the speaker icon to hear pronunciation
        </div>
      </div>
    </div>
  );
}