import React, { useState } from 'react';
import { 
  Star, MapPin, Clock, Package, DollarSign, Phone, Mail, 
  ExternalLink, Shield, TrendingUp, AlertTriangle, CheckCircle,
  Building2, Truck, CreditCard, Calendar, BarChart3, Activity
} from 'lucide-react';
import { RealSupplier, Transaction, basketEcosystemUrls } from '../../data/realSuppliersData';

interface RealSupplierCardProps {
  supplier: RealSupplier;
  requestedItems: { sku: string; quantity: number; productName: string }[];
  onCreateTransaction: (supplierId: string, items: { sku: string; quantity: number }[]) => void;
  onViewDetails: (supplier: RealSupplier) => void;
}

export const RealSupplierCard: React.FC<RealSupplierCardProps> = ({
  supplier,
  requestedItems,
  onCreateTransaction,
  onViewDetails
}) => {
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Match requested items with supplier products
  const matchedProducts = requestedItems.map(requestedItem => {
    const supplierProduct = supplier.products.find(product => 
      product.sku.toLowerCase().includes(requestedItem.sku.toLowerCase()) ||
      product.name.toLowerCase().includes(requestedItem.productName.toLowerCase()) ||
      requestedItem.productName.toLowerCase().includes(product.name.toLowerCase())
    );
    
    return {
      requested: requestedItem,
      supplier: supplierProduct,
      isAvailable: !!supplierProduct && supplierProduct.availability !== 'out-of-stock'
    };
  });

  const availableMatches = matchedProducts.filter(match => match.isAvailable);
  const totalEstimatedCost = availableMatches.reduce((sum, match) => {
    if (match.supplier) {
      return sum + (match.supplier.unitPrice * match.requested.quantity);
    }
    return sum;
  }, 0);

  const matchPercentage = Math.round((availableMatches.length / requestedItems.length) * 100);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in-stock': return 'text-green-600 bg-green-100';
      case 'limited': return 'text-yellow-600 bg-yellow-100';
      case 'pre-order': return 'text-blue-600 bg-blue-100';
      case 'out-of-stock': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'manufacturer': return 'text-purple-600 bg-purple-100';
      case 'distributor': return 'text-blue-600 bg-blue-100';
      case 'wholesaler': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleCreateTransaction = () => {
    const itemsToOrder = availableMatches
      .filter(match => match.supplier)
      .map(match => ({
        sku: match.supplier!.sku,
        quantity: match.requested.quantity
      }));
    
    if (itemsToOrder.length > 0) {
      onCreateTransaction(supplier.id, itemsToOrder);
    }
  };

  const integrationCount = Object.values(supplier.integrations).filter(Boolean).length;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#085B59] to-[#074e4c] text-white p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-xl font-bold">{supplier.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(supplier.type)}`}>
                {supplier.type.charAt(0).toUpperCase() + supplier.type.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm opacity-90 mb-3">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 fill-current" />
                <span className="font-medium">{supplier.rating}</span>
                <span className="ml-1">({supplier.totalOrders.toLocaleString()} orders)</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{supplier.responseTime}</span>
              </div>
            </div>

            <div className="flex items-center text-sm opacity-90">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{supplier.headquarters}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold">
              {totalEstimatedCost > 0 ? `Rp${totalEstimatedCost.toLocaleString()}` : 'N/A'}
            </div>
            <div className="text-sm opacity-90">Estimated Total</div>
            <div className="text-xs opacity-75 mt-1">
              {availableMatches.length}/{requestedItems.length} items available
            </div>
          </div>
        </div>

        {/* Match Percentage */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Item Match</span>
            <span className="font-bold">{matchPercentage}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500" 
              style={{ width: `${matchPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Baskit Ecosystem Integration */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-[#FF8B00]" />
            Baskit Ecosystem Integration ({integrationCount}/4)
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className={`flex items-center p-3 rounded-lg border ${
              supplier.integrations.basketApp 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`w-3 h-3 rounded-full mr-3 ${
                supplier.integrations.basketApp ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
              <div>
                <div className="text-sm font-medium">Baskit App</div>
                <div className="text-xs text-gray-600">Main Platform</div>
              </div>
              {supplier.integrations.basketApp && (
                <a 
                  href={basketEcosystemUrls.main}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-[#FF8B00] hover:text-[#e67a00]"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className={`flex items-center p-3 rounded-lg border ${
              supplier.integrations.businessSuite 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`w-3 h-3 rounded-full mr-3 ${
                supplier.integrations.businessSuite ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
              <div>
                <div className="text-sm font-medium">Business Suite</div>
                <div className="text-xs text-gray-600">ERP Integration</div>
              </div>
              {supplier.integrations.businessSuite && (
                <a 
                  href={basketEcosystemUrls.businessSuite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-[#FF8B00] hover:text-[#e67a00]"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className={`flex items-center p-3 rounded-lg border ${
              supplier.integrations.cashFlow 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`w-3 h-3 rounded-full mr-3 ${
                supplier.integrations.cashFlow ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
              <div>
                <div className="text-sm font-medium">Cash Flow</div>
                <div className="text-xs text-gray-600">Financial Tracking</div>
              </div>
              {supplier.integrations.cashFlow && (
                <a 
                  href={basketEcosystemUrls.cashFlow}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-[#FF8B00] hover:text-[#e67a00]"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className={`flex items-center p-3 rounded-lg border ${
              supplier.integrations.riskWatch 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className={`w-3 h-3 rounded-full mr-3 ${
                supplier.integrations.riskWatch ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
              <div>
                <div className="text-sm font-medium">RiskWatch</div>
                <div className="text-xs text-gray-600">Risk Management</div>
              </div>
              {supplier.integrations.riskWatch && (
                <a 
                  href={basketEcosystemUrls.riskWatch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-[#FF8B00] hover:text-[#e67a00]"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Matched Products */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Package className="h-5 w-5 mr-2 text-[#085B59]" />
            Product Availability
          </h4>
          <div className="space-y-3">
            {matchedProducts.map((match, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                match.isAvailable ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {match.requested.productName}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Requested: {match.requested.quantity} units
                    </div>
                    {match.supplier && (
                      <div className="text-sm text-gray-600">
                        Available: {match.supplier.name} ({match.supplier.sku})
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    {match.supplier ? (
                      <>
                        <div className="font-bold text-gray-900">
                          Rp{match.supplier.unitPrice.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">per {match.supplier.unit}</div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                          getAvailabilityColor(match.supplier.availability)
                        }`}>
                          {match.supplier.availability}
                        </span>
                      </>
                    ) : (
                      <span className="text-red-600 text-sm font-medium">Not Available</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage & Business Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Truck className="h-5 w-5 mr-2 text-[#085B59]" />
              Coverage Area
            </h4>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Provinces:</span> {supplier.coverage.provinces.length}
              </div>
              <div className="text-sm">
                <span className="font-medium">Cities:</span> {supplier.coverage.cities.join(', ')}
              </div>
              <div className="text-sm">
                <span className="font-medium">Delivery Radius:</span> {supplier.coverage.deliveryRadius} km
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-[#085B59]" />
              Payment Terms
            </h4>
            <div className="flex flex-wrap gap-2">
              {supplier.paymentTerms.map((term, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {term}
                </span>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 inline mr-1" />
              Business Hours: {supplier.businessHours.weekdays}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              <a href={`tel:${supplier.contactInfo.phone}`} className="text-[#FF8B00] hover:underline">
                {supplier.contactInfo.phone}
              </a>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              <a href={`mailto:${supplier.contactInfo.email}`} className="text-[#FF8B00] hover:underline">
                {supplier.contactInfo.email}
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCreateTransaction}
            disabled={availableMatches.length === 0}
            className="bg-[#FF8B00] text-white px-6 py-3 rounded-lg hover:bg-[#e67a00] transition-colors font-semibold flex items-center disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Create Transaction
          </button>

          <button
            onClick={() => onViewDetails(supplier)}
            className="bg-[#085B59] text-white px-6 py-3 rounded-lg hover:bg-[#074e4c] transition-colors font-semibold flex items-center"
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            View Details
          </button>

          <a
            href={`https://wa.me/${supplier.contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hi! I'm interested in your products for procurement.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center"
          >
            <Phone className="h-5 w-5 mr-2" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};