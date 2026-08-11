const fs = require('fs');
let content = fs.readFileSync('src/DeliverySLADetailView.tsx', 'utf-8');

const serviceLevelConfigsRegex = /\s*\{\/\* Service Level Configs \*\/\}(.|\n)*?<\/div>\s*<\/div>\s*<\/div>\s*(?=\{\/\* Cutoff Time & Location Overrides \*\/})/m;
const match = content.match(serviceLevelConfigsRegex);

if (match) {
  const serviceLevelConfigsStr = match[0];
  // Remove it from current position
  content = content.replace(serviceLevelConfigsStr, '\n\n        ');
  
  // Insert it after Alerting
  const alertingEnd = '           )}\n        </div>';
  content = content.replace(alertingEnd, alertingEnd + '\n' + serviceLevelConfigsStr);
  
  fs.writeFileSync('src/DeliverySLADetailView.tsx', content);
  console.log('Successfully moved Service Level Configs');
} else {
  console.log('Could not find Service Level Configs');
}
