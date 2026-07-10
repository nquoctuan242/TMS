const fs = require('fs');
let typesContent = fs.readFileSync('types.ts', 'utf8');

typesContent = typesContent.replace(
  "  showPenaltyAmountOnApp?: boolean;\n  currency?: string;\n  applyOrderTypes?: string[];\n  applyServiceTypes?: string[];",
  "  showPenaltyAmountOnApp?: boolean;\n  currency?: string;\n  applyOrderTypes?: string[];\n  applyServiceTypes?: string[];\n  autoCreateTicket?: boolean;"
);
fs.writeFileSync('types.ts', typesContent);
