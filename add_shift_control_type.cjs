const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf8');

const newType = `
export interface ShiftControlConfig {
  id: string;
  stateProvince?: string;
  country: string;
  warnBeforeShiftEndMinutes: number;
  blockDeliveryActionsAtEnd: boolean;
  allowReturnAllAtEnd: boolean;
  createdAt: string;
}
`;

fs.writeFileSync('types.ts', content + newType);
console.log("Added ShiftControlConfig to types.ts");
