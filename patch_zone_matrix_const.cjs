const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf-8');

const zoneMatrix = `
export const MOCK_ZONE_MATRIX: import('./types').ZoneMatrixConfig[] = [
  { id: '1', carrierId: '1', fromRegion: 'BAC', toRegion: 'BAC', zoneId: '2', note: 'Nội miền' },
  { id: '2', carrierId: '1', fromRegion: 'BAC', toRegion: 'TRUNG', zoneId: '3', note: 'Cận miền' },
  { id: '3', carrierId: '1', fromRegion: 'BAC', toRegion: 'NAM', zoneId: '4', note: 'Liên miền (cách vùng)' },
  { id: '4', carrierId: '1', fromRegion: 'TRUNG', toRegion: 'BAC', zoneId: '3', note: 'Cận miền' },
  { id: '5', carrierId: '1', fromRegion: 'TRUNG', toRegion: 'TRUNG', zoneId: '2', note: 'Nội miền' },
  { id: '6', carrierId: '1', fromRegion: 'TRUNG', toRegion: 'NAM', zoneId: '3', note: 'Cận miền' },
  { id: '7', carrierId: '1', fromRegion: 'NAM', toRegion: 'BAC', zoneId: '4', note: 'Liên miền (cách vùng)' },
  { id: '8', carrierId: '1', fromRegion: 'NAM', toRegion: 'TRUNG', zoneId: '3', note: 'Cận miền' },
  { id: '9', carrierId: '1', fromRegion: 'NAM', toRegion: 'NAM', zoneId: '2', note: 'Nội miền' }
];
`;

content += '\n' + zoneMatrix;
fs.writeFileSync('constants.tsx', content);
