'use strict';

const path = require ('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const tslintConfig = require('./.tslint.config.js')

module.exports = function(options) {
    const mode = options.mode || 'development';
    const plugins = options.plugins || [];

    const alias = {
        app: 'src/app',
        core: 'src/core'
    };

    if (mode === 'development') {
        alias['react-dom'] = '@hot-loader/react-dom';
    }

    return {
        mode,
        devtool: options.devtool,

        entry: {
            app: './src/app/index.ts'
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    enforce: 'pre',
                    loader: 'eslint-loader',
                    include: path.resolve(__dirname, 'src/'),
                    options: {
                        baseConfig: tslintConfig
                    }
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true
                            }
                        }
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    include: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        'css-loader'
                    ]
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: options.hot
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 1
                            }
                        }
                    ]
                },
                {
                    test: /\.mcss$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: options.hot
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                modules: {
                                    localIdentName: '[name]_[local]_[hash:base64:5]'
                                },
                                importLoaders: 1
                            }
                        }
                    ]
                }
            ],
        },

        resolve: {
            modules: [
                __dirname,
                'node_modules'
            ],
            alias,
            extensions: [ '.tsx', '.ts', '.js' ]
        },

        output: {
            filename: '[name].[hash].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/'
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                ignoreOrder: false
            }),
            new CaseSensitivePathsPlugin(),
            new ForkTsCheckerWebpackPlugin()
        ].concat(plugins),

        optimization: {
            minimizer: [
                '...',
                new CssMinimizerPlugin()
            ],
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: (module) => {
                            return module.context && module.context.includes('node_modules');
                        },
                        chunks: 'initial',
                        name: 'vendors',
                        priority: 0
                    },
                    app: {
                        chunks: 'all',
                        name: 'app',
                        enforce: true,
                        priority: -1
                    }
                }
            }
        }
    };
};


// const path = require ('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const optimization = require('./webpack/configs/optimization');

// module.exports = function(options) {
//     const mode = options.mode || 'development';

//     const rules = options.rules || [];
//     const plugins = options.plugins || [];

//     const publicPath = options.publicPath;
//     const outputPath = options.outputPath;

//     const imagesPublicPath = publicPath + 'images';

//     const alias = {
//         'app': 'src/app',
//         'core': 'src/core',
//     };

//     if (mode === 'development') {
//         alias['react-dom'] = '@hot-loader/react-dom';
//     }

//     return {
//         mode,

//         entry: {
//             app: './src/app/index.js'
//         },

//         output: {
//             filename: '[name].[hash].js',
//             path: path.resolve(__dirname, outputPath),
//             publicPath
//         },

//         resolve: {
//             modules: [
//                 __dirname,
//                 'node_modules'
//             ],
//             alias,
//             extensions: ['.js', '.ts', '.tsx']
//         },

//         resolveLoader: {
//             moduleExtensions: ['-loader']
//         },

//         plugins: [
//             new ForkTsCheckerWebpackPlugin({
//                 async: mode === 'development'
//             }),
//             new MiniCssExtractPlugin({
//                 filename: '[name].[hash].css',
//                 ignoreOrder: false
//             }),
//             new CaseSensitivePathsPlugin()
//         ].concat(plugins),

//         module: {
//             rules: [].concat(rules)
//         },

//         optimization: optimization(),

//         stats: {
//             children: false
//         }
//     };
// };
