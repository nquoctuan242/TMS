const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf-8');

const MOCK_PURPOSES = `
export const MOCK_VEHICLE_PURPOSES = [
  { id: '1', code: 'VP-DELIVERY', name: 'Delivery', description: 'Used for regular delivery operations' },
  { id: '2', code: 'VP-TRANSFER', name: 'Transfer', description: 'Used for internal transfer between stores' },
  { id: '3', code: 'VP-MAINTENANCE', name: 'Maintenance', description: 'Used for maintenance service' }
];
`;

content = content + '\n' + MOCK_PURPOSES;
fs.writeFileSync('constants.tsx', content);
