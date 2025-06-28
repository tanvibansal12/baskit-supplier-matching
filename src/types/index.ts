export interface ProcurementItem {
  id: string;
  productName: string;
  quantity: number;
  targetPrice?: number;
  unit?: string;
}

export interface DeliveryPreferences {
  location: string;
  preferredLeadTime: string;
}

export interface ProcurementRequest {
  items: ProcurementItem[];
  deliveryPreferences: DeliveryPreferences;
  salesOrderId?: string;
}

export interface Supplier {
  id: string;
  name: string;
  rating: number;
  isAiRecommended: boolean;
  aiReason?: string;
  coverageItems: string[];
  estimatedPrice: number;
  leadTime: string;
  location: string;
  detailedAddress: string;
  certifications: string[];
  contactEmail: string;
  phone: string;
  logo?: string; // Company logo URL
  companyImage?: string; // Company image URL
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'distributor' | 'supplier' | 'admin';
  isLoggedIn: boolean;
  companyName?: string;
  region?: string;
}

export interface ShortlistItem {
  supplierId: string;
  notes: string;
  dateAdded: Date;
}

// New interfaces for supplier-side demand
export interface DistributorDemand {
  id: string;
  distributorId: string;
  distributorName: string;
  distributorEmail: string;
  distributorPhone: string;
  distributorRegion: string;
  distributorRating: number;
  items: ProcurementItem[];
  deliveryPreferences: DeliveryPreferences;
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  budget: number;
  requestedAt: Date;
  expiresAt: Date;
  status: 'open' | 'quoted' | 'negotiating' | 'closed' | 'expired';
  quotesReceived: number;
  description?: string;
  preferredSupplierTypes?: string[];
}

export interface SupplierQuote {
  id: string;
  demandId: string;
  supplierId: string;
  supplierName: string;
  items: {
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    availability: string;
    leadTime: string;
  }[];
  totalAmount: number;
  deliveryTerms: string;
  paymentTerms: string;
  validUntil: Date;
  notes?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  submittedAt: Date;
}