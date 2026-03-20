import fs from 'fs';
import path from 'path';

const adminDir = 'c:/Users/lucky/OneDrive/Desktop/MakeTechBerry/client/src/pages/admin';
const files = fs.readdirSync(adminDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(adminDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Pattern 1: BookOpen was put into the react import e.g. import { BookOpen, useEffect, useState } from "react";
  // Fix by removing BookOpen from react import
  content = content.replace(
    /import \{ BookOpen, (useEffect, useState) \} from "react";/g,
    'import { $1 } from "react";'
  );
  content = content.replace(
    /import \{ BookOpen, (useState) \} from "react";/g,
    'import { $1 } from "react";'
  );

  // Pattern 2: If file's lucide-react import does NOT already have BookOpen, add it
  if (content.includes('from "lucide-react"') && !content.includes('BookOpen')) {
    content = content.replace(
      /import \{([^}]+)\} from "lucide-react";/,
      (match, icons) => `import {${icons.trimEnd()}, BookOpen } from "lucide-react";`
    );
  }

  // Pattern 3: Dashboard.jsx lost ALL its import lines, need to re-insert them
  // Detect if the file starts with a menuItem line (no import at top)
  if (content.trimStart().startsWith('{ icon:') || content.trimStart().startsWith('    { icon:')) {
    const originalImports = `import { useEffect, useState } from "react";\r\nimport { useNavigate } from "react-router-dom";\r\nimport { Menu, X, Users, Briefcase, TrendingUp, FileText, ClipboardList, ChevronRight, Search, Download, Filter, Calendar, Mail, Phone, MapPin, ExternalLink, Clock, LogOut, BookOpen } from "lucide-react";\r\nimport { getInternships, getProjects } from "../../services/admin.service.js";\r\n\r\nconst Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {\r\n  const navigate = useNavigate();\r\n  const menuItems = [\n`;
    content = originalImports + content;
    console.log(`Restored imports for: ${file}`);
  } else {
    console.log(`Fixed BookOpen import in: ${file}`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Done!');
