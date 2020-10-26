'use strict';

const config = require('./webpack.config.js');
const packageJson = require('./package.json');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const baseConfig = config({
    mode: 'production',

    plugins: [
        new CleanWebpackPlugin({
            verbose: false
        }),
        new HtmlWebPackPlugin({
            title: packageJson.name,
            template: './src/app/index.html',
            alwaysWriteToDisk: true
        }),
        new OptimizeCSSAssetsPlugin()
    ]
});

module.exports = {
    ...baseConfig,

    output: {
        ...baseConfig.output,
        publicPath: './'
    }
};