export interface Brand {
  id: string;
  name: string;
  logo?: string;
  email: string;
  phone: string;
  description: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface Product {
  id: string;
  brandId: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  image?: string;
  targetPrice?: number;
  unit: string;
}

export interface MarketplaceListing {
  id: string;
  brandId: string;
  brand: Brand;
  productId: string;
  product: Product;
  targetRegion: string;
  quantity: number;
  pricePerUnit: number;
  totalBudget: number;
  campaignId?: string;
  campaign?: Campaign;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  applications: DistributorApplication[];
  createdAt: Date;
  expiresAt?: Date;
}

export interface DistributorApplication {
  id: string;
  listingId: string;
  distributorId: string;
  distributor: Distributor;
  proposedQuantity: number;
  proposedPrice: number;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: Date;
  respondedAt?: Date;
}

export interface Distributor {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  region: string;
  coverageAreas: string[];
  rating: number;
  totalFulfillments: number;
  totalReceiptUploads: number;
  loyaltyPoints: number;
  isVerified: boolean;
  createdAt: Date;
}

export interface Retailer {
  id: string;
  name: string;
  phone: string;
  address: string;
  region: string;
  loyaltyPoints: number;
  totalPurchases: number;
  createdAt: Date;
}

export interface Receipt {
  id: string;
  uploaderId: string;
  uploaderType: 'retailer' | 'distributor';
  photo: string;
  phoneNumber: string;
  sku: string;
  brandId: string;
  amount: number;
  pointsEarned: number;
  campaignId?: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: Date;
  verifiedAt?: Date;
}

export interface Campaign {
  id: string;
  brandId: string;
  brand: Brand;
  name: string;
  description: string;
  skus: string[];
  targetRegion: string;
  budget: number;
  spentBudget: number;
  pointsPerReceipt: number;
  bonusMultiplier?: number;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'active' | 'paused' | 'completed';
  participatingDistributors: string[];
  totalReceipts: number;
  createdAt: Date;
}

export interface LeaderboardEntry {
  rank: number;
  distributorId: string;
  distributor: Distributor;
  fulfillmentVolume: number;
  receiptCount: number;
  campaignParticipation: number;
  totalScore: number;
}

export interface WhatsAppMessage {
  id: string;
  phone: string;
  message: string;
  type: 'order' | 'promo' | 'confirmation' | 'notification';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  sentAt: Date;
  relatedReceiptId?: string;
  relatedCampaignId?: string;
}