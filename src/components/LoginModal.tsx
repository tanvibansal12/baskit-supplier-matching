import React, { useState } from 'react';
import { X, Mail, Lock, Phone, ChevronDown } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; email: string }) => void;
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

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('phone');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'email' && email && password) {
      onLogin({ 
        name: email.split('@')[0], 
        email 
      });
      onClose();
      setEmail('');
      setPassword('');
    } else if (loginMethod === 'phone' && phone) {
      onLogin({ 
        name: `User-${phone.slice(-4)}`, 
        email: `${phone}@phone.baskit.com`
      });
      onClose();
      setPhone('');
    }
  };

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1">
            <img 
              src="/image.png" 
              alt="Baskit" 
              className="h-12 w-auto mb-6"
            />
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
              <p className="text-gray-600">Find the best suppliers with AI-powered recommendations.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors ml-4"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            type="submit"
            className="w-full bg-[#FF8B00] text-white py-3 px-6 rounded-lg hover:bg-[#e67a00] transition-colors font-semibold text-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New user? <span className="text-[#FF8B00] font-medium cursor-pointer hover:underline">Register</span>
          </p>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Demo: Use any email/phone and password to sign in
        </div>
      </div>
    </div>
  );
};