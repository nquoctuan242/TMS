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
    id: '0',
    carrierCode: 'EASYPOST',
    carrierName: 'EasyPost (Shipping Aggregator)',
    phoneNumber: '028 7300 8888',
    address: '77 Geary St, San Francisco, CA',
    carrierApiReference: 'EASYPOST',
    carrierType: 'External',
    integrationType: 'Shipping Aggregator',
    status: 'Active',
    taxCode: 'TAX-EASYPOST-01',
    email: 'support@easypost.com',
    country: 'United States (US)',
    isMasterBill: true,
    supportsCustomsDeclaration: true,
    enablePickupService: true,
    shippingVendors: [
      {
        vendorName: 'FedEx Express',
        pickupFree: true,
        pickupOnDemand: true,
        dropoff: true,
        services: [
          { code: 'PRIORITY_OVERNIGHT', name: 'FedEx Priority Overnight', internalService: 'Same day', isActive: true },
          { code: 'STANDARD_OVERNIGHT', name: 'FedEx Standard Overnight', internalService: 'Next day', isActive: true },
          { code: 'FEDEX_2_DAY', name: 'FedEx 2Day', internalService: 'Express', isActive: true },
          { code: 'FEDEX_GROUND', name: 'FedEx Ground', internalService: 'Standard', isActive: true }
        ]
      },
      {
        vendorName: 'UPS Logistics',
        pickupFree: false,
        pickupOnDemand: true,
        dropoff: true,
        services: [
          { code: 'UPS_NEXT_DAY_AIR', name: 'UPS Next Day Air', internalService: 'Next day', isActive: true },
          { code: 'UPS_2ND_DAY_AIR', name: 'UPS 2nd Day Air', internalService: 'Express', isActive: true },
          { code: 'UPS_GROUND', name: 'UPS Ground', internalService: 'Standard', isActive: true }
        ]
      },
      {
        vendorName: 'USPS Postal',
        pickupFree: true,
        pickupOnDemand: false,
        dropoff: true,
        services: [
          { code: 'PRIORITY_MAIL', name: 'USPS Priority Mail', internalService: 'Express', isActive: true },
          { code: 'FIRST_CLASS', name: 'USPS First-Class Package', internalService: 'Standard', isActive: true }
        ]
      }
    ],
    note: 'Master shipping aggregator account integrating FedEx, UPS, and USPS'
  },
  {
    id: '1',
    carrierCode: 'UPS',
    carrierName: 'UPS',
    phoneNumber: '0453344541',
    address: '25 Tràng Thi',
    carrierApiReference: 'UPS',
    carrierType: 'External',
    integrationType: 'Actual Carrier',
    status: 'Active',
    taxCode: 'Tax Code',
    email: 'Email',
    country: 'Vietnam (VN)',
    isMasterBill: false,
    supportsCustomsDeclaration: false,
    enablePickupService: false,
    shippingVendors: [],
    note: ''
  },
  {
    id: '2',
    carrierCode: 'USPS',
    carrierName: 'USPS',
    phoneNumber: '0453344541',
    address: '25 Tràng Thi',
    carrierApiReference: 'USPS',
    carrierType: 'External',
    integrationType: 'Actual Carrier',
    status: 'Active',
    taxCode: 'Tax Code',
    email: 'Email',
    country: 'Vietnam (VN)',
    isMasterBill: false,
    supportsCustomsDeclaration: false,
    enablePickupService: false,
    shippingVendors: [],
    note: ''
  },
  {
    id: '3',
    carrierCode: 'FEDEX',
    carrierName: 'FedEx',
    phoneNumber: '0453344541',
    address: '25 Tràng Thi',
    carrierApiReference: 'FEDEX',
    carrierType: 'External',
    integrationType: 'Actual Carrier',
    status: 'Active',
    taxCode: 'Tax Code',
    email: 'Email',
    country: 'Vietnam (VN)',
    isMasterBill: false,
    supportsCustomsDeclaration: false,
    enablePickupService: false,
    shippingVendors: [],
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

export const MOCK_SHIFT_CONTROL_CONFIGS: import('./types').ShiftControlConfig[] = [
  {
    id: '1',
    country: 'Vietnam (VN)',
    stateProvince: '',
    warnBeforeShiftEndEnabled: true,
    warnBeforeShiftEndMinutes: 30,
    blockDeliveryActionsAtEnd: true,
    allowReturnAllAtEnd: true,
    createdAt: '2026-07-12T10:00:00Z'
  },
  {
    id: '2',
    country: 'Vietnam (VN)',
    stateProvince: 'Ho Chi Minh',
    warnBeforeShiftEndEnabled: true,
    warnBeforeShiftEndMinutes: 15,
    blockDeliveryActionsAtEnd: true,
    allowReturnAllAtEnd: false,
    createdAt: '2026-07-12T11:00:00Z'
  }
];

export const MOCK_LANDING_COST_CONFIGS: import('./types').LandingCostConfig[] = [
  {
    id: '1',
    name: 'Standard Import Duty',
    type: 'Duty',
    formula: 'FOB_PRICE * 0.15',
    isActive: true,
    country: 'Vietnam (VN)',
    createdAt: '2026-07-16T10:00:00Z'
  },
  {
    id: '2',
    name: 'Fragile Handling Fee',
    type: 'Handling',
    formula: 'QTY * 2.5',
    isActive: true,
    country: 'Vietnam (VN)',
    stateProvince: 'Ho Chi Minh',
    createdAt: '2026-07-16T11:00:00Z'
  }
];

export const MOCK_DELIVERY_SLA_CONFIGS: import('./types').DeliverySLAConfig[] = [
  {
    id: '1',
    serviceName: 'Same-day delivery',
    cutoffTime: '12:00',
    beforeCutoffDeliverTime: '23:59',
    beforeCutoffDaysAdd: 0,
    afterCutoffDeliverTime: '18:00',
    afterCutoffDaysAdd: 1,
    lateAlertMinutes: 30,
    locationOverrides: [
      {
        id: 'o1',
        country: 'Vietnam (VN)', stateProvince: 'Ho Chi Minh', storeId: '1',
        effectiveFrom: '2026-01-01'
      },
      {
        id: 'o2',
        country: 'Vietnam (VN)', stateProvince: 'Ho Chi Minh', storeId: '2',
        effectiveFrom: '2026-02-15'
      }
    ]
  },
  {
    id: '2',
    serviceName: 'Express delivery',
    cutoffTime: '14:00',
    beforeCutoffDeliverTime: '23:59',
    beforeCutoffDaysAdd: 0,
    afterCutoffDeliverTime: '12:00',
    afterCutoffDaysAdd: 1,
    lateAlertMinutes: 15,
    locationOverrides: []
  },
  {
    id: '3',
    serviceName: 'Standard delivery',
    cutoffTime: '16:00',
    beforeCutoffDeliverTime: '18:00',
    beforeCutoffDaysAdd: 2,
    afterCutoffDeliverTime: '18:00',
    afterCutoffDaysAdd: 3,
    lateAlertMinutes: 60,
    locationOverrides: []
  }
];


export const MOCK_STORES = [
  { id: '1', name: 'Store 123 (District 1)' },
  { id: '2', name: 'Store 456 (District 3)' },
  { id: '3', name: 'Store 789 (District 5)' },
  { id: '4', name: 'Store 999 (Binh Thanh)' },
  { id: '5', name: 'Store 888 (Phu Nhuan)' }
];


export const MOCK_VEHICLE_PURPOSES = [
  { id: '1', code: 'VP-DELIVERY', name: 'Delivery', description: 'Used for regular delivery operations' },
  { id: '2', code: 'VP-TRANSFER', name: 'Transfer', description: 'Used for internal transfer between stores' },
  { id: '3', code: 'VP-MAINTENANCE', name: 'Maintenance', description: 'Used for maintenance service' }
];


export const MOCK_ZONE_RULES: import('./types').ZoneRuleConfig[] = [
  {
    id: 'ZR-001',
    partner: 'C-001',
    matchType: 'REGION_MATRIX',
    isRemote: true,
    destScopeId: 'DS-001',
    zoneId: 'Z-001',
    priority: 1,
    note: 'Standard zone rule'
  },
  {
    id: 'ZR-002',
    partner: 'C-002',
    matchType: 'SAME_PROVINCE',
    isRemote: false,
    destScopeId: 'DS-002',
    zoneId: 'Z-002',
    priority: 2,
    note: 'Secondary zone rule'
  }
];


export const MOCK_ZONE_MATRIX: import('./types').ZoneMatrixConfig[] = [
  { id: '1', carrierId: '1', fromRegion: 'BAC', toRegion: 'BAC', zoneName: 'Nội miền', note: 'Nội miền' },
  { id: '2', carrierId: '1', fromRegion: 'BAC', toRegion: 'TRUNG', zoneName: 'Cận miền', note: 'Cận miền' },
  { id: '3', carrierId: '1', fromRegion: 'BAC', toRegion: 'NAM', zoneName: 'Liên miền (cách vùng)', note: 'Liên miền (cách vùng)' },
  { id: '4', carrierId: '1', fromRegion: 'TRUNG', toRegion: 'BAC', zoneName: 'Cận miền', note: 'Cận miền' },
  { id: '5', carrierId: '1', fromRegion: 'TRUNG', toRegion: 'TRUNG', zoneName: 'Nội miền', note: 'Nội miền' },
  { id: '6', carrierId: '1', fromRegion: 'TRUNG', toRegion: 'NAM', zoneName: 'Cận miền', note: 'Cận miền' },
  { id: '7', carrierId: '1', fromRegion: 'NAM', toRegion: 'BAC', zoneName: 'Liên miền (cách vùng)', note: 'Liên miền (cách vùng)' },
  { id: '8', carrierId: '1', fromRegion: 'NAM', toRegion: 'TRUNG', zoneName: 'Cận miền', note: 'Cận miền' },
  { id: '9', carrierId: '1', fromRegion: 'NAM', toRegion: 'NAM', zoneName: 'Nội miền', note: 'Nội miền' }
];


export const MOCK_SERVICE_PRICING: import('./types').ServicePricing[] = [
  { id: '1', code: 'PRC922542', versionName: 'Service Pricing for SF260519FWBZ', effectiveDate: '25/06/2026 (UTC+7)', expiredDate: '03/06/2027 (UTC+7)', status: 'Effective', note: '123', dynamicPricingSchema: 'ZONE_BASED' },
  { id: '2', code: 'PRC568286', versionName: 'Service Pricing for SF260519FWBZ', effectiveDate: '31/08/2026 (UTC+7)', expiredDate: '31/08/2028 (UTC+7)', status: 'Not Yet Started', note: '123', dynamicPricingSchema: 'DISTANCE_BASED' },
  { id: '3', code: 'PRC783102', versionName: 'HSK-v1', effectiveDate: '07/03/2026 (UTC+7)', expiredDate: '31/03/2026 (UTC+7)', status: 'Expired', note: '', dynamicPricingSchema: 'ZONE_BASED' },
  { id: '4', code: 'PRC496074', versionName: 'Service Pricing for SF260519FWBZ', effectiveDate: '29/05/2026 (UTC+7)', expiredDate: '30/06/2026 (UTC+7)', status: 'Expired', note: '123', dynamicPricingSchema: 'DISTANCE_BASED' }
];

export const MOCK_POSTAL_ZONES: any[] = [
  { id: '1', originZip: '039', fromCountry: 'US', toCountry: 'US', destinationRanges: ['Zone 51', 'Zone HCM Vietnam - USA 1', 'Zone 1'], status: 'Active' },
  { id: '2', originZip: '17050', fromCountry: 'US', toCountry: 'US', destinationRanges: ['Zone 7'], status: 'Active' },
  { id: '3', originZip: '32619', fromCountry: 'US', toCountry: 'US', destinationRanges: ['Zone 1'], status: 'Active' },
  { id: '4', originZip: '333321', fromCountry: 'VN', toCountry: 'US', destinationRanges: [], status: 'Active' },
  { id: '5', originZip: '34201', fromCountry: 'US', toCountry: 'US', destinationRanges: ['Zone 1'], status: 'Active' },
  { id: '6', originZip: '34203', fromCountry: 'US', toCountry: 'US', destinationRanges: ['Zone 4', 'Zone 3', 'Zone 1', 'Zone 8', 'Zone 6', 'Zone 7', 'Zone 2', 'Zone 9', 'Zone 5'], status: 'Active' },
  { id: '7', originZip: '36955', fromCountry: 'US', toCountry: 'US', destinationRanges: ['Zone 1'], status: 'Active' },
  { id: '8', originZip: '700', fromCountry: 'US', toCountry: 'US', destinationRanges: ['Zone 5'], status: 'Active' },
  { id: '9', originZip: '70000', fromCountry: 'US', toCountry: 'US', destinationRanges: ['UPS - Zone 2', 'UPS - Zone 3', 'UPS - Zone 4'], status: 'Active' },
  { id: '10', originZip: '700000', fromCountry: 'VN', toCountry: 'US', destinationRanges: ['vnus1', 'vnus2', 'vnus3', 'vnus4'], status: 'Active' },
  { id: '11', originZip: '712010', fromCountry: 'VN', toCountry: 'US', destinationRanges: ['vnus1', 'vnus2'], status: 'Active' },
  { id: '12', originZip: '850', fromCountry: 'US', toCountry: 'US', destinationRanges: ['Zone 1'], status: 'Active' },
  { id: '13', originZip: '85007', fromCountry: 'US', toCountry: 'US', destinationRanges: ['Zone 1'], status: 'Active' },
  { id: '14', originZip: '853', fromCountry: 'US', toCountry: 'US', destinationRanges: ['Zone 1'], status: 'Active' },
  { id: '15', originZip: '87031', fromCountry: 'US', toCountry: 'US', destinationRanges: ['Zone 8'], status: 'Active' },
  { id: '16', originZip: '902', fromCountry: 'US', toCountry: 'US', destinationRanges: ['Zone 8', 'Zone 7', 'Zone 5', 'Zone 3', 'Zone 10', 'Zone 1', 'Zone 2', 'Zone 6', 'Zone 4', 'Zone 9'], status: 'Active' },
  { id: '17', originZip: '90201', fromCountry: 'US', toCountry: 'US', destinationRanges: ['Zone 5', 'Zone 4', 'Zone 3', 'Zone 1', 'Zone 2', 'Zone 9', 'Zone 8', 'Zone 7', 'Zone 6'], status: 'Active' },
];

export const MOCK_PENDING_HANDOVER_ORDERS: import('./types').HandoverSubOrder[] = [
  {
    id: 'p-1',
    orderCode: 'ORD-2026-9201',
    trackingNumber: 'SPX-VN-90812451',
    carrierCode: 'SPX Express',
    carrierService: 'Standard',
    originStore: 'Hasaki Central Hub - District 10',
    originAddress: '71 Hoang Hoa Tham, Ward 13, Tan Binh, HCM',
    destinationHub: 'SPX Sorting Hub Tan Binh',
    destinationAddress: '22 Cong Hoa, Ward 4, Tan Binh, HCM',
    receiverName: 'Le Thi Thu Thao',
    receiverPhone: '0912 345 678',
    receiverAddress: '15 Nguyen Hue, District 1, HCM',
    weight: 1.2,
    codAmount: 380000,
    status: 'Pending Handover',
    createdAt: '29/09/2026 10:10:00'
  },
  {
    id: 'p-2',
    orderCode: 'ORD-2026-9202',
    trackingNumber: 'SPX-VN-90812452',
    carrierCode: 'SPX Express',
    carrierService: 'Express',
    originStore: 'Hasaki Central Hub - District 10',
    originAddress: '71 Hoang Hoa Tham, Ward 13, Tan Binh, HCM',
    destinationHub: 'SPX Sorting Hub Tan Binh',
    destinationAddress: '22 Cong Hoa, Ward 4, Tan Binh, HCM',
    receiverName: 'Tran Van Minh',
    receiverPhone: '0988 776 554',
    receiverAddress: '124 Cach Mang Thang 8, District 3, HCM',
    weight: 0.8,
    codAmount: 520000,
    status: 'Pending Handover',
    createdAt: '29/09/2026 10:14:00'
  },
  {
    id: 'p-3',
    orderCode: 'ORD-2026-9203',
    trackingNumber: 'GHTK-HN-441920',
    carrierCode: 'GHTK',
    carrierService: 'Standard',
    originStore: 'Hasaki Warehouse North',
    originAddress: 'KCN Noi Bai, Soc Son, Hanoi',
    destinationHub: 'GHTK Hub Long Bien',
    destinationAddress: '99 Nguyen Van Cu, Bo De, Long Bien, Hanoi',
    receiverName: 'Nguyen Thi Mai',
    receiverPhone: '0934 567 890',
    receiverAddress: '45 Trang Tien, Hoan Kiem, Hanoi',
    weight: 2.1,
    codAmount: 750000,
    status: 'Pending Handover',
    createdAt: '29/09/2026 10:18:00'
  },
  {
    id: 'p-4',
    orderCode: 'ORD-2026-9204',
    trackingNumber: 'VTP-SG-881294',
    carrierCode: 'Viettel Post',
    carrierService: 'Next day',
    originStore: 'Hasaki Central Hub - District 10',
    originAddress: '71 Hoang Hoa Tham, Ward 13, Tan Binh, HCM',
    destinationHub: 'Viettel Post Hub Song Than',
    destinationAddress: 'Song Than 1 Industrial Zone, Di An, Binh Duong',
    receiverName: 'Pham Quoc Bao',
    receiverPhone: '0903 881 294',
    receiverAddress: '88 Vo Van Ngan, Thu Duc, HCM',
    weight: 3.4,
    codAmount: 1150000,
    status: 'Pending Handover',
    createdAt: '29/09/2026 10:20:00'
  },
  {
    id: 'p-5',
    orderCode: 'ORD-2026-9205',
    trackingNumber: 'FDX-EXP-004812',
    carrierCode: 'FedEx',
    carrierService: 'Same day',
    originStore: 'Hasaki Central Hub - District 10',
    originAddress: '71 Hoang Hoa Tham, Ward 13, Tan Binh, HCM',
    destinationHub: 'FedEx Gateway Hub Tan Son Nhat',
    destinationAddress: 'Cargo Terminal 2, Tan Son Nhat Airport, HCM',
    receiverName: 'Jessica Adams',
    receiverPhone: '0944 231 999',
    receiverAddress: '36 Le Duan, Ben Nghe, District 1, HCM',
    weight: 1.5,
    codAmount: 0,
    status: 'Pending Handover',
    createdAt: '29/09/2026 10:22:00'
  }
];

export const MOCK_HANDOVER_MANIFESTS: import('./types').HandoverManifest[] = [
  {
    id: 'man-1',
    manifestCode: 'HO-20260929-001',
    carrier: '',
    originHub: 'Hasaki Central Hub - District 10',
    originAddress: '71 Hoang Hoa Tham, Ward 13, Tan Binh, HCM',
    destinationHub: 'SPX Sorting Hub Tan Binh',
    destinationAddress: '22 Cong Hoa, Ward 4, Tan Binh, HCM',
    status: 'Open',
    cutoffTime: '17:30',
    createdAt: '29/09/2026 08:30:00',
    totalOrders: 3,
    totalWeight: 4.2,
    totalCod: 1450000,
    notes: 'Auto-generated upon first incoming order at 08:30. Open for adding orders.',
    orders: [
      {
        id: 'ord-sub-1',
        orderCode: 'ORD-2026-8801',
        trackingNumber: 'SPX-VN-8801290',
        carrierCode: 'SPX Express',
        carrierService: 'Standard',
        originStore: 'Hasaki Central Hub - District 10',
        originAddress: '71 Hoang Hoa Tham, Ward 13, Tan Binh, HCM',
        destinationHub: 'SPX Sorting Hub Tan Binh',
        destinationAddress: '22 Cong Hoa, Ward 4, Tan Binh, HCM',
        receiverName: 'Nguyen Hoang Nam',
        receiverPhone: '0909 112 233',
        receiverAddress: '12 Nguyen Trai, Ward 2, District 5, HCM',
        weight: 1.5,
        codAmount: 450000,
        status: 'In Manifest',
        createdAt: '29/09/2026 08:30:00'
      },
      {
        id: 'ord-sub-2',
        orderCode: 'ORD-2026-8802',
        trackingNumber: 'SPX-VN-8801291',
        carrierCode: 'SPX Express',
        carrierService: 'Next day',
        originStore: 'Hasaki Central Hub - District 10',
        originAddress: '71 Hoang Hoa Tham, Ward 13, Tan Binh, HCM',
        destinationHub: 'SPX Sorting Hub Tan Binh',
        destinationAddress: '22 Cong Hoa, Ward 4, Tan Binh, HCM',
        receiverName: 'Tran Bao Chau',
        receiverPhone: '0918 445 566',
        receiverAddress: '48 Hai Ba Trung, Ward Ben Nghe, District 1, HCM',
        weight: 0.9,
        codAmount: 680000,
        status: 'In Manifest',
        createdAt: '29/09/2026 08:45:00'
      },
      {
        id: 'ord-sub-3',
        orderCode: 'ORD-2026-8803',
        trackingNumber: 'SPX-VN-8801292',
        carrierCode: 'SPX Express',
        carrierService: 'Standard',
        originStore: 'Hasaki Central Hub - District 10',
        originAddress: '71 Hoang Hoa Tham, Ward 13, Tan Binh, HCM',
        destinationHub: 'SPX Sorting Hub Tan Binh',
        destinationAddress: '22 Cong Hoa, Ward 4, Tan Binh, HCM',
        receiverName: 'Dang Thuy Tien',
        receiverPhone: '0977 332 119',
        receiverAddress: '79 Phan Dang Luu, Ward 7, Phu Nhuan, HCM',
        weight: 1.8,
        codAmount: 320000,
        status: 'In Manifest',
        createdAt: '29/09/2026 09:10:00'
      }
    ]
  },
  {
    id: 'man-2',
    manifestCode: 'HO-20260929-002',
    carrier: '',
    originHub: 'Hasaki Warehouse North',
    originAddress: 'KCN Noi Bai, Soc Son, Hanoi',
    destinationHub: 'GHTK Hub Long Bien',
    destinationAddress: '99 Nguyen Van Cu, Bo De, Long Bien, Hanoi',
    status: 'Sealed',
    cutoffTime: '18:00',
    createdAt: '29/09/2026 07:15:00',
    sealedAt: '29/09/2026 10:15:00',
    totalOrders: 3,
    totalWeight: 5.8,
    totalCod: 2120000,
    notes: 'Manifest sealed. Ready for carrier driver dispatching.',
    orders: [
      {
        id: 'ord-sub-4',
        orderCode: 'ORD-2026-8711',
        trackingNumber: 'GHTK-HN-871101',
        carrierCode: 'GHTK',
        carrierService: 'Express',
        originStore: 'Hasaki Warehouse North',
        originAddress: 'KCN Noi Bai, Soc Son, Hanoi',
        destinationHub: 'GHTK Hub Long Bien',
        destinationAddress: '99 Nguyen Van Cu, Bo De, Long Bien, Hanoi',
        receiverName: 'Bui Thanh Tung',
        receiverPhone: '0983 221 445',
        receiverAddress: '18 Hang Bong, Hoan Kiem, Hanoi',
        weight: 2.0,
        codAmount: 850000,
        status: 'In Manifest',
        createdAt: '29/09/2026 07:15:00'
      },
      {
        id: 'ord-sub-5',
        orderCode: 'ORD-2026-8712',
        trackingNumber: 'GHTK-HN-871102',
        carrierCode: 'GHTK',
        carrierService: 'Standard',
        originStore: 'Hasaki Warehouse North',
        originAddress: 'KCN Noi Bai, Soc Son, Hanoi',
        destinationHub: 'GHTK Hub Long Bien',
        destinationAddress: '99 Nguyen Van Cu, Bo De, Long Bien, Hanoi',
        receiverName: 'Pham Huong Giang',
        receiverPhone: '0915 667 889',
        receiverAddress: '102 Thai Ha, Dong Da, Hanoi',
        weight: 1.6,
        codAmount: 490000,
        status: 'In Manifest',
        createdAt: '29/09/2026 07:45:00'
      },
      {
        id: 'ord-sub-6',
        orderCode: 'ORD-2026-8713',
        trackingNumber: 'GHTK-HN-871103',
        carrierCode: 'GHTK',
        carrierService: 'Standard',
        originStore: 'Hasaki Warehouse North',
        originAddress: 'KCN Noi Bai, Soc Son, Hanoi',
        destinationHub: 'GHTK Hub Long Bien',
        destinationAddress: '99 Nguyen Van Cu, Bo De, Long Bien, Hanoi',
        receiverName: 'Vu Dinh Long',
        receiverPhone: '0966 554 433',
        receiverAddress: '55 Cau Giay, Dich Vong, Cau Giay, Hanoi',
        weight: 2.2,
        codAmount: 780000,
        status: 'In Manifest',
        createdAt: '29/09/2026 08:00:00'
      }
    ]
  },
  {
    id: 'man-3',
    manifestCode: 'HO-20260929-003',
    carrier: 'GHN',
    originHub: 'Hasaki Central Hub - District 10',
    originAddress: '71 Hoang Hoa Tham, Ward 13, Tan Binh, HCM',
    destinationHub: 'GHN Mega SOC Binh Duong',
    destinationAddress: 'Warehouse 5, VSIP 1, Thuan An, Binh Duong',
    status: 'Dispatched',
    cutoffTime: '12:00',
    createdAt: '29/09/2026 06:00:00',
    sealedAt: '29/09/2026 09:00:00',
    dispatchedAt: '29/09/2026 09:40:00',
    dispatchReference: 'DISP-GHN-88412',
    carrierDriverName: 'Nguyen Van Hai',
    carrierDriverPhone: '0908 123 456',
    carrierPlateNumber: '59C-912.84',
    totalOrders: 2,
    totalWeight: 3.5,
    totalCod: 890000,
    notes: 'Handed over to GHN driver Mr. Hai. Signed manifest printed and archived.',
    orders: [
      {
        id: 'ord-sub-7',
        orderCode: 'ORD-2026-8601',
        trackingNumber: 'GHN-SG-998812',
        carrierCode: 'GHN',
        carrierService: 'Express',
        originStore: 'Hasaki Central Hub - District 10',
        originAddress: '71 Hoang Hoa Tham, Ward 13, Tan Binh, HCM',
        destinationHub: 'GHN Mega SOC Binh Duong',
        destinationAddress: 'Warehouse 5, VSIP 1, Thuan An, Binh Duong',
        receiverName: 'Nguyen Khanh Vy',
        receiverPhone: '0933 221 100',
        receiverAddress: '24 Le Van Viet, Tang Nhon Phu A, District 9, HCM',
        weight: 1.5,
        codAmount: 510000,
        status: 'Dispatched',
        createdAt: '29/09/2026 06:15:00'
      },
      {
        id: 'ord-sub-8',
        orderCode: 'ORD-2026-8602',
        trackingNumber: 'GHN-SG-998813',
        carrierCode: 'GHN',
        carrierService: 'Standard',
        originStore: 'Hasaki Central Hub - District 10',
        originAddress: '71 Hoang Hoa Tham, Ward 13, Tan Binh, HCM',
        destinationHub: 'GHN Mega SOC Binh Duong',
        destinationAddress: 'Warehouse 5, VSIP 1, Thuan An, Binh Duong',
        receiverName: 'Hoang Van Nam',
        receiverPhone: '0945 667 112',
        receiverAddress: '150 Pham Van Dong, Ward 1, Go Vap, HCM',
        weight: 2.0,
        codAmount: 380000,
        status: 'Dispatched',
        createdAt: '29/09/2026 06:30:00'
      }
    ]
  }
];
