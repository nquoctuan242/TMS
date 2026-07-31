const fs = require('fs');

let content = fs.readFileSync('types.ts', 'utf8');

content = content.replace(
  /export interface VehicleDocument \{/,
  "export interface VehicleDocument {\n  issueDate?: string;"
);

content = content.replace(
  /export interface Vehicle \{/,
  "export interface Vehicle {\n  fuelQuota?: string;"
);

fs.writeFileSync('types.ts', content);
console.log("Updated types.ts");
