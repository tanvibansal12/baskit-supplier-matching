import React, { useState } from 'react';
import { Star, MapPin, Clock, Award, Phone, Mail, Heart, FileText, ChevronDown, ChevronUp, Truck, Package, Navigation, Route, CheckCircle, XCircle, AlertCircle, Sparkles, ArrowUpDown, Crown } from 'lucide-react';
import { Supplier, User, ShortlistItem, ProcurementItem } from '../types';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface SupplierResultsProps {
  suppliers: Supplier[];
  user: User | null;
  shortlist: ShortlistItem[];
  onAddToShortlist: (supplierId: string, notes: string) => void;
  onCreatePO: (supplier: Supplier) => void;
  onContact: (supplier: Supplier) => void;
  items: ProcurementItem[]; // User's requested items
}

interface ShippingOption {
  name: string;
  basePrice: number;
  duration: string;
  icon: string;
  pricePerKm?: number; // Price adjustment per km
}

interface ItemAvailability {
  requestedItem: ProcurementItem;
  isAvailable: boolean;
  supplierPrice?: number;
  availability?: 'In Stock' | 'Limited' | 'Pre-order' | 'Not Available';
  supplierQuantity?: number;
  notes?: string;
}

interface DistanceInfo {
  distance: number; // in km
  estimatedTime: string;
  route: string;
}

type SortOption = 'ai-recommendation' | 'cheapest' | 'closest' | 'fastest-delivery' | 'highest-rating' | 'best-match';

const shippingOptions: ShippingOption[] = [
  { name: 'JNE Regular', basePrice: 25000, duration: '2-3 days', icon: '📦', pricePerKm: 500 },
  { name: 'JNE Express', basePrice: 45000, duration: '1-2 days', icon: '⚡', pricePerKm: 800 },
  { name: 'J&T Express', basePrice: 22000, duration: '2-4 days', icon: '🚚', pricePerKm: 450 },
  { name: 'SiCepat', basePrice: 28000, duration: '1-3 days', icon: '🏃', pricePerKm: 600 },
  { name: 'AnterAja', basePrice: 20000, duration: '3-5 days', icon: '🛵', pricePerKm: 400 },
  { name: 'Pos Indonesia', basePrice: 18000, duration: '4-6 days', icon: '📮', pricePerKm: 300 },
  { name: 'Ninja Express', basePrice: 24000, duration: '2-4 days', icon: '🥷', pricePerKm: 550 },
];

export const SupplierResults: React.FC<SupplierResultsProps> = ({
  suppliers,
  user,
  shortlist,
  onAddToShortlist,
  onCreatePO,
  onContact,
  items = [] // User's requested items
}) => {
  const [expandedSupplier, setExpandedSupplier] = useState<string | null>(null);
  const [shortlistNotes, setShortlistNotes] = useState<Record<string, string>>({});
  const [showAllShipping, setShowAllShipping] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<SortOption>('ai-recommendation');

  // Enhanced item matching function
  const findMatchingProduct = (requestedItemName: string, supplierCapabilities: Record<string, any>): string | null => {
    const itemName = requestedItemName.toLowerCase().trim();
    console.log(`🔍 Looking for matches for: "${itemName}"`);
    
    // Direct exact match first
    for (const [productKey, productData] of Object.entries(supplierCapabilities)) {
      if (productKey.toLowerCase() === itemName) {
        console.log(`✅ Direct exact match found: "${productKey}"`);
        return productKey;
      }
    }
    
    // Enhanced keyword matching for FMCG products
    const productMappings = [
      {
        keywords: ['indomie', 'mie instan', 'instant noodle', 'instant noodles', 'noodle', 'noodles', 'mie'],
        products: ['Indomie Goreng', 'Indomie Soto Ayam', 'Indomie Ayam Bawang']
      },
      {
        keywords: ['bear brand', 'susu bear', 'susu steril', 'bear', 'brand'],
        products: ['Bear Brand Susu Steril', 'Bear Brand Gold White Tea']
      },
      {
        keywords: ['yamaha', 'nmax', 'motor', 'sepeda motor', 'motorcycle'],
        products: ['Yamaha NMAX 155']
      },
      {
        keywords: ['teh botol', 'sosro', 'teh'],
        products: ['Teh Botol Sosro']
      },
      {
        keywords: ['aqua', 'air mineral', 'water'],
        products: ['Aqua Botol 600ml']
      },
      {
        keywords: ['dancow', 'susu bubuk'],
        products: ['Dancow Fortigro']
      },
      {
        keywords: ['chitato', 'keripik', 'snack', 'makanan ringan', 'chips'],
        products: ['Chitato Sapi Panggang']
      }
    ];
    
    // Check each mapping
    for (const mapping of productMappings) {
      const isKeywordMatch = mapping.keywords.some(keyword => itemName.includes(keyword));
      if (isKeywordMatch) {
        console.log(`🎯 Keyword match found for: "${itemName}" with keywords: ${mapping.keywords.join(', ')}`);
        
        // Find the first available product from this mapping
        for (const product of mapping.products) {
          if (supplierCapabilities[product]) {
            console.log(`✅ Found matching product: "${product}"`);
            return product;
          }
        }
      }
    }
    
    // Partial match as fallback
    for (const [productKey, productData] of Object.entries(supplierCapabilities)) {
      const productKeyLower = productKey.toLowerCase();
      if (itemName.includes(productKeyLower) || productKeyLower.includes(itemName)) {
        console.log(`✅ Partial match found: "${productKey}"`);
        return productKey;
      }
    }
    
    console.log(`❌ No match found for: "${itemName}"`);
    return null;
  };

  // Check item availability for each supplier based on user's requested items
  const getItemAvailability = (supplierId: string): ItemAvailability[] => {
    console.log(`\n🏢 Getting item availability for supplier: ${supplierId}`);
    
    // Enhanced mock data mapping supplier capabilities to FMCG products
    const supplierCapabilities: Record<string, Record<string, any>> = {
      '1': { // PT Indofood Distributor Jakarta
        'Indomie Goreng': { available: true, price: 3200, stock: 500, availability: 'In Stock' },
        'Indomie Soto Ayam': { available: true, price: 3200, stock: 300, availability: 'In Stock' },
        'Indomie Ayam Bawang': { available: true, price: 3200, stock: 400, availability: 'In Stock' },
        'Bear Brand Susu Steril': { available: false },
        'Bear Brand Gold White Tea': { available: false },
        'Yamaha NMAX 155': { available: false },
        'Teh Botol Sosro': { available: true, price: 26000, stock: 100, availability: 'Limited' },
        'Aqua Botol 600ml': { available: false },
        'Dancow Fortigro': { available: false },
        'Chitato Sapi Panggang': { available: false },
      },
      '2': { // CV Nestle Partner Indonesia
        'Bear Brand Susu Steril': { available: true, price: 42000, stock: 200, availability: 'In Stock' },
        'Bear Brand Gold White Tea': { available: true, price: 45000, stock: 150, availability: 'In Stock' },
        'Indomie Goreng': { available: true, price: 3400, stock: 100, availability: 'Limited' },
        'Indomie Soto Ayam': { available: true, price: 3400, stock: 80, availability: 'Limited' },
        'Indomie Ayam Bawang': { available: true, price: 3400, stock: 90, availability: 'Limited' },
        'Yamaha NMAX 155': { available: false },
        'Dancow Fortigro': { available: true, price: 120000, stock: 50, availability: 'In Stock' },
        'Teh Botol Sosro': { available: false },
        'Aqua Botol 600ml': { available: false },
        'Chitato Sapi Panggang': { available: false },
      },
      '3': { // PT Multi FMCG Supplies
        'Indomie Goreng': { available: true, price: 3300, stock: 250, availability: 'In Stock' },
        'Indomie Soto Ayam': { available: true, price: 3300, stock: 200, availability: 'In Stock' },
        'Indomie Ayam Bawang': { available: true, price: 3300, stock: 180, availability: 'In Stock' },
        'Bear Brand Susu Steril': { available: true, price: 44000, stock: 120, availability: 'In Stock' },
        'Bear Brand Gold White Tea': { available: true, price: 47000, stock: 80, availability: 'Limited' },
        'Yamaha NMAX 155': { available: false },
        'Teh Botol Sosro': { available: true, price: 27000, stock: 150, availability: 'In Stock' },
        'Chitato Sapi Panggang': { available: true, price: 82000, stock: 60, availability: 'In Stock' },
        'Aqua Botol 600ml': { available: true, price: 33000, stock: 100, availability: 'In Stock' },
        'Dancow Fortigro': { available: true, price: 122000, stock: 40, availability: 'Limited' },
      },
      '4': { // PT Yamaha Motor Distributor
        'Yamaha NMAX 155': { available: true, price: 31500000, stock: 8, availability: 'In Stock' },
        'Indomie Goreng': { available: false },
        'Indomie Soto Ayam': { available: false },
        'Indomie Ayam Bawang': { available: false },
        'Bear Brand Susu Steril': { available: false },
        'Bear Brand Gold White Tea': { available: false },
        'Teh Botol Sosro': { available: false },
        'Aqua Botol 600ml': { available: false },
        'Dancow Fortigro': { available: false },
        'Chitato Sapi Panggang': { available: false },
      },
      '5': { // PT Honda Motor Indonesia
        'Yamaha NMAX 155': { available: false }, // Honda doesn't sell Yamaha
        'Indomie Goreng': { available: false },
        'Indomie Soto Ayam': { available: false },
        'Indomie Ayam Bawang': { available: false },
        'Bear Brand Susu Steril': { available: false },
        'Bear Brand Gold White Tea': { available: false },
        'Teh Botol Sosro': { available: false },
        'Aqua Botol 600ml': { available: false },
        'Dancow Fortigro': { available: false },
        'Chitato Sapi Panggang': { available: false },
      },
      '6': { // CV Indomie Specialist
        'Indomie Goreng': { available: true, price: 3000, stock: 1000, availability: 'In Stock' },
        'Indomie Soto Ayam': { available: true, price: 3000, stock: 800, availability: 'In Stock' },
        'Indomie Ayam Bawang': { available: true, price: 3000, stock: 900, availability: 'In Stock' },
        'Bear Brand Susu Steril': { available: false },
        'Bear Brand Gold White Tea': { available: false },
        'Yamaha NMAX 155': { available: false },
        'Teh Botol Sosro': { available: false },
        'Aqua Botol 600ml': { available: false },
        'Dancow Fortigro': { available: false },
        'Chitato Sapi Panggang': { available: false },
      },
    };

    const supplierData = supplierCapabilities[supplierId] || {};
    console.log(`📦 Supplier ${supplierId} capabilities:`, Object.keys(supplierData));
    
    return items.map(requestedItem => {
      console.log(`\n🔍 Processing requested item: "${requestedItem.productName}"`);
      
      // Use enhanced matching to find the right product
      const matchingProductKey = findMatchingProduct(requestedItem.productName, supplierData);
      
      if (!matchingProductKey) {
        console.log(`❌ No matching product found for: "${requestedItem.productName}"`);
        return {
          requestedItem,
          isAvailable: false,
          availability: 'Not Available' as const,
          notes: 'This supplier does not carry this item'
        };
      }
      
      const itemData = supplierData[matchingProductKey];
      console.log(`📋 Found matching product: "${matchingProductKey}"`, itemData);
      
      if (!itemData || !itemData.available) {
        console.log(`❌ Product "${matchingProductKey}" not available`);
        return {
          requestedItem,
          isAvailable: false,
          availability: 'Not Available' as const,
          notes: 'This supplier does not carry this item'
        };
      }

      console.log(`✅ Product "${matchingProductKey}" is available!`);
      return {
        requestedItem,
        isAvailable: true,
        supplierPrice: itemData.price,
        availability: itemData.availability,
        supplierQuantity: itemData.stock,
        notes: itemData.stock < requestedItem.quantity ? 
          `Only ${itemData.stock} available (need ${requestedItem.quantity})` : 
          `${itemData.stock} units available`
      };
    });
  };

  // Calculate match percentage
  const getMatchPercentage = (supplierId: string): number => {
    const availability = getItemAvailability(supplierId);
    const availableCount = availability.filter(item => item.isAvailable).length;
    return Math.round((availableCount / items.length) * 100);
  };

  // Calculate actual estimated total based on available items and their prices
  const getActualEstimatedTotal = (supplierId: string): number => {
    const availability = getItemAvailability(supplierId);
    let total = 0;
    
    availability.forEach(item => {
      if (item.isAvailable && item.supplierPrice) {
        // Calculate based on available quantity vs requested quantity
        const quantityToCalculate = item.supplierQuantity && item.supplierQuantity < item.requestedItem.quantity 
          ? item.supplierQuantity 
          : item.requestedItem.quantity;
        
        total += item.supplierPrice * quantityToCalculate;
      }
    });
    
    return total;
  };

  // Calculate distance and shipping info based on supplier location
  const getDistanceInfo = (supplierLocation: string): DistanceInfo => {
    // Mock distance calculation based on supplier location
    // In real app, this would use actual geolocation and routing APIs
    const distanceMap: Record<string, DistanceInfo> = {
      'Jakarta Selatan, DKI Jakarta': {
        distance: 15,
        estimatedTime: '25-35 mins',
        route: 'Via Jl. Sudirman - Jl. Gatot Subroto'
      },
      'Jakarta Pusat, DKI Jakarta': {
        distance: 8,
        estimatedTime: '15-25 mins',
        route: 'Via Jl. MH Thamrin - Jl. Sudirman'
      },
      'Jakarta Timur, DKI Jakarta': {
        distance: 22,
        estimatedTime: '35-50 mins',
        route: 'Via Jl. Casablanca - Jl. MT Haryono'
      },
      'Bandung, Jawa Barat': {
        distance: 150,
        estimatedTime: '3-4 hours',
        route: 'Via Tol Cipularang - Jl. Pasteur'
      },
      'Surabaya, Jawa Timur': {
        distance: 800,
        estimatedTime: '12-14 hours',
        route: 'Via Tol Trans Jawa - Jl. Ahmad Yani'
      },
      'Tangerang, Banten': {
        distance: 25,
        estimatedTime: '45-60 mins',
        route: 'Via Jl. Daan Mogot - Jl. MH Thamrin'
      },
    };
    
    return distanceMap[supplierLocation] || {
      distance: 50,
      estimatedTime: '1-2 hours',
      route: 'Via main roads'
    };
  };

  // Convert lead time to days for sorting
  const getLeadTimeDays = (leadTime: string): number => {
    const match = leadTime.match(/(\d+)/);
    return match ? parseInt(match[1]) : 999;
  };

  // Sort suppliers based on selected criteria
  const getSortedSuppliers = (): Supplier[] => {
    const suppliersWithCalculations = suppliers.map(supplier => ({
      ...supplier,
      actualEstimatedPrice: getActualEstimatedTotal(supplier.id),
      matchPercentage: getMatchPercentage(supplier.id),
      distance: getDistanceInfo(supplier.location).distance,
      leadTimeDays: getLeadTimeDays(supplier.leadTime)
    }));

    switch (sortBy) {
      case 'ai-recommendation':
        return suppliersWithCalculations.sort((a, b) => {
          // AI recommended first, then by match percentage, then by rating
          if (a.isAiRecommended && !b.isAiRecommended) return -1;
          if (!a.isAiRecommended && b.isAiRecommended) return 1;
          if (a.matchPercentage !== b.matchPercentage) return b.matchPercentage - a.matchPercentage;
          return b.rating - a.rating;
        });
      
      case 'cheapest':
        return suppliersWithCalculations.sort((a, b) => {
          // Sort by actual estimated price (0 means no items available, put at end)
          if (a.actualEstimatedPrice === 0 && b.actualEstimatedPrice === 0) return 0;
          if (a.actualEstimatedPrice === 0) return 1;
          if (b.actualEstimatedPrice === 0) return -1;
          return a.actualEstimatedPrice - b.actualEstimatedPrice;
        });
      
      case 'closest':
        return suppliersWithCalculations.sort((a, b) => a.distance - b.distance);
      
      case 'fastest-delivery':
        return suppliersWithCalculations.sort((a, b) => a.leadTimeDays - b.leadTimeDays);
      
      case 'highest-rating':
        return suppliersWithCalculations.sort((a, b) => b.rating - a.rating);
      
      case 'best-match':
        return suppliersWithCalculations.sort((a, b) => {
          if (a.matchPercentage !== b.matchPercentage) return b.matchPercentage - a.matchPercentage;
          return b.rating - a.rating;
        });
      
      default:
        return suppliersWithCalculations;
    }
  };

  // Calculate shipping price based on distance
  const calculateShippingPrice = (basePrice: number, pricePerKm: number = 0, distance: number): number => {
    return Math.round(basePrice + (pricePerKm * distance));
  };

  // Adjust delivery time based on distance
  const adjustDeliveryTime = (baseDuration: string, distance: number): string => {
    if (distance > 500) {
      // Long distance - add extra day
      return baseDuration.replace(/(\d+)-(\d+)/, (match, p1, p2) => `${parseInt(p1) + 1}-${parseInt(p2) + 1}`);
    } else if (distance < 50) {
      // Local delivery - might be faster
      return baseDuration.replace(/(\d+)-(\d+)/, (match, p1, p2) => {
        const min = Math.max(1, parseInt(p1) - 1);
        return `${min}-${parseInt(p2)}`;
      });
    }
    return baseDuration;
  };

  const toggleExpanded = (supplierId: string) => {
    setExpandedSupplier(expandedSupplier === supplierId ? null : supplierId);
  };

  const handleAddToShortlist = (supplierId: string) => {
    const notes = shortlistNotes[supplierId] || '';
    onAddToShortlist(supplierId, notes);
    setShortlistNotes({ ...shortlistNotes, [supplierId]: '' });
  };

  const isInShortlist = (supplierId: string) => {
    return shortlist.some(item => item.supplierId === supplierId);
  };

  const toggleShowAllShipping = (supplierId: string) => {
    setShowAllShipping(prev => ({
      ...prev,
      [supplierId]: !prev[supplierId]
    }));
  };

  // Mock coordinates for suppliers (in real app, this would come from API)
  const getSupplierCoordinates = (location: string): [number, number] => {
    const locationMap: Record<string, [number, number]> = {
      'Jakarta Selatan, DKI Jakarta': [-6.2615, 106.8106],
      'Jakarta Pusat, DKI Jakarta': [-6.1944, 106.8229],
      'Jakarta Timur, DKI Jakarta': [-6.2250, 106.9004],
      'Bandung, Jawa Barat': [-6.9175, 107.6191],
      'Surabaya, Jawa Timur': [-7.2575, 112.7521],
      'Tangerang, Banten': [-6.1783, 106.6319],
    };
    return locationMap[location] || [-6.2088, 106.8456]; // Default to Jakarta
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'In Stock': return 'text-green-600 bg-green-100';
      case 'Limited': return 'text-yellow-600 bg-yellow-100';
      case 'Pre-order': return 'text-blue-600 bg-blue-100';
      case 'Not Available': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getQuantityStatus = (needed: number, available: number) => {
    if (available >= needed) {
      return { color: 'text-green-600', status: 'Sufficient' };
    } else if (available > 0) {
      return { color: 'text-yellow-600', status: 'Partial' };
    } else {
      return { color: 'text-red-600', status: 'Insufficient' };
    }
  };

  const getDistanceColor = (distance: number) => {
    if (distance < 50) return 'text-green-600';
    if (distance < 200) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSortLabel = (option: SortOption): string => {
    switch (option) {
      case 'ai-recommendation': return 'AI Recommendation & Match %';
      case 'cheapest': return 'Cheapest Price';
      case 'closest': return 'Closest Distance';
      case 'fastest-delivery': return 'Fastest Delivery';
      case 'highest-rating': return 'Highest Rating';
      case 'best-match': return 'Best Item Match';
      default: return 'AI Recommendation';
    }
  };

  const sortedSuppliers = getSortedSuppliers();
  const aiRecommendedCount = suppliers.filter(s => s.isAiRecommended).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Supplier Recommendations ({suppliers.length})
          </h2>
          {aiRecommendedCount > 0 && (
            <div className="flex items-center mt-2">
              <Crown className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-blue-600">{aiRecommendedCount} AI-Recommended</span> suppliers found - our top picks for your needs
              </span>
            </div>
          )}
        </div>
        
        {/* Sort Dropdown */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600 font-medium">Sort by:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none bg-white text-sm font-medium min-w-[200px]"
          >
            <option value="ai-recommendation">AI Recommendation & Match %</option>
            <option value="cheapest">Cheapest Price</option>
            <option value="closest">Closest Distance</option>
            <option value="fastest-delivery">Fastest Delivery</option>
            <option value="highest-rating">Highest Rating</option>
            <option value="best-match">Best Item Match</option>
          </select>
        </div>
      </div>

      {/* Sort Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-center">
          <ArrowUpDown className="h-4 w-4 text-blue-600 mr-2" />
          <span className="text-sm text-blue-800">
            Currently sorted by: <span className="font-semibold">{getSortLabel(sortBy)}</span>
            {aiRecommendedCount > 0 && sortBy === 'ai-recommendation' && (
              <span className="ml-2 text-blue-600">• AI recommendations appear first</span>
            )}
          </span>
        </div>
      </div>

      {sortedSuppliers.map((supplier, index) => {
        const distanceInfo = getDistanceInfo(supplier.location);
        const itemAvailability = getItemAvailability(supplier.id);
        const matchPercentage = getMatchPercentage(supplier.id);
        const actualEstimatedTotal = getActualEstimatedTotal(supplier.id);
        const availableItems = itemAvailability.filter(item => item.isAvailable);
        const unavailableItems = itemAvailability.filter(item => !item.isAvailable);
        
        return (
          <div key={supplier.id} className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg relative border border-gray-200 ${
            supplier.isAiRecommended 
              ? 'ai-recommendation-card' 
              : ''
          }`}>
            <div className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-4">
                  {/* Single line with supplier name, AI badge, and match percentage */}
                  <div className="flex items-center space-x-3 mb-3 flex-wrap">
                    <h3 className="text-xl font-bold text-gray-900">{supplier.name}</h3>
                    {supplier.isAiRecommended && (
                      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-lg">
                        <Crown className="h-4 w-4 mr-1" />
                        AI Top Pick #{index + 1}
                      </div>
                    )}
                    {/* Match Percentage Badge */}
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(matchPercentage)}`}>
                      {matchPercentage}% Match
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{supplier.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {supplier.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {supplier.leadTime}
                    </div>
                  </div>

                  {/* Detailed Address */}
                  <div className="text-sm text-gray-500 mb-3 pl-5">
                    <MapPin className="h-3 w-3 inline mr-1" />
                    {supplier.detailedAddress}
                  </div>

                  {/* Distance and Route Info */}
                  <div className="flex items-center space-x-4 text-sm mb-3">
                    <div className="flex items-center">
                      <Route className="h-4 w-4 mr-1 text-blue-500" />
                      <span className={`font-medium ${getDistanceColor(distanceInfo.distance)}`}>
                        {distanceInfo.distance} km away
                      </span>
                    </div>
                    <div className="text-gray-600">
                      • {distanceInfo.estimatedTime} drive
                    </div>
                  </div>

                  {supplier.isAiRecommended && supplier.aiReason && (
                    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 border border-blue-200 rounded-lg p-4 mb-3 relative overflow-hidden">
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-purple-100/20 to-cyan-100/20 animate-pulse"></div>
                      <div className="flex items-start space-x-3 relative z-10">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg flex-shrink-0">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-blue-900 text-sm mb-1">
                            Why AI recommends this supplier:
                          </div>
                          <p className="text-sm text-blue-800">
                            {supplier.aiReason}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Item Availability Summary */}
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">Item Availability:</div>
                    <div className="space-y-2">
                      {/* Available Items */}
                      {availableItems.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {availableItems.map((item, index) => (
                            <div key={index} className="flex items-center bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-sm font-medium text-green-800">{item.requestedItem.productName}</span>
                              <span className="text-xs text-green-600 ml-2">
                                ({item.supplierQuantity} available)
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Unavailable Items */}
                      {unavailableItems.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {unavailableItems.map((item, index) => (
                            <div key={index} className="flex items-center bg-red-50 border border-red-200 rounded-lg px-3 py-1.5">
                              <XCircle className="h-4 w-4 text-red-600 mr-2" />
                              <span className="text-sm font-medium text-red-800">{item.requestedItem.productName}</span>
                              <span className="text-xs text-red-600 ml-2">Not Available</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-bold text-[#085B59]">
                    {actualEstimatedTotal > 0 ? (
                      `Rp${actualEstimatedTotal.toLocaleString()}`
                    ) : (
                      <span className="text-gray-400">Rp0</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {actualEstimatedTotal > 0 ? 'Estimated Total' : 'No Available Items'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {availableItems.length}/{items.length} items available
                  </div>
                  {actualEstimatedTotal === 0 && (
                    <div className="text-xs text-red-600 mt-1 font-medium">
                      Contact for alternatives
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => toggleExpanded(supplier.id)}
                  className="bg-[#085B59] text-white px-4 py-2 rounded-lg hover:bg-[#074e4c] transition-colors font-medium"
                >
                  See Details
                </button>

                {user?.isLoggedIn && (
                  <div className="flex items-center space-x-2">
                    {!isInShortlist(supplier.id) ? (
                      <>
                        <input
                          type="text"
                          placeholder="Add notes..."
                          value={shortlistNotes[supplier.id] || ''}
                          onChange={(e) => setShortlistNotes({ ...shortlistNotes, [supplier.id]: e.target.value })}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                        />
                        <button
                          onClick={() => handleAddToShortlist(supplier.id)}
                          className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center"
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          Save
                        </button>
                      </>
                    ) : (
                      <div className="text-sm text-green-600 font-medium flex items-center">
                        <Heart className="h-4 w-4 mr-1 fill-current" />
                        Saved to Shortlist
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Detailed View */}
            {expandedSupplier === supplier.id && (
              <div className="bg-gray-50 border-t border-gray-200">
                <div className="p-6 space-y-6">
                  {/* Detailed Item Availability */}
                  <div className="bg-white rounded-lg p-5 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Package className="h-5 w-5 mr-2 text-[#085B59]" />
                      Requested Items & Availability
                    </h4>
                    <div className="space-y-3">
                      {itemAvailability.map((item, index) => (
                        <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                          item.isAvailable ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                        }`}>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              {item.isAvailable ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-600" />
                              )}
                              <div>
                                <div className="font-medium text-gray-900">{item.requestedItem.productName}</div>
                                <div className="text-sm text-gray-600 mt-1">
                                  <span className="font-medium">Requested:</span> {item.requestedItem.quantity} {item.requestedItem.unit}
                                  {item.isAvailable && item.supplierQuantity && (
                                    <>
                                      <span className="ml-3 font-medium">Available:</span> 
                                      <span className={`ml-1 font-semibold ${
                                        item.supplierQuantity >= item.requestedItem.quantity ? 'text-green-600' : 'text-yellow-600'
                                      }`}>
                                        {item.supplierQuantity} units
                                      </span>
                                    </>
                                  )}
                                </div>
                                {item.notes && (
                                  <div className={`text-xs mt-1 ${item.isAvailable ? 'text-green-700' : 'text-red-700'}`}>
                                    {item.notes}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            {item.availability && (
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(item.availability)}`}>
                                {item.availability}
                              </span>
                            )}
                            {item.isAvailable && item.supplierPrice && (
                              <div className="text-right">
                                <div className="font-bold text-gray-900">
                                  Rp{item.supplierPrice.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-600">per unit</div>
                                <div className="text-xs text-gray-500 mt-1">
                                  Total: Rp{(item.supplierPrice * item.requestedItem.quantity).toLocaleString()}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Supplier Information Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Supplier Details */}
                    <div className="space-y-6">
                      {/* Contact Information */}
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Phone className="h-5 w-5 mr-2 text-[#085B59]" />
                          Contact Information
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-gray-400" />
                              <span className="text-sm text-gray-600">Email:</span>
                            </div>
                            <a 
                              href={`mailto:${supplier.contactEmail}`} 
                              className="text-[#FF8B00] hover:underline font-medium text-sm"
                            >
                              {supplier.contactEmail}
                            </a>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-gray-400" />
                              <span className="text-sm text-gray-600">Phone:</span>
                            </div>
                            <a 
                              href={`tel:${supplier.phone}`} 
                              className="text-[#FF8B00] hover:underline font-medium text-sm"
                            >
                              {supplier.phone}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Product Catalog */}
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Package className="h-5 w-5 mr-2 text-[#085B59]" />
                          Full Product Catalog
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {supplier.coverageItems.map((item, index) => (
                            <span key={index} className="bg-[#FF8B00]/10 text-[#FF8B00] px-3 py-1.5 rounded-full text-sm font-medium">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Certifications */}
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Award className="h-5 w-5 mr-2 text-[#085B59]" />
                          Certifications
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {supplier.certifications.map((cert, index) => (
                            <span key={index} className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Location & Shipping */}
                    <div className="space-y-6">
                      {/* Location Map */}
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Navigation className="h-5 w-5 mr-2 text-[#085B59]" />
                          Supplier Location
                        </h4>
                        <div className="h-48 rounded-lg overflow-hidden border border-gray-200">
                          <MapContainer
                            center={getSupplierCoordinates(supplier.location)}
                            zoom={12}
                            style={{ height: '100%', width: '100%' }}
                          >
                            <TileLayer
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={getSupplierCoordinates(supplier.location)} />
                            <Circle
                              center={getSupplierCoordinates(supplier.location)}
                              radius={2000}
                              pathOptions={{
                                color: '#085B59',
                                fillColor: '#085B59',
                                fillOpacity: 0.1,
                                weight: 2
                              }}
                            />
                          </MapContainer>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="text-sm text-gray-600 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {supplier.detailedAddress}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center">
                            <Route className="h-4 w-4 mr-1 text-blue-500" />
                            <span className={`font-medium ${getDistanceColor(distanceInfo.distance)}`}>
                              {distanceInfo.distance} km from your area
                            </span>
                            <span className="ml-2">• {distanceInfo.estimatedTime}</span>
                          </div>
                          <div className="text-xs text-gray-500 pl-5">
                            Route: {distanceInfo.route}
                          </div>
                        </div>
                      </div>

                      {/* Shipping Options with Distance-based Pricing */}
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <Truck className="h-5 w-5 mr-2 text-[#085B59]" />
                          Shipping Options
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Based on {distanceInfo.distance}km distance
                          </span>
                        </h4>
                        <div className="space-y-3">
                          {(showAllShipping[supplier.id] ? shippingOptions : shippingOptions.slice(0, 3)).map((option, index) => {
                            const adjustedPrice = calculateShippingPrice(option.basePrice, option.pricePerKm, distanceInfo.distance);
                            const adjustedDuration = adjustDeliveryTime(option.duration, distanceInfo.distance);
                            
                            return (
                              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center space-x-3">
                                  <span className="text-lg">{option.icon}</span>
                                  <div>
                                    <div className="font-medium text-gray-900 text-sm">{option.name}</div>
                                    <div className="text-xs text-gray-600">{adjustedDuration}</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-gray-900 text-sm">
                                    Rp{adjustedPrice.toLocaleString()}
                                  </div>
                                  <div className="text-xs text-gray-600">per shipment</div>
                                  {adjustedPrice !== option.basePrice && (
                                    <div className="text-xs text-blue-600">
                                      +Rp{(adjustedPrice - option.basePrice).toLocaleString()} distance fee
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                          
                          {shippingOptions.length > 3 && (
                            <button
                              onClick={() => toggleShowAllShipping(supplier.id)}
                              className="w-full text-center py-2 text-[#FF8B00] hover:text-[#e67a00] font-medium text-sm transition-colors"
                            >
                              {showAllShipping[supplier.id] ? 'Show Less' : `See More (${shippingOptions.length - 3} more options)`}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => onCreatePO(supplier)}
                      className="bg-[#FF8B00] text-white px-6 py-3 rounded-lg hover:bg-[#e67a00] transition-colors font-semibold flex items-center"
                    >
                      <FileText className="h-5 w-5 mr-2" />
                      Create Purchase Order
                    </button>
                    
                    <button
                      onClick={() => onContact(supplier)}
                      className="bg-white border border-[#085B59] text-[#085B59] px-6 py-3 rounded-lg hover:bg-[#085B59] hover:text-white transition-colors font-semibold flex items-center"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Contact Supplier
                    </button>

                    <button
                      onClick={() => toggleExpanded(supplier.id)}
                      className="text-gray-500 hover:text-gray-700 px-4 py-3 rounded-lg transition-colors flex items-center"
                    >
                      <ChevronUp className="h-5 w-5 mr-1" />
                      Hide Details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};