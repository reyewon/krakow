import { useQuery } from "@tanstack/react-query";
import { Cloud, Sun, CloudRain, Wind, Thermometer } from "lucide-react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
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
}

interface WeatherWidgetProps {
  city: string;
  lat: number;
  lng: number;
}

export default function WeatherWidget({ city, lat, lng }: WeatherWidgetProps) {
  const { data: weather, isLoading, error } = useQuery({
    queryKey: ['weather', city],
    queryFn: async () => {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      if (!apiKey) {
        throw new Error('Weather API key not configured');
      }
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather data unavailable');
      }
      
      return response.json() as Promise<WeatherData>;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1
  });

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain?.toLowerCase()) {
      case 'clear':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'clouds':
        return <Cloud className="w-5 h-5 text-gray-500" />;
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      default:
        return <Cloud className="w-5 h-5 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded mb-1"></div>
        <div className="h-3 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="text-gray-500 text-sm">
        <p className="font-semibold">{city}</p>
        <p>Weather data unavailable</p>
        <p className="text-xs mt-1">Check internet connection</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-gray-700">{city}</p>
        {getWeatherIcon(weather.weather[0]?.main)}
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        <Thermometer className="w-4 h-4 text-red-400" />
        <span>{Math.round(weather.main.temp)}°C ({Math.round(weather.main.temp * 9/5 + 32)}°F)</span>
      </div>
      
      <div className="text-sm text-gray-600 space-y-1">
        <p className="capitalize">{weather.weather[0]?.description}</p>
        <div className="flex items-center gap-1">
          <Wind className="w-3 h-3" />
          <span>{Math.round(weather.wind.speed * 3.6)} km/h</span>
        </div>
        <p>Humidity: {weather.main.humidity}%</p>
      </div>
    </div>
  );
}