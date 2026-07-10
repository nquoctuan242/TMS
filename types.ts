export interface ShippingVendorService {  code: string;  name: string; isActive?: boolean; }
export interface ShippingVendorConfig {  vendorName: string;  services: ShippingVendorService[];  pickupFree?: boolean;  pickupOnDemand?: boolean;  dropoff?: boolean;}

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
  cartons?: number;
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

export interface ServiceDeliveryConfig {
  id: string;
  orderType: string;
  serviceType: string;
  lateDeliveryAlertTime: number; // in minutes
  isActive?: boolean;
}

export interface ShipperSearchRadiusConfig {
  id: string;
  orderType: string;
  serviceType: string;
  radiusKm: number;
  isActive?: boolean;
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

export interface PurchaseOrder {
  id: string;
  poCode: string;
  customerOrderCode?: string;
  customer: string;
  supplier: string;
  status: string;
  createdAt: string;
  etd?: string;
  eta?: string;
  incoterms?: string;
  serviceType?: string;
  commodity?: string;
  packages?: string;
  grossWeight?: string;
  volume?: string;
  placeOfReceipt?: string;
  placeOfDelivery?: string;
  notes?: string;
  supplierDetails?: PartnerInfo;
  consigneeDetails?: PartnerInfo;
  paymentTerm?: string;
  orderType?: string;
  transportType?: string;
  cargoReady?: string;
  items?: Item[];
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
  rejectNote?: string;
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

  // Second explanation fields
  explanationContent2?: string;
  explanationDate2?: string;
  explanationReason2?: string;

  // Mobile feedback
  understandingStatus?: 'Understood' | 'Not Understood';

  // Legacy/Internal fields
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  requester: string;
  assignee?: string;
  description: string;
  subject: string;
  updatedAt: string;
}

export interface DailyCommission {
  id: string;
  date: string;
  payrollPeriod: string;
  store: string;
  shipper: string;
  deliveredOnlineOrders: number;
  deliveredITOrders: number;
  commission: number;
  lateOrders: number;
  invalidPODOrders: number;
  startTime: string;
  endTime: string;
}

export interface PayrollPeriod {
  id: string;
  versionName: string;
  cycle: string;
  effectiveTime: string;
  appliedLocation: string;
}

export interface ScanTimeConfig {
  id: string;
  storeId?: string;
  storeName?: string;
  wardCity?: string;
  stateProvince?: string;
  country: string;
  startTime: string;
  endTime: string;
  timezone: string;
  updatedAt: string;
}

export interface TicketType {
  id: string;
  name: string;
  code: string;
  description: string;
  typeReference?: string;
  podGpsAccuracyDistance?: number;
  status: 'Active' | 'Inactive';
  country?: string;
  stateProvince?: string;
  explanationDeadlineDays?: number;
  maxExplanationCount?: number;
  violationPenaltyAmount?: number;
  showPenaltyAmountOnApp?: boolean;
  currency?: string;
  applyOrderTypes?: string[];
  applyServiceTypes?: string[];
  autoCreateTicket?: boolean;
  createdAt: string;
}
export interface Carrier {
  id: string;
  carrierCode: string;
  carrierName: string;
  phoneNumber: string;
  address: string;
  carrierApiReference: string;
  carrierType: string;
  integrationType: string;
  status: string;
  taxCode: string;
  email: string;
  country: string;
  isMasterBill: boolean;
  supportsCustomsDeclaration: boolean;
  enablePickupService: boolean;
  shippingVendors: ShippingVendorConfig[];
  note: string;
}

export interface OnlineOrder {
  id: string;
  orderCode: string;
  customerOrderCode: string;
  customer: string;
  carrier: string;
  trackingNumber: string;
  status: string;
  createdAt: string;
  estimatedDeliveryTime: string;
  orderType: string;
  pickActions: string;
}


export interface DropOffPoint {
  id: string;
  carrier: string;
  address: string;
  cutoffTime?: string;
  country?: string;
}


export interface StoreCarrierVendorConfig {
  vendorName: string;
  services: ShippingVendorService[];
  pickupFree?: boolean;
  pickupOnDemand?: boolean;
  dropoff?: boolean;
  dropOffPoints?: DropOffPoint[];
}
export interface StoreCarrierConfig {
  id: string;
  carrierId?: string;
  carrierCode: string;
  carrierName: string;
  vendorName?: string;
  services?: ShippingVendorService[];
  vendors?: StoreCarrierVendorConfig[];
  pickupFree?: boolean;
  pickupOnDemand?: boolean;
  dropoff?: boolean;
  dropOffPoints?: DropOffPoint[];
}
