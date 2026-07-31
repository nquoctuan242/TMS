const fs = require('fs');
let content = fs.readFileSync('constants.tsx', 'utf8');

const mocks = `
export const MOCK_DELIVERY_SLA_CONFIGS: import('./types').DeliverySLAConfig[] = [
  {
    id: '1',
    serviceCode: 'SAMEDAY',
    serviceName: 'Same-day delivery',
    cutoffTime: '14:00',
    beforeCutoffDeliverTime: '23:59',
    beforeCutoffDaysAdd: 0,
    afterCutoffDeliverTime: '13:00',
    afterCutoffDaysAdd: 1,
    lateAlertMinutes: 30,
    storeOverrides: [
      {
        id: 'o1',
        storeId: '1',
        storeName: 'District 1 Store',
        cutoffTime: '12:00',
        beforeCutoffDeliverTime: '23:59',
        beforeCutoffDaysAdd: 0,
        afterCutoffDeliverTime: '13:00',
        afterCutoffDaysAdd: 1,
        effectiveFrom: '2026-01-01'
      },
      {
        id: 'o2',
        storeId: '2',
        storeName: 'Tan Binh Warehouse',
        cutoffTime: '16:00',
        beforeCutoffDeliverTime: '23:59',
        beforeCutoffDaysAdd: 0,
        afterCutoffDeliverTime: '13:00',
        afterCutoffDaysAdd: 1,
        effectiveFrom: '2026-02-15'
      }
    ]
  },
  {
    id: '2',
    serviceCode: 'EXPRESS',
    serviceName: 'Express delivery',
    cutoffTime: '12:00',
    beforeCutoffDeliverTime: '20:00',
    beforeCutoffDaysAdd: 0,
    afterCutoffDeliverTime: '12:00',
    afterCutoffDaysAdd: 1,
    lateAlertMinutes: 15,
    storeOverrides: []
  },
  {
    id: '3',
    serviceCode: 'STANDARD',
    serviceName: 'Standard delivery',
    cutoffTime: '17:00',
    beforeCutoffDeliverTime: '23:59',
    beforeCutoffDaysAdd: 0,
    afterCutoffDeliverTime: '18:00',
    afterCutoffDaysAdd: 2,
    lateAlertMinutes: 60,
    storeOverrides: []
  }
];
`;

content += mocks;
fs.writeFileSync('constants.tsx', content);
console.log('Appended MOCK_DELIVERY_SLA_CONFIGS');
