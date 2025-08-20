import { Shield, Phone, MapPin, Hospital, AlertTriangle } from "lucide-react";

interface Contact {
  name: string;
  phone: string;
  description: string;
  city: string;
  icon: JSX.Element;
}

const emergencyContacts: Contact[] = [
  // Universal Emergency
  { 
    name: "Emergency Services", 
    phone: "112", 
    description: "Police, Fire, Ambulance", 
    city: "Poland", 
    icon: <AlertTriangle className="w-4 h-4 text-red-500" /> 
  },
  
  // Kraków
  { 
    name: "Kraków Police", 
    phone: "997", 
    description: "Local police emergency", 
    city: "Kraków", 
    icon: <Shield className="w-4 h-4 text-blue-500" /> 
  },
  { 
    name: "University Hospital", 
    phone: "+48 12 400 12 99", 
    description: "Szpital Uniwersytecki", 
    city: "Kraków", 
    icon: <Hospital className="w-4 h-4 text-green-500" /> 
  },
  { 
    name: "Tourist Police", 
    phone: "+48 12 615 73 77", 
    description: "For tourist assistance", 
    city: "Kraków", 
    icon: <MapPin className="w-4 h-4 text-purple-500" /> 
  },
  
  // Wrocław
  { 
    name: "Wrocław Police", 
    phone: "+48 71 344 70 00", 
    description: "Provincial police headquarters", 
    city: "Wrocław", 
    icon: <Shield className="w-4 h-4 text-blue-500" /> 
  },
  { 
    name: "Regional Hospital", 
    phone: "+48 71 736 40 00", 
    description: "4th Military Hospital", 
    city: "Wrocław", 
    icon: <Hospital className="w-4 h-4 text-green-500" /> 
  },
  
  // Embassy
  { 
    name: "British Embassy Warsaw", 
    phone: "+48 22 311 00 00", 
    description: "UK diplomatic assistance", 
    city: "Poland", 
    icon: <Phone className="w-4 h-4 text-blue-600" /> 
  },
  { 
    name: "Embassy Emergency", 
    phone: "+48 22 311 00 00", 
    description: "24/7 consular emergency line", 
    city: "Poland", 
    icon: <Phone className="w-4 h-4 text-red-600" /> 
  }
];

export default function EmergencyContacts() {
  const makeCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const groupedContacts = emergencyContacts.reduce((groups, contact) => {
    const city = contact.city;
    if (!groups[city]) {
      groups[city] = [];
    }
    groups[city].push(contact);
    return groups;
  }, {} as Record<string, Contact[]>);

  return (
    <div className="bg-warm-grey border border-gray-200 rounded-lg p-6">
      <h3 className="font-playfair text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
        <Shield className="w-5 h-5 text-red-500" />
        Emergency Contacts
      </h3>

      <div className="space-y-4">
        {Object.entries(groupedContacts).map(([city, contacts]) => (
          <div key={city}>
            <h4 className="text-sm font-semibold text-gray-800 mb-2 border-b border-gray-300 pb-1">
              {city}
            </h4>
            <div className="space-y-2">
              {contacts.map((contact, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 flex-1">
                      {contact.icon}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                        <p className="text-xs text-gray-600">{contact.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => makeCall(contact.phone)}
                      className="ml-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-medium transition-colors flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      {contact.phone}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
          <div className="text-xs text-red-700">
            <p className="font-medium mb-1">Important:</p>
            <p>112 works from any phone, even without credit. Save your accommodation addresses and carry ID at all times.</p>
          </div>
        </div>
      </div>
    </div>
  );
}