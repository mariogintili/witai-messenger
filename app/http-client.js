'use strict';

const request   = require('request');
const R         = require('ramda');
let httpClient;

if (process.env.NODE_ENV === 'test') {
  httpClient = R.__;
} else {
  httpClient = require('request');
}

module.exports = httpClient;
