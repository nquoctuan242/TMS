const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf8');

content = content.replace(
  `    shippingVendors: [
      { vendorName: 'USPS', services: [{ code: 'Express', name: 'Express' }] },
      { vendorName: 'UPSDAP', services: [] }
    ],`,
  `    shippingVendors: [
      { vendorName: 'USPS', services: [{ code: 'Express', name: 'Express' }] },
      { vendorName: 'UPS', services: [{ code: 'Ground', name: 'Ground' }] },
      { vendorName: 'FedEx', services: [{ code: 'Overnight', name: 'Overnight' }] }
    ],`
);

fs.writeFileSync('constants.tsx', content);
console.log('Fixed shippingVendors in constants.tsx');
