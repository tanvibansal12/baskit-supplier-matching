import React, { useState } from 'react';
import { 
  Package, Users, Target, TrendingUp, Search, Filter, Plus, 
  Edit, Eye, Star, MapPin, Calendar, DollarSign, Award,
  Building2, Mail, Phone, CheckCircle, Clock, AlertTriangle
} from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalCampaigns: number;
  activeListings: number;
  totalSpend: number;
  lastActivity: Date;
  status: 'active' | 'inactive' | 'pending';
}

interface Campaign {
  id: string;
  brandId: string;
  brandName: string;
  name: string;
  skus: string[];
  targetRegion: string;
  budget: number;
  spentBudget: number;
  applications: number;
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: Date;
  endDate: Date;
}

export const ERMCatalogCRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'brands' | 'campaigns' | 'matchmaking'>('brands');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const brands: Brand[] = [
    {
      id: '1',
      name: 'PT Indofood CBP',
      email: 'partnerships@indofood.com',
      phone: '+62-21-5795-8822',
      tier: 'platinum',
      totalCampaigns: 12,
      activeListings: 8,
      totalSpend: 2500000000,
      lastActivity: new Date('2024-03-15'),
      status: 'active'
    },
    {
      id: '2',
      name: 'PT Nestle Indonesia',
      email: 'trade@nestle.co.id',
      phone: '+62-21-2856-8888',
      tier: 'gold',
      totalCampaigns: 8,
      activeListings: 5,
      totalSpend: 1800000000,
      lastActivity: new Date('2024-03-14'),
      status: 'active'
    },
    {
      id: '3',
      name: 'PT Unilever Indonesia',
      email: 'customer.service@unilever.com',
      phone: '+62-21-2995-1000',
      tier: 'gold',
      totalCampaigns: 6,
      activeListings: 3,
      totalSpend: 1200000000,
      lastActivity: new Date('2024-03-12'),
      status: 'active'
    }
  ];

  const campaigns: Campaign[] = [
    {
      id: '1',
      brandId: '1',
      brandName: 'PT Indofood CBP',
      name: 'Ramadan Indomie Campaign',
      skus: ['IDM-GRG-85G', 'IDM-SA-75G', 'IDM-AB-80G'],
      targetRegion: 'DKI Jakarta',
      budget: 500000000,
      spentBudget: 125000000,
      applications: 23,
      status: 'active',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-04-30')
    },
    {
      id: '2',
      brandId: '2',
      brandName: 'PT Nestle Indonesia',
      name: 'Bear Brand Health Drive',
      skus: ['BB-SUSU-189ML', 'BB-WT-189ML'],
      targetRegion: 'Jawa Barat',
      budget: 300000000,
      spentBudget: 85000000,
      applications: 15,
      status: 'active',
      startDate: new Date('2024-02-15'),
      endDate: new Date('2024-03-31')
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'bg-purple-100 text-purple-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'bronze': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) return `Rp${(amount / 1000000000).toFixed(1)}B`;
    if (amount >= 1000000) return `Rp${(amount / 1000000).toFixed(1)}M`;
    return `Rp${amount.toLocaleString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ERM Catalog & CRM</h1>
        <p className="text-gray-600">Brand-side visibility, campaign management, and distributor matchmaking</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex">
          <button
            onClick={() => setActiveTab('brands')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'brands'
                ? 'bg-[#085B59] text-white'
                : 'text-gray-600 hover:text-[#085B59]'
            }`}
          >
            <Building2 className="h-5 w-5 mx-auto mb-1" />
            Brand Management
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'campaigns'
                ? 'bg-[#085B59] text-white'
                : 'text-gray-600 hover:text-[#085B59]'
            }`}
          >
            <Target className="h-5 w-5 mx-auto mb-1" />
            Campaign Manager
          </button>
          <button
            onClick={() => setActiveTab('matchmaking')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'matchmaking'
                ? 'bg-[#085B59] text-white'
                : 'text-gray-600 hover:text-[#085B59]'
            }`}
          >
            <Users className="h-5 w-5 mx-auto mb-1" />
            Matchmaking
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#085B59] focus:border-[#085B59] outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#085B59] focus:border-[#085B59] outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <button className="bg-[#FF8B00] text-white px-6 py-3 rounded-lg hover:bg-[#e67a00] transition-colors font-medium flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add New
            </button>
          </div>
        </div>
      </div>

      {/* Brand Management Tab */}
      {activeTab === 'brands' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Total Brands</div>
                  <div className="text-2xl font-bold text-gray-900">{brands.length}</div>
                </div>
                <Building2 className="h-8 w-8 text-[#085B59]" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Active Campaigns</div>
                  <div className="text-2xl font-bold text-green-600">
                    {campaigns.filter(c => c.status === 'active').length}
                  </div>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Total Spend</div>
                  <div className="text-2xl font-bold text-[#FF8B00]">
                    {formatCurrency(brands.reduce((sum, b) => sum + b.totalSpend, 0))}
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-[#FF8B00]" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                  <div className="text-2xl font-bold text-yellow-600">4.7</div>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Brands Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Brand Portfolio</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Brand
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaigns
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Spend
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {brands.map((brand) => (
                    <tr key={brand.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{brand.name}</div>
                          <div className="text-sm text-gray-500">{brand.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTierColor(brand.tier)}`}>
                          {brand.tier.charAt(0).toUpperCase() + brand.tier.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{brand.totalCampaigns} total</div>
                        <div className="text-sm text-gray-500">{brand.activeListings} active</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(brand.totalSpend)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(brand.status)}`}>
                          {brand.status.charAt(0).toUpperCase() + brand.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-[#085B59] hover:text-[#074e4c]">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-[#FF8B00] hover:text-[#e67a00]">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Campaign Manager Tab */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          {/* Campaign Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Active Campaigns</div>
                  <div className="text-2xl font-bold text-green-600">
                    {campaigns.filter(c => c.status === 'active').length}
                  </div>
                </div>
                <Target className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Total Budget</div>
                  <div className="text-2xl font-bold text-[#FF8B00]">
                    {formatCurrency(campaigns.reduce((sum, c) => sum + c.budget, 0))}
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-[#FF8B00]" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Applications</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {campaigns.reduce((sum, c) => sum + c.applications, 0)}
                  </div>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Avg Performance</div>
                  <div className="text-2xl font-bold text-purple-600">87%</div>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Campaigns Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Campaign Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Brand
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applications
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-sm text-gray-500">
                            {campaign.skus.length} SKUs • {campaign.targetRegion}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{campaign.brandName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(campaign.budget)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatCurrency(campaign.spentBudget)} spent
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{campaign.applications}</div>
                        <div className="text-sm text-gray-500">applications</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-[#085B59] hover:text-[#074e4c]">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-[#FF8B00] hover:text-[#e67a00]">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Matchmaking Tab */}
      {activeTab === 'matchmaking' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">AI-Powered Distributor Matchmaking</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Matching Criteria */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Matching Criteria</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Geographic Coverage</span>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Product Category Match</span>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Performance History</span>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">Capacity & Scale</span>
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </div>

              {/* Match Results */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Top Matches</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">PT Jakarta Distribution</div>
                      <div className="text-sm text-gray-600">DKI Jakarta • 4.8★</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">94%</div>
                      <div className="text-xs text-gray-500">match</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">CV Bandung Supply</div>
                      <div className="text-sm text-gray-600">Jawa Barat • 4.6★</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">87%</div>
                      <div className="text-xs text-gray-500">match</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">PT Surabaya Logistics</div>
                      <div className="text-sm text-gray-600">Jawa Timur • 4.7★</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">82%</div>
                      <div className="text-xs text-gray-500">match</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};