var webpackConfig = require('./webpack.karma.config.js');

module.exports = function (config) {
    config.set({
        browsers: [
            'Chrome'
        ],

        port: 9876,

        singleRun: true,

        autoWatch: false,

        colors: true,

        concurrency: Infinity,

        logLevel: config.LOG_INFO,

        frameworks: [
            'mocha',
            'chai'
        ],

        files: [
            'tests.webpack.js'
        ],

        plugins: [
            'karma-chrome-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-webpack',
            'karma-mocha-reporter'
        ],

        preprocessors: {
            'tests.webpack.js': ['webpack']
        },

        reporters: ['mocha'],

        webpack: webpackConfig,

        webpackServer: {
            noInfo: true
        }
    });
};
