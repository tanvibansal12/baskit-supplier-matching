import React, { useState } from 'react';
import { Plus, Edit, Trash2, Play, Pause, Eye, Users, Target, DollarSign, Calendar, Package, Star, CheckCircle, XCircle, Clock, Award } from 'lucide-react';
import { Campaign, DistributorApplication } from '../../types/marketplace';
import { mockCampaigns, mockDistributors, mockProducts } from '../../data/marketplaceData';

interface CampaignManagerProps {
  brandId: string;
}

export const CampaignManager: React.FC<CampaignManagerProps> = ({ brandId }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns.filter(c => c.brandId === brandId));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  
  // Form state for creating/editing campaigns
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    skus: [] as string[],
    targetRegion: '',
    budget: 0,
    pointsPerReceipt: 100,
    bonusMultiplier: 1,
    startDate: '',
    endDate: ''
  });

  // Mock applications data
  const mockApplications: DistributorApplication[] = [
    {
      id: '1',
      listingId: '1',
      distributorId: '1',
      distributor: mockDistributors[0],
      proposedQuantity: 500,
      proposedPrice: 3000,
      message: 'We have extensive coverage in Jakarta and can guarantee fast delivery.',
      status: 'pending',
      appliedAt: new Date('2024-03-10'),
    },
    {
      id: '2',
      listingId: '1',
      distributorId: '2',
      distributor: mockDistributors[1],
      proposedQuantity: 300,
      proposedPrice: 3100,
      message: 'Specialized in FMCG distribution with cold chain capabilities.',
      status: 'approved',
      appliedAt: new Date('2024-03-08'),
      respondedAt: new Date('2024-03-09')
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />;
      case 'draft': return <Edit className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleCreateCampaign = () => {
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      brandId,
      brand: { id: brandId, name: 'Your Brand', email: '', phone: '', description: '', isVerified: true, createdAt: new Date() },
      name: formData.name,
      description: formData.description,
      skus: formData.skus,
      targetRegion: formData.targetRegion,
      budget: formData.budget,
      spentBudget: 0,
      pointsPerReceipt: formData.pointsPerReceipt,
      bonusMultiplier: formData.bonusMultiplier,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      status: 'draft',
      participatingDistributors: [],
      totalReceipts: 0,
      createdAt: new Date()
    };

    setCampaigns([...campaigns, newCampaign]);
    setShowCreateModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      skus: [],
      targetRegion: '',
      budget: 0,
      pointsPerReceipt: 100,
      bonusMultiplier: 1,
      startDate: '',
      endDate: ''
    });
  };

  const toggleCampaignStatus = (campaignId: string) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === campaignId) {
        const newStatus = campaign.status === 'active' ? 'paused' : 'active';
        return { ...campaign, status: newStatus };
      }
      return campaign;
    }));
  };

  const handleApplicationAction = (applicationId: string, action: 'approve' | 'reject') => {
    // In a real app, this would update the application status
    console.log(`${action} application ${applicationId}`);
  };

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Manager</h1>
          <p className="text-gray-600 mt-2">Create and manage your brand campaigns</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#FF8B00] text-white px-6 py-3 rounded-lg hover:bg-[#e67a00] transition-colors font-semibold flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Campaign
        </button>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Total Campaigns</div>
              <div className="text-2xl font-bold text-gray-900">{campaigns.length}</div>
            </div>
            <Target className="h-8 w-8 text-[#085B59]" />
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
            <Play className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Total Budget</div>
              <div className="text-2xl font-bold text-[#FF8B00]">
                Rp{campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
              </div>
            </div>
            <DollarSign className="h-8 w-8 text-[#FF8B00]" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Total Receipts</div>
              <div className="text-2xl font-bold text-blue-600">
                {campaigns.reduce((sum, c) => sum + c.totalReceipts, 0)}
              </div>
            </div>
            <Award className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Your Campaigns</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-600">{campaign.description}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {campaign.skus.length} SKUs • {campaign.pointsPerReceipt} pts/receipt
                        {campaign.bonusMultiplier && campaign.bonusMultiplier > 1 && (
                          <span className="ml-1 text-blue-600">• {campaign.bonusMultiplier}x bonus</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {getStatusIcon(campaign.status)}
                      <span className="ml-1">{campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.targetRegion}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Rp{campaign.budget.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      Spent: Rp{campaign.spentBudget.toLocaleString()}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-[#FF8B00] h-1.5 rounded-full" 
                        style={{ width: `${(campaign.spentBudget / campaign.budget) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center text-xs text-gray-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      {campaign.startDate.toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      to {campaign.endDate.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {campaign.totalReceipts} receipts
                    </div>
                    <div className="text-xs text-gray-500">
                      {campaign.participatingDistributors.length} distributors
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCampaign(campaign);
                          setShowApplicationsModal(true);
                        }}
                        className="text-[#085B59] hover:text-[#074e4c] flex items-center"
                      >
                        <Users className="h-4 w-4 mr-1" />
                        Applications
                      </button>
                      <button
                        onClick={() => toggleCampaignStatus(campaign.id)}
                        className={`${
                          campaign.status === 'active' 
                            ? 'text-yellow-600 hover:text-yellow-800' 
                            : 'text-green-600 hover:text-green-800'
                        } flex items-center`}
                      >
                        {campaign.status === 'active' ? (
                          <>
                            <Pause className="h-4 w-4 mr-1" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-1" />
                            Activate
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {campaigns.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No campaigns yet</h3>
            <p className="text-gray-600 mb-4">Create your first campaign to start engaging with distributors.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#FF8B00] text-white px-6 py-3 rounded-lg hover:bg-[#e67a00] transition-colors font-semibold"
            >
              Create Your First Campaign
            </button>
          </div>
        )}
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Create New Campaign</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                  placeholder="Enter campaign name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                  placeholder="Describe your campaign"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Region *
                  </label>
                  <select
                    value={formData.targetRegion}
                    onChange={(e) => setFormData({ ...formData, targetRegion: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                  >
                    <option value="">Select Region</option>
                    <option value="DKI Jakarta">DKI Jakarta</option>
                    <option value="Jawa Barat">Jawa Barat</option>
                    <option value="Jawa Timur">Jawa Timur</option>
                    <option value="Jawa Tengah">Jawa Tengah</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget (Rp) *
                  </label>
                  <input
                    type="number"
                    value={formData.budget || ''}
                    onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                    placeholder="Campaign budget"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Points per Receipt *
                  </label>
                  <input
                    type="number"
                    value={formData.pointsPerReceipt}
                    onChange={(e) => setFormData({ ...formData, pointsPerReceipt: parseInt(e.target.value) || 100 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bonus Multiplier
                  </label>
                  <select
                    value={formData.bonusMultiplier}
                    onChange={(e) => setFormData({ ...formData, bonusMultiplier: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                  >
                    <option value={1}>1x (No bonus)</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                    <option value={3}>3x</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select SKUs *
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-3">
                  {mockProducts.map((product) => (
                    <label key={product.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.skus.includes(product.sku)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, skus: [...formData.skus, product.sku] });
                          } else {
                            setFormData({ ...formData, skus: formData.skus.filter(sku => sku !== product.sku) });
                          }
                        }}
                        className="mr-2 text-[#FF8B00] focus:ring-[#FF8B00]"
                      />
                      <span className="text-sm">{product.name} ({product.sku})</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                disabled={!formData.name || !formData.description || !formData.targetRegion || !formData.budget || formData.skus.length === 0}
                className="bg-[#FF8B00] text-white px-6 py-2 rounded-lg hover:bg-[#e67a00] transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Applications Modal */}
      {showApplicationsModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Distributor Applications - {selectedCampaign.name}
              </h2>
              <button
                onClick={() => setShowApplicationsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {mockApplications.map((application) => (
                  <div key={application.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#085B59] to-[#FF8B00] rounded-full flex items-center justify-center text-white font-bold">
                          {application.distributor.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{application.distributor.name}</h3>
                          <p className="text-sm text-gray-600">{application.distributor.region}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm text-gray-600">{application.distributor.rating}</span>
                            <span className="text-sm text-gray-400 ml-2">
                              • {application.distributor.totalFulfillments} fulfillments
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getApplicationStatusColor(application.status)}`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600">Proposed Quantity</div>
                        <div className="font-semibold text-gray-900">{application.proposedQuantity.toLocaleString()}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600">Proposed Price</div>
                        <div className="font-semibold text-gray-900">Rp{application.proposedPrice.toLocaleString()}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600">Total Value</div>
                        <div className="font-semibold text-gray-900">
                          Rp{(application.proposedQuantity * application.proposedPrice).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">Message:</div>
                      <p className="text-gray-900 bg-gray-50 rounded-lg p-3">{application.message}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div>Applied on {application.appliedAt.toLocaleDateString()}</div>
                      {application.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApplicationAction(application.id, 'approve')}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleApplicationAction(application.id, 'reject')}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {mockApplications.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                  <p className="text-gray-600">Distributors will apply to fulfill your campaign listings.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};