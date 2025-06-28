import React from 'react';
import { Package, Building2, ArrowRight, Users, Target, TrendingUp, Award } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: 'distributor' | 'supplier') => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#085B59]/10 to-[#FF8B00]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#FF8B00]/10 to-[#085B59]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-50/30 to-purple-50/30 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src="/image.png" 
              alt="Baskit" 
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-[#085B59]">Baskit</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            AI-powered procurement platform connecting suppliers and distributors across Indonesia. 
            Choose your role to get started with personalized features.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Distributor Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF8B00] to-[#e67a00] rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-[#FF8B00] to-[#e67a00] p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">Perfect for</div>
                    <div className="font-bold">Procurement Teams</div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-2">Distributor</h2>
                <p className="text-lg opacity-90">Find suppliers for your procurement needs</p>
              </div>

              {/* Card Content */}
              <div className="p-8">
                <div className="space-y-6">
                  {/* Features */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">What you can do:</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#FF8B00]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Target className="h-3 w-3 text-[#FF8B00]" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">AI-Powered Supplier Matching</div>
                          <div className="text-sm text-gray-600">Get intelligent recommendations based on your needs</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#FF8B00]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <TrendingUp className="h-3 w-3 text-[#FF8B00]" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Real-time Price Comparison</div>
                          <div className="text-sm text-gray-600">Compare pricing and delivery terms instantly</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#FF8B00]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Award className="h-3 w-3 text-[#FF8B00]" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Direct PO Creation</div>
                          <div className="text-sm text-gray-600">Create purchase orders with ERP integration</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-[#FF8B00]">500+</div>
                        <div className="text-xs text-gray-600">Verified Suppliers</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#FF8B00]">95%</div>
                        <div className="text-xs text-gray-600">Match Accuracy</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => onRoleSelect('distributor')}
                    className="w-full bg-[#FF8B00] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#e67a00] transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Start as Distributor
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Supplier Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#085B59] to-[#074e4c] rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-[#085B59] to-[#074e4c] p-8 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">Perfect for</div>
                    <div className="font-bold">Manufacturing & Supply</div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-2">Supplier</h2>
                <p className="text-lg opacity-90">View demand and submit competitive quotes</p>
              </div>

              {/* Card Content */}
              <div className="p-8">
                <div className="space-y-6">
                  {/* Features */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">What you can do:</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#085B59]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Users className="h-3 w-3 text-[#085B59]" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">View Distributor Demand</div>
                          <div className="text-sm text-gray-600">See real-time procurement requests and opportunities</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#085B59]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Target className="h-3 w-3 text-[#085B59]" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Submit Competitive Quotes</div>
                          <div className="text-sm text-gray-600">Respond to RFQs with pricing and availability</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-[#085B59]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <TrendingUp className="h-3 w-3 text-[#085B59]" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Market Intelligence</div>
                          <div className="text-sm text-gray-600">Track demand trends and pricing insights</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-[#085B59]">1000+</div>
                        <div className="text-xs text-gray-600">Active Distributors</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#085B59]">Rp50B+</div>
                        <div className="text-xs text-gray-600">Monthly Volume</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => onRoleSelect('supplier')}
                    className="w-full bg-[#085B59] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#074e4c] transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Start as Supplier
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 max-w-4xl mx-auto">
            <h3 className="font-semibold text-gray-900 mb-3">Trusted by Leading Companies</h3>
            <p className="text-gray-600 text-sm mb-4">
              Join thousands of businesses already using Baskit to streamline their procurement and supply chain operations
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                ISO 27001 Certified
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Bank-grade Security
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};