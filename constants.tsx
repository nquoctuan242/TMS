import { PurchaseOrder } from "./types";

import { ShipmentData, HistoryEntry, InternalTransfer, ITRoute, Shipper, Ticket, TicketType, ScanTimeConfig, DailyCommission, PayrollPeriod } from './types';

export const MOCK_PAYROLL_PERIODS: PayrollPeriod[] = [
  {
    id: '1',
    versionName: 'Payroll Policy 2026',
    cycle: 'Weekly (Anchor: 2026-01-05)',
    effectiveTime: '01/01/2026, GMT+7 - 31/12/2026, GMT+7',
    appliedLocation: 'United States\nCalifornia'
  }
];

export const MOCK_DAILY_COMMISSIONS: DailyCommission[] = [
  { id: '1', date: '04/06/2026 (UTC-7)', payrollPeriod: '03/06/2026 - 16/06/2026 (UTC-7)', store: 'Circle K - Arizona', shipper: 'Maria Olala', deliveredOnlineOrders: 3, deliveredITOrders: 0, commission: 0.15, lateOrders: 3, invalidPODOrders: 0, startTime: '08:00', endTime: '17:00' },
  { id: '2', date: '04/06/2026 (UTC-7)', payrollPeriod: '29/05/2026 - 11/06/2026 (UTC-7)', store: 'SHOP-7903 S ATLANTIC AVE', shipper: 'Hieu Minh', deliveredOnlineOrders: 4, deliveredITOrders: 0, commission: 2, lateOrders: 3, invalidPODOrders: 0, startTime: '08:30', endTime: '18:00' },
  { id: '3', date: '03/06/2026 (UTC-7)', payrollPeriod: '03/06/2026 - 16/06/2026 (UTC-7)', store: 'Circle K - Arizona', shipper: 'Maria Olala', deliveredOnlineOrders: 4, deliveredITOrders: 0, commission: 1.35, lateOrders: 1, invalidPODOrders: 0, startTime: '09:00', endTime: '17:30' },
  { id: '4', date: '02/06/2026 (UTC-7)', payrollPeriod: '29/05/2026 - 11/06/2026 (UTC-7)', store: 'SHOP-7903 S ATLANTIC AVE', shipper: 'Hieu Minh', deliveredOnlineOrders: 5, deliveredITOrders: 0, commission: 2.5, lateOrders: 0, invalidPODOrders: 0, startTime: '08:00', endTime: '16:00' },
  { id: '5', date: '02/06/2026 (UTC-7)', payrollPeriod: '29/05/2026 - 11/06/2026 (UTC-7)', store: 'SHOP-7903 S ATLANTIC AVE', shipper: 'Tony Stark', deliveredOnlineOrders: 3, deliveredITOrders: 0, commission: 1.5, lateOrders: 0, invalidPODOrders: 0, startTime: '07:30', endTime: '15:30' },
  { id: '6', date: '01/06/2026 (UTC-7)', payrollPeriod: '29/05/2026 - 11/06/2026 (UTC-7)', store: 'SHOP-7903 S ATLANTIC AVE', shipper: 'Hoa Duong - Shipper', deliveredOnlineOrders: 6, deliveredITOrders: 0, commission: 3, lateOrders: 0, invalidPODOrders: 0, startTime: '08:15', endTime: '18:30' },
  { id: '7', date: '27/05/2026 (UTC-7)', payrollPeriod: '15/05/2026 - 28/05/2026 (UTC-7)', store: 'SHOP-7903 S ATLANTIC AVE', shipper: 'Tony Stark', deliveredOnlineOrders: 0, deliveredITOrders: 1, commission: 0.1, lateOrders: 0, invalidPODOrders: 0, startTime: '09:30', endTime: '17:00' },
  { id: '8', date: '25/05/2026 (UTC-7)', payrollPeriod: '15/05/2026 - 28/05/2026 (UTC-7)', store: 'SHOP-7903 S ATLANTIC AVE', shipper: 'Tony Stark', deliveredOnlineOrders: 9, deliveredITOrders: 0, commission: 4.5, lateOrders: 1, invalidPODOrders: 0, startTime: '08:00', endTime: '19:00' },
  { id: '9', date: '24/05/2026 (UTC-7)', payrollPeriod: '15/05/2026 - 28/05/2026 (UTC-7)', store: 'SHOP-7903 S ATLANTIC AVE', shipper: 'Trump', deliveredOnlineOrders: 0, deliveredITOrders: 1, commission: 0.1, lateOrders: 0, invalidPODOrders: 0, startTime: '08:45', endTime: '17:15' },
  { id: '10', date: '24/05/2026 (UTC-7)', payrollPeriod: '15/05/2026 - 28/05/2026 (UTC-7)', store: 'SHOP-7903 S ATLANTIC AVE', shipper: 'Tom', deliveredOnlineOrders: 5, deliveredITOrders: 0, commission: 2.5, lateOrders: 0, invalidPODOrders: 0, startTime: '07:00', endTime: '16:30' },
  { id: '11', date: '22/05/2026 (UTC-7)', payrollPeriod: '15/05/2026 - 28/05/2026 (UTC-7)', store: 'SHOP-7903 S ATLANTIC AVE', shipper: 'Tom', deliveredOnlineOrders: 2, deliveredITOrders: 0, commission: 1, lateOrders: 1, invalidPODOrders: 0, startTime: '09:00', endTime: '14:00' },
  { id: '12', date: '21/05/2026 (UTC-7)', payrollPeriod: '15/05/2026 - 28/05/2026 (UTC-7)', store: 'SHOP-7903 S ATLANTIC AVE', shipper: 'Tom', deliveredOnlineOrders: 1, deliveredITOrders: 0, commission: 0.5, lateOrders: 0, invalidPODOrders: 1, startTime: '10:00', endTime: '18:00' },
];

export const MOCK_SCAN_TIME_CONFIGS: ScanTimeConfig[] = [
  {
    id: '1',
    storeName: 'Store 123',
    storeId: '1',
    wardCity: 'Tan Binh',
    stateProvince: 'HCM',
    country: 'Vietnam',
    startTime: '08:00',
    endTime: '20:00',
    timezone: 'Asia/Ho_Chi_Minh',
    updatedAt: '03/06/2026 12:00:00'
  },
  {
    id: '2',
    storeName: '',
    wardCity: '',
    stateProvince: 'HCM',
    country: 'Vietnam',
    startTime: '07:30',
    endTime: '22:00',
    timezone: 'Asia/Ho_Chi_Minh',
    updatedAt: '03/06/2026 10:00:00'
  }
];

export const MOCK_TICKET_TYPES: TicketType[] = [
  {
    id: '1',
    name: 'Delivery Issue',
    code: 'DELIVERY',
    description: 'Issues related to shipment delivery',
    status: 'Active',
    country: 'Vietnam',
    explanationDeadlineDays: 1,
    maxExplanationCount: 2,
    violationPenaltyAmount: 5,
    currency: 'VND',
    createdAt: '01/01/2026 08:00:00'
  },
  {
    id: '2',
    name: 'Product Quality',
    code: 'PRODUCT',
    description: 'Issues related to product quality or damage',
    status: 'Active',
    country: 'Thailand',
    explanationDeadlineDays: 2,
    maxExplanationCount: 3,
    violationPenaltyAmount: 10,
    currency: 'THB',
    createdAt: '01/01/2026 08:00:00'
  }
];

export const MOCK_TICKETS: Ticket[] = [
  {
    id: '1',
    ticketCode: 'TK-001',
    ticketTypeId: '1',
    ticketType: 'Delivery Issue',
    shipperId: 'S-001',
    shipperName: 'Nguyen Van A',
    incidentReportDate: '03/04/2026',
    reason: 'Heavy rain',
    ticketRecord: 'Violation recorded',
    approvalDate: '03/04/2026',
    approvedBy: 'Admin',
    createdAt: '03/04/2026 09:00:00',
    createdBy: 'hungnk1',
    status: 'Approved',
    orderCode: '260107HMX9',
    
    explanationCode: 'EXP-001',
    explanationReason: 'Weather condition',
    explanationContent: 'Delayed due to heavy rain and flood.',
    explanationDate: '03/04/2026',
    clarificationDeadline: '04/04/2026',
    understandingStatus: 'Understood',

    priority: 'High',
    requester: 'hungnk1',
    assignee: 'Phuong Phan',
    description: 'Order 260107HMX9 is delayed due to heavy rain.',
    subject: 'Delayed Shipment',
    updatedAt: '03/04/2026 10:30:00'
  },
  {
    id: '2',
    ticketCode: 'TK-002',
    ticketTypeId: '2',
    ticketType: 'Product Quality',
    shipperId: 'S-002',
    shipperName: 'Tran Thi B',
    incidentReportDate: '03/04/2026',
    reason: 'Warehouse error',
    ticketRecord: 'Pending review',
    approvalDate: '-',
    approvedBy: '-',
    createdAt: '03/04/2026 11:15:00',
    createdBy: 'customer_service_1',
    status: 'Open',
    orderCode: '260303GCG4',

    explanationCode: 'EXP-002',
    explanationReason: 'Picking error',
    explanationContent: 'Wrong item picked by warehouse staff.',
    explanationDate: '03/04/2026',
    understandingStatus: 'Not Understood',

    priority: 'Medium',
    requester: 'customer_service_1',
    description: 'Customer reported receiving a different product than ordered.',
    subject: 'Wrong Item Received',
    updatedAt: '03/04/2026 11:15:00'
  }
];

export const MOCK_SHIPMENT: ShipmentData = {
  shipmentCode: 'S260107WAIU',
  orderCodes: ['260107HMX9'],
  customerCode: 'NOW_20250606121235',
  amount: 1.000,
  currency: 'USD',
  dimensions: '1.000x2.000x3.000',
  weight: 2.000,
  volume: 6.000,
  shippingCost: 0.000,
  carrierName: 'Hasaki Express',
  shipperName: '-',
  trackingNumber: 'S260107WAIU',
  statusDescription: 'Returning local hub',
  note: 'Testing return status',
  zone: 'Z3',
  senderAddress: 'Kho Hasaki - 71 Hoàng Hoa Thám, P.13, Q. Tân Bình, TP. HCM',
  receiverAddress: '123 Nguyễn Văn Cừ, P.2, Quận 5, TP. HCM',
  transitPoints: [
    { 
      name: 'Store 123', 
      location: '568 Lũy Bán Bích', 
      type: 'store',
      statusLabel: 'Returning'
    },
    { 
      name: 'Hub Q10', 
      location: '456 Tô Hiến Thành, Quận 10', 
      type: 'hub',
      statusLabel: 'Sorting'
    }
  ]
};

export const MOCK_HISTORY: HistoryEntry[] = [
  {
    status: 'Returning local hub',
    time: '23/04/2026 15:00:00',
    performedBy: 'Tuấn',
    note: 'Marked as returning local hub',
    carrierStatus: '',
  },
  {
    status: 'Waiting for Pickup',
    time: '07/01/2026 14:37:34',
    performedBy: 'hungnk1',
    note: 'Update shipment status',
    carrierStatus: '',
  },
  {
    status: 'Packed',
    time: '07/01/2026 14:37:34',
    performedBy: 'hungnk1',
    note: 'Update shipment status',
    carrierStatus: '',
  },
  {
    status: 'Dispatched',
    time: '07/01/2026 14:37:22',
    performedBy: 'hungnk1',
    note: 'Pushed to carrier, update shipment with carrier info',
    carrierStatus: '',
  },
  {
    status: 'New',
    time: '07/01/2026 14:37:18',
    performedBy: 'hungnk1',
    note: 'Create shipment',
    carrierStatus: '',
  }
];

export const MOCK_IT_ROUTES: ITRoute[] = [
  {
    id: '1',
    name: 'Route Tan Binh - District 10',
    code: 'RT-TB-D10',
    description: 'Daily internal transfer route for Tan Binh and District 10 stores',
    status: 'Active',
    assignedStores: ['1', '2'],
    assignedShippers: ['3'],
    createdAt: '01/03/2026 08:00:00'
  },
  {
    id: '2',
    name: 'Route District 1 - District 3',
    code: 'RT-D1-D3',
    description: 'Express route for central districts',
    status: 'Inactive',
    assignedStores: [],
    assignedShippers: [],
    createdAt: '28/02/2026 14:30:00'
  }
];

export const MOCK_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 'PO001',
    poCode: 'PO-2026-0001',
    customerOrderCode: 'CUST-PO-9912',
    customer: 'Tech Solutions Inc',
    supplier: 'Global Electronics Ltd',
    status: 'In Transit',
    createdAt: '2026-06-15',
    etd: '2026-06-20',
    eta: '2026-06-25',
    incoterms: 'FOB',
    serviceType: 'FCL / Ocean',
    commodity: 'Electronics parts',
    packages: '20 Pallets',
    grossWeight: '12500 KGS',
    volume: '28 CBM',
    placeOfReceipt: 'Shenzhen Warehouse A',
    placeOfDelivery: 'Los Angeles Hub',
    notes: '',
    paymentTerm: 'LC at Sight',
    orderType: 'Export',
    transportType: 'Sea',
    cargoReady: '15/3/2026',
    supplierDetails: {
      name: 'Global Textiles Ltd.',
      phone: '+84 91 234 5678',
      email: 'contact@globaltextiles.vn',
      street: '789 Fashion St',
      address: '789 Fashion St, Hanoi, VN',
      countryCode: 'VN',
      countryName: 'Vietnam',
      postalCode: '100000',
      addressType: 'Warehouse'
    },
    consigneeDetails: {
      name: 'Fashion Retailers EU',
      phone: '+49 40 123456',
      email: 'import@fashion-eu.de',
      street: '101 Mode Blvd',
      address: '101 Mode Blvd, Hamburg, DE',
      countryCode: 'DE',
      countryName: 'Germany',
      postalCode: '20095',
      addressType: 'Distribution Center'
    },
    items: [
      {
        code: 'PKG-001',
        name: 'Cotton T-Shirts',
        sku: 'TS-01',
        quantity: 4000,
        unit: 'Pieces',
        length: 60,
        width: 40,
        height: 40,
        weight: 1.5,
        volume: 4.0,
        retailPrice: 20,
        wholesalePrice: 8
      },
      {
        code: 'PKG-002',
        name: 'Denim Jeans',
        sku: 'DJ-02',
        quantity: 2500,
        unit: 'Pieces',
        length: 80,
        width: 50,
        height: 50,
        weight: 1.0,
        volume: 4.0,
        retailPrice: 50,
        wholesalePrice: 22
      }
    ]
  },
  {
    id: 'PO002',
    poCode: 'PO-2026-0002',
    customerOrderCode: 'CUST-PO-9913',
    customer: 'Home Decor Co',
    supplier: 'Woodwork Artisans',
    status: 'Processing',
    createdAt: '2026-06-18',
    etd: '2026-06-28',
    eta: '2026-07-15',
    incoterms: 'CIF',
    serviceType: 'LCL / Ocean',
    commodity: 'Wooden Furniture',
    packages: '5 Crates',
    grossWeight: '1200 KGS',
    volume: '5.5 CBM',
    placeOfReceipt: 'Ho Chi Minh Port',
    placeOfDelivery: 'Sydney Fulfillment Center',
    notes: '',
    paymentTerm: 'TT 30 Days',
    orderType: 'Export',
    transportType: 'Air',
    cargoReady: '20/4/2026',
    supplierDetails: {
      name: 'Woodwork Artisans',
      phone: '+84 98 765 4321',
      email: 'sales@woodworks.vn',
      street: '10 Artisan Alley',
      address: '10 Artisan Alley, Ho Chi Minh, VN',
      countryCode: 'VN',
      countryName: 'Vietnam',
      postalCode: '70000',
      addressType: 'Factory'
    },
    consigneeDetails: {
      name: 'Home Decor Co',
      phone: '+61 2 9876 5432',
      email: 'purchasing@homedecor.com.au',
      street: '45 Design Way',
      address: '45 Design Way, Sydney, AU',
      countryCode: 'AU',
      countryName: 'Australia',
      postalCode: '2000',
      addressType: 'Store'
    },
    items: [
      {
        code: 'PKG-003',
        name: 'Oak Dining Table',
        sku: 'ODT-100',
        quantity: 50,
        unit: 'Sets',
        length: 200,
        width: 100,
        height: 20,
        weight: 1.2,
        volume: 5.5,
        retailPrice: 500,
        wholesalePrice: 200
      }
    ]
  }
];

export const MOCK_INTERNAL_TRANSFERS: InternalTransfer[] = [
  {
    id: '1',
    shipmentCode: 'S280303KCRL',
    orderCode: '260303GCG4',
    customer: 'OMS - NOW_20250606121235',
    carrier: 'Hasaki Express',
    shipper: '',
    status: 'Dispatched',
    priority: 'normal',
    createdAt: '03/03/2026 10:18:33',
    estimatedDeliveryTime: '05/03/2026 - 08/03/2026',
    deliveryType: 'Internal',
    totalAmount: 10,
    currency: 'USD',
    isReturn: false,
    receiver: { name: 'HASAKI STORE 123', phone: '0987267289', email: 's123@hasaki.vn', street: '568 Luy Ban Bich', address: 'Tan Phu, HCM', countryCode: 'VN', countryName: 'Vietnam', postalCode: '700000', addressType: 'Store' },
    items: [],
    totalPackages: 1,
    totalWeight: 0.1,
    dimensions: '8.43x8.43x8.43',
    volume: 599.077,
    shippingCost: 0,
    trackingNumber: 'S260303KCRL',
    sector: '-',
    statusDescription: '-',
    note: '-',
    history: [
      {
        status: 'Dispatched',
        time: '03/03/2026 10:18:35',
        performedBy: 'NOW_20250606121235',
        note: 'Pushed to carrier, update shipment with carrier info',
        carrierStatus: '-',
      },
      {
        status: 'New',
        time: '03/03/2026 10:18:33',
        performedBy: 'NOW_20250606121235',
        note: 'Create shipment',
        carrierStatus: '-',
      }
    ],
    sender: { name: 'HASAKI WAREHOUSE', phone: '0281234567', email: 'wh@hasaki.vn', street: '71 Hoang Hoa Tham', address: 'Tan Binh, HCM', countryCode: 'VN', countryName: 'Vietnam', postalCode: '700000', addressType: 'Warehouse' }
  },
  {
    id: '2',
    shipmentCode: 'S280303ZG7R',
    orderCode: '260303976U',
    customer: 'OMS - NOW_20250606121235',
    carrier: 'Hasaki Express',
    shipper: '',
    status: 'Dispatched',
    priority: 'normal',
    createdAt: '03/03/2026 09:40:19',
    estimatedDeliveryTime: '05/03/2026 - 08/03/2026',
    deliveryType: 'Internal',
    totalAmount: 15,
    currency: 'USD',
    isReturn: false,
    history: [],
    sender: { name: 'HASAKI WAREHOUSE', phone: '0281234567', email: 'wh@hasaki.vn', street: '71 Hoang Hoa Tham', address: 'Tan Binh, HCM', countryCode: 'VN', countryName: 'Vietnam', postalCode: '700000', addressType: 'Warehouse' },
    receiver: { name: 'HASAKI STORE 456', phone: '0901234567', email: 's456@hasaki.vn', street: '123 Nguyen Van Cu', address: 'District 5, HCM', countryCode: 'VN', countryName: 'Vietnam', postalCode: '700000', addressType: 'Store' },
    items: [],
    totalPackages: 2,
    totalWeight: 5.0
  },
  {
    id: '3',
    shipmentCode: 'S260303PCR1',
    orderCode: '260303Q4HO',
    customer: 'OMS - NOW_20250606121235',
    carrier: 'Hasaki Express',
    shipper: '',
    status: 'Dispatched',
    priority: 'normal',
    createdAt: '03/03/2026 09:31:54',
    estimatedDeliveryTime: '05/03/2026 - 08/03/2026',
    deliveryType: 'Internal',
    totalAmount: 8,
    currency: 'USD',
    isReturn: false,
    history: [],
    sender: { name: 'HASAKI WAREHOUSE', phone: '0281234567', email: 'wh@hasaki.vn', street: '71 Hoang Hoa Tham', address: 'Tan Binh, HCM', countryCode: 'VN', countryName: 'Vietnam', postalCode: '700000', addressType: 'Warehouse' },
    receiver: { name: 'HASAKI STORE 789', phone: '0907654321', email: 's789@hasaki.vn', street: '456 To Hien Thanh', address: 'District 10, HCM', countryCode: 'VN', countryName: 'Vietnam', postalCode: '700000', addressType: 'Store' },
    items: [],
    totalPackages: 1,
    totalWeight: 1.2
  }
];

export const MOCK_SHIPPERS: Shipper[] = [
  {
    id: '1',
    name: 'Phuong Phan',
    email: 'p1@hasaki.vn',
    phone: '0972655076',
    employeeId: 'Phuongplat',
    type: 'Motorbike',
    identificationNumber: '9021839048325',
    note: 'USA - HAWAII',
    assignedStoreIds: ['1'],
    defaultStoreId: '1',
    joinedAt: '2026-01-01',
    leftAt: '',
    street: '71 Hoang Hoa Tham',
    address: 'Tan Binh, HCM',
    countryCode: 'VN',
    countryName: 'Vietnam',
    postalCode: '700000'
  }
];

export const MOCK_CARRIERS: import('./types').Carrier[] = [
  {
    id: '1',
    carrierCode: 'VENDOR-35335',
    carrierName: 'EasyPost',
    phoneNumber: '0453344541',
    address: '25 Tràng Thi',
    carrierApiReference: 'EASYPOST',
    carrierType: 'External',
    integrationType: 'Shipping Aggregator',
    status: 'Active',
    taxCode: 'Tax Code',
    email: 'Email',
    country: 'Vietnam (VN)',
    isMasterBill: false,
    supportsCustomsDeclaration: false,
    enablePickupService: false,
    shippingVendors: [
      { vendorName: 'USPS', services: [{ code: 'Express', name: 'Express' }] },
      { vendorName: 'UPSDAP', services: [] }
    ],
    note: ''
  }
];

export const MOCK_ONLINE_ORDERS: import('./types').OnlineOrder[] = [
  {
    id: '1',
    orderCode: '2607027DJR',
    customerOrderCode: '260702USG9ZV00',
    customer: 'Oms - Now_20250606121235',
    carrier: 'Easypost',
    trackingNumber: '1ZXXXXXXXXXXXXXXXX',
    status: 'Dispatched',
    createdAt: '02/07/2026 13:22:17',
    estimatedDeliveryTime: '04/07/2026 - 07/07/2026',
    orderType: 'Domestic',
    pickActions: '*** *** *** ***, BRADENTON, FLORI'
  },
  {
    id: '2',
    orderCode: '26070249PT',
    customerOrderCode: '260702USG9ZQ00',
    customer: 'Oms - Now_20250606121235',
    carrier: 'Easypost',
    trackingNumber: '1ZXXXXXXXXXXXXXXXX',
    status: 'Dispatched',
    createdAt: '02/07/2026 13:16:13',
    estimatedDeliveryTime: '04/07/2026 - 07/07/2026',
    orderType: 'Domestic',
    pickActions: '*** *** *** ***, BRADENTON, FLORI'
  },
  {
    id: '3',
    orderCode: '2607020G3L',
    customerOrderCode: '260704USG9YM00',
    customer: 'Oms - Now_20250606121235',
    carrier: 'Hasaki Express',
    trackingNumber: 'S260702U2XF',
    status: 'Out for delivery',
    createdAt: '02/07/2026 11:31:02',
    estimatedDeliveryTime: '02/07/2026 - 03/07/2026',
    orderType: 'Domestic',
    pickActions: '*** *** *** *** California 90201, U'
  }
];
