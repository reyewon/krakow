import { useState, useEffect } from "react";
import { Plane, Clock, AlertTriangle, CheckCircle, Bell } from "lucide-react";

interface FlightInfo {
  flightNumber: string;
  date: string;
  time: string;
  from: string;
  to: string;
  status: 'upcoming' | 'checkIn' | 'boarding' | 'completed';
  gate?: string;
  terminal?: string;
}

interface Alert {
  id: string;
  type: 'flight' | 'weather' | 'transport' | 'booking';
  title: string;
  message: string;
  urgency: 'low' | 'medium' | 'high';
  date: string;
  dismissed: boolean;
}

const flightInfo: FlightInfo[] = [
  {
    flightNumber: "FR5523",
    date: "2025-09-09",
    time: "16:05",
    from: "Bournemouth (BOH)",
    to: "Kraków (KRK)",
    status: "upcoming"
  },
  {
    flightNumber: "FR3318", 
    date: "2025-09-15",
    time: "19:10",
    from: "Wrocław (WRO)",
    to: "Bournemouth (BOH)",
    status: "upcoming"
  }
];

export default function TravelAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Load dismissed alerts from localStorage
    const savedAlerts = localStorage.getItem('poland-trip-alerts');
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    } else {
      // Generate initial alerts
      generateAlerts();
    }
  }, []);

  useEffect(() => {
    // Save alerts to localStorage
    localStorage.setItem('poland-trip-alerts', JSON.stringify(alerts));
  }, [alerts]);

  const generateAlerts = () => {
    const now = new Date();
    const tripStart = new Date('2025-09-09');
    const tripEnd = new Date('2025-09-15');
    const daysToTrip = Math.ceil((tripStart.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    const newAlerts: Alert[] = [];

    // Flight check-in reminders
    flightInfo.forEach(flight => {
      const flightDate = new Date(flight.date);
      const checkInTime = new Date(flightDate.getTime() - (24 * 60 * 60 * 1000)); // 24h before
      const daysToCheckIn = Math.ceil((checkInTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysToCheckIn <= 2 && daysToCheckIn >= 0) {
        newAlerts.push({
          id: `checkin-${flight.flightNumber}`,
          type: 'flight',
          title: `Check-in Available: ${flight.flightNumber}`,
          message: `Online check-in opens 24h before departure. Flight ${flight.flightNumber} on ${flight.date}.`,
          urgency: daysToCheckIn === 0 ? 'high' : 'medium',
          date: now.toISOString(),
          dismissed: false
        });
      }
    });

    // Pre-trip reminders
    if (daysToTrip <= 7 && daysToTrip > 0) {
      newAlerts.push({
        id: 'packing-reminder',
        type: 'booking',
        title: 'Start Packing Reminder',
        message: `Your trip to Poland starts in ${daysToTrip} days. Time to start checking your packing list!`,
        urgency: daysToTrip <= 3 ? 'medium' : 'low',
        date: now.toISOString(),
        dismissed: false
      });

      newAlerts.push({
        id: 'currency-reminder',
        type: 'booking',
        title: 'Currency Exchange',
        message: 'Consider getting some Polish zloty before your trip, though cards are widely accepted.',
        urgency: 'low',
        date: now.toISOString(),
        dismissed: false
      });

      newAlerts.push({
        id: 'reservations-reminder',
        type: 'booking',
        title: 'Restaurant Reservations',
        message: 'Make reservations for Miodova Restaurant and Karakter - both require advance booking.',
        urgency: 'medium',
        date: now.toISOString(),
        dismissed: false
      });
    }

    // Weather alerts (if trip is within 5 days)
    if (daysToTrip <= 5 && daysToTrip >= 0) {
      newAlerts.push({
        id: 'weather-check',
        type: 'weather',
        title: 'Check Weather Forecast',
        message: 'September weather can be unpredictable. Pack layers and a light rain jacket.',
        urgency: 'low',
        date: now.toISOString(),
        dismissed: false
      });
    }

    // Transport booking reminders
    if (daysToTrip <= 14 && daysToTrip > 0) {
      newAlerts.push({
        id: 'train-booking',
        type: 'transport',
        title: 'Book Train Tickets',
        message: 'Book your PKP InterCity train from Kraków to Wrocław (Sep 13) in advance for better prices.',
        urgency: daysToTrip <= 7 ? 'medium' : 'low',
        date: now.toISOString(),
        dismissed: false
      });
    }

    setAlerts(newAlerts);
  };

  const dismissAlert = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, dismissed: true } : alert
    ));
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-200 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-blue-200 bg-blue-50 text-blue-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Bell className="w-4 h-4 text-blue-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flight': return <Plane className="w-4 h-4" />;
      case 'weather': return '🌦️';
      case 'transport': return '🚂';
      case 'booking': return '📅';
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);

  return (
    <div className="bg-warm-grey border border-gray-200 rounded-lg p-6">
      <h3 className="font-playfair text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
        <Bell className="w-5 h-5" />
        Travel Alerts
        {activeAlerts.length > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeAlerts.length}
          </span>
        )}
      </h3>

      {activeAlerts.length === 0 ? (
        <div className="text-center py-6">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-gray-500">No active alerts</p>
          <p className="text-xs text-gray-400">All caught up!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {activeAlerts.map(alert => (
            <div key={alert.id} className={`rounded-lg p-3 border ${getUrgencyColor(alert.urgency)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2 flex-1">
                  <div className="flex items-center gap-1">
                    {getUrgencyIcon(alert.urgency)}
                    <span className="text-sm">{getTypeIcon(alert.type)}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-sm font-medium mb-1">{alert.title}</h5>
                    <p className="text-xs">{alert.message}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {new Date(alert.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="ml-2 text-xs opacity-60 hover:opacity-100 transition-opacity"
                  title="Dismiss"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Flight Status Summary */}
      <div className="mt-4 pt-3 border-t border-gray-300">
        <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
          <Plane className="w-4 h-4" />
          Flight Summary
        </h4>
        <div className="space-y-2">
          {flightInfo.map((flight, index) => (
            <div key={index} className="bg-white rounded p-2 border border-gray-100 text-xs">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{flight.flightNumber}</span>
                  <span className="mx-2">•</span>
                  <span>{flight.from} → {flight.to}</span>
                </div>
                <div className="text-right">
                  <div>{flight.date}</div>
                  <div className="text-gray-500">{flight.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-500 mt-3">
        Alerts update automatically based on your travel dates
      </div>
    </div>
  );
}