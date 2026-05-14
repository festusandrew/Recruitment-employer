const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (/\.tsx?$/.test(p)) {
      let c = fs.readFileSync(p, 'utf8');
      let r = c.replace(/(from\s+["'][^"']+)@\d+\.\d+\.\d+[^"']*(["'])/g, '$1$2');
      if (c !== r) {
        console.log('Cleaned:', p);
        fs.writeFileSync(p, r, 'utf8');
      }
    }
  });
}

walk('./src');
