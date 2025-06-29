import React, { useState } from 'react';
import { SupplierCapabilityForm } from './SupplierCapabilityForm';
import { 
  Package, TrendingUp, Clock, DollarSign, Users, MapPin, 
  Calendar, AlertCircle, CheckCircle, XCircle, Star, 
  Filter, Search, ArrowUpDown, Eye, Send, MessageCircle,
  Phone, Mail, Building2, Target, Award, Zap
} from 'lucide-react';
import { DistributorDemand, SupplierQuote, User } from '../../types';
import { mockDistributorDemands, mockSupplierQuotes } from '../../data/supplierDemandData';

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

interface SupplierDashboardProps {
  user: User;
}

export const SupplierDashboard: React.FC<SupplierDashboardProps> = ({ user }) => {
  // Supplier capability state
  const [capabilities, setCapabilities] = useState<SupplierCapability[]>([]);
  const [preferences, setPreferences] = useState<SupplierPreferences>({
    serviceAreas: [],
    preferredOrderSize: '',
    specializations: []
  });
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Existing state
  const [demands] = useState<DistributorDemand[]>(mockDistributorDemands);
  const [quotes] = useState<SupplierQuote[]>(mockSupplierQuotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'budget' | 'urgency' | 'expires' | 'requested'>('urgency');
  const [selectedDemand, setSelectedDemand] = useState<DistributorDemand | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Enhanced filtering based on supplier capabilities
  const getMatchingDemands = (): DistributorDemand[] => {
    if (!hasSearched || capabilities.length === 0) {
      return demands; // Show all demands if no capabilities set
    }

    return demands.filter(demand => {
      // Check if supplier can fulfill any of the demanded items
      const canFulfillItems = demand.items.some(demandItem => {
        return capabilities.some(capability => {
          // Enhanced matching logic
          const productMatch = capability.productName.toLowerCase().includes(demandItem.productName.toLowerCase()) ||
                              demandItem.productName.toLowerCase().includes(capability.productName.toLowerCase());
          
          const quantityMatch = demandItem.quantity >= capability.minQuantity && 
                              demandItem.quantity <= capability.maxQuantity;
          
          const priceMatch = !demandItem.targetPrice || 
                           !capability.unitPrice || 
                           capability.unitPrice <= demandItem.targetPrice * 1.1; // 10% tolerance
          
          return productMatch && quantityMatch && priceMatch;
        });
      });

      // Check service area match
      const serviceAreaMatch = preferences.serviceAreas.length === 0 || 
                             preferences.serviceAreas.some(area => 
                               demand.deliveryPreferences.location.includes(area) ||
                               area.includes(demand.deliveryPreferences.location)
                             );

      // Check order size preference
      const orderSizeMatch = !preferences.preferredOrderSize || 
                           checkOrderSizeMatch(demand.budget, preferences.preferredOrderSize);

      return canFulfillItems && serviceAreaMatch && orderSizeMatch;
    });
  };

  const checkOrderSizeMatch = (budget: number, preferredSize: string): boolean => {
    switch (preferredSize) {
      case 'Small (< Rp 10M)': return budget < 10000000;
      case 'Medium (Rp 10M - 50M)': return budget >= 10000000 && budget <= 50000000;
      case 'Large (Rp 50M - 200M)': return budget >= 50000000 && budget <= 200000000;
      case 'Enterprise (> Rp 200M)': return budget > 200000000;
      default: return true;
    }
  };

  // Filter and sort demands
  const filteredDemands = getMatchingDemands().filter(demand => {
    const matchesSearch = demand.distributorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         demand.items.some(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         demand.deliveryPreferences.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUrgency = urgencyFilter === 'all' || demand.urgency === urgencyFilter;
    const matchesStatus = statusFilter === 'all' || demand.status === statusFilter;
    
    return matchesSearch && matchesUrgency && matchesStatus;
  });

  const sortedDemands = [...filteredDemands].sort((a, b) => {
    switch (sortBy) {
      case 'budget':
        return b.budget - a.budget;
      case 'urgency':
        const urgencyOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      case 'expires':
        return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
      case 'requested':
        return new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime();
      default:
        return 0;
    }
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'quoted': return 'bg-purple-100 text-purple-800';
      case 'negotiating': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Package className="h-4 w-4" />;
      case 'quoted': return <Send className="h-4 w-4" />;
      case 'negotiating': return <MessageCircle className="h-4 w-4" />;
      case 'closed': return <CheckCircle className="h-4 w-4" />;
      case 'expired': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getDaysUntilExpiry = (expiresAt: Date): number => {
    const now = new Date();
    const diffTime = expiresAt.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleCapabilitySubmit = () => {
    if (capabilities.length === 0 || preferences.serviceAreas.length === 0) {
      return;
    }
    setHasSearched(true);
    setIsFormCollapsed(true);
  };

  const handleToggleCollapse = () => {
    setIsFormCollapsed(!isFormCollapsed);
  };

  const handleSubmitQuote = (demand: DistributorDemand) => {
    setSelectedDemand(demand);
    setShowQuoteModal(true);
  };

  const handleContactDistributor = (demand: DistributorDemand) => {
    window.open(`mailto:${demand.distributorEmail}?subject=Re: ${demand.items.map(i => i.productName).join(', ')} Request&body=Hello ${demand.distributorName}, I can fulfill your request for the following items...`);
  };

  // Calculate dashboard stats
  const totalDemands = demands.length;
  const matchingDemands = getMatchingDemands();
  const openDemands = matchingDemands.filter(d => d.status === 'open').length;
  const totalBudget = matchingDemands.reduce((sum, d) => sum + d.budget, 0);
  const avgBudget = totalBudget / (matchingDemands.length || 1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supplier Dashboard</h1>
            <p className="text-gray-600 mt-2">Set your capabilities and find matching distributor opportunities</p>
            <div className="text-sm text-gray-500 mt-1">
              Welcome back, <span className="font-medium">{user.companyName || user.name}</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#085B59] to-[#FF8B00] text-white px-6 py-3 rounded-lg">
            <div className="text-2xl font-bold">{hasSearched ? openDemands : totalDemands}</div>
            <div className="text-sm opacity-90">{hasSearched ? 'Matching Opportunities' : 'Total Opportunities'}</div>
          </div>
        </div>

        {/* Supplier Capability Form */}
        <SupplierCapabilityForm
          capabilities={capabilities}
          preferences={preferences}
          onCapabilitiesChange={setCapabilities}
          onPreferencesChange={setPreferences}
          onSubmit={handleCapabilitySubmit}
          isCollapsed={isFormCollapsed}
          onToggleCollapse={handleToggleCollapse}
          hasResults={hasSearched && filteredDemands.length > 0}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">{hasSearched ? 'Matching Demands' : 'Total Demands'}</div>
                <div className="text-2xl font-bold text-gray-900">{hasSearched ? matchingDemands.length : totalDemands}</div>
                <div className="text-sm text-blue-600 mt-1">
                  {hasSearched ? `${Math.round((matchingDemands.length / totalDemands) * 100)}% match rate` : '↗ 12% this week'}
                </div>
              </div>
              <Package className="h-8 w-8 text-[#085B59]" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Open Opportunities</div>
                <div className="text-2xl font-bold text-green-600">{openDemands}</div>
                <div className="text-sm text-green-600 mt-1">{hasSearched ? 'Matching your capabilities' : 'Ready to quote'}</div>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Total Budget</div>
                <div className="text-2xl font-bold text-[#FF8B00]">
                  Rp{(totalBudget / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-gray-600 mt-1">{hasSearched ? 'Matching opportunities' : 'Available market'}</div>
              </div>
              <DollarSign className="h-8 w-8 text-[#FF8B00]" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Avg. Order Value</div>
                <div className="text-2xl font-bold text-blue-600">
                  Rp{(avgBudget / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-blue-600 mt-1">Per opportunity</div>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Capability Match Info */}
        {hasSearched && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <Target className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm text-blue-800">
                Showing <span className="font-semibold">{filteredDemands.length}</span> opportunities that match your capabilities:
                <span className="ml-2">
                  {capabilities.map(c => c.productName).filter(Boolean).slice(0, 3).join(', ')}
                  {capabilities.length > 3 && ` +${capabilities.length - 3} more`}
                </span>
                {preferences.serviceAreas.length > 0 && (
                  <span className="ml-2">
                    • Areas: {preferences.serviceAreas.slice(0, 2).join(', ')}
                    {preferences.serviceAreas.length > 2 && ` +${preferences.serviceAreas.length - 2} more`}
                  </span>
                )}
              </span>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        {hasSearched && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by distributor, product, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                />
              </div>
            </div>
            
            <div>
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
              >
                <option value="all">All Urgency</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="quoted">Quoted</option>
                <option value="negotiating">Negotiating</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
              >
                <option value="urgency">Sort by Urgency</option>
                <option value="budget">Sort by Budget</option>
                <option value="expires">Sort by Expiry</option>
                <option value="requested">Sort by Date</option>
              </select>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Demands List */}
      {hasSearched && (
        <div className="space-y-6">
        {sortedDemands.map((demand) => {
          const daysUntilExpiry = getDaysUntilExpiry(demand.expiresAt);
          const isExpiringSoon = daysUntilExpiry <= 2;
          
          // Calculate match score for this demand
          const matchScore = calculateMatchScore(demand, capabilities, preferences);
          
          return (
            <div key={demand.id} className={`bg-white rounded-lg shadow-md border overflow-hidden hover:shadow-lg transition-all duration-300 relative ${
              demand.urgency === 'urgent' ? 'border-red-300 bg-red-50/30' : 
              isExpiringSoon ? 'border-orange-300 bg-orange-50/30' : 'border-gray-200'
            }`}>
              {/* Match Score Badge */}
              {hasSearched && matchScore > 0 && (
                <div className="absolute top-4 right-4 z-10">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    matchScore >= 80 ? 'bg-green-100 text-green-800' :
                    matchScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {matchScore}% Match
                  </div>
                </div>
              )}
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{demand.distributorName}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium">{demand.distributorRating}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(demand.urgency)}`}>
                        {demand.urgency.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {demand.deliveryPreferences.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Lead time: {demand.deliveryPreferences.preferredLeadTime}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Expires: {demand.expiresAt.toLocaleDateString()}
                        {isExpiringSoon && (
                          <span className="ml-2 text-red-600 font-medium">
                            ({daysUntilExpiry} days left!)
                          </span>
                        )}
                      </div>
                    </div>

                    {demand.description && (
                      <p className="text-gray-700 text-sm mb-3 bg-gray-50 p-3 rounded-lg">
                        {demand.description}
                      </p>
                    )}
                  </div>

                  <div className="text-right flex-shrink-0 ml-6">
                    <div className="text-2xl font-bold text-[#085B59]">
                      Rp{(demand.budget / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-gray-600">Total Budget</div>
                    <div className="flex items-center justify-end mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(demand.status)}`}>
                        {getStatusIcon(demand.status)}
                        <span className="ml-1">{demand.status.charAt(0).toUpperCase() + demand.status.slice(1)}</span>
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {demand.quotesReceived} quotes received
                    </div>
                  </div>
                </div>

                {/* Items Requested */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Package className="h-5 w-5 mr-2 text-[#085B59]" />
                    Items Requested ({demand.items.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {demand.items.map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="font-medium text-gray-900">{item.productName}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Qty:</span> {item.quantity} {item.unit}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Target:</span> Rp{item.targetPrice?.toLocaleString()}/unit
                        </div>
                        <div className="text-sm font-medium text-[#085B59] mt-1">
                          Total: Rp{((item.targetPrice || 0) * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preferred Supplier Types */}
                {demand.preferredSupplierTypes && demand.preferredSupplierTypes.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Preferred Supplier Types:</h4>
                    <div className="flex flex-wrap gap-2">
                      {demand.preferredSupplierTypes.map((type, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleSubmitQuote(demand)}
                    disabled={demand.status !== 'open'}
                    className="bg-[#FF8B00] text-white px-6 py-3 rounded-lg hover:bg-[#e67a00] transition-colors font-semibold flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Submit Quote
                  </button>
                  
                  <button
                    onClick={() => handleContactDistributor(demand)}
                    className="bg-white border border-[#085B59] text-[#085B59] px-6 py-3 rounded-lg hover:bg-[#085B59] hover:text-white transition-colors font-semibold flex items-center"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Contact Distributor
                  </button>

                  <a
                    href={`tel:${demand.distributorPhone}`}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </a>

                  <button className="text-gray-500 hover:text-gray-700 px-4 py-3 rounded-lg transition-colors flex items-center">
                    <Eye className="h-5 w-5 mr-1" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}

      {hasSearched && sortedDemands.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No matching opportunities found</h3>
          <p className="text-gray-600">Try adjusting your capabilities, service areas, or search criteria.</p>
          <button
            onClick={handleToggleCollapse}
            className="mt-4 bg-[#FF8B00] text-white px-6 py-2 rounded-lg hover:bg-[#e67a00] transition-colors"
          >
            Update Capabilities
          </button>
        </div>
      )}

      {!hasSearched && (
        <div className="text-center py-12">
          <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Set Your Capabilities</h3>
          <p className="text-gray-600">Define what products you can supply and your service areas to find matching opportunities.</p>
        </div>
      )}

      {/* Quote Submission Modal */}
      {showQuoteModal && selectedDemand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Submit Quote - {selectedDemand.distributorName}
              </h2>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Quote Submission</h3>
                <p className="text-blue-800 text-sm">
                  This is a demo interface. In the full platform, you would be able to:
                </p>
                <ul className="text-blue-800 text-sm mt-2 list-disc list-inside space-y-1">
                  <li>Set individual item prices and availability</li>
                  <li>Specify delivery terms and lead times</li>
                  <li>Add payment terms and conditions</li>
                  <li>Upload supporting documents</li>
                  <li>Submit competitive quotes directly to distributors</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Items to Quote:</h4>
                {selectedDemand.items.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                        <div className="font-medium">{item.productName}</div>
                        <div className="text-sm text-gray-600">{item.quantity} {item.unit}</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Price</label>
                        <input
                          type="number"
                          placeholder={`Target: ${item.targetPrice?.toLocaleString()}`}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none">
                          <option>In Stock</option>
                          <option>Limited Stock</option>
                          <option>Pre-order</option>
                          <option>Not Available</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lead Time</label>
                        <input
                          type="text"
                          placeholder="e.g., 1-2 days"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowQuoteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button className="bg-[#FF8B00] text-white px-6 py-2 rounded-lg hover:bg-[#e67a00] transition-colors font-medium">
                Submit Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to calculate match score
const calculateMatchScore = (
  demand: DistributorDemand, 
  capabilities: SupplierCapability[], 
  preferences: SupplierPreferences
): number => {
  let score = 0;
  let factors = 0;

  // Product match (40% weight)
  const productMatches = demand.items.filter(demandItem =>
    capabilities.some(capability =>
      capability.productName.toLowerCase().includes(demandItem.productName.toLowerCase()) ||
      demandItem.productName.toLowerCase().includes(capability.productName.toLowerCase())
    )
  );
  if (demand.items.length > 0) {
    score += (productMatches.length / demand.items.length) * 40;
    factors += 40;
  }

  // Service area match (30% weight)
  const areaMatch = preferences.serviceAreas.some(area =>
    demand.deliveryPreferences.location.includes(area) ||
    area.includes(demand.deliveryPreferences.location)
  );
  if (areaMatch) {
    score += 30;
  }
  factors += 30;

  // Order size preference match (20% weight)
  const orderSizeMatch = !preferences.preferredOrderSize || 
    checkOrderSizeMatch(demand.budget, preferences.preferredOrderSize);
  if (orderSizeMatch) {
    score += 20;
  }
  factors += 20;

  // Urgency bonus (10% weight)
  if (demand.urgency === 'urgent') {
    score += 10;
  } else if (demand.urgency === 'high') {
    score += 7;
  } else if (demand.urgency === 'medium') {
    score += 5;
  }
  factors += 10;

  return Math.round((score / factors) * 100);
};

const checkOrderSizeMatch = (budget: number, preferredSize: string): boolean => {
  switch (preferredSize) {
    case 'Small (< Rp 10M)': return budget < 10000000;
    case 'Medium (Rp 10M - 50M)': return budget >= 10000000 && budget <= 50000000;
    case 'Large (Rp 50M - 200M)': return budget >= 50000000 && budget <= 200000000;
    case 'Enterprise (> Rp 200M)': return budget > 200000000;
    default: return true;
  }
};