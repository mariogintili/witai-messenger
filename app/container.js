'use strict';

function Container() {
  this.repository = {};
};

Container.prototype.register = function(key, value, options) {
  let args = (options || {});

  if ((this.repository[key] !== undefined) && (options.allowOverwrite !== true)) {
    throw new Error(`Duplicate declaration of ${key} found`);
  } else {
    this.repository[key] = { value: value, instantiate: args.instantiate };
    return value;
  }
};

Container.prototype.fetch = function(key, fn) {
  const value      = this.repository[key];
  const ifNotFound = (fn ? fn : (label) => { throw new Error(`Could not find ${label}`)});

  if (value) {
    return (value.instantiate ? new value() : value);
  } else {
    ifNotFound(key);
  }
};



const container = new Container();
container.register('httpClient', require('./http-client'));
container.register('config', require('./config'));

module.exports = container;
