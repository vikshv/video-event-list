const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.web.hot.config');

const serverConfig = {
    hot: true,
    https: false,
    historyApiFallback: {
        rewrites: [
            {
                from: /./,
                to: '/'
            }
        ]
    },
    index: './index.html',
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: /node_modules/
    },
    open: true,
    stats: 'minimal'
};

new WebpackDevServer(webpack(config), serverConfig)
    .listen(3000, 'localhost', function(err) {
        if (err) {
            // eslint-disable-next-line no-console
            console.log(err);
        }
        // eslint-disable-next-line no-console
        console.log('Listening at localhost:3000');
    });
