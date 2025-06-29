import React, { useState } from 'react';
import { 
  TrendingUp, Users, Package, Receipt, Target, Award, 
  ArrowRight, Zap, Crown, Star, Lock, Unlock, 
  BarChart3, DollarSign, Shield, Smartphone, MessageCircle,
  CheckCircle, Clock, AlertTriangle, Trophy, Building2
} from 'lucide-react';

interface FlywheelMetrics {
  brands: { total: number; active: number; growth: number };
  distributors: { total: number; active: number; growth: number };
  retailers: { total: number; active: number; growth: number };
  receipts: { total: number; verified: number; growth: number };
  engagement: { score: number; trend: string; activities: number };
  revenue: { total: number; growth: number; arpu: number };
}

interface TierBenefit {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  name: string;
  requirements: string;
  benefits: string[];
  creditLimit?: number;
  analyticsAccess: boolean;
  exclusiveDeals: boolean;
  color: string;
  icon: React.ReactNode;
}

export const FlywheelDashboard: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedTier, setSelectedTier] = useState<string>('gold');

  // Mock flywheel metrics
  const metrics: FlywheelMetrics = {
    brands: { total: 156, active: 142, growth: 23 },
    distributors: { total: 2847, active: 2156, growth: 18 },
    retailers: { total: 15420, active: 12890, growth: 31 },
    receipts: { total: 89650, verified: 82340, growth: 45 },
    engagement: { score: 87, trend: 'up', activities: 156780 },
    revenue: { total: 2850000000, growth: 67, arpu: 185000 }
  };

  // Tiered access system
  const tiers: TierBenefit[] = [
    {
      tier: 'bronze',
      name: 'Bronze Partner',
      requirements: '< 50 receipts/month',
      benefits: ['Basic analytics', 'Standard support', 'Monthly reports'],
      creditLimit: 5000000,
      analyticsAccess: false,
      exclusiveDeals: false,
      color: 'from-amber-600 to-amber-800',
      icon: <Award className="h-6 w-6" />
    },
    {
      tier: 'silver',
      name: 'Silver Partner',
      requirements: '50-200 receipts/month',
      benefits: ['Enhanced analytics', 'Priority support', 'Weekly reports', 'Basic credit access'],
      creditLimit: 15000000,
      analyticsAccess: true,
      exclusiveDeals: false,
      color: 'from-gray-400 to-gray-600',
      icon: <Star className="h-6 w-6" />
    },
    {
      tier: 'gold',
      name: 'Gold Partner',
      requirements: '200-500 receipts/month',
      benefits: ['Advanced analytics', 'Dedicated support', 'Real-time reports', 'Extended credit', 'Exclusive campaigns'],
      creditLimit: 50000000,
      analyticsAccess: true,
      exclusiveDeals: true,
      color: 'from-yellow-400 to-yellow-600',
      icon: <Trophy className="h-6 w-6" />
    },
    {
      tier: 'platinum',
      name: 'Platinum Partner',
      requirements: '500+ receipts/month',
      benefits: ['Full analytics suite', 'White-glove support', 'Custom reports', 'Unlimited credit', 'First access to new brands', 'Revenue sharing'],
      creditLimit: 200000000,
      analyticsAccess: true,
      exclusiveDeals: true,
      color: 'from-purple-400 to-purple-600',
      icon: <Crown className="h-6 w-6" />
    }
  ];

  // Six-step flywheel
  const flywheelSteps = [
    {
      id: 0,
      title: 'Brands',
      description: 'Brands list products and create campaigns',
      metrics: metrics.brands,
      icon: <Building2 className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      details: 'Brands join to reach distributors and retailers directly, creating targeted campaigns with loyalty rewards.'
    },
    {
      id: 1,
      title: 'Distributors',
      description: 'Distributors fulfill brand requirements',
      metrics: metrics.distributors,
      icon: <Package className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      details: 'Distributors compete to fulfill brand listings, earning tier benefits and exclusive access.'
    },
    {
      id: 2,
      title: 'Retailers',
      description: 'Retailers purchase and upload receipts',
      metrics: metrics.retailers,
      icon: <Users className="h-8 w-8" />,
      color: 'from-purple-500 to-purple-600',
      details: 'Retailers buy products and upload receipts via WhatsApp, earning loyalty points and rewards.'
    },
    {
      id: 3,
      title: 'Data',
      description: 'Receipt data creates market intelligence',
      metrics: metrics.receipts,
      icon: <BarChart3 className="h-8 w-8" />,
      color: 'from-orange-500 to-orange-600',
      details: 'Receipt uploads generate valuable market data, purchase patterns, and consumer insights.'
    },
    {
      id: 4,
      title: 'Engagement',
      description: 'Data drives personalized engagement',
      metrics: metrics.engagement,
      icon: <Zap className="h-8 w-8" />,
      color: 'from-pink-500 to-pink-600',
      details: 'Insights enable targeted campaigns, personalized offers, and improved user experiences.'
    },
    {
      id: 5,
      title: 'Growth Loop',
      description: 'Success attracts more participants',
      metrics: metrics.revenue,
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'from-indigo-500 to-indigo-600',
      details: 'Platform success attracts more brands, distributors, and retailers, accelerating the flywheel.'
    }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) return `Rp${(amount / 1000000000).toFixed(1)}B`;
    if (amount >= 1000000) return `Rp${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `Rp${(amount / 1000).toFixed(1)}K`;
    return `Rp${amount}`;
  };

  const getMetricValue = (step: any) => {
    switch (step.id) {
      case 0: return step.metrics.active;
      case 1: return step.metrics.active;
      case 2: return step.metrics.active;
      case 3: return step.metrics.verified;
      case 4: return step.metrics.score;
      case 5: return formatCurrency(step.metrics.total);
      default: return 0;
    }
  };

  const getMetricLabel = (step: any) => {
    switch (step.id) {
      case 0: return 'Active Brands';
      case 1: return 'Active Distributors';
      case 2: return 'Active Retailers';
      case 3: return 'Verified Receipts';
      case 4: return 'Engagement Score';
      case 5: return 'Platform Revenue';
      default: return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Baskit Network Flywheel
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Six-step network flywheel driving exponential growth through digitized cash behavior, 
          tiered access, and marketplace competition
        </p>
      </div>

      {/* Flywheel Visualization */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Network Flywheel in Action
        </h2>
        
        {/* Circular Flywheel */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {flywheelSteps.map((step, index) => (
              <div
                key={step.id}
                className={`relative cursor-pointer transition-all duration-300 ${
                  activeStep === index ? 'scale-110 z-10' : 'hover:scale-105'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`bg-gradient-to-r ${step.color} rounded-xl p-6 text-white shadow-lg`}>
                  <div className="flex items-center justify-between mb-4">
                    {step.icon}
                    <div className="text-right">
                      <div className="text-2xl font-bold">{getMetricValue(step)}</div>
                      <div className="text-sm opacity-90">{getMetricLabel(step)}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm opacity-90">{step.description}</p>
                  
                  {/* Growth indicator */}
                  <div className="mt-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">
                      +{step.metrics.growth || Math.floor(Math.random() * 50 + 10)}% growth
                    </span>
                  </div>
                </div>

                {/* Arrow to next step */}
                {index < flywheelSteps.length - 1 && index !== 2 && (
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                
                {/* Special arrow from step 3 to 4 */}
                {index === 2 && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                    <ArrowRight className="h-6 w-6 text-gray-400 rotate-90" />
                  </div>
                )}
                
                {/* Loop back arrow */}
                {index === 5 && (
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-20">
                    <div className="flex items-center">
                      <ArrowRight className="h-6 w-6 text-green-500 rotate-180" />
                      <span className="text-xs text-green-600 font-medium ml-1">Loop</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Step Details */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Step {activeStep + 1}: {flywheelSteps[activeStep].title}
          </h3>
          <p className="text-gray-700">{flywheelSteps[activeStep].details}</p>
        </div>
      </div>

      {/* Tiered Access System */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Tiered Access & Benefits System
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.tier}
              className={`relative cursor-pointer transition-all duration-300 ${
                selectedTier === tier.tier ? 'scale-105 ring-4 ring-blue-200' : 'hover:scale-102'
              }`}
              onClick={() => setSelectedTier(tier.tier)}
            >
              <div className={`bg-gradient-to-r ${tier.color} rounded-xl p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  {tier.icon}
                  {tier.tier === 'platinum' && (
                    <Crown className="h-6 w-6 text-yellow-300" />
                  )}
                </div>
                
                <h3 className="text-lg font-bold mb-2">{tier.name}</h3>
                <p className="text-sm opacity-90 mb-4">{tier.requirements}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Credit Limit:</span>
                    <span className="font-bold">{formatCurrency(tier.creditLimit || 0)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Analytics:</span>
                    {tier.analyticsAccess ? (
                      <Unlock className="h-4 w-4 text-green-300" />
                    ) : (
                      <Lock className="h-4 w-4 text-red-300" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Exclusive Deals:</span>
                    {tier.exclusiveDeals ? (
                      <CheckCircle className="h-4 w-4 text-green-300" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-300" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Tier Benefits */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {tiers.find(t => t.tier === selectedTier)?.name} Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tiers.find(t => t.tier === selectedTier)?.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Digitized Cash Behavior */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Digitized Cash Behavior
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* WhatsApp Integration */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">WhatsApp Orders</h3>
            <p className="text-gray-600 mb-4">
              Enable instant ordering and communication through WhatsApp integration
            </p>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">89%</div>
              <div className="text-sm text-green-700">Order completion rate</div>
            </div>
          </div>

          {/* Receipt Uploads */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Receipt Digitization</h3>
            <p className="text-gray-600 mb-4">
              Convert cash transactions into digital data through receipt uploads
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <div className="text-sm text-blue-700">Verification accuracy</div>
            </div>
          </div>

          {/* Loyalty Points */}
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Loyalty Rewards</h3>
            <p className="text-gray-600 mb-4">
              Incentivize behavior through points, tiers, and exclusive benefits
            </p>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">156K</div>
              <div className="text-sm text-purple-700">Points distributed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Marketplace Competition Model */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Marketplace Competition Model
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Fulfill */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Fulfill</h3>
            <p className="text-gray-600 mb-4">
              Distributors compete to fulfill brand listings with best pricing, quality, and delivery terms
            </p>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-lg font-bold text-orange-600">2,847</div>
              <div className="text-sm text-orange-700">Active distributors competing</div>
            </div>
          </div>

          {/* Claim */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Claim</h3>
            <p className="text-gray-600 mb-4">
              Successful fulfillment earns territory ownership, exclusive access, and higher tier benefits
            </p>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-lg font-bold text-green-600">156</div>
              <div className="text-sm text-green-700">Territories claimed</div>
            </div>
          </div>

          {/* Ownership */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Ownership</h3>
            <p className="text-gray-600 mb-4">
              Territory owners get first access to new opportunities, revenue sharing, and platform governance
            </p>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-lg font-bold text-purple-600">23%</div>
              <div className="text-sm text-purple-700">Revenue share for owners</div>
            </div>
          </div>
        </div>

        {/* Competition Metrics */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Competition Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4.2</div>
              <div className="text-sm text-gray-600">Avg bids per listing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">18%</div>
              <div className="text-sm text-gray-600">Price improvement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">2.3x</div>
              <div className="text-sm text-gray-600">Faster fulfillment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">94%</div>
              <div className="text-sm text-gray-600">Satisfaction rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};