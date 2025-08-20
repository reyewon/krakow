// Utility functions for handling Polish timezone and date comparisons

export const getPolishDate = (): Date => {
  // Create a date in Polish timezone (CET/CEST)
  const now = new Date();
  
  // Use Intl.DateTimeFormat to get accurate Polish time
  const polishTime = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Warsaw',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(now);
  
  return new Date(polishTime + 'T00:00:00');
};

export const parseItineraryDate = (dateString: string): Date => {
  // Parse date strings like "Tuesday, September 9th" into actual dates
  // We know the year is 2025 from the itinerary
  const year = 2025;
  
  // Extract month and day from the date string
  const monthMatch = dateString.match(/(January|February|March|April|May|June|July|August|September|October|November|December)/i);
  const dayMatch = dateString.match(/(\d{1,2})/);
  
  if (!monthMatch || !dayMatch) {
    throw new Error(`Unable to parse date: ${dateString}`);
  }
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const monthIndex = monthNames.findIndex(month => 
    month.toLowerCase() === monthMatch[1].toLowerCase()
  );
  
  const day = parseInt(dayMatch[1]);
  
  return new Date(year, monthIndex, day);
};

export const isDayPassed = (dayDateString: string): boolean => {
  try {
    const polishToday = getPolishDate();
    const dayDate = parseItineraryDate(dayDateString);
    
    // Set both dates to midnight for accurate comparison
    polishToday.setHours(0, 0, 0, 0);
    dayDate.setHours(0, 0, 0, 0);
    
    // Return true if the day has passed (is before today)
    return dayDate < polishToday;
  } catch (error) {
    console.warn('Error parsing date:', dayDateString, error);
    return false; // If we can't parse the date, don't hide it
  }
};

export const formatPolishTime = (): string => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Warsaw',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  }).format(new Date());
};