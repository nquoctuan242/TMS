const fs = require('fs');
let content = fs.readFileSync('src/ZoneRuleListView.tsx', 'utf-8');

content = content.replace(/config.carrierId.toLowerCase/g, 'config.partner.toLowerCase');
content = content.replace(/Search by Carrier ID/g, 'Search by Partner');
content = content.replace(/Carrier ID<\/th>/g, 'Partner</th>');
content = content.replace(/{config.carrierId}<\/td>/g, '{config.partner}</td>');

fs.writeFileSync('src/ZoneRuleListView.tsx', content);
