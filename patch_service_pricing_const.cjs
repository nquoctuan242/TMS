const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf-8');

const servicePricingConst = `
export const MOCK_SERVICE_PRICING: import('./types').ServicePricing[] = [
  { id: '1', code: 'PRC922542', versionName: 'Service Pricing for SF260519FWBZ', effectiveDate: '25/06/2026 (UTC+7)', expiredDate: '03/06/2027 (UTC+7)', status: 'Effective', note: '123', dynamicPricingSchema: 'ZONE_BASED' },
  { id: '2', code: 'PRC568286', versionName: 'Service Pricing for SF260519FWBZ', effectiveDate: '31/08/2026 (UTC+7)', expiredDate: '31/08/2028 (UTC+7)', status: 'Not Yet Started', note: '123', dynamicPricingSchema: 'DISTANCE_BASED' },
  { id: '3', code: 'PRC783102', versionName: 'HSK-v1', effectiveDate: '07/03/2026 (UTC+7)', expiredDate: '31/03/2026 (UTC+7)', status: 'Expired', note: '', dynamicPricingSchema: 'ZONE_BASED' },
  { id: '4', code: 'PRC496074', versionName: 'Service Pricing for SF260519FWBZ', effectiveDate: '29/05/2026 (UTC+7)', expiredDate: '30/06/2026 (UTC+7)', status: 'Expired', note: '123', dynamicPricingSchema: 'DISTANCE_BASED' }
];
`;

content += '\n' + servicePricingConst;
fs.writeFileSync('constants.tsx', content);
