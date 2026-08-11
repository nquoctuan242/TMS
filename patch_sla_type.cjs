const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf-8');

// Replace flat props with serviceLevelConfigs
content = content.replace(
  /  partner\?: string;\n  volumetricDivisor\?: number;\n  weightRoundStep\?: number;\n  weightRoundMethod\?: string;\n  minChargeableWeight\?: number;\n  maxWeight\?: number;\n  isActive\?: boolean;/g,
  '  serviceLevelConfigs?: ServiceLevelConfig[];'
);

const slcInterface = `
export interface ServiceLevelConfig {
  id: string;
  partner: string;
  volumetricDivisor: number;
  weightRoundStep: number;
  weightRoundMethod: string;
  minChargeableWeight: number;
  maxWeight: number;
  isActive: boolean;
}
`;

content = content.replace(
  'export interface DeliverySLAConfig {',
  slcInterface + '\nexport interface DeliverySLAConfig {'
);

fs.writeFileSync('types.ts', content);
