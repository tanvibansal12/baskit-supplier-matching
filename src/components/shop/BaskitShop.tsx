import React, { useState } from 'react';
import { 
  ShoppingCart, Search, Filter, Star, Package, Truck, 
  CreditCard, Receipt, Gift, MapPin, Clock, Plus, Minus,
  Heart, Share2, Eye, Award, CheckCircle, Smartphone
} from 'lucide-react';

interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  stockLevel: number;
  description: string;
  loyaltyPoints: number;
  isOnSale?: boolean;
  deliveryTime: string;
}

interface CartItem extends Product {
  quantity: number;
}

export const BaskitShop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(12450);

  // Mock products
  const products: Product[] = [
    {
      id: '1',
      sku: 'IDM-GRG-85G',
      name: 'Indomie Goreng 85g',
      brand: 'Indomie',
      category: 'Instant Noodles',
      price: 3200,
      originalPrice: 3500,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      rating: 4.8,
      reviews: 1250,
      inStock: true,
      stockLevel: 500,
      description: 'Original fried instant noodles with authentic Indonesian taste',
      loyaltyPoints: 32,
      isOnSale: true,
      deliveryTime: '1-2 days'
    },
    {
      id: '2',
      sku: 'BB-SUSU-189ML',
      name: 'Bear Brand Susu Steril 189ml',
      brand: 'Bear Brand',
      category: 'Dairy',
      price: 4200,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      rating: 4.7,
      reviews: 890,
      inStock: true,
      stockLevel: 200,
      description: 'Sterilized milk drink with high protein content',
      loyaltyPoints: 42,
      deliveryTime: '1-3 days'
    },
    {
      id: '3',
      sku: 'TEH-BOT-450ML',
      name: 'Teh Botol Sosro 450ml',
      brand: 'Sosro',
      category: 'Beverages',
      price: 5400,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      rating: 4.6,
      reviews: 650,
      inStock: true,
      stockLevel: 150,
      description: 'Refreshing jasmine tea in convenient bottle',
      loyaltyPoints: 54,
      deliveryTime: '2-3 days'
    },
    {
      id: '4',
      sku: 'CHI-SP-68G',
      name: 'Chitato Sapi Panggang 68g',
      brand: 'Chitato',
      category: 'Snacks',
      price: 19800,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      rating: 4.5,
      reviews: 420,
      inStock: true,
      stockLevel: 80,
      description: 'Crispy potato chips with grilled beef flavor',
      loyaltyPoints: 198,
      deliveryTime: '1-2 days'
    }
  ];

  const categories = ['all', 'Instant Noodles', 'Dairy', 'Beverages', 'Snacks', 'Personal Care'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalPoints = () => {
    return cart.reduce((total, item) => total + (item.loyaltyPoints * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Baskit Shop</h1>
          <p className="text-gray-600 mt-2">Browse SKUs, order products, and earn loyalty points</p>
        </div>
        
        {/* Loyalty Points & Cart */}
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-[#085B59] to-[#FF8B00] text-white px-4 py-2 rounded-lg">
            <div className="flex items-center">
              <Gift className="h-5 w-5 mr-2" />
              <div>
                <div className="text-sm opacity-90">Loyalty Points</div>
                <div className="font-bold">{loyaltyPoints.toLocaleString()}</div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative bg-[#FF8B00] text-white px-4 py-2 rounded-lg hover:bg-[#e67a00] transition-colors flex items-center"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Cart
            {getCartItemCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, brands, or SKUs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            
            <button className="border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.isOnSale && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      SALE
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                      {product.brand}
                    </span>
                    <span className="text-xs text-gray-500">SKU: {product.sku}</span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        Rp{product.price.toLocaleString()}
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          Rp{product.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[#FF8B00] font-medium">
                        +{product.loyaltyPoints} pts
                      </div>
                    </div>
                  </div>

                  {/* Stock & Delivery */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-1" />
                      <span>{product.stockLevel} in stock</span>
                    </div>
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      <span>{product.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className="w-full bg-[#FF8B00] text-white py-2 px-4 rounded-lg hover:bg-[#e67a00] transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Cart Sidebar */}
        <div className={`lg:col-span-1 ${showCart ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Shopping Cart ({getCartItemCount()})
            </h3>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm truncate">{item.name}</div>
                        <div className="text-xs text-gray-600">Rp{item.price.toLocaleString()}</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>Rp{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery:</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#FF8B00] font-medium">
                      <span>Points to earn:</span>
                      <span>+{getTotalPoints()}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>Rp{getTotalPrice().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Buttons */}
                  <div className="mt-4 space-y-2">
                    <button className="w-full bg-[#085B59] text-white py-3 px-4 rounded-lg hover:bg-[#074e4c] transition-colors font-medium flex items-center justify-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Checkout
                    </button>
                    <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Order via WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};