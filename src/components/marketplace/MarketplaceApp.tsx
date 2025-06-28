import React, { useState } from 'react';
import { Store, Upload, Trophy, Target, MessageCircle, User, LogOut, Menu, X, Activity, Building2 } from 'lucide-react';
import { PublicMarketplace } from './PublicMarketplace';
import { ReceiptUpload } from './ReceiptUpload';
import { LoyaltyWallet } from './LoyaltyWallet';
import { Leaderboard } from './Leaderboard';
import { CampaignManager } from './CampaignManager';
import { WhatsAppIntegration } from './WhatsAppIntegration';
import { RealSupplierCard } from './RealSupplierCard';
import { TransactionSimulator } from './TransactionSimulator';
import { realSuppliers, simulateTransaction, Transaction, RealSupplier } from '../../data/realSuppliersData';

type ActiveModule = 'marketplace' | 'receipt-upload' | 'loyalty-wallet' | 'leaderboard' | 'campaign-manager' | 'whatsapp' | 'real-suppliers';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'brand' | 'distributor' | 'retailer';
}

export const MarketplaceApp: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ActiveModule>('real-suppliers');
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Demo User',
    email: 'demo@baskit.app',
    type: 'distributor'
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<RealSupplier | null>(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  // Mock requested items for demonstration
  const mockRequestedItems = [
    { sku: 'IDM-GRG', quantity: 100, productName: 'Indomie Goreng' },
    { sku: 'BB-SUSU', quantity: 50, productName: 'Bear Brand Susu Steril' },
    { sku: 'TEH-BOT', quantity: 30, productName: 'Teh Botol Sosro' }
  ];

  const handleCreateTransaction = (supplierId: string, items: { sku: string; quantity: number }[]) => {
    const supplier = realSuppliers.find(s => s.id === supplierId);
    if (!supplier || !user) return;

    const transaction = simulateTransaction(supplierId, items, {
      id: user.id,
      name: user.name,
      address: 'Jl. Sudirman Kav. 25, Jakarta Selatan 12920'
    });

    setCurrentTransaction(transaction);
    setSelectedSupplier(supplier);
    setShowTransactionModal(true);
  };

  const handleViewSupplierDetails = (supplier: RealSupplier) => {
    setSelectedSupplier(supplier);
    // Could open a detailed supplier modal here
  };

  const handleApplyToListing = (listingId: string) => {
    console.log('Applied to listing:', listingId);
    // Handle application logic
  };

  const handleReceiptSubmit = (receipt: any) => {
    console.log('Receipt submitted:', receipt);
    // Handle receipt submission
  };

  const modules = [
    { id: 'real-suppliers' as ActiveModule, name: 'Real Suppliers', icon: Building2, description: 'Browse real Indonesian suppliers with actual SKUs' },
    { id: 'marketplace' as ActiveModule, name: 'Marketplace', icon: Store, description: 'Browse brand listings' },
    { id: 'receipt-upload' as ActiveModule, name: 'Receipt Upload', icon: Upload, description: 'Upload receipts for loyalty points' },
    { id: 'loyalty-wallet' as ActiveModule, name: 'Loyalty Wallet', icon: Target, description: 'Track your loyalty points' },
    { id: 'leaderboard' as ActiveModule, name: 'Leaderboard', icon: Trophy, description: 'Top performing distributors' },
    { id: 'campaign-manager' as ActiveModule, name: 'Campaign Manager', icon: Activity, description: 'Manage brand campaigns' },
    { id: 'whatsapp' as ActiveModule, name: 'WhatsApp Integration', icon: MessageCircle, description: 'WhatsApp communications' }
  ];

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'real-suppliers':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Real Indonesian Suppliers</h1>
              <p className="text-gray-600">Connect with verified suppliers using actual SKUs and regional coverage</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {realSuppliers.map((supplier) => (
                <RealSupplierCard
                  key={supplier.id}
                  supplier={supplier}
                  requestedItems={mockRequestedItems}
                  onCreateTransaction={handleCreateTransaction}
                  onViewDetails={handleViewSupplierDetails}
                />
              ))}
            </div>
          </div>
        );
      case 'marketplace':
        return <PublicMarketplace onApplyToListing={handleApplyToListing} />;
      case 'receipt-upload':
        return (
          <ReceiptUpload
            onReceiptSubmit={handleReceiptSubmit}
            userType={user?.type || 'distributor'}
            userId={user?.id || '1'}
          />
        );
      case 'loyalty-wallet':
        return (
          <LoyaltyWallet
            userId={user?.id || '1'}
            userType={user?.type || 'distributor'}
            totalPoints={12450}
            transactions={[]}
          />
        );
      case 'leaderboard':
        return <Leaderboard />;
      case 'campaign-manager':
        return <CampaignManager brandId={user?.id || '1'} />;
      case 'whatsapp':
        return <WhatsAppIntegration />;
      default:
        return <div>Module not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/image.png" 
                alt="Baskit" 
                className="h-8 w-auto"
              />
              <span className="ml-3 text-xl font-bold text-gray-900">Marketplace</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">{user.name}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {user.type}
                  </span>
                  <button
                    onClick={() => setUser(null)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button className="bg-[#FF8B00] text-white px-4 py-2 rounded-lg hover:bg-[#e67a00] transition-colors font-medium">
                  Login
                </button>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className={`lg:w-64 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Modules</h3>
              <nav className="space-y-2">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => {
                      setActiveModule(module.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                      activeModule === module.id
                        ? 'bg-[#FF8B00] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <module.icon className="h-5 w-5 mr-3" />
                    <div>
                      <div className="font-medium">{module.name}</div>
                      <div className={`text-xs ${
                        activeModule === module.id ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {module.description}
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Baskit Ecosystem Links */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mt-4">
              <h3 className="font-semibold text-gray-900 mb-4">Baskit Ecosystem</h3>
              <div className="space-y-2">
                <a
                  href="https://baskit.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#FF8B00] hover:text-[#e67a00] text-sm font-medium"
                >
                  🏠 Main Platform
                </a>
                <a
                  href="https://baskit.app/business-suite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#FF8B00] hover:text-[#e67a00] text-sm font-medium"
                >
                  💼 Business Suite
                </a>
                <a
                  href="https://baskit.app/cash-flow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#FF8B00] hover:text-[#e67a00] text-sm font-medium"
                >
                  💰 Cash Flow
                </a>
                <a
                  href="https://baskit.app/riskwatch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#FF8B00] hover:text-[#e67a00] text-sm font-medium"
                >
                  🛡️ RiskWatch
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderActiveModule()}
          </div>
        </div>
      </div>

      {/* Transaction Simulation Modal */}
      {showTransactionModal && (
        <TransactionSimulator
          transaction={currentTransaction}
          supplier={selectedSupplier}
          onClose={() => {
            setShowTransactionModal(false);
            setCurrentTransaction(null);
            setSelectedSupplier(null);
          }}
        />
      )}
    </div>
  );
};