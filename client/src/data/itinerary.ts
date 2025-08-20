export interface Location {
  lat: number;
  lng: number;
  name: string;
}

export interface Activity {
  type: 'text' | 'suggestion' | 'image' | 'options';
  content?: string;
  title?: string;
  emoji?: string;
  time?: string;
  location?: string;
  whyItFits?: string;
  ambiance?: string;
  recommendedDish?: string;
  details?: string;
  src?: string;
  alt?: string;
  options?: {
    title: string;
    description: string;
    details?: string;
  }[];
}

export interface Day {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  activities: Activity[];
  locations?: Location[];
}

export interface ItineraryData {
  days: Day[];
}

export const itineraryData: ItineraryData = {
  days: [
    {
      id: 'day1',
      title: 'Day 1',
      subtitle: 'Arrival in Kraków & Speakeasy Charm',
      date: 'Tuesday, September 9th',
      activities: [
        {
          type: 'text',
          content: '<strong>~20:00:</strong> Arrive at Kraków Główny via SKA1 train, then walk to your apartment on Stefana Batorego. This area is residential yet close to the Old Town.'
        },
        {
          type: 'suggestion',
          emoji: '🍽️',
          title: 'Dinner at Filipa 18 Food Wine Art',
          time: '21:15',
          location: 'ul. św. Filipa 18',
          whyItFits: 'This restaurant is highly praised for its modern Polish cuisine, elegant presentation, and focus on high-quality, seasonal ingredients.',
          ambiance: 'Sophisticated, contemporary, often with an art-gallery feel. Good for a discerning solo diner.',
          recommendedDish: 'Seasonal à la carte options featuring local produce and meats (70-110 PLN / £14-£22)',
          details: '<strong>Rating:</strong> 4.7-4.8 on Google • <strong>Hours:</strong> Open until 22:00-23:00 • <a href="https://www.google.com/search?q=Filipa+18+Food+Wine+Art+Kraków" class="text-sienna hover:text-sienna-dark hover:underline">Search on Google</a>'
        },
        {
          type: 'suggestion',
          emoji: '🍸',
          title: 'Cocktails at Mercy Brown',
          time: '23:00',
          location: 'Straszewskiego 28',
          whyItFits: 'Classic speakeasy with a discreet entrance, offering an intimate and exclusive vibe with "class but also an edge."',
          ambiance: 'Dimly lit, plush seating, sophisticated yet unpretentious. Live jazz or swing on some nights.',
          recommendedDish: 'Creative seasonal concoctions (40-55 PLN / £8-£11)',
          details: '<strong>Rating:</strong> 4.6-4.8 on Google • <strong>Hours:</strong> Opens at 19:00 • <a href="https://www.google.com/search?q=Mercy+Brown+Kraków" class="text-sienna hover:text-sienna-dark hover:underline">Search on Google</a>'
        },
        {
          type: 'image',
          src: 'https://primetourskrakow.com/wp-content/uploads/2020/07/DOMINIK-NIGHT.jpg',
          alt: 'Kraków street at night'
        }
      ],
      locations: [
        { lat: 50.0647, lng: 19.9450, name: 'Filipa 18 Food Wine Art' },
        { lat: 50.0614, lng: 19.9365, name: 'Mercy Brown' }
      ]
    },
    {
      id: 'day2',
      title: 'Day 2',
      subtitle: 'Royal History & Kazimierz Nights',
      date: 'Wednesday, September 10th',
      activities: [
        {
          type: 'text',
          content: '<strong>11:00:</strong> Royal Route walk - Start from St. Florian\'s Gate, walk down Floriańska Street through Main Market Square to Wawel Castle.'
        },
        {
          type: 'suggestion',
          emoji: '🍽️',
          title: 'Lunch at Baqaro',
          time: '14:15',
          location: 'Ślusarska 9',
          whyItFits: 'Praised for "elevated pierogi" and modern take on Polish food in stylish settings.',
          ambiance: 'Modern, clean design, comfortable for a sit-down meal.',
          recommendedDish: 'Varied pierogi with duck, lamb, or vegetarian fillings (35-55 PLN / £7-£11)',
          details: '<strong>Rating:</strong> 4.5-4.7 on Google • <a href="https://www.google.com/search?q=Baqaro+Kraków" class="text-sienna hover:text-sienna-dark hover:underline">Search on Google</a>'
        },
        {
          type: 'text',
          content: '<strong>16:00:</strong> <a href="https://www.google.com/search?q=Schindler\'s+Factory+Kraków" class="text-sienna hover:text-sienna-dark hover:underline">Schindler\'s Factory tour</a> - Must-visit exhibition on Kraków under Nazi Occupation. Allow 2-3 hours. Book online in advance (32 PLN / £6.40).'
        },
        {
          type: 'image',
          src: 'https://s.inyourpocket.com/gallery/299657.jpg',
          alt: 'Wawel Castle Courtyard'
        },
        {
          type: 'suggestion',
          emoji: '🍽️',
          title: 'Dinner at Starka Restaurant & Vodkas',
          time: '20:00',
          location: 'Józefa 14, Kazimierz',
          whyItFits: 'Well-regarded for traditional Polish cuisine, particularly flavoured vodkas and hearty meat dishes.',
          ambiance: 'Rustic charm, often with live folk music, candlelit tables. Can be lively.',
          recommendedDish: 'Duck with cherry sauce, Pork tenderloin in boletus mushroom sauce (60-90 PLN / £12-£18)',
          details: '<strong>Rating:</strong> 4.5-4.7 on Google • <strong>Booking:</strong> Advisable • <a href="https://www.google.com/search?q=Starka+Restaurant+Kraków" class="text-sienna hover:text-sienna-dark hover:underline">Search on Google</a>'
        }
      ],
      locations: [
        { lat: 50.0647, lng: 19.9450, name: 'Baqaro' },
        { lat: 50.0544, lng: 19.9345, name: 'Schindler\'s Factory' },
        { lat: 50.0513, lng: 19.9457, name: 'Starka Restaurant' }
      ]
    },
    {
      id: 'day3',
      title: 'Day 3',
      subtitle: 'Subterranean Wonders & Jazzy Nights',
      date: 'Thursday, September 11th',
      activities: [
        {
          type: 'text',
          content: '<strong>10:15:</strong> <a href="https://www.google.com/search?q=Wieliczka+Salt+Mine+tour" class="text-sienna hover:text-sienna-dark hover:underline">Wieliczka Salt Mine tour</a> - UNESCO World Heritage site. Tourist Route ~2-3 hours. Book online (126 PLN / £25.20).'
        },
        {
          type: 'image',
          src: 'https://i.redd.it/qnlga60nz3o41.jpg',
          alt: 'Wieliczka Salt Mine Chapel'
        },
        {
          type: 'suggestion',
          emoji: '🍽️',
          title: 'Lunch at Mleczarnia',
          time: '13:15',
          location: 'Beera Meiselsa 20, Kazimierz',
          whyItFits: 'Known for its bohemian, vintage atmosphere and lovely courtyard garden.',
          ambiance: 'Eclectic, antique furniture, dimly lit interiors, beautiful leafy courtyard.',
          recommendedDish: 'Simple Polish dishes, sandwiches, salads, cakes (25-45 PLN / £5-£9)',
          details: '<strong>Rating:</strong> 4.4-4.6 on Google • <a href="https://www.google.com/search?q=Mleczarnia+Kraków" class="text-sienna hover:text-sienna-dark hover:underline">Search on Google</a>'
        },
        {
          type: 'suggestion',
          emoji: '🍽️',
          title: 'Dinner at Miodova Restaurant',
          time: '20:30',
          location: 'Szeroka 3, Kazimierz',
          whyItFits: 'Modern interpretation of Galician and Jewish cuisine. Michelin Bib Gourmand.',
          ambiance: 'Elegant, sophisticated, but welcoming. Beautiful interior design.',
          recommendedDish: 'Modern gefilte fish, duck breast, or lamb (70-120 PLN / £14-£24)',
          details: '<strong>Rating:</strong> Michelin Bib Gourmand, 4.6-4.8 on Google • <strong>Reservations:</strong> Essential • <a href="https://www.google.com/search?q=Miodova+Restaurant+Kraków" class="text-sienna hover:text-sienna-dark hover:underline">Search on Google</a>'
        }
      ],
      locations: [
        { lat: 49.9917, lng: 20.0517, name: 'Wieliczka Salt Mine' },
        { lat: 50.0513, lng: 19.9457, name: 'Mleczarnia' },
        { lat: 50.0515, lng: 19.9456, name: 'Miodova Restaurant' }
      ]
    },
    {
      id: 'day4',
      title: 'Day 4',
      subtitle: 'Reflection or Socialist Realism & Riverside Evening',
      date: 'Friday, September 12th',
      activities: [
        {
          type: 'options',
          options: [
            {
              title: 'Option A: Nowa Huta tram + burgers',
              description: 'Fascinating socialist-planned district. Take tram 4, 10, or 22 for 25-30 minutes. Walk around Plac Centralny and Aleja Róż.',
              details: '<strong>Lunch:</strong> Browar Górniczo‑Hutniczy - Microbrewery with craft beer and hearty burgers (40-55 PLN / £8-£11) • <a href="https://www.google.com/search?q=Nowa+Huta+Kraków" class="text-sienna hover:text-sienna-dark hover:underline">Search Nowa Huta</a> | <a href="https://www.google.com/search?q=Browar+Górniczo-Hutniczy+Nowa+Huta" class="text-sienna hover:text-sienna-dark hover:underline">Search Restaurant</a>'
            },
            {
              title: 'Option B: Auschwitz-Birkenau Memorial',
              description: 'Deeply moving and important historical site. Pre-booking a tour with transport is essential.',
              details: '<strong>Time:</strong> 08:10–15:30 • <strong>Price:</strong> 200-250 PLN (£40-£50) including transport • <a href="https://www.google.com/search?q=Auschwitz-Birkenau+Memorial" class="text-sienna hover:text-sienna-dark hover:underline">Search on Google</a>'
            }
          ]
        },
        {
          type: 'image',
          src: 'https://cdn.britannica.com/35/147835-050-F63661FC/entrance-gates-concentration-camp-Auschwitz-Krakow-Poland.jpg',
          alt: 'Auschwitz memorial entrance gates - historical remembrance site'
        },
        {
          type: 'suggestion',
          emoji: '🍽️',
          title: 'Dinner at Karakter',
          time: '20:00',
          location: 'Bracka 3-5',
          whyItFits: 'Known for high-quality meat dishes prepared in a modern and refined way. MICHELIN Bib Gourmand.',
          ambiance: 'Modern, slightly edgy, with an open kitchen. Can be buzzy.',
          recommendedDish: 'Steak tartare, various cuts of meat (70-150 PLN / £14-£30)',
          details: '<strong>Rating:</strong> Michelin Bib Gourmand, 4.6-4.7 on Google • <strong>Reservations:</strong> Highly recommended • <a href="https://www.google.com/search?q=Karakter+Kraków" class="text-sienna hover:text-sienna-dark hover:underline">Search on Google</a>'
        }
      ],
      locations: [
        { lat: 50.0775, lng: 20.0317, name: 'Nowa Huta' },
        { lat: 50.0647, lng: 19.9381, name: 'Karakter' }
      ]
    },
    {
      id: 'day5',
      title: 'Day 5',
      subtitle: 'Transfer to Wrocław & Cathedral Island',
      date: 'Saturday, September 13th',
      activities: [
        {
          type: 'text',
          content: '<strong>10:00:</strong> Check out from Kraków apartment.<br><strong>10:25–13:13:</strong> Train to Wrocław. Arrive at Wrocław Główny, then walk to your apartment on Rynek.'
        },
        {
          type: 'suggestion',
          emoji: '🍽️',
          title: 'Lunch at Central Café',
          time: '14:00',
          location: 'Świętego Antoniego 10',
          whyItFits: 'Very popular café in Wrocław, known for great coffee and modern-meets-vintage décor.',
          ambiance: 'Lively, popular with locals and tourists, comfortable seating.',
          recommendedDish: 'Bagels, smoothie bowls, or specialty coffees (30-50 PLN / £6-£10)',
          details: '<strong>Rating:</strong> 4.5-4.7 on Google • <a href="https://www.google.com/search?q=Central+Café+Wrocław" class="text-sienna hover:text-sienna-dark hover:underline">Search on Google</a>'
        },
        {
          type: 'text',
          content: '<strong>17:30:</strong> <a href="https://www.google.com/search?q=Ostrów+Tumski+Wrocław" class="text-sienna hover:text-sienna-dark hover:underline">Ostrów Tumski (Cathedral Island)</a> at dusk - Oldest part of Wrocław, incredibly atmospheric with cobblestone streets and gas lamps lit by hand each evening.'
        },
        {
          type: 'image',
          src: 'https://thumbs.dreamstime.com/b/cathedral-island-ostrow-tumski-wroclaw-poland-view-odra-river-beautiful-sunset-190137790.jpg',
          alt: 'Ostrów Tumski at dusk'
        },
        {
          type: 'suggestion',
          emoji: '🍽️',
          title: 'Dinner at Bernard Pub & Restaurant',
          time: '20:00',
          location: 'Rynek 35',
          whyItFits: 'Located right on Main Market Square, Czech-style pub with hearty food and Bernard beers.',
          ambiance: 'Traditional pub/restaurant feel, can be busy and atmospheric.',
          recommendedDish: 'Goulash, schnitzel, and Bernard beers (50-80 PLN / £10-£16)',
          details: '<strong>Rating:</strong> 4.3-4.5 on Google • <a href="https://www.google.com/search?q=Bernard+Pub+Restaurant+Wrocław" class="text-sienna hover:text-sienna-dark hover:underline">Search on Google</a>'
        }
      ],
      locations: [
        { lat: 51.1079, lng: 17.0385, name: 'Central Café' },
        { lat: 51.1145, lng: 17.0467, name: 'Ostrów Tumski' },
        { lat: 51.1095, lng: 17.0317, name: 'Bernard Pub' }
      ]
    },
    {
      id: 'day6',
      title: 'Day 6',
      subtitle: 'Street Art & Modern Architecture',
      date: 'Sunday, September 14th',
      activities: [
        {
          type: 'text',
          content: '<strong>Morning:</strong> Street art tour in <a href="https://www.google.com/search?q=Nadodrze+street+art+Wrocław" class="text-sienna hover:text-sienna-dark hover:underline">Nadodrze</a> - Former working-class district now filled with colorful murals and creative spaces.'
        },
        {
          type: 'image',
          src: 'https://isba.me/wp-content/uploads/2023/04/Murale-Nadodrze-18.jpg',
          alt: 'Nadodrze street art'
        },
        {
          type: 'text',
          content: '<strong>Afternoon:</strong> <a href="https://www.google.com/search?q=Centennial+Hall+Wrocław" class="text-sienna hover:text-sienna-dark hover:underline">Centennial Hall</a> - UNESCO World Heritage early reinforced concrete building with beautiful gardens.'
        },
        {
          type: 'suggestion',
          emoji: '🍽️',
          title: 'Modern Polish Dinner',
          whyItFits: 'Explore contemporary Polish cuisine at one of Wrocław\'s innovative restaurants in the evening.',
          details: 'Recommendation: Research current top-rated modern Polish restaurants for this evening'
        }
      ],
      locations: [
        { lat: 51.1067, lng: 17.0154, name: 'Nadodrze' },
        { lat: 51.1067, lng: 17.0774, name: 'Centennial Hall' }
      ]
    },
    {
      id: 'day7',
      title: 'Day 7',
      subtitle: 'Gnome Hunt & Departure',
      date: 'Monday, September 15th',
      activities: [
        {
          type: 'text',
          content: '<strong>Morning:</strong> <a href="https://www.google.com/search?q=Wrocław+gnomes+trail" class="text-sienna hover:text-sienna-dark hover:underline">Gnome photo trail</a> - Hunt for the famous bronze dwarf statues scattered throughout the city center.'
        },
        {
          type: 'image',
          src: 'https://api.culture.pl/sites/default/files/styles/1920_auto/public/2019-05/krasnale_wroclaw_fot_mieczyslaw_michalak_ag_img_9183.jpg?itok=FYB8Ytg8',
          alt: 'Wrocław Gnome'
        },
        {
          type: 'suggestion',
          emoji: '🍽️',
          title: 'Farewell Lunch',
          whyItFits: 'Final meal in Poland at a traditional or modern restaurant before departure.',
          details: 'Choose based on preference for traditional Polish farewell or contemporary cuisine'
        },
        {
          type: 'text',
          content: '<strong>Departure:</strong> Ryanair FR3318, 19:10–20:30 (Arrive WRO by 17:15)'
        }
      ],
      locations: [
        { lat: 51.1095, lng: 17.0317, name: 'Market Square' },
        { lat: 51.1024, lng: 16.8857, name: 'Wrocław Airport' }
      ]
    }
  ]
};
