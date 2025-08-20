import { useEffect } from "react";
import { Location } from "@/data/itinerary";
import { ExternalLink } from "lucide-react";

interface MapComponentProps {
  locations: Location[];
  mapId: string;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function MapComponent({ locations, mapId }: MapComponentProps) {
  useEffect(() => {
    if (!locations.length) return;

    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        initializeMap();
        return;
      }

      // Check if script already exists
      if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
        // Wait for existing script to load
        const checkGoogleMaps = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(checkGoogleMaps);
            initializeMap();
          }
        }, 100);
        return;
      }

      // Load Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDbslFWVHP3f8D42vJ5Uh1RwBJk13FRaes&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        initializeMap();
      };
      
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      const mapElement = document.getElementById(mapId);
      if (!mapElement) return;

      const center = locations[0] || { lat: 50.0647, lng: 19.9450 };
      
      const map = new window.google.maps.Map(mapElement, {
        zoom: 13,
        center: { lat: center.lat, lng: center.lng },
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }]
          }
        ]
      });

      // Add markers for each location
      locations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding: 8px; font-weight: 500;">${location.name}</div>`
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      // Fit map to show all markers if multiple locations
      if (locations.length > 1) {
        const bounds = new window.google.maps.LatLngBounds();
        locations.forEach(location => {
          bounds.extend({ lat: location.lat, lng: location.lng });
        });
        map.fitBounds(bounds);
      }
    };

    loadGoogleMaps();
  }, [locations, mapId]);

  if (!locations.length) return null;

  // Create a Google Maps URL with all locations for the external link
  const createGoogleMapsUrl = () => {
    if (locations.length === 1) {
      const location = locations[0];
      return `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    }
    
    // For multiple locations, create a directions URL
    const origin = locations[0];
    const destination = locations[locations.length - 1];
    const waypoints = locations.slice(1, -1).map(loc => `${loc.lat},${loc.lng}`).join('|');
    
    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`;
    if (waypoints) {
      url += `&waypoints=${waypoints}`;
    }
    return url;
  };

  return (
    <div className="map-container relative">
      <div id={mapId} className="w-full h-48 rounded-lg"></div>
      
      {/* Open in Google Maps button */}
      <a
        href={createGoogleMapsUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-2 right-2 bg-white hover:bg-gray-50 text-gray-700 px-3 py-1 rounded-md shadow-md text-sm font-medium flex items-center gap-1 transition-colors"
      >
        <ExternalLink className="w-3 h-3" />
        Open in Maps
      </a>
    </div>
  );
}
