const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf8');

const regex = /export const MOCK_DELIVERY_SLA_CONFIGS: import\('\.\/types'\)\.DeliverySLAConfig\[\] = \[[\s\S]*?\];/;

const newArray = `export const MOCK_DELIVERY_SLA_CONFIGS: import('./types').DeliverySLAConfig[] = [
  {
    id: '1',
    serviceCode: 'SAMEDAY',
    serviceName: 'Same-day delivery',
    cutoffTime: '12:00',
    beforeCutoffDeliverTime: '23:59',
    beforeCutoffDaysAdd: 0,
    afterCutoffDeliverTime: '18:00',
    afterCutoffDaysAdd: 1,
    lateAlertMinutes: 30,
    locationOverrides: [
      {
        id: 'o1',
        country: 'Vietnam (VN)', stateProvince: 'Ho Chi Minh', storeId: '1',
        effectiveFrom: '2026-01-01'
      },
      {
        id: 'o2',
        country: 'Vietnam (VN)', stateProvince: 'Ho Chi Minh', storeId: '2',
        effectiveFrom: '2026-02-15'
      }
    ]
  },
  {
    id: '2',
    serviceCode: 'EXPRESS',
    serviceName: 'Express delivery',
    cutoffTime: '14:00',
    beforeCutoffDeliverTime: '23:59',
    beforeCutoffDaysAdd: 0,
    afterCutoffDeliverTime: '12:00',
    afterCutoffDaysAdd: 1,
    lateAlertMinutes: 15,
    locationOverrides: []
  },
  {
    id: '3',
    serviceCode: 'STANDARD',
    serviceName: 'Standard delivery',
    cutoffTime: '16:00',
    beforeCutoffDeliverTime: '18:00',
    beforeCutoffDaysAdd: 2,
    afterCutoffDeliverTime: '18:00',
    afterCutoffDaysAdd: 3,
    lateAlertMinutes: 60,
    locationOverrides: []
  }
];`;

content = content.replace(regex, newArray);
fs.writeFileSync('constants.tsx', content);
console.log('constants updated');
