const fs = require('fs');
let app = fs.readFileSync('App.tsx', 'utf-8');

app = app.replace(`    setCurrentView('region-list');
  };
    } else {
    }
  };`, `    setCurrentView('region-list');
  };`);

// And let's check the end of the file where the other error was: App.tsx(9584,1): error TS1128: Declaration or statement expected.
fs.writeFileSync('App.tsx', app);
