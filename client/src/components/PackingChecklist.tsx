import { useState, useEffect } from "react";
import { CheckSquare, Square, Luggage } from "lucide-react";

interface PackingItem {
  id: string;
  name: string;
  category: string;
  packed: boolean;
  essential: boolean;
}

const defaultItems: Omit<PackingItem, 'id' | 'packed'>[] = [
  // Documents
  { name: "Passport", category: "documents", essential: true },
  { name: "Travel insurance", category: "documents", essential: true },
  { name: "Flight tickets", category: "documents", essential: true },
  { name: "Hotel confirmations", category: "documents", essential: true },
  { name: "Driver's license", category: "documents", essential: false },
  { name: "European Health Insurance Card", category: "documents", essential: true },
  
  // Clothing
  { name: "Light jacket/sweater", category: "clothing", essential: true },
  { name: "Comfortable walking shoes", category: "clothing", essential: true },
  { name: "Rain jacket/umbrella", category: "clothing", essential: true },
  { name: "Casual shirts/tops", category: "clothing", essential: true },
  { name: "Jeans/trousers", category: "clothing", essential: true },
  { name: "Underwear (7 days)", category: "clothing", essential: true },
  { name: "Socks (7+ pairs)", category: "clothing", essential: true },
  { name: "Smart outfit for nice restaurants", category: "clothing", essential: false },
  { name: "Sleepwear", category: "clothing", essential: true },
  
  // Electronics
  { name: "Phone charger", category: "electronics", essential: true },
  { name: "Portable battery pack", category: "electronics", essential: true },
  { name: "Camera", category: "electronics", essential: false },
  { name: "Universal adapter (Type C/E)", category: "electronics", essential: true },
  { name: "Headphones", category: "electronics", essential: false },
  
  // Health & Toiletries
  { name: "Prescription medications", category: "health", essential: true },
  { name: "First aid kit", category: "health", essential: false },
  { name: "Toothbrush & toothpaste", category: "health", essential: true },
  { name: "Shampoo/body wash", category: "health", essential: true },
  { name: "Deodorant", category: "health", essential: true },
  { name: "Sunscreen", category: "health", essential: false },
  
  // Money & Cards
  { name: "Credit/debit cards", category: "money", essential: true },
  { name: "Some cash (GBP)", category: "money", essential: true },
  { name: "Some Polish zloty", category: "money", essential: false },
  
  // Miscellaneous
  { name: "Small backpack for day trips", category: "misc", essential: false },
  { name: "Reusable water bottle", category: "misc", essential: false },
  { name: "Travel pillow", category: "misc", essential: false },
  { name: "Book/entertainment", category: "misc", essential: false }
];

const categories = [
  { id: "documents", name: "Documents", icon: "📄" },
  { id: "clothing", name: "Clothing", icon: "👕" },
  { id: "electronics", name: "Electronics", icon: "🔌" },
  { id: "health", name: "Health & Toiletries", icon: "🧴" },
  { id: "money", name: "Money & Cards", icon: "💳" },
  { id: "misc", name: "Miscellaneous", icon: "🎒" }
];

export default function PackingChecklist() {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("misc");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('poland-trip-packing');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      // Initialize with default items
      const initialItems = defaultItems.map(item => ({
        ...item,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        packed: false
      }));
      setItems(initialItems);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('poland-trip-packing', JSON.stringify(items));
  }, [items]);

  const togglePacked = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
    ));
  };

  const addItem = () => {
    if (!newItemName.trim()) return;
    
    const newItem: PackingItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: newItemName.trim(),
      category: selectedCategory,
      packed: false,
      essential: false
    };
    
    setItems([...items, newItem]);
    setNewItemName("");
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getTotalProgress = () => {
    const packed = items.filter(item => item.packed).length;
    const total = items.length;
    return { packed, total, percentage: total > 0 ? (packed / total) * 100 : 0 };
  };

  const getCategoryProgress = (categoryId: string) => {
    const categoryItems = items.filter(item => item.category === categoryId);
    const packed = categoryItems.filter(item => item.packed).length;
    return { packed, total: categoryItems.length };
  };

  const progress = getTotalProgress();

  return (
    <div className="bg-warm-grey border border-gray-200 rounded-lg p-6">
      <h3 className="font-playfair text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
        <Luggage className="w-5 h-5" />
        Packing Checklist
      </h3>

      {/* Progress Overview */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress: {progress.packed}/{progress.total} items</span>
          <span className="font-medium">{Math.round(progress.percentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 bg-sienna rounded-full transition-all"
            style={{ width: `${progress.percentage}%` }}
          ></div>
        </div>
      </div>

      {/* Add New Item */}
      <div className="mb-4 p-3 bg-white rounded-lg border">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add packing item..."
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sienna"
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-sienna"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={addItem}
          className="w-full px-2 py-1 bg-sienna text-white rounded text-sm hover:bg-sienna-dark transition-colors"
        >
          Add Item
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {categories.map(category => {
          const categoryItems = items.filter(item => item.category === category.id);
          const categoryProgress = getCategoryProgress(category.id);
          
          if (categoryItems.length === 0) return null;
          
          return (
            <div key={category.id} className="bg-white rounded-lg p-3 border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                  <span>{category.icon}</span>
                  {category.name}
                </h4>
                <span className="text-xs text-gray-500">
                  {categoryProgress.packed}/{categoryProgress.total}
                </span>
              </div>
              
              <div className="space-y-1">
                {categoryItems.map(item => (
                  <div key={item.id} className="flex items-center gap-2">
                    <button
                      onClick={() => togglePacked(item.id)}
                      className="text-sienna hover:text-sienna-dark transition-colors"
                    >
                      {item.packed ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                    <span className={`text-sm flex-1 ${
                      item.packed ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}>
                      {item.name}
                      {item.essential && <span className="text-red-500 ml-1">*</span>}
                    </span>
                    {!item.essential && (
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-gray-400 hover:text-red-500 text-xs transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-gray-500 mt-3">
        * Essential items • Progress saved automatically
      </div>
    </div>
  );
}