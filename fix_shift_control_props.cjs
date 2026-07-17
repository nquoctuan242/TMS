const fs = require('fs');
let content = fs.readFileSync('src/ShiftControlDetailView.tsx', 'utf8');

content = content.replace(/configId: string \| null;/g, 'configId: string | null;\n  stores: any[];');
content = content.replace(/export function ShiftControlDetailView\(\{ configId, onBack \}: ShiftControlDetailViewProps\) \{/g, 'export function ShiftControlDetailView({ configId, onBack, stores }: ShiftControlDetailViewProps) {');
fs.writeFileSync('src/ShiftControlDetailView.tsx', content);

let appContent = fs.readFileSync('App.tsx', 'utf8');
appContent = appContent.replace(/<ShiftControlDetailView\n               configId=\{selectedShiftControlId\}/g, '<ShiftControlDetailView\n               stores={stores}\n               configId={selectedShiftControlId}');
fs.writeFileSync('App.tsx', appContent);

console.log("Updated props!");
