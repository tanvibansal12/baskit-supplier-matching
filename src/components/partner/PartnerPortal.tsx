import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, Package, DollarSign, Award,
  Shield, AlertTriangle, CheckCircle, Clock, Target, Star,
  Calendar, MapPin, Phone, Mail, Building2, Activity,
  Eye, Edit, Download, Filter, Search, ArrowUpDown
} from 'lucide-react';

interface PartnerMetrics {
  totalGTs: number;
  activeGTs: number;
  monthlyPerformance: number;
  riskScore: number;
  totalRevenue: number;
  campaignsParticipated: number;
  averageRating: number;
  territoryOwnership: number;
}

interface GTAccount {
  id: string;
  name: string;
  phone: string;
  address: string;
  region: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  status: 'active' | 'inactive' | 'pending';
  lastOrder: Date;
  totalOrders: number;
  monthlyVolume: number;
  loyaltyPoints: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface Campaign {
  id: string;
  brandName: string;
  name: string;
  status: 'active' | 'completed' | 'upcoming';
  participation: number;
  earnings: number;
  pointsEarned: number;
  startDate: Date;
  endDate: Date;
}

export const PartnerPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'gts' | 'performance' | 'campaigns' | 'riskwatch'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const metrics: PartnerMetrics = {
    totalGTs: 156,
    activeGTs: 142,
    monthlyPerformance: 87,
    riskScore: 92,
    totalRevenue: 2850000000,
    campaignsParticipated: 12,
    averageRating: 4.7,
    territoryOwnership: 8
  };

  const gtAccounts: GTAccount[] = [
    {
      id: '1',
      name: 'Toko Sari Rasa',
      phone: '+62-812-3456-7890',
      address: 'Jl. Sudirman No. 123, Jakarta Selatan',
      region: 'DKI Jakarta',
      tier: 'gold',
      status: 'active',
      lastOrder: new Date('2024-03-15'),
      totalOrders: 45,
      monthlyVolume: 12500000,
      loyaltyPoints: 2450,
      riskLevel: 'low'
    },
    {
      id: '2',
      name: 'Warung Berkah Jaya',
      phone: '+62-813-5678-9012',
      address: 'Jl. Raya Bogor KM 25, Depok',
      region: 'Jawa Barat',
      tier: 'silver',
      status: 'active',
      lastOrder: new Date('2024-03-14'),
      totalOrders: 28,
      monthlyVolume: 8500000,
      loyaltyPoints: 1680,
      riskLevel: 'low'
    },
    {
      id: '3',
      name: 'Toko Maju Mundur',
      phone: '+62-814-9012-3456',
      address: 'Jl. Malioboro No. 45, Yogyakarta',
      region: 'DI Yogyakarta',
      tier: 'bronze',
      status: 'pending',
      lastOrder: new Date('2024-03-10'),
      totalOrders: 12,
      monthlyVolume: 3200000,
      loyaltyPoints: 890,
      riskLevel: 'medium'
    }
  ];

  const campaigns: Campaign[] = [
    {
      id: '1',
      brandName: 'Indofood',
      name: 'Ramadan Indomie Campaign',
      status: 'active',
      participation: 78,
      earnings: 15600000,
      pointsEarned: 1560,
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-04-30')
    },
    {
      id: '2',
      brandName: 'Nestle',
      name: 'Bear Brand Health Drive',
      status: 'completed',
      participation: 92,
      earnings: 8900000,
      pointsEarned: 890,
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-02-29')
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
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Partner Portal</h1>
        <p className="text-gray-600">Manage GTs, track performance, monitor campaigns, and assess risks</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#085B59] text-white'
                : 'text-gray-600 hover:text-[#085B59]'
            }`}
          >
            <BarChart3 className="h-5 w-5 mx-auto mb-1" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('gts')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors whitespace-nowrap ${
              activeTab === 'gts'
                ? 'bg-[#085B59] text-white'
                : 'text-gray-600 hover:text-[#085B59]'
            }`}
          >
            <Users className="h-5 w-5 mx-auto mb-1" />
            GT Management
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors whitespace-nowrap ${
              activeTab === 'performance'
                ? 'bg-[#085B59] text-white'
                : 'text-gray-600 hover:text-[#085B59]'
            }`}
          >
            <TrendingUp className="h-5 w-5 mx-auto mb-1" />
            Performance
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors whitespace-nowrap ${
              activeTab === 'campaigns'
                ? 'bg-[#085B59] text-white'
                : 'text-gray-600 hover:text-[#085B59]'
            }`}
          >
            <Target className="h-5 w-5 mx-auto mb-1" />
            Campaigns
          </button>
          <button
            onClick={() => setActiveTab('riskwatch')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors whitespace-nowrap ${
              activeTab === 'riskwatch'
                ? 'bg-[#085B59] text-white'
                : 'text-gray-600 hover:text-[#085B59]'
            }`}
          >
            <Shield className="h-5 w-5 mx-auto mb-1" />
            RiskWatch
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Total GTs</div>
                  <div className="text-2xl font-bold text-gray-900">{metrics.totalGTs}</div>
                  <div className="text-sm text-green-600">+12 this month</div>
                </div>
                <Users className="h-8 w-8 text-[#085B59]" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Performance Score</div>
                  <div className="text-2xl font-bold text-green-600">{metrics.monthlyPerformance}%</div>
                  <div className="text-sm text-green-600">↗ +5% vs last month</div>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Monthly Revenue</div>
                  <div className="text-2xl font-bold text-[#FF8B00]">
                    {formatCurrency(metrics.totalRevenue)}
                  </div>
                  <div className="text-sm text-green-600">+18% growth</div>
                </div>
                <DollarSign className="h-8 w-8 text-[#FF8B00]" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Risk Score</div>
                  <div className="text-2xl font-bold text-green-600">{metrics.riskScore}/100</div>
                  <div className="text-sm text-green-600">Low Risk</div>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Campaign Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Campaigns:</span>
                  <span className="font-medium">{campaigns.filter(c => c.status === 'active').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Participation:</span>
                  <span className="font-medium">{metrics.campaignsParticipated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Performance:</span>
                  <span className="font-medium text-green-600">85%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">GT Distribution</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active GTs:</span>
                  <span className="font-medium text-green-600">{metrics.activeGTs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Rating:</span>
                  <span className="font-medium">{metrics.averageRating}★</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Territory Coverage:</span>
                  <span className="font-medium">{metrics.territoryOwnership} regions</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Risk Assessment</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Overall Risk:</span>
                  <span className="font-medium text-green-600">Low</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">High Risk GTs:</span>
                  <span className="font-medium text-red-600">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Compliance Score:</span>
                  <span className="font-medium text-green-600">94%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GT Management Tab */}
      {activeTab === 'gts' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search GT accounts..."
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
                <button className="border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* GT Accounts Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">GT Account Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      GT Account
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monthly Volume
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Level
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
                  {gtAccounts.map((gt) => (
                    <tr key={gt.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900">{gt.name}</div>
                          <div className="text-sm text-gray-500">{gt.phone}</div>
                          <div className="text-sm text-gray-500">{gt.region}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTierColor(gt.tier)}`}>
                          {gt.tier.charAt(0).toUpperCase() + gt.tier.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(gt.monthlyVolume)}
                        </div>
                        <div className="text-sm text-gray-500">{gt.totalOrders} orders</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(gt.riskLevel)}`}>
                          {gt.riskLevel.charAt(0).toUpperCase() + gt.riskLevel.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(gt.status)}`}>
                          {gt.status.charAt(0).toUpperCase() + gt.status.slice(1)}
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

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Performance Analytics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
                <div className="text-sm text-blue-700">Overall Performance</div>
                <div className="text-xs text-blue-600 mt-1">+5% vs last month</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
                <div className="text-sm text-green-700">Order Fulfillment</div>
                <div className="text-xs text-green-600 mt-1">Above target</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">4.7★</div>
                <div className="text-sm text-purple-700">Customer Rating</div>
                <div className="text-xs text-purple-600 mt-1">Excellent</div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">2.3x</div>
                <div className="text-sm text-orange-700">Growth Rate</div>
                <div className="text-xs text-orange-600 mt-1">Year over year</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Campaign Participation</h3>
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
                      Participation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Earnings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
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
                            {campaign.startDate.toLocaleDateString()} - {campaign.endDate.toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{campaign.brandName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{campaign.participation}%</div>
                        <div className="text-sm text-gray-500">+{campaign.pointsEarned} points</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(campaign.earnings)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RiskWatch Tab */}
      {activeTab === 'riskwatch' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Overall Risk Score</h3>
                <Shield className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{metrics.riskScore}/100</div>
                <div className="text-sm text-green-700">Low Risk</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                  <div 
                    className="bg-green-500 h-3 rounded-full" 
                    style={{ width: `${metrics.riskScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Risk Alerts</h3>
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">High Risk GTs:</span>
                  <span className="font-medium text-red-600">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Payment Delays:</span>
                  <span className="font-medium text-yellow-600">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Compliance Issues:</span>
                  <span className="font-medium text-green-600">0</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Risk Trends</h3>
                <Activity className="h-6 w-6 text-blue-500" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Month:</span>
                  <span className="font-medium text-green-600">↓ -5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last 3 Months:</span>
                  <span className="font-medium text-green-600">↓ -12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Trend:</span>
                  <span className="font-medium text-green-600">Improving</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Risk Assessment Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Risk Factors</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-700">Payment History</span>
                    <span className="text-green-600 font-medium">Excellent</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-700">Order Consistency</span>
                    <span className="text-green-600 font-medium">High</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm text-gray-700">Geographic Concentration</span>
                    <span className="text-yellow-600 font-medium">Medium</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-700">Compliance Score</span>
                    <span className="text-green-600 font-medium">94%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-4">Recommendations</h4>
                <div className="space-y-3">
                  <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-blue-900">Diversify GT Portfolio</div>
                      <div className="text-xs text-blue-700">Consider expanding to new regions</div>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-blue-900">Monitor High-Risk GTs</div>
                      <div className="text-xs text-blue-700">Increase monitoring frequency for 2 accounts</div>
                    </div>
                  </div>
                  <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-blue-900">Maintain Current Performance</div>
                      <div className="text-xs text-blue-700">Continue current risk management practices</div>
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