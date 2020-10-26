'use strict';

const webpack = require ('webpack');
const packageJson = require('./package.json');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const config = require('./webpack.config.js');

const baseConfig = config({
    hot: true,
    
    mode: 'development',

    devtool: 'source-map',

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ProgressBarPlugin(),
        new WebpackNotifierPlugin({
            title: packageJson.name,
            alwaysNotify: true
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: packageJson.name,
            template: './src/app/index.html',
            alwaysWriteToDisk: true
        }),
        new StylelintPlugin({
            configFile: './.stylelint.config.js',
            context: 'src',
            files: [
                '**/*.css',
                '**/*.mcss'
            ],
            quiet: false,
            allowEmptyInput: true
        })
    ]
});

module.exports = Object.assign({}, baseConfig, {
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        baseConfig.entry.app
    ]
});