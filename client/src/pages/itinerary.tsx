import { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import DaySection from "@/components/DaySection";
import Sidebar from "@/components/Sidebar";
import { itineraryData } from "@/data/itinerary";
import { useScrollspy } from "@/hooks/useScrollspy";
import { ArrowUp, Clock } from "lucide-react";
import { isDayPassed, formatPolishTime } from "@/lib/dateUtils";

export default function Itinerary() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const activeSection = useScrollspy();

  // Filter out days that have passed based on Polish timezone
  const activeDays = useMemo(() => {
    return itineraryData.days.filter(day => !isDayPassed(day.date));
  }, []);

  const passedDaysCount = itineraryData.days.length - activeDays.length;

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-gray-800 font-merriweather">
      <Header activeSection={activeSection} />
      
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src="https://th.bing.com/th/id/R.c5faf32a80d29a8cca76d0cd036ae9a1?rik=c6ZVtZG0uinWpA&pid=ImgRaw&r=0" 
          alt="Banner image of Kraków Main Square" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-4">Poland Adventure</h2>
            <p className="text-xl md:text-2xl font-lato">September 9-15, 2025 • Kraków & Wrocław</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Status Indicator */}
        {passedDaysCount > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  {passedDaysCount} day{passedDaysCount > 1 ? 's' : ''} completed
                </p>
                <p className="text-xs text-blue-600">
                  Current time in Poland: {formatPolishTime()}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <main className="lg:col-span-3 space-y-12">
            {activeDays.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                  Trip Completed!
                </h2>
                <p className="text-gray-600 mb-4">
                  Your Poland adventure has ended. Hope you had an amazing time!
                </p>
                <p className="text-sm text-gray-500">
                  Current time in Poland: {formatPolishTime()}
                </p>
              </div>
            ) : (
              activeDays.map((day) => (
                <DaySection key={day.id} day={day} />
              ))
            )}
          </main>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-sienna text-white p-3 rounded-full shadow-lg hover:bg-sienna-dark transition-all duration-200 no-print ${
          showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 font-lato">Poland Adventure • September 9-15, 2025</p>
          <p className="text-sm text-gray-500 mt-2">Safe travels and enjoy your journey! 🇵🇱</p>
        </div>
      </footer>
    </div>
  );
}
