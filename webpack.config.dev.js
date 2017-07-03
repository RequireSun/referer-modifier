'use strict';

const base = require('./webpack.config');
const config = Object.create(base);

config.devtool = '#source-map';

module.exports = config;