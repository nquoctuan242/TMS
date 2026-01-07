
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
}

export interface HistoryEntry {
  status: string;
  time: string;
  performedBy: string;
  note: string;
  carrierStatus: string;
  podImageUrl?: string;
}
