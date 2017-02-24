'use strict';

const env = process.env.NODE_ENV;
let config;

if ((undefined === env) || (env === 'development')) {
  config = require('./config/development');
} else if (env === 'test') {
  config = require('./config/test');
} else if (env === 'production') {
  config = require('./config/production');
}

module.exports = config;
