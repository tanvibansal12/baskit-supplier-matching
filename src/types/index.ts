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
  isLoggedIn: boolean;
}

export interface ShortlistItem {
  supplierId: string;
  notes: string;
  dateAdded: Date;
}