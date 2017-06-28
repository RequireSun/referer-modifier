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
        background: './src/background.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        // publicPath: 'dist',
        // libraryTarget: 'umd',
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            // 这么写无法触达到 vue 模板里的 babel, 就改成 babelrc 了, 当然 vue-loader 应该有对应方法透传参数的, 但是没找到
            // query: {
            //     presets: [ 'es2015', ],
            //     plugins: ['transform-object-rest-spread'],
            //     // plugins: [require('babel-plugin-syntax-object-rest-spread')],
            //     // plugins: [require('babel-plugin-transform-object-rest-spread')],
            // },
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
        },],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),   // 根据调用次数分配 id
        new webpack.NoEmitOnErrorsPlugin(),   // 干掉所有错误输出
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: path.resolve(__dirname, 'src/popup.html'),
            chunks: [ 'popup', ],
        }),
    ],
};