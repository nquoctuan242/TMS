
export interface TransitPoint {
  name: string;
  location: string;
  type: 'store' | 'warehouse' | 'hub';
  statusLabel?: string; // The label to show ON the path leading to this point
}

export interface ShipmentData {
  shipmentCode: string;
  orderCodes: string[];
  customerCode: string;
  amount: number;
  currency: string;
  dimensions: string;
  weight: number;
  volume: number;
  shippingCost: number;
  carrierName: string;
  shipperName: string;
  trackingNumber: string;
  statusDescription: string;
  note: string;
  zone?: string;
  isReDelivered?: boolean;
  isReturned?: boolean;
  senderAddress: string;
  receiverAddress: string;
  transitPoints: TransitPoint[];
  returnLocation?: string;
}

export interface HistoryEntry {
  status: string;
  time: string;
  performedBy: string;
  note: string;
  carrierStatus: string;
  podImageUrl?: string;
}
