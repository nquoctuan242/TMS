const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf8');

const replacement = `export const MOCK_CARRIERS: import('./types').Carrier[] = [
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
];`;

content = content.replace(/export const MOCK_CARRIERS[\s\S]*?\];/, replacement);

fs.writeFileSync('constants.tsx', content);
console.log('MOCK_CARRIERS updated');
