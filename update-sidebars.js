import fs from 'fs';
import path from 'path';

const adminDir = 'c:/Users/lucky/OneDrive/Desktop/MakeTechBerry/client/src/pages/admin';
const files = fs.readdirSync(adminDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add BookOpen icon import if lucide-react is imported
  if (content.includes('lucide-react')) {
    if (!content.includes('BookOpen,')) {
      content = content.replace('import {', 'import { BookOpen,');
    }
  }

  // Add the Workshops menu item before Reports
  const menuItemString = '{ icon: FileText, label: "Reports", path: "/admin/reports", active: false }';
  const newMenuItemString = '{ icon: BookOpen, label: "Workshops", path: "/admin/workshops", active: false },\n    ' + menuItemString;
  
  if (content.includes(menuItemString)) {
    content = content.replace(menuItemString, newMenuItemString);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
