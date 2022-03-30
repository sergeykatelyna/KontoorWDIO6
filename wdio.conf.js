process.env.TS_NODE_FILES = true;
require('ts-node').register();
// let baseUrl = 'https://storefront:kontoor@staging-na01-kontoor.demandware.net';

if (process.env.SUITE_TO_RUN) {
  let MY_TESTS = {
    SMOKE: './tests/**/1.ts',
    FULL_REGRESSION: './tests/**/2.ts'
  };

  const SPECS = a[process.env.SUITE_TO_RUN];
}

const timeout = process.env.DEBUG ? 999999999 : 300000;

const wdioConfig = {
  baseUrl: 'https://storefront:kontoor@',
  // hostname: 'hub.testingbot.com',
  // services: ['testingbot'],
  waitforTimeout: 20000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  runner: 'local',
  hostname: 'localhost',
  // services: ['selenium-standalone'],
  services: [
    ['selenium-standalone', { drivers: { firefox: 'latest', chrome: 'latest', chromiumedge: 'latest' }, skipSeleniumInstall: true }]
  ],
  port: 4444,
  hostname: 'localhost',
  path: '/wd/hub',
  // specs: ['./test/kontoor-tests/*/*/*.ts'],
  specs: ['./test/specs/**/checkoutWithDotpay.ts'],
  sync: true,
  logLevel: 'warn',
  user: '22ccc3a02857edda11703d8d2a4c3d17',
  key: 'dcebc5a49fd677f78991f2d3484b9c46',
  //user: '0f30088d11696cd7e55c70bacafb2639',
  //key: '20a491f8e735efb5eb95d7f328dad049',
  // set maxInstance for all browser
  maxInstances: 4,
  capabilities: [
    {
      browserName: 'chrome'
    }
  ],
  // baseUrl: baseUrl,
  framework: 'mocha',

  // multiremote

  // capabilities: {
  //   user1: {
  //     capabilities: {
  //       browserName: "chrome"
  //     }
  //   },
  //   user2: {
  //     capabilities: {
  //       browserName: "chrome"
  //     }
  //   },
  //   user3: {
  //     capabilities: {
  //       browserName: "chrome"
  //     }
  //   }
  // },

  mochaOpts: {
    ui: 'bdd',
    //retries: 2,
    timeout: timeout
    // fgrep: "C1232"
  },
  reporters: ['spec'],
  // beforeSession: function (config, capabilities) {
  //   if (process.env.DEBUG == '1') {
  //     // Giving debugger some time to connect...
  //     return new Promise(resolve => setTimeout(resolve, 10000));
  //   }
  // },
  before: function (capabilities, specs) {
    browser.setWindowSize(1400, 1050);
    browser.setTimeout({ pageLoad: 60000, implicit: 250 });
    // browser.windowHandleSize({ width: 1400, height: 1050 });
    // console.log(specs[0]);
    // if (specs[0].indexOf('us-en') > 0) {
    //   browser.options.baseUrl = 'https://storefront:kontoor@staging-na01-kontoor.demandware.net';
    // } else {
    //   browser.options.baseUrl = 'https://storefront:kontoor@staging-eu01-kontoor.demandware.net';
    // }
    // // if(specs[0].indexOf("us-en") > 0){
    // //     browser.options.baseUrl = "https://storefront:kontoor@development-na01-kontoor.demandware.net"
    // // }else{
    // //     browser.options.baseUrl = "https://storefront:kontoor@development-eu01-kontoor.demandware.net"
    // // }
    // console.log('URL: ' + this.baseUrl);
  }
  // beforeTest: function (test) {
  //   browser.setTimeout({
  //     implicit: 250
  //   });
  // }
};
// console.log('###### Running in debug mode! ######');
// //debugConfig.debug = true;
// //wdioConfig.execArgv = ["--inspect=127.0.0.1:5858"];
// wdioConfig.mochaOpts.timeout = 360000;
// const chromeCap = wdioConfig.capabilities.find(cap => {
//   return cap.browserName == 'chrome';
// });
// chromeCap['selenoid:options'] = {};
// chromeCap['selenoid:options'].enableVNC = true;
// chromeCap['selenoid:options'].name = 'Kontoor-executions';
// chromeCap['selenoid:options'].sessionTimeout = '10m';
// chromeCap['selenoid:options'].enableVideo = true;

module.exports.config = wdioConfig;
