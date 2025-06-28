import React, { useState } from 'react';
import { Upload, Camera, Phone, Package, DollarSign, Star, CheckCircle, AlertCircle, X, Wallet } from 'lucide-react';
import { Receipt } from '../../types/marketplace';
import { mockBrands, mockProducts } from '../../data/marketplaceData';

interface ReceiptUploadProps {
  onReceiptSubmit: (receipt: Omit<Receipt, 'id' | 'uploadedAt' | 'status'>) => void;
  userType: 'retailer' | 'distributor';
  userId: string;
}

export const ReceiptUpload: React.FC<ReceiptUploadProps> = ({ onReceiptSubmit, userType, userId }) => {
  const [photo, setPhoto] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSku, setSelectedSku] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const calculatePoints = () => {
    // Base points calculation: 1 point per 1000 rupiah
    const basePoints = Math.floor(amount / 1000);
    
    // Bonus for campaign participation (mock logic)
    const campaignBonus = selectedSku ? Math.floor(basePoints * 0.5) : 0;
    
    return basePoints + campaignBonus;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo || !phoneNumber || !selectedBrand || !selectedSku || amount <= 0) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const pointsEarned = calculatePoints();
    
    const receiptData: Omit<Receipt, 'id' | 'uploadedAt' | 'status'> = {
      uploaderId: userId,
      uploaderType: userType,
      photo,
      phoneNumber,
      sku: selectedSku,
      brandId: selectedBrand,
      amount,
      pointsEarned,
      verifiedAt: new Date()
    };

    onReceiptSubmit(receiptData);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setPhoto('');
      setPhoneNumber('');
      setSelectedBrand('');
      setSelectedSku('');
      setAmount(0);
      setSubmitSuccess(false);
    }, 3000);
  };

  const filteredProducts = mockProducts.filter(product => 
    selectedBrand ? product.brandId === selectedBrand : true
  );

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Receipt Uploaded Successfully!</h2>
          <p className="text-gray-600 mb-6">Your receipt has been submitted for verification.</p>
          
          <div className="bg-gradient-to-r from-[#085B59] to-[#FF8B00] text-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="h-6 w-6" />
              <span className="text-xl font-bold">Points Earned</span>
            </div>
            <div className="text-3xl font-bold">{calculatePoints()} Points</div>
            <div className="text-sm opacity-90 mt-1">Added to your loyalty wallet</div>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>• Receipt verification typically takes 1-2 business days</p>
            <p>• Points will be credited after verification</p>
            <p>• You'll receive a WhatsApp confirmation message</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FF8B00] rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Receipt</h1>
          <p className="text-gray-600">Earn loyalty points by uploading your purchase receipts</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Receipt Photo *
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive 
                  ? 'border-[#FF8B00] bg-[#FF8B00]/5' 
                  : photo 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-300 hover:border-[#FF8B00]'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {photo ? (
                <div className="relative">
                  <img 
                    src={photo} 
                    alt="Receipt" 
                    className="max-h-64 mx-auto rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => setPhoto('')}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop your receipt photo here, or</p>
                  <label className="bg-[#FF8B00] text-white px-4 py-2 rounded-lg hover:bg-[#e67a00] transition-colors cursor-pointer inline-block">
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+62 812 3456 7890"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                required
              />
            </div>
          </div>

          {/* Brand Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand *
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setSelectedSku(''); // Reset SKU when brand changes
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
              required
            >
              <option value="">Select Brand</option>
              {mockBrands.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>

          {/* SKU Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product SKU *
            </label>
            <select
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
              disabled={!selectedBrand}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              required
            >
              <option value="">Select Product</option>
              {filteredProducts.map(product => (
                <option key={product.id} value={product.sku}>
                  {product.name} ({product.sku})
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Purchase Amount (Rp) *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={amount || ''}
                onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                placeholder="50000"
                min="1"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                required
              />
            </div>
          </div>

          {/* Points Preview */}
          {amount > 0 && (
            <div className="bg-gradient-to-r from-[#085B59]/10 to-[#FF8B00]/10 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wallet className="h-5 w-5 text-[#085B59] mr-2" />
                  <span className="font-medium text-gray-900">Points to Earn:</span>
                </div>
                <div className="text-xl font-bold text-[#085B59]">
                  {calculatePoints()} Points
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Base: {Math.floor(amount / 1000)} points + Campaign bonus: {Math.floor((amount / 1000) * 0.5)} points
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !photo || !phoneNumber || !selectedBrand || !selectedSku || amount <= 0}
            className="w-full bg-[#FF8B00] text-white py-3 px-6 rounded-lg hover:bg-[#e67a00] transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Uploading Receipt...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5 mr-2" />
                Upload Receipt
              </>
            )}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Receipt Upload Guidelines:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Ensure receipt is clear and readable</li>
                <li>Include store name, date, and purchased items</li>
                <li>Receipt must be from the last 30 days</li>
                <li>Points are credited after verification (1-2 business days)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};