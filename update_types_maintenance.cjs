const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf8');

const maintenanceType = `
export interface VehicleMaintenance {
  id: string;
  date: string;
  type: 'periodic' | 'repair';
  content: string;
  mileage: number;
  cost: number;
}

export interface VehicleCosts {
  fuelCost: number;
  maintenanceCost: number;
  fines: number;
  costPerKm: number;
  month: number;
}
`;

content = content + maintenanceType;

// Add them to Vehicle
content = content.replace(
  /export interface Vehicle \{/,
  "export interface Vehicle {\n  maintenanceRecords?: VehicleMaintenance[];\n  costs?: VehicleCosts;"
);

fs.writeFileSync('types.ts', content);
