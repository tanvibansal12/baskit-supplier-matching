import { Brand, Product, MarketplaceListing, Distributor, Retailer, Receipt, Campaign, DistributorApplication } from '../types/marketplace';

export const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'Indofood',
    logo: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    email: 'partnerships@indofood.com',
    phone: '+62-21-555-1001',
    description: 'Leading Indonesian food and beverage manufacturer',
    isVerified: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Nestle Indonesia',
    logo: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    email: 'trade@nestle.co.id',
    phone: '+62-21-555-2002',
    description: 'Global nutrition, health and wellness company',
    isVerified: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '3',
    name: 'Unilever Indonesia',
    logo: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    email: 'business@unilever.co.id',
    phone: '+62-21-555-3003',
    description: 'Consumer goods company with sustainable living brands',
    isVerified: true,
    createdAt: new Date('2024-01-01')
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    brandId: '1',
    name: 'Indomie Goreng',
    sku: 'IDM-GRG-001',
    category: 'Instant Noodles',
    description: 'Original fried instant noodles',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    targetPrice: 3200,
    unit: 'Carton'
  },
  {
    id: '2',
    brandId: '2',
    name: 'Bear Brand Susu Steril',
    sku: 'BB-SUSU-001',
    category: 'Dairy',
    description: 'Sterilized milk drink',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    targetPrice: 42000,
    unit: 'Carton'
  },
  {
    id: '3',
    brandId: '3',
    name: 'Pepsodent Toothpaste',
    sku: 'PPS-TP-001',
    category: 'Personal Care',
    description: 'Complete protection toothpaste',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    targetPrice: 85000,
    unit: 'Carton'
  }
];

export const mockDistributors: Distributor[] = [
  {
    id: '1',
    name: 'PT Jakarta Distribution Center',
    email: 'ops@jakartadist.co.id',
    phone: '+62-21-555-4001',
    address: 'Jl. Sudirman Kav. 25, Jakarta Selatan',
    region: 'DKI Jakarta',
    coverageAreas: ['Jakarta Selatan', 'Jakarta Pusat', 'Jakarta Timur'],
    rating: 4.8,
    totalFulfillments: 156,
    totalReceiptUploads: 89,
    loyaltyPoints: 12450,
    isVerified: true,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'CV Bandung Supply Chain',
    email: 'contact@bandungsupply.co.id',
    phone: '+62-22-555-4002',
    address: 'Jl. Asia Afrika No. 133, Bandung',
    region: 'Jawa Barat',
    coverageAreas: ['Bandung', 'Cimahi', 'Sumedang'],
    rating: 4.6,
    totalFulfillments: 134,
    totalReceiptUploads: 67,
    loyaltyPoints: 9870,
    isVerified: true,
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'PT Surabaya Logistics Hub',
    email: 'business@surabayahub.co.id',
    phone: '+62-31-555-4003',
    address: 'Jl. Raya Darmo No. 68, Surabaya',
    region: 'Jawa Timur',
    coverageAreas: ['Surabaya', 'Sidoarjo', 'Gresik'],
    rating: 4.7,
    totalFulfillments: 98,
    totalReceiptUploads: 45,
    loyaltyPoints: 7650,
    isVerified: true,
    createdAt: new Date('2024-02-01')
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    brandId: '1',
    brand: mockBrands[0],
    name: 'Indomie Ramadan Campaign',
    description: 'Special promotion for Ramadan season with bonus points',
    skus: ['IDM-GRG-001', 'IDM-SA-001'],
    targetRegion: 'DKI Jakarta',
    budget: 50000000,
    spentBudget: 12500000,
    pointsPerReceipt: 100,
    bonusMultiplier: 2,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-04-30'),
    status: 'active',
    participatingDistributors: ['1', '2'],
    totalReceipts: 125,
    createdAt: new Date('2024-02-15')
  },
  {
    id: '2',
    brandId: '2',
    brand: mockBrands[1],
    name: 'Bear Brand Health Campaign',
    description: 'Promote healthy lifestyle with Bear Brand products',
    skus: ['BB-SUSU-001'],
    targetRegion: 'Jawa Barat',
    budget: 30000000,
    spentBudget: 8500000,
    pointsPerReceipt: 150,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-03-31'),
    status: 'active',
    participatingDistributors: ['2', '3'],
    totalReceipts: 67,
    createdAt: new Date('2024-01-20')
  }
];

export const mockListings: MarketplaceListing[] = [
  {
    id: '1',
    brandId: '1',
    brand: mockBrands[0],
    productId: '1',
    product: mockProducts[0],
    targetRegion: 'DKI Jakarta',
    quantity: 1000,
    pricePerUnit: 3200,
    totalBudget: 3200000,
    campaignId: '1',
    campaign: mockCampaigns[0],
    status: 'active',
    applications: [],
    createdAt: new Date('2024-03-01'),
    expiresAt: new Date('2024-04-30')
  },
  {
    id: '2',
    brandId: '2',
    brand: mockBrands[1],
    productId: '2',
    product: mockProducts[1],
    targetRegion: 'Jawa Barat',
    quantity: 500,
    pricePerUnit: 42000,
    totalBudget: 21000000,
    campaignId: '2',
    campaign: mockCampaigns[1],
    status: 'active',
    applications: [],
    createdAt: new Date('2024-02-15'),
    expiresAt: new Date('2024-03-31')
  },
  {
    id: '3',
    brandId: '3',
    brand: mockBrands[2],
    productId: '3',
    product: mockProducts[2],
    targetRegion: 'Jawa Timur',
    quantity: 300,
    pricePerUnit: 85000,
    totalBudget: 25500000,
    status: 'active',
    applications: [],
    createdAt: new Date('2024-03-10'),
    expiresAt: new Date('2024-05-10')
  }
];

export const mockReceipts: Receipt[] = [
  {
    id: '1',
    uploaderId: '1',
    uploaderType: 'distributor',
    photo: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    phoneNumber: '+62812345678',
    sku: 'IDM-GRG-001',
    brandId: '1',
    amount: 32000,
    pointsEarned: 200,
    campaignId: '1',
    status: 'verified',
    uploadedAt: new Date('2024-03-15'),
    verifiedAt: new Date('2024-03-15')
  },
  {
    id: '2',
    uploaderId: '2',
    uploaderType: 'distributor',
    photo: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    phoneNumber: '+62823456789',
    sku: 'BB-SUSU-001',
    brandId: '2',
    amount: 84000,
    pointsEarned: 150,
    campaignId: '2',
    status: 'verified',
    uploadedAt: new Date('2024-03-12'),
    verifiedAt: new Date('2024-03-12')
  }
];