const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf-8');

// Update 'Location overrides' title
content = content.replace(
    '<h3 className="font-bold text-[#111827] text-sm">Location overrides</h3>',
    '<h3 className="font-bold text-[#111827] text-sm">Applied Locations</h3>'
);

// Update description under it
content = content.replace(
    '<p className="text-xs text-gray-500 mt-1">{formData.locationOverrides?.length || 0} locations override the default for this service</p>',
    '<p className="text-xs text-gray-500 mt-1">{formData.locationOverrides?.length || 0} locations applying this config</p>'
);

// Update button text
content = content.replace(
    '<i className="fa-solid fa-plus"></i> Add override',
    '<i className="fa-solid fa-plus"></i> Add location'
);

// Update date formatting in Example Config auto-run
// First, replace the label Date format
content = content.replace(
    /\{new Date\(\)\.toLocaleDateString\('en-GB', \{ weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' \}\)\}/g,
    "{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}"
);

// Next, replace the other two dates
content = content.replace(
    /\{new Date\(Date\.now\(\) \+ \(formData\.beforeCutoffDaysAdd \|\| 0\) \* 86400000\)\.toLocaleDateString\('en-GB', \{ weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' \}\)\}/g,
    "{new Date(Date.now() + (formData.beforeCutoffDaysAdd || 0) * 86400000).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}"
);

content = content.replace(
    /\{new Date\(Date\.now\(\) \+ \(formData\.afterCutoffDaysAdd \|\| 0\) \* 86400000\)\.toLocaleDateString\('en-GB', \{ weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' \}\)\}/g,
    "{new Date(Date.now() + (formData.afterCutoffDaysAdd || 0) * 86400000).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}"
);

fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
console.log("Updated!");
