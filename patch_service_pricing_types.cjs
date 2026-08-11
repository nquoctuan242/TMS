const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf-8');

const servicePricingType = `
export interface ServicePricing {
  id: string;
  code: string;
  versionName: string;
  effectiveDate: string;
  expiredDate: string;
  status: 'Effective' | 'Not Yet Started' | 'Expired';
  note: string;
  dynamicPricingSchema: 'ZONE_BASED' | 'DISTANCE_BASED';
}
`;

content += '\n' + servicePricingType;
fs.writeFileSync('types.ts', content);
