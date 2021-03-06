let wdioConfig = require('./wdio.conf').config;
// Copying configuration
let ciConfig = Object.assign({}, wdioConfig);
// Overriding some properties for CI runs
ciConfig.hostname = 'staging-na01-platinumperformance.demandware.net';
// avoiding starting selenium server locally
ciConfig.services = undefined;
// Additional information for selenoid server
ciConfig.capabilities[0]['selenoid:options'] = {
  enableVNC: true,
  name: `STARTIT ${require('./package.json').name}`
};
exports.config = ciConfig;
