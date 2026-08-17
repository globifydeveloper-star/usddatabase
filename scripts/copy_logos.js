const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'src', 'assets', 'images', 'logo2.png');
const targets = ['logo.png', 'logo-dark.png', 'logo-sm.png'];

targets.forEach(target => {
  const dest = path.join(__dirname, '..', 'src', 'assets', 'images', target);
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} to ${dest}`);
});
