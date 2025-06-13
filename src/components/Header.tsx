import React from 'react';
import { User, Heart, LogOut } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  onLogin: () => void;
  onLogout: () => void;
  onGoHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout, onGoHome }) => {
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
            {user?.isLoggedIn ? (
              <>
                <button className="flex items-center text-gray-700 hover:text-[#FF8B00] transition-colors">
                  <Heart className="h-5 w-5 mr-1" />
                  <span className="hidden sm:inline">Shortlist</span>
                </button>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700 hidden sm:inline">{user.name}</span>
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