const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// The imports might look like:
// import { VehicleDocumentsView } from './src/VehicleDocumentsView';
// import { VehicleDocumentsView } from './src/VehicleDocumentsView';
const importRegex = /import \{ VehicleDocumentsView \} from '\.\/src\/VehicleDocumentsView';\n/g;
const matches = content.match(importRegex);
if (matches && matches.length > 1) {
    // replace all with one
    content = content.replace(importRegex, '');
    content = `import { VehicleDocumentsView } from './src/VehicleDocumentsView';\n` + content;
}

fs.writeFileSync('App.tsx', content);
