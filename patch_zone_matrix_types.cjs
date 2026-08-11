const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf-8');

const zoneMatrixType = `
export interface ZoneMatrixConfig {
  id: string;
  carrierId: string;
  fromRegion: string;
  toRegion: string;
  zoneId: string;
  note: string;
}
`;

content += '\n' + zoneMatrixType;
fs.writeFileSync('types.ts', content);
