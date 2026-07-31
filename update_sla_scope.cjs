const fs = require('fs');

// 1. Update types.ts
let typesContent = fs.readFileSync('types.ts', 'utf8');
typesContent = typesContent.replace(/export interface DeliverySLAStoreOverride \{[\s\S]*?\}/, `export interface DeliverySLALocationOverride {
  id: string;
  country: string;
  stateProvince?: string;
  storeId?: string;
  cutoffTime: string;
  beforeCutoffDeliverTime: string;
  beforeCutoffDaysAdd: number;
  afterCutoffDeliverTime: string;
  afterCutoffDaysAdd: number;
  effectiveFrom: string;
}`);
typesContent = typesContent.replace(/storeOverrides: DeliverySLAStoreOverride\[\];/, `locationOverrides: DeliverySLALocationOverride[];`);
fs.writeFileSync('types.ts', typesContent);

// 2. Update constants.tsx
let constantsContent = fs.readFileSync('constants.tsx', 'utf8');
constantsContent = constantsContent.replace(/storeOverrides/g, 'locationOverrides');
constantsContent = constantsContent.replace(/storeId: '1',\n\s*storeName: 'District 1 Store',/g, `country: 'Vietnam (VN)', stateProvince: 'Ho Chi Minh', storeId: '1',`);
constantsContent = constantsContent.replace(/storeId: '2',\n\s*storeName: 'Tan Binh Warehouse',/g, `country: 'Vietnam (VN)', stateProvince: 'Ho Chi Minh', storeId: '2',`);
fs.writeFileSync('constants.tsx', constantsContent);

console.log('types and constants updated');
