const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf-8');

const zoneRuleType = `
export interface ZoneRuleConfig {
  id: string;
  carrierId: string;
  matchType: string;
  destCondition: string;
  destScopeId: string;
  zoneId: string;
  priority: number;
  note: string;
}
`;

content += '\n' + zoneRuleType;
fs.writeFileSync('types.ts', content);
