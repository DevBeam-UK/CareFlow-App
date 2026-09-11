const fs = require('fs');
const path = require('path');

const exts = ['.ts', '.tsx'];
const skipDirs = ['node_modules', '.next', '.git', 'scripts'];

let filesFixed = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skipDirs.includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (exts.includes(path.extname(entry.name))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const fixed = content.replace(
        /from\s+(@\/[a-zA-Z0-9\/_-]+)\s*;/g,
        'from "$1";'
      );
      if (fixed !== content) {
        fs.writeFileSync(fullPath, fixed, 'utf8');
        filesFixed++;
        console.log('Fixed:', fullPath);
      }
    }
  }
}

walk(process.cwd());
console.log(`\nDone. Fixed ${filesFixed} file(s).`);