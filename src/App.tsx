import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RequestForm } from './components/RequestForm';
import { SupplierResults } from './components/SupplierResults';
import { LoginModal } from './components/LoginModal';
import { POModal } from './components/POModal';
import { ERPOrderListPage } from './components/ERPOrderListPage';
import { ProcurementItem, DeliveryPreferences, Supplier, User, ShortlistItem } from './types';
import { mockSuppliers } from './data/mockData';

function App() {
  const [currentStep, setCurrentStep] = useState<'hero' | 'form' | 'results'>('hero');
  const [items, setItems] = useState<ProcurementItem[]>([]);
  const [deliveryPreferences, setDeliveryPreferences] = useState<DeliveryPreferences>({
    location: '',
    preferredLeadTime: ''
  });
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [shortlist, setShortlist] = useState<ShortlistItem[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPOModalOpen, setIsPOModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [showERPPage, setShowERPPage] = useState(false);

  // Check if we should show ERP page based on URL
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/erp-orders') {
      setShowERPPage(true);
    }
  }, []);

  // Enhanced supplier matching with comprehensive keyword detection
  const findSuppliers = () => {
    console.log('🔍 === STARTING SUPPLIER SEARCH ===');
    console.log('🔍 Items to search:', items);
    
    const filteredSuppliers = mockSuppliers.filter(supplier => {
      console.log(`\n🏢 Checking supplier: ${supplier.name}`);
      console.log(`📦 Supplier coverage: ${supplier.coverageItems.join(', ')}`);
      
      // If no items, show all suppliers
      if (items.length === 0) {
        console.log('✅ No items specified, including all suppliers');
        return true;
      }

      // Check if supplier has any matching items
      const hasMatchingItems = items.some(item => {
        const itemName = item.productName.toLowerCase().trim();
        console.log(`\n  🔍 Checking item: "${itemName}"`);
        
        // Create comprehensive keyword matching
        const isMatch = (() => {
          // INDOMIE - Most comprehensive matching
          const indomieKeywords = [
            'indomie', 'mie instan', 'instant noodle', 'instant noodles',
            'mie goreng', 'soto ayam', 'ayam bawang', 'mie kuah',
            'noodle', 'noodles', 'mie'
          ];
          
          const isIndomieProduct = indomieKeywords.some(keyword => 
            itemName.includes(keyword)
          );
          
          if (isIndomieProduct) {
            console.log(`    🍜 Detected as Indomie product: "${itemName}"`);
            const hasIndomieSupport = supplier.coverageItems.some(coverage => {
              const coverageLower = coverage.toLowerCase();
              const indomieSupport = coverageLower.includes('instant noodles') ||
                                   coverageLower.includes('noodles') ||
                                   coverageLower.includes('mie') ||
                                   coverageLower.includes('snacks');
              console.log(`      📋 Coverage "${coverage}" supports Indomie: ${indomieSupport}`);
              return indomieSupport;
            });
            console.log(`    ✅ Final Indomie match for ${supplier.name}: ${hasIndomieSupport}`);
            return hasIndomieSupport;
          }
          
          // BEAR BRAND
          const bearBrandKeywords = [
            'bear brand', 'susu bear', 'susu steril', 'white tea',
            'bear', 'brand'
          ];
          
          const isBearBrandProduct = bearBrandKeywords.some(keyword => 
            itemName.includes(keyword)
          );
          
          if (isBearBrandProduct) {
            console.log(`    🥛 Detected as Bear Brand product: "${itemName}"`);
            const hasDairySupport = supplier.coverageItems.some(coverage => {
              const coverageLower = coverage.toLowerCase();
              const dairySupport = coverageLower.includes('dairy') ||
                                 coverageLower.includes('beverages') ||
                                 coverageLower.includes('susu') ||
                                 coverageLower.includes('dairy products');
              console.log(`      📋 Coverage "${coverage}" supports dairy: ${dairySupport}`);
              return dairySupport;
            });
            console.log(`    ✅ Final Bear Brand match for ${supplier.name}: ${hasDairySupport}`);
            return hasDairySupport;
          }
          
          // MOTOR/MOTORCYCLE
          const motorKeywords = [
            'motor', 'sepeda motor', 'yamaha', 'honda', 'nmax', 'vario',
            'motorcycle', 'bike', 'scooter'
          ];
          
          const isMotorProduct = motorKeywords.some(keyword => 
            itemName.includes(keyword)
          );
          
          if (isMotorProduct) {
            console.log(`    🏍️ Detected as Motor product: "${itemName}"`);
            const hasMotorSupport = supplier.coverageItems.some(coverage => {
              const coverageLower = coverage.toLowerCase();
              const motorSupport = coverageLower.includes('motorcycles') ||
                                 coverageLower.includes('automotive') ||
                                 coverageLower.includes('motor');
              console.log(`      📋 Coverage "${coverage}" supports motor: ${motorSupport}`);
              return motorSupport;
            });
            console.log(`    ✅ Final Motor match for ${supplier.name}: ${hasMotorSupport}`);
            return hasMotorSupport;
          }
          
          // SNACKS
          const snackKeywords = [
            'chitato', 'keripik', 'snack', 'makanan ringan', 'chips'
          ];
          
          const isSnackProduct = snackKeywords.some(keyword => 
            itemName.includes(keyword)
          );
          
          if (isSnackProduct) {
            console.log(`    🍿 Detected as Snack product: "${itemName}"`);
            const hasSnackSupport = supplier.coverageItems.some(coverage => {
              const coverageLower = coverage.toLowerCase();
              const snackSupport = coverageLower.includes('snacks') ||
                                 coverageLower.includes('makanan ringan');
              console.log(`      📋 Coverage "${coverage}" supports snacks: ${snackSupport}`);
              return snackSupport;
            });
            console.log(`    ✅ Final Snack match for ${supplier.name}: ${hasSnackSupport}`);
            return hasSnackSupport;
          }
          
          // BEVERAGES
          const beverageKeywords = [
            'teh botol', 'aqua', 'minuman', 'air mineral', 'sosro', 'dancow',
            'beverage', 'drink', 'tea', 'water'
          ];
          
          const isBeverageProduct = beverageKeywords.some(keyword => 
            itemName.includes(keyword)
          );
          
          if (isBeverageProduct) {
            console.log(`    🥤 Detected as Beverage product: "${itemName}"`);
            const hasBeverageSupport = supplier.coverageItems.some(coverage => {
              const coverageLower = coverage.toLowerCase();
              const beverageSupport = coverageLower.includes('beverages') ||
                                    coverageLower.includes('minuman') ||
                                    coverageLower.includes('dairy products');
              console.log(`      📋 Coverage "${coverage}" supports beverages: ${beverageSupport}`);
              return beverageSupport;
            });
            console.log(`    ✅ Final Beverage match for ${supplier.name}: ${hasBeverageSupport}`);
            return hasBeverageSupport;
          }
          
          // DIRECT COVERAGE MATCHING (fallback)
          console.log(`    📋 Checking direct coverage matching for: "${itemName}"`);
          const directMatch = supplier.coverageItems.some(coverage => {
            const coverageLower = coverage.toLowerCase();
            const match = itemName.includes(coverageLower) || coverageLower.includes(itemName);
            console.log(`      📋 "${coverage}" vs "${itemName}": ${match}`);
            return match;
          });
          console.log(`    ✅ Final direct match for ${supplier.name}: ${directMatch}`);
          
          return directMatch;
        })();
        
        console.log(`  🎯 FINAL RESULT for "${itemName}" with ${supplier.name}: ${isMatch}`);
        return isMatch;
      });
      
      console.log(`🏢 Supplier ${supplier.name} has matching items: ${hasMatchingItems}`);
      return hasMatchingItems;
    });

    console.log('\n🎯 === SEARCH RESULTS ===');
    console.log('🎯 Filtered suppliers:', filteredSuppliers.map(s => s.name));
    console.log('🎯 Total suppliers found:', filteredSuppliers.length);

    // Sort by AI recommendation first, then by rating
    filteredSuppliers.sort((a, b) => {
      if (a.isAiRecommended && !b.isAiRecommended) return -1;
      if (!a.isAiRecommended && b.isAiRecommended) return 1;
      return b.rating - a.rating;
    });

    setSuppliers(filteredSuppliers);
    setCurrentStep('results');
    // Only auto-collapse when finding suppliers (not when editing items)
    setIsFormCollapsed(true);
  };

  const handleStartRecommendation = () => {
    setCurrentStep('form');
  };

  const handleGoHome = () => {
    setCurrentStep('hero');
    setIsFormCollapsed(false);
    setItems([]);
    setDeliveryPreferences({
      location: '',
      preferredLeadTime: ''
    });
    setSuppliers([]);
  };

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser({
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      isLoggedIn: true
    });
  };

  const handleLogout = () => {
    setUser(null);
    setShortlist([]);
  };

  const handleAddToShortlist = (supplierId: string, notes: string) => {
    if (!user?.isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    const newShortlistItem: ShortlistItem = {
      supplierId,
      notes,
      dateAdded: new Date()
    };

    setShortlist(prev => [...prev, newShortlistItem]);
  };

  const handleCreatePO = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsPOModalOpen(true);
  };

  const handleContact = (supplier: Supplier) => {
    // In a real app, this might open an email client or contact form
    window.open(`mailto:${supplier.contactEmail}?subject=Procurement Inquiry&body=Hello ${supplier.name}, I'm interested in your products for our procurement needs.`);
  };

  const handleFormSubmit = () => {
    if (items.length === 0 || !deliveryPreferences.location) {
      return;
    }
    findSuppliers();
  };

  const handleToggleCollapse = () => {
    setIsFormCollapsed(!isFormCollapsed);
  };

  // Update suppliers when form changes - but DON'T auto-hide form
  useEffect(() => {
    if (currentStep === 'results' && items.length > 0) {
      console.log('🔄 Auto-updating suppliers due to form changes...');
      
      // Re-run supplier matching but keep form expanded if user is editing
      const filteredSuppliers = mockSuppliers.filter(supplier => {
        // If no items, show all suppliers
        if (items.length === 0) {
          return true;
        }

        // Use the same enhanced matching logic
        const hasMatchingItems = items.some(item => {
          const itemName = item.productName.toLowerCase().trim();
          
          // Enhanced keyword matching
          const isMatch = (() => {
            // Indomie variants
            const indomieKeywords = [
              'indomie', 'mie instan', 'instant noodle', 'instant noodles',
              'mie goreng', 'soto ayam', 'ayam bawang', 'mie kuah',
              'noodle', 'noodles', 'mie'
            ];
            
            if (indomieKeywords.some(keyword => itemName.includes(keyword))) {
              return supplier.coverageItems.some(coverage => {
                const coverageLower = coverage.toLowerCase();
                return coverageLower.includes('instant noodles') ||
                       coverageLower.includes('noodles') ||
                       coverageLower.includes('mie') ||
                       coverageLower.includes('snacks');
              });
            }
            
            // Bear Brand variants
            const bearBrandKeywords = [
              'bear brand', 'susu bear', 'susu steril', 'white tea',
              'bear', 'brand'
            ];
            
            if (bearBrandKeywords.some(keyword => itemName.includes(keyword))) {
              return supplier.coverageItems.some(coverage => {
                const coverageLower = coverage.toLowerCase();
                return coverageLower.includes('dairy') ||
                       coverageLower.includes('beverages') ||
                       coverageLower.includes('susu') ||
                       coverageLower.includes('dairy products');
              });
            }
            
            // Motor/motorcycle variants
            const motorKeywords = [
              'motor', 'sepeda motor', 'yamaha', 'honda', 'nmax', 'vario',
              'motorcycle', 'bike', 'scooter'
            ];
            
            if (motorKeywords.some(keyword => itemName.includes(keyword))) {
              return supplier.coverageItems.some(coverage => {
                const coverageLower = coverage.toLowerCase();
                return coverageLower.includes('motorcycles') ||
                       coverageLower.includes('automotive') ||
                       coverageLower.includes('motor');
              });
            }
            
            // Snack variants
            const snackKeywords = [
              'chitato', 'keripik', 'snack', 'makanan ringan', 'chips'
            ];
            
            if (snackKeywords.some(keyword => itemName.includes(keyword))) {
              return supplier.coverageItems.some(coverage => {
                const coverageLower = coverage.toLowerCase();
                return coverageLower.includes('snacks') ||
                       coverageLower.includes('makanan ringan');
              });
            }
            
            // Beverage variants
            const beverageKeywords = [
              'teh botol', 'aqua', 'minuman', 'air mineral', 'sosro', 'dancow',
              'beverage', 'drink', 'tea', 'water'
            ];
            
            if (beverageKeywords.some(keyword => itemName.includes(keyword))) {
              return supplier.coverageItems.some(coverage => {
                const coverageLower = coverage.toLowerCase();
                return coverageLower.includes('beverages') ||
                       coverageLower.includes('minuman') ||
                       coverageLower.includes('dairy products');
              });
            }
            
            // Direct coverage matching (fallback)
            return supplier.coverageItems.some(coverage => {
              const coverageLower = coverage.toLowerCase();
              return itemName.includes(coverageLower) || coverageLower.includes(itemName);
            });
          })();
          
          return isMatch;
        });
        
        return hasMatchingItems;
      });

      filteredSuppliers.sort((a, b) => {
        if (a.isAiRecommended && !b.isAiRecommended) return -1;
        if (!a.isAiRecommended && b.isAiRecommended) return 1;
        return b.rating - a.rating;
      });

      setSuppliers(filteredSuppliers);
      // DON'T auto-collapse form here - let user control it manually
    }
  }, [items, deliveryPreferences, currentStep]);

  // If showing ERP page, render it instead
  if (showERPPage) {
    return <ERPOrderListPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogin={() => setIsLoginModalOpen(true)} 
        onLogout={handleLogout}
        onGoHome={handleGoHome}
      />
      
      {currentStep === 'hero' && (
        <HeroSection onStartRecommendation={handleStartRecommendation} />
      )}

      {(currentStep === 'form' || currentStep === 'results') && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <RequestForm
              items={items}
              deliveryPreferences={deliveryPreferences}
              onItemsChange={setItems}
              onDeliveryChange={setDeliveryPreferences}
              onSubmit={handleFormSubmit}
              isCollapsed={isFormCollapsed}
              onToggleCollapse={handleToggleCollapse}
              hasResults={currentStep === 'results' && suppliers.length > 0}
            />

            {currentStep === 'results' && suppliers.length > 0 && (
              <SupplierResults
                suppliers={suppliers}
                user={user}
                shortlist={shortlist}
                items={items}
                onAddToShortlist={handleAddToShortlist}
                onCreatePO={handleCreatePO}
                onContact={handleContact}
              />
            )}
          </div>
        </div>
      )}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <POModal
        isOpen={isPOModalOpen}
        onClose={() => setIsPOModalOpen(false)}
        supplier={selectedSupplier}
        items={items}
        user={user}
      />
    </div>
  );
}

export default App;