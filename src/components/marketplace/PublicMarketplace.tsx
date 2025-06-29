import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Package, DollarSign, Users, Star, Clock, ArrowRight, Building2, Award, Target } from 'lucide-react';
import { MarketplaceListing } from '../../types/marketplace';
import { mockListings } from '../../data/marketplaceData';

interface PublicMarketplaceProps {
  onApplyToListing: (listingId: string) => void;
}

export const PublicMarketplace: React.FC<PublicMarketplaceProps> = ({ onApplyToListing }) => {
  const [listings] = useState<MarketplaceListing[]>(mockListings);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.brand.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = !regionFilter || listing.targetRegion === regionFilter;
    const matchesCategory = !categoryFilter || listing.product.category === categoryFilter;
    
    return matchesSearch && matchesRegion && matchesCategory && listing.status === 'active';
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysRemaining = (expiresAt?: Date) => {
    if (!expiresAt) return null;
    const now = new Date();
    const diffTime = expiresAt.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Public Marketplace</h1>
            <p className="text-gray-600 mt-2">Browse and apply to fulfill brand product listings</p>
          </div>
          <div className="bg-gradient-to-r from-[#085B59] to-[#FF8B00] text-white px-6 py-3 rounded-lg">
            <div className="text-2xl font-bold">{filteredListings.length}</div>
            <div className="text-sm opacity-90">Active Listings</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products or brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                />
              </div>
            </div>
            
            <div>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
              >
                <option value="">All Regions</option>
                <option value="DKI Jakarta">DKI Jakarta</option>
                <option value="Jawa Barat">Jawa Barat</option>
                <option value="Jawa Timur">Jawa Timur</option>
                <option value="Jawa Tengah">Jawa Tengah</option>
              </select>
            </div>
            
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
              >
                <option value="">All Categories</option>
                <option value="Instant Noodles">Instant Noodles</option>
                <option value="Dairy">Dairy</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredListings.map((listing) => {
          const daysRemaining = getDaysRemaining(listing.expiresAt);
          
          return (
            <div key={listing.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Header with Brand Info */}
              <div className="bg-gradient-to-r from-[#085B59] to-[#074e4c] text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {listing.brand.logo && (
                      <img 
                        src={listing.brand.logo} 
                        alt={listing.brand.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-lg">{listing.brand.name}</h3>
                      {listing.brand.isVerified && (
                        <div className="flex items-center text-sm opacity-90">
                          <Award className="h-4 w-4 mr-1" />
                          Verified Brand
                        </div>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Product Image */}
              {listing.product.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={listing.product.image} 
                    alt={listing.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{listing.product.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{listing.product.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-1" />
                      SKU: {listing.product.sku}
                    </div>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      {listing.product.category}
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Quantity</div>
                        <div className="font-bold text-gray-900">{listing.quantity.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{listing.product.unit}</div>
                      </div>
                      <Package className="h-8 w-8 text-[#085B59]" />
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Price/Unit</div>
                        <div className="font-bold text-gray-900">Rp{listing.pricePerUnit.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">per {listing.product.unit}</div>
                      </div>
                      <DollarSign className="h-8 w-8 text-[#FF8B00]" />
                    </div>
                  </div>
                </div>

                {/* Location and Campaign Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    Target Region: <span className="font-medium ml-1">{listing.targetRegion}</span>
                  </div>
                  
                  {listing.campaign && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center text-sm text-blue-800">
                        <Star className="h-4 w-4 mr-2" />
                        <span className="font-medium">Campaign: {listing.campaign.name}</span>
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        {listing.campaign.pointsPerReceipt} points per receipt
                        {listing.campaign.bonusMultiplier && ` • ${listing.campaign.bonusMultiplier}x bonus`}
                        <span className="ml-2 bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                          Tier benefits apply
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {daysRemaining !== null && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {daysRemaining > 0 ? (
                        <span>Expires in <span className="font-medium text-orange-600">{daysRemaining} days</span></span>
                      ) : (
                        <span className="text-red-600 font-medium">Expired</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Total Budget */}
                <div className="bg-gradient-to-r from-[#085B59]/10 to-[#FF8B00]/10 rounded-lg p-4 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Total Budget</div>
                    <div className="text-2xl font-bold text-[#085B59]">
                      Rp{listing.totalBudget.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Applications Count */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {listing.applications.length} applications
                  </div>
                  <div className="text-xs text-gray-500">
                    Posted {listing.createdAt.toLocaleDateString()}
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  onClick={() => onApplyToListing(listing.id)}
                  disabled={daysRemaining === 0}
                  className="w-full bg-[#FF8B00] text-white py-3 px-4 rounded-lg hover:bg-[#e67a00] transition-colors font-semibold flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {daysRemaining === 0 ? (
                    'Listing Expired'
                  ) : (
                    <>
                      Apply to Fulfill
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No listings found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or check back later for new opportunities.</p>
        </div>
      )}
    </div>
  );
};