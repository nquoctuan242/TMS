
import { ShipmentData, HistoryEntry } from './types';

export const MOCK_SHIPMENT: ShipmentData = {
  shipmentCode: 'S2512231YG9',
  orderCodes: ['251223XFON'],
  customerCode: 'NOW_20250606121235',
  amount: 26.29,
  currency: 'USD',
  dimensions: '9.700x9.700x9.700',
  weight: 0.152,
  volume: 912.673,
  shippingCost: 0.0,
  carrierName: 'Hasaki Express',
  shipperName: 'Nguyen Vi Na',
  trackingNumber: 'S2512231YG9',
  statusDescription: '-',
  note: '-',
};

export const MOCK_HISTORY: HistoryEntry[] = [
  {
    status: 'Returning warehouse',
    time: '25/12/2025 14:56:47',
    performedBy: '0937700555',
    note: 'Mark returning shipment',
    carrierStatus: '',
    podImageUrl: 'https://picsum.photos/40/40?random=1'
  },
  {
    status: 'Out for Delivery',
    time: '25/12/2025 14:52:12',
    performedBy: '0937700555',
    note: 'Carrier cancel shipment status not success',
    carrierStatus: '',
  },
  {
    status: 'Out for Delivery',
    time: '25/12/2025 14:52:12',
    performedBy: '0937700555',
    note: 'Shipper marked shipment to delivery',
    carrierStatus: '',
  }
];
