
import { ShipmentData, HistoryEntry, InternalTransfer, ITRoute, Shipper } from './types';

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
  statusDescription: '-',
  note: '-',
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
    joinedAt: '2026-01-01',
    leftAt: '',
    street: '71 Hoang Hoa Tham',
    address: 'Tan Binh, HCM',
    countryCode: 'VN',
    countryName: 'Vietnam',
    postalCode: '700000'
  }
];
