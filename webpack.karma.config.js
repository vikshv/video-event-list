'use strict';

const path = require('path');
const config = require('./webpack.config.js');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const baseConfig = config({
    mode: 'development'
});

module.exports = {
    ...baseConfig,

    entry: null,
    output: null,

    target: 'web',
    externals: [],

    optimization: {
        splitChunks: false
    },

    plugins: [
        new CaseSensitivePathsPlugin()
    ]
};