const fs = require('fs-extra');
const concat = require('concat');

(async function build(args) {
  const appName = args[2];
  if (!appName) throw Error('Missing argument: app name');
  const files = [
    `./dist/${appName}/runtime.js`,
    `./dist/${appName}/polyfills.js`,
    `./dist/${appName}/main.js`
  ];

  await fs.ensureDir('dist/elements');

  await concat(files, `dist/elements/${appName}.js`);
})(process.argv);
