import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle, ExternalLink, Mail, Lock, Phone, ChevronDown, Loader, Shield, Key } from 'lucide-react';
import { Supplier, ProcurementItem } from '../types';

interface POModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: Supplier | null;
  items: ProcurementItem[];
  user: any;
}

interface CountryCode {
  code: string;
  country: string;
  flag: string;
}

const countryCodes: CountryCode[] = [
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
];

export const POModal: React.FC<POModalProps> = ({ isOpen, onClose, supplier, items, user }) => {
  const [isERPConnected, setIsERPConnected] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('phone');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreatingPO, setIsCreatingPO] = useState(false);
  const [poCreated, setPOCreated] = useState(false);
  const [isCheckingCredentials, setIsCheckingCredentials] = useState(false);
  const [credentialCheckComplete, setCredentialCheckComplete] = useState(false);

  const handleERPLogin = () => {
    if (loginMethod === 'email' && email && password) {
      startCredentialCheck();
    } else if (loginMethod === 'phone' && phone) {
      startCredentialCheck();
    }
  };

  const startCredentialCheck = () => {
    setIsCheckingCredentials(true);
    
    // Simulate credential checking process
    setTimeout(() => {
      setCredentialCheckComplete(true);
      
      // After showing success, immediately redirect to ERP
      setTimeout(() => {
        // Check if items were imported from SO
        const importedFromSO = localStorage.getItem('importedFromSO');
        
        if (supplier) {
          // Prepare comprehensive order data for ERP system
          const orderData = {
            // Basic PO info
            poNumber: `PO-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
            
            // SO information (if available)
            salesOrderId: importedFromSO || '',
            
            // Supplier information (prefilled)
            supplierName: supplier.name,
            supplierEmail: supplier.contactEmail,
            supplierPhone: supplier.phone,
            supplierAddress: supplier.detailedAddress,
            supplierRating: supplier.rating,
            supplierLocation: supplier.location,
            
            // Order details
            orderDate: new Date().toISOString().split('T')[0],
            deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
            status: 'Sent',
            
            // Items (prefilled with actual product names and quantities)
            items: items.map((item, index) => ({
              id: `item-${index + 1}`,
              idProduk: `${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
              productName: item.productName,
              namaProduk: item.productName,
              quantity: item.quantity,
              kuantitasTersedia: item.quantity,
              kuantitasOperasi: item.quantity,
              unitPrice: item.targetPrice || 0,
              hargaJualUnit: item.targetPrice || 0,
              hargaBeliUnit: (item.targetPrice || 0) * 0.8, // Assume 20% margin
              totalPrice: (item.targetPrice || 0) * item.quantity,
              unit: item.unit || 'Pieces (Pcs)',
              akunPO: '313 - Cost of Sales',
              pajak: 'PPN 11%'
            })),
            
            // Financial calculations
            totalAmount: items.reduce((sum, item) => sum + (item.targetPrice || 0) * item.quantity, 0),
            subTotal: items.reduce((sum, item) => sum + (item.targetPrice || 0) * item.quantity, 0),
            biayaPengiriman: 0,
            pembulatan: 0,
            pajak: Math.round(items.reduce((sum, item) => sum + (item.targetPrice || 0) * item.quantity, 0) * 0.11), // 11% PPN
            
            // User info
            createdBy: user?.name || 'Unknown User',
            createdByEmail: user?.email || '',
            
            // Additional ERP fields
            kategoriSeller: 'FMCG',
            tipePengiriman: 'Kirim Ke Gudang',
            estimasiPengiriman: supplier.leadTime || '2-3 days',
            
            // Notes
            catatan: `PO dibuat melalui Baskit untuk supplier ${supplier.name}. ${importedFromSO ? `Berdasarkan Sales Order: ${importedFromSO}` : 'Procurement langsung dari Baskit.'}`,
            
            // Delivery info
            alamatPengiriman: 'Jl. Sudirman Kav. 25, Jakarta Selatan', // Default company address
            provinsi: 'DKI Jakarta',
            kota: 'Jakarta Selatan',
            kecamatan: 'Setiabudi',
            kodePos: '12920'
          };

          // Redirect to ERP system in same tab with comprehensive prefilled data
          const erpUrl = `/erp-orders?prefillData=${encodeURIComponent(JSON.stringify(orderData))}`;
          window.location.href = erpUrl;
          
          // Clear SO import info from localStorage
          localStorage.removeItem('importedFromSO');
        }
      }, 1500);
    }, 2500);
  };

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  // Reset state when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setIsERPConnected(false);
      setEmail('');
      setPassword('');
      setPhone('');
      setIsCreatingPO(false);
      setPOCreated(false);
      setLoginMethod('phone');
      setSelectedCountry(countryCodes[0]);
      setIsDropdownOpen(false);
      setIsCheckingCredentials(false);
      setCredentialCheckComplete(false);
    }
  }, [isOpen]);

  if (!isOpen || !supplier) return null;

  const totalAmount = items.reduce((sum, item) => sum + (item.targetPrice || 0) * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1">
            <img 
              src="/image.png" 
              alt="Baskit" 
              className="h-12 w-auto mb-6"
            />
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect to ERP System</h2>
              <p className="text-gray-600">Enter your credentials to create purchase order in your ERP system.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {!isERPConnected && !poCreated && !isCheckingCredentials && !credentialCheckComplete && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm text-blue-800">
                Please connect to your ERP system using the same credentials as your Baskit account
              </span>
            </div>
          </div>
        )}

        {/* Credential Checking Screen */}
        {isCheckingCredentials && (
          <div className="text-center py-8">
            <div className="mb-6">
              <div className="relative">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center animate-spin">
                  <Key className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">Verifying Credentials</h3>
            <p className="text-gray-600 mb-6">Checking your ERP system access...</p>
            
            <div className="space-y-3 max-w-md mx-auto">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-800">Authenticating user...</span>
                <Loader className="h-4 w-4 text-blue-600 animate-spin" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Checking permissions...</span>
                <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Establishing connection...</span>
                <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Credential Check Complete */}
        {credentialCheckComplete && (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Credentials Verified!</h3>
            <p className="text-gray-600 mb-4">Successfully connected to ERP system</p>
            
            <div className="space-y-2 max-w-md mx-auto">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-green-800">User authenticated</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-green-800">Permissions verified</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-green-800">Connection established</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              Redirecting to ERP system...
            </div>
          </div>
        )}

        {!isCheckingCredentials && !credentialCheckComplete && (
          <div className="space-y-6">
            <h3 className="font-semibold text-gray-900">ERP System Login</h3>
            
            {loginMethod === 'phone' ? (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('email')}
                    className="text-[#FF8B00] text-sm font-medium hover:underline flex items-center"
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Use Email
                  </button>
                </div>
                <div className="flex">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00]"
                    >
                      <span className="text-lg mr-2">{selectedCountry.flag}</span>
                      <span className="text-sm text-gray-700 mr-1">{selectedCountry.code}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                        {countryCodes.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className="w-full flex items-center px-3 py-2 hover:bg-[#FFF4E8] transition-colors text-left"
                          >
                            <span className="text-lg mr-3">{country.flag}</span>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">{country.country}</div>
                              <div className="text-xs text-gray-600">{country.code}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none transition-colors"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      Email Address
                    </label>
                    <button
                      type="button"
                      onClick={() => setLoginMethod('phone')}
                      className="text-[#FF8B00] text-sm font-medium hover:underline flex items-center"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Use Phone Number
                    </button>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none transition-colors"
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-gray-500" />
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none transition-colors"
                    placeholder="Enter password"
                    required
                  />
                  <div className="mt-2 text-right">
                    <button
                      type="button"
                      className="text-[#FF8B00] text-sm hover:underline"
                    >
                      Forgot password? Click here
                    </button>
                  </div>
                </div>
              </>
            )}

            <button
              onClick={handleERPLogin}
              disabled={loginMethod === 'email' ? (!email || !password) : !phone}
              className="w-full bg-[#085B59] text-white py-3 px-6 rounded-lg hover:bg-[#074e4c] transition-colors font-semibold text-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
            >
              Connect to ERP System
            </button>

            <div className="mt-4 text-center text-sm text-gray-500">
              Demo: Use any email/phone and password to connect
            </div>
          </div>
        )}
      </div>
    </div>
  );
};