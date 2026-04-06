
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

export interface ITRoute {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'Active' | 'Inactive';
  assignedStores: string[]; // Store IDs
  assignedShippers: string[]; // User IDs (shippers)
  createdAt: string;
}

export interface InternalTransfer {
  id: string;
  shipmentCode: string;
  orderCode: string;
  customerOrderCode?: string;
  customer: string;
  carrier: string;
  shipper: string;
  status: string;
  priority: string;
  createdAt: string;
  estimatedDeliveryTime: string;
  deliveryType: string;
  orderType?: string;
  pickupPoint?: string;
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
  dimensions?: string;
  volume?: number;
  shippingCost?: number;
  trackingNumber?: string;
  sector?: string;
  statusDescription?: string;
  service?: ServiceInfo;
  carrierDetail?: CarrierDetail;
}

export interface Shipper {
  id: string;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  type: string;
  identificationNumber: string;
  note?: string;
  assignedStoreIds: string[];
  defaultStoreId?: string;
  joinedAt?: string;
  leftAt?: string;
  street?: string;
  address?: string;
  countryCode?: string;
  countryName?: string;
  postalCode?: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
  uploadedAt: string;
}

export interface Ticket {
  id: string;
  ticketCode: string;
  ticketTypeId?: string;
  ticketType: string;
  shipperId?: string;
  shipperName?: string;
  incidentReportDate?: string;
  reason?: string;
  ticketRecord?: string;
  approvalDate?: string;
  approvedBy?: string;
  createdAt: string;
  createdBy: string;
  status: 'Open' | 'Waiting Clarification' | 'Explained' | 'Approved' | 'Rejected';
  orderCode?: string;
  attachments?: Attachment[];
  
  // Explanation fields
  explanationCode?: string;
  explanationReason?: string;
  explanationContent?: string;
  explanationDate?: string;
  clarificationDeadline?: string;

  // Legacy/Internal fields
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  requester: string;
  assignee?: string;
  description: string;
  subject: string;
  updatedAt: string;
}

export interface TicketType {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'Active' | 'Inactive';
  country?: string;
  explanationDeadlineDays?: number;
  violationPenaltyAmount?: number;
  currency?: string;
  createdAt: string;
}
