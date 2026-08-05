const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf-8');

const newType = `
export interface VehiclePurposeConfig {
  id: string;
  code: string;
  name: string;
  description: string;
}
`;

content = content.replace(
  'export interface VehicleTypeConfig {',
  newType + '\\nexport interface VehicleTypeConfig {'
);

fs.writeFileSync('types.ts', content);
