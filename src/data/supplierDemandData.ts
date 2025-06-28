import { DistributorDemand, SupplierQuote } from '../types';

// Mock distributor demand data that suppliers can see
export const mockDistributorDemands: DistributorDemand[] = [
  {
    id: 'DEM-001',
    distributorId: 'DIST-001',
    distributorName: 'PT Jakarta Distribution Center',
    distributorEmail: 'procurement@jakartadist.co.id',
    distributorPhone: '+62-21-555-4001',
    distributorRegion: 'DKI Jakarta',
    distributorRating: 4.8,
    items: [
      {
        id: '1',
        productName: 'Indomie Goreng',
        quantity: 500,
        targetPrice: 3200,
        unit: 'Carton'
      },
      {
        id: '2',
        productName: 'Indomie Soto Ayam',
        quantity: 300,
        targetPrice: 3200,
        unit: 'Carton'
      }
    ],
    deliveryPreferences: {
      location: 'Jakarta Selatan, DKI Jakarta',
      preferredLeadTime: '1-3 days'
    },
    urgency: 'high',
    budget: 2560000, // Rp 2,560,000
    requestedAt: new Date('2024-03-15T09:30:00'),
    expiresAt: new Date('2024-03-20T17:00:00'),
    status: 'open',
    quotesReceived: 3,
    description: 'Urgent restock needed for retail chain. Prefer suppliers with HACCP certification.',
    preferredSupplierTypes: ['manufacturer', 'authorized distributor']
  },
  {
    id: 'DEM-002',
    distributorId: 'DIST-002',
    distributorName: 'CV Bandung Supply Chain',
    distributorEmail: 'ops@bandungsupply.co.id',
    distributorPhone: '+62-22-555-4002',
    distributorRegion: 'Jawa Barat',
    distributorRating: 4.6,
    items: [
      {
        id: '3',
        productName: 'Bear Brand Susu Steril',
        quantity: 200,
        targetPrice: 42000,
        unit: 'Carton'
      },
      {
        id: '4',
        productName: 'Bear Brand Gold White Tea',
        quantity: 100,
        targetPrice: 45000,
        unit: 'Carton'
      }
    ],
    deliveryPreferences: {
      location: 'Bandung, Jawa Barat',
      preferredLeadTime: '2-4 days'
    },
    urgency: 'medium',
    budget: 12900000, // Rp 12,900,000
    requestedAt: new Date('2024-03-14T14:20:00'),
    expiresAt: new Date('2024-03-25T17:00:00'),
    status: 'open',
    quotesReceived: 1,
    description: 'Regular monthly order for dairy products. Looking for competitive pricing and reliable delivery.',
    preferredSupplierTypes: ['manufacturer', 'wholesaler']
  },
  {
    id: 'DEM-003',
    distributorId: 'DIST-003',
    distributorName: 'PT Surabaya Logistics Hub',
    distributorEmail: 'purchasing@surabayahub.co.id',
    distributorPhone: '+62-31-555-4003',
    distributorRegion: 'Jawa Timur',
    distributorRating: 4.7,
    items: [
      {
        id: '5',
        productName: 'Yamaha NMAX 155',
        quantity: 5,
        targetPrice: 31500000,
        unit: 'Unit'
      }
    ],
    deliveryPreferences: {
      location: 'Surabaya, Jawa Timur',
      preferredLeadTime: '7-14 days'
    },
    urgency: 'low',
    budget: 157500000, // Rp 157,500,000
    requestedAt: new Date('2024-03-12T11:15:00'),
    expiresAt: new Date('2024-04-12T17:00:00'),
    status: 'quoted',
    quotesReceived: 2,
    description: 'Bulk order for motorcycle dealership expansion. Need authorized dealer pricing.',
    preferredSupplierTypes: ['authorized dealer', 'manufacturer']
  },
  {
    id: 'DEM-004',
    distributorId: 'DIST-004',
    distributorName: 'CV Multi Product Jaya',
    distributorEmail: 'procurement@multiprod.co.id',
    distributorPhone: '+62-21-555-5004',
    distributorRegion: 'DKI Jakarta',
    distributorRating: 4.4,
    items: [
      {
        id: '6',
        productName: 'Teh Botol Sosro',
        quantity: 150,
        targetPrice: 26000,
        unit: 'Carton'
      },
      {
        id: '7',
        productName: 'Aqua Botol 600ml',
        quantity: 200,
        targetPrice: 33000,
        unit: 'Carton'
      },
      {
        id: '8',
        productName: 'Chitato Sapi Panggang',
        quantity: 80,
        targetPrice: 82000,
        unit: 'Carton'
      }
    ],
    deliveryPreferences: {
      location: 'Jakarta Timur, DKI Jakarta',
      preferredLeadTime: '2-5 days'
    },
    urgency: 'medium',
    budget: 16460000, // Rp 16,460,000
    requestedAt: new Date('2024-03-13T16:45:00'),
    expiresAt: new Date('2024-03-28T17:00:00'),
    status: 'open',
    quotesReceived: 4,
    description: 'Mixed FMCG order for convenience store chain. Prefer bundled pricing.',
    preferredSupplierTypes: ['wholesaler', 'distributor']
  },
  {
    id: 'DEM-005',
    distributorId: 'DIST-005',
    distributorName: 'PT Medan Food Distribution',
    distributorEmail: 'orders@medanfood.co.id',
    distributorPhone: '+62-61-555-6005',
    distributorRegion: 'Sumatera Utara',
    distributorRating: 4.5,
    items: [
      {
        id: '9',
        productName: 'Indomie Ayam Bawang',
        quantity: 400,
        targetPrice: 3300,
        unit: 'Carton'
      },
      {
        id: '10',
        productName: 'Dancow Fortigro',
        quantity: 50,
        targetPrice: 120000,
        unit: 'Carton'
      }
    ],
    deliveryPreferences: {
      location: 'Medan, Sumatera Utara',
      preferredLeadTime: '3-7 days'
    },
    urgency: 'urgent',
    budget: 7320000, // Rp 7,320,000
    requestedAt: new Date('2024-03-16T08:00:00'),
    expiresAt: new Date('2024-03-18T17:00:00'),
    status: 'open',
    quotesReceived: 1,
    description: 'Emergency restock due to unexpected demand surge. Need immediate response.',
    preferredSupplierTypes: ['manufacturer', 'regional distributor']
  }
];

export const mockSupplierQuotes: SupplierQuote[] = [
  {
    id: 'QUO-001',
    demandId: 'DEM-001',
    supplierId: 'IDF-001',
    supplierName: 'PT Indofood CBP Sukses Makmur Tbk',
    items: [
      {
        productName: 'Indomie Goreng',
        quantity: 500,
        unitPrice: 3000,
        totalPrice: 1500000,
        availability: 'In Stock',
        leadTime: '1-2 days'
      },
      {
        productName: 'Indomie Soto Ayam',
        quantity: 300,
        unitPrice: 3000,
        totalPrice: 900000,
        availability: 'In Stock',
        leadTime: '1-2 days'
      }
    ],
    totalAmount: 2400000,
    deliveryTerms: 'FOB Jakarta, Free delivery within 50km',
    paymentTerms: 'Net 30 days',
    validUntil: new Date('2024-03-22T17:00:00'),
    notes: 'Bulk discount applied. HACCP certified facility.',
    status: 'pending',
    submittedAt: new Date('2024-03-15T11:30:00')
  }
];