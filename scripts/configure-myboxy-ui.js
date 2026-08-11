const fs = require('fs');
const path = require('path');

const configPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'MyBoxyUI',
  'react-native.config.js',
);

// MyBoxyUI ships components only; its example native projects must not autolink.
fs.writeFileSync(
  configPath,
  `module.exports = {
  platforms: {
    android: {},
    ios: {},
  },
};
`,
);
