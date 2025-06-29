import React, { useState } from 'react';
import { Wallet, Star, Gift, History, TrendingUp, Award, Calendar, ArrowRight, Coins, Target } from 'lucide-react';

interface LoyaltyTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  points: number;
  description: string;
  date: Date;
  receiptId?: string;
  campaignId?: string;
}

interface LoyaltyWalletProps {
  userId: string;
  userType: 'retailer' | 'distributor';
  totalPoints: number;
  transactions: LoyaltyTransaction[];
}

export const LoyaltyWallet: React.FC<LoyaltyWalletProps> = ({
  userId,
  userType,
  totalPoints,
  transactions
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'rewards'>('overview');

  // Mock data for demonstration
  const mockTransactions: LoyaltyTransaction[] = [
    {
      id: '1',
      type: 'earned',
      points: 200,
      description: 'Receipt upload - Indomie Goreng purchase',
      date: new Date('2024-03-15'),
      receiptId: '1',
      campaignId: '1'
    },
    {
      id: '2',
      type: 'earned',
      points: 150,
      description: 'Receipt upload - Bear Brand Susu Steril',
      date: new Date('2024-03-12'),
      receiptId: '2',
      campaignId: '2'
    },
    {
      id: '3',
      type: 'redeemed',
      points: -100,
      description: 'Redeemed for discount voucher',
      date: new Date('2024-03-10')
    },
    {
      id: '4',
      type: 'earned',
      points: 300,
      description: 'Campaign bonus - Ramadan special',
      date: new Date('2024-03-08'),
      campaignId: '1'
    }
  ];

  const allTransactions = transactions.length > 0 ? transactions : mockTransactions;
  const currentPoints = totalPoints || 12450;

  // Calculate statistics
  const totalEarned = allTransactions
    .filter(t => t.type === 'earned')
    .reduce((sum, t) => sum + t.points, 0);
  
  const totalRedeemed = Math.abs(allTransactions
    .filter(t => t.type === 'redeemed')
    .reduce((sum, t) => sum + t.points, 0));

  const thisMonthEarned = allTransactions
    .filter(t => t.type === 'earned' && t.date.getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.points, 0);

  // Mock rewards data
  const availableRewards = [
    {
      id: '1',
      name: '10% Discount Voucher',
      description: 'Get 10% off your next purchase',
      pointsCost: 500,
      category: 'Discount',
      image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop'
    },
    {
      id: '2',
      name: 'Free Product Sample',
      description: 'Get a free sample of new products',
      pointsCost: 1000,
      category: 'Product',
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop'
    },
    {
      id: '3',
      name: 'Premium Membership',
      description: '3 months of premium benefits',
      pointsCost: 2000,
      category: 'Membership',
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop'
    }
  ];

  const getTransactionIcon = (type: string) => {
    return type === 'earned' ? (
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <TrendingUp className="h-4 w-4 text-green-600" />
      </div>
    ) : (
      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
        <Gift className="h-4 w-4 text-red-600" />
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-[#085B59] to-[#FF8B00] rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Loyalty Wallet</h1>
        <p className="text-gray-600">Track your points and redeem amazing rewards</p>
      </div>

      {/* Points Balance Card */}
      <div className="bg-gradient-to-r from-[#085B59] to-[#FF8B00] rounded-xl text-white p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold opacity-90">Total Points Balance</h2>
              <div className="text-4xl font-bold mt-2">{currentPoints.toLocaleString()}</div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Account Type</div>
              <div className="font-semibold capitalize">{userType}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm opacity-90">This Month</div>
              <div className="text-xl font-bold">+{thisMonthEarned}</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm opacity-90">Total Earned</div>
              <div className="text-xl font-bold">{totalEarned.toLocaleString()}</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-sm opacity-90">Total Redeemed</div>
              <div className="text-xl font-bold">{totalRedeemed.toLocaleString()}</div>
            </div>
          </div>
          
          {/* Tier Status */}
          <div className="mt-4 bg-white/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                <span className="font-semibold">Gold Partner Status</span>
              </div>
              <div className="text-sm opacity-90">Next: Platinum</div>
            </div>
            <div className="w-full bg-white/30 rounded-full h-3">
              <div className="bg-white h-3 rounded-full" style={{ width: '67%' }}></div>
            </div>
            <div className="text-xs opacity-75 mt-1">
              Upload 89 more receipts to reach Platinum tier
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#FF8B00] text-white'
                : 'text-gray-600 hover:text-[#FF8B00]'
            }`}
          >
            <Star className="h-5 w-5 mx-auto mb-1" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-[#FF8B00] text-white'
                : 'text-gray-600 hover:text-[#FF8B00]'
            }`}
          >
            <History className="h-5 w-5 mx-auto mb-1" />
            History
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              activeTab === 'rewards'
                ? 'bg-[#FF8B00] text-white'
                : 'text-gray-600 hover:text-[#FF8B00]'
            }`}
          >
            <Gift className="h-5 w-5 mx-auto mb-1" />
            Rewards
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Points This Week</div>
                  <div className="text-2xl font-bold text-gray-900">+{Math.floor(thisMonthEarned * 0.3)}</div>
                  <div className="text-sm text-green-600 mt-1">↗ 15% increase</div>
                </div>
                <Coins className="h-8 w-8 text-[#FF8B00]" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Active Campaigns</div>
                  <div className="text-2xl font-bold text-gray-900">3</div>
                  <div className="text-sm text-blue-600 mt-1">2 ending soon</div>
                </div>
                <Target className="h-8 w-8 text-[#085B59]" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Next Reward</div>
                  <div className="text-2xl font-bold text-gray-900">{500 - (currentPoints % 500)}</div>
                  <div className="text-sm text-gray-600 mt-1">points needed</div>
                </div>
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {allTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <div className="font-medium text-gray-900">{transaction.description}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {transaction.date.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className={`font-bold ${
                    transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'earned' ? '+' : ''}{transaction.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Transaction History</h3>
          <div className="space-y-4">
            {allTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-4">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <div className="font-medium text-gray-900">{transaction.description}</div>
                    <div className="text-sm text-gray-600 flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {transaction.date.toLocaleDateString()} at {transaction.date.toLocaleTimeString()}
                    </div>
                    {transaction.campaignId && (
                      <div className="text-xs text-blue-600 mt-1">Campaign Bonus Applied</div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'earned' ? '+' : ''}{transaction.points}
                  </div>
                  <div className="text-sm text-gray-500">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Available Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableRewards.map((reward) => (
                <div key={reward.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <img 
                    src={reward.image} 
                    alt={reward.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-[#FF8B00]/10 text-[#FF8B00] px-2 py-1 rounded-full font-medium">
                        {reward.category}
                      </span>
                      <div className="text-lg font-bold text-[#085B59]">
                        {reward.pointsCost} pts
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{reward.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                    <button
                      disabled={currentPoints < reward.pointsCost}
                      className="w-full bg-[#FF8B00] text-white py-2 px-4 rounded-lg hover:bg-[#e67a00] transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {currentPoints >= reward.pointsCost ? (
                        <>
                          Redeem Now
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      ) : (
                        `Need ${reward.pointsCost - currentPoints} more points`
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};