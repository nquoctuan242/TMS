const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');
content = content.replace(
  "{expandedStoreCarriers[index] && (\n                           <div className=\"mt-2\">",
  "{config.carrierId && expandedStoreCarriers[index] && (\n                           <div className=\"mt-2\">"
);
fs.writeFileSync('App.tsx', content);
