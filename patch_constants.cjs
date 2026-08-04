const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf-8');

const MOCK_STORES = `
export const MOCK_STORES = [
  { id: '1', name: 'Store 123 (District 1)' },
  { id: '2', name: 'Store 456 (District 3)' },
  { id: '3', name: 'Store 789 (District 5)' },
  { id: '4', name: 'Store 999 (Binh Thanh)' },
  { id: '5', name: 'Store 888 (Phu Nhuan)' }
];
`;

content = content + '\n' + MOCK_STORES;
fs.writeFileSync('constants.tsx', content);
