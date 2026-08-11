const fs = require('fs');
let content = fs.readFileSync('App.tsx', 'utf-8');

// 1. Add import
content = content.replace(
  "import { ZoneMatrixDetailView } from \"./src/ZoneMatrixDetailView\";",
  "import { ZoneMatrixDetailView } from \"./src/ZoneMatrixDetailView\";\nimport { ServicePricingListView } from \"./src/ServicePricingListView\";"
);

// 2. Add 'Annexes' and 'List of service price' to tabs in contract-list
const oldTabs = `                    <button onClick={() => setActiveContractTab('List of Charges')} className={\`text-xs font-bold pb-2 transition-all border-b-2 \${activeContractTab === 'List of Charges' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}\`}>List of Charges</button>
                    <button onClick={() => setActiveContractTab('Remote Area Surcharges')} className={\`text-xs font-bold pb-2 transition-all border-b-2 \${activeContractTab === 'Remote Area Surcharges' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}\`}>Remote Area Surcharges</button>
                    <button onClick={() => setActiveContractTab('Extra Fees')} className={\`text-xs font-bold pb-2 transition-all border-b-2 \${activeContractTab === 'Extra Fees' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}\`}>Extra Fees</button>`;

const newTabs = `                    <button onClick={() => setActiveContractTab('Annexes')} className={\`text-xs font-bold pb-2 transition-all border-b-2 \${activeContractTab === 'Annexes' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}\`}>Annexes</button>
                    <button onClick={() => setActiveContractTab('List of service price')} className={\`text-xs font-bold pb-2 transition-all border-b-2 \${activeContractTab === 'List of service price' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}\`}>List of service price</button>
                    <button onClick={() => setActiveContractTab('List of Charges')} className={\`text-xs font-bold pb-2 transition-all border-b-2 \${activeContractTab === 'List of Charges' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}\`}>List of Charges</button>
                    <button onClick={() => setActiveContractTab('Remote Area Surcharges')} className={\`text-xs font-bold pb-2 transition-all border-b-2 \${activeContractTab === 'Remote Area Surcharges' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}\`}>Remote Area Surcharges</button>
                    <button onClick={() => setActiveContractTab('Extra Fees')} className={\`text-xs font-bold pb-2 transition-all border-b-2 \${activeContractTab === 'Extra Fees' ? 'text-[#1b4d3e] border-[#4d9e5f]' : 'text-gray-400 border-transparent hover:text-gray-600'}\`}>Extra Fees</button>`;

content = content.replace(oldTabs, newTabs);

// 3. Update the content based on activeContractTab
// Currently it renders the "International (VN - US)" content directly under the tabs
const oldContent = `               <div className="p-4 space-y-6">
                  <h2 className="text-[#4d9e5f] font-bold text-sm">International (VN - US)</h2>`;

const newContent = `               <div className="p-4 space-y-6">
                  {activeContractTab === 'List of service price' ? (
                     <ServicePricingListView />
                  ) : activeContractTab === 'Annexes' ? (
                     <div className="text-gray-500 py-10 text-center">Annexes Content</div>
                  ) : (
                    <>
                      <h2 className="text-[#4d9e5f] font-bold text-sm">International (VN - US)</h2>`;

content = content.replace(oldContent, newContent);

// And close the fragment at the end of the contract-list section
// Look for `) : currentView === 'company-list' ? (`
const oldEnd = `                     </div>
                  </div>
               </div>
            </div>
          ) : currentView === 'company-list' ? (`;

const newEnd = `                     </div>
                  </div>
                    </>
                  )}
               </div>
            </div>
          ) : currentView === 'company-list' ? (`;

content = content.replace(oldEnd, newEnd);

// 4. Update the default activeContractTab
content = content.replace(
  "const [activeContractTab, setActiveContractTab] = useState('Remote Area Surcharges');",
  "const [activeContractTab, setActiveContractTab] = useState('List of service price');"
);

fs.writeFileSync('App.tsx', content);
