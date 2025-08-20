import { useEffect, useRef } from "react";
import SuggestionBox from "./SuggestionBox";
import MapComponent from "./MapComponent";
import DayForecastWidget from "./DayForecastWidget";
import { Day } from "@/data/itinerary";

interface DaySectionProps {
  day: Day;
}

export default function DaySection({ day }: DaySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getCityForDay = (dayId: string) => {
    // Days 1-4 are in Kraków, Days 5-7 are in Wrocław
    if (dayId === 'day1' || dayId === 'day2' || dayId === 'day3' || dayId === 'day4') {
      return { city: 'Kraków', lat: 50.0647, lng: 19.9450 };
    } else {
      return { city: 'Wrocław', lat: 51.1079, lng: 17.0385 };
    }
  };

  const cityInfo = getCityForDay(day.id);

  return (
    <section id={day.id} ref={sectionRef} className="scroll-margin-top-32">
      <div className="border-b-2 border-gray-100 pb-6 mb-8">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-2">
          {day.title}
        </h2>
        <h3 className="text-xl md:text-2xl font-playfair text-sienna mb-2">
          {day.subtitle}
        </h3>
        <p className="text-gray-600 font-lato">{day.date}</p>
      </div>
      
      <DayForecastWidget 
        city={cityInfo.city}
        lat={cityInfo.lat}
        lng={cityInfo.lng}
        date={day.date}
      />
      
      <div className="space-y-6">
        {day.activities.map((activity, index) => (
          <div key={index}>
            {activity.type === 'text' && (
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4" dangerouslySetInnerHTML={{ __html: activity.content }} />
              </div>
            )}
            
            {activity.type === 'suggestion' && (
              <SuggestionBox suggestion={activity} />
            )}
            
            {activity.type === 'image' && (
              <img 
                src={activity.src} 
                alt={activity.alt} 
                className="rounded-xl shadow-lg w-full h-auto" 
                loading="lazy" 
              />
            )}
            
            {activity.type === 'options' && (
              <div className="grid md:grid-cols-2 gap-6">
                {activity.options?.map((option, optIndex) => (
                  <div key={optIndex} className="border-l-4 border-sienna bg-warm-grey p-6 rounded-r-lg">
                    <h4 className="font-playfair text-lg font-semibold mb-3 text-gray-900">
                      {option.title}
                    </h4>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: option.description }} />
                    {option.details && (
                      <p className="text-sm" dangerouslySetInnerHTML={{ __html: option.details }} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {day.locations && day.locations.length > 0 && (
          <MapComponent locations={day.locations} mapId={`${day.id}-map`} />
        )}
      </div>
    </section>
  );
}
