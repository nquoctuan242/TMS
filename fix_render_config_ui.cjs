const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

content = content.replace(
    '  const renderConfigDetails = (data: any, onChange: (newData: any) => void) => (\n    <div className="pl-4 ml-3 border-l-2 border-gray-200 pt-2">',
    '  const renderConfigDetails = (data: any, onChange: (newData: any) => void) => (\n    <div className="">'
);

fs.writeFileSync('App.tsx', content);
