import React from 'react';
import { ArrowRight, Target, Zap, Store } from 'lucide-react';

interface HeroSectionProps {
  onStartRecommendation: () => void;
  onGoToMarketplace?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartRecommendation, onGoToMarketplace }) => {
  return (
    <section className="bg-white py-20 lg:py-32 relative overflow-hidden">
      {/* Animated 3D Background */}
      <div className="hero-3d-bg">
        {/* Floating circular shapes */}
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        
        {/* Geometric shapes */}
        <div className="geometric-shape"></div>
        <div className="geometric-shape"></div>
        <div className="geometric-shape"></div>
        
        {/* Gradient orbs */}
        <div className="gradient-orb"></div>
        <div className="gradient-orb"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium text-gray-700">AI-Powered Supplier Matching</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find the{' '}
              <span className="text-[#085B59]">Right Supplier</span>{' '}
              Fast and Smart
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
              Simplify your internal procurement workflow with AI recommendations.
Match with trusted suppliers, compare based on delivery and pricing, and create POs directly from one place.
            </p>
            
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onStartRecommendation}
                className="bg-[#FF8B00] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#e67a00] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                Find Suppliers
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              {onGoToMarketplace && (
                <button
                  onClick={onGoToMarketplace}
                  className="bg-[#085B59] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#074e4c] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <Store className="mr-2 h-5 w-5" />
                  Marketplace
                </button>
              )}
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-600">Baskit Dashboard</div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Total Procurement</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-[#FF8B00] rounded-full"></div>
                      <span className="text-sm text-gray-600">Live</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">Rp3,726,045</div>
                  <div className="text-sm text-green-600 mt-1">↗ 12% from last month</div>
                </div>

                {/* Supplier Cards */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#085B59] rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">T</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">TechnoSupply Co.</div>
                        <div className="text-sm text-gray-600">Electronics • 5-7 days</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        Rp36,750
                      </div>
                      <div className="text-xs text-[#FF8B00] font-medium">AI Match</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">G</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Global Parts Ltd.</div>
                        <div className="text-sm text-gray-600">Hardware • 3-5 days</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        Rp32,700
                      </div>
                      <div className="text-xs text-green-600 font-medium">Best Price</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-[#FF8B00] text-white py-2 px-4 rounded-lg text-sm font-medium">
                    Create PO
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
                    Contact
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-[#FF8B00] text-white p-3 rounded-full shadow-lg">
              <Target className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#085B59] text-white p-3 rounded-full shadow-lg">
              <Zap className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#085B59] mb-2">500+</div>
            <div className="text-gray-600">Verified Suppliers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#085B59] mb-2">95%</div>
            <div className="text-gray-600">Match Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#085B59] mb-2">2.5x</div>
            <div className="text-gray-600">Faster Procurement</div>
          </div>
        </div>
      </div>
    </section>
  );
};