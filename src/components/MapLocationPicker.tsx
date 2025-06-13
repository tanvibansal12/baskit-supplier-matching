import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Circle } from 'react-leaflet';
import { X, MapPin, Navigation, Loader, Search, Clock, MapIcon } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapLocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
}

interface LocationMarkerProps {
  position: [number, number] | null;
  setPosition: (position: [number, number]) => void;
}

interface SearchResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  importance: number;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker position={position} />
  );
};

const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
};

export const MapLocationPicker: React.FC<MapLocationPickerProps> = ({
  isOpen,
  onClose,
  onLocationSelect
}) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string>('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const [hasTriedCurrentLocation, setHasTriedCurrentLocation] = useState(false);

  // Default to Jakarta coordinates
  const defaultCenter: [number, number] = [-6.2088, 106.8456];
  const [mapCenter, setMapCenter] = useState<[number, number]>(defaultCenter);
  const [mapZoom, setMapZoom] = useState(11);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('baskit-recent-searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading recent searches:', e);
      }
    }
  }, []);

  // Auto-get current location when modal opens
  useEffect(() => {
    if (isOpen && !hasTriedCurrentLocation) {
      setHasTriedCurrentLocation(true);
      getCurrentLocationAuto();
    }
  }, [isOpen, hasTriedCurrentLocation]);

  const saveRecentSearch = (query: string) => {
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('baskit-recent-searches', JSON.stringify(updated));
  };

  const getCurrentLocationAuto = () => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoadingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude
        ];
        setCurrentLocation(coords);
        setMapCenter(coords);
        setMapZoom(15);
        reverseGeocode(coords[0], coords[1]);
        setIsLoadingLocation(false);
      },
      (error) => {
        console.log('Unable to get current location:', error.message);
        setIsLoadingLocation(false);
        // Silently fail and keep default Jakarta location
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [
          position.coords.latitude,
          position.coords.longitude
        ];
        setCurrentLocation(coords);
        setPosition(coords);
        setMapCenter(coords);
        setMapZoom(15);
        reverseGeocode(coords[0], coords[1]);
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your current location. Please select manually on the map.');
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const searchLocation = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Focus search on Indonesia by adding countrycodes parameter
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=id&limit=8&addressdetails=1&extratags=1`
      );
      const data = await response.json();
      
      if (Array.isArray(data)) {
        // Sort by importance and relevance
        const sortedResults = data
          .filter((result: any) => result.lat && result.lon)
          .sort((a: any, b: any) => (b.importance || 0) - (a.importance || 0))
          .slice(0, 6);
        
        setSearchResults(sortedResults);
      }
    } catch (error) {
      console.error('Error searching location:', error);
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);
    setShowSearchResults(true);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      searchLocation(value);
    }, 300);
  };

  const handleSearchResultClick = (result: SearchResult) => {
    const coords: [number, number] = [parseFloat(result.lat), parseFloat(result.lon)];
    setPosition(coords);
    setMapCenter(coords);
    setMapZoom(15);
    setAddress(result.display_name);
    setSearchQuery(result.display_name);
    setShowSearchResults(false);
    saveRecentSearch(result.display_name);
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    setShowSearchResults(true);
    searchLocation(query);
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    setIsLoadingAddress(true);
    try {
      // Using Nominatim (OpenStreetMap) for reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        setAddress(data.display_name);
        setSearchQuery(data.display_name);
      } else {
        setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        setSearchQuery(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      const fallback = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      setAddress(fallback);
      setSearchQuery(fallback);
    }
    setIsLoadingAddress(false);
  };

  const handlePositionChange = (newPosition: [number, number]) => {
    setPosition(newPosition);
    reverseGeocode(newPosition[0], newPosition[1]);
  };

  const handleConfirmLocation = () => {
    if (position) {
      onLocationSelect({
        lat: position[0],
        lng: position[1],
        address: address || `${position[0].toFixed(6)}, ${position[1].toFixed(6)}`
      });
      onClose();
    }
  };

  const getLocationTypeIcon = (type: string) => {
    switch (type) {
      case 'administrative':
        return '🏛️';
      case 'residential':
        return '🏠';
      case 'commercial':
        return '🏢';
      case 'retail':
        return '🛍️';
      case 'amenity':
        return '🏪';
      default:
        return '📍';
    }
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setHasTriedCurrentLocation(false);
      setPosition(null);
      setCurrentLocation(null);
      setAddress('');
      setSearchQuery('');
      setShowSearchResults(false);
      setMapCenter(defaultCenter);
      setMapZoom(11);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg w-full max-w-5xl mx-4 h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Choose Location from Map</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Search and Controls */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 space-y-4 relative">
          {/* Search Bar */}
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for address, place name, or landmark..."
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onFocus={() => setShowSearchResults(true)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none text-sm"
              />
              {isSearching && (
                <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin" />
              )}
            </div>

            {/* Search Results Dropdown - Higher z-index */}
            {showSearchResults && (searchResults.length > 0 || recentSearches.length > 0) && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-80 overflow-y-auto z-[10000]">
                {/* Recent Searches */}
                {recentSearches.length > 0 && searchQuery.length === 0 && (
                  <div className="p-3 border-b border-gray-100">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Clock className="h-4 w-4 mr-1" />
                      Recent Searches
                    </div>
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(search)}
                        className="dropdown-item w-full text-left px-2 py-2 hover:bg-[#FFF4E8] rounded text-sm text-gray-700 truncate"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                )}

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="p-2">
                    {searchResults.map((result) => (
                      <button
                        key={result.place_id}
                        onClick={() => handleSearchResultClick(result)}
                        className="dropdown-item w-full text-left p-3 hover:bg-[#FFF4E8] rounded-lg transition-colors"
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-lg mt-0.5">
                            {getLocationTypeIcon(result.type)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 text-sm truncate">
                              {result.display_name.split(',')[0]}
                            </div>
                            <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {result.display_name}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {searchQuery.length > 0 && searchResults.length === 0 && !isSearching && (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={getCurrentLocation}
              disabled={isLoadingLocation}
              className="bg-[#085B59] text-white px-4 py-2 rounded-lg hover:bg-[#074e4c] transition-colors font-medium flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
            >
              {isLoadingLocation ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4 mr-2" />
              )}
              Use Current Location
            </button>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapIcon className="h-4 w-4 mr-1" />
              Click on map to select location
            </div>
          </div>

          {/* Selected Address */}
          {position && (
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-[#FF8B00] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 text-sm">Selected Location:</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {isLoadingAddress ? (
                      <div className="flex items-center">
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Getting address...
                      </div>
                    ) : (
                      address || `${position[0].toFixed(6)}, ${position[1].toFixed(6)}`
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={defaultCenter}
            zoom={mapZoom}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController center={mapCenter} zoom={mapZoom} />
            
            {/* Current Location Blue Dot */}
            {currentLocation && (
              <>
                <Circle
                  center={currentLocation}
                  radius={50}
                  pathOptions={{
                    color: '#3B82F6',
                    fillColor: '#3B82F6',
                    fillOpacity: 0.3,
                    weight: 2
                  }}
                />
                <Circle
                  center={currentLocation}
                  radius={10}
                  pathOptions={{
                    color: '#1D4ED8',
                    fillColor: '#1D4ED8',
                    fillOpacity: 0.8,
                    weight: 3
                  }}
                />
              </>
            )}
            
            {/* Selected Location Marker */}
            <LocationMarker position={position} setPosition={handlePositionChange} />
          </MapContainer>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmLocation}
              disabled={!position}
              className="bg-[#FF8B00] text-white px-6 py-2 rounded-lg hover:bg-[#e67a00] transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Confirm Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};