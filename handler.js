'use strict';

const R                = require('ramda');
const Xhttp            = require('./app/http');
const isVeryfyingToken = R.allPass([
  Xhttp.isGet,
  Xhttp.isSubscribe,
  Xhttp.isTokenValid(process.env.FACEBOOK_PAGE_VERIFY_TOKEN)
]);


module.exports.verify = (event, context, callback) => {
  if (isVeryfyingToken(event)) {
    Xhttp.respondWith(event.queryStringParameters['hub.challenge'])(callback);
  } else {
    Xhttp.clientError(callback);
  }
};

module.exports.webhook = (event, context, callback) => {
  console.log(JSON.stringify(JSON.parse(event.body), null, 2));

  callback(null, {
    statusCode: 200,
    body: {}
  });
};
