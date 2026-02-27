
import { ShipmentData, HistoryEntry, InternalTransfer } from './types';

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

export const MOCK_INTERNAL_TRANSFERS: InternalTransfer[] = [
  {
    id: '1',
    orderCode: '260226PTEU',
    customerOrderCode: 'HDG11112',
    customer: 'NOW_20250606121235',
    carrier: 'Yun Express',
    status: 'Dispatched',
    createdAt: '23/02/2026 14:58:05',
    estimatedDeliveryTime: '04/03/2026 - 08/03/2026',
    orderType: 'SHIPPING_TYPE_DOMESTIC',
    pickupPoint: '568 Lũy Bán Bích, Phường Hòa Thạnh, Quận Tân Phú, Hồ Chí Minh, Việt Nam',
    totalAmount: 10,
    currency: 'USD',
    isReturn: false,
    transportType: 'Unspecified',
    paymentMethod: 'Unspecified',
    orderCategory: 'Non-document',
    cod: '***',
    note: '—',
    history: [
      {
        status: 'Dispatched',
        time: '26/02/2026 18:34:49',
        performedBy: 'hoadg',
        note: 'Sync order with shipment',
        carrierStatus: 'In Transit'
      },
      {
        status: 'New',
        time: '26/02/2026 18:34:47',
        performedBy: 'hoadg',
        note: 'Create order',
        carrierStatus: 'Pending'
      }
    ],
    sender: {
      name: 'HASAKI BEAUTY & CLINIC JSC',
      phone: '********62',
      email: 'No information',
      company: 'No information',
      street: '*** *** *** *** *** Quận Tân Bình, Hồ Chí Minh',
      address: 'Phường 13, Quận Tân Bình, Thành phố Hồ Chí Minh',
      countryCode: 'VN',
      countryName: 'Vietnam',
      postalCode: '700000',
      addressType: 'Unspecified Address',
      note: ''
    },
    receiver: {
      name: 'Hang Doan',
      phone: '+141******71',
      email: 'No information',
      street: '*** *** *** *** ***',
      address: 'Alford, Florida',
      countryCode: 'US',
      countryName: 'United States',
      postalCode: '32420',
      latitude: '30.63637',
      longitude: '-85.38123',
      addressType: 'Unspecified Address',
      note: ''
    },
    items: [
      {
        code: '—',
        name: 'Áo Thun Nữ Synctives Mềm Mịn, Bền Màu, Thoáng Mát, Giữ Form - Rêu, M',
        sku: '422269312',
        quantity: 1,
        unit: 'PCS',
        length: 9.13,
        width: 9.13,
        height: 9.13,
        weight: 0.152,
        volume: 761.048,
        retailPrice: 10.79,
        wholesalePrice: 144
      }
    ],
    totalPackages: 1,
    totalCbm: 761.048,
    convertValue: 0.152,
    totalWeight: 0.152,
    service: {
      pricingCode: 'PRC090942',
      mainServiceName: 'Delivery International Standard',
      currency: 'VND',
      serviceFee: 135929,
      surchargeSum: 0,
      vat: 10874.32,
      totalFee: 146803.32,
      estimatedTime: '08/03/2026 - 12/03/2026',
      surcharges: []
    },
    carrierDetail: {
      shipmentCode: 'S2602275ZE9',
      carrierName: 'Yun Master Bill',
      shipperName: ''
    }
  }
];
