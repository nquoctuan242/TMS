const fs = require('fs');
let content = fs.readFileSync('src/VehicleDocumentsView.tsx', 'utf8');

content = content.replace(
  "const licenseInput = document.getElementById('docLicenseInput');",
  "const licenseInput = document.getElementById('docLicenseInput') as HTMLInputElement;"
);

content = content.replace(
  "const typeInput = document.getElementById('docTypeInput');",
  "const typeInput = document.getElementById('docTypeInput') as HTMLSelectElement;"
);

content = content.replace(
  "const docNoInput = document.getElementById('docNoInput');",
  "const docNoInput = document.getElementById('docNoInput') as HTMLInputElement;"
);

content = content.replace(
  "const issueInput = document.getElementById('docIssueInput');",
  "const issueInput = document.getElementById('docIssueInput') as HTMLInputElement;"
);

content = content.replace(
  "const expInput = document.getElementById('docExpInput');",
  "const expInput = document.getElementById('docExpInput') as HTMLInputElement;"
);

fs.writeFileSync('src/VehicleDocumentsView.tsx', content);
