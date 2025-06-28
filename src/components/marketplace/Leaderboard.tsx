import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Package, Receipt, Target, Crown, Star, Users } from 'lucide-react';
import { LeaderboardEntry } from '../../types/marketplace';
import { mockDistributors } from '../../data/marketplaceData';

export const Leaderboard: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'overall' | 'fulfillment' | 'receipts' | 'campaigns'>('overall');

  // Mock leaderboard data
  const generateLeaderboardData = (): LeaderboardEntry[] => {
    return mockDistributors.map((distributor, index) => ({
      rank: index + 1,
      distributorId: distributor.id,
      distributor,
      fulfillmentVolume: distributor.totalFulfillments,
      receiptCount: distributor.totalReceiptUploads,
      campaignParticipation: Math.floor(Math.random() * 10) + 1,
      totalScore: distributor.totalFulfillments * 10 + distributor.totalReceiptUploads * 5 + (Math.floor(Math.random() * 10) + 1) * 15
    })).sort((a, b) => {
      switch (activeCategory) {
        case 'fulfillment':
          return b.fulfillmentVolume - a.fulfillmentVolume;
        case 'receipts':
          return b.receiptCount - a.receiptCount;
        case 'campaigns':
          return b.campaignParticipation - a.campaignParticipation;
        default:
          return b.totalScore - a.totalScore;
      }
    }).map((entry, index) => ({ ...entry, rank: index + 1 }));
  };

  const leaderboardData = generateLeaderboardData();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">{rank}</div>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryValue = (entry: LeaderboardEntry) => {
    switch (activeCategory) {
      case 'fulfillment':
        return entry.fulfillmentVolume;
      case 'receipts':
        return entry.receiptCount;
      case 'campaigns':
        return entry.campaignParticipation;
      default:
        return entry.totalScore;
    }
  };

  const getCategoryLabel = () => {
    switch (activeCategory) {
      case 'fulfillment':
        return 'Fulfillments';
      case 'receipts':
        return 'Receipts';
      case 'campaigns':
        return 'Campaigns';
      default:
        return 'Total Score';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Distributor Leaderboard</h1>
        <p className="text-gray-600">Top performing distributors across all metrics</p>
      </div>

      {/* Category Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-4">
          <button
            onClick={() => setActiveCategory('overall')}
            className={`py-4 px-6 text-center font-medium transition-colors ${
              activeCategory === 'overall'
                ? 'bg-[#FF8B00] text-white'
                : 'text-gray-600 hover:text-[#FF8B00] hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="h-5 w-5 mx-auto mb-1" />
            Overall
          </button>
          <button
            onClick={() => setActiveCategory('fulfillment')}
            className={`py-4 px-6 text-center font-medium transition-colors ${
              activeCategory === 'fulfillment'
                ? 'bg-[#FF8B00] text-white'
                : 'text-gray-600 hover:text-[#FF8B00] hover:bg-gray-50'
            }`}
          >
            <Package className="h-5 w-5 mx-auto mb-1" />
            Fulfillment
          </button>
          <button
            onClick={() => setActiveCategory('receipts')}
            className={`py-4 px-6 text-center font-medium transition-colors ${
              activeCategory === 'receipts'
                ? 'bg-[#FF8B00] text-white'
                : 'text-gray-600 hover:text-[#FF8B00] hover:bg-gray-50'
            }`}
          >
            <Receipt className="h-5 w-5 mx-auto mb-1" />
            Receipts
          </button>
          <button
            onClick={() => setActiveCategory('campaigns')}
            className={`py-4 px-6 text-center font-medium transition-colors ${
              activeCategory === 'campaigns'
                ? 'bg-[#FF8B00] text-white'
                : 'text-gray-600 hover:text-[#FF8B00] hover:bg-gray-50'
            }`}
          >
            <Target className="h-5 w-5 mx-auto mb-1" />
            Campaigns
          </button>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-8">
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* 2nd Place */}
          {leaderboardData[1] && (
            <div className="order-1 text-center">
              <div className="bg-gradient-to-r from-gray-300 to-gray-500 rounded-lg p-6 text-white mb-4 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white rounded-full p-2">
                    <Medal className="h-6 w-6 text-gray-500" />
                  </div>
                </div>
                <div className="pt-4">
                  <div className="text-3xl font-bold mb-1">2nd</div>
                  <div className="text-lg font-semibold">{leaderboardData[1].distributor.name}</div>
                  <div className="text-sm opacity-90">{leaderboardData[1].distributor.region}</div>
                  <div className="text-2xl font-bold mt-2">{getCategoryValue(leaderboardData[1]).toLocaleString()}</div>
                  <div className="text-sm opacity-90">{getCategoryLabel()}</div>
                </div>
              </div>
            </div>
          )}

          {/* 1st Place */}
          {leaderboardData[0] && (
            <div className="order-2 text-center">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-6 text-white mb-4 relative transform scale-105">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white rounded-full p-2">
                    <Crown className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
                <div className="pt-4">
                  <div className="text-4xl font-bold mb-1">1st</div>
                  <div className="text-xl font-semibold">{leaderboardData[0].distributor.name}</div>
                  <div className="text-sm opacity-90">{leaderboardData[0].distributor.region}</div>
                  <div className="text-3xl font-bold mt-2">{getCategoryValue(leaderboardData[0]).toLocaleString()}</div>
                  <div className="text-sm opacity-90">{getCategoryLabel()}</div>
                </div>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {leaderboardData[2] && (
            <div className="order-3 text-center">
              <div className="bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg p-6 text-white mb-4 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white rounded-full p-2">
                    <Award className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
                <div className="pt-4">
                  <div className="text-3xl font-bold mb-1">3rd</div>
                  <div className="text-lg font-semibold">{leaderboardData[2].distributor.name}</div>
                  <div className="text-sm opacity-90">{leaderboardData[2].distributor.region}</div>
                  <div className="text-2xl font-bold mt-2">{getCategoryValue(leaderboardData[2]).toLocaleString()}</div>
                  <div className="text-sm opacity-90">{getCategoryLabel()}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Complete Rankings - {getCategoryLabel()}
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distributor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fulfillments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Receipts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaigns
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getCategoryLabel()}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboardData.map((entry) => (
                <tr key={entry.distributorId} className={`hover:bg-gray-50 ${entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-transparent' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRankBadgeColor(entry.rank)}`}>
                      {getRankIcon(entry.rank)}
                      <span className="ml-2">#{entry.rank}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#085B59] to-[#FF8B00] rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                        {entry.distributor.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{entry.distributor.name}</div>
                        <div className="text-sm text-gray-500">{entry.distributor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.distributor.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.fulfillmentVolume}</div>
                    <div className="text-xs text-gray-500">orders completed</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.receiptCount}</div>
                    <div className="text-xs text-gray-500">receipts uploaded</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{entry.campaignParticipation}</div>
                    <div className="text-xs text-gray-500">campaigns joined</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium text-gray-900">{entry.distributor.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-[#085B59]">
                      {getCategoryValue(entry).toLocaleString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <Crown className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="font-medium text-yellow-800">Top Performer</div>
            <div className="text-xs text-yellow-600">Rank #1 Overall</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Package className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="font-medium text-blue-800">Fulfillment King</div>
            <div className="text-xs text-blue-600">100+ Orders</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <Receipt className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="font-medium text-green-800">Receipt Master</div>
            <div className="text-xs text-green-600">50+ Receipts</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <Target className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="font-medium text-purple-800">Campaign Hero</div>
            <div className="text-xs text-purple-600">5+ Campaigns</div>
          </div>
        </div>
      </div>
    </div>
  );
};