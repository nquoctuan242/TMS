const fs = require('fs');
let content = fs.readFileSync('constants.ts', 'utf8');

const newMock = `
export const MOCK_SHIFT_CONTROL_CONFIGS: import('./types').ShiftControlConfig[] = [
  {
    id: '1',
    country: 'Vietnam (VN)',
    stateProvince: '',
    warnBeforeShiftEndMinutes: 30,
    blockDeliveryActionsAtEnd: true,
    allowReturnAllAtEnd: true,
    createdAt: '2026-07-12T10:00:00Z'
  },
  {
    id: '2',
    country: 'Vietnam (VN)',
    stateProvince: 'Ho Chi Minh',
    warnBeforeShiftEndMinutes: 15,
    blockDeliveryActionsAtEnd: true,
    allowReturnAllAtEnd: false,
    createdAt: '2026-07-12T11:00:00Z'
  }
];
`;

fs.writeFileSync('constants.ts', content + newType); // Wait, this is wrong. Let me fix the script.
