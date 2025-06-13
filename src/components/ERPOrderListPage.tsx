import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Download, Plus, MoreHorizontal, Eye, Edit, 
  Trash2, Calendar, Package, Truck, CheckCircle, Clock, 
  AlertCircle, X, ChevronDown, ArrowUpDown, RefreshCw,
  FileText, Mail, Phone, MapPin, Star, Building2
} from 'lucide-react';

interface OrderItem {
  id: string;
  idProduk: string;
  productName: string;
  namaProduk: string;
  quantity: number;
  kuantitasTersedia: number;
  kuantitasOperasi: number;
  unitPrice: number;
  hargaJualUnit: number;
  hargaBeliUnit: number;
  totalPrice: number;
  unit: string;
  akunPO: string;
  pajak: string;
}

interface PurchaseOrder {
  id: string;
  poNumber: string;
  salesOrderId?: string;
  supplierName: string;
  supplierEmail: string;
  supplierPhone: string;
  supplierAddress: string;
  supplierRating: number;
  supplierLocation: string;
  orderDate: string;
  deliveryDate: string;
  status: 'Draft' | 'Sent' | 'Confirmed' | 'In Transit' | 'Delivered' | 'Cancelled';
  totalAmount: number;
  subTotal: number;
  biayaPengiriman: number;
  pembulatan: number;
  pajak: number;
  items: OrderItem[];
  notes?: string;
  catatan: string;
  createdBy: string;
  createdByEmail: string;
  lastUpdated: string;
  kategoriSeller: string;
  tipePengiriman: string;
  estimasiPengiriman: string;
  alamatPengiriman: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  kodePos: string;
}

const mockOrders: PurchaseOrder[] = [
  {
    id: '1',
    poNumber: 'PO-2024-001',
    salesOrderId: 'SO-2024-001',
    supplierName: 'PT Indofood Distributor Jakarta',
    supplierEmail: 'orders@indofooddist.co.id',
    supplierPhone: '+62-21-555-1001',
    supplierAddress: 'Jl. Sudirman Kav. 25, Jakarta Selatan',
    supplierRating: 4.8,
    supplierLocation: 'Jakarta Selatan, DKI Jakarta',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-17',
    status: 'Delivered',
    totalAmount: 350000,
    subTotal: 320000,
    biayaPengiriman: 25000,
    pembulatan: 0,
    pajak: 35200,
    items: [
      { 
        id: '1', 
        idProduk: '001-1001',
        productName: 'Indomie Goreng', 
        namaProduk: 'Indomie Goreng',
        quantity: 100, 
        kuantitasTersedia: 100,
        kuantitasOperasi: 100,
        unitPrice: 3200, 
        hargaJualUnit: 3200,
        hargaBeliUnit: 2560,
        totalPrice: 320000, 
        unit: 'Carton',
        akunPO: '313 - Cost of Sales',
        pajak: 'PPN 11%'
      }
    ],
    catatan: 'PO dibuat melalui Baskit untuk supplier PT Indofood Distributor Jakarta. Berdasarkan Sales Order: SO-2024-001',
    createdBy: 'John Doe',
    createdByEmail: 'john@company.com',
    lastUpdated: '2024-01-17 14:30',
    kategoriSeller: 'FMCG',
    tipePengiriman: 'Kirim Ke Gudang',
    estimasiPengiriman: '1-2 days',
    alamatPengiriman: 'Jl. Sudirman Kav. 25, Jakarta Selatan',
    provinsi: 'DKI Jakarta',
    kota: 'Jakarta Selatan',
    kecamatan: 'Setiabudi',
    kodePos: '12920'
  }
];

export const ERPOrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<PurchaseOrder[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('orderDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Add new order from Baskit with comprehensive prefilled data
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const prefillData = urlParams.get('prefillData');
    
    if (prefillData) {
      try {
        const orderData = JSON.parse(decodeURIComponent(prefillData));
        console.log('📋 Received prefilled order data:', orderData);
        
        const newOrder: PurchaseOrder = {
          id: Date.now().toString(),
          poNumber: orderData.poNumber || `PO-2024-${String(orders.length + 1).padStart(3, '0')}`,
          salesOrderId: orderData.salesOrderId || '',
          
          // Supplier info (prefilled)
          supplierName: orderData.supplierName,
          supplierEmail: orderData.supplierEmail,
          supplierPhone: orderData.supplierPhone,
          supplierAddress: orderData.supplierAddress,
          supplierRating: orderData.supplierRating,
          supplierLocation: orderData.supplierLocation,
          
          // Order dates
          orderDate: orderData.orderDate,
          deliveryDate: orderData.deliveryDate,
          status: orderData.status || 'Sent',
          
          // Financial data (prefilled)
          totalAmount: orderData.totalAmount,
          subTotal: orderData.subTotal,
          biayaPengiriman: orderData.biayaPengiriman,
          pembulatan: orderData.pembulatan,
          pajak: orderData.pajak,
          
          // Items (prefilled with comprehensive data)
          items: orderData.items || [],
          
          // Additional ERP fields (prefilled)
          catatan: orderData.catatan,
          createdBy: orderData.createdBy,
          createdByEmail: orderData.createdByEmail,
          lastUpdated: new Date().toLocaleString('id-ID'),
          kategoriSeller: orderData.kategoriSeller,
          tipePengiriman: orderData.tipePengiriman,
          estimasiPengiriman: orderData.estimasiPengiriman,
          
          // Delivery address (prefilled)
          alamatPengiriman: orderData.alamatPengiriman,
          provinsi: orderData.provinsi,
          kota: orderData.kota,
          kecamatan: orderData.kecamatan,
          kodePos: orderData.kodePos
        };
        
        console.log('✅ Created new order with prefilled data:', newOrder);
        setOrders(prev => [newOrder, ...prev]);
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Show success message
        setTimeout(() => {
          alert(`✅ Purchase Order ${newOrder.poNumber} berhasil dibuat!\n\n` +
                `Supplier: ${newOrder.supplierName}\n` +
                `Items: ${newOrder.items.length} produk\n` +
                `Total: Rp${newOrder.totalAmount.toLocaleString()}\n` +
                `${newOrder.salesOrderId ? `Sales Order: ${newOrder.salesOrderId}` : 'Procurement langsung dari Baskit'}`);
        }, 500);
        
      } catch (error) {
        console.error('Error parsing prefilled order data:', error);
      }
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Confirmed': return 'bg-yellow-100 text-yellow-800';
      case 'In Transit': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Draft': return <Edit className="h-4 w-4" />;
      case 'Sent': return <Mail className="h-4 w-4" />;
      case 'Confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'In Transit': return <Truck className="h-4 w-4" />;
      case 'Delivered': return <Package className="h-4 w-4" />;
      case 'Cancelled': return <X className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (order.salesOrderId && order.salesOrderId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchesDate = dateFilter === 'All' || 
                       (dateFilter === 'Today' && order.orderDate === new Date().toISOString().split('T')[0]) ||
                       (dateFilter === 'This Week' && new Date(order.orderDate) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
                       (dateFilter === 'This Month' && new Date(order.orderDate).getMonth() === new Date().getMonth());
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let aValue: any = a[sortBy as keyof PurchaseOrder];
    let bValue: any = b[sortBy as keyof PurchaseOrder];
    
    if (sortBy === 'orderDate' || sortBy === 'deliveryDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === sortedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(sortedOrders.map(order => order.id));
    }
  };

  const handleViewOrder = (order: PurchaseOrder) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-[#085B59]" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">ERP System</h1>
                <p className="text-sm text-gray-600">Purchase Order Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-[#FF8B00] text-white px-4 py-2 rounded-lg hover:bg-[#e67a00] transition-colors font-medium flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                New PO
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Purchase Orders</h2>
              <p className="text-gray-600 mt-1">Manage and track all purchase orders</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <RefreshCw className="h-4 w-4" />
              <span>Last updated: {new Date().toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by PO number, supplier, or SO..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8B00] focus:border-[#FF8B00] outline-none"
                >
                  <option value="All">All Dates</option>
                  <option value="Today">Today</option>
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                </select>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Transit</p>
                <p className="text-2xl font-bold text-purple-600">
                  {orders.filter(o => o.status === 'In Transit').length}
                </p>
              </div>
              <Truck className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'Delivered').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-[#085B59]">
                  Rp{orders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString()}
                </p>
              </div>
              <Package className="h-8 w-8 text-[#085B59]" />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Purchase Orders ({sortedOrders.length})
              </h3>
              {selectedOrders.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {selectedOrders.length} selected
                  </span>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === sortedOrders.length && sortedOrders.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-[#FF8B00] focus:ring-[#FF8B00]"
                    />
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('poNumber')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>PO Number</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('supplierName')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Supplier</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales Order
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('orderDate')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Order Date</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('deliveryDate')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Delivery Date</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('totalAmount')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Total Amount</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="rounded border-gray-300 text-[#FF8B00] focus:ring-[#FF8B00]"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{order.poNumber}</div>
                      <div className="text-sm text-gray-500">by {order.createdBy}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-medium text-gray-900">{order.supplierName}</div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span>{order.supplierRating}</span>
                            <span>• {order.supplierLocation}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.salesOrderId ? (
                        <div className="text-sm">
                          <div className="font-medium text-blue-600">{order.salesOrderId}</div>
                          <div className="text-gray-500">From Baskit</div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-400">Direct PO</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.orderDate).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.deliveryDate).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Rp{order.totalAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.items.length} items
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-[#085B59] hover:text-[#074e4c] flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Purchase Order Details - {selectedOrder.poNumber}
                {selectedOrder.salesOrderId && (
                  <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    SO: {selectedOrder.salesOrderId}
                  </span>
                )}
              </h2>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Order Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">PO Number:</span>
                      <span className="font-medium">{selectedOrder.poNumber}</span>
                    </div>
                    {selectedOrder.salesOrderId && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sales Order:</span>
                        <span className="font-medium text-blue-600">{selectedOrder.salesOrderId}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-medium">{new Date(selectedOrder.orderDate).toLocaleDateString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Date:</span>
                      <span className="font-medium">{new Date(selectedOrder.deliveryDate).toLocaleDateString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        <span className="ml-1">{selectedOrder.status}</span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{selectedOrder.kategoriSeller}</span>
                    </div>
                  </div>
                </div>

                {/* Supplier Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Supplier Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{selectedOrder.supplierName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{selectedOrder.supplierEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{selectedOrder.supplierPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">{selectedOrder.supplierRating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{selectedOrder.supplierLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Time:</span>
                      <span className="font-medium">{selectedOrder.estimasiPengiriman}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Delivery Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span className="font-medium">{selectedOrder.tipePengiriman}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Address:</span>
                      <span className="font-medium">{selectedOrder.alamatPengiriman}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Province:</span>
                      <span className="font-medium">{selectedOrder.provinsi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">City:</span>
                      <span className="font-medium">{selectedOrder.kota}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">District:</span>
                      <span className="font-medium">{selectedOrder.kecamatan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Postal Code:</span>
                      <span className="font-medium">{selectedOrder.kodePos}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID Produk</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Product Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Quantity</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Unit Price</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Account</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tax</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.idProduk}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.productName}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.quantity} {item.unit}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">Rp{item.unitPrice.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">Rp{item.totalPrice.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{item.akunPO}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{item.pajak}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Financial Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sub Total:</span>
                      <span className="font-medium">Rp{selectedOrder.subTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping Cost:</span>
                      <span className="font-medium">Rp{selectedOrder.biayaPengiriman.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (PPN 11%):</span>
                      <span className="font-medium">Rp{selectedOrder.pajak.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rounding:</span>
                      <span className="font-medium">Rp{selectedOrder.pembulatan.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#085B59] text-white p-4 rounded-lg">
                      <div className="text-right">
                        <div className="text-sm opacity-90">Total Amount</div>
                        <div className="text-2xl font-bold">Rp{selectedOrder.totalAmount.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.catatan && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">{selectedOrder.catatan}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowOrderDetails(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
              <button className="bg-[#FF8B00] text-white px-6 py-2 rounded-lg hover:bg-[#e67a00] transition-colors font-medium">
                Edit Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};