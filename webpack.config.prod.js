'use strict';

const webpack = require('webpack');
const base = require('./webpack.config');
const config = Object.create(base);

config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        warning: false,
    })
);

module.exports = config;