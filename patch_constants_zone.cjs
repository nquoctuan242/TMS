const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf-8');

const zoneRules = `
export const MOCK_ZONE_RULES: import('./types').ZoneRuleConfig[] = [
  {
    id: 'ZR-001',
    carrierId: 'C-001',
    matchType: 'Exact',
    destCondition: 'Equals',
    destScopeId: 'DS-001',
    zoneId: 'Z-001',
    priority: 1,
    note: 'Standard zone rule'
  },
  {
    id: 'ZR-002',
    carrierId: 'C-002',
    matchType: 'Prefix',
    destCondition: 'Starts With',
    destScopeId: 'DS-002',
    zoneId: 'Z-002',
    priority: 2,
    note: 'Secondary zone rule'
  }
];
`;

content += '\n' + zoneRules;
fs.writeFileSync('constants.tsx', content);
