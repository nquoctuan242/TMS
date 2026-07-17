const fs = require('fs');

let content = fs.readFileSync('src/LandingCostListView.tsx', 'utf8');

// Add onOpenCalculator to props if not there
if (!content.includes('onOpenCalculator')) {
  content = content.replace(
    "interface LandingCostListViewProps {\n  configs: LandingCostConfig[];\n  onAddNew: () => void;\n  onEdit: (config: LandingCostConfig) => void;\n}",
    "interface LandingCostListViewProps {\n  configs: LandingCostConfig[];\n  onAddNew: () => void;\n  onEdit: (config: LandingCostConfig) => void;\n  onOpenCalculator: () => void;\n}"
  );

  content = content.replace(
    "export function LandingCostListView({ configs, onAddNew, onEdit }: LandingCostListViewProps) {",
    "export function LandingCostListView({ configs, onAddNew, onEdit, onOpenCalculator }: LandingCostListViewProps) {"
  );

  // Add the button next to Add Config
  const buttons = `<div className="flex gap-3">
            <button 
              onClick={onOpenCalculator}
              className="bg-white text-gray-700 border border-gray-300 px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 shadow-sm transition-colors flex items-center gap-2"
            >
              <i className="fa-solid fa-calculator"></i> Calculator
            </button>
            <button 
              onClick={onAddNew}
              className="bg-[#1b4d3e] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#153a2f] shadow-sm transition-colors flex items-center gap-2"
            >
              <i className="fa-solid fa-plus"></i> Add Config
            </button>
          </div>`;

  content = content.replace(
    /<button\s+onClick=\{onAddNew\}[\s\S]*?<\/button>/,
    buttons
  );

  fs.writeFileSync('src/LandingCostListView.tsx', content);
  console.log("Updated LandingCostListView");
} else {
  console.log("LandingCostListView already updated");
}
