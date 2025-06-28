import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, DollarSign, AlertTriangle, CheckCircle, Clock, 
  Package, Truck, CreditCard, BarChart3, Activity, ExternalLink,
  Shield, Building2, Calendar, MapPin, Phone, Mail
} from 'lucide-react';
import { Transaction, RealSupplier, simulateTransaction, basketEcosystemUrls } from '../../data/realSuppliersData';

interface TransactionSimulatorProps {
  transaction: Transaction | null;
  supplier: RealSupplier | null;
  onClose: () => void;
}

export const TransactionSimulator: React.FC<TransactionSimulatorProps> = ({
  transaction,
  supplier,
  onClose
}) => {
  const [currentStatus, setCurrentStatus] = useState<Transaction['status']>('pending');
  const [simulationStep, setSimulationStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulationSteps = [
    { status: 'pending', label: 'Order Created', duration: 1000 },
    { status: 'processing', label: 'Supplier Confirmation', duration: 2000 },
    { status: 'processing', label: 'Payment Processing', duration: 1500 },
    { status: 'completed', label: 'Order Confirmed', duration: 1000 }
  ];

  useEffect(() => {
    if (transaction && !isSimulating) {
      setIsSimulating(true);
      simulateTransactionFlow();
    }
  }, [transaction]);

  const simulateTransactionFlow = async () => {
    for (let i = 0; i < simulationSteps.length; i++) {
      setSimulationStep(i);
      setCurrentStatus(simulationSteps[i].status);
      await new Promise(resolve => setTimeout(resolve, simulationSteps[i].duration));
    }
    setIsSimulating(false);
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-5 w-5" />;
      case 'processing': return <Activity className="h-5 w-5" />;
      case 'completed': return <CheckCircle className="h-5 w-5" />;
      case 'failed': return <AlertTriangle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  if (!transaction || !supplier) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#085B59] to-[#FF8B00] text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Transaction Simulation</h2>
              <p className="opacity-90 mt-1">Real-time transaction processing with {supplier.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Transaction Status */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Transaction Status</h3>
              <div className={`flex items-center px-4 py-2 rounded-full ${getStatusColor(currentStatus)}`}>
                {getStatusIcon(currentStatus)}
                <span className="ml-2 font-semibold">{currentStatus.toUpperCase()}</span>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="relative">
              <div className="flex items-center justify-between">
                {simulationSteps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      index <= simulationStep 
                        ? 'bg-[#FF8B00] border-[#FF8B00] text-white' 
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      {index < simulationStep ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : index === simulationStep ? (
                        <Activity className={`h-5 w-5 ${isSimulating ? 'animate-spin' : ''}`} />
                      ) : (
                        <span className="text-sm font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className="text-sm font-medium text-gray-700 mt-2 text-center">
                      {step.label}
                    </div>
                    {index < simulationSteps.length - 1 && (
                      <div className={`absolute top-5 left-10 w-full h-0.5 transition-all duration-500 ${
                        index < simulationStep ? 'bg-[#FF8B00]' : 'bg-gray-300'
                      }`} style={{ width: 'calc(100vw / 4 - 2.5rem)' }}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transaction Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Transaction Summary */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-[#085B59]" />
                  Transaction Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-mono text-sm">{transaction.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-bold text-lg text-[#085B59]">
                      Rp{transaction.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium">{transaction.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Terms:</span>
                    <span className="font-medium">{transaction.paymentTerms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">{transaction.timestamps.created.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Items Ordered */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Items Ordered</h4>
                <div className="space-y-3">
                  {transaction.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{item.sku}</div>
                        <div className="text-sm text-gray-600">
                          {item.quantity} units × Rp{item.unitPrice.toLocaleString()}
                        </div>
                      </div>
                      <div className="font-bold text-gray-900">
                        Rp{item.totalPrice.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-[#085B59]" />
                  Delivery Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-1" />
                    <div>
                      <div className="font-medium text-gray-900">Delivery Address</div>
                      <div className="text-sm text-gray-600">{transaction.deliveryInfo.address}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <div>
                      <span className="font-medium text-gray-900">Estimated Delivery: </span>
                      <span className="text-gray-600">{transaction.deliveryInfo.estimatedDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-gray-400" />
                    <div>
                      <span className="font-medium text-gray-900">Carrier: </span>
                      <span className="text-gray-600">{transaction.deliveryInfo.carrier}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Risk Assessment */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-[#085B59]" />
                  Risk Assessment
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Risk Score:</span>
                    <span className={`px-3 py-1 rounded-full font-bold ${getRiskColor(transaction.riskScore || 0)}`}>
                      {transaction.riskScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        (transaction.riskScore || 0) >= 80 ? 'bg-green-500' :
                        (transaction.riskScore || 0) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${transaction.riskScore || 0}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {(transaction.riskScore || 0) >= 80 && "Low risk transaction. Supplier has excellent track record."}
                    {(transaction.riskScore || 0) >= 60 && (transaction.riskScore || 0) < 80 && "Medium risk. Monitor transaction closely."}
                    {(transaction.riskScore || 0) < 60 && "High risk transaction. Additional verification recommended."}
                  </div>
                </div>
              </div>

              {/* Cash Flow Impact */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-[#085B59]" />
                  Cash Flow Impact
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accounts Payable:</span>
                    <span className="font-bold text-red-600">
                      -Rp{transaction.cashFlowImpact?.payable.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accounts Receivable:</span>
                    <span className="font-bold text-green-600">
                      +Rp{transaction.cashFlowImpact?.receivable.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">Net Cash Flow:</span>
                      <span className={`font-bold ${
                        (transaction.cashFlowImpact?.netCashFlow || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {(transaction.cashFlowImpact?.netCashFlow || 0) >= 0 ? '+' : ''}
                        Rp{transaction.cashFlowImpact?.netCashFlow.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Baskit Ecosystem Integration */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-[#085B59]" />
                  Ecosystem Integration
                </h4>
                <div className="space-y-3">
                  {transaction.integrations.basketApp && (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="font-medium">Baskit App</span>
                      </div>
                      <a 
                        href={basketEcosystemUrls.main}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF8B00] hover:text-[#e67a00]"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                  
                  {transaction.integrations.businessSuite && (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="font-medium">Business Suite</span>
                      </div>
                      <a 
                        href={basketEcosystemUrls.businessSuite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF8B00] hover:text-[#e67a00]"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                  
                  {transaction.integrations.cashFlow && (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="font-medium">Cash Flow</span>
                      </div>
                      <a 
                        href={basketEcosystemUrls.cashFlow}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF8B00] hover:text-[#e67a00]"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                  
                  {transaction.integrations.riskWatch && (
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="font-medium">RiskWatch</span>
                      </div>
                      <a 
                        href={basketEcosystemUrls.riskWatch}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF8B00] hover:text-[#e67a00]"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Supplier Contact */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-[#085B59]" />
                  Supplier Contact
                </h4>
                <div className="space-y-3">
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
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            <button className="bg-[#085B59] text-white px-6 py-3 rounded-lg hover:bg-[#074e4c] transition-colors font-semibold">
              Track Order
            </button>
            <button className="bg-[#FF8B00] text-white px-6 py-3 rounded-lg hover:bg-[#e67a00] transition-colors font-semibold">
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};