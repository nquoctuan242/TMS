const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf8');

const regex = /export interface ServiceDeliveryConfig \{[\s\S]*?\}/;

const newTypes = `export interface DeliverySLAStoreOverride {
  id: string;
  storeId: string;
  storeName: string;
  cutoffTime: string;
  beforeCutoffDeliverTime: string;
  beforeCutoffDaysAdd: number;
  afterCutoffDeliverTime: string;
  afterCutoffDaysAdd: number;
  effectiveFrom: string;
}

export interface DeliverySLAConfig {
  id: string;
  serviceCode: string;
  serviceName: string;
  cutoffTime: string;
  beforeCutoffDeliverTime: string;
  beforeCutoffDaysAdd: number;
  afterCutoffDeliverTime: string;
  afterCutoffDaysAdd: number;
  lateAlertMinutes: number;
  storeOverrides: DeliverySLAStoreOverride[];
}`;

content = content.replace(regex, newTypes);
fs.writeFileSync('types.ts', content);
console.log('Updated types.ts');
