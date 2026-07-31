const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf8');

const interfaceStr = `export interface ShiftBreakConfig {
  id: string;
  startTime: string;
  endTime: string;
  warnBeforeMinutes: number;
  isActive: boolean;
  turnOffApp: boolean;
}

export interface ShiftControlConfig {`;

content = content.replace('export interface ShiftControlConfig {', interfaceStr);

const propsStr = `  blockDeliveryActionsAtEnd: boolean;
  allowReturnAllAtEnd: boolean;
  restBreaks?: ShiftBreakConfig[];
  mealBreaks?: ShiftBreakConfig[];
  createdAt: string;`;

content = content.replace(/blockDeliveryActionsAtEnd: boolean;\s*allowReturnAllAtEnd: boolean;\s*createdAt: string;/, propsStr);

fs.writeFileSync('types.ts', content);
console.log('types.ts updated');
