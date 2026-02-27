
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

export interface PartnerInfo {
  name: string;
  phone: string;
  email: string;
  company?: string;
  street: string;
  address: string;
  countryCode: string;
  countryName: string;
  postalCode: string;
  latitude?: string;
  longitude?: string;
  addressType: string;
  note?: string;
}

export interface Item {
  code: string;
  name: string;
  sku: string;
  quantity: number;
  unit: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  volume: number;
  retailPrice: number;
  wholesalePrice: number;
}

export interface ServiceInfo {
  pricingCode: string;
  mainServiceName: string;
  currency: string;
  serviceFee: number;
  surchargeSum: number;
  vat: number;
  totalFee: number;
  estimatedTime: string;
  surcharges: Array<{ name: string; amount: number }>;
}

export interface CarrierDetail {
  shipmentCode: string;
  carrierName: string;
  shipperName: string;
}

export interface InternalTransfer {
  id: string;
  orderCode: string;
  customerOrderCode: string;
  customer: string;
  carrier: string;
  status: string;
  createdAt: string;
  estimatedDeliveryTime: string;
  orderType: string;
  pickupPoint: string;
  // Detail fields
  totalAmount?: number;
  currency?: string;
  isReturn?: boolean;
  transportType?: string;
  paymentMethod?: string;
  orderCategory?: string;
  cod?: string;
  note?: string;
  history?: HistoryEntry[];
  sender?: PartnerInfo;
  receiver?: PartnerInfo;
  items?: Item[];
  totalPackages?: number;
  totalCbm?: number;
  convertValue?: number;
  totalWeight?: number;
  service?: ServiceInfo;
  carrierDetail?: CarrierDetail;
}
