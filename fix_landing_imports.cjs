const fs = require('fs');

let detailContent = fs.readFileSync('src/LandingCostDetailView.tsx', 'utf8');
detailContent = detailContent.replace(
  "import { LandingCostConfig, Store } from './types';",
  "import { LandingCostConfig, Store } from '../types';"
);
fs.writeFileSync('src/LandingCostDetailView.tsx', detailContent);

let listContent = fs.readFileSync('src/LandingCostListView.tsx', 'utf8');
listContent = listContent.replace(
  "import { LandingCostConfig } from './types';",
  "import { LandingCostConfig } from '../types';"
);
fs.writeFileSync('src/LandingCostListView.tsx', listContent);

let appContent = fs.readFileSync('App.tsx', 'utf8');
appContent = appContent.replace(
  "import { LandingCostListView } from './LandingCostListView';",
  "import { LandingCostListView } from './src/LandingCostListView';"
);
appContent = appContent.replace(
  "import { LandingCostDetailView } from './LandingCostDetailView';",
  "import { LandingCostDetailView } from './src/LandingCostDetailView';"
);
fs.writeFileSync('App.tsx', appContent);
console.log("Updated imports!");
