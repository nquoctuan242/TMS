const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf-8');

const startStr = '{/* Service Level Configs Table */}';
const startIndex = content.indexOf(startStr);
if (startIndex !== -1) {
  // Find the end of this block
  // This block has <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
  // We need to find the matching closing div.
  // Actually, let's just find the next block: '{/* Alerting */}'
  const alertingStr = '{/* Alerting */}';
  const alertingIndex = content.indexOf(alertingStr);
  
  if (alertingIndex !== -1) {
    const slcBlock = content.substring(startIndex, alertingIndex);
    
    // Remove it from current position
    content = content.replace(slcBlock, '');
    
    // Now find where Alerting ends.
    // It ends at:
    //             </div>
    //           )}
    //        </div>
    const alertingEndStr = '           )}\n        </div>';
    const alertingEndIndex = content.indexOf(alertingEndStr);
    
    if (alertingEndIndex !== -1) {
      const insertionPoint = alertingEndIndex + alertingEndStr.length;
      content = content.substring(0, insertionPoint) + '\n\n        ' + slcBlock + content.substring(insertionPoint);
      fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
      console.log('Successfully reordered correctly');
    } else {
      console.log('Could not find Alerting end');
    }
  } else {
    console.log('Could not find Alerting');
  }
} else {
  console.log('Could not find startStr');
}
