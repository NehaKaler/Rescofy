'use client';

import { useState, useEffect, useRef, JSX } from 'react';
import { MapPin, Phone, Mail, Clock, Search, Navigation, Filter, Star, ExternalLink } from 'lucide-react';

interface Shelter {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  hours: string;
  services: string[];
  rating: number;
  lat: number;
  lng: number;
  distance?: number;
}

interface UserLocation {
  lat: number;
  lng: number;
}

export default function SheltersPage(): JSX.Element {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [filteredShelters, setFilteredShelters] = useState<Shelter[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [zipCode, setZipCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [locationError, setLocationError] = useState<string>('');
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [map, setMap] = useState<any>(null);
  const [filterServices, setFilterServices] = useState<string>('all');
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock shelter data with realistic locations
  const mockShelters: Shelter[] = [
    {
      id: 1,
      name: 'City Animal Protection Services',
      address: '123 Main St, Downtown',
      phone: '(555) 123-4567',
      email: 'info@cityaps.org',
      website: 'https://cityaps.org',
      hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
      services: ['Emergency Care', 'Adoption', 'Spay/Neuter', 'Vaccination'],
      rating: 4.5,
      lat: 40.7128,
      lng: -74.0060
    },
    {
      id: 2,
      name: 'Humane Society Emergency Response',
      address: '456 Oak Ave, Midtown',
      phone: '(555) 987-6543',
      email: 'emergency@humanesociety.org',
      website: 'https://humanesociety.org',
      hours: '24/7 Emergency Services',
      services: ['24/7 Emergency', 'Rescue', 'Rehabilitation', 'Foster Care'],
      rating: 4.8,
      lat: 40.7589,
      lng: -73.9851
    },
    {
      id: 3,
      name: 'Pet Haven Animal Sanctuary',
      address: '789 Pine Rd, Uptown',
      phone: '(555) 456-7890',
      email: 'contact@pethaven.org',
      hours: 'Mon-Sun: 8AM-8PM',
      services: ['Boarding', 'Grooming', 'Training', 'Adoption'],
      rating: 4.2,
      lat: 40.7831,
      lng: -73.9712
    },
    {
      id: 4,
      name: 'Animal Control & Welfare Department',
      address: '321 Elm St, Southside',
      phone: '(555) 654-3210',
      email: 'welfare@animalcontrol.gov',
      hours: 'Mon-Fri: 8AM-5PM',
      services: ['Animal Control', 'Lost Pet Recovery', 'Licensing', 'Education'],
      rating: 4.0,
      lat: 40.6892,
      lng: -74.0445
    },
    {
      id: 5,
      name: 'Companion Animal Hospital',
      address: '654 Cedar Blvd, Eastside',
      phone: '(555) 321-9876',
      email: 'care@companionvet.com',
      website: 'https://companionvet.com',
      hours: 'Mon-Fri: 7AM-9PM, Weekends: 8AM-6PM',
      services: ['Veterinary Care', 'Surgery', 'Dental', 'Emergency'],
      rating: 4.7,
      lat: 40.7505,
      lng: -73.9934
    },
    {
      id: 6,
      name: 'Safe Harbor Animal Rescue',
      address: '987 Maple Dr, Westside',
      phone: '(555) 789-0123',
      email: 'rescue@safeharbor.org',
      hours: 'Tue-Sun: 11AM-7PM',
      services: ['Rescue', 'Adoption', 'Volunteer Programs', 'Education'],
      rating: 4.3,
      lat: 40.7282,
      lng: -74.0776
    }
  ];

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get user location
  const getUserLocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          updateSheltersWithDistance(location);
        },
        (error) => {
          setLocationError('Unable to get your location. Please enter a ZIP code.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  // Update shelters with distance from user location
  const updateSheltersWithDistance = (location: UserLocation): void => {
    const sheltersWithDistance = mockShelters.map(shelter => ({
      ...shelter,
      distance: calculateDistance(location.lat, location.lng, shelter.lat, shelter.lng)
    })).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    
    setShelters(sheltersWithDistance);
    setFilteredShelters(sheltersWithDistance);
  };

  // Initialize map
  const initializeMap = (): void => {
    if (mapRef.current && !map) {
      // Simulate Leaflet map initialization
      const mockMap = {
        setView: (coords: [number, number], zoom: number) => console.log('Map centered at:', coords, 'zoom:', zoom),
        addMarker: (coords: [number, number], popup: string) => console.log('Marker added at:', coords, popup),
        flyTo: (coords: [number, number], zoom: number) => console.log('Flying to:', coords, 'zoom:', zoom)
      };
      setMap(mockMap);
    }
  };

  // Search by ZIP code
  const searchByZipCode = async (): Promise<void> => {
    if (!zipCode.trim()) return;
    
    setIsLoading(true);
    // Simulate ZIP code to coordinates conversion
    setTimeout(() => {
      const mockLocation = { lat: 40.7128, lng: -74.0060 }; // NYC coordinates
      setUserLocation(mockLocation);
      updateSheltersWithDistance(mockLocation);
      setIsLoading(false);
    }, 1000);
  };

  // Filter shelters by services
  const filterSheltersByService = (service: string): void => {
    setFilterServices(service);
    if (service === 'all') {
      setFilteredShelters(shelters);
    } else {
      const filtered = shelters.filter(shelter => 
        shelter.services.some(s => s.toLowerCase().includes(service.toLowerCase()))
      );
      setFilteredShelters(filtered);
    }
  };

  // Focus on shelter on map
  const focusOnShelter = (shelter: Shelter): void => {
    setSelectedShelter(shelter);
    if (map) {
      map.flyTo([shelter.lat, shelter.lng], 15);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setShelters(mockShelters);
    setFilteredShelters(mockShelters);
    getUserLocation();
    initializeMap();
    setIsLoading(false);
  }, []);

  const renderStars = (rating: number): JSX.Element => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Animal Shelters Near You</h1>
              <p className="mt-2 text-gray-600">Find nearby animal shelters and rescue organizations</p>
            </div>
            
            {/* Search Controls */}
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && searchByZipCode()}
                />
                <button
                  onClick={searchByZipCode}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
              
              <button
                onClick={getUserLocation}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Use My Location
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filter Controls */}
        <div className="mb-6 flex flex-wrap gap-3">
          <div className="flex items-center">
            <Filter className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 mr-3">Filter by service:</span>
          </div>
          {['all', 'emergency', 'adoption', 'veterinary', 'rescue'].map(service => (
            <button
              key={service}
              onClick={() => filterSheltersByService(service)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filterServices === service
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {service.charAt(0).toUpperCase() + service.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Shelter Locations</h2>
              {userLocation && (
                <p className="text-sm text-gray-600 mt-1">
                  Showing shelters near your location
                </p>
              )}
            </div>
            
            <div className="relative">
              {/* Simulated Map Container */}
              <div 
                ref={mapRef}
                className="h-96 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center"
              >
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-500">
                    In production, this would show a Leaflet map with shelter markers
                  </p>
                  {selectedShelter && (
                    <div className="mt-4 p-3 bg-white rounded-lg shadow-md max-w-xs mx-auto">
                      <p className="font-medium text-gray-900">{selectedShelter.name}</p>
                      <p className="text-sm text-gray-600">{selectedShelter.address}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {locationError && (
                <div className="absolute top-4 left-4 right-4 bg-yellow-100 border border-yellow-400 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">{locationError}</p>
                </div>
              )}
            </div>
          </div>

          {/* Shelters List */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Nearby Shelters ({filteredShelters.length})
              </h2>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading shelters...</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredShelters.map((shelter) => (
                    <div
                      key={shelter.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedShelter?.id === shelter.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                      onClick={() => focusOnShelter(shelter)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{shelter.name}</h3>
                          {renderStars(shelter.rating)}
                          
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{shelter.address}</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-4 h-4 mr-2" />
                              <span>{shelter.phone}</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>{shelter.hours}</span>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-1">
                            {shelter.services.slice(0, 3).map((service, index) => (
                              <span
                                key={index}
                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                              >
                                {service}
                              </span>
                            ))}
                            {shelter.services.length > 3 && (
                              <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                +{shelter.services.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="ml-4 text-right">
                          {shelter.distance && (
                            <div className="text-sm font-medium text-gray-900">
                              {shelter.distance.toFixed(1)} mi
                            </div>
                          )}
                          <div className="mt-2 space-y-1">
                            <a
                              href={`tel:${shelter.phone}`}
                              className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Phone className="w-3 h-3 mr-1" />
                              Call
                            </a>
                            
                            <a
                              href={`mailto:${shelter.email}`}
                              className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Mail className="w-3 h-3 mr-1" />
                              Email
                            </a>
                            
                            {shelter.website && (
                              <a
                                href={shelter.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Website
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Emergency Situations</h3>
              <p className="mt-1 text-sm text-red-700">
                If you encounter an animal in immediate danger, please contact local emergency services 
                or call 911. For non-emergency situations, contact the shelters listed above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}