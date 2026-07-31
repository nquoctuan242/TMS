const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

content = content.replace(/import \{ CostAndFuelView \} from '\.\/src\/CostAndFuelView';\n/g, '');
content = "import { CostAndFuelView } from './src/CostAndFuelView';\n" + content;

fs.writeFileSync('App.tsx', content);
