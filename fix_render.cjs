const fs = require('fs');
let content = fs.readFileSync('src/ShiftControlDetailView.tsx', 'utf8');

const regex = /  const renderBreakList = \(\w+, \w+, \w+\) => \{[\s\S]*?\};\n/;
const match = content.match(regex);
if (match) {
    let extracted = match[0];
    content = content.replace(extracted, '');
    
    // Insert before "return ("
    const returnPoint = '  return (\n    <div className="flex flex-col h-full bg-[#f8f9fa]">';
    content = content.replace(returnPoint, extracted + '\n' + returnPoint);
    fs.writeFileSync('src/ShiftControlDetailView.tsx', content);
    console.log('Fixed renderBreakList location');
} else {
    console.log('Could not find renderBreakList');
}
