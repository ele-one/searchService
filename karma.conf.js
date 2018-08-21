// Karma configuration

var webpackConfig = require('./webpack.config.js')
webpackConfig.entry = null; // explicitly setting up config to null

module.exports = function (config) {
  config.set({

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [ 'Chrome' , 'Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [ 'mocha' , 'chai'],

    // enable or disable colors in the output (reporters and logs)
    colors: true,

    // list of files / patterns to load in the browser
    files: [
      'client/src/components/**/*.jsx',
      { pattern: 'tests/clientSpecs/**/*.js', watched: true }
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,


    reporters: [ 'progress', 'coverage'],

    preprocessors: {
      'client/src/components/**/*.jsx': ['webpack', 'coverage'],
      'tests/clientSpecs/**/*.js': [ 'webpack'] //preprocess with webpack and our sourcemap loader

    },
     //report results in this format
    webpack: webpackConfig,

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    webpackServer: {
      noInfo: false //please don't spam the console when running in karma!
    },

    singleRun: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


  });
};

