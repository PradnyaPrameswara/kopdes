import fs from 'node:fs';
import path from 'node:path';

let failed = false;

function error(msg) {
  console.error(`\x1b[31m[AUDIT FAILED]\x1b[0m ${msg}`);
  failed = true;
}

function success(msg) {
  console.log(`\x1b[32m[AUDIT PASSED]\x1b[0m ${msg}`);
}

function walk(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        walk(fullPath, fileList);
      }
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

// 1. Check for useEffect / useLayoutEffect in src/
const srcFiles = walk('src').filter((f) => /\.(ts|tsx|astro)$/.test(f));
for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (/\b(useEffect|useLayoutEffect)\b/.test(content)) {
    error(`Forbidden useEffect/useLayoutEffect in ${file}`);
  }
  if (/\b(forwardRef|defaultProps)\b/.test(content)) {
    error(`Legacy React pattern (forwardRef/defaultProps) in ${file}`);
  }
  if (/\b(ReactDOM\.render)\b/.test(content)) {
    error(`Legacy React pattern (ReactDOM.render) in ${file}`);
  }
  if (/\brequire\(/.test(content) || /\bmodule\.exports\b/.test(content)) {
    error(`CommonJS detected in ${file}`);
  }
  if (/:\s*any\b/.test(content)) {
    error(`Explicit : any type detected in ${file}`);
  }
  if (/@ts-ignore/.test(content)) {
    error(`@ts-ignore detected in ${file} (use @ts-expect-error with reason)`);
  }
}

// 2. Check for Radix UI packages
const forbiddenRadixPatterns = [/@radix-ui\//, /\bradix-ui\b/];
const pkgJson = fs.existsSync('package.json') ? fs.readFileSync('package.json', 'utf8') : '';
for (const pat of forbiddenRadixPatterns) {
  if (pat.test(pkgJson)) {
    error(`Radix UI package detected in package.json`);
  }
}

for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  for (const pat of forbiddenRadixPatterns) {
    if (pat.test(content)) {
      error(`Radix UI import detected in ${file}`);
    }
  }
}

// 3. Check for tailwind.config.* or @astrojs/tailwind
const rootFiles = fs.readdirSync('.');
for (const file of rootFiles) {
  if (/^tailwind\.config\.[a-z]+$/.test(file)) {
    error(`Legacy Tailwind config file found: ${file}`);
  }
}
if (pkgJson.includes('@astrojs/tailwind')) {
  error(`Legacy @astrojs/tailwind found in package.json`);
}

if (failed) {
  process.exit(1);
} else {
  success('All audit rules passed cleanly (0 useEffect, 0 radix-ui, 0 legacy patterns, strict types).');
}
