import { Supplier, ProcurementItem } from '../types';

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'PT Indofood Distributor Jakarta',
    rating: 4.8,
    isAiRecommended: true,
    aiReason: 'Perfect match for instant noodles with fastest delivery (1-2 days), best pricing, and 100% item availability. Specialized Indomie distributor with excellent track record.',
    coverageItems: ['Instant Noodles', 'Snacks', 'Beverages'],
    estimatedPrice: 2850000, // Rp 2,850,000
    leadTime: '1-2 days',
    location: 'Jakarta Selatan, DKI Jakarta',
    detailedAddress: 'Jl. Sudirman Kav. 25, Karet Semanggi, Setiabudi, Jakarta Selatan 12920',
    certifications: ['HACCP', 'ISO 22000', 'Halal MUI'],
    contactEmail: 'orders@indofooddist.co.id',
    phone: '+62-21-555-1001',
    logo: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    companyImage: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop'
  },
  {
    id: '2',
    name: 'CV Nestle Partner Indonesia',
    rating: 4.7,
    isAiRecommended: true,
    aiReason: 'Top choice for dairy products with authorized Bear Brand distribution, premium cold chain logistics, and competitive bulk pricing. Excellent for mixed FMCG orders.',
    coverageItems: ['Dairy Products', 'Beverages', 'Instant Noodles'],
    estimatedPrice: 3200000, // Rp 3,200,000
    leadTime: '2-3 days',
    location: 'Bandung, Jawa Barat',
    detailedAddress: 'Jl. Asia Afrika No. 133-137, Babakan Ciamis, Sumur Bandung, Bandung 40117',
    certifications: ['HACCP', 'ISO 22000', 'Halal MUI', 'BPOM'],
    contactEmail: 'sales@nestlepartner.co.id',
    phone: '+62-22-555-2002',
    logo: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    companyImage: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop'
  },
  {
    id: '3',
    name: 'PT Multi FMCG Supplies',
    rating: 4.5,
    isAiRecommended: false, // Changed to false - no longer AI recommended
    coverageItems: ['Instant Noodles', 'Dairy Products', 'Snacks', 'Personal Care'],
    estimatedPrice: 3100000, // Rp 3,100,000
    leadTime: '2-4 days',
    location: 'Surabaya, Jawa Timur',
    detailedAddress: 'Jl. Raya Darmo No. 68-70, Wonokromo, Surabaya, Jawa Timur 60241',
    certifications: ['HACCP', 'ISO 22000', 'Halal MUI'],
    contactEmail: 'procurement@multifmcg.co.id',
    phone: '+62-31-555-3003',
    logo: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    companyImage: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop'
  },
  {
    id: '4',
    name: 'PT Yamaha Motor Distributor',
    rating: 4.6,
    isAiRecommended: false,
    coverageItems: ['Motorcycles', 'Automotive Parts', 'Accessories'],
    estimatedPrice: 18500000, // Rp 18,500,000
    leadTime: '7-14 days',
    location: 'Tangerang, Banten',
    detailedAddress: 'Jl. Raya Serpong KM 8, Pakulonan, Serpong Utara, Tangerang Selatan 15325',
    certifications: ['ISO 9001', 'IATF 16949'],
    contactEmail: 'sales@yamahamotor.co.id',
    phone: '+62-21-555-4004',
    logo: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    companyImage: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop'
  },
  {
    id: '5',
    name: 'PT Honda Motor Indonesia',
    rating: 4.4,
    isAiRecommended: false,
    coverageItems: ['Motorcycles', 'Automotive Parts', 'Service Equipment'],
    estimatedPrice: 19200000, // Rp 19,200,000
    leadTime: '10-21 days',
    location: 'Jakarta Timur, DKI Jakarta',
    detailedAddress: 'Jl. Laksda Yos Sudarso, Sunter I, Tanjung Priok, Jakarta Utara 14350',
    certifications: ['ISO 9001', 'IATF 16949', 'ISO 14001'],
    contactEmail: 'dealer@hondamotor.co.id',
    phone: '+62-21-555-5005',
    logo: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    companyImage: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop'
  },
  {
    id: '6',
    name: 'CV Indomie Specialist',
    rating: 4.9,
    isAiRecommended: false, // Changed to false - no longer AI recommended
    coverageItems: ['Instant Noodles'],
    estimatedPrice: 1200000, // Rp 1,200,000
    leadTime: '1 day',
    location: 'Jakarta Pusat, DKI Jakarta',
    detailedAddress: 'Jl. MH Thamrin No. 1, Menteng, Jakarta Pusat 10310',
    certifications: ['HACCP', 'Halal MUI'],
    contactEmail: 'express@indomiespec.co.id',
    phone: '+62-21-555-6006',
    logo: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    companyImage: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop'
  }
];

export const mockSalesOrderItems: Record<string, ProcurementItem[]> = {
  'SO-2024-001': [
    { id: '1', productName: 'Indomie Goreng', quantity: 100, targetPrice: 3500, unit: 'Carton' }, // Rp 3,500 per carton
    { id: '2', productName: 'Bear Brand Susu Steril', quantity: 50, targetPrice: 45000, unit: 'Carton' }, // Rp 45,000 per carton
    { id: '3', productName: 'Teh Botol Sosro', quantity: 30, targetPrice: 28000, unit: 'Carton' } // Rp 28,000 per carton
  ],
  'SO-2024-002': [
    { id: '4', productName: 'Aqua Botol 600ml', quantity: 80, targetPrice: 35000, unit: 'Carton' }, // Rp 35,000 per carton
    { id: '5', productName: 'Indomie Soto Ayam', quantity: 60, targetPrice: 3500, unit: 'Carton' }, // Rp 3,500 per carton
    { id: '6', productName: 'Dancow Fortigro', quantity: 25, targetPrice: 125000, unit: 'Carton' }, // Rp 125,000 per carton
    { id: '7', productName: 'Chitato Sapi Panggang', quantity: 40, targetPrice: 85000, unit: 'Carton' } // Rp 85,000 per carton
  ],
  'SO-2024-003': [
    { id: '8', productName: 'Yamaha NMAX 155', quantity: 2, targetPrice: 32500000, unit: 'Pieces (Pcs)' }, // Rp 32,500,000 per unit
    { id: '9', productName: 'Indomie Ayam Bawang', quantity: 200, targetPrice: 3500, unit: 'Carton' }, // Rp 3,500 per carton
    { id: '10', productName: 'Bear Brand Gold White Tea', quantity: 30, targetPrice: 48000, unit: 'Carton' } // Rp 48,000 per carton
  ]
};