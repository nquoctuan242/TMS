const fs = require('fs');
let content = fs.readFileSync('src/VehicleDocumentsView.tsx', 'utf8');

const saveStr = `                 const newDoc = {
                    id: editingDoc?.id || Date.now().toString(),
                    licensePlate: licenseInput.value,
                    type: typeInput.value,
                    docNo: docNoInput.value,
                    issueDate: formatDate(issueInput.value),
                    expiration: formatDate(expInput.value),
                    remaining: 365,
                    status: 'Valid',
                    hasScan: false
                 };`;

const newSaveStr = `                 const scanInput = document.getElementById('docScanInput') as HTMLInputElement;
                 const newDoc = {
                    id: editingDoc?.id || Date.now().toString(),
                    licensePlate: licenseInput.value,
                    type: typeInput.value,
                    docNo: docNoInput.value,
                    issueDate: formatDate(issueInput.value),
                    expiration: formatDate(expInput.value),
                    remaining: 365,
                    status: 'Valid',
                    hasScan: scanInput?.files?.length ? true : (editingDoc ? editingDoc.hasScan : false)
                 };`;

content = content.replace(saveStr, newSaveStr);

// add id to file input
const fileInputStr = `<input type="file" className="hidden" />`;
const newFileInputStr = `<input type="file" id="docScanInput" className="hidden" />`;
content = content.replace(fileInputStr, newFileInputStr);

fs.writeFileSync('src/VehicleDocumentsView.tsx', content);
