import React, { useState } from 'react';
import { Plus, X, Package, MapPin, Clock, Download, Upload, Map, FileText, ChevronUp, ChevronDown, Edit3 } from 'lucide-react';
import { ProcurementItem, DeliveryPreferences } from '../types';
import { mockSalesOrderItems } from '../data/mockData';
import { getAllProvinces, getCitiesByProvince, getDistrictsByCity } from '../data/indonesianLocations';
import { MapLocationPicker } from './MapLocationPicker';

interface RequestFormProps {
  items: ProcurementItem[];
  deliveryPreferences: DeliveryPreferences;
  onItemsChange: (items: ProcurementItem[]) => void;
  onDeliveryChange: (preferences: DeliveryPreferences) => void;
  onSubmit: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  hasResults?: boolean; // New prop to check if results exist
}

export const RequestForm: React.FC<RequestFormProps> = ({
  items,
  deliveryPreferences,
  onItemsChange,
  onDeliveryChange,
  onSubmit,
  isCollapsed = false,
  onToggleCollapse,
  hasResults = false
}) => {
  const [salesOrderId, setSalesOrderId] = useState('');
  const [showSOImport, setShowSOImport] = useState(false);
  const [soError, setSoError] = useState('');
  const [importedFromSO, setImportedFromSO] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [isMapPickerOpen, setIsMapPickerOpen] = useState(false);
  const [locationMethod, setLocationMethod] = useState<'manual' | 'map'>('manual');

  const addItem = () => {
    const newItem: ProcurementItem = {
      id: Date.now().toString(),
      productName: '',
      quantity: 1,
      targetPrice: undefined,
      unit: 'Pieces (Pcs)'
    };
    onItemsChange([...items, newItem]);
    // Clear SO import info when manually adding items
    if (importedFromSO) {
      setImportedFromSO('');
      localStorage.removeItem('importedFromSO');
    }
  };

  const updateItem = (id: string, updates: Partial<ProcurementItem>) => {
    onItemsChange(items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
    // Clear SO import info when manually editing items
    if (importedFromSO) {
      setImportedFromSO('');
      localStorage.removeItem('importedFromSO');
    }
  };

  const removeItem = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    onItemsChange(newItems);
    // Clear SO import info if all items are removed
    if (newItems.length === 0) {
      setImportedFromSO('');
      localStorage.removeItem('importedFromSO');
    }
  };

  const loadSalesOrder = () => {
    setSoError(''); // Clear previous error
    const soItems = mockSalesOrderItems[salesOrderId];
    if (soItems) {
      onItemsChange(soItems);
      setImportedFromSO(salesOrderId);
      // Store SO info in localStorage for ERP prefill
      localStorage.setItem('importedFromSO', salesOrderId);
      setShowSOImport(false);
      setSalesOrderId('');
    } else {
      setSoError('Sales Order ID not found. Try: SO-2024-001, SO-2024-002, or SO-2024-003');
    }
  };

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    setSelectedCity('');
    setSelectedDistrict('');
    updateLocationString(province, '', '');
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict('');
    updateLocationString(selectedProvince, city, '');
  };

  const handleDistrictChange = (district: string) => {
    setSelectedDistrict(district);
    updateLocationString(selectedProvince, selectedCity, district);
  };

  const updateLocationString = (province: string, city: string, district: string) => {
    let locationString = '';
    if (district) {
      locationString = `${district}, ${city}, ${province}`;
    } else if (city) {
      locationString = `${city}, ${province}`;
    } else if (province) {
      locationString = province;
    }
    onDeliveryChange({ ...deliveryPreferences, location: locationString });
  };

  const handleMapLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    onDeliveryChange({ ...deliveryPreferences, location: location.address });
    // Reset dropdown selections when using map
    setSelectedProvince('');
    setSelectedCity('');
    setSelectedDistrict('');
    setLocationMethod('map');
  };

  const handleLocationMethodChange = (method: 'manual' | 'map') => {
    setLocationMethod(method);
    if (method === 'manual') {
      // Clear map-selected location
      onDeliveryChange({ ...deliveryPreferences, location: '' });
      setSelectedProvince('');
      setSelectedCity('');
      setSelectedDistrict('');
    } else {
      setIsMapPickerOpen(true);
    }
  };

  const handleSalesOrderIdChange = (value: string) => {
    setSalesOrderId(value);
    if (soError) {
      setSoError(''); // Clear error when user starts typing
    }
  };

  const clearAllItems = () => {
    onItemsChange([]);
    setImportedFromSO('');
    localStorage.removeItem('importedFromSO');
    // Add one empty item
    setTimeout(() => {
      addItem();
    }, 0);
  };

  // Auto-add first item if none exist
  React.useEffect(() => {
    if (items.length === 0) {
      addItem();
    }
  }, []);

  // Load SO info from localStorage on component mount
  React.useEffect(() => {
    const savedSO = localStorage.getItem('importedFromSO');
    if (savedSO) {
      setImportedFromSO(savedSO);
    }
  }, []);

  const provinces = getAllProvinces();
  const cities = selectedProvince ? getCitiesByProvince(selectedProvince) : [];
  const districts = selectedProvince && selectedCity ? getDistrictsByCity(selectedProvince, selectedCity) : [];

  if (isCollapsed) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-[#085B59] p-2 rounded-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  Procurement Request Summary
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {items.length} items • {deliveryPreferences.location || 'Location not set'} 
                  {deliveryPreferences.preferredLeadTime && ` • ${deliveryPreferences.preferredLeadTime}`}
                </div>
                {importedFromSO && (
                  <div className="text-xs text-blue-600 mt-1">
                    Imported from SO: {importedFromSO}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onToggleCollapse}
              className="border border-[#FF8B00] text-[#FF8B00] hover:bg-[#FF8B00] hover:text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Procurement Request</h2>
        {/* Hide button - only shows when form is expanded AND we have results */}
        {onToggleCollapse && hasResults && (
          <button
            onClick={onToggleCollapse}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center transition-colors border border-gray-300"
          >
            <ChevronUp className="h-4 w-4 mr-2" />
            Hide Form
          </button>
        )}
      </div>

      {/* Divider under title */}
      <div className="border-b border-gray-200 mb-6"></div>

      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 text-lg">Items Needed</h3>
          <button
            onClick={() => setShowSOImport(!showSOImport)}
            className="text-[#085B59] hover:text-[#074e4c] font-medium text-sm flex items-center hover:underline transition-colors"
          >
            <Upload className="h-4 w-4 mr-1" />
            Import from SO
          </button>
        </div>

        {showSOImport && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Download className="h-4 w-4 mr-2 text-[#085B59]" />
              Import from Sales Order
            </h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter Sales Order ID (e.g., SO-2024-001)"
                  value={salesOrderId}
                  onChange={(e) => handleSalesOrderIdChange(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                />
                <button
                  onClick={loadSalesOrder}
                  className="bg-[#085B59] text-white px-4 py-2 rounded-lg hover:bg-[#074e4c] transition-colors"
                >
                  Import
                </button>
                <button
                  onClick={() => {
                    setShowSOImport(false);
                    setSoError('');
                    setSalesOrderId('');
                  }}
                  className="text-gray-500 hover:text-gray-700 px-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Error message below input field */}
              {soError && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                  {soError}
                </div>
              )}
              
              {/* Help text */}
              <p className="text-sm text-gray-600">
                Try: SO-2024-001, SO-2024-002, or SO-2024-003 for demo data
              </p>
            </div>
          </div>
        )}

        {/* Sales Order Import Info - Smaller and follows form width */}
        {importedFromSO && (
          <div className="mb-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-1.5 rounded-lg mr-3">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-blue-900 text-sm">
                      Items imported from Sales Order: {importedFromSO}
                    </div>
                    <div className="text-blue-700 text-xs mt-0.5">
                      {items.length} items loaded successfully
                    </div>
                  </div>
                </div>
                <button
                  onClick={clearAllItems}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="md:col-span-4">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={item.productName}
                  onChange={(e) => updateItem(item.id, { productName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none bg-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, { quantity: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none bg-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Unit
                </label>
                <select
                  value={item.unit || 'Pieces (Pcs)'}
                  onChange={(e) => updateItem(item.id, { unit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none bg-white [&>option:hover]:bg-[#FFF4E8]"
                >
                  <option value="Carton">Carton</option>
                  <option value="Sachet Strip">Sachet Strip</option>
                  <option value="Pieces (Pcs)">Pieces (Pcs)</option>
                  <option value="Pack">Pack</option>
                  <option value="Kilogram (kg)">Kilogram (kg)</option>
                  <option value="Gram (g)">Gram (g)</option>
                  <option value="Unit (Animal)">Unit (Animal)</option>
                  <option value="Liter (L)">Liter (L)</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Target Price (Rp)
                </label>
                <input
                  type="number"
                  placeholder="Optional"
                  value={item.targetPrice || ''}
                  onChange={(e) => updateItem(item.id, { targetPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none bg-white"
                />
              </div>
              <div className="md:col-span-1 flex justify-end items-start mt-5">
                {items.length > 1 && (
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={addItem}
          className="mt-4 flex items-center text-[#FF8B00] hover:text-[#e67a00] font-medium bg-[#FF8B00]/10 hover:bg-[#FF8B00]/20 px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Another Item
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4 text-lg">Supplier Fulfillment Area</h3>
        
        {/* Location Method Selection */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="locationMethod"
                value="manual"
                checked={locationMethod === 'manual'}
                onChange={(e) => handleLocationMethodChange(e.target.value as 'manual' | 'map')}
                className="mr-2 text-[#FF8B00] focus:ring-[#FF8B00]"
              />
              <span className="text-sm font-medium text-gray-700">Manual Selection</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="locationMethod"
                value="map"
                checked={locationMethod === 'map'}
                onChange={(e) => handleLocationMethodChange(e.target.value as 'manual' | 'map')}
                className="mr-2 text-[#FF8B00] focus:ring-[#FF8B00]"
              />
              <span className="text-sm font-medium text-gray-700">Choose from Map</span>
            </label>
          </div>

          {locationMethod === 'map' && (
            <div className="p-4 bg-gradient-to-r from-[#085B59]/5 to-[#FF8B00]/5 rounded-lg border border-[#085B59]/20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Search Location Easily</h4>
                  <p className="text-sm text-gray-600">
                    Use map to search for addresses, landmarks, or get current location
                  </p>
                </div>
                <button
                  onClick={() => setIsMapPickerOpen(true)}
                  className="bg-[#085B59] text-white px-6 py-3 rounded-lg hover:bg-[#074e4c] transition-colors font-medium flex items-center shadow-md"
                >
                  <Map className="h-5 w-5 mr-2" />
                  Open Map
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Manual Selection Dropdowns */}
        {locationMethod === 'manual' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Province
              </label>
              <select
                value={selectedProvince}
                onChange={(e) => handleProvinceChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none [&>option:hover]:bg-[#FFF4E8]"
              >
                <option value="">Select Province</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City/Regency
              </label>
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                disabled={!selectedProvince}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none disabled:bg-gray-100 disabled:cursor-not-allowed [&>option:hover]:bg-[#FFF4E8]"
              >
                <option value="">Select City/Regency</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District (Optional)
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                disabled={!selectedCity}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none disabled:bg-gray-100 disabled:cursor-not-allowed [&>option:hover]:bg-[#FFF4E8]"
              >
                <option value="">Select District (Optional)</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selected Area
            </label>
            <input
              type="text"
              value={deliveryPreferences.location}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              placeholder={locationMethod === 'manual' ? "Select province and city above" : "Choose location from map"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Preferred Lead Time
            </label>
            <select
              value={deliveryPreferences.preferredLeadTime}
              onChange={(e) => onDeliveryChange({ ...deliveryPreferences, preferredLeadTime: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none [&>option:hover]:bg-[#FFF4E8]"
            >
              <option value="">Select lead time</option>
              <option value="1-3 days">1-3 days (Rush)</option>
              <option value="3-7 days">3-7 days (Standard)</option>
              <option value="1-2 weeks">1-2 weeks (Flexible)</option>
              <option value="2+ weeks">2+ weeks (Economy)</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={items.length === 0 || !deliveryPreferences.location || items.some(item => !item.productName.trim())}
        className="w-full bg-[#FF8B00] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#e67a00] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-lg"
      >
        Find Supplier Matches
      </button>

      {/* Map Location Picker Modal */}
      <MapLocationPicker
        isOpen={isMapPickerOpen}
        onClose={() => setIsMapPickerOpen(false)}
        onLocationSelect={handleMapLocationSelect}
      />
    </div>
  );
};