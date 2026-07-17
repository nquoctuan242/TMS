const fs = require('fs');

let detailContent = fs.readFileSync('src/LandingCostDetailView.tsx', 'utf8');
detailContent = detailContent.replace(
  "import { LandingCostConfig, Store } from '../types';",
  "import { LandingCostConfig } from '../types';"
);
detailContent = detailContent.replace(
  "stores: Store[];",
  "stores: any[];"
);
detailContent = detailContent.replace(
  "stores.map((store: Store)",
  "stores.map((store: any)"
);
fs.writeFileSync('src/LandingCostDetailView.tsx', detailContent);
console.log("Updated detail store type!");
