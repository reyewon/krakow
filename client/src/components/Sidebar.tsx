import { useState } from "react";
import CurrencyConverter from "./CurrencyConverter";
import TranslatorApp from "./TranslatorApp";
import ExpenseTracker from "./ExpenseTracker";
import EmergencyContacts from "./EmergencyContacts";
import PackingChecklist from "./PackingChecklist";
import PhotoSpots from "./PhotoSpots";
import TravelAlerts from "./TravelAlerts";
import LocalEvents from "./LocalEvents";
import { 
  Calculator, 
  MessageCircle, 
  PiggyBank, 
  Shield, 
  Luggage, 
  Camera, 
  Bell, 
  Calendar,
  Home,
  Plane
} from "lucide-react";

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("tools");

  const tabs = [
    { id: "tools", name: "Tools", icon: Calculator },
    { id: "essentials", name: "Essentials", icon: Home },
    { id: "travel", name: "Travel", icon: Plane },
    { id: "explore", name: "Explore", icon: Camera }
  ];

  return (
    <aside id="info" className="lg:col-span-1 no-print">
      <div className="sticky top-32">
        {/* Tab Navigation */}
        <div className="bg-white border border-gray-200 rounded-lg mb-4">
          <div className="flex">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-sienna text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mx-auto mb-1" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "essentials" && (
            <>
              <TravelAlerts />
              <div className="bg-warm-grey border border-gray-200 rounded-lg p-6">
                <h3 className="font-playfair text-xl font-semibold mb-4 text-gray-900">🏨 Accommodation</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-gray-700">Kraków</p>
                    <p className="text-gray-600">
                      <a href="https://www.google.com/search?q=Grand+Suite+Stefana+Batorego+5+Kraków" 
                         className="text-sienna hover:text-sienna-dark hover:underline">
                        Grand Suite
                      </a>
                    </p>
                    <p className="text-gray-600">Stefana Batorego 5</p>
                    <p className="text-gray-600">Sep 9-13 (Check-in: 14:00)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Wrocław</p>
                    <p className="text-gray-600">
                      <a href="https://www.google.com/search?q=Stein+1800+Terrace+Rynek+15+Wrocław" 
                         className="text-sienna hover:text-sienna-dark hover:underline">
                        Stein 1800 | Terrace
                      </a>
                    </p>
                    <p className="text-gray-600">Rynek 15</p>
                    <p className="text-gray-600">Sep 13-15 (Check-in: 16:00)</p>
                  </div>
                </div>
              </div>
              <EmergencyContacts />
            </>
          )}

          {activeTab === "tools" && (
            <>
              <CurrencyConverter />
              <ExpenseTracker />
              <TranslatorApp />
            </>
          )}

          {activeTab === "travel" && (
            <>
              <PackingChecklist />
              <div className="bg-warm-grey border border-gray-200 rounded-lg p-6">
                <h3 className="font-playfair text-xl font-semibold mb-4 text-gray-900">🚄 Transport Notes</h3>
                <div className="text-sm space-y-2 text-gray-600">
                  <p>• Book <a href="https://www.google.com/search?q=PKP+InterCity+tickets" 
                              className="text-sienna hover:text-sienna-dark hover:underline">PKP InterCity</a> train tickets in advance</p>
                  <p>• SKA1 train from airport to city center</p>
                  <p>• Trams and buses widely available</p>
                  <p>• Uber/Bolt available in both cities</p>
                </div>
              </div>
            </>
          )}

          {activeTab === "explore" && (
            <>
              <PhotoSpots />
              <LocalEvents />
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
