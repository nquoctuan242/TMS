const fs = require('fs');

function fix(file) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\\\`/g, '`');
  fs.writeFileSync(file, content);
}

fix('src/DeliverySLAListView.tsx');
fix('src/DeliverySLADetailView.tsx');
console.log('Fixed');
