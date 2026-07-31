const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf8');

// The modal starts around line 5665 and ends at 5744.
const modalStart = `{showConfigModal && (`;
const modalEnd = `                )}
             </div>
          ) : currentView === 'user-list' ? (`;

const startIndex = content.indexOf(modalStart);
const endIndex = content.indexOf(modalEnd);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + content.substring(endIndex + 19);
  
  // Now remove state variables
  content = content.replace(/const \[serviceDeliveryConfigs, sets\] = useState<\[\]>\([\s\S]*?\);\n/g, '');
  content = content.replace(/const \[showConfigModal, setShowConfigModal\] = useState\(false\);\n/g, '');
  
  fs.writeFileSync('App.tsx', content);
  console.log('Removed modal');
} else {
  console.log('Could not find modal', startIndex, endIndex);
}
