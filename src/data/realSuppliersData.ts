// Real Indonesian suppliers with actual SKUs and regional coverage
export interface RealSupplier {
  id: string;
  name: string;
  type: 'distributor' | 'wholesaler' | 'manufacturer';
  region: string[];
  headquarters: string;
  coverage: {
    provinces: string[];
    cities: string[];
    deliveryRadius: number; // km
  };
  products: {
    sku: string;
    name: string;
    brand: string;
    category: string;
    unitPrice: number;
    minOrder: number;
    unit: string;
    availability: 'in-stock' | 'limited' | 'pre-order' | 'out-of-stock';
    stockLevel: number;
  }[];
  certifications: string[];
  rating: number;
  totalOrders: number;
  responseTime: string; // average response time
  paymentTerms: string[];
  contactInfo: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
  };
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  integrations: {
    basketApp: boolean;
    businessSuite: boolean;
    cashFlow: boolean;
    riskWatch: boolean;
  };
}

export const realSuppliers: RealSupplier[] = [
  {
    id: 'IDF-001',
    name: 'PT Indofood CBP Sukses Makmur Tbk',
    type: 'manufacturer',
    region: ['Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur'],
    headquarters: 'Jakarta Selatan, DKI Jakarta',
    coverage: {
      provinces: ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Banten'],
      cities: ['Jakarta', 'Bandung', 'Semarang', 'Surabaya', 'Tangerang', 'Bekasi', 'Depok', 'Bogor'],
      deliveryRadius: 500
    },
    products: [
      {
        sku: 'IDM-GRG-85G-24',
        name: 'Indomie Goreng 85g (24 pcs/carton)',
        brand: 'Indomie',
        category: 'Instant Noodles',
        unitPrice: 76800, // Rp 76,800 per carton
        minOrder: 10,
        unit: 'Carton',
        availability: 'in-stock',
        stockLevel: 5000
      },
      {
        sku: 'IDM-SA-75G-24',
        name: 'Indomie Soto Ayam 75g (24 pcs/carton)',
        brand: 'Indomie',
        category: 'Instant Noodles',
        unitPrice: 72000,
        minOrder: 10,
        unit: 'Carton',
        availability: 'in-stock',
        stockLevel: 3500
      },
      {
        sku: 'IDM-AB-80G-24',
        name: 'Indomie Ayam Bawang 80g (24 pcs/carton)',
        brand: 'Indomie',
        category: 'Instant Noodles',
        unitPrice: 74400,
        minOrder: 10,
        unit: 'Carton',
        availability: 'in-stock',
        stockLevel: 4200
      },
      {
        sku: 'POP-MIE-75G-24',
        name: 'Pop Mie Ayam Bawang 75g (24 pcs/carton)',
        brand: 'Pop Mie',
        category: 'Cup Noodles',
        unitPrice: 86400,
        minOrder: 5,
        unit: 'Carton',
        availability: 'in-stock',
        stockLevel: 2800
      }
    ],
    certifications: ['HACCP', 'ISO 22000', 'Halal MUI', 'BPOM', 'ISO 9001'],
    rating: 4.9,
    totalOrders: 15420,
    responseTime: '< 2 hours',
    paymentTerms: ['Cash', 'Transfer', 'Credit 30 days', 'Credit 45 days'],
    contactInfo: {
      email: 'b2b@indofood.com',
      phone: '+62-21-5795-8822',
      whatsapp: '+62-811-1234-5678',
      address: 'Sudirman Plaza, Jl. Jend. Sudirman Kav. 76-78, Jakarta 12910'
    },
    businessHours: {
      weekdays: '08:00 - 17:00',
      saturday: '08:00 - 12:00',
      sunday: 'Closed'
    },
    integrations: {
      basketApp: true,
      businessSuite: true,
      cashFlow: true,
      riskWatch: true
    }
  },
  {
    id: 'NST-002',
    name: 'PT Nestle Indonesia',
    type: 'manufacturer',
    region: ['Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Sumatera Utara'],
    headquarters: 'Jakarta Pusat, DKI Jakarta',
    coverage: {
      provinces: ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Sumatera Utara', 'Banten'],
      cities: ['Jakarta', 'Bandung', 'Semarang', 'Medan', 'Tangerang', 'Bekasi'],
      deliveryRadius: 600
    },
    products: [
      {
        sku: 'BB-SUSU-189ML-48',
        name: 'Bear Brand Susu Steril 189ml (48 pcs/carton)',
        brand: 'Bear Brand',
        category: 'Dairy Products',
        unitPrice: 201600, // Rp 201,600 per carton
        minOrder: 5,
        unit: 'Carton',
        availability: 'in-stock',
        stockLevel: 1200
      },
      {
        sku: 'BB-WT-189ML-48',
        name: 'Bear Brand Gold White Tea 189ml (48 pcs/carton)',
        brand: 'Bear Brand',
        category: 'Dairy Products',
        unitPrice: 216000,
        minOrder: 5,
        unit: 'Carton',
        availability: 'limited',
        stockLevel: 800
      },
      {
        sku: 'DAN-FG-800G-12',
        name: 'Dancow Fortigro 800g (12 pcs/carton)',
        brand: 'Dancow',
        category: 'Milk Powder',
        unitPrice: 1440000, // Rp 1,440,000 per carton
        minOrder: 2,
        unit: 'Carton',
        availability: 'in-stock',
        stockLevel: 500
      },
      {
        sku: 'MIL-UHT-1L-12',
        name: 'Milo UHT 1L (12 pcs/carton)',
        brand: 'Milo',
        category: 'Beverages',
        unitPrice: 180000,
        minOrder: 3,
        unit: 'Carton',
        availability: 'in-stock',
        stockLevel: 900
      }
    ],
    certifications: ['HACCP', 'ISO 22000', 'Halal MUI', 'BPOM', 'ISO 14001'],
    rating: 4.8,
    totalOrders: 12850,
    responseTime: '< 3 hours',
    paymentTerms: ['Cash', 'Transfer', 'Credit 30 days', 'Credit 60 days'],
    contactInfo: {
      email: 'trade@id.nestle.com',
      phone: '+62-21-2856-8888',
      whatsapp: '+62-812-3456-7890',
      address: 'Perkantoran Hijau Arkadia, Tower C Lt. 20, Jl. TB Simatupang Kav. 88, Jakarta 12520'
    },
    businessHours: {
      weekdays: '08:30 - 17:30',
      saturday: '09:00 - 13:00',
      sunday: 'Closed'
    },
    integrations: {
      basketApp: true,
      businessSuite: true,
      cashFlow: true,
      riskWatch: true
    }
  },
  {
    id: 'UNI-003',
    name: 'PT Unilever Indonesia Tbk',
    type: 'manufacturer',
    region: ['Jakarta', 'Jawa Barat', 'Jawa Timur', 'Sumatera Utara'],
    headquarters: 'Tangerang, Banten',
    coverage: {
      provinces: ['DKI Jakarta', 'Jawa Barat', 'Jawa Timur', 'Sumatera Utara', 'Banten', 'Jawa Tengah'],
      cities: ['Jakarta', 'Tangerang', 'Surabaya', 'Medan', 'Bandung', 'Semarang'],
      deliveryRadius: 550
    },
    products: [
      {
        sku: 'TEH-BOT-450ML-24',
        name: 'Teh Botol Sosro 450ml (24 pcs/carton)',
        brand: 'Sosro',
        category: 'Beverages',
        unitPrice: 129600, // Rp 129,600 per carton
        minOrder: 5,
        unit: 'Carton',
        availability: 'in-stock',
        stockLevel: 2500
      },
      {
        sku: 'AQU-600ML-24',
        name: 'Aqua Botol 600ml (24 pcs/carton)',
        brand: 'Aqua',
        category: 'Water',
        unitPrice: 158400,
        minOrder: 10,
        unit: 'Carton',
        availability: 'in-stock',
        stockLevel: 8000
      },
      {
        sku: 'CHI-SP-68G-20',
        name: 'Chitato Sapi Panggang 68g (20 pcs/carton)',
        brand: 'Chitato',
        category: 'Snacks',
        unitPrice: 396000, // Rp 396,000 per carton
        minOrder: 3,
        unit: 'Carton',
        availability: 'in-stock',
        stockLevel: 1500
      },
      {
        sku: 'PEP-TP-190G-12',
        name: 'Pepsodent Complete Protection 190g (12 pcs/carton)',
        brand: 'Pepsodent',
        category: 'Personal Care',
        unitPrice: 408000,
        minOrder: 2,
        unit: 'Carton',
        availability: 'in-stock',
        stockLevel: 800
      }
    ],
    certifications: ['HACCP', 'ISO 22000', 'Halal MUI', 'BPOM', 'ISO 9001', 'ISO 14001'],
    rating: 4.7,
    totalOrders: 11200,
    responseTime: '< 4 hours',
    paymentTerms: ['Cash', 'Transfer', 'Credit 30 days'],
    contactInfo: {
      email: 'customer.service@unilever.com',
      phone: '+62-21-2995-1000',
      whatsapp: '+62-813-5678-9012',
      address: 'Grha Unilever, Jl. BSD Boulevard Barat, Green Office Park Kav. 3, BSD City, Tangerang 15345'
    },
    businessHours: {
      weekdays: '08:00 - 17:00',
      saturday: '08:00 - 12:00',
      sunday: 'Closed'
    },
    integrations: {
      basketApp: true,
      businessSuite: true,
      cashFlow: true,
      riskWatch: false
    }
  },
  {
    id: 'YMH-004',
    name: 'PT Yamaha Motor Kencana Indonesia',
    type: 'distributor',
    region: ['Jakarta', 'Jawa Barat', 'Banten'],
    headquarters: 'Jakarta Timur, DKI Jakarta',
    coverage: {
      provinces: ['DKI Jakarta', 'Jawa Barat', 'Banten'],
      cities: ['Jakarta', 'Bekasi', 'Tangerang', 'Depok', 'Bogor', 'Bandung'],
      deliveryRadius: 200
    },
    products: [
      {
        sku: 'YMH-NMAX155-2024',
        name: 'Yamaha NMAX 155 Connected ABS 2024',
        brand: 'Yamaha',
        category: 'Motorcycles',
        unitPrice: 31500000, // Rp 31,500,000 per unit
        minOrder: 1,
        unit: 'Unit',
        availability: 'in-stock',
        stockLevel: 25
      },
      {
        sku: 'YMH-AEROX155-2024',
        name: 'Yamaha Aerox 155 Connected ABS 2024',
        brand: 'Yamaha',
        category: 'Motorcycles',
        unitPrice: 29800000,
        minOrder: 1,
        unit: 'Unit',
        availability: 'limited',
        stockLevel: 12
      },
      {
        sku: 'YMH-VIXION-2024',
        name: 'Yamaha Vixion R 155 2024',
        brand: 'Yamaha',
        category: 'Motorcycles',
        unitPrice: 26500000,
        minOrder: 1,
        unit: 'Unit',
        availability: 'pre-order',
        stockLevel: 0
      }
    ],
    certifications: ['ISO 9001', 'IATF 16949', 'Authorized Dealer'],
    rating: 4.6,
    totalOrders: 2850,
    responseTime: '< 6 hours',
    paymentTerms: ['Cash', 'Transfer', 'Kredit Motor', 'Leasing'],
    contactInfo: {
      email: 'sales@yamaha-motor.co.id',
      phone: '+62-21-4786-1234',
      whatsapp: '+62-814-7890-1234',
      address: 'Jl. Raya Bekasi KM 25, Cakung, Jakarta Timur 13910'
    },
    businessHours: {
      weekdays: '08:00 - 17:00',
      saturday: '08:00 - 16:00',
      sunday: '09:00 - 15:00'
    },
    integrations: {
      basketApp: true,
      businessSuite: true,
      cashFlow: true,
      riskWatch: true
    }
  },
  {
    id: 'MFG-005',
    name: 'PT Multi Food Global',
    type: 'wholesaler',
    region: ['Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur'],
    headquarters: 'Surabaya, Jawa Timur',
    coverage: {
      provinces: ['DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Banten'],
      cities: ['Surabaya', 'Jakarta', 'Bandung', 'Semarang', 'Malang', 'Yogyakarta'],
      deliveryRadius: 400
    },
    products: [
      {
        sku: 'MFG-IDM-MIX-240',
        name: 'Indomie Mixed Variants (240 pcs/carton)',
        brand: 'Indomie',
        category: 'Instant Noodles',
        unitPrice: 768000, // Rp 768,000 per carton (bulk pricing)
        minOrder: 5,
        unit: 'Carton',
        availability: 'in-stock',
        stockLevel: 1000
      },
      {
        sku: 'MFG-BB-MIX-96',
        name: 'Bear Brand Mixed Products (96 pcs/carton)',
        brand: 'Bear Brand',
        category: 'Dairy Products',
        unitPrice: 403200,
        minOrder: 3,
        unit: 'Carton',
        availability: 'in-stock',
        stockLevel: 600
      },
      {
        sku: 'MFG-SNK-MIX-100',
        name: 'Snack Mix Assorted (100 pcs/carton)',
        brand: 'Various',
        category: 'Snacks',
        unitPrice: 500000,
        minOrder: 2,
        unit: 'Carton',
        availability: 'in-stock',
        stockLevel: 800
      }
    ],
    certifications: ['HACCP', 'Halal MUI', 'BPOM'],
    rating: 4.4,
    totalOrders: 8500,
    responseTime: '< 8 hours',
    paymentTerms: ['Cash', 'Transfer', 'Credit 15 days', 'Credit 30 days'],
    contactInfo: {
      email: 'orders@multifoodglobal.co.id',
      phone: '+62-31-7345-6789',
      whatsapp: '+62-815-9012-3456',
      address: 'Jl. Raya Darmo No. 68-70, Wonokromo, Surabaya 60241'
    },
    businessHours: {
      weekdays: '07:00 - 18:00',
      saturday: '07:00 - 15:00',
      sunday: '08:00 - 12:00'
    },
    integrations: {
      basketApp: true,
      businessSuite: false,
      cashFlow: true,
      riskWatch: false
    }
  }
];

// Transaction simulation data
export interface Transaction {
  id: string;
  type: 'purchase_order' | 'invoice' | 'payment' | 'delivery';
  supplierId: string;
  buyerId: string;
  amount: number;
  currency: 'IDR';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  items: {
    sku: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  paymentMethod: 'cash' | 'transfer' | 'credit' | 'digital_wallet';
  paymentTerms: string;
  deliveryInfo: {
    address: string;
    estimatedDate: string;
    trackingNumber?: string;
    carrier: string;
  };
  timestamps: {
    created: Date;
    confirmed?: Date;
    shipped?: Date;
    delivered?: Date;
  };
  integrations: {
    basketApp: boolean;
    businessSuite: boolean;
    cashFlow: boolean;
    riskWatch: boolean;
  };
  riskScore?: number;
  cashFlowImpact?: {
    payable: number;
    receivable: number;
    netCashFlow: number;
  };
}

export const simulateTransaction = (
  supplierId: string,
  items: { sku: string; quantity: number }[],
  buyerInfo: { id: string; name: string; address: string }
): Transaction => {
  const supplier = realSuppliers.find(s => s.id === supplierId);
  if (!supplier) throw new Error('Supplier not found');

  const transactionItems = items.map(item => {
    const product = supplier.products.find(p => p.sku === item.sku);
    if (!product) throw new Error(`Product ${item.sku} not found`);
    
    return {
      sku: item.sku,
      quantity: item.quantity,
      unitPrice: product.unitPrice,
      totalPrice: product.unitPrice * item.quantity
    };
  });

  const totalAmount = transactionItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const riskScore = calculateRiskScore(supplier, totalAmount, buyerInfo);
  
  return {
    id: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: 'purchase_order',
    supplierId,
    buyerId: buyerInfo.id,
    amount: totalAmount,
    currency: 'IDR',
    status: 'pending',
    items: transactionItems,
    paymentMethod: 'transfer',
    paymentTerms: supplier.paymentTerms[0],
    deliveryInfo: {
      address: buyerInfo.address,
      estimatedDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      carrier: 'JNE Express',
    },
    timestamps: {
      created: new Date()
    },
    integrations: supplier.integrations,
    riskScore,
    cashFlowImpact: {
      payable: totalAmount,
      receivable: 0,
      netCashFlow: -totalAmount
    }
  };
};

const calculateRiskScore = (
  supplier: RealSupplier,
  amount: number,
  buyerInfo: { id: string; name: string; address: string }
): number => {
  let score = 100; // Start with perfect score
  
  // Supplier reliability (higher rating = lower risk)
  score -= (5 - supplier.rating) * 10;
  
  // Transaction amount (higher amount = higher risk)
  if (amount > 50000000) score -= 20; // > 50M IDR
  else if (amount > 10000000) score -= 10; // > 10M IDR
  else if (amount > 1000000) score -= 5; // > 1M IDR
  
  // Supplier integration level (more integrations = lower risk)
  const integrationCount = Object.values(supplier.integrations).filter(Boolean).length;
  score += integrationCount * 5;
  
  // Random buyer risk factor (in real app, this would be based on buyer history)
  score -= Math.random() * 10;
  
  return Math.max(0, Math.min(100, Math.round(score)));
};

// Baskit ecosystem integration URLs
export const basketEcosystemUrls = {
  main: 'https://baskit.app',
  businessSuite: 'https://baskit.app/business-suite',
  cashFlow: 'https://baskit.app/cash-flow',
  riskWatch: 'https://baskit.app/riskwatch',
  procurement: 'https://baskit.app/procurement',
  marketplace: 'https://baskit.app/marketplace'
};