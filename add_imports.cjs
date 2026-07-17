const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

const targetImport = `import { TicketContentDetailView } from './src/TicketContentDetailView';`;
const replaceImport = `import { TicketContentDetailView } from './src/TicketContentDetailView';\nimport { UserStoreAccessListView } from './src/UserStoreAccessListView';\nimport { UserStoreAccessDetailView } from './src/UserStoreAccessDetailView';`;

if (content.includes(targetImport)) {
    content = content.replace(targetImport, replaceImport);
    fs.writeFileSync('App.tsx', content);
    console.log("Imports added!");
} else {
    console.log("Target import not found!");
}
