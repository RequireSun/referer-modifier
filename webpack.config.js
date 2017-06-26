/**
 * Created by kelvinsun on 2017/6/26.
 */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './app.js',
    output: {
        path: path.join(__dirname, '__build__'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '__build__',
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', },
            { test: /\.vue$/, loader: 'vue-loader', },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
};