const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// Replace "Select Carrier..." with "Select Shipping Carrier Group..."
content = content.replace(
  `<option value="">Select Carrier...</option>`,
  `<option value="">Select Shipping Carrier Group...</option>`
);

// Replace Carrier Settings
content = content.replace(
  `<h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b pb-2">Carrier Settings</h4>`,
  `<h4 className="text-xs font-bold text-[#1b4d3e] uppercase tracking-wider mb-4 border-b pb-2">Shipping Carrier Group Settings</h4>`
);

// Replace "Add Carrier Config"
content = content.replace(
  `<i className="fa-solid fa-plus-circle"></i> Add Carrier Config`,
  `<i className="fa-solid fa-plus-circle"></i> Add Shipping Carrier Group Config`
);

content = content.replace(
  `No carrier configurations for this store.`,
  `No shipping carrier group configurations for this store.`
);

fs.writeFileSync('App.tsx', content);
console.log('Fixed text in App.tsx');
