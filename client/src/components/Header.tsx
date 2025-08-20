import { useState } from "react";
import { Menu, X, Wrench } from "lucide-react";
import { isDayPassed } from "@/lib/dateUtils";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Map of day IDs to their dates for filtering
  const dayDates = {
    'day1': 'Monday, September 9th',
    'day2': 'Tuesday, September 10th', 
    'day3': 'Wednesday, September 11th',
    'day4': 'Thursday, September 12th',
    'day5': 'Friday, September 13th',
    'day6': 'Saturday, September 14th',
    'day7': 'Sunday, September 15th'
  };

  const allNavItems = [
    { id: 'day1', label: 'Day 1' },
    { id: 'day2', label: 'Day 2' },
    { id: 'day3', label: 'Day 3' },
    { id: 'day4', label: 'Day 4' },
    { id: 'day5', label: 'Day 5' },
    { id: 'day6', label: 'Day 6' },
    { id: 'day7', label: 'Day 7' },
    { id: 'info', label: 'Info' },
  ];

  // Filter out navigation items for days that have passed
  const navItems = allNavItems.filter(item => {
    if (item.id === 'info') return true; // Always show info section
    const dayDate = dayDates[item.id as keyof typeof dayDates];
    return dayDate ? !isDayPassed(dayDate) : true;
  });

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleToolsClick = () => {
    const element = document.getElementById('info');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 bg-white shadow-md z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-sienna">Ryan in Poland</h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 font-lato">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-gray-600 hover:text-black transition-colors duration-200 px-3 py-2 rounded ${
                  activeSection === item.id ? 'active-nav' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={handleToolsClick}
              className="text-gray-600 hover:text-black focus:outline-none px-2 py-1 rounded text-sm font-medium transition-colors"
              title="Jump to Tools"
            >
              <Wrench className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-black focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1 font-lato">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-3 py-2 text-gray-600 hover:text-black transition-colors duration-200 ${
                  activeSection === item.id ? 'active-nav' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
