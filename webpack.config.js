/**
 * Created by kelvinsun on 2017/6/26.
 */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        popup: './src/popup.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: 'dist',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            { test: '/\.js$/', loader: 'babel-loader', exclude: /node_modules/, query: { presets: [ 'es2015', ], }, },
            { test: '/\.vue$/', loader: 'vue-loader', },
        ],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),   // 根据调用次数分配 id
        new webpack.NoEmitOnErrorsPlugin(),   // 干掉所有错误输出
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        // new HtmlWebpackPlugin({
        //     filename: 'popup.html',
        //     template: path.resolve(__dirname, 'src/popup.html'),
        // }),
    ],
};