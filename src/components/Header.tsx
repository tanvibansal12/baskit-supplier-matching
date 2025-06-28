import React from 'react';
import { User, Heart, LogOut, ChevronDown, Building2, Package } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  onLogin: () => void;
  onLogout: () => void;
  onGoHome?: () => void;
  onRoleChange?: (role: 'distributor' | 'supplier') => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout, onGoHome, onRoleChange }) => {
  const [showRoleDropdown, setShowRoleDropdown] = React.useState(false);

  const handleRoleChange = (newRole: 'distributor' | 'supplier') => {
    if (onRoleChange) {
      onRoleChange(newRole);
    }
    setShowRoleDropdown(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={onGoHome}
              className="hover:opacity-80 transition-opacity focus:outline-none rounded-lg"
            >
              <img 
                src="/image.png" 
                alt="Baskit" 
                className="h-8 w-auto"
              />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Role Switcher */}
            {user?.isLoggedIn && onRoleChange && (
              <div className="relative">
                <button
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                >
                  {user.role === 'supplier' ? (
                    <Building2 className="h-4 w-4 text-[#085B59]" />
                  ) : (
                    <Package className="h-4 w-4 text-[#FF8B00]" />
                  )}
                  <span className="capitalize">{user.role}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showRoleDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                      <button
                        onClick={() => handleRoleChange('distributor')}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center space-x-2 ${
                          user.role === 'distributor' ? 'bg-[#FF8B00]/10 text-[#FF8B00] font-medium' : 'text-gray-700'
                        }`}
                      >
                        <Package className="h-4 w-4" />
                        <div>
                          <div>Distributor</div>
                          <div className="text-xs text-gray-500">Find suppliers for your needs</div>
                        </div>
                      </button>
                      <button
                        onClick={() => handleRoleChange('supplier')}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors flex items-center space-x-2 ${
                          user.role === 'supplier' ? 'bg-[#085B59]/10 text-[#085B59] font-medium' : 'text-gray-700'
                        }`}
                      >
                        <Building2 className="h-4 w-4" />
                        <div>
                          <div>Supplier</div>
                          <div className="text-xs text-gray-500">View demand and submit quotes</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {user?.isLoggedIn ? (
              <>
                <button className="flex items-center text-gray-700 hover:text-[#FF8B00] transition-colors">
                  <Heart className="h-5 w-5 mr-1" />
                  <span className="hidden sm:inline">Shortlist</span>
                </button>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <div className="hidden sm:block">
                    <div className="text-sm text-gray-700 font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                  </div>
                  <button
                    onClick={onLogout}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="bg-[#FF8B00] text-white px-4 py-2 rounded-lg hover:bg-[#e67a00] transition-colors font-medium"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};