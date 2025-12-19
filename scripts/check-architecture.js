#!/usr/bin/env node

/**
 * Architecture Enforcement Script
 * 
 * Checks for violations of architecture rules:
 * - R3: page.tsx must NOT contain "use client" or hooks
 * - R8: ui/** components must NOT contain hooks or store imports
 * - R4: Every route must have factory.tsx
 * - R5: Controllers must exist in src/components/**/controller/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOOKS = [
  'useState',
  'useEffect',
  'useMemo',
  'useCallback',
  'useRef',
  'useContext',
  'useReducer',
  'useLanguage',
  'useTheme',
  'useMirror',
  'useMirrorRegistry',
];

const STORE_IMPORTS = [
  'from \'@/store',
  'from "@/store',
  'from \'../store',
  'from "./store',
  'from \'../../store',
  'from "@/components',
];

let errors = [];
let warnings = [];

function checkFile(filePath, rules) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  rules.forEach((rule, index) => {
    if (rule.test(content)) {
      const lineNum = content.substring(0, content.search(rule)).split('\n').length;
      errors.push({
        file: filePath,
        line: lineNum,
        rule: `R${index + 1}`,
        message: rule.message || 'Violation found',
      });
    }
  });
}

function findFiles(dir, pattern, excludeDirs = []) {
  const files = [];
  const projectRoot = path.resolve(__dirname, '..');
  
  function walk(currentPath) {
    if (!fs.existsSync(currentPath)) {
      return;
    }
    
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        const shouldExclude = excludeDirs.some(exclude => 
          fullPath.includes(exclude) || item === exclude
        );
        if (!shouldExclude && !item.startsWith('.') && item !== 'node_modules') {
          walk(fullPath);
        }
      } else if (pattern.test(item)) {
        files.push(path.relative(projectRoot, fullPath));
      }
    }
  }
  
  const targetDir = path.resolve(projectRoot, dir);
  walk(targetDir);
  return files;
}

// Check R3: page.tsx must NOT contain "use client" or hooks
function checkPageFiles() {
  const pageFiles = findFiles('app', /^page\.tsx$/);
  const projectRoot = path.resolve(__dirname, '..');
  
  pageFiles.forEach(file => {
    const fullPath = path.join(projectRoot, file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    
    // Check for "use client"
    if (content.includes("'use client'") || content.includes('"use client"')) {
      errors.push({
        file,
        rule: 'R3',
        message: 'page.tsx must NOT contain "use client"',
      });
    }
    
    // Check for hooks
    HOOKS.forEach(hook => {
      if (content.includes(hook)) {
        errors.push({
          file,
          rule: 'R3',
          message: `page.tsx must NOT contain hooks (found: ${hook})`,
        });
      }
    });
    
    // Check that it only renders Factory
    if (!content.includes('Factory') && !content.includes('factory')) {
      warnings.push({
        file,
        rule: 'R3',
        message: 'page.tsx should render Factory component',
      });
    }
  });
}

// Check R8: ui/** components must NOT contain hooks or store imports
function checkUIComponents() {
  const uiFiles = findFiles('app', /\.tsx$/, []);
  const uiComponents = uiFiles.filter(file => 
    file.includes('/ui/') && !file.includes('index.tsx')
  );
  const projectRoot = path.resolve(__dirname, '..');
  
  uiComponents.forEach(file => {
    const fullPath = path.join(projectRoot, file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    
    // Check for hooks (except in comments)
    HOOKS.forEach(hook => {
      const hookRegex = new RegExp(`\\b${hook}\\s*\\(`, 'g');
      if (hookRegex.test(content)) {
        // Allow if it's in a comment
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (hookRegex.test(line) && !line.trim().startsWith('//') && !line.trim().startsWith('*')) {
            errors.push({
              file,
              line: index + 1,
              rule: 'R8',
              message: `UI component must NOT contain hooks (found: ${hook})`,
            });
          }
        });
      }
    });
    
    // Check for store imports
    STORE_IMPORTS.forEach(storeImport => {
      if (content.includes(storeImport)) {
        errors.push({
          file,
          rule: 'R8',
          message: `UI component must NOT import from store (found: ${storeImport})`,
        });
      }
    });
  });
}

// Check R4: Every route must have factory.tsx
function checkFactories() {
  const routes = [];
  const projectRoot = path.resolve(__dirname, '..');
  
  function findRoutes(dir) {
    if (!fs.existsSync(dir)) {
      return;
    }
    
    const items = fs.readdirSync(dir);
    const hasPage = items.includes('page.tsx');
    
    if (hasPage) {
      routes.push(path.relative(projectRoot, dir));
    }
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        findRoutes(fullPath);
      }
    });
  }
  
  findRoutes(path.join(projectRoot, 'app'));
  
  routes.forEach(route => {
    const factoryPath = path.join(projectRoot, route, 'factory.tsx');
    if (!fs.existsSync(factoryPath)) {
      errors.push({
        file: route,
        rule: 'R4',
        message: 'Route must have factory.tsx',
      });
    }
  });
}

// Check R5: Controllers must exist for routes that need orchestration
function checkControllers() {
  // This is a soft check - we'll just verify structure exists
  const controllerDirs = findFiles('src/components', /controller/, []);
  
  if (controllerDirs.length === 0) {
    warnings.push({
      file: 'src/components',
      rule: 'R5',
      message: 'No controller directories found. Verify controllers exist for routes that need orchestration.',
    });
  }
}

// Main execution
console.log('🔍 Running architecture checks...\n');

try {
  checkPageFiles();
  checkUIComponents();
  checkFactories();
  checkControllers();
} catch (error) {
  console.error('❌ Error running checks:', error);
  process.exit(1);
}

// Report results
if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All architecture checks passed!\n');
  process.exit(0);
}

if (errors.length > 0) {
  console.log(`❌ Found ${errors.length} error(s):\n`);
  errors.forEach((error, index) => {
    console.log(`${index + 1}. [${error.rule}] ${error.file}`);
    if (error.line) {
      console.log(`   Line ${error.line}: ${error.message}`);
    } else {
      console.log(`   ${error.message}`);
    }
    console.log('');
  });
}

if (warnings.length > 0) {
  console.log(`⚠️  Found ${warnings.length} warning(s):\n`);
  warnings.forEach((warning, index) => {
    console.log(`${index + 1}. [${warning.rule}] ${warning.file}`);
    console.log(`   ${warning.message}\n`);
  });
}

process.exit(errors.length > 0 ? 1 : 0);

