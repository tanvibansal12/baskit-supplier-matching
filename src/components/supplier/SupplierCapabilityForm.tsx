import React, { useState } from 'react';
import { Plus, X, Package, MapPin, Clock, DollarSign, Building2, Target, ChevronUp, ChevronDown, Edit3 } from 'lucide-react';
import { getAllProvinces, getCitiesByProvince, getDistrictsByCity } from '../../data/indonesianLocations';

interface SupplierCapability {
  id: string;
  productName: string;
  category: string;
  minQuantity: number;
  maxQuantity: number;
  unitPrice: number;
  unit: string;
  leadTime: string;
}

interface SupplierPreferences {
  serviceAreas: string[];
  preferredOrderSize: string;
  specializations: string[];
}

interface SupplierCapabilityFormProps {
  capabilities: SupplierCapability[];
  preferences: SupplierPreferences;
  onCapabilitiesChange: (capabilities: SupplierCapability[]) => void;
  onPreferencesChange: (preferences: SupplierPreferences) => void;
  onSubmit: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  hasResults?: boolean;
}

export const SupplierCapabilityForm: React.FC<SupplierCapabilityFormProps> = ({
  capabilities,
  preferences,
  onCapabilitiesChange,
  onPreferencesChange,
  onSubmit,
  isCollapsed = false,
  onToggleCollapse,
  hasResults = false
}) => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const addCapability = () => {
    const newCapability: SupplierCapability = {
      id: Date.now().toString(),
      productName: '',
      category: '',
      minQuantity: 1,
      maxQuantity: 1000,
      unitPrice: 0,
      unit: 'Carton',
      leadTime: '1-3 days'
    };
    onCapabilitiesChange([...capabilities, newCapability]);
  };

  const updateCapability = (id: string, updates: Partial<SupplierCapability>) => {
    onCapabilitiesChange(capabilities.map(cap => 
      cap.id === id ? { ...cap, ...updates } : cap
    ));
  };

  const removeCapability = (id: string) => {
    onCapabilitiesChange(capabilities.filter(cap => cap.id !== id));
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
    
    if (locationString && !preferences.serviceAreas.includes(locationString)) {
      onPreferencesChange({
        ...preferences,
        serviceAreas: [...preferences.serviceAreas, locationString]
      });
    }
  };

  const removeServiceArea = (area: string) => {
    onPreferencesChange({
      ...preferences,
      serviceAreas: preferences.serviceAreas.filter(a => a !== area)
    });
  };

  const addSpecialization = (specialization: string) => {
    if (specialization && !preferences.specializations.includes(specialization)) {
      onPreferencesChange({
        ...preferences,
        specializations: [...preferences.specializations, specialization]
      });
    }
  };

  const removeSpecialization = (specialization: string) => {
    onPreferencesChange({
      ...preferences,
      specializations: preferences.specializations.filter(s => s !== specialization)
    });
  };

  const provinces = getAllProvinces();
  const cities = selectedProvince ? getCitiesByProvince(selectedProvince) : [];
  const districts = selectedProvince && selectedCity ? getDistrictsByCity(selectedProvince, selectedCity) : [];

  const commonSpecializations = [
    'FMCG Products', 'Instant Noodles', 'Dairy Products', 'Beverages', 'Snacks',
    'Personal Care', 'Household Items', 'Automotive Parts', 'Electronics',
    'Bulk Orders', 'Express Delivery', 'Cold Chain', 'Halal Certified'
  ];

  // Auto-add first capability if none exist
  React.useEffect(() => {
    if (capabilities.length === 0) {
      addCapability();
    }
  }, []);

  if (isCollapsed) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-[#085B59] p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  Supplier Capabilities Summary
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {capabilities.length} products • {preferences.serviceAreas.length} service areas
                  {preferences.preferredOrderSize && ` • ${preferences.preferredOrderSize} orders`}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Specializations: {preferences.specializations.slice(0, 3).join(', ')}
                  {preferences.specializations.length > 3 && ` +${preferences.specializations.length - 3} more`}
                </div>
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
        <h2 className="text-2xl font-bold text-gray-900">Supplier Capabilities</h2>
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

      <div className="border-b border-gray-200 mb-6"></div>

      {/* Products & Capabilities */}
      <div className="mb-10">
        <h3 className="font-semibold text-gray-900 text-lg mb-4">Products You Can Supply</h3>
        
        <div className="space-y-3">
          {capabilities.map((capability, index) => (
            <div key={capability.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="md:col-span-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Indomie Goreng"
                  value={capability.productName}
                  onChange={(e) => updateCapability(capability.id, { productName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none bg-white"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Category
                </label>
                <select
                  value={capability.category}
                  onChange={(e) => updateCapability(capability.id, { category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none bg-white"
                >
                  <option value="">Select Category</option>
                  <option value="Instant Noodles">Instant Noodles</option>
                  <option value="Dairy Products">Dairy Products</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Personal Care">Personal Care</option>
                  <option value="Motorcycles">Motorcycles</option>
                  <option value="Electronics">Electronics</option>
                </select>
              </div>

              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Min Qty
                </label>
                <input
                  type="number"
                  value={capability.minQuantity}
                  onChange={(e) => updateCapability(capability.id, { minQuantity: parseInt(e.target.value) || 1 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none bg-white"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Max Qty
                </label>
                <input
                  type="number"
                  value={capability.maxQuantity}
                  onChange={(e) => updateCapability(capability.id, { maxQuantity: parseInt(e.target.value) || 1000 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none bg-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Unit Price (Rp)
                </label>
                <input
                  type="number"
                  value={capability.unitPrice || ''}
                  onChange={(e) => updateCapability(capability.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none bg-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Lead Time
                </label>
                <select
                  value={capability.leadTime}
                  onChange={(e) => updateCapability(capability.id, { leadTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none bg-white"
                >
                  <option value="1 day">1 day</option>
                  <option value="1-2 days">1-2 days</option>
                  <option value="1-3 days">1-3 days</option>
                  <option value="2-3 days">2-3 days</option>
                  <option value="3-5 days">3-5 days</option>
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                </select>
              </div>

              <div className="md:col-span-1 flex justify-end items-start mt-5">
                {capabilities.length > 1 && (
                  <button
                    onClick={() => removeCapability(capability.id)}
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
          onClick={addCapability}
          className="mt-4 flex items-center text-[#FF8B00] hover:text-[#e67a00] font-medium bg-[#FF8B00]/10 hover:bg-[#FF8B00]/20 px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Another Product
        </button>
      </div>

      {/* Service Areas */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4 text-lg">Service Areas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Province
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
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

        {/* Selected Service Areas */}
        {preferences.serviceAreas.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Selected Service Areas:</label>
            <div className="flex flex-wrap gap-2">
              {preferences.serviceAreas.map((area, index) => (
                <span key={index} className="bg-[#085B59] text-white px-3 py-1 rounded-full text-sm flex items-center">
                  {area}
                  <button
                    onClick={() => removeServiceArea(area)}
                    className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Preferred Order Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Package className="h-4 w-4 mr-1" />
              Preferred Order Size
            </label>
            <select
              value={preferences.preferredOrderSize}
              onChange={(e) => onPreferencesChange({ ...preferences, preferredOrderSize: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
            >
              <option value="">Any Size</option>
              <option value={"Small (< Rp 10 M)"}>Small (< Rp 10 M)</option>
              <option value={"Medium (Rp 10 M - 50 M)"}>Medium (Rp 10 M - 50 M)</option>
              <option value={"Large (Rp 50 M - 200 M)"}>Large (Rp 50 M - 200 M)</option>
              <option value={"Enterprise (> Rp 200 M)"}>Enterprise (> Rp 200 M)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Specializations */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-4 text-lg">Specializations & Certifications</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Quick Add Specializations:</label>
          <div className="flex flex-wrap gap-2">
            {commonSpecializations.map((spec) => (
              <button
                key={spec}
                onClick={() => addSpecialization(spec)}
                disabled={preferences.specializations.includes(spec)}
                className="px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-[#FF8B00] hover:text-white hover:border-[#FF8B00] transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {preferences.specializations.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Specializations:</label>
            <div className="flex flex-wrap gap-2">
              {preferences.specializations.map((spec, index) => (
                <span key={index} className="bg-[#FF8B00] text-white px-3 py-1 rounded-full text-sm flex items-center">
                  {spec}
                  <button
                    onClick={() => removeSpecialization(spec)}
                    className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onSubmit}
        disabled={capabilities.length === 0 || preferences.serviceAreas.length === 0 || capabilities.some(cap => !cap.productName.trim())}
        className="w-full bg-[#FF8B00] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#e67a00] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-lg"
      >
        Find Matching Opportunities
      </button>
    </div>
  );
};