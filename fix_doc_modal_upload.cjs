const fs = require('fs');
let content = fs.readFileSync('src/VehicleDocumentsView.tsx', 'utf8');

const targetStr = `              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Issue Date</label>
                  <input type="date" defaultValue={editingDoc?.issueDate ? editingDoc.issueDate.split('/').reverse().join('-') : ''} id="docIssueInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Expiration Date</label>
                  <input type="date" defaultValue={editingDoc?.expiration ? editingDoc.expiration.split('/').reverse().join('-') : ''} id="docExpInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
                </div>
              </div>`;

const newStr = `              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Issue Date</label>
                  <input type="date" defaultValue={editingDoc?.issueDate ? editingDoc.issueDate.split('/').reverse().join('-') : ''} id="docIssueInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Expiration Date</label>
                  <input type="date" defaultValue={editingDoc?.expiration ? editingDoc.expiration.split('/').reverse().join('-') : ''} id="docExpInput" className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#2563eb]" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Scanned Certificate</label>
                <div className="flex items-center gap-2">
                  <label className="flex-1 cursor-pointer bg-gray-50 border border-gray-300 border-dashed rounded-lg px-4 py-3 text-center hover:bg-gray-100 transition-colors flex flex-col items-center justify-center">
                    <i className="fa-solid fa-cloud-arrow-up text-gray-400 text-lg mb-1"></i>
                    <span className="text-xs text-gray-500 font-medium">Click to upload file (PDF, JPG)</span>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>`;

content = content.replace(targetStr, newStr);

fs.writeFileSync('src/VehicleDocumentsView.tsx', content);
