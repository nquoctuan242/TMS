const fs = require('fs');
let content = fs.readFileSync('src/VehicleDetailView.tsx', 'utf-8');
content = content.replace("import { MOCK_STORES } from '../constants';\\nimport { MOCK_STORES } from '../constants';", "import { MOCK_STORES } from '../constants';");
fs.writeFileSync('src/VehicleDetailView.tsx', content);
