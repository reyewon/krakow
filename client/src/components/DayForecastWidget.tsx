import { useQuery } from "@tanstack/react-query";
import { Cloud, Sun, CloudRain, Wind, Thermometer } from "lucide-react";

interface ForecastData {
  list: Array<{
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
  }>;
}

interface DayForecastWidgetProps {
  city: string;
  lat: number;
  lng: number;
  date: string; // Format: "Tuesday, September 9th"
}

export default function DayForecastWidget({ city, lat, lng, date }: DayForecastWidgetProps) {
  const { data: forecast, isLoading, error } = useQuery({
    queryKey: ['forecast', city, date],
    queryFn: async () => {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      if (!apiKey) {
        throw new Error('Weather API key not configured');
      }
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Forecast data unavailable');
      }
      
      return response.json() as Promise<ForecastData>;
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 1
  });

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain?.toLowerCase()) {
      case 'clear':
        return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'clouds':
        return <Cloud className="w-4 h-4 text-gray-500" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-4 h-4 text-blue-500" />;
      default:
        return <Cloud className="w-4 h-4 text-gray-400" />;
    }
  };

  const formatHour = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: false 
    }).replace(':00', '');
  };

  const getFilteredHourlyData = () => {
    if (!forecast?.list) return [];
    
    // Get today's date to find the right day
    const today = new Date();
    const targetDate = new Date(today);
    
    // Filter for the current day and hours between 10:00 and 00:00 (midnight)
    return forecast.list.filter(item => {
      const itemDate = new Date(item.dt_txt);
      const hour = itemDate.getHours();
      const isToday = itemDate.toDateString() === targetDate.toDateString();
      const isTomorrow = itemDate.toDateString() === new Date(targetDate.getTime() + 24*60*60*1000).toDateString();
      
      // Include hours from 10am-23pm today, and midnight (00:00) tomorrow
      return (isToday && hour >= 10) || (isTomorrow && hour === 0);
    }).slice(0, 8); // Limit to 8 entries (10am, 1pm, 4pm, 7pm, 10pm, and midnight)
  };

  if (isLoading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <div className="animate-pulse flex space-x-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-1">
              <div className="h-3 bg-blue-200 rounded w-8"></div>
              <div className="h-4 bg-blue-200 rounded w-4"></div>
              <div className="h-3 bg-blue-200 rounded w-6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !forecast) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-gray-500 text-center">
          Weather forecast unavailable for {city}
        </p>
      </div>
    );
  }

  const hourlyData = getFilteredHourlyData();

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-700">Today's Forecast - {city}</h4>
      </div>
      
      <div className="flex space-x-3 overflow-x-auto pb-1">
        {hourlyData.map((item, index) => (
          <div key={index} className="flex flex-col items-center min-w-0 flex-shrink-0">
            <div className="text-xs text-gray-600 mb-1">
              {formatHour(item.dt_txt)}:00
            </div>
            <div className="mb-1">
              {getWeatherIcon(item.weather[0]?.main)}
            </div>
            <div className="text-xs font-medium text-gray-800">
              {Math.round(item.main.temp)}°
            </div>
            <div className="text-xs text-gray-500 mt-1 flex items-center">
              <Wind className="w-2 h-2 mr-1" />
              {Math.round(item.wind.speed * 3.6)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}