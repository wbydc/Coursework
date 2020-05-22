var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    entry: './main.js',
    devtool: "source-map",
    output: {
        path: path.resolve(__dirname + '/../backend/public'),
        publicPath: '/coursework/',
        filename: 'app.bundle.js',
        // chunkFilename: '[name].chunk.bundle.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ]
        }]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    devServer: {
        hot: true,
        port: 3000,
        historyApiFallback: {
            index: 'index.html'
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    }
};
